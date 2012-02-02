// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.


class _SocketBase {
  // Bit flags used when communicating between the eventhandler and
  // dart code. The EVENT flags are used to indicate events of
  // interest when sending a message from dart code to the
  // eventhandler. When receiving a message from the eventhandler the
  // EVENT flags indicate the events that actually happened. The
  // COMMAND flags are used to send commands from dart to the
  // eventhandler. COMMAND flags are never received from the
  // eventhandler. Additional flags are used to communicate other
  // information.
  static final int _IN_EVENT = 0;
  static final int _OUT_EVENT = 1;
  static final int _ERROR_EVENT = 2;
  static final int _CLOSE_EVENT = 3;

  static final int _CLOSE_COMMAND = 8;
  static final int _SHUTDOWN_READ_COMMAND = 9;
  static final int _SHUTDOWN_WRITE_COMMAND = 10;

  // Flag send to the eventhandler providing additional information on
  // the type of the file descriptor.
  static final int _LISTENING_SOCKET = 16;
  static final int _PIPE = 17;

  static final int _FIRST_EVENT = _IN_EVENT;
  static final int _LAST_EVENT = _CLOSE_EVENT;

  static final int _FIRST_COMMAND = _CLOSE_COMMAND;
  static final int _LAST_COMMAND = _SHUTDOWN_WRITE_COMMAND;

  _SocketBase () {
    _handlerMap = new List(_LAST_EVENT + 1);
    _handlerMask = 0;
    _canActivateHandlers = true;
    _id = -1;
    _EventHandler._start();
  }

  // Multiplexes socket events to the socket handlers.
  void _multiplex(List<int> message) {
    assert(message.length == 1);
    _canActivateHandlers = false;
    int event_mask = message[0];
    for (int i = _FIRST_EVENT; i <= _LAST_EVENT; i++) {
      if (((event_mask & (1 << i)) != 0)) {
        if ((i == _CLOSE_EVENT) && this is _Socket && _id >= 0) {
          _closedRead = true;
          if (_closedWrite) _close();
        }

        var eventHandler = _handlerMap[i];
        if (eventHandler != null) {
          // Unregister the out handler before executing it.
          if (i == _OUT_EVENT) _setHandler(i, null);

          // Don't call the in handler if there is no data available
          // after all.
          if (i == _IN_EVENT && this is _Socket && available() == 0) {
            continue;
          }
          eventHandler();
        }
      }
    }
    _canActivateHandlers = true;
    _activateHandlers();
  }

  void _setHandler(int event, void callback()) {
    if (callback == null) {
      _handlerMask &= ~(1 << event);
    } else {
      _handlerMask |= (1 << event);
    }
    _handlerMap[event] = callback;
    // If the socket is only for writing then close the receive port
    // when not waiting for any events.
    if (this is _Socket &&
        _closedRead &&
        _handlerMask == 0 &&
        _handler != null) {
      _handler.close();
      _handler = null;
    } else {
      _activateHandlers();
    }
  }

  void _getPort() native "Socket_GetPort";

  void set errorHandler(void callback()) {
    _setHandler(_ERROR_EVENT, callback);
  }

  void _activateHandlers() {
    if (_canActivateHandlers && (_id >= 0)) {
      int data = _handlerMask;
      if (_isListenSocket()) {
        data |= (1 << _LISTENING_SOCKET);
      } else {
        if (_closedRead) { data &= ~(1 << _IN_EVENT); }
        if (_closedWrite) { data &= ~(1 << _OUT_EVENT); }
        if (_isPipe()) data |= (1 << _PIPE);
      }
      _sendToEventHandler(data);
    }
  }

  int get port() {
    if (_port === null) {
      _port = _getPort();
    }
    return _port;
  }

  void close([bool halfClose = false]) {
    if (_id >= 0) {
      if (halfClose) {
        _closeWrite();
      } else {
        _close();
      }
    } else if (_handler != null) {
      // This is to support closing sockets created but never assigned
      // any actual socket.
      _handler.close();
      _handler = null;
    }
  }

  void _closeWrite() {
    if (_closedRead) {
      _close();
    } else {
      _sendToEventHandler(1 << _SHUTDOWN_WRITE_COMMAND);
    }
    _closedWrite = true;
  }

  void _closeRead() {
    if (_closedWrite) {
      _close();
    } else {
      _sendToEventHandler(1 << _SHUTDOWN_READ_COMMAND);
    }
    _closedRead = true;
  }

  void _close() {
    _sendToEventHandler(1 << _CLOSE_COMMAND);
    _handler.close();
    _handler = null;
    _id = -1;
  }

  void _sendToEventHandler(int data) {
    if (_handler === null) {
      _handler = new ReceivePort();
      _handler.receive((var message, ignored) { _multiplex(message); });
    }
    _EventHandler._sendData(_id, _handler, data);
  }

  abstract bool _isListenSocket();
  abstract bool _isPipe();

  // Socket id is set from native. -1 indicates that the socket was closed.
  int _id;

  // Dedicated ReceivePort for socket events.
  ReceivePort _handler;

  // Poll event to handler map.
  List _handlerMap;

  // Indicates for which poll events the socket registered handlers.
  int _handlerMask;

  // Indicates if native interrupts can be activated.
  bool _canActivateHandlers;

  // Holds the port of the socket, null if not known.
  int _port;
}


class _ServerSocket extends _SocketBase implements ServerSocket {
  // Constructor for server socket. First a socket object is allocated
  // in which the native socket is stored. After that _createBind
  // is called which creates a file descriptor and binds the given address
  // and port to the socket. Null is returned if file descriptor creation or
  // bind failed.
  factory _ServerSocket(String bindAddress, int port, int backlog) {
    ServerSocket socket = new _ServerSocket._internal();
    if (!socket._createBindListen(bindAddress, port, backlog)) {
      socket.close();
      return null;
    }
    if (port != 0) {
      socket._port = port;
    }
    return socket;
  }

  _ServerSocket._internal();

  bool _accept(Socket socket) native "ServerSocket_Accept";

  bool _createBindListen(String bindAddress, int port, int backlog)
      native "ServerSocket_CreateBindListen";

  void set connectionHandler(void callback(Socket connection)) {
    _clientConnectionHandler = callback;
    _setHandler(_IN_EVENT,
                _clientConnectionHandler != null ? _connectionHandler : null);
  }

  void _connectionHandler() {
    if (_id >= 0) {
      _Socket socket = new _Socket._internal();
      if (_accept(socket)) _clientConnectionHandler(socket);
    }
  }

  bool _isListenSocket() => true;
  bool _isPipe() => false;

  var _clientConnectionHandler;
}


class _Socket extends _SocketBase implements Socket {
  // Constructor for socket. First a socket object is allocated
  // in which the native socket is stored. After that _createConnect is
  // called which creates a file discriptor and connects to the given
  // host on the given port. Null is returned if file descriptor creation
  // or connect failed.
  factory _Socket(String host, int port) {
    Socket socket = new _Socket._internal();
    if (!socket._createConnect(host, port)) {
      socket.close();
      return null;
    }
    return socket;
  }

  _Socket._internal();
  _Socket._internalReadOnly() : _closedWrite = true, _pipe = true;
  _Socket._internalWriteOnly() : _closedRead = true, _pipe = true;

  int available() {
    if (_id >= 0) {
      return _available();
    }
    throw new
        SocketIOException("Error: available failed - invalid socket handle");
  }

  int _available() native "Socket_Available";

  bool get closed() => _closed;

  int readList(List<int> buffer, int offset, int bytes) {
    if (_id >= 0) {
      if (bytes == 0) {
        return 0;
      }
      if (offset < 0) {
        throw new IndexOutOfRangeException(offset);
      }
      if (bytes < 0) {
        throw new IndexOutOfRangeException(bytes);
      }
      if ((offset + bytes) > buffer.length) {
        throw new IndexOutOfRangeException(offset + bytes);
      }
      int result = _readList(buffer, offset, bytes);
      if (result < 0) {
        _reportError();
      }
      return result;
    }
    throw new
        SocketIOException("Error: readList failed - invalid socket handle");
  }

  int _readList(List<int> buffer, int offset, int bytes)
      native "Socket_ReadList";

  int writeList(List<int> buffer, int offset, int bytes) {
    if (_id >= 0) {
      if (bytes == 0) {
        return 0;
      }
      if (offset < 0) {
        throw new IndexOutOfRangeException(offset);
      }
      if (bytes < 0) {
        throw new IndexOutOfRangeException(bytes);
      }
      if ((offset + bytes) > buffer.length) {
        throw new IndexOutOfRangeException(offset + bytes);
      }
      // When using the Dart C API access to ObjectArray by index is
      // currently much faster. This function will make a copy of the
      // supplied List to an ObjectArray if it isn't already.
      ObjectArray outBuffer;
      int outOffset = offset;
      if (buffer is ObjectArray) {
        outBuffer = buffer;
      } else {
        outBuffer = new ObjectArray(bytes);
        outOffset = 0;
        int j = offset;
        for (int i = 0; i < bytes; i++) {
          outBuffer[i] = buffer[j];
          j++;
        }
      }
      var bytes_written = _writeList(outBuffer, outOffset, bytes);
      if (bytes_written < 0) {
        // If writing fails we return 0 as the number of bytes and
        // report the error on the error handler.
        bytes_written = 0;
        _reportError();
      }
      return bytes_written;
    }
    throw new
        SocketIOException("Error: writeList failed - invalid socket handle");
  }

  int _writeList(List<int> buffer, int offset, int bytes)
      native "Socket_WriteList";

  void _reportError() {
    // For all errors we close the socket, call the error handler and
    // disable further calls of the error handler.
    close();
    var errorHandler = _handlerMap[_ERROR_EVENT];
    if (errorHandler != null) {
      errorHandler();
      _setHandler(_ERROR_EVENT, null);
    }
  }

  bool _createConnect(String host, int port) native "Socket_CreateConnect";

  void set writeHandler(void callback()) {
    if (_outputStream != null) throw new StreamException(
            "Cannot set write handler when output stream is used");
    _clientWriteHandler = callback;
    _updateOutHandler();
  }

  void set connectHandler(void callback()) {
    if (_seenFirstOutEvent || _outputStream != null) {
      throw new StreamException(
          "Cannot set connect handler when already connected");
    }
    if (_outputStream != null) {
      throw new StreamException(
          "Cannot set connect handler when output stream is used");
    }
    _clientConnectHandler = callback;
    _updateOutHandler();
  }

  void set dataHandler(void callback()) {
    if (_inputStream != null) throw new StreamException(
            "Cannot set data handler when input stream is used");
    _dataHandler = callback;
  }

  void set closeHandler(void callback()) {
    if (_inputStream != null) throw new StreamException(
            "Cannot set data handler when input stream is used");
    _closeHandler = callback;
  }

  bool _isListenSocket() => false;

  bool _isPipe() => _pipe;

  InputStream get inputStream() {
    if (_inputStream === null) {
      if (_handlerMap[_IN_EVENT] !== null ||
          _handlerMap[_CLOSE_EVENT] !== null) {
        throw new StreamException(
            "Cannot get input stream when socket handlers are used");
      }
      _inputStream = new SocketInputStream(this);
    }
    return _inputStream;
  }

  OutputStream get outputStream() {
    if (_outputStream === null) {
      if (_handlerMap[_OUT_EVENT] !== null) {
        throw new StreamException(
            "Cannot get input stream when socket handlers are used");
      }
      _outputStream = new SocketOutputStream(this);
    }
    return _outputStream;
  }

  void set _writeHandler(void callback()) {
    _setHandler(_OUT_EVENT, callback);
  }

  void set _dataHandler(void callback()) {
    _setHandler(_IN_EVENT, callback);
  }

  void set _closeHandler(void callback()) {
    _setHandler(_CLOSE_EVENT, callback);
  }

  void _updateOutHandler() {
    void firstWriteHandler() {
      assert(!_seenFirstOutEvent);
      _seenFirstOutEvent = true;

      // From now on the write handler is only the client write
      // handler (connect handler cannot be called again). Change this
      // before calling any handlers as handlers can change the
      // handlers.
      if (_clientWriteHandler === null) _writeHandler = _clientWriteHandler;

      // First out event is socket connected event.
      if (_clientConnectHandler !== null) _clientConnectHandler();
      _clientConnectHandler = null;

      // Always (even for the first out event) call the write handler.
      if (_clientWriteHandler !== null) _clientWriteHandler();
    }

    if (_clientConnectHandler === null && _clientWriteHandler === null) {
      _writeHandler = null;
    } else {
      if (_seenFirstOutEvent) {
        _writeHandler = _clientWriteHandler;
      } else {
        _writeHandler = firstWriteHandler;
      }
    }
  }

  bool _seenFirstOutEvent = false;
  bool _closedRead = false;
  bool _closedWrite = false;
  bool _pipe = false;
  Function _clientConnectHandler;
  Function _clientWriteHandler;
  SocketInputStream _inputStream;
  SocketOutputStream _outputStream;
}

