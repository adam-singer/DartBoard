// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/**
 * A native object that is shared across isolates. This object is visible to all
 * isolates running on the same worker (either UI or background web worker).
 *
 * This is code that is intended to 'escape' the isolate boundaries in order to
 * implement the semantics of friendly isolates in JavaScript. Without this we
 * would have been forced to implement more code (including the top-level event
 * loop) in JavaScript itself.
 */
GlobalState get _globalState() native "return \$globalState;";
set _globalState(GlobalState val) native "\$globalState = val;";

/**
 * Wrapper that takes the dart entry point and runs it within an isolate. The
 * frog compiler will inject a call of the form [: startRootIsolate(main); :]
 * when it determines that this wrapping is needed. For single-isolate
 * applications (e.g. hello world), this call is not emitted.
 */
void startRootIsolate(entry) {
  _globalState = new GlobalState();

  // Don't start the main loop again, if we are in a worker.
  if (_globalState.isWorker) return;
  final rootContext = new IsolateContext();
  _globalState.rootContext = rootContext;
  _fillStatics(rootContext);

  // BUG(5151491): Setting currentContext should not be necessary, but
  // because closures passed to the DOM as event handlers do not bind their
  // isolate automatically we try to give them a reasonable context to live in
  // by having a "default" isolate (the first one created).
  _globalState.currentContext = rootContext;

  rootContext.eval(entry);
  _globalState.topEventLoop.run();
}

void _fillStatics(context) native @"""
  $globals = context.isolateStatics;
  $static_init();
""";

/** Global state associated with the current worker. See [_globalState]. */
// TODO(sigmund): split in multiple classes: global, thread, main-worker states?
class GlobalState {

  /** Next available isolate id. */
  int nextIsolateId = 0;

  /** Worker id associated with this worker. */
  int currentWorkerId = 0;

  /**
   * Next available worker id. Only used by the main worker to assign a unique
   * id to each worker created by it.
   */
  int nextWorkerId = 1;

  /** Context for the currently running [Isolate]. */
  IsolateContext currentContext = null;

  /** Context for the root [Isolate] that first run in this worker. */
  IsolateContext rootContext = null;

  /** The top-level event loop. */
  EventLoop topEventLoop;

  /** Whether this program is running in a background worker. */
  bool isWorker;

  /** Whether this program is running in a UI worker. */
  bool inWindow;

  /** Whether we support spawning workers. */
  bool supportsWorkers;

  /**
   * Whether to use web workers when implementing isolates. Set to false for
   * debugging/testing.
   */
  bool get useWorkers() => supportsWorkers;

  /**
   * Whether to use the web-worker JSON-based message serialization protocol. By
   * default this is only used with web workers. For debugging, you can force
   * using this protocol by changing this field value to [true].
   */
  bool get needSerialization() => useWorkers;

  /**
   * Registry of isolates. Isolates must be registered if, and only if, receive
   * ports are alive.  Normally no open receive-ports means that the isolate is
   * dead, but DOM callbacks could resurrect it.
   */
  Map<int, IsolateContext> isolates;

  /** Reference to the main worker. */
  MainWorker mainWorker;

  /** Registry of active workers. Only used in the main worker. */
  Map<int, var> workers;

  GlobalState() {
    topEventLoop = new EventLoop();
    isolates = {};
    workers = {};
    mainWorker = new MainWorker();
    _nativeInit();
  }

  void _nativeInit() native @"""
    this.isWorker = typeof ($globalThis['importScripts']) != 'undefined';
    this.inWindow = typeof(window) !== 'undefined';
    this.supportsWorkers = this.isWorker ||
        ((typeof $globalThis['Worker']) != 'undefined');

    // if workers are supported, treat this as a main worker:
    if (this.supportsWorkers) {
      $globalThis.onmessage = function(e) {
        IsolateNatives._processWorkerMessage(this.mainWorker, e);
      };
    }
  """;

  /**
   * Close the worker running this code, called when there is nothing else to
   * run.
   */
  void closeWorker() {
    if (isWorker) {
      if (!isolates.isEmpty()) return;
      mainWorker.postMessage(
          _serializeMessage({'command': 'close'}));
    } else if (isolates.containsKey(rootContext.id) && workers.isEmpty() &&
               !supportsWorkers && !inWindow) {
      // This should only trigger when running on the command-line.
      // We don't want this check to execute in the browser where the isolate
      // might still be alive due to DOM callbacks.
      throw new Exception("Program exited with open ReceivePorts.");
    }
  }
}

_serializeMessage(message) {
  if (_globalState.needSerialization) {
    return new Serializer().traverse(message);
  } else {
    return new Copier().traverse(message);
  }
}

_deserializeMessage(message) {
  if (_globalState.needSerialization) {
    return new Deserializer().deserialize(message);
  } else {
    // Nothing more to do.
    return message;
  }
}

/** Wait until all ports in a message are resolved. */
_waitForPendingPorts(var message, void callback()) {
  final finder = new PendingSendPortFinder();
  finder.traverse(message);
  Futures.wait(finder.ports).then((_) => callback());
}

/** Default worker. */
class MainWorker {
  int id = 0;
  void postMessage(msg) native "return \$globalThis.postMessage(msg);";
  void set onmessage(f) native "\$globalThis.onmessage = f;";
  void terminate() {}
}

/**
 * A web worker. This type is also defined in 'dart:dom', but we define it here
 * to avoid introducing a dependency from corelib to dom. This definition uses a
 * 'hidden' type (* prefix on the native name) to enforce that the type is
 * defined dynamically only when web workers are actually available.
 */
class _Worker native "*Worker" {
  get id() native "return this.id;";
  void set id(i) native "this.id = i;";
  void set onmessage(f) native "this.onmessage = f;";
  void postMessage(msg) native "return this.postMessage(msg);";
}

/** Context information tracked for each isolate. */
class IsolateContext {
  /** Current isolate id. */
  int id;

  /** Registry of receive ports currently active on this isolate. */
  Map<int, ReceivePort> ports;

  /** Holds isolate globals (statics and top-level properties). */
  var isolateStatics; // native object containing all globals of an isolate.

  IsolateContext() {
    id = _globalState.nextIsolateId++;
    ports = {};
    initGlobals();
  }

  // these are filled lazily the first time the isolate starts running.
  void initGlobals() native 'this.isolateStatics = {};';

  /**
   * Run [code] in the context of the isolate represented by [this]. Note this
   * is called from JavaScript (see $wrap_call in corejs.dart).
   */
  void eval(Function code) {
    var old = _globalState.currentContext;
    _globalState.currentContext = this;
    this._setGlobals();
    var result = null;
    try {
      result = code();
    } finally {
      _globalState.currentContext = old;
      if (old != null) old._setGlobals();
    }
    return result;
  }

  void _setGlobals() native @'$globals = this.isolateStatics;';

  /** Lookup a port registered for this isolate. */
  ReceivePort lookup(int id) => ports[id];

  /** Register a port on this isolate. */
  void register(int portId, ReceivePort port)  {
    if (ports.containsKey(portId)) {
      throw new Exception("Registry: ports must be registered only once.");
    }
    ports[portId] = port;
    _globalState.isolates[id] = this; // indicate this isolate is active
  }

  /** Unregister a port on this isolate. */
  void unregister(int portId) {
    ports.remove(portId);
    if (ports.isEmpty()) {
      _globalState.isolates.remove(id); // indicate this isolate is not active
    }
  }
}

/** Represent the event loop on a javascript thread (DOM or worker). */
class EventLoop {
  Queue<IsolateEvent> events;

  EventLoop() : events = new Queue<IsolateEvent>();

  void enqueue(isolate, fn, msg) {
    events.addLast(new IsolateEvent(isolate, fn, msg));
  }

  IsolateEvent dequeue() {
    if (events.isEmpty()) return null;
    return events.removeFirst();
  }

  /** Process a single event, if any. */
  bool runIteration() {
    final event = dequeue();
    if (event == null) {
      _globalState.closeWorker();
      return false;
    }
    event.process();
    return true;
  }

  /** Function equivalent to [:window.setTimeout:] when available, or null. */
  static Function _wrapSetTimeout() native """
      return typeof window != 'undefined' ?
          function(a, b) { window.setTimeout(a, b); } : undefined;
  """;

  /**
   * Runs multiple iterations of the run-loop. If possible, each iteration is
   * run asynchronously.
   */
  void _runHelper() {
    final setTimeout = _wrapSetTimeout();
    if (setTimeout != null) {
      // Run each iteration from the browser's top event loop.
      void next() {
        if (!runIteration()) return;
        setTimeout(next, 0);
      }
      next();
    } else {
      // Run synchronously until no more iterations are available.
      while (runIteration()) {}
    }
  }

  /**
   * Call [_runHelper] but ensure that worker exceptions are propragated. Note
   * this is called from JavaScript (see $wrap_call in corejs.dart).
   */
  void run() {
    if (!_globalState.isWorker) {
      _runHelper();
    } else {
      try {
        _runHelper();
      } catch(var e, var trace) {
        _globalState.mainWorker.postMessage(_serializeMessage(
            {'command': 'error', 'msg': '$e\n$trace' }));
      }
    }
  }
}

/** An event in the top-level event queue. */
class IsolateEvent {
  IsolateContext isolate;
  Function fn;
  String message;

  IsolateEvent(this.isolate, this.fn, this.message);

  void process() {
    isolate.eval(fn);
  }
}

/** Common functionality to all send ports. */
class BaseSendPort implements SendPort {
  /** Id for the destination isolate. */
  final int _isolateId;

  BaseSendPort(this._isolateId);

  ReceivePortSingleShotImpl call(var message) {
    final result = new ReceivePortSingleShotImpl();
    this.send(message, result.toSendPort());
    return result;
  }

  static void checkReplyTo(SendPort replyTo) {
    if (replyTo !== null
        && replyTo is! NativeJsSendPort
        && replyTo is! WorkerSendPort
        && replyTo is! BufferingSendPort) {
      throw new Exception("SendPort.send: Illegal replyTo port type");
    }
  }

  // TODO(sigmund): replace the current SendPort.call with the following:
  //Future call(var message) {
  //   final completer = new Completer();
  //   final port = new ReceivePort.singleShot();
  //   send(message, port.toSendPort());
  //   port.receive((value, ignoreReplyTo) {
  //     if (value is Exception) {
  //       completer.completeException(value);
  //     } else {
  //       completer.complete(value);
  //     }
  //   });
  //   return completer.future;
  //}

  abstract void send(var message, [SendPort replyTo]);
  abstract bool operator ==(var other);
  abstract int hashCode();
}

/** A send port that delivers messages in-memory via native JavaScript calls. */
class NativeJsSendPort extends BaseSendPort implements SendPort {
  final ReceivePortImpl _receivePort;

  const NativeJsSendPort(this._receivePort, int isolateId) : super(isolateId);

  void send(var message, [SendPort replyTo = null]) {
    _waitForPendingPorts([message, replyTo], () {
      checkReplyTo(replyTo);
      // Check that the isolate still runs and the port is still open
      final isolate = _globalState.isolates[_isolateId];
      if (isolate == null) return;
      if (_receivePort._callback == null) return;

      // We force serialization/deserialization as a simple way to ensure
      // isolate communication restrictions are respected between isolates that
      // live in the same worker. NativeJsSendPort delivers both messages from
      // the same worker and messages from other workers. In particular,
      // messages sent from a worker via a WorkerSendPort are received at
      // [_processWorkerMessage] and forwarded to a native port. In such cases,
      // here we'll see [_globalState.currentContext == null].
      final shouldSerialize = _globalState.currentContext != null
          && _globalState.currentContext.id != _isolateId;
      var msg = message;
      var reply = replyTo;
      if (shouldSerialize) {
        msg = _serializeMessage(msg);
        reply = _serializeMessage(reply);
      }
      _globalState.topEventLoop.enqueue(isolate, () {
        if (_receivePort._callback != null) {
          if (shouldSerialize) {
            msg = _deserializeMessage(msg);
            reply = _deserializeMessage(reply);
          }
          _receivePort._callback(msg, reply);
        }
      }, 'receive ' + message);
    });
  }

  bool operator ==(var other) => (other is NativeJsSendPort) &&
      (_receivePort == other._receivePort);

  int hashCode() => _receivePort._id;
}

/** A send port that delivers messages via worker.postMessage. */
class WorkerSendPort extends BaseSendPort implements SendPort {
  final int _workerId;
  final int _receivePortId;

  const WorkerSendPort(this._workerId, int isolateId, this._receivePortId)
      : super(isolateId);

  void send(var message, [SendPort replyTo = null]) {
    _waitForPendingPorts([message, replyTo], () {
      checkReplyTo(replyTo);
      final workerMessage = _serializeMessage({
          'command': 'message',
          'port': this,
          'msg': message,
          'replyTo': replyTo});

      if (_globalState.isWorker) {
        // communication from one worker to another go through the main worker:
        _globalState.mainWorker.postMessage(workerMessage);
      } else {
        _globalState.workers[_workerId].postMessage(workerMessage);
      }
    });
  }

  bool operator ==(var other) {
    return (other is WorkerSendPort) &&
        (_workerId == other._workerId) &&
        (_isolateId == other._isolateId) &&
        (_receivePortId == other._receivePortId);
  }

  int hashCode() {
    // TODO(sigmund): use a standard hash when we get one available in corelib.
    return (_workerId << 16) ^ (_isolateId << 8) ^ _receivePortId;
  }
}

/** A port that buffers messages until an underlying port gets resolved. */
class BufferingSendPort extends BaseSendPort implements SendPort {
  /** Internal counter to assign unique ids to each port. */
  static int _idCount = 0;

  /** For implementing equals and hashcode. */
  final int _id;

  /** Underlying port, when resolved. */
  SendPort _port;

  /**
   * Future of the underlying port, so that we can detect when this port can be
   * sent on messages.
   */
  Future<SendPort> _futurePort;

  /** Pending messages (and reply ports). */
  List pending;

  BufferingSendPort(isolateId, this._futurePort)
      : super(isolateId), _id = _idCount, pending = [] {
    _idCount++;
    _futurePort.then((p) {
      _port = p;
      for (final item in pending) {
        p.send(item['message'], item['replyTo']);
      }
      pending = null;
    });
  }

  BufferingSendPort.fromPort(isolateId, this._port)
      : super(isolateId), _id = _idCount {
    _idCount++;
  }

  void send(var message, [SendPort replyTo]) {
    if (_port != null) {
      _port.send(message, replyTo);
    } else {
      pending.add({'message': message, 'replyTo': replyTo});
    }
  }

  bool operator ==(var other) => other is BufferingSendPort && _id == other._id;
  int hashCode() => _id;
}

/** Default factory for receive ports. */
class ReceivePortFactory {

  factory ReceivePort() {
    return new ReceivePortImpl();
  }

  factory ReceivePort.singleShot() {
    return new ReceivePortSingleShotImpl();
  }
}

/** Implementation of a multi-use [ReceivePort] on top of JavaScript. */
class ReceivePortImpl implements ReceivePort {
  int _id;
  Function _callback;
  static int _nextFreeId = 1;

  ReceivePortImpl()
      : _id = _nextFreeId++ {
    _globalState.currentContext.register(_id, this);
  }

  void receive(void onMessage(var message, SendPort replyTo)) {
    _callback = onMessage;
  }

  void close() {
    _callback = null;
    _globalState.currentContext.unregister(_id);
  }

  SendPort toSendPort() {
    return new NativeJsSendPort(this, _globalState.currentContext.id);
  }
}

/** Implementation of a single-shot [ReceivePort]. */
class ReceivePortSingleShotImpl implements ReceivePort {

  ReceivePortSingleShotImpl() : _port = new ReceivePortImpl() { }

  void receive(void callback(var message, SendPort replyTo)) {
    _port.receive((var message, SendPort replyTo) {
      _port.close();
      callback(message, replyTo);
    });
  }

  void close() {
    _port.close();
  }

  SendPort toSendPort() => _port.toSendPort();

  final ReceivePortImpl _port;
}

final String _SPAWNED_SIGNAL = "spawned";

class IsolateNatives {

  /** JavaScript-specific implementation to spawn an isolate. */
  static Future<SendPort> spawn(Isolate isolate, bool isLight) {
    Completer<SendPort> completer = new Completer<SendPort>();
    ReceivePort port = new ReceivePort.singleShot();
    port.receive((msg, SendPort replyPort) {
      assert(msg == _SPAWNED_SIGNAL);
      completer.complete(replyPort);
    });

    // TODO(floitsch): throw exception if isolate's class doesn't have a
    // default constructor.
    if (_globalState.useWorkers && !isLight) {
      _startWorker(isolate, port.toSendPort());
    } else {
      _startNonWorker(isolate, port.toSendPort());
    }

    return completer.future;
  }

  static SendPort _startWorker(Isolate runnable, SendPort replyPort) {
    var factoryName = _getJSConstructorName(runnable);
    if (_globalState.isWorker) {
      _globalState.mainWorker.postMessage(_serializeMessage({
          'command': 'spawn-worker',
          'factoryName': factoryName,
          'replyPort': _serializeMessage(replyPort)}));
    } else {
      _spawnWorker(factoryName, _serializeMessage(replyPort));
    }
  }

  /**
   * The src url for the script tag that loaded this code. Used to create
   * JavaScript workers.
   */
  static String get _thisScript() =>
      _thisScriptCache != null ? _thisScriptCache : _computeThisScript();

  static String _thisScriptCache;

  // TODO(sigmund): fix - this code should be run synchronously when loading the
  // script. Running lazily on DOMContentLoaded will yield incorrect results.
  static String _computeThisScript() native @"""
    if (!$globalState.supportsWorkers || $globalState.isWorker) return null;

    // TODO(5334778): Find a cross-platform non-brittle way of getting the
    // currently running script.
    var scripts = document.getElementsByTagName('script');
    // The scripts variable only contains the scripts that have already been
    // executed. The last one is the currently running script.
    var script = scripts[scripts.length - 1];
    var src = script && script.src;
    if (!src) {
      // TODO()
      src = "FIXME:5407062" + "_" + Math.random().toString();
      if (script) script.src = src;
    }
    IsolateNatives._thisScriptCache = src;
    return src;
  """;

  /** Starts a new worker with the given URL. */
  static _Worker _newWorker(url) native "return new Worker(url);";

  /**
   * Spawns an isolate in a worker. [factoryName] is the Javascript constructor
   * name for the isolate entry point class.
   */
  static void _spawnWorker(factoryName, serializedReplyPort) {
    final worker = _newWorker(_thisScript);
    worker.onmessage = (e) { _processWorkerMessage(worker, e); };
    var workerId = _globalState.nextWorkerId++;
    // We also store the id on the worker itself so that we can unregister it.
    worker.id = workerId;
    _globalState.workers[workerId] = worker;
    worker.postMessage(_serializeMessage({
      'command': 'start',
      'id': workerId,
      'replyTo': serializedReplyPort,
      'factoryName': factoryName }));
  }

  /**
   * Assume that [e] is a browser message event and extract its message data.
   * We don't import the dom explicitly so, when workers are disabled, this
   * library can also run on top of nodejs.
   */
  static _getEventData(e) native "return e.data";

  /**
   * Process messages on a worker, either to control the worker instance or to
   * pass messages along to the isolate running in the worker.
   */
  static void _processWorkerMessage(sender, e) {
    var msg = _deserializeMessage(_getEventData(e));
    switch (msg['command']) {
      // TODO(sigmund): delete after we migrate to Isolate2
      case 'start':
        _globalState.currentWorkerId = msg['id'];
        var runnerObject =
            _allocate(_getJSConstructorFromName(msg['factoryName']));
        var serializedReplyTo = msg['replyTo'];
        _globalState.topEventLoop.enqueue(new IsolateContext(), function() {
          var replyTo = _deserializeMessage(serializedReplyTo);
          _startIsolate(runnerObject, replyTo);
        }, 'worker-start');
        _globalState.topEventLoop.run();
        break;
      case 'start2':
        _globalState.currentWorkerId = msg['id'];
        Function entryPoint = _getJSFunctionFromName(msg['functionName']);
        var replyTo = _deserializeMessage(msg['replyTo']);
        _globalState.topEventLoop.enqueue(new IsolateContext(), function() {
          _startIsolate2(entryPoint, replyTo);
        }, 'worker-start');
        _globalState.topEventLoop.run();
        break;
      // TODO(sigmund): delete after we migrate to Isolate2
      case 'spawn-worker':
        _spawnWorker(msg['factoryName'], msg['replyPort']);
        break;
      case 'spawn-worker2':
        _spawnWorker2(msg['functionName'], msg['uri'], msg['replyPort']);
        break;
      case 'message':
        msg['port'].send(msg['msg'], msg['replyTo']);
        _globalState.topEventLoop.run();
        break;
      case 'close':
        _log("Closing Worker");
        _globalState.workers.remove(sender.id);
        sender.terminate();
        _globalState.topEventLoop.run();
        break;
      case 'log':
        _log(msg['msg']);
        break;
      case 'print':
        if (_globalState.isWorker) {
          _globalState.mainWorker.postMessage(
              _serializeMessage({'command': 'print', 'msg': msg}));
        } else {
          print(msg['msg']);
        }
        break;
      case 'error':
        throw msg['msg'];
    }
  }

  /** Log a message, forwarding to the main worker if appropriate. */
  static _log(msg) {
    if (_globalState.isWorker) {
      _globalState.mainWorker.postMessage(
          _serializeMessage({'command': 'log', 'msg': msg }));
    } else {
      try {
        _consoleLog(msg);
      } catch(e, trace) {
        throw new Exception(trace);
      }
    }
  }

  static void _consoleLog(msg) native "\$globalThis.console.log(msg);";


  /**
   * Extract the constructor of runnable, so it can be allocated in another
   * isolate.
   */
  static var _getJSConstructor(Isolate runnable) native """
    return runnable.constructor;
  """;

  /** Extract the constructor name of a runnable */
  // TODO(sigmund): find a browser-generic way to support this.
  static var _getJSConstructorName(Isolate runnable) native """
    return runnable.constructor.name;
  """;

  /** Find a constructor given it's name. */
  static var _getJSConstructorFromName(String factoryName) native """
    return \$globalThis[factoryName];
  """;

  static var _getJSFunctionFromName(String functionName) native """
    return \$globalThis[functionName];
  """;

  static String _getJSFunctionName(Function f) native "return f.name || null;";

  /** Create a new JavasSript object instance given it's constructor. */
  static var _allocate(var ctor) native "return new ctor();";

  /** Starts a non-worker isolate. */
  static SendPort _startNonWorker(Isolate runnable, SendPort replyTo) {
    // Spawn a new isolate and create the receive port in it.
    final spawned = new IsolateContext();

    // Instead of just running the provided runnable, we create a
    // new cloned instance of it with a fresh state in the spawned
    // isolate. This way, we do not get cross-isolate references
    // through the runnable.
    final ctor = _getJSConstructor(runnable);
    _globalState.topEventLoop.enqueue(spawned, function() {
      _startIsolate(_allocate(ctor), replyTo);
    }, 'nonworker start');
  }

  /** Given a ready-to-start runnable, start running it. */
  static void _startIsolate(Isolate isolate, SendPort replyTo) {
    _fillStatics(_globalState.currentContext);
    ReceivePort port = new ReceivePort();
    replyTo.send(_SPAWNED_SIGNAL, port.toSendPort());
    isolate._run(port);
  }

  // TODO(sigmund): clean up above, after we make the new API the default:

  static _spawn2(String functionName, String uri, bool isLight) {
    Completer<SendPort> completer = new Completer<SendPort>();
    ReceivePort port = new ReceivePort.singleShot();
    port.receive((msg, SendPort replyPort) {
      assert(msg == _SPAWNED_SIGNAL);
      completer.complete(replyPort);
    });

    SendPort signalReply = port.toSendPort();

    if (_globalState.useWorkers && !isLight) {
      _startWorker2(functionName, uri, signalReply);
    } else {
      _startNonWorker2(functionName, uri, signalReply);
    }
    return new BufferingSendPort(
        _globalState.currentContext.id, completer.future);
  }

  static SendPort _startWorker2(
      String functionName, String uri, SendPort replyPort) {
    if (_globalState.isWorker) {
      _globalState.mainWorker.postMessage(_serializeMessage({
          'command': 'spawn-worker2',
          'functionName': functionName,
          'uri': uri,
          'replyPort': replyPort}));
    } else {
      _spawnWorker2(functionName, uri, replyPort);
    }
  }

  static SendPort _startNonWorker2(
      String functionName, String uri, SendPort replyPort) {
    _globalState.topEventLoop.enqueue(new IsolateContext(), function() {
      final func = _getJSFunctionFromName(functionName);
      _startIsolate2(func, replyPort);
    }, 'nonworker start');
  }

  static void _startIsolate2(Function topLevel, SendPort replyTo) {
    _fillStatics(_globalState.currentContext);
    final port = new ReceivePort();
    replyTo.send(_SPAWNED_SIGNAL, port.toSendPort());
    topLevel(port);
  }

  /**
   * Spawns an isolate in a worker. [factoryName] is the Javascript constructor
   * name for the isolate entry point class.
   */
  static void _spawnWorker2(functionName, uri, replyPort) {
    if (uri == null) uri = _thisScript;
    final worker = _newWorker(uri);
    worker.onmessage = (e) { _processWorkerMessage(worker, e); };
    var workerId = _globalState.nextWorkerId++;
    // We also store the id on the worker itself so that we can unregister it.
    worker.id = workerId;
    _globalState.workers[workerId] = worker;
    worker.postMessage(_serializeMessage({
      'command': 'start2',
      'id': workerId,
      // Note: we serialize replyPort twice because the child worker needs to
      // first deserialize the worker id, before it can correctly deserialize
      // the port (port deserialization is sensitive to what is the current
      // workerId).
      'replyTo': _serializeMessage(replyPort),
      'functionName': functionName }));
  }
}

class Isolate2Impl implements Isolate2 {
  SendPort sendPort;

  Isolate2Impl(this.sendPort);

  void stop() {}
}

class IsolateFactory implements Isolate2 {

  factory Isolate2.fromCode(Function topLevelFunction) {
    final name = IsolateNatives._getJSFunctionName(topLevelFunction);
    if (name == null) {
      throw new UnsupportedOperationException(
          "only top-level functions can be spawned.");
    }
    return new Isolate2Impl(IsolateNatives._spawn2(name, null, false));
  }

  factory Isolate2.fromUri(String uri) {
    return new Isolate2Impl(IsolateNatives._spawn2(null, uri, false));
  }
}
