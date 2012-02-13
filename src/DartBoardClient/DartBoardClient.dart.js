//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
$defProp(Object.prototype, '$typeNameOf', function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
});
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $ne(x, y) {
  if (x == null) return y != null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x != y : !x.$eq(y);
}
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "addEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("addEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "group$1", function($0) {
  return this.noSuchMethod("group", [$0]);
});
$defProp(Object.prototype, "is$Exception", function() {
  return false;
});
$defProp(Object.prototype, "is$Map_dart_core_String$Dynamic", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Document", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "open$2", function($0, $1) {
  return this.noSuchMethod("open", [$0, $1]);
});
$defProp(Object.prototype, "open$3", function($0, $1, $2) {
  return this.noSuchMethod("open", [$0, $1, $2]);
});
$defProp(Object.prototype, "open$4", function($0, $1, $2, $3) {
  return this.noSuchMethod("open", [$0, $1, $2, $3]);
});
$defProp(Object.prototype, "open$5", function($0, $1, $2, $3, $4) {
  return this.noSuchMethod("open", [$0, $1, $2, $3, $4]);
});
$defProp(Object.prototype, "postMessage$1", function($0) {
  return this.noSuchMethod("postMessage", [$0]);
});
$defProp(Object.prototype, "postMessage$2", function($0, $1) {
  return this.noSuchMethod("postMessage", [$0, $1]);
});
$defProp(Object.prototype, "postMessage$3", function($0, $1, $2) {
  return this.noSuchMethod("postMessage", [$0, $1, $2]);
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "scroll$2", function($0, $1) {
  return this.noSuchMethod("scroll", [$0, $1]);
});
$defProp(Object.prototype, "send$0", function() {
  return this.noSuchMethod("send", []);
});
$defProp(Object.prototype, "send$1", function($0) {
  return this.noSuchMethod("send", [$0]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.is$Exception = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
IllegalAccessException.prototype.is$Exception = function(){return true};
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._existingArgumentNames = _existingArgumentNames;
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.is$Exception = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return $add($add(("NoSuchMethodException : method not found: '" + this._functionName + "'\n"), ("Receiver: " + this._receiver + "\n")), ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return $add($add($add("NoSuchMethodException: incorrect number of arguments passed to ", ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n")), ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n")), ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.is$Exception = function(){return true};
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.is$Exception = function(){return true};
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.is$Exception = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.is$Exception = function(){return true};
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.is$Exception = function(){return true};
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.is$Exception = function(){return true};
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.is$Exception = function(){return true};
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.is$Exception = function(){return true};
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.is$Exception = function(){return true};
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.is$Exception = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for Math **************
Math.parseInt = function(str) {
  var ret = parseInt(str);
    if (isNaN(ret)) $throw(new BadNumberFormatException(str));
    return ret;
}
// ********** Code for Strings **************
function Strings() {}
Strings.String$fromCharCodes$factory = function(charCodes) {
  return StringBase.createFromCharCodes(charCodes);
}
// ********** Code for top level **************
function dart_core_print(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "isEmpty", function() {
  return this.get$length() == (0);
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear);
$defProp(ListFactory.prototype, "filter$1", function($0) {
  return this.filter(to$call$1($0));
});
$defProp(ListFactory.prototype, "forEach$1", function($0) {
  return this.forEach(to$call$1($0));
});
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for ImmutableList **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(ImmutableList, ListFactory);
function ImmutableList(length) {
  Array.call(this, length);
}
ImmutableList.ImmutableList$from$factory = function(other) {
  return _constList(other);
}
ImmutableList.prototype.get$length = function() {
  return this.length;
}
ImmutableList.prototype.set$length = function(length) {
  $throw(const$0006);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0006);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0006);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0006);
}
ImmutableList.prototype.clear = function() {
  $throw(const$0006);
}
ImmutableList.prototype.toString = function() {
  return ListFactory.ListFactory$from$factory(this).toString();
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear;
// ********** Code for ImmutableMap **************
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.isEmpty = function() {
  return this._internal.isEmpty();
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach(f);
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0006);
}
ImmutableMap.prototype.putIfAbsent = function(key, ifAbsent) {
  $throw(const$0006);
}
ImmutableMap.prototype.clear = function() {
  $throw(const$0006);
}
ImmutableMap.prototype.clear$0 = ImmutableMap.prototype.clear;
ImmutableMap.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for JSSyntaxRegExp **************
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add(($eq(multiLine, true) ? "m" : ""), ($eq(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.is$RegExp = function(){return true};
JSSyntaxRegExp.prototype.firstMatch = function(str) {
  var m = this._exec(str);
  return m == null ? null : new MatchImplementation(this.pattern, str, this._matchStart(m), this.get$_lastIndex(), m);
}
JSSyntaxRegExp.prototype._exec = function(str) {
  return this.re.exec(str);
}
JSSyntaxRegExp.prototype._matchStart = function(m) {
  return m.index;
}
JSSyntaxRegExp.prototype.get$_lastIndex = function() {
  return this.re.lastIndex;
}
// ********** Code for MatchImplementation **************
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.str = str;
  this._start = _start;
  this._groups = _groups;
  this.pattern = pattern;
  this._end = _end;
}
MatchImplementation.prototype.group = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.$index = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.group$1 = MatchImplementation.prototype.group;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
// ********** Code for FutureNotCompleteException **************
function FutureNotCompleteException() {

}
FutureNotCompleteException.prototype.is$Exception = function(){return true};
FutureNotCompleteException.prototype.toString = function() {
  return "Exception: future has not been completed";
}
// ********** Code for FutureAlreadyCompleteException **************
function FutureAlreadyCompleteException() {

}
FutureAlreadyCompleteException.prototype.is$Exception = function(){return true};
FutureAlreadyCompleteException.prototype.toString = function() {
  return "Exception: future already completed";
}
// ********** Code for FutureImpl **************
function FutureImpl() {
  this._exceptionHandlers = new Array();
  this._listeners = new Array();
  this._isComplete = false;
  this._exceptionHandled = false;
}
FutureImpl.prototype.get$value = function() {
  if (!this.get$isComplete()) {
    $throw(new FutureNotCompleteException());
  }
  if (null != this._exception) {
    $throw(this._exception);
  }
  return this._value;
}
FutureImpl.prototype.get$isComplete = function() {
  return this._isComplete;
}
FutureImpl.prototype.get$hasValue = function() {
  return this.get$isComplete() && null == this._exception;
}
FutureImpl.prototype.then = function(onComplete) {
  if (this.get$hasValue()) {
    onComplete(this.get$value());
  }
  else if (!this.get$isComplete()) {
    this._listeners.add(onComplete);
  }
  else if (!this._exceptionHandled) {
    $throw(this._exception);
  }
}
FutureImpl.prototype._complete = function() {
  this._isComplete = true;
  if (null != this._exception) {
    var $$list = this._exceptionHandlers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      if (handler.call$1(this._exception)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var listener = $$i.next();
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > (0)) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl.prototype._setException = function(exception) {
  if (null == exception) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
// ********** Code for CompleterImpl **************
function CompleterImpl() {}
CompleterImpl.prototype.get$future = function() {
  return this._futureImpl;
}
CompleterImpl.prototype.complete = function(value) {
  this._futureImpl._setValue(value);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
// ********** Code for CompleterImpl_ElementRect **************
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {
  this._futureImpl = new FutureImpl();
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0001 ? null == (existingKey) : const$0001 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0001) : key === const$0001)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0001) : $0 === const$0001))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.putIfAbsent = function(key, ifAbsent) {
  var index = this._probeForLookup(key);
  if (index >= (0)) return this._values.$index(index);
  var value = ifAbsent();
  this.$setindex(key, value);
  return value;
}
HashMapImplementation.prototype.isEmpty = function() {
  return this._numberOfEntries == (0);
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0001) : key !== const$0001))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear;
HashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.clear$0 = HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.clear;
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach$1(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.isEmpty = function() {
  return this._backingMap.isEmpty();
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._entries = set_._backingMap._keys;
  this._nextValidIndex = (-1);
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0001) : $0 === const$0001)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0001;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for KeyValuePair **************
function KeyValuePair(key, value) {
  this.value = value;
  this.key = key;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for LinkedHashMapImplementation **************
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.putIfAbsent = function(key, ifAbsent) {
  var value = this.$index(key);
  if ((null == this.$index(key)) && !(this.containsKey(key))) {
    value = ifAbsent();
    this.$setindex(key, value);
  }
  return value;
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
LinkedHashMapImplementation.prototype.clear = function() {
  this._map.clear();
  this._list.clear();
}
LinkedHashMapImplementation.prototype.clear$0 = LinkedHashMapImplementation.prototype.clear;
LinkedHashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0007);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0007);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.first = function() {
  return this._sentinel._next.get$element();
}
DoubleLinkedQueue.prototype.get$first = function() {
  return this.first.bind(this);
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.isEmpty = function() {
  var $0;
  return ((($0 = this._sentinel._next) == null ? null == (this._sentinel) : $0 === this._sentinel));
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear;
DoubleLinkedQueue.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for DoubleLinkedQueue_KeyValuePair **************
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
DoubleLinkedQueue_KeyValuePair.prototype.clear$0 = DoubleLinkedQueue_KeyValuePair.prototype.clear;
DoubleLinkedQueue_KeyValuePair.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue_KeyValuePair.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.isEmpty = function() {
  return this._length == (0);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.createFromCharCodes = function(charCodes) {
  if (Object.getPrototypeOf(charCodes) !== Array.prototype) {
    charCodes = new ListFactory.ListFactory$from$factory(charCodes);
  }
  return String.fromCharCode.apply(null, charCodes);
}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.split_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
// ********** Code for _Worker **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
$dynamic("postMessage").Worker = function(msg) {
  return this.postMessage(msg);
}
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _constList(other) {
    other.__proto__ = ImmutableList.prototype;
    return other;
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
//  ********** Library dom **************
// ********** Code for _DOMTypeJs **************
$dynamic("get$dartObjectLocalStorage").DOMType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for _EventTargetJs **************
$dynamic("addEventListener$3").EventTarget = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("addEventListener$3")) {
    return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.addEventListener$3.call(this, $0, $1, $2);
};
// ********** Code for _AbstractWorkerJs **************
$dynamic("addEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _ArrayBufferJs **************
// ********** Code for _ArrayBufferViewJs **************
// ********** Code for _NodeJs **************
$dynamic("get$childNodes").Node = function() { return this.childNodes; };
$dynamic("get$firstChild").Node = function() { return this.firstChild; };
$dynamic("get$parentNode").Node = function() { return this.parentNode; };
$dynamic("set$textContent").Node = function(value) { return this.textContent = value; };
$dynamic("addEventListener$3").Node = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _AttrJs **************
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
// ********** Code for _AudioBufferJs **************
$dynamic("get$length").AudioBuffer = function() { return this.length; };
// ********** Code for _AudioNodeJs **************
// ********** Code for _AudioSourceNodeJs **************
// ********** Code for _AudioBufferSourceNodeJs **************
// ********** Code for _AudioChannelMergerJs **************
// ********** Code for _AudioChannelSplitterJs **************
// ********** Code for _AudioContextJs **************
// ********** Code for _AudioDestinationNodeJs **************
// ********** Code for _AudioParamJs **************
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
// ********** Code for _AudioGainJs **************
// ********** Code for _AudioGainNodeJs **************
// ********** Code for _AudioListenerJs **************
// ********** Code for _AudioPannerNodeJs **************
// ********** Code for _EventJs **************
$dynamic("get$type").Event = function() { return this.type; };
// ********** Code for _AudioProcessingEventJs **************
// ********** Code for _BarInfoJs **************
// ********** Code for _BeforeLoadEventJs **************
// ********** Code for _BiquadFilterNodeJs **************
$dynamic("get$type").BiquadFilterNode = function() { return this.type; };
// ********** Code for _BlobJs **************
$dynamic("get$type").Blob = function() { return this.type; };
// ********** Code for _CharacterDataJs **************
$dynamic("get$length").CharacterData = function() { return this.length; };
// ********** Code for _TextJs **************
// ********** Code for _CDATASectionJs **************
// ********** Code for _CSSRuleJs **************
$dynamic("get$type").CSSRule = function() { return this.type; };
// ********** Code for _CSSCharsetRuleJs **************
// ********** Code for _CSSFontFaceRuleJs **************
$dynamic("get$style").CSSFontFaceRule = function() { return this.style; };
// ********** Code for _CSSImportRuleJs **************
$dynamic("get$href").CSSImportRule = function() { return this.href; };
// ********** Code for _CSSMediaRuleJs **************
// ********** Code for _CSSPageRuleJs **************
$dynamic("get$style").CSSPageRule = function() { return this.style; };
// ********** Code for _CSSValueJs **************
// ********** Code for _CSSPrimitiveValueJs **************
// ********** Code for _CSSRuleListJs **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
// ********** Code for _CSSStyleDeclarationJs **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
// ********** Code for _CSSStyleRuleJs **************
$dynamic("get$style").CSSStyleRule = function() { return this.style; };
// ********** Code for _StyleSheetJs **************
$dynamic("get$href").StyleSheet = function() { return this.href; };
$dynamic("get$type").StyleSheet = function() { return this.type; };
// ********** Code for _CSSStyleSheetJs **************
// ********** Code for _CSSUnknownRuleJs **************
// ********** Code for _CSSValueListJs **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
// ********** Code for _CanvasGradientJs **************
// ********** Code for _CanvasPatternJs **************
// ********** Code for _CanvasPixelArrayJs **************
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").CanvasPixelArray = function() {
  return this.length == (0);
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
$dynamic("filter$1").CanvasPixelArray = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").CanvasPixelArray = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _CanvasRenderingContextJs **************
// ********** Code for _CanvasRenderingContext2DJs **************
// ********** Code for _ClientRectJs **************
// ********** Code for _ClientRectListJs **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
// ********** Code for _ClipboardJs **************
// ********** Code for _CloseEventJs **************
// ********** Code for _CommentJs **************
// ********** Code for _UIEventJs **************
$dynamic("get$keyCode").UIEvent = function() { return this.keyCode; };
// ********** Code for _CompositionEventJs **************
// ********** Code for _ConsoleJs **************
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
_ConsoleJs.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
_ConsoleJs.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for _ConvolverNodeJs **************
// ********** Code for _CoordinatesJs **************
// ********** Code for _CounterJs **************
// ********** Code for _CryptoJs **************
// ********** Code for _CustomEventJs **************
// ********** Code for _DOMApplicationCacheJs **************
$dynamic("get$status").DOMApplicationCache = function() { return this.status; };
$dynamic("addEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _DOMExceptionJs **************
// ********** Code for _DOMFileSystemJs **************
// ********** Code for _DOMFileSystemSyncJs **************
// ********** Code for _DOMFormDataJs **************
// ********** Code for _DOMImplementationJs **************
// ********** Code for _DOMMimeTypeJs **************
$dynamic("get$type").DOMMimeType = function() { return this.type; };
// ********** Code for _DOMMimeTypeArrayJs **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
// ********** Code for _DOMParserJs **************
// ********** Code for _DOMPluginJs **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
// ********** Code for _DOMPluginArrayJs **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
// ********** Code for _DOMSelectionJs **************
$dynamic("get$type").DOMSelection = function() { return this.type; };
// ********** Code for _DOMTokenListJs **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for _DOMSettableTokenListJs **************
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for _DOMURLJs **************
// ********** Code for _DOMWindowJs **************
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$location").DOMWindow = function() { return this.location; };
$dynamic("get$status").DOMWindow = function() { return this.status; };
$dynamic("get$scroll").DOMWindow = function() {
  return this.scroll.bind(this);
}
$dynamic("addEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("open$2").DOMWindow = function($0, $1) {
  return this.open($0, $1);
};
$dynamic("open$3").DOMWindow = function($0, $1, $2) {
  return this.open($0, $1, $2);
};
$dynamic("postMessage$2").DOMWindow = function($0, $1) {
  return this.postMessage($0, $1);
};
$dynamic("postMessage$3").DOMWindow = function($0, $1, $2) {
  return this.postMessage($0, $1, $2);
};
$dynamic("scroll$2").DOMWindow = function($0, $1) {
  return this.scroll($0, $1);
};
// ********** Code for _DataTransferItemJs **************
$dynamic("get$type").DataTransferItem = function() { return this.type; };
// ********** Code for _DataTransferItemListJs **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
// ********** Code for _DataViewJs **************
// ********** Code for _DatabaseJs **************
// ********** Code for _DatabaseSyncJs **************
// ********** Code for _WorkerContextJs **************
$dynamic("get$location").WorkerContext = function() { return this.location; };
$dynamic("addEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _DedicatedWorkerContextJs **************
$dynamic("postMessage$1").DedicatedWorkerContext = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").DedicatedWorkerContext = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for _DelayNodeJs **************
// ********** Code for _DeviceMotionEventJs **************
// ********** Code for _DeviceOrientationEventJs **************
// ********** Code for _EntryJs **************
// ********** Code for _DirectoryEntryJs **************
// ********** Code for _EntrySyncJs **************
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
// ********** Code for _DirectoryEntrySyncJs **************
// ********** Code for _DirectoryReaderJs **************
// ********** Code for _DirectoryReaderSyncJs **************
// ********** Code for _DocumentJs **************
$dynamic("get$defaultView").Document = function() { return this.defaultView; };
$dynamic("get$documentElement").Document = function() { return this.documentElement; };
$dynamic("get$location").Document = function() { return this.location; };
$dynamic("get$readyState").Document = function() { return this.readyState; };
// ********** Code for _DocumentFragmentJs **************
// ********** Code for _DocumentTypeJs **************
// ********** Code for _DynamicsCompressorNodeJs **************
// ********** Code for _ElementJs **************
$dynamic("get$childElementCount").Element = function() { return this.childElementCount; };
$dynamic("get$firstElementChild").Element = function() { return this.firstElementChild; };
$dynamic("get$style").Element = function() { return this.style; };
// ********** Code for _ElementTimeControlJs **************
// ********** Code for _ElementTraversalJs **************
$dynamic("get$childElementCount").ElementTraversal = function() { return this.childElementCount; };
$dynamic("get$firstElementChild").ElementTraversal = function() { return this.firstElementChild; };
// ********** Code for _EntityJs **************
// ********** Code for _EntityReferenceJs **************
// ********** Code for _EntryArrayJs **************
$dynamic("get$length").EntryArray = function() { return this.length; };
// ********** Code for _EntryArraySyncJs **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
// ********** Code for _ErrorEventJs **************
// ********** Code for _EventExceptionJs **************
// ********** Code for _EventSourceJs **************
$dynamic("get$readyState").EventSource = function() { return this.readyState; };
$dynamic("addEventListener$3").EventSource = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _FileJs **************
// ********** Code for _FileEntryJs **************
// ********** Code for _FileEntrySyncJs **************
// ********** Code for _FileErrorJs **************
// ********** Code for _FileExceptionJs **************
// ********** Code for _FileListJs **************
$dynamic("get$length").FileList = function() { return this.length; };
// ********** Code for _FileReaderJs **************
$dynamic("get$readyState").FileReader = function() { return this.readyState; };
$dynamic("addEventListener$3").FileReader = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _FileReaderSyncJs **************
// ********** Code for _FileWriterJs **************
$dynamic("get$length").FileWriter = function() { return this.length; };
$dynamic("get$readyState").FileWriter = function() { return this.readyState; };
// ********** Code for _FileWriterSyncJs **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayJs **************
var _Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new dom__FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Float32Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Float64ArrayJs **************
var _Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new dom__FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Float64Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float64Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float64Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _GeolocationJs **************
// ********** Code for _GeopositionJs **************
// ********** Code for _HTMLAllCollectionJs **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
// ********** Code for _HTMLElementJs **************
$dynamic("get$children").HTMLElement = function() { return this.children; };
$dynamic("get$innerHTML").HTMLElement = function() { return this.innerHTML; };
$dynamic("set$innerHTML").HTMLElement = function(value) { return this.innerHTML = value; };
// ********** Code for _HTMLAnchorElementJs **************
$dynamic("get$href").HTMLAnchorElement = function() { return this.href; };
$dynamic("get$type").HTMLAnchorElement = function() { return this.type; };
// ********** Code for _HTMLAppletElementJs **************
// ********** Code for _HTMLAreaElementJs **************
$dynamic("get$href").HTMLAreaElement = function() { return this.href; };
// ********** Code for _HTMLMediaElementJs **************
$dynamic("get$readyState").HTMLMediaElement = function() { return this.readyState; };
// ********** Code for _HTMLAudioElementJs **************
// ********** Code for _HTMLBRElementJs **************
// ********** Code for _HTMLBaseElementJs **************
$dynamic("get$href").HTMLBaseElement = function() { return this.href; };
// ********** Code for _HTMLBaseFontElementJs **************
// ********** Code for _HTMLBodyElementJs **************
// ********** Code for _HTMLButtonElementJs **************
$dynamic("get$type").HTMLButtonElement = function() { return this.type; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
$dynamic("get$click").HTMLButtonElement = function() {
  return this.click.bind(this);
}
// ********** Code for _HTMLCanvasElementJs **************
// ********** Code for _HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").HTMLCollection = function() {
  return this.length == (0);
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("filter$1").HTMLCollection = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").HTMLCollection = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _HTMLDListElementJs **************
// ********** Code for _HTMLDetailsElementJs **************
// ********** Code for _HTMLDirectoryElementJs **************
// ********** Code for _HTMLDivElementJs **************
// ********** Code for _HTMLDocumentJs **************
$dynamic("clear$0").HTMLDocument = function() {
  return this.clear();
};
// ********** Code for _HTMLEmbedElementJs **************
$dynamic("get$type").HTMLEmbedElement = function() { return this.type; };
// ********** Code for _HTMLFieldSetElementJs **************
// ********** Code for _HTMLFontElementJs **************
// ********** Code for _HTMLFormElementJs **************
$dynamic("get$elements").HTMLFormElement = function() { return this.elements; };
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
// ********** Code for _HTMLFrameElementJs **************
$dynamic("get$location").HTMLFrameElement = function() { return this.location; };
// ********** Code for _HTMLFrameSetElementJs **************
// ********** Code for _HTMLHRElementJs **************
// ********** Code for _HTMLHeadElementJs **************
// ********** Code for _HTMLHeadingElementJs **************
// ********** Code for _HTMLHtmlElementJs **************
// ********** Code for _HTMLIFrameElementJs **************
// ********** Code for _HTMLImageElementJs **************
// ********** Code for _HTMLInputElementJs **************
$dynamic("get$selectionEnd").HTMLInputElement = function() { return this.selectionEnd; };
$dynamic("get$selectionStart").HTMLInputElement = function() { return this.selectionStart; };
$dynamic("get$type").HTMLInputElement = function() { return this.type; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
$dynamic("get$click").HTMLInputElement = function() {
  return this.click.bind(this);
}
// ********** Code for _HTMLIsIndexElementJs **************
// ********** Code for _HTMLKeygenElementJs **************
$dynamic("get$type").HTMLKeygenElement = function() { return this.type; };
// ********** Code for _HTMLLIElementJs **************
$dynamic("get$type").HTMLLIElement = function() { return this.type; };
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for _HTMLLabelElementJs **************
// ********** Code for _HTMLLegendElementJs **************
// ********** Code for _HTMLLinkElementJs **************
$dynamic("get$href").HTMLLinkElement = function() { return this.href; };
$dynamic("get$type").HTMLLinkElement = function() { return this.type; };
// ********** Code for _HTMLMapElementJs **************
// ********** Code for _HTMLMarqueeElementJs **************
// ********** Code for _HTMLMenuElementJs **************
// ********** Code for _HTMLMetaElementJs **************
// ********** Code for _HTMLMeterElementJs **************
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for _HTMLModElementJs **************
// ********** Code for _HTMLOListElementJs **************
$dynamic("get$type").HTMLOListElement = function() { return this.type; };
// ********** Code for _HTMLObjectElementJs **************
$dynamic("get$type").HTMLObjectElement = function() { return this.type; };
// ********** Code for _HTMLOptGroupElementJs **************
// ********** Code for _HTMLOptionElementJs **************
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for _HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() { return this.length; };
// ********** Code for _HTMLOutputElementJs **************
$dynamic("get$type").HTMLOutputElement = function() { return this.type; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for _HTMLParagraphElementJs **************
// ********** Code for _HTMLParamElementJs **************
$dynamic("get$type").HTMLParamElement = function() { return this.type; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for _HTMLPreElementJs **************
// ********** Code for _HTMLProgressElementJs **************
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for _HTMLQuoteElementJs **************
// ********** Code for _HTMLScriptElementJs **************
$dynamic("get$type").HTMLScriptElement = function() { return this.type; };
// ********** Code for _HTMLSelectElementJs **************
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$type").HTMLSelectElement = function() { return this.type; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
// ********** Code for _HTMLSourceElementJs **************
$dynamic("get$type").HTMLSourceElement = function() { return this.type; };
// ********** Code for _HTMLSpanElementJs **************
// ********** Code for _HTMLStyleElementJs **************
$dynamic("get$type").HTMLStyleElement = function() { return this.type; };
// ********** Code for _HTMLTableCaptionElementJs **************
// ********** Code for _HTMLTableCellElementJs **************
// ********** Code for _HTMLTableColElementJs **************
// ********** Code for _HTMLTableElementJs **************
// ********** Code for _HTMLTableRowElementJs **************
// ********** Code for _HTMLTableSectionElementJs **************
// ********** Code for _HTMLTextAreaElementJs **************
$dynamic("get$selectionEnd").HTMLTextAreaElement = function() { return this.selectionEnd; };
$dynamic("get$selectionStart").HTMLTextAreaElement = function() { return this.selectionStart; };
$dynamic("get$type").HTMLTextAreaElement = function() { return this.type; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for _HTMLTitleElementJs **************
// ********** Code for _HTMLTrackElementJs **************
$dynamic("get$readyState").HTMLTrackElement = function() { return this.readyState; };
// ********** Code for _HTMLUListElementJs **************
$dynamic("get$type").HTMLUListElement = function() { return this.type; };
// ********** Code for _HTMLUnknownElementJs **************
// ********** Code for _HTMLVideoElementJs **************
// ********** Code for _HashChangeEventJs **************
// ********** Code for _HighPass2FilterNodeJs **************
// ********** Code for _HistoryJs **************
$dynamic("get$length").History = function() { return this.length; };
// ********** Code for _IDBAnyJs **************
// ********** Code for _IDBCursorJs **************
// ********** Code for _IDBCursorWithValueJs **************
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
// ********** Code for _IDBDatabaseJs **************
$dynamic("addEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBDatabaseErrorJs **************
// ********** Code for _IDBDatabaseExceptionJs **************
// ********** Code for _IDBFactoryJs **************
// ********** Code for _IDBIndexJs **************
// ********** Code for _IDBKeyJs **************
// ********** Code for _IDBKeyRangeJs **************
// ********** Code for _IDBObjectStoreJs **************
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for _IDBRequestJs **************
$dynamic("get$readyState").IDBRequest = function() { return this.readyState; };
$dynamic("addEventListener$3").IDBRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBTransactionJs **************
$dynamic("addEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBVersionChangeEventJs **************
// ********** Code for _IDBVersionChangeRequestJs **************
// ********** Code for _ImageDataJs **************
// ********** Code for _Int16ArrayJs **************
var _Int16ArrayJs = {};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int16Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Int32ArrayJs **************
var _Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int32Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Int8ArrayJs **************
var _Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int8Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _JavaScriptAudioNodeJs **************
// ********** Code for _JavaScriptCallFrameJs **************
$dynamic("get$type").JavaScriptCallFrame = function() { return this.type; };
// ********** Code for _KeyboardEventJs **************
$dynamic("get$keyIdentifier").KeyboardEvent = function() { return this.keyIdentifier; };
$dynamic("get$keyLocation").KeyboardEvent = function() { return this.keyLocation; };
// ********** Code for _LocationJs **************
$dynamic("get$href").Location = function() { return this.href; };
// ********** Code for _LowPass2FilterNodeJs **************
// ********** Code for _MediaControllerJs **************
$dynamic("addEventListener$3").MediaController = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _MediaElementAudioSourceNodeJs **************
// ********** Code for _MediaErrorJs **************
// ********** Code for _MediaListJs **************
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new dom__FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").MediaList = function() {
  return this.length == (0);
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").MediaList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").MediaList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _MediaQueryListJs **************
// ********** Code for _MediaQueryListListenerJs **************
// ********** Code for _MemoryInfoJs **************
// ********** Code for _MessageChannelJs **************
// ********** Code for _MessageEventJs **************
// ********** Code for _MessagePortJs **************
$dynamic("addEventListener$3").MessagePort = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("postMessage$1").MessagePort = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").MessagePort = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for _MetadataJs **************
// ********** Code for _MouseEventJs **************
// ********** Code for _MutationEventJs **************
// ********** Code for _NamedNodeMapJs **************
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").NamedNodeMap = function() {
  return this.length == (0);
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NamedNodeMap = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NamedNodeMap = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _NavigatorJs **************
// ********** Code for _NodeFilterJs **************
// ********** Code for _NodeIteratorJs **************
// ********** Code for _NodeListJs **************
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NodeList = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NodeList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NodeList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NodeList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").NodeList = function() {
  return this.length == (0);
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NodeList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NodeList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _NodeSelectorJs **************
// ********** Code for _NotationJs **************
// ********** Code for _NotificationJs **************
$dynamic("addEventListener$3").Notification = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _NotificationCenterJs **************
// ********** Code for _OESStandardDerivativesJs **************
// ********** Code for _OESTextureFloatJs **************
// ********** Code for _OESVertexArrayObjectJs **************
// ********** Code for _OfflineAudioCompletionEventJs **************
// ********** Code for _OperationNotAllowedExceptionJs **************
// ********** Code for _OverflowEventJs **************
// ********** Code for _PageTransitionEventJs **************
// ********** Code for _PerformanceJs **************
// ********** Code for _PerformanceNavigationJs **************
$dynamic("get$type").PerformanceNavigation = function() { return this.type; };
// ********** Code for _PerformanceTimingJs **************
// ********** Code for _PopStateEventJs **************
// ********** Code for _PositionErrorJs **************
// ********** Code for _ProcessingInstructionJs **************
// ********** Code for _ProgressEventJs **************
// ********** Code for _RGBColorJs **************
// ********** Code for _RangeJs **************
// ********** Code for _RangeExceptionJs **************
// ********** Code for _RealtimeAnalyserNodeJs **************
// ********** Code for _RectJs **************
// ********** Code for _SQLErrorJs **************
// ********** Code for _SQLExceptionJs **************
// ********** Code for _SQLResultSetJs **************
// ********** Code for _SQLResultSetRowListJs **************
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
// ********** Code for _SQLTransactionJs **************
// ********** Code for _SQLTransactionSyncJs **************
// ********** Code for _SVGElementJs **************
// ********** Code for _SVGAElementJs **************
$dynamic("get$href").SVGAElement = function() { return this.href; };
$dynamic("get$style").SVGAElement = function() { return this.style; };
// ********** Code for _SVGAltGlyphDefElementJs **************
// ********** Code for _SVGTextContentElementJs **************
$dynamic("get$style").SVGTextContentElement = function() { return this.style; };
// ********** Code for _SVGTextPositioningElementJs **************
// ********** Code for _SVGAltGlyphElementJs **************
$dynamic("get$href").SVGAltGlyphElement = function() { return this.href; };
// ********** Code for _SVGAltGlyphItemElementJs **************
// ********** Code for _SVGAngleJs **************
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
// ********** Code for _SVGAnimationElementJs **************
// ********** Code for _SVGAnimateColorElementJs **************
// ********** Code for _SVGAnimateElementJs **************
// ********** Code for _SVGAnimateMotionElementJs **************
// ********** Code for _SVGAnimateTransformElementJs **************
// ********** Code for _SVGAnimatedAngleJs **************
// ********** Code for _SVGAnimatedBooleanJs **************
// ********** Code for _SVGAnimatedEnumerationJs **************
// ********** Code for _SVGAnimatedIntegerJs **************
// ********** Code for _SVGAnimatedLengthJs **************
// ********** Code for _SVGAnimatedLengthListJs **************
// ********** Code for _SVGAnimatedNumberJs **************
// ********** Code for _SVGAnimatedNumberListJs **************
// ********** Code for _SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for _SVGAnimatedRectJs **************
// ********** Code for _SVGAnimatedStringJs **************
// ********** Code for _SVGAnimatedTransformListJs **************
// ********** Code for _SVGCircleElementJs **************
$dynamic("get$style").SVGCircleElement = function() { return this.style; };
// ********** Code for _SVGClipPathElementJs **************
$dynamic("get$style").SVGClipPathElement = function() { return this.style; };
// ********** Code for _SVGColorJs **************
// ********** Code for _SVGComponentTransferFunctionElementJs **************
$dynamic("get$type").SVGComponentTransferFunctionElement = function() { return this.type; };
// ********** Code for _SVGCursorElementJs **************
$dynamic("get$href").SVGCursorElement = function() { return this.href; };
// ********** Code for _SVGDefsElementJs **************
$dynamic("get$style").SVGDefsElement = function() { return this.style; };
// ********** Code for _SVGDescElementJs **************
$dynamic("get$style").SVGDescElement = function() { return this.style; };
// ********** Code for _SVGDocumentJs **************
// ********** Code for _SVGElementInstanceJs **************
$dynamic("get$childNodes").SVGElementInstance = function() { return this.childNodes; };
$dynamic("get$firstChild").SVGElementInstance = function() { return this.firstChild; };
$dynamic("get$parentNode").SVGElementInstance = function() { return this.parentNode; };
$dynamic("addEventListener$3").SVGElementInstance = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _SVGElementInstanceListJs **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
// ********** Code for _SVGEllipseElementJs **************
$dynamic("get$style").SVGEllipseElement = function() { return this.style; };
// ********** Code for _SVGExceptionJs **************
// ********** Code for _SVGExternalResourcesRequiredJs **************
// ********** Code for _SVGFEBlendElementJs **************
$dynamic("get$style").SVGFEBlendElement = function() { return this.style; };
// ********** Code for _SVGFEColorMatrixElementJs **************
$dynamic("get$type").SVGFEColorMatrixElement = function() { return this.type; };
$dynamic("get$style").SVGFEColorMatrixElement = function() { return this.style; };
// ********** Code for _SVGFEComponentTransferElementJs **************
$dynamic("get$style").SVGFEComponentTransferElement = function() { return this.style; };
// ********** Code for _SVGFECompositeElementJs **************
$dynamic("get$style").SVGFECompositeElement = function() { return this.style; };
// ********** Code for _SVGFEConvolveMatrixElementJs **************
$dynamic("get$style").SVGFEConvolveMatrixElement = function() { return this.style; };
// ********** Code for _SVGFEDiffuseLightingElementJs **************
$dynamic("get$style").SVGFEDiffuseLightingElement = function() { return this.style; };
// ********** Code for _SVGFEDisplacementMapElementJs **************
$dynamic("get$style").SVGFEDisplacementMapElement = function() { return this.style; };
// ********** Code for _SVGFEDistantLightElementJs **************
// ********** Code for _SVGFEDropShadowElementJs **************
$dynamic("get$style").SVGFEDropShadowElement = function() { return this.style; };
// ********** Code for _SVGFEFloodElementJs **************
$dynamic("get$style").SVGFEFloodElement = function() { return this.style; };
// ********** Code for _SVGFEFuncAElementJs **************
// ********** Code for _SVGFEFuncBElementJs **************
// ********** Code for _SVGFEFuncGElementJs **************
// ********** Code for _SVGFEFuncRElementJs **************
// ********** Code for _SVGFEGaussianBlurElementJs **************
$dynamic("get$style").SVGFEGaussianBlurElement = function() { return this.style; };
// ********** Code for _SVGFEImageElementJs **************
$dynamic("get$href").SVGFEImageElement = function() { return this.href; };
$dynamic("get$style").SVGFEImageElement = function() { return this.style; };
// ********** Code for _SVGFEMergeElementJs **************
$dynamic("get$style").SVGFEMergeElement = function() { return this.style; };
// ********** Code for _SVGFEMergeNodeElementJs **************
// ********** Code for _SVGFEMorphologyElementJs **************
$dynamic("get$style").SVGFEMorphologyElement = function() { return this.style; };
// ********** Code for _SVGFEOffsetElementJs **************
$dynamic("get$style").SVGFEOffsetElement = function() { return this.style; };
// ********** Code for _SVGFEPointLightElementJs **************
// ********** Code for _SVGFESpecularLightingElementJs **************
$dynamic("get$style").SVGFESpecularLightingElement = function() { return this.style; };
// ********** Code for _SVGFESpotLightElementJs **************
// ********** Code for _SVGFETileElementJs **************
$dynamic("get$style").SVGFETileElement = function() { return this.style; };
// ********** Code for _SVGFETurbulenceElementJs **************
$dynamic("get$type").SVGFETurbulenceElement = function() { return this.type; };
$dynamic("get$style").SVGFETurbulenceElement = function() { return this.style; };
// ********** Code for _SVGFilterElementJs **************
$dynamic("get$href").SVGFilterElement = function() { return this.href; };
$dynamic("get$style").SVGFilterElement = function() { return this.style; };
// ********** Code for _SVGStylableJs **************
$dynamic("get$style").SVGStylable = function() { return this.style; };
// ********** Code for _SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for _SVGFitToViewBoxJs **************
// ********** Code for _SVGFontElementJs **************
// ********** Code for _SVGFontFaceElementJs **************
// ********** Code for _SVGFontFaceFormatElementJs **************
// ********** Code for _SVGFontFaceNameElementJs **************
// ********** Code for _SVGFontFaceSrcElementJs **************
// ********** Code for _SVGFontFaceUriElementJs **************
// ********** Code for _SVGForeignObjectElementJs **************
$dynamic("get$style").SVGForeignObjectElement = function() { return this.style; };
// ********** Code for _SVGGElementJs **************
$dynamic("get$style").SVGGElement = function() { return this.style; };
// ********** Code for _SVGGlyphElementJs **************
// ********** Code for _SVGGlyphRefElementJs **************
$dynamic("get$href").SVGGlyphRefElement = function() { return this.href; };
$dynamic("get$style").SVGGlyphRefElement = function() { return this.style; };
// ********** Code for _SVGGradientElementJs **************
$dynamic("get$href").SVGGradientElement = function() { return this.href; };
$dynamic("get$style").SVGGradientElement = function() { return this.style; };
// ********** Code for _SVGHKernElementJs **************
// ********** Code for _SVGImageElementJs **************
$dynamic("get$href").SVGImageElement = function() { return this.href; };
$dynamic("get$style").SVGImageElement = function() { return this.style; };
// ********** Code for _SVGLangSpaceJs **************
// ********** Code for _SVGLengthJs **************
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
// ********** Code for _SVGLengthListJs **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for _SVGLineElementJs **************
$dynamic("get$style").SVGLineElement = function() { return this.style; };
// ********** Code for _SVGLinearGradientElementJs **************
// ********** Code for _SVGLocatableJs **************
// ********** Code for _SVGMPathElementJs **************
$dynamic("get$href").SVGMPathElement = function() { return this.href; };
// ********** Code for _SVGMarkerElementJs **************
$dynamic("get$style").SVGMarkerElement = function() { return this.style; };
// ********** Code for _SVGMaskElementJs **************
$dynamic("get$style").SVGMaskElement = function() { return this.style; };
// ********** Code for _SVGMatrixJs **************
// ********** Code for _SVGMetadataElementJs **************
// ********** Code for _SVGMissingGlyphElementJs **************
// ********** Code for _SVGNumberJs **************
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
// ********** Code for _SVGNumberListJs **************
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
// ********** Code for _SVGPaintJs **************
// ********** Code for _SVGPathElementJs **************
$dynamic("get$style").SVGPathElement = function() { return this.style; };
// ********** Code for _SVGPathSegJs **************
// ********** Code for _SVGPathSegArcAbsJs **************
// ********** Code for _SVGPathSegArcRelJs **************
// ********** Code for _SVGPathSegClosePathJs **************
// ********** Code for _SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicRelJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for _SVGPathSegLinetoAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for _SVGPathSegLinetoRelJs **************
// ********** Code for _SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for _SVGPathSegLinetoVerticalRelJs **************
// ********** Code for _SVGPathSegListJs **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsJs **************
// ********** Code for _SVGPathSegMovetoRelJs **************
// ********** Code for _SVGPatternElementJs **************
$dynamic("get$href").SVGPatternElement = function() { return this.href; };
$dynamic("get$style").SVGPatternElement = function() { return this.style; };
// ********** Code for _SVGPointJs **************
// ********** Code for _SVGPointListJs **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementJs **************
$dynamic("get$style").SVGPolygonElement = function() { return this.style; };
// ********** Code for _SVGPolylineElementJs **************
$dynamic("get$style").SVGPolylineElement = function() { return this.style; };
// ********** Code for _SVGPreserveAspectRatioJs **************
// ********** Code for _SVGRadialGradientElementJs **************
// ********** Code for _SVGRectJs **************
// ********** Code for _SVGRectElementJs **************
$dynamic("get$style").SVGRectElement = function() { return this.style; };
// ********** Code for _SVGRenderingIntentJs **************
// ********** Code for _SVGSVGElementJs **************
$dynamic("get$style").SVGSVGElement = function() { return this.style; };
// ********** Code for _SVGScriptElementJs **************
$dynamic("get$type").SVGScriptElement = function() { return this.type; };
$dynamic("get$href").SVGScriptElement = function() { return this.href; };
// ********** Code for _SVGSetElementJs **************
// ********** Code for _SVGStopElementJs **************
$dynamic("get$style").SVGStopElement = function() { return this.style; };
// ********** Code for _SVGStringListJs **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementJs **************
$dynamic("get$type").SVGStyleElement = function() { return this.type; };
// ********** Code for _SVGSwitchElementJs **************
$dynamic("get$style").SVGSwitchElement = function() { return this.style; };
// ********** Code for _SVGSymbolElementJs **************
$dynamic("get$style").SVGSymbolElement = function() { return this.style; };
// ********** Code for _SVGTRefElementJs **************
$dynamic("get$href").SVGTRefElement = function() { return this.href; };
// ********** Code for _SVGTSpanElementJs **************
// ********** Code for _SVGTestsJs **************
// ********** Code for _SVGTextElementJs **************
// ********** Code for _SVGTextPathElementJs **************
$dynamic("get$href").SVGTextPathElement = function() { return this.href; };
// ********** Code for _SVGTitleElementJs **************
$dynamic("get$style").SVGTitleElement = function() { return this.style; };
// ********** Code for _SVGTransformJs **************
$dynamic("get$type").SVGTransform = function() { return this.type; };
// ********** Code for _SVGTransformListJs **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for _SVGTransformableJs **************
// ********** Code for _SVGURIReferenceJs **************
$dynamic("get$href").SVGURIReference = function() { return this.href; };
// ********** Code for _SVGUnitTypesJs **************
// ********** Code for _SVGUseElementJs **************
$dynamic("get$href").SVGUseElement = function() { return this.href; };
$dynamic("get$style").SVGUseElement = function() { return this.style; };
// ********** Code for _SVGVKernElementJs **************
// ********** Code for _SVGViewElementJs **************
// ********** Code for _SVGZoomAndPanJs **************
// ********** Code for _SVGViewSpecJs **************
// ********** Code for _SVGZoomEventJs **************
// ********** Code for _ScreenJs **************
// ********** Code for _ScriptProfileJs **************
// ********** Code for _ScriptProfileNodeJs **************
$dynamic("get$children").ScriptProfileNode = function() { return this.children; };
// ********** Code for _SharedWorkerJs **************
// ********** Code for _SharedWorkerContextJs **************
// ********** Code for _SpeechInputEventJs **************
// ********** Code for _SpeechInputResultJs **************
// ********** Code for _SpeechInputResultListJs **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
// ********** Code for _StorageJs **************
$dynamic("get$length").Storage = function() { return this.length; };
$dynamic("get$dartObjectLocalStorage").Storage = function() {
      if (this === window.localStorage)
        return window._dartLocalStorageLocalStorage;
      else if (this === window.sessionStorage)
        return window._dartSessionStorageLocalStorage;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("set$dartObjectLocalStorage").Storage = function(value) {
      if (this === window.localStorage)
        window._dartLocalStorageLocalStorage = value;
      else if (this === window.sessionStorage)
        window._dartSessionStorageLocalStorage = value;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("clear$0").Storage = function() {
  return this.clear();
};
// ********** Code for _StorageEventJs **************
// ********** Code for _StorageInfoJs **************
// ********** Code for _StyleMediaJs **************
$dynamic("get$type").StyleMedia = function() { return this.type; };
// ********** Code for _StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new dom__FixedSizeListIterator_dom_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").StyleSheetList = function() {
  return this.length == (0);
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").StyleSheetList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").StyleSheetList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _TextEventJs **************
// ********** Code for _TextMetricsJs **************
// ********** Code for _TextTrackJs **************
$dynamic("addEventListener$3").TextTrack = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TextTrackCueJs **************
$dynamic("addEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TextTrackCueListJs **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
// ********** Code for _TextTrackListJs **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
$dynamic("addEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TimeRangesJs **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
// ********** Code for _TouchJs **************
// ********** Code for _TouchEventJs **************
// ********** Code for _TouchListJs **************
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new dom__FixedSizeListIterator_dom_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").TouchList = function() {
  return this.length == (0);
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").TouchList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").TouchList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _TrackEventJs **************
// ********** Code for _TreeWalkerJs **************
$dynamic("get$firstChild").TreeWalker = function() {
  return this.firstChild.bind(this);
}
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
// ********** Code for _Uint16ArrayJs **************
var _Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint16Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint32ArrayJs **************
var _Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint32Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint8ArrayJs **************
var _Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint8Array = function() {
  return this.length == (0);
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint8ClampedArrayJs **************
var _Uint8ClampedArrayJs = {};
$dynamic("get$length").Uint8ClampedArray = function() { return this.length; };
// ********** Code for _ValidityStateJs **************
// ********** Code for _WaveShaperNodeJs **************
// ********** Code for _WebGLActiveInfoJs **************
$dynamic("get$type").WebGLActiveInfo = function() { return this.type; };
// ********** Code for _WebGLBufferJs **************
// ********** Code for _WebGLCompressedTexturesJs **************
// ********** Code for _WebGLContextAttributesJs **************
// ********** Code for _WebGLContextEventJs **************
// ********** Code for _WebGLDebugRendererInfoJs **************
// ********** Code for _WebGLDebugShadersJs **************
// ********** Code for _WebGLFramebufferJs **************
// ********** Code for _WebGLLoseContextJs **************
// ********** Code for _WebGLProgramJs **************
// ********** Code for _WebGLRenderbufferJs **************
// ********** Code for _WebGLRenderingContextJs **************
// ********** Code for _WebGLShaderJs **************
// ********** Code for _WebGLTextureJs **************
// ********** Code for _WebGLUniformLocationJs **************
// ********** Code for _WebGLVertexArrayObjectOESJs **************
// ********** Code for _WebKitAnimationJs **************
// ********** Code for _WebKitAnimationEventJs **************
// ********** Code for _WebKitAnimationListJs **************
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
// ********** Code for _WebKitBlobBuilderJs **************
// ********** Code for _WebKitCSSKeyframeRuleJs **************
$dynamic("get$style").WebKitCSSKeyframeRule = function() { return this.style; };
// ********** Code for _WebKitCSSKeyframesRuleJs **************
// ********** Code for _WebKitCSSMatrixJs **************
// ********** Code for _WebKitCSSRegionRuleJs **************
// ********** Code for _WebKitCSSTransformValueJs **************
// ********** Code for _WebKitNamedFlowJs **************
// ********** Code for _WebKitPointJs **************
// ********** Code for _WebKitTransitionEventJs **************
// ********** Code for _WebSocketJs **************
$dynamic("get$readyState").WebSocket = function() { return this.readyState; };
$dynamic("addEventListener$3").WebSocket = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("send$1").WebSocket = function($0) {
  return this.send($0);
};
// ********** Code for _WheelEventJs **************
// ********** Code for _WorkerJs **************
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").Worker = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for _WorkerLocationJs **************
$dynamic("get$href").WorkerLocation = function() { return this.href; };
// ********** Code for _WorkerNavigatorJs **************
// ********** Code for _XMLHttpRequestJs **************
$dynamic("get$readyState").XMLHttpRequest = function() { return this.readyState; };
$dynamic("get$responseText").XMLHttpRequest = function() { return this.responseText; };
$dynamic("get$status").XMLHttpRequest = function() { return this.status; };
$dynamic("addEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("open$2").XMLHttpRequest = function($0, $1) {
  return this.open($0, $1);
};
$dynamic("open$3").XMLHttpRequest = function($0, $1, $2) {
  return this.open($0, $1, $2);
};
$dynamic("open$4").XMLHttpRequest = function($0, $1, $2, $3) {
  return this.open($0, $1, $2, $3);
};
$dynamic("open$5").XMLHttpRequest = function($0, $1, $2, $3, $4) {
  return this.open($0, $1, $2, $3, $4);
};
$dynamic("send$0").XMLHttpRequest = function() {
  return this.send();
};
$dynamic("send$1").XMLHttpRequest = function($0) {
  return this.send($0);
};
// ********** Code for _XMLHttpRequestExceptionJs **************
// ********** Code for _XMLHttpRequestProgressEventJs **************
// ********** Code for _XMLHttpRequestUploadJs **************
$dynamic("addEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _XMLSerializerJs **************
// ********** Code for _XPathEvaluatorJs **************
// ********** Code for _XPathExceptionJs **************
// ********** Code for _XPathExpressionJs **************
// ********** Code for _XPathNSResolverJs **************
// ********** Code for _XPathResultJs **************
// ********** Code for _XSLTProcessorJs **************
// ********** Code for dom__Collections **************
function dom__Collections() {}
dom__Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
dom__Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _DOMParserFactoryProvider **************
function _DOMParserFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
_XMLHttpRequestFactoryProvider.XMLHttpRequest$factory = function() {
  return new XMLHttpRequest();
}
// ********** Code for dom__VariableSizeListIterator **************
function dom__VariableSizeListIterator() {}
dom__VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
dom__VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._dom_array.$index(this._dom_pos++);
}
// ********** Code for dom__FixedSizeListIterator **************
$inherits(dom__FixedSizeListIterator, dom__VariableSizeListIterator);
function dom__FixedSizeListIterator() {}
dom__FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for dom__VariableSizeListIterator_dart_core_String **************
$inherits(dom__VariableSizeListIterator_dart_core_String, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dart_core_String(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dart_core_String **************
$inherits(dom__FixedSizeListIterator_dart_core_String, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dart_core_String(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_int **************
$inherits(dom__VariableSizeListIterator_int, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_int(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_int **************
$inherits(dom__FixedSizeListIterator_int, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_int(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_int.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_num **************
$inherits(dom__VariableSizeListIterator_num, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_num(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_num **************
$inherits(dom__FixedSizeListIterator_num, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_num(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_num.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_Node **************
$inherits(dom__VariableSizeListIterator_dom_Node, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_Node(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_Node **************
$inherits(dom__FixedSizeListIterator_dom_Node, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_Node(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_StyleSheet **************
$inherits(dom__VariableSizeListIterator_dom_StyleSheet, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_StyleSheet(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_StyleSheet **************
$inherits(dom__FixedSizeListIterator_dom_StyleSheet, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_StyleSheet(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_Touch **************
$inherits(dom__VariableSizeListIterator_dom_Touch, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_Touch(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_Touch **************
$inherits(dom__FixedSizeListIterator_dom_Touch, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_Touch(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for DOMWrapperBase **************
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  var hasExistingWrapper = null == this._ptr.get$dartObjectLocalStorage();
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
function DOMWrapperBase() {}
DOMWrapperBase.prototype.get$_ptr = function() { return this._ptr; };
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
function EventTargetWrappingImplementation() {}
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
function NodeWrappingImplementation() {}
NodeWrappingImplementation.prototype.get$nodes = function() {
  if (null == this._nodes) {
    this._nodes = new _ChildrenNodeList._wrap$ctor(this._ptr);
  }
  return this._nodes;
}
NodeWrappingImplementation.prototype.replaceWith = function(otherNode) {
  try {
    this._ptr.get$parentNode().replaceChild(LevelDom.unwrap(otherNode), this._ptr);
  } catch (e) {
    e = _toDartException(e);
  }
  return this;
}
NodeWrappingImplementation.prototype.remove = function() {
  if (null != this._ptr.get$parentNode()) {
    this._ptr.get$parentNode().removeChild(this._ptr);
  }
  return this;
}
NodeWrappingImplementation.prototype.clone = function(deep) {
  return LevelDom.wrapNode(this._ptr.cloneNode(deep));
}
NodeWrappingImplementation.prototype.remove$0 = NodeWrappingImplementation.prototype.remove;
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
function ElementWrappingImplementation() {}
ElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ElementWrappingImplementation.ElementWrappingImplementation$html$factory = function(html) {
  var parentTag = "div";
  var tag;
  var match = const$0005.firstMatch(html);
  if (null != match) {
    tag = match.group$1((1)).toLowerCase();
    if (const$0008.containsKey(tag)) {
      parentTag = const$0008.$index(tag);
    }
  }
  var temp = get$document().createElement(parentTag);
  temp.set$innerHTML(html);
  if (temp.get$childElementCount() == (1)) {
    return LevelDom.wrapElement(temp.get$firstElementChild());
  }
  else if (parentTag == "html" && temp.get$childElementCount() == (2)) {
    return LevelDom.wrapElement(temp.get$children().item(tag == "head" ? (0) : (1)));
  }
  else {
    $throw(new IllegalArgumentException($add(("HTML had " + temp.get$childElementCount() + " "), "top level elements but 1 expected")));
  }
}
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
ElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new _ChildrenElementList._wrap$ctor(this._ptr);
  }
  return this._elements;
}
ElementWrappingImplementation.prototype.get$firstElementChild = function() {
  return LevelDom.wrapElement(this._ptr.get$firstElementChild());
}
ElementWrappingImplementation.prototype.get$innerHTML = function() {
  return this._ptr.get$innerHTML();
}
ElementWrappingImplementation.prototype.set$innerHTML = function(value) {
  this._ptr.set$innerHTML(value);
}
ElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
ElementWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
ElementWrappingImplementation.prototype.get$rect = function() {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return new ElementRectWrappingImplementation($this._ptr);
  })
  , new CompleterImpl_ElementRect());
}
ElementWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
ElementWrappingImplementation.prototype.clone = function(deep) {
  return NodeWrappingImplementation.prototype.clone.call(this, deep);
}
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
AnchorElementWrappingImplementation.prototype.get$href = function() {
  return this._ptr.get$href();
}
AnchorElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
AnchorElementWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for AreaElementWrappingImplementation **************
$inherits(AreaElementWrappingImplementation, ElementWrappingImplementation);
AreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AreaElementWrappingImplementation._wrap$ctor.prototype = AreaElementWrappingImplementation.prototype;
function AreaElementWrappingImplementation() {}
AreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
AreaElementWrappingImplementation.prototype.get$href = function() {
  return this._ptr.get$href();
}
// ********** Code for MediaElementWrappingImplementation **************
$inherits(MediaElementWrappingImplementation, ElementWrappingImplementation);
MediaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementWrappingImplementation._wrap$ctor.prototype = MediaElementWrappingImplementation.prototype;
function MediaElementWrappingImplementation() {}
MediaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
MediaElementWrappingImplementation.prototype.get$readyState = function() {
  return this._ptr.get$readyState();
}
// ********** Code for AudioElementWrappingImplementation **************
$inherits(AudioElementWrappingImplementation, MediaElementWrappingImplementation);
AudioElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioElementWrappingImplementation._wrap$ctor.prototype = AudioElementWrappingImplementation.prototype;
function AudioElementWrappingImplementation() {}
AudioElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EventWrappingImplementation **************
$inherits(EventWrappingImplementation, DOMWrapperBase);
EventWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventWrappingImplementation._wrap$ctor.prototype = EventWrappingImplementation.prototype;
function EventWrappingImplementation() {}
EventWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for AudioProcessingEventWrappingImplementation **************
$inherits(AudioProcessingEventWrappingImplementation, EventWrappingImplementation);
AudioProcessingEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioProcessingEventWrappingImplementation._wrap$ctor.prototype = AudioProcessingEventWrappingImplementation.prototype;
function AudioProcessingEventWrappingImplementation() {}
// ********** Code for BRElementWrappingImplementation **************
$inherits(BRElementWrappingImplementation, ElementWrappingImplementation);
BRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BRElementWrappingImplementation._wrap$ctor.prototype = BRElementWrappingImplementation.prototype;
function BRElementWrappingImplementation() {}
BRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for BaseElementWrappingImplementation **************
$inherits(BaseElementWrappingImplementation, ElementWrappingImplementation);
BaseElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BaseElementWrappingImplementation._wrap$ctor.prototype = BaseElementWrappingImplementation.prototype;
function BaseElementWrappingImplementation() {}
BaseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
BaseElementWrappingImplementation.prototype.get$href = function() {
  return this._ptr.get$href();
}
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ButtonElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ButtonElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
ButtonElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
ButtonElementWrappingImplementation.prototype.click = function() {
  this._ptr.click();
  return;
}
ButtonElementWrappingImplementation.prototype.get$click = function() {
  return this.click.bind(this);
}
// ********** Code for CharacterDataWrappingImplementation **************
$inherits(CharacterDataWrappingImplementation, NodeWrappingImplementation);
CharacterDataWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
CharacterDataWrappingImplementation._wrap$ctor.prototype = CharacterDataWrappingImplementation.prototype;
function CharacterDataWrappingImplementation() {}
CharacterDataWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for TextWrappingImplementation **************
$inherits(TextWrappingImplementation, CharacterDataWrappingImplementation);
TextWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextWrappingImplementation._wrap$ctor.prototype = TextWrappingImplementation.prototype;
function TextWrappingImplementation() {}
// ********** Code for CDATASectionWrappingImplementation **************
$inherits(CDATASectionWrappingImplementation, TextWrappingImplementation);
CDATASectionWrappingImplementation._wrap$ctor = function(ptr) {
  TextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CDATASectionWrappingImplementation._wrap$ctor.prototype = CDATASectionWrappingImplementation.prototype;
function CDATASectionWrappingImplementation() {}
// ********** Code for CanvasElementWrappingImplementation **************
$inherits(CanvasElementWrappingImplementation, ElementWrappingImplementation);
CanvasElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasElementWrappingImplementation._wrap$ctor.prototype = CanvasElementWrappingImplementation.prototype;
function CanvasElementWrappingImplementation() {}
CanvasElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for CommentWrappingImplementation **************
$inherits(CommentWrappingImplementation, CharacterDataWrappingImplementation);
CommentWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
CommentWrappingImplementation._wrap$ctor.prototype = CommentWrappingImplementation.prototype;
function CommentWrappingImplementation() {}
// ********** Code for DListElementWrappingImplementation **************
$inherits(DListElementWrappingImplementation, ElementWrappingImplementation);
DListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DListElementWrappingImplementation._wrap$ctor.prototype = DListElementWrappingImplementation.prototype;
function DListElementWrappingImplementation() {}
DListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DataListElementWrappingImplementation **************
$inherits(DataListElementWrappingImplementation, ElementWrappingImplementation);
DataListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataListElementWrappingImplementation._wrap$ctor.prototype = DataListElementWrappingImplementation.prototype;
function DataListElementWrappingImplementation() {}
DataListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DetailsElementWrappingImplementation **************
$inherits(DetailsElementWrappingImplementation, ElementWrappingImplementation);
DetailsElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DetailsElementWrappingImplementation._wrap$ctor.prototype = DetailsElementWrappingImplementation.prototype;
function DetailsElementWrappingImplementation() {}
DetailsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DivElementWrappingImplementation **************
$inherits(DivElementWrappingImplementation, ElementWrappingImplementation);
DivElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DivElementWrappingImplementation._wrap$ctor.prototype = DivElementWrappingImplementation.prototype;
function DivElementWrappingImplementation() {}
DivElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation.prototype.is$html_Element = function(){return true};
EmbedElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for EntityReferenceWrappingImplementation **************
$inherits(EntityReferenceWrappingImplementation, NodeWrappingImplementation);
EntityReferenceWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityReferenceWrappingImplementation._wrap$ctor.prototype = EntityReferenceWrappingImplementation.prototype;
function EntityReferenceWrappingImplementation() {}
// ********** Code for EntityWrappingImplementation **************
$inherits(EntityWrappingImplementation, NodeWrappingImplementation);
EntityWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityWrappingImplementation._wrap$ctor.prototype = EntityWrappingImplementation.prototype;
function EntityWrappingImplementation() {}
// ********** Code for FieldSetElementWrappingImplementation **************
$inherits(FieldSetElementWrappingImplementation, ElementWrappingImplementation);
FieldSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FieldSetElementWrappingImplementation._wrap$ctor.prototype = FieldSetElementWrappingImplementation.prototype;
function FieldSetElementWrappingImplementation() {}
FieldSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FontElementWrappingImplementation **************
$inherits(FontElementWrappingImplementation, ElementWrappingImplementation);
FontElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FontElementWrappingImplementation._wrap$ctor.prototype = FontElementWrappingImplementation.prototype;
function FontElementWrappingImplementation() {}
FontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FormElementWrappingImplementation **************
$inherits(FormElementWrappingImplementation, ElementWrappingImplementation);
FormElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FormElementWrappingImplementation._wrap$ctor.prototype = FormElementWrappingImplementation.prototype;
function FormElementWrappingImplementation() {}
FormElementWrappingImplementation.prototype.is$html_Element = function(){return true};
FormElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HeadElementWrappingImplementation **************
$inherits(HeadElementWrappingImplementation, ElementWrappingImplementation);
HeadElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadElementWrappingImplementation._wrap$ctor.prototype = HeadElementWrappingImplementation.prototype;
function HeadElementWrappingImplementation() {}
HeadElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HeadingElementWrappingImplementation **************
$inherits(HeadingElementWrappingImplementation, ElementWrappingImplementation);
HeadingElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadingElementWrappingImplementation._wrap$ctor.prototype = HeadingElementWrappingImplementation.prototype;
function HeadingElementWrappingImplementation() {}
HeadingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for IDBVersionChangeEventWrappingImplementation **************
$inherits(IDBVersionChangeEventWrappingImplementation, EventWrappingImplementation);
IDBVersionChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBVersionChangeEventWrappingImplementation._wrap$ctor.prototype = IDBVersionChangeEventWrappingImplementation.prototype;
function IDBVersionChangeEventWrappingImplementation() {}
// ********** Code for IFrameElementWrappingImplementation **************
$inherits(IFrameElementWrappingImplementation, ElementWrappingImplementation);
IFrameElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
IFrameElementWrappingImplementation._wrap$ctor.prototype = IFrameElementWrappingImplementation.prototype;
function IFrameElementWrappingImplementation() {}
IFrameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
InputElementWrappingImplementation.prototype.get$selectionEnd = function() {
  return this._ptr.get$selectionEnd();
}
InputElementWrappingImplementation.prototype.get$selectionStart = function() {
  return this._ptr.get$selectionStart();
}
InputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
InputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
InputElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
InputElementWrappingImplementation.prototype.click = function() {
  this._ptr.click();
  return;
}
InputElementWrappingImplementation.prototype.get$click = function() {
  return this.click.bind(this);
}
// ********** Code for KeygenElementWrappingImplementation **************
$inherits(KeygenElementWrappingImplementation, ElementWrappingImplementation);
KeygenElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeygenElementWrappingImplementation._wrap$ctor.prototype = KeygenElementWrappingImplementation.prototype;
function KeygenElementWrappingImplementation() {}
KeygenElementWrappingImplementation.prototype.is$html_Element = function(){return true};
KeygenElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LIElementWrappingImplementation **************
$inherits(LIElementWrappingImplementation, ElementWrappingImplementation);
LIElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LIElementWrappingImplementation._wrap$ctor.prototype = LIElementWrappingImplementation.prototype;
function LIElementWrappingImplementation() {}
LIElementWrappingImplementation.prototype.is$html_Element = function(){return true};
LIElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
LIElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
LIElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for LabelElementWrappingImplementation **************
$inherits(LabelElementWrappingImplementation, ElementWrappingImplementation);
LabelElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LabelElementWrappingImplementation._wrap$ctor.prototype = LabelElementWrappingImplementation.prototype;
function LabelElementWrappingImplementation() {}
LabelElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LegendElementWrappingImplementation **************
$inherits(LegendElementWrappingImplementation, ElementWrappingImplementation);
LegendElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LegendElementWrappingImplementation._wrap$ctor.prototype = LegendElementWrappingImplementation.prototype;
function LegendElementWrappingImplementation() {}
LegendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LinkElementWrappingImplementation **************
$inherits(LinkElementWrappingImplementation, ElementWrappingImplementation);
LinkElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LinkElementWrappingImplementation._wrap$ctor.prototype = LinkElementWrappingImplementation.prototype;
function LinkElementWrappingImplementation() {}
LinkElementWrappingImplementation.prototype.is$html_Element = function(){return true};
LinkElementWrappingImplementation.prototype.get$href = function() {
  return this._ptr.get$href();
}
LinkElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LocationWrappingImplementation **************
$inherits(LocationWrappingImplementation, DOMWrapperBase);
LocationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
LocationWrappingImplementation._wrap$ctor.prototype = LocationWrappingImplementation.prototype;
function LocationWrappingImplementation() {}
LocationWrappingImplementation.prototype.get$href = function() {
  return this._ptr.get$href();
}
LocationWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for MapElementWrappingImplementation **************
$inherits(MapElementWrappingImplementation, ElementWrappingImplementation);
MapElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MapElementWrappingImplementation._wrap$ctor.prototype = MapElementWrappingImplementation.prototype;
function MapElementWrappingImplementation() {}
MapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MenuElementWrappingImplementation **************
$inherits(MenuElementWrappingImplementation, ElementWrappingImplementation);
MenuElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MenuElementWrappingImplementation._wrap$ctor.prototype = MenuElementWrappingImplementation.prototype;
function MenuElementWrappingImplementation() {}
MenuElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MetaElementWrappingImplementation **************
$inherits(MetaElementWrappingImplementation, ElementWrappingImplementation);
MetaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MetaElementWrappingImplementation._wrap$ctor.prototype = MetaElementWrappingImplementation.prototype;
function MetaElementWrappingImplementation() {}
MetaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MeterElementWrappingImplementation **************
$inherits(MeterElementWrappingImplementation, ElementWrappingImplementation);
MeterElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MeterElementWrappingImplementation._wrap$ctor.prototype = MeterElementWrappingImplementation.prototype;
function MeterElementWrappingImplementation() {}
MeterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
MeterElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
MeterElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for ModElementWrappingImplementation **************
$inherits(ModElementWrappingImplementation, ElementWrappingImplementation);
ModElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ModElementWrappingImplementation._wrap$ctor.prototype = ModElementWrappingImplementation.prototype;
function ModElementWrappingImplementation() {}
ModElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for NotationWrappingImplementation **************
$inherits(NotationWrappingImplementation, NodeWrappingImplementation);
NotationWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotationWrappingImplementation._wrap$ctor.prototype = NotationWrappingImplementation.prototype;
function NotationWrappingImplementation() {}
// ********** Code for OListElementWrappingImplementation **************
$inherits(OListElementWrappingImplementation, ElementWrappingImplementation);
OListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OListElementWrappingImplementation._wrap$ctor.prototype = OListElementWrappingImplementation.prototype;
function OListElementWrappingImplementation() {}
OListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for OfflineAudioCompletionEventWrappingImplementation **************
$inherits(OfflineAudioCompletionEventWrappingImplementation, EventWrappingImplementation);
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor.prototype = OfflineAudioCompletionEventWrappingImplementation.prototype;
function OfflineAudioCompletionEventWrappingImplementation() {}
// ********** Code for OptGroupElementWrappingImplementation **************
$inherits(OptGroupElementWrappingImplementation, ElementWrappingImplementation);
OptGroupElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptGroupElementWrappingImplementation._wrap$ctor.prototype = OptGroupElementWrappingImplementation.prototype;
function OptGroupElementWrappingImplementation() {}
OptGroupElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for OptionElementWrappingImplementation **************
$inherits(OptionElementWrappingImplementation, ElementWrappingImplementation);
OptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptionElementWrappingImplementation._wrap$ctor.prototype = OptionElementWrappingImplementation.prototype;
function OptionElementWrappingImplementation() {}
OptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OptionElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
OptionElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for OutputElementWrappingImplementation **************
$inherits(OutputElementWrappingImplementation, ElementWrappingImplementation);
OutputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OutputElementWrappingImplementation._wrap$ctor.prototype = OutputElementWrappingImplementation.prototype;
function OutputElementWrappingImplementation() {}
OutputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OutputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
OutputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
OutputElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for ParagraphElementWrappingImplementation **************
$inherits(ParagraphElementWrappingImplementation, ElementWrappingImplementation);
ParagraphElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParagraphElementWrappingImplementation._wrap$ctor.prototype = ParagraphElementWrappingImplementation.prototype;
function ParagraphElementWrappingImplementation() {}
ParagraphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ParamElementWrappingImplementation **************
$inherits(ParamElementWrappingImplementation, ElementWrappingImplementation);
ParamElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParamElementWrappingImplementation._wrap$ctor.prototype = ParamElementWrappingImplementation.prototype;
function ParamElementWrappingImplementation() {}
ParamElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ParamElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ParamElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
ParamElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ProcessingInstructionWrappingImplementation **************
$inherits(ProcessingInstructionWrappingImplementation, NodeWrappingImplementation);
ProcessingInstructionWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProcessingInstructionWrappingImplementation._wrap$ctor.prototype = ProcessingInstructionWrappingImplementation.prototype;
function ProcessingInstructionWrappingImplementation() {}
// ********** Code for ProgressElementWrappingImplementation **************
$inherits(ProgressElementWrappingImplementation, ElementWrappingImplementation);
ProgressElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressElementWrappingImplementation._wrap$ctor.prototype = ProgressElementWrappingImplementation.prototype;
function ProgressElementWrappingImplementation() {}
ProgressElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ProgressElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
ProgressElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for QuoteElementWrappingImplementation **************
$inherits(QuoteElementWrappingImplementation, ElementWrappingImplementation);
QuoteElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
QuoteElementWrappingImplementation._wrap$ctor.prototype = QuoteElementWrappingImplementation.prototype;
function QuoteElementWrappingImplementation() {}
QuoteElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGElementWrappingImplementation **************
$inherits(SVGElementWrappingImplementation, ElementWrappingImplementation);
SVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementWrappingImplementation._wrap$ctor.prototype = SVGElementWrappingImplementation.prototype;
function SVGElementWrappingImplementation() {}
SVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
SVGElementWrappingImplementation.prototype.set$elements = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
SVGElementWrappingImplementation.prototype.get$innerHTML = function() {
  var container = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  container.get$elements().addAll(this.clone(true).get$elements());
  return container.get$innerHTML();
}
SVGElementWrappingImplementation.prototype.set$innerHTML = function(svg) {
  var container = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
SVGElementWrappingImplementation.prototype.clone = function(deep) {
  return ElementWrappingImplementation.prototype.clone.call(this, deep);
}
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
function SVGAElementWrappingImplementation() {}
SVGAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGAElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGAElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGAltGlyphDefElementWrappingImplementation **************
$inherits(SVGAltGlyphDefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphDefElementWrappingImplementation.prototype;
function SVGAltGlyphDefElementWrappingImplementation() {}
SVGAltGlyphDefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextContentElementWrappingImplementation **************
$inherits(SVGTextContentElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTextContentElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextContentElementWrappingImplementation._wrap$ctor.prototype = SVGTextContentElementWrappingImplementation.prototype;
function SVGTextContentElementWrappingImplementation() {}
SVGTextContentElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGTextContentElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGTextPositioningElementWrappingImplementation **************
$inherits(SVGTextPositioningElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPositioningElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPositioningElementWrappingImplementation._wrap$ctor.prototype = SVGTextPositioningElementWrappingImplementation.prototype;
function SVGTextPositioningElementWrappingImplementation() {}
SVGTextPositioningElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
function SVGAltGlyphElementWrappingImplementation() {}
SVGAltGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGAltGlyphElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGAltGlyphItemElementWrappingImplementation **************
$inherits(SVGAltGlyphItemElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphItemElementWrappingImplementation.prototype;
function SVGAltGlyphItemElementWrappingImplementation() {}
SVGAltGlyphItemElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimationElementWrappingImplementation **************
$inherits(SVGAnimationElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAnimationElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimationElementWrappingImplementation._wrap$ctor.prototype = SVGAnimationElementWrappingImplementation.prototype;
function SVGAnimationElementWrappingImplementation() {}
SVGAnimationElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateColorElementWrappingImplementation **************
$inherits(SVGAnimateColorElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateColorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateColorElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateColorElementWrappingImplementation.prototype;
function SVGAnimateColorElementWrappingImplementation() {}
SVGAnimateColorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateElementWrappingImplementation **************
$inherits(SVGAnimateElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateElementWrappingImplementation.prototype;
function SVGAnimateElementWrappingImplementation() {}
SVGAnimateElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateMotionElementWrappingImplementation **************
$inherits(SVGAnimateMotionElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateMotionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateMotionElementWrappingImplementation.prototype;
function SVGAnimateMotionElementWrappingImplementation() {}
SVGAnimateMotionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateTransformElementWrappingImplementation **************
$inherits(SVGAnimateTransformElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateTransformElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateTransformElementWrappingImplementation.prototype;
function SVGAnimateTransformElementWrappingImplementation() {}
SVGAnimateTransformElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimatedEnumerationWrappingImplementation **************
$inherits(SVGAnimatedEnumerationWrappingImplementation, DOMWrapperBase);
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor.prototype = SVGAnimatedEnumerationWrappingImplementation.prototype;
function SVGAnimatedEnumerationWrappingImplementation() {}
// ********** Code for SVGAnimatedStringWrappingImplementation **************
$inherits(SVGAnimatedStringWrappingImplementation, DOMWrapperBase);
SVGAnimatedStringWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedStringWrappingImplementation._wrap$ctor.prototype = SVGAnimatedStringWrappingImplementation.prototype;
function SVGAnimatedStringWrappingImplementation() {}
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
function SVGCircleElementWrappingImplementation() {}
SVGCircleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGCircleElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGClipPathElementWrappingImplementation **************
$inherits(SVGClipPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGClipPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGClipPathElementWrappingImplementation._wrap$ctor.prototype = SVGClipPathElementWrappingImplementation.prototype;
function SVGClipPathElementWrappingImplementation() {}
SVGClipPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGClipPathElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGComponentTransferFunctionElementWrappingImplementation **************
$inherits(SVGComponentTransferFunctionElementWrappingImplementation, SVGElementWrappingImplementation);
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.prototype = SVGComponentTransferFunctionElementWrappingImplementation.prototype;
function SVGComponentTransferFunctionElementWrappingImplementation() {}
SVGComponentTransferFunctionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGComponentTransferFunctionElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
// ********** Code for SVGCursorElementWrappingImplementation **************
$inherits(SVGCursorElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCursorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCursorElementWrappingImplementation._wrap$ctor.prototype = SVGCursorElementWrappingImplementation.prototype;
function SVGCursorElementWrappingImplementation() {}
SVGCursorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGCursorElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
function SVGDefsElementWrappingImplementation() {}
SVGDefsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGDefsElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGDescElementWrappingImplementation **************
$inherits(SVGDescElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDescElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDescElementWrappingImplementation._wrap$ctor.prototype = SVGDescElementWrappingImplementation.prototype;
function SVGDescElementWrappingImplementation() {}
SVGDescElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGDescElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
function SVGEllipseElementWrappingImplementation() {}
SVGEllipseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGEllipseElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEBlendElementWrappingImplementation **************
$inherits(SVGFEBlendElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEBlendElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEBlendElementWrappingImplementation._wrap$ctor.prototype = SVGFEBlendElementWrappingImplementation.prototype;
function SVGFEBlendElementWrappingImplementation() {}
SVGFEBlendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEBlendElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEColorMatrixElementWrappingImplementation **************
$inherits(SVGFEColorMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEColorMatrixElementWrappingImplementation.prototype;
function SVGFEColorMatrixElementWrappingImplementation() {}
SVGFEColorMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEColorMatrixElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEComponentTransferElementWrappingImplementation **************
$inherits(SVGFEComponentTransferElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor.prototype = SVGFEComponentTransferElementWrappingImplementation.prototype;
function SVGFEComponentTransferElementWrappingImplementation() {}
SVGFEComponentTransferElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEComponentTransferElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEConvolveMatrixElementWrappingImplementation **************
$inherits(SVGFEConvolveMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEConvolveMatrixElementWrappingImplementation.prototype;
function SVGFEConvolveMatrixElementWrappingImplementation() {}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEDiffuseLightingElementWrappingImplementation **************
$inherits(SVGFEDiffuseLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFEDiffuseLightingElementWrappingImplementation.prototype;
function SVGFEDiffuseLightingElementWrappingImplementation() {}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEDisplacementMapElementWrappingImplementation **************
$inherits(SVGFEDisplacementMapElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor.prototype = SVGFEDisplacementMapElementWrappingImplementation.prototype;
function SVGFEDisplacementMapElementWrappingImplementation() {}
SVGFEDisplacementMapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEDistantLightElementWrappingImplementation **************
$inherits(SVGFEDistantLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDistantLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEDistantLightElementWrappingImplementation.prototype;
function SVGFEDistantLightElementWrappingImplementation() {}
SVGFEDistantLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDropShadowElementWrappingImplementation **************
$inherits(SVGFEDropShadowElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDropShadowElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor.prototype = SVGFEDropShadowElementWrappingImplementation.prototype;
function SVGFEDropShadowElementWrappingImplementation() {}
SVGFEDropShadowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEDropShadowElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEFloodElementWrappingImplementation **************
$inherits(SVGFEFloodElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEFloodElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFloodElementWrappingImplementation._wrap$ctor.prototype = SVGFEFloodElementWrappingImplementation.prototype;
function SVGFEFloodElementWrappingImplementation() {}
SVGFEFloodElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEFloodElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEFuncAElementWrappingImplementation **************
$inherits(SVGFEFuncAElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncAElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncAElementWrappingImplementation.prototype;
function SVGFEFuncAElementWrappingImplementation() {}
SVGFEFuncAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncBElementWrappingImplementation **************
$inherits(SVGFEFuncBElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncBElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncBElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncBElementWrappingImplementation.prototype;
function SVGFEFuncBElementWrappingImplementation() {}
SVGFEFuncBElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncGElementWrappingImplementation **************
$inherits(SVGFEFuncGElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncGElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncGElementWrappingImplementation.prototype;
function SVGFEFuncGElementWrappingImplementation() {}
SVGFEFuncGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncRElementWrappingImplementation **************
$inherits(SVGFEFuncRElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncRElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncRElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncRElementWrappingImplementation.prototype;
function SVGFEFuncRElementWrappingImplementation() {}
SVGFEFuncRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEGaussianBlurElementWrappingImplementation **************
$inherits(SVGFEGaussianBlurElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor.prototype = SVGFEGaussianBlurElementWrappingImplementation.prototype;
function SVGFEGaussianBlurElementWrappingImplementation() {}
SVGFEGaussianBlurElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEImageElementWrappingImplementation **************
$inherits(SVGFEImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEImageElementWrappingImplementation._wrap$ctor.prototype = SVGFEImageElementWrappingImplementation.prototype;
function SVGFEImageElementWrappingImplementation() {}
SVGFEImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEImageElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGFEImageElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEMergeElementWrappingImplementation **************
$inherits(SVGFEMergeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeElementWrappingImplementation.prototype;
function SVGFEMergeElementWrappingImplementation() {}
SVGFEMergeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEMergeElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEMergeNodeElementWrappingImplementation **************
$inherits(SVGFEMergeNodeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeNodeElementWrappingImplementation.prototype;
function SVGFEMergeNodeElementWrappingImplementation() {}
SVGFEMergeNodeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEOffsetElementWrappingImplementation **************
$inherits(SVGFEOffsetElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEOffsetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEOffsetElementWrappingImplementation._wrap$ctor.prototype = SVGFEOffsetElementWrappingImplementation.prototype;
function SVGFEOffsetElementWrappingImplementation() {}
SVGFEOffsetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEOffsetElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFEPointLightElementWrappingImplementation **************
$inherits(SVGFEPointLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEPointLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEPointLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEPointLightElementWrappingImplementation.prototype;
function SVGFEPointLightElementWrappingImplementation() {}
SVGFEPointLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFESpecularLightingElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFESpotLightElementWrappingImplementation **************
$inherits(SVGFESpotLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpotLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpotLightElementWrappingImplementation._wrap$ctor.prototype = SVGFESpotLightElementWrappingImplementation.prototype;
function SVGFESpotLightElementWrappingImplementation() {}
SVGFESpotLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFETileElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFETurbulenceElementWrappingImplementation **************
$inherits(SVGFETurbulenceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETurbulenceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor.prototype = SVGFETurbulenceElementWrappingImplementation.prototype;
function SVGFETurbulenceElementWrappingImplementation() {}
SVGFETurbulenceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFETurbulenceElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFilterElementWrappingImplementation **************
$inherits(SVGFilterElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFilterElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterElementWrappingImplementation._wrap$ctor.prototype = SVGFilterElementWrappingImplementation.prototype;
function SVGFilterElementWrappingImplementation() {}
SVGFilterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFilterElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGFilterElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGFontElementWrappingImplementation **************
$inherits(SVGFontElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontElementWrappingImplementation._wrap$ctor.prototype = SVGFontElementWrappingImplementation.prototype;
function SVGFontElementWrappingImplementation() {}
SVGFontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceElementWrappingImplementation **************
$inherits(SVGFontFaceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceElementWrappingImplementation.prototype;
function SVGFontFaceElementWrappingImplementation() {}
SVGFontFaceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceFormatElementWrappingImplementation **************
$inherits(SVGFontFaceFormatElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceFormatElementWrappingImplementation.prototype;
function SVGFontFaceFormatElementWrappingImplementation() {}
SVGFontFaceFormatElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceNameElementWrappingImplementation **************
$inherits(SVGFontFaceNameElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceNameElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceNameElementWrappingImplementation.prototype;
function SVGFontFaceNameElementWrappingImplementation() {}
SVGFontFaceNameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceSrcElementWrappingImplementation **************
$inherits(SVGFontFaceSrcElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceSrcElementWrappingImplementation.prototype;
function SVGFontFaceSrcElementWrappingImplementation() {}
SVGFontFaceSrcElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceUriElementWrappingImplementation **************
$inherits(SVGFontFaceUriElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceUriElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceUriElementWrappingImplementation.prototype;
function SVGFontFaceUriElementWrappingImplementation() {}
SVGFontFaceUriElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGForeignObjectElementWrappingImplementation **************
$inherits(SVGForeignObjectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGForeignObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGForeignObjectElementWrappingImplementation._wrap$ctor.prototype = SVGForeignObjectElementWrappingImplementation.prototype;
function SVGForeignObjectElementWrappingImplementation() {}
SVGForeignObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGForeignObjectElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGGElementWrappingImplementation **************
$inherits(SVGGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGElementWrappingImplementation._wrap$ctor.prototype = SVGGElementWrappingImplementation.prototype;
function SVGGElementWrappingImplementation() {}
SVGGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGGElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGGlyphElementWrappingImplementation **************
$inherits(SVGGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphElementWrappingImplementation.prototype;
function SVGGlyphElementWrappingImplementation() {}
SVGGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGlyphRefElementWrappingImplementation **************
$inherits(SVGGlyphRefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphRefElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphRefElementWrappingImplementation.prototype;
function SVGGlyphRefElementWrappingImplementation() {}
SVGGlyphRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGGlyphRefElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGGlyphRefElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGGradientElementWrappingImplementation **************
$inherits(SVGGradientElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGradientElementWrappingImplementation._wrap$ctor.prototype = SVGGradientElementWrappingImplementation.prototype;
function SVGGradientElementWrappingImplementation() {}
SVGGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGGradientElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGGradientElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGHKernElementWrappingImplementation **************
$inherits(SVGHKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGHKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGHKernElementWrappingImplementation._wrap$ctor.prototype = SVGHKernElementWrappingImplementation.prototype;
function SVGHKernElementWrappingImplementation() {}
SVGHKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGImageElementWrappingImplementation **************
$inherits(SVGImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGImageElementWrappingImplementation._wrap$ctor.prototype = SVGImageElementWrappingImplementation.prototype;
function SVGImageElementWrappingImplementation() {}
SVGImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGImageElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGImageElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
function SVGLineElementWrappingImplementation() {}
SVGLineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGLineElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGLinearGradientElementWrappingImplementation **************
$inherits(SVGLinearGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGLinearGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLinearGradientElementWrappingImplementation._wrap$ctor.prototype = SVGLinearGradientElementWrappingImplementation.prototype;
function SVGLinearGradientElementWrappingImplementation() {}
SVGLinearGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMPathElementWrappingImplementation **************
$inherits(SVGMPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMPathElementWrappingImplementation._wrap$ctor.prototype = SVGMPathElementWrappingImplementation.prototype;
function SVGMPathElementWrappingImplementation() {}
SVGMPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGMPathElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
function SVGMarkerElementWrappingImplementation() {}
SVGMarkerElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGMarkerElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGMaskElementWrappingImplementation **************
$inherits(SVGMaskElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMaskElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMaskElementWrappingImplementation._wrap$ctor.prototype = SVGMaskElementWrappingImplementation.prototype;
function SVGMaskElementWrappingImplementation() {}
SVGMaskElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGMaskElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGMetadataElementWrappingImplementation **************
$inherits(SVGMetadataElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMetadataElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMetadataElementWrappingImplementation._wrap$ctor.prototype = SVGMetadataElementWrappingImplementation.prototype;
function SVGMetadataElementWrappingImplementation() {}
SVGMetadataElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMissingGlyphElementWrappingImplementation **************
$inherits(SVGMissingGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMissingGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGMissingGlyphElementWrappingImplementation.prototype;
function SVGMissingGlyphElementWrappingImplementation() {}
SVGMissingGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPathElementWrappingImplementation **************
$inherits(SVGPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathElementWrappingImplementation._wrap$ctor.prototype = SVGPathElementWrappingImplementation.prototype;
function SVGPathElementWrappingImplementation() {}
SVGPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGPathElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGPatternElementWrappingImplementation **************
$inherits(SVGPatternElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPatternElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPatternElementWrappingImplementation._wrap$ctor.prototype = SVGPatternElementWrappingImplementation.prototype;
function SVGPatternElementWrappingImplementation() {}
SVGPatternElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGPatternElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGPatternElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGPolygonElementWrappingImplementation **************
$inherits(SVGPolygonElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolygonElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolygonElementWrappingImplementation._wrap$ctor.prototype = SVGPolygonElementWrappingImplementation.prototype;
function SVGPolygonElementWrappingImplementation() {}
SVGPolygonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGPolygonElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGPolylineElementWrappingImplementation **************
$inherits(SVGPolylineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolylineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolylineElementWrappingImplementation._wrap$ctor.prototype = SVGPolylineElementWrappingImplementation.prototype;
function SVGPolylineElementWrappingImplementation() {}
SVGPolylineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGPolylineElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGRadialGradientElementWrappingImplementation **************
$inherits(SVGRadialGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGRadialGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRadialGradientElementWrappingImplementation._wrap$ctor.prototype = SVGRadialGradientElementWrappingImplementation.prototype;
function SVGRadialGradientElementWrappingImplementation() {}
SVGRadialGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGRectElementWrappingImplementation **************
$inherits(SVGRectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGRectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRectElementWrappingImplementation._wrap$ctor.prototype = SVGRectElementWrappingImplementation.prototype;
function SVGRectElementWrappingImplementation() {}
SVGRectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGRectElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGScriptElementWrappingImplementation **************
$inherits(SVGScriptElementWrappingImplementation, SVGElementWrappingImplementation);
SVGScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGScriptElementWrappingImplementation._wrap$ctor.prototype = SVGScriptElementWrappingImplementation.prototype;
function SVGScriptElementWrappingImplementation() {}
SVGScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SVGScriptElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGSetElementWrappingImplementation **************
$inherits(SVGSetElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSetElementWrappingImplementation._wrap$ctor.prototype = SVGSetElementWrappingImplementation.prototype;
function SVGSetElementWrappingImplementation() {}
SVGSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStopElementWrappingImplementation **************
$inherits(SVGStopElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStopElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStopElementWrappingImplementation._wrap$ctor.prototype = SVGStopElementWrappingImplementation.prototype;
function SVGStopElementWrappingImplementation() {}
SVGStopElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGStopElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGStyleElementWrappingImplementation **************
$inherits(SVGStyleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStyleElementWrappingImplementation._wrap$ctor.prototype = SVGStyleElementWrappingImplementation.prototype;
function SVGStyleElementWrappingImplementation() {}
SVGStyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGStyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SVGSwitchElementWrappingImplementation **************
$inherits(SVGSwitchElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSwitchElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSwitchElementWrappingImplementation._wrap$ctor.prototype = SVGSwitchElementWrappingImplementation.prototype;
function SVGSwitchElementWrappingImplementation() {}
SVGSwitchElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGSwitchElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGSymbolElementWrappingImplementation **************
$inherits(SVGSymbolElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSymbolElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSymbolElementWrappingImplementation._wrap$ctor.prototype = SVGSymbolElementWrappingImplementation.prototype;
function SVGSymbolElementWrappingImplementation() {}
SVGSymbolElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGSymbolElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGTRefElementWrappingImplementation **************
$inherits(SVGTRefElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTRefElementWrappingImplementation._wrap$ctor.prototype = SVGTRefElementWrappingImplementation.prototype;
function SVGTRefElementWrappingImplementation() {}
SVGTRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGTRefElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGTSpanElementWrappingImplementation **************
$inherits(SVGTSpanElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTSpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTSpanElementWrappingImplementation._wrap$ctor.prototype = SVGTSpanElementWrappingImplementation.prototype;
function SVGTSpanElementWrappingImplementation() {}
SVGTSpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextElementWrappingImplementation **************
$inherits(SVGTextElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTextElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextElementWrappingImplementation._wrap$ctor.prototype = SVGTextElementWrappingImplementation.prototype;
function SVGTextElementWrappingImplementation() {}
SVGTextElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextPathElementWrappingImplementation **************
$inherits(SVGTextPathElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPathElementWrappingImplementation._wrap$ctor.prototype = SVGTextPathElementWrappingImplementation.prototype;
function SVGTextPathElementWrappingImplementation() {}
SVGTextPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGTextPathElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
function SVGTitleElementWrappingImplementation() {}
SVGTitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGTitleElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGUseElementWrappingImplementation **************
$inherits(SVGUseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGUseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGUseElementWrappingImplementation._wrap$ctor.prototype = SVGUseElementWrappingImplementation.prototype;
function SVGUseElementWrappingImplementation() {}
SVGUseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGUseElementWrappingImplementation.prototype.get$href = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$href());
}
SVGUseElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGVKernElementWrappingImplementation **************
$inherits(SVGVKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGVKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGVKernElementWrappingImplementation._wrap$ctor.prototype = SVGVKernElementWrappingImplementation.prototype;
function SVGVKernElementWrappingImplementation() {}
SVGVKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGViewElementWrappingImplementation **************
$inherits(SVGViewElementWrappingImplementation, SVGElementWrappingImplementation);
SVGViewElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewElementWrappingImplementation._wrap$ctor.prototype = SVGViewElementWrappingImplementation.prototype;
function SVGViewElementWrappingImplementation() {}
SVGViewElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UIEventWrappingImplementation **************
$inherits(UIEventWrappingImplementation, EventWrappingImplementation);
UIEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
UIEventWrappingImplementation._wrap$ctor.prototype = UIEventWrappingImplementation.prototype;
function UIEventWrappingImplementation() {}
UIEventWrappingImplementation.prototype.get$keyCode = function() {
  return this._ptr.get$keyCode();
}
// ********** Code for SVGZoomEventWrappingImplementation **************
$inherits(SVGZoomEventWrappingImplementation, UIEventWrappingImplementation);
SVGZoomEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGZoomEventWrappingImplementation._wrap$ctor.prototype = SVGZoomEventWrappingImplementation.prototype;
function SVGZoomEventWrappingImplementation() {}
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SelectElementWrappingImplementation **************
$inherits(SelectElementWrappingImplementation, ElementWrappingImplementation);
SelectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SelectElementWrappingImplementation._wrap$ctor.prototype = SelectElementWrappingImplementation.prototype;
function SelectElementWrappingImplementation() {}
SelectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SelectElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SelectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SelectElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
SelectElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
SelectElementWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapNode(this._ptr.item(index));
}
// ********** Code for SourceElementWrappingImplementation **************
$inherits(SourceElementWrappingImplementation, ElementWrappingImplementation);
SourceElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SourceElementWrappingImplementation._wrap$ctor.prototype = SourceElementWrappingImplementation.prototype;
function SourceElementWrappingImplementation() {}
SourceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SourceElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SpanElementWrappingImplementation **************
$inherits(SpanElementWrappingImplementation, ElementWrappingImplementation);
SpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpanElementWrappingImplementation._wrap$ctor.prototype = SpanElementWrappingImplementation.prototype;
function SpanElementWrappingImplementation() {}
SpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SpeechInputEventWrappingImplementation **************
$inherits(SpeechInputEventWrappingImplementation, EventWrappingImplementation);
SpeechInputEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpeechInputEventWrappingImplementation._wrap$ctor.prototype = SpeechInputEventWrappingImplementation.prototype;
function SpeechInputEventWrappingImplementation() {}
// ********** Code for StyleElementWrappingImplementation **************
$inherits(StyleElementWrappingImplementation, ElementWrappingImplementation);
StyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
StyleElementWrappingImplementation._wrap$ctor.prototype = StyleElementWrappingImplementation.prototype;
function StyleElementWrappingImplementation() {}
StyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
StyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for TableCaptionElementWrappingImplementation **************
$inherits(TableCaptionElementWrappingImplementation, ElementWrappingImplementation);
TableCaptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCaptionElementWrappingImplementation._wrap$ctor.prototype = TableCaptionElementWrappingImplementation.prototype;
function TableCaptionElementWrappingImplementation() {}
TableCaptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableCellElementWrappingImplementation **************
$inherits(TableCellElementWrappingImplementation, ElementWrappingImplementation);
TableCellElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCellElementWrappingImplementation._wrap$ctor.prototype = TableCellElementWrappingImplementation.prototype;
function TableCellElementWrappingImplementation() {}
TableCellElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableRowElementWrappingImplementation **************
$inherits(TableRowElementWrappingImplementation, ElementWrappingImplementation);
TableRowElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableRowElementWrappingImplementation._wrap$ctor.prototype = TableRowElementWrappingImplementation.prototype;
function TableRowElementWrappingImplementation() {}
TableRowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableSectionElementWrappingImplementation **************
$inherits(TableSectionElementWrappingImplementation, ElementWrappingImplementation);
TableSectionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableSectionElementWrappingImplementation._wrap$ctor.prototype = TableSectionElementWrappingImplementation.prototype;
function TableSectionElementWrappingImplementation() {}
TableSectionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TextAreaElementWrappingImplementation **************
$inherits(TextAreaElementWrappingImplementation, ElementWrappingImplementation);
TextAreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextAreaElementWrappingImplementation._wrap$ctor.prototype = TextAreaElementWrappingImplementation.prototype;
function TextAreaElementWrappingImplementation() {}
TextAreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TextAreaElementWrappingImplementation.prototype.get$selectionEnd = function() {
  return this._ptr.get$selectionEnd();
}
TextAreaElementWrappingImplementation.prototype.get$selectionStart = function() {
  return this._ptr.get$selectionStart();
}
TextAreaElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
TextAreaElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
TextAreaElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
function TitleElementWrappingImplementation() {}
TitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TrackElementWrappingImplementation **************
$inherits(TrackElementWrappingImplementation, ElementWrappingImplementation);
TrackElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TrackElementWrappingImplementation._wrap$ctor.prototype = TrackElementWrappingImplementation.prototype;
function TrackElementWrappingImplementation() {}
TrackElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UListElementWrappingImplementation **************
$inherits(UListElementWrappingImplementation, ElementWrappingImplementation);
UListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UListElementWrappingImplementation._wrap$ctor.prototype = UListElementWrappingImplementation.prototype;
function UListElementWrappingImplementation() {}
UListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
UListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for UnknownElementWrappingImplementation **************
$inherits(UnknownElementWrappingImplementation, ElementWrappingImplementation);
UnknownElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UnknownElementWrappingImplementation._wrap$ctor.prototype = UnknownElementWrappingImplementation.prototype;
function UnknownElementWrappingImplementation() {}
UnknownElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for VideoElementWrappingImplementation **************
$inherits(VideoElementWrappingImplementation, MediaElementWrappingImplementation);
VideoElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
VideoElementWrappingImplementation._wrap$ctor.prototype = VideoElementWrappingImplementation.prototype;
function VideoElementWrappingImplementation() {}
VideoElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for WebGLContextEventWrappingImplementation **************
$inherits(WebGLContextEventWrappingImplementation, EventWrappingImplementation);
WebGLContextEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLContextEventWrappingImplementation._wrap$ctor.prototype = WebGLContextEventWrappingImplementation.prototype;
function WebGLContextEventWrappingImplementation() {}
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapCSSStyleDeclaration = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new CSSStyleDeclarationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDocument = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapElement = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapEvent = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "WebKitAnimationEvent":

      return new AnimationEventWrappingImplementation._wrap$ctor(raw);

    case "AudioProcessingEvent":

      return new AudioProcessingEventWrappingImplementation._wrap$ctor(raw);

    case "BeforeLoadEvent":

      return new BeforeLoadEventWrappingImplementation._wrap$ctor(raw);

    case "CloseEvent":

      return new CloseEventWrappingImplementation._wrap$ctor(raw);

    case "CompositionEvent":

      return new CompositionEventWrappingImplementation._wrap$ctor(raw);

    case "CustomEvent":

      return new CustomEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceMotionEvent":

      return new DeviceMotionEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceOrientationEvent":

      return new DeviceOrientationEventWrappingImplementation._wrap$ctor(raw);

    case "ErrorEvent":

      return new ErrorEventWrappingImplementation._wrap$ctor(raw);

    case "Event":

      return new EventWrappingImplementation._wrap$ctor(raw);

    case "HashChangeEvent":

      return new HashChangeEventWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeEvent":

      return new IDBVersionChangeEventWrappingImplementation._wrap$ctor(raw);

    case "KeyboardEvent":

      return new KeyboardEventWrappingImplementation._wrap$ctor(raw);

    case "MessageEvent":

      return new MessageEventWrappingImplementation._wrap$ctor(raw);

    case "MouseEvent":

      return new MouseEventWrappingImplementation._wrap$ctor(raw);

    case "MutationEvent":

      return new MutationEventWrappingImplementation._wrap$ctor(raw);

    case "OfflineAudioCompletionEvent":

      return new OfflineAudioCompletionEventWrappingImplementation._wrap$ctor(raw);

    case "OverflowEvent":

      return new OverflowEventWrappingImplementation._wrap$ctor(raw);

    case "PageTransitionEvent":

      return new PageTransitionEventWrappingImplementation._wrap$ctor(raw);

    case "PopStateEvent":

      return new PopStateEventWrappingImplementation._wrap$ctor(raw);

    case "ProgressEvent":

      return new ProgressEventWrappingImplementation._wrap$ctor(raw);

    case "SVGZoomEvent":

      return new SVGZoomEventWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputEvent":

      return new SpeechInputEventWrappingImplementation._wrap$ctor(raw);

    case "StorageEvent":

      return new StorageEventWrappingImplementation._wrap$ctor(raw);

    case "TextEvent":

      return new TextEventWrappingImplementation._wrap$ctor(raw);

    case "TouchEvent":

      return new TouchEventWrappingImplementation._wrap$ctor(raw);

    case "WebKitTransitionEvent":

      return new TransitionEventWrappingImplementation._wrap$ctor(raw);

    case "UIEvent":

      return new UIEventWrappingImplementation._wrap$ctor(raw);

    case "WebGLContextEvent":

      return new WebGLContextEventWrappingImplementation._wrap$ctor(raw);

    case "WheelEvent":

      return new WheelEventWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestProgressEvent":

      return new XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapLocation = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new LocationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapNode = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "CDATASection":

      return new CDATASectionWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "CharacterData":

      return new CharacterDataWrappingImplementation._wrap$ctor(raw);

    case "Comment":

      return new CommentWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "DocumentFragment":

      return new DocumentFragmentWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "Entity":

      return new EntityWrappingImplementation._wrap$ctor(raw);

    case "EntityReference":

      return new EntityReferenceWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "Node":

      return new NodeWrappingImplementation._wrap$ctor(raw);

    case "Notation":

      return new NotationWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "ProcessingInstruction":

      return new ProcessingInstructionWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "Text":

      return new TextWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapSVGAnimatedEnumeration = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedEnumerationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedString = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedStringWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapWindow = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.unwrapMaybePrimitive = function(raw) {
  return (null == raw || (typeof(raw) == 'string') || (typeof(raw) == 'number') || (typeof(raw) == 'boolean')) ? raw : raw.get$_ptr();
}
LevelDom.unwrap = function(raw) {
  return null == raw ? null : raw.get$_ptr();
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for AnimationEventWrappingImplementation **************
$inherits(AnimationEventWrappingImplementation, EventWrappingImplementation);
AnimationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnimationEventWrappingImplementation._wrap$ctor.prototype = AnimationEventWrappingImplementation.prototype;
function AnimationEventWrappingImplementation() {}
// ********** Code for BeforeLoadEventWrappingImplementation **************
$inherits(BeforeLoadEventWrappingImplementation, EventWrappingImplementation);
BeforeLoadEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
BeforeLoadEventWrappingImplementation._wrap$ctor.prototype = BeforeLoadEventWrappingImplementation.prototype;
function BeforeLoadEventWrappingImplementation() {}
// ********** Code for EventsImplementation **************
EventsImplementation._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  this._listenerMap = new HashMapImplementation();
}
EventsImplementation._wrap$ctor.prototype = EventsImplementation.prototype;
function EventsImplementation() {}
EventsImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventsImplementation.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
EventsImplementation.prototype._get = function(type) {
  var $this = this; // closure support
  return this._listenerMap.putIfAbsent(type, (function () {
    return new EventListenerListImplementation($this._ptr, type);
  })
  );
}
// ********** Code for ElementEventsImplementation **************
$inherits(ElementEventsImplementation, EventsImplementation);
ElementEventsImplementation._wrap$ctor = function(_ptr) {
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
ElementEventsImplementation._wrap$ctor.prototype = ElementEventsImplementation.prototype;
function ElementEventsImplementation() {}
ElementEventsImplementation.prototype.get$click = function() {
  return this._get("click");
}
ElementEventsImplementation.prototype.get$keyUp = function() {
  return this._get("keyup");
}
ElementEventsImplementation.prototype.get$mouseWheel = function() {
  return this._get("mousewheel");
}
ElementEventsImplementation.prototype.get$scroll = function() {
  return this._get("scroll");
}
// ********** Code for BodyElementEventsImplementation **************
$inherits(BodyElementEventsImplementation, ElementEventsImplementation);
BodyElementEventsImplementation._wrap$ctor = function(_ptr) {
  ElementEventsImplementation._wrap$ctor.call(this, _ptr);
}
BodyElementEventsImplementation._wrap$ctor.prototype = BodyElementEventsImplementation.prototype;
function BodyElementEventsImplementation() {}
// ********** Code for BodyElementWrappingImplementation **************
$inherits(BodyElementWrappingImplementation, ElementWrappingImplementation);
BodyElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BodyElementWrappingImplementation._wrap$ctor.prototype = BodyElementWrappingImplementation.prototype;
function BodyElementWrappingImplementation() {}
BodyElementWrappingImplementation.prototype.is$html_Element = function(){return true};
BodyElementWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new BodyElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
// ********** Code for CloseEventWrappingImplementation **************
$inherits(CloseEventWrappingImplementation, EventWrappingImplementation);
CloseEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CloseEventWrappingImplementation._wrap$ctor.prototype = CloseEventWrappingImplementation.prototype;
function CloseEventWrappingImplementation() {}
// ********** Code for CompositionEventWrappingImplementation **************
$inherits(CompositionEventWrappingImplementation, UIEventWrappingImplementation);
CompositionEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CompositionEventWrappingImplementation._wrap$ctor.prototype = CompositionEventWrappingImplementation.prototype;
function CompositionEventWrappingImplementation() {}
// ********** Code for CSSStyleDeclarationWrappingImplementation **************
$inherits(CSSStyleDeclarationWrappingImplementation, DOMWrapperBase);
CSSStyleDeclarationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSStyleDeclarationWrappingImplementation._wrap$ctor.prototype = CSSStyleDeclarationWrappingImplementation.prototype;
function CSSStyleDeclarationWrappingImplementation() {}
CSSStyleDeclarationWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CSSStyleDeclarationWrappingImplementation.prototype.item = function(index) {
  return this._ptr.item(index);
}
CSSStyleDeclarationWrappingImplementation.prototype.setProperty = function(propertyName, value, priority) {
  this._ptr.setProperty(propertyName, ("" + value), priority);
}
CSSStyleDeclarationWrappingImplementation.prototype.get$typeName = function() {
  return "CSSStyleDeclaration";
}
CSSStyleDeclarationWrappingImplementation.prototype.set$height = function(value) {
  this.setProperty("height", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$left = function(value) {
  this.setProperty("left", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$marginLeft = function(value) {
  this.setProperty("margin-left", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$top = function(value) {
  this.setProperty("top", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$width = function(value) {
  this.setProperty("width", value, "");
}
// ********** Code for CustomEventWrappingImplementation **************
$inherits(CustomEventWrappingImplementation, EventWrappingImplementation);
CustomEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CustomEventWrappingImplementation._wrap$ctor.prototype = CustomEventWrappingImplementation.prototype;
function CustomEventWrappingImplementation() {}
// ********** Code for DeviceMotionEventWrappingImplementation **************
$inherits(DeviceMotionEventWrappingImplementation, EventWrappingImplementation);
DeviceMotionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceMotionEventWrappingImplementation._wrap$ctor.prototype = DeviceMotionEventWrappingImplementation.prototype;
function DeviceMotionEventWrappingImplementation() {}
// ********** Code for DeviceOrientationEventWrappingImplementation **************
$inherits(DeviceOrientationEventWrappingImplementation, EventWrappingImplementation);
DeviceOrientationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceOrientationEventWrappingImplementation._wrap$ctor.prototype = DeviceOrientationEventWrappingImplementation.prototype;
function DeviceOrientationEventWrappingImplementation() {}
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._node = node;
  this._childNodes = node.get$nodes();
}
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach$1(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter$1(f);
}
FilteredElementList.prototype.isEmpty = function() {
  return this.get$_filtered().isEmpty();
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FilteredElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for EmptyStyleDeclaration **************
$inherits(EmptyStyleDeclaration, CSSStyleDeclarationWrappingImplementation);
function EmptyStyleDeclaration() {
  CSSStyleDeclarationWrappingImplementation._wrap$ctor.call(this, get$document().createElement("div").style);
}
EmptyStyleDeclaration.prototype.setProperty = function(propertyName, value, priority) {
  $throw(new UnsupportedOperationException("Can't modify a frozen style declaration."));
}
// ********** Code for EmptyElementRect **************
function EmptyElementRect() {
  this.client = const$0009;
  this.scroll = const$0009;
  this.bounding = const$0009;
  this.clientRects = const$0010;
  this.offset = const$0009;
}
EmptyElementRect.prototype.get$scroll = function() { return this.scroll; };
// ********** Code for DocumentFragmentWrappingImplementation **************
$inherits(DocumentFragmentWrappingImplementation, NodeWrappingImplementation);
DocumentFragmentWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DocumentFragmentWrappingImplementation._wrap$ctor.prototype = DocumentFragmentWrappingImplementation.prototype;
function DocumentFragmentWrappingImplementation() {}
DocumentFragmentWrappingImplementation.prototype.is$html_Element = function(){return true};
DocumentFragmentWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
DocumentFragmentWrappingImplementation.prototype.get$innerHTML = function() {
  var e = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  e.get$nodes().add(this.clone(true));
  return e.get$innerHTML();
}
DocumentFragmentWrappingImplementation.prototype.set$innerHTML = function(value) {
  this.get$nodes().clear();
  var e = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
DocumentFragmentWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
DocumentFragmentWrappingImplementation.prototype.get$rect = function() {
  return _createMeasurementFuture((function () {
    return const$0011;
  })
  , new CompleterImpl_ElementRect());
}
DocumentFragmentWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
DocumentFragmentWrappingImplementation.prototype.get$firstElementChild = function() {
  return this.get$elements().first();
}
DocumentFragmentWrappingImplementation.prototype.get$style = function() {
  return new EmptyStyleDeclaration();
}
DocumentFragmentWrappingImplementation.prototype.clone = function(deep) {
  return NodeWrappingImplementation.prototype.clone.call(this, deep);
}
// ********** Code for DocumentEventsImplementation **************
$inherits(DocumentEventsImplementation, ElementEventsImplementation);
DocumentEventsImplementation._wrap$ctor = function(_ptr) {
  ElementEventsImplementation._wrap$ctor.call(this, _ptr);
}
DocumentEventsImplementation._wrap$ctor.prototype = DocumentEventsImplementation.prototype;
function DocumentEventsImplementation() {}
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
function DocumentWrappingImplementation() {}
DocumentWrappingImplementation.prototype.is$html_Document = function(){return true};
DocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
DocumentWrappingImplementation.prototype.get$window = function() {
  return LevelDom.wrapWindow(this._documentPtr.get$defaultView());
}
DocumentWrappingImplementation.prototype.get$readyState = function() {
  return this._documentPtr.get$readyState();
}
DocumentWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new DocumentEventsImplementation._wrap$ctor(this._documentPtr);
  }
  return this._on;
}
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._childElements = element.get$children();
  this._element = element;
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapElement(this._childElements.$index(i)));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return LevelDom.wrapElement(this._element.get$firstElementChild());
}
_ChildrenElementList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenElementList.prototype.filter = function(f) {
  return new _ElementList(this._toList().filter$1(f));
}
_ChildrenElementList.prototype.isEmpty = function() {
  return null == this._element.get$firstElementChild();
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return LevelDom.wrapElement(this._childElements.$index(index));
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._element.replaceChild(LevelDom.unwrap(value), this._childElements.item(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._element.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    this._element.appendChild(LevelDom.unwrap(element));
  }
}
_ChildrenElementList.prototype.clear = function() {
  this._element.set$textContent("");
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.iterator = function() {
  return this._list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._list.filter(f);
}
_ListWrapper.prototype.isEmpty = function() {
  return this._list.isEmpty();
}
_ListWrapper.prototype.get$length = function() {
  return this._list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._list.addAll(collection);
}
_ListWrapper.prototype.clear = function() {
  return this._list.clear();
}
_ListWrapper.prototype.get$first = function() {
  return this._list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear;
_ListWrapper.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._list = _list;
}
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear;
_ListWrapper_Element.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Element.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for SimpleClientRect **************
function SimpleClientRect(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}
SimpleClientRect.prototype.get$left = function() { return this.left; };
SimpleClientRect.prototype.get$top = function() { return this.top; };
SimpleClientRect.prototype.get$width = function() { return this.width; };
SimpleClientRect.prototype.get$height = function() { return this.height; };
SimpleClientRect.prototype.$eq = function(other) {
  return null != other && this.left == other.get$left() && this.top == other.get$top() && this.width == other.get$width() && this.height == other.get$height();
}
SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
// ********** Code for ElementRectWrappingImplementation **************
function ElementRectWrappingImplementation(element) {
  this.client = new SimpleClientRect(element.clientLeft, element.clientTop, element.clientWidth, element.clientHeight);
  this.scroll = new SimpleClientRect(element.scrollLeft, element.scrollTop, element.scrollWidth, element.scrollHeight);
  this._clientRects = element.getClientRects();
  this.offset = new SimpleClientRect(element.offsetLeft, element.offsetTop, element.offsetWidth, element.offsetHeight);
  this._boundingClientRect = element.getBoundingClientRect();
}
ElementRectWrappingImplementation.prototype.get$scroll = function() { return this.scroll; };
// ********** Code for ErrorEventWrappingImplementation **************
$inherits(ErrorEventWrappingImplementation, EventWrappingImplementation);
ErrorEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ErrorEventWrappingImplementation._wrap$ctor.prototype = ErrorEventWrappingImplementation.prototype;
function ErrorEventWrappingImplementation() {}
// ********** Code for _EventListenerWrapper **************
function _EventListenerWrapper(raw, wrapped, useCapture) {
  this.wrapped = wrapped;
  this.useCapture = useCapture;
  this.raw = raw;
}
// ********** Code for EventListenerListImplementation **************
function EventListenerListImplementation(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
  this._wrappers = new Array();
}
EventListenerListImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventListenerListImplementation.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
EventListenerListImplementation.prototype._add = function(listener, useCapture) {
  this._ptr.addEventListener$3(this._type, this._findOrAddWrapper(listener, useCapture), useCapture);
}
EventListenerListImplementation.prototype._findOrAddWrapper = function(listener, useCapture) {
  var $0;
  if (null == this._wrappers) {
    this._wrappers = [];
  }
  else {
    var $$list = this._wrappers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var wrapper = $$i.next();
      if ((($0 = wrapper.raw) == null ? null == (listener) : $0 === listener) && $eq(wrapper.useCapture, useCapture)) {
        return wrapper.wrapped;
      }
    }
  }
  var wrapped = (function (e) {
    listener(LevelDom.wrapEvent(e));
  })
  ;
  this._wrappers.add(new _EventListenerWrapper(listener, wrapped, useCapture));
  return wrapped;
}
EventListenerListImplementation.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
// ********** Code for HashChangeEventWrappingImplementation **************
$inherits(HashChangeEventWrappingImplementation, EventWrappingImplementation);
HashChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
HashChangeEventWrappingImplementation._wrap$ctor.prototype = HashChangeEventWrappingImplementation.prototype;
function HashChangeEventWrappingImplementation() {}
// ********** Code for KeyboardEventWrappingImplementation **************
$inherits(KeyboardEventWrappingImplementation, UIEventWrappingImplementation);
KeyboardEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeyboardEventWrappingImplementation._wrap$ctor.prototype = KeyboardEventWrappingImplementation.prototype;
function KeyboardEventWrappingImplementation() {}
KeyboardEventWrappingImplementation.prototype.get$keyIdentifier = function() {
  return this._ptr.get$keyIdentifier();
}
KeyboardEventWrappingImplementation.prototype.get$keyLocation = function() {
  return this._ptr.get$keyLocation();
}
// ********** Code for _MeasurementRequest **************
function _MeasurementRequest(computeValue, completer) {
  this.computeValue = computeValue;
  this.exception = false;
  this.completer = completer;
}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for MessageEventWrappingImplementation **************
$inherits(MessageEventWrappingImplementation, EventWrappingImplementation);
MessageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessageEventWrappingImplementation._wrap$ctor.prototype = MessageEventWrappingImplementation.prototype;
function MessageEventWrappingImplementation() {}
// ********** Code for MouseEventWrappingImplementation **************
$inherits(MouseEventWrappingImplementation, UIEventWrappingImplementation);
MouseEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MouseEventWrappingImplementation._wrap$ctor.prototype = MouseEventWrappingImplementation.prototype;
function MouseEventWrappingImplementation() {}
// ********** Code for MutationEventWrappingImplementation **************
$inherits(MutationEventWrappingImplementation, EventWrappingImplementation);
MutationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MutationEventWrappingImplementation._wrap$ctor.prototype = MutationEventWrappingImplementation.prototype;
function MutationEventWrappingImplementation() {}
// ********** Code for _ChildrenNodeList **************
_ChildrenNodeList._wrap$ctor = function(node) {
  this._node = node;
  this._childNodes = node.get$childNodes();
}
_ChildrenNodeList._wrap$ctor.prototype = _ChildrenNodeList.prototype;
function _ChildrenNodeList() {}
_ChildrenNodeList.prototype._toList = function() {
  var output = new Array(this._childNodes.get$length());
  for (var i = (0), len = this._childNodes.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapNode(this._childNodes.$index(i)));
  }
  return output;
}
_ChildrenNodeList.prototype.get$first = function() {
  return LevelDom.wrapNode(this._node.get$firstChild());
}
_ChildrenNodeList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenNodeList.prototype.filter = function(f) {
  return new _NodeList(this._toList().filter$1(f));
}
_ChildrenNodeList.prototype.isEmpty = function() {
  return !this._node.hasChildNodes();
}
_ChildrenNodeList.prototype.get$length = function() {
  return this._childNodes.get$length();
}
_ChildrenNodeList.prototype.$index = function(index) {
  return LevelDom.wrapNode(this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.$setindex = function(index, value) {
  this._node.replaceChild(LevelDom.unwrap(value), this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.add = function(value) {
  this._node.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenNodeList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenNodeList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._node.appendChild(LevelDom.unwrap(node));
  }
}
_ChildrenNodeList.prototype.clear = function() {
  this._node.set$textContent("");
}
_ChildrenNodeList.prototype.add$1 = _ChildrenNodeList.prototype.add;
_ChildrenNodeList.prototype.clear$0 = _ChildrenNodeList.prototype.clear;
_ChildrenNodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenNodeList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._list = _list;
}
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear;
_ListWrapper_Node.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Node.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _NodeList **************
$inherits(_NodeList, _ListWrapper_Node);
function _NodeList(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeList.prototype.filter = function(f) {
  return new _NodeList(_ListWrapper_Node.prototype.filter.call(this, f));
}
_NodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ObjectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for OverflowEventWrappingImplementation **************
$inherits(OverflowEventWrappingImplementation, EventWrappingImplementation);
OverflowEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OverflowEventWrappingImplementation._wrap$ctor.prototype = OverflowEventWrappingImplementation.prototype;
function OverflowEventWrappingImplementation() {}
// ********** Code for PageTransitionEventWrappingImplementation **************
$inherits(PageTransitionEventWrappingImplementation, EventWrappingImplementation);
PageTransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PageTransitionEventWrappingImplementation._wrap$ctor.prototype = PageTransitionEventWrappingImplementation.prototype;
function PageTransitionEventWrappingImplementation() {}
// ********** Code for PopStateEventWrappingImplementation **************
$inherits(PopStateEventWrappingImplementation, EventWrappingImplementation);
PopStateEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PopStateEventWrappingImplementation._wrap$ctor.prototype = PopStateEventWrappingImplementation.prototype;
function PopStateEventWrappingImplementation() {}
// ********** Code for ProgressEventWrappingImplementation **************
$inherits(ProgressEventWrappingImplementation, EventWrappingImplementation);
ProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressEventWrappingImplementation._wrap$ctor.prototype = ProgressEventWrappingImplementation.prototype;
function ProgressEventWrappingImplementation() {}
// ********** Code for StorageEventWrappingImplementation **************
$inherits(StorageEventWrappingImplementation, EventWrappingImplementation);
StorageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
StorageEventWrappingImplementation._wrap$ctor.prototype = StorageEventWrappingImplementation.prototype;
function StorageEventWrappingImplementation() {}
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.rootElement);
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
function SVGDocumentWrappingImplementation() {}
SVGDocumentWrappingImplementation.prototype.is$html_Document = function(){return true};
SVGDocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGSVGElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for TextEventWrappingImplementation **************
$inherits(TextEventWrappingImplementation, UIEventWrappingImplementation);
TextEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextEventWrappingImplementation._wrap$ctor.prototype = TextEventWrappingImplementation.prototype;
function TextEventWrappingImplementation() {}
// ********** Code for TouchEventWrappingImplementation **************
$inherits(TouchEventWrappingImplementation, UIEventWrappingImplementation);
TouchEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TouchEventWrappingImplementation._wrap$ctor.prototype = TouchEventWrappingImplementation.prototype;
function TouchEventWrappingImplementation() {}
// ********** Code for TransitionEventWrappingImplementation **************
$inherits(TransitionEventWrappingImplementation, EventWrappingImplementation);
TransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TransitionEventWrappingImplementation._wrap$ctor.prototype = TransitionEventWrappingImplementation.prototype;
function TransitionEventWrappingImplementation() {}
// ********** Code for WheelEventWrappingImplementation **************
$inherits(WheelEventWrappingImplementation, UIEventWrappingImplementation);
WheelEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WheelEventWrappingImplementation._wrap$ctor.prototype = WheelEventWrappingImplementation.prototype;
function WheelEventWrappingImplementation() {}
// ********** Code for WindowEventsImplementation **************
$inherits(WindowEventsImplementation, EventsImplementation);
WindowEventsImplementation._wrap$ctor = function(_ptr) {
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
WindowEventsImplementation._wrap$ctor.prototype = WindowEventsImplementation.prototype;
function WindowEventsImplementation() {}
WindowEventsImplementation.prototype.get$click = function() {
  return this._get("click");
}
WindowEventsImplementation.prototype.get$keyUp = function() {
  return this._get("keyup");
}
WindowEventsImplementation.prototype.get$message = function() {
  return this._get("message");
}
WindowEventsImplementation.prototype.get$mouseWheel = function() {
  return this._get("mousewheel");
}
WindowEventsImplementation.prototype.get$resize = function() {
  return this._get("resize");
}
WindowEventsImplementation.prototype.get$scroll = function() {
  return this._get("scroll");
}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
WindowWrappingImplementation.prototype.get$location = function() {
  return LevelDom.wrapLocation(this._ptr.get$location());
}
WindowWrappingImplementation.prototype.get$status = function() {
  return this._ptr.get$status();
}
WindowWrappingImplementation.prototype.open = function(url, target, features) {
  if (null == features) {
    return LevelDom.wrapWindow(this._ptr.open$2(url, target));
  }
  else {
    return LevelDom.wrapWindow(this._ptr.open$3(url, target, features));
  }
}
WindowWrappingImplementation.prototype.postMessage = function(message, messagePort, targetOrigin) {
  if (null == targetOrigin) {
    if (null == messagePort) {
      this._ptr.postMessage$1(message);
      return;
    }
    else {
      this._ptr.postMessage$2(message, messagePort);
      return;
    }
  }
  else {
    this._ptr.postMessage$3(message, LevelDom.unwrap(messagePort), targetOrigin);
    return;
  }
  $throw("Incorrect number or type of arguments");
}
WindowWrappingImplementation.prototype.scroll = function(x, y) {
  this._ptr.scroll$2(x, y);
}
WindowWrappingImplementation.prototype.get$scroll = function() {
  return this.scroll.bind(this);
}
WindowWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new WindowEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
WindowWrappingImplementation.prototype.open$2 = WindowWrappingImplementation.prototype.open;
WindowWrappingImplementation.prototype.open$3 = WindowWrappingImplementation.prototype.open;
WindowWrappingImplementation.prototype.postMessage$1 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$2 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$3 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.scroll$2 = WindowWrappingImplementation.prototype.scroll;
// ********** Code for XMLHttpRequestProgressEventWrappingImplementation **************
$inherits(XMLHttpRequestProgressEventWrappingImplementation, ProgressEventWrappingImplementation);
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  ProgressEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestProgressEventWrappingImplementation.prototype;
function XMLHttpRequestProgressEventWrappingImplementation() {}
// ********** Code for XMLHttpRequestEventsImplementation **************
$inherits(XMLHttpRequestEventsImplementation, EventsImplementation);
XMLHttpRequestEventsImplementation._wrap$ctor = function(_ptr) {
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
XMLHttpRequestEventsImplementation._wrap$ctor.prototype = XMLHttpRequestEventsImplementation.prototype;
function XMLHttpRequestEventsImplementation() {}
XMLHttpRequestEventsImplementation.prototype.get$readyStateChange = function() {
  return this._get("readystatechange");
}
// ********** Code for XMLHttpRequestWrappingImplementation **************
$inherits(XMLHttpRequestWrappingImplementation, EventTargetWrappingImplementation);
XMLHttpRequestWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestWrappingImplementation.prototype;
function XMLHttpRequestWrappingImplementation() {}
XMLHttpRequestWrappingImplementation.XMLHttpRequestWrappingImplementation$factory = function() {
  return new XMLHttpRequestWrappingImplementation._wrap$ctor(_XMLHttpRequestFactoryProvider.XMLHttpRequest$factory());
}
XMLHttpRequestWrappingImplementation.prototype.get$readyState = function() {
  return this._ptr.get$readyState();
}
XMLHttpRequestWrappingImplementation.prototype.get$responseText = function() {
  return this._ptr.get$responseText();
}
XMLHttpRequestWrappingImplementation.prototype.get$status = function() {
  return this._ptr.get$status();
}
XMLHttpRequestWrappingImplementation.prototype.open = function(method, url, async, user, password) {
  if (null == user) {
    if (null == password) {
      this._ptr.open$3(method, url, async);
      return;
    }
  }
  else {
    if (null == password) {
      this._ptr.open$4(method, url, async, user);
      return;
    }
    else {
      this._ptr.open$5(method, url, async, user, password);
      return;
    }
  }
  $throw("Incorrect number or type of arguments");
}
XMLHttpRequestWrappingImplementation.prototype.send = function(data) {
  if (null == data) {
    this._ptr.send$0();
    return;
  }
  else {
    if (!!(data && data.is$html_Document())) {
      this._ptr.send$1(LevelDom.unwrapMaybePrimitive(data));
      return;
    }
    else {
      if ((typeof(data) == 'string')) {
        this._ptr.send$1(LevelDom.unwrapMaybePrimitive(data));
        return;
      }
    }
  }
  $throw("Incorrect number or type of arguments");
}
XMLHttpRequestWrappingImplementation.prototype.setRequestHeader = function(header, value) {
  this._ptr.setRequestHeader(header, value);
}
XMLHttpRequestWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new XMLHttpRequestEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
XMLHttpRequestWrappingImplementation.prototype.open$3 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.open$4 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.open$5 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.send$0 = XMLHttpRequestWrappingImplementation.prototype.send;
XMLHttpRequestWrappingImplementation.prototype.send$1 = XMLHttpRequestWrappingImplementation.prototype.send;
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    html_get$window().get$on().get$message().add((function (e) {
      return _completeMeasurementFutures();
    })
    , false);
    $globals._firstMeasurementRequest = false;
  }
  html_get$window().postMessage("DART-MEASURE", "*");
}
function _createMeasurementFuture(computeValue, completer) {
  if (null == $globals._pendingRequests) {
    $globals._pendingRequests = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingRequests.add(new _MeasurementRequest(computeValue, completer));
  return completer.get$future();
}
function _completeMeasurementFutures() {
  if ($eq($globals._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $globals._nextMeasurementFrameScheduled = false;
  if (null != $globals._pendingRequests) {
    var $$list = $globals._pendingRequests;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      try {
        request.value = request.computeValue();
      } catch (e) {
        e = _toDartException(e);
        request.value = e;
        request.exception = true;
      }
    }
  }
  var completedRequests = $globals._pendingRequests;
  var readyMeasurementFrameCallbacks = $globals._pendingMeasurementFrameCallbacks;
  $globals._pendingRequests = null;
  $globals._pendingMeasurementFrameCallbacks = null;
  if (null != completedRequests) {
    for (var $$i = completedRequests.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      if (request.exception) {
        request.completer.completeException(request.value);
      }
      else {
        request.completer.complete(request.value);
      }
    }
  }
  if (null != readyMeasurementFrameCallbacks) {
    for (var $$i = readyMeasurementFrameCallbacks.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      handler();
    }
  }
}
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$window() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretWindow;
}
function html_get$document() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretDocument;
}
//  ********** Library json **************
// ********** Code for _JSON **************
_JSON = JSON;
// ********** Code for json_JSON **************
function json_JSON() {}
json_JSON.parse = function(str) {
  return _JSON.parse(str, (function (_, obj) {
    var keys = _jsKeys(obj);
    if ($eq(keys)) return obj;
    var map = new HashMapImplementation();
    for (var $$i = keys.iterator(); $$i.hasNext(); ) {
      var key = $$i.next();
      map.$setindex(key, _getValue(obj, key));
    }
    return map;
  })
  );
}
json_JSON.stringify = function(value) {
  return _JSON.stringify(value, (function (_, obj) {
    if (_directToJson(obj)) return obj;
    if (!!(obj && obj.is$Map_dart_core_String$Dynamic())) {
      var map = obj;
      obj = new Object();
      map.forEach((function (k, v) {
        return _setValue(obj, k, v);
      })
      );
      return obj;
    }
    $throw(new IllegalArgumentException(("cannot convert \"" + value + "\" to JSON")));
  })
  );
}
// ********** Code for top level **************
function _getValue(obj, key) {
  return obj[key]
}
function _setValue(obj, key, value) {
  obj[key] = value
}
function _directToJson(obj) {
  return typeof obj != 'object' || obj == null || obj instanceof Array
}
function _jsKeys(obj) {
  if (obj != null && typeof obj == 'object' && !(obj instanceof Array)) {
  return Object.keys(obj);
  }
  return null;
}
//  ********** Library uri **************
// ********** Code for Uri **************
Uri.fromString$ctor = function(uri) {
  Uri._fromMatch$ctor.call(this, const$0000.firstMatch(uri));
}
Uri.fromString$ctor.prototype = Uri.prototype;
Uri._fromMatch$ctor = function(m) {
  Uri.call(this, Uri._emptyIfNull(m.$index((1))), Uri._emptyIfNull(m.$index((2))), Uri._emptyIfNull(m.$index((3))), Uri._parseIntOrZero(m.$index((4))), Uri._emptyIfNull(m.$index((5))), Uri._emptyIfNull(m.$index((6))), Uri._emptyIfNull(m.$index((7))));
}
Uri._fromMatch$ctor.prototype = Uri.prototype;
function Uri(scheme, userInfo, domain, port, path, query, fragment) {
  this.fragment = fragment;
  this.scheme = scheme;
  this.domain = domain;
  this.path = path;
  this.port = port;
  this.userInfo = userInfo;
  this.query = query;
}
Uri._emptyIfNull = function(val) {
  return val != null ? val : "";
}
Uri._parseIntOrZero = function(val) {
  if (null != val && val != "") {
    return Math.parseInt(val);
  }
  else {
    return (0);
  }
}
Uri.prototype.hasAuthority = function() {
  return (this.userInfo != "") || (this.domain != "") || (this.port != (0));
}
Uri.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  Uri._addIfNonEmpty(sb, this.scheme, this.scheme, ":");
  if (this.hasAuthority() || (this.scheme == "file")) {
    sb.add("//");
    Uri._addIfNonEmpty(sb, this.userInfo, this.userInfo, "@");
    sb.add(null == this.domain ? "null" : this.domain);
    if (this.port != (0)) {
      sb.add(":");
      sb.add(this.port.toString());
    }
  }
  sb.add(null == this.path ? "null" : this.path);
  Uri._addIfNonEmpty(sb, this.query, "?", this.query);
  Uri._addIfNonEmpty(sb, this.fragment, "#", this.fragment);
  return sb.toString();
}
Uri._addIfNonEmpty = function(sb, test, first, second) {
  if ("" != test) {
    sb.add(null == first ? "null" : first);
    sb.add(null == second ? "null" : second);
  }
}
// ********** Code for top level **************
//  ********** Library DartBoardClient **************
// ********** Code for DartBoardClient **************
function DartBoardClient() {
  this.scrollWidth = (400);
  this.scrollHeight = (400);
}
DartBoardClient.prototype.run = function() {
  var $this = this; // closure support
  var queryArguments = new HashMapImplementation();
  var u;
  try {
    dart_core_print($add("href = ", html_get$document().get$window().get$location().get$href()));
    u = new Uri.fromString$ctor(html_get$document().get$window().get$location().get$href());
    dart_core_print(("query = " + u.query));
    u.query.split_("&").forEach$1((function (s) {
      var arg = s.split_("=");
      if (arg.get$length() == (2) && !arg.$index((0)).isEmpty()) {
        queryArguments.$setindex(arg.$index((0)), arg.$index((1)));
      }
    })
    );
    queryArguments.forEach((function (k, v) {
      dart_core_print(("k=" + k + ",v=" + v));
    })
    );
  } catch (ex) {
    ex = _toDartException(ex);
    if (!(ex && ex.is$Exception())) throw ex;
    dart_core_print($add("url parse exception: ", ex.toString()));
  }
  var view = html_get$document().query("#view");
  html_get$document().get$window().get$on().get$resize().add((function (event) {
    html_get$document().get$rect().then((function (rect) {
      view.get$style().set$left("50%");
      view.get$style().set$top("50%");
      view.get$style().set$marginLeft($add(((rect.client.get$width() - (350)) / (2)).toString(), "px"));
    })
    );
  })
  , false);
  var textAreaElement = html_get$document().query("#editorBuffer");
  if (queryArguments.containsKey("docId")) {
    this.sendRequest(("/getCode?docId=" + queryArguments.$index("docId")), new HashMapImplementation(), (function (response) {
      dart_core_print("/getCode");
      response.forEach((function (k, v) {
        dart_core_print(("k=" + k + ",v=" + v));
      })
      );
      textAreaElement.set$value(response.$index("code"));
    })
    , (function () {
      return dart_core_print("message failed");
    })
    );
  }
  var scrollContainer = html_get$document().query("#scroll-container");
  textAreaElement.get$on().get$mouseWheel().add((function (mw) {
    if ($ne(mw)) {
      dart_core_print(mw.get$type());
    }
  })
  , false);
  textAreaElement.get$on().get$scroll().add$1((function (sc) {
    if ($ne(sc)) {
      dart_core_print(sc.get$type());
      textAreaElement.get$rect().then((function (rect) {
        var scrollTop = rect.scroll.get$top();
        var left = rect.scroll.get$left();
        scrollContainer.get$style().set$top(-scrollTop);
        scrollContainer.get$style().set$left(-left);
      })
      );
    }
  })
  );
  var editorBuffer = html_get$document().query("#editorBuffer");
  editorBuffer.get$on().get$keyUp().add((function (event) {
    return;
    var s = Strings.String$fromCharCodes$factory([event.get$keyCode()]);
    dart_core_print("event.keyCode = " + event.get$keyCode());
    dart_core_print($add("event.keyIdentifier = ", event.get$keyIdentifier()));
    dart_core_print($add("event.keyCode.toString = ", s));
    dart_core_print("event.keyLocation = " + event.get$keyLocation());
    dart_core_print("selectionEnd = " + editorBuffer.get$selectionEnd());
    dart_core_print("selectionStart = " + editorBuffer.get$selectionStart());
    dart_core_print("=================");
    var d = html_get$document().query("#editorBufferContainer");
    editorBuffer.get$rect().then((function (rect) {
      var editorWidth = rect.client.get$width();
      var offsetWidth = rect.offset.get$width();
      $this.scrollWidth = rect.scroll.get$width();
      $this.scrollHeight = rect.scroll.get$height();
      d.get$style().set$width($this.scrollWidth);
      d.get$style().set$height($this.scrollHeight);
      d.get$firstElementChild().get$style().set$height($this.scrollHeight);
    })
    );
    var sb = new StringBufferImpl("");
    var i = (0);
    editorBuffer.get$value().split_("\n").forEach$1((function (_s) {
      sb.add($add($add(("<div style='top:" + i + "; position: absolute;width:" + $this.scrollWidth + ";font-family: monospace; font-size: 15px;line-height: 1.2;  overflow:scroll;overflow-x: scroll;overflow-y: scroll;'><span>"), _s), "</span></div>"));
      i += (17);
    })
    );
    var textEl = ElementWrappingImplementation.ElementWrappingImplementation$html$factory($add($add(("<div style='top:0;position: absolute;height:" + $this.scrollHeight + ";width:" + $this.scrollWidth + ";font-family: monospace; font-size: 15px;line-height: 1.2;overflow:scroll;overflow-x: scroll;overflow-y: scroll;'>"), sb.toString()), "</div>"));
    d.get$nodes().forEach$1((function (n) {
      n.remove$0();
    })
    );
    d.get$nodes().add(textEl);
  })
  , false);
  html_get$document().query("#submitButton").get$on().get$click().add$1((function (event) {
    dart_core_print("click submit button");
    var t = html_get$document().query("#editorBuffer");
    var messageRequest = _map(["code", t.get$value()]);
    $this.sendRequest("/dartExec", messageRequest, (function (response) {
      dart_core_print(response.$index("console"));
      var p = html_get$document().query("#results");
      p.set$innerHTML(response.$index("console"));
      response.forEach((function (k, v) {
        dart_core_print(("k=" + k + ",v=" + v));
      })
      );
      p.set$innerHTML($add($add($add($add(p.get$innerHTML(), "<br/>"), u.path), "?docId="), json_JSON.parse(response.$index("url")).$index("id")));
    })
    , (function () {
      dart_core_print("message failed");
    })
    );
  })
  );
}
DartBoardClient.prototype.sendRequest = function(url, data, onSuccess, onError) {
  var request = XMLHttpRequestWrappingImplementation.XMLHttpRequestWrappingImplementation$factory();
  request.get$on().get$readyStateChange().add((function (event) {
    if (request.get$readyState() != (4)) return;
    if (request.get$status() == (200)) {
      onSuccess.call$1(json_JSON.parse(request.get$responseText()));
    }
    else {
      onError.call$0();
    }
  })
  , false);
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  dart_core_print($add($add($add("sendRequest ", url), " "), json_JSON.stringify(data)));
  request.send(json_JSON.stringify(data));
  return request;
}
// ********** Code for top level **************
function main() {
  new DartBoardClient().run();
}
// 191 dynamic types.
// 495 types
// 43 !leaf
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
(function(){
  var v0/*HTMLInputElement*/ = 'HTMLInputElement|HTMLIsIndexElement';
  var v1/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v2/*HTMLElement*/ = [v0/*HTMLInputElement*/,v1/*HTMLMediaElement*/,'HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v3/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v4/*SVGGradientElement*/ = 'SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement';
  var v5/*SVGTextContentElement*/ = 'SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement';
  var v6/*UIEvent*/ = 'UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent';
  var v7/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v8/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v9/*Element*/ = [v2/*HTMLElement*/,v3/*SVGComponentTransferFunctionElement*/,v4/*SVGGradientElement*/,v5/*SVGTextContentElement*/,'Element|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v10/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v11/*Node*/ = [v7/*CharacterData*/,v8/*Document*/,v9/*Element*/,'Node|Attr|DocumentFragment|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v12/*Uint8Array*/ = 'Uint8Array|Uint8ClampedArray';
  var v13/*AudioParam*/ = 'AudioParam|AudioGain';
  var v14/*Blob*/ = 'Blob|File';
  var v15/*CSSRule*/ = 'CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule|WebKitCSSRegionRule';
  var v16/*CSSValueList*/ = 'CSSValueList|WebKitCSSTransformValue';
  var v17/*DOMTokenList*/ = 'DOMTokenList|DOMSettableTokenList';
  var v18/*EntrySync*/ = 'EntrySync|DirectoryEntrySync|FileEntrySync';
  var v19/*Event*/ = [v6/*UIEvent*/,'Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent'].join('|');
  var v20/*EventTarget*/ = [v10/*AbstractWorker*/,v11/*Node*/,'EventTarget|DOMApplicationCache|DOMWindow|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|XMLHttpRequest|XMLHttpRequestUpload'].join('|');
  var v21/*HTMLCollection*/ = 'HTMLCollection|HTMLOptionsCollection';
  var v22/*IDBRequest*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v23/*SVGStylable*/ = 'SVGStylable|SVGFilterPrimitiveStandardAttributes';
  var v24/*StyleSheet*/ = 'StyleSheet|CSSStyleSheet';
  var v25/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v10/*AbstractWorker*/]
    , ['AudioParam', v13/*AudioParam*/]
    , ['Blob', v14/*Blob*/]
    , ['CSSRule', v15/*CSSRule*/]
    , ['CSSValueList', v16/*CSSValueList*/]
    , ['CharacterData', v7/*CharacterData*/]
    , ['DOMTokenList', v17/*DOMTokenList*/]
    , ['Document', v8/*Document*/]
    , ['HTMLInputElement', v0/*HTMLInputElement*/]
    , ['HTMLMediaElement', v1/*HTMLMediaElement*/]
    , ['HTMLElement', v2/*HTMLElement*/]
    , ['SVGComponentTransferFunctionElement', v3/*SVGComponentTransferFunctionElement*/]
    , ['SVGGradientElement', v4/*SVGGradientElement*/]
    , ['SVGTextContentElement', v5/*SVGTextContentElement*/]
    , ['Element', v9/*Element*/]
    , ['EntrySync', v18/*EntrySync*/]
    , ['UIEvent', v6/*UIEvent*/]
    , ['Event', v19/*Event*/]
    , ['Node', v11/*Node*/]
    , ['EventTarget', v20/*EventTarget*/]
    , ['HTMLCollection', v21/*HTMLCollection*/]
    , ['IDBRequest', v22/*IDBRequest*/]
    , ['SVGStylable', v23/*SVGStylable*/]
    , ['StyleSheet', v24/*StyleSheet*/]
    , ['Uint8Array', v12/*Uint8Array*/]
    , ['WorkerContext', v25/*WorkerContext*/]
    , ['DOMType', [v12/*Uint8Array*/,v13/*AudioParam*/,v14/*Blob*/,v15/*CSSRule*/,v16/*CSSValueList*/,v17/*DOMTokenList*/,v18/*EntrySync*/,v19/*Event*/,v20/*EventTarget*/,v21/*HTMLCollection*/,v22/*IDBRequest*/,v23/*SVGStylable*/,v24/*StyleSheet*/,v25/*WorkerContext*/,'DOMType|ArrayBuffer|ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|AudioBuffer|AudioContext|AudioListener|AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode|BarInfo|CSSRuleList|CSSStyleDeclaration|CSSValue|CSSPrimitiveValue|SVGColor|SVGPaint|CanvasGradient|CanvasPattern|CanvasPixelArray|CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|ClientRect|ClientRectList|Clipboard|Coordinates|Counter|Crypto|DOMException|DOMFileSystem|DOMFileSystemSync|DOMFormData|DOMImplementation|DOMMimeType|DOMMimeTypeArray|DOMParser|DOMPlugin|DOMPluginArray|DOMSelection|DOMURL|DataTransferItem|DataTransferItemList|Database|DatabaseSync|DirectoryReader|DirectoryReaderSync|ElementTimeControl|ElementTraversal|Entry|DirectoryEntry|FileEntry|EntryArray|EntryArraySync|EventException|FileError|FileException|FileList|FileReader|FileReaderSync|FileWriter|FileWriterSync|Geolocation|Geoposition|HTMLAllCollection|History|IDBAny|IDBCursor|IDBCursorWithValue|IDBDatabase|IDBDatabaseError|IDBDatabaseException|IDBFactory|IDBIndex|IDBKey|IDBKeyRange|IDBObjectStore|IDBTransaction|ImageData|JavaScriptCallFrame|Location|MediaController|MediaError|MediaList|MediaQueryList|MediaQueryListListener|MemoryInfo|MessageChannel|Metadata|NamedNodeMap|Navigator|NodeFilter|NodeIterator|NodeList|NodeSelector|NotificationCenter|OESStandardDerivatives|OESTextureFloat|OESVertexArrayObject|OperationNotAllowedException|Performance|PerformanceNavigation|PerformanceTiming|PositionError|RGBColor|Range|RangeException|Rect|SQLError|SQLException|SQLResultSet|SQLResultSetRowList|SQLTransaction|SQLTransactionSync|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGElementInstanceList|SVGException|SVGExternalResourcesRequired|SVGFitToViewBox|SVGLangSpace|SVGLength|SVGLengthList|SVGLocatable|SVGTransformable|SVGMatrix|SVGNumber|SVGNumberList|SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel|SVGPathSegList|SVGPoint|SVGPointList|SVGPreserveAspectRatio|SVGRect|SVGRenderingIntent|SVGStringList|SVGTests|SVGTransform|SVGTransformList|SVGURIReference|SVGUnitTypes|SVGZoomAndPan|SVGViewSpec|Screen|ScriptProfile|ScriptProfileNode|SpeechInputResult|SpeechInputResultList|Storage|StorageInfo|StyleMedia|StyleSheetList|TextMetrics|TextTrack|TextTrackCue|TextTrackCueList|TextTrackList|TimeRanges|Touch|TouchList|TreeWalker|ValidityState|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextures|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitAnimation|WebKitAnimationList|WebKitBlobBuilder|WebKitCSSMatrix|WebKitNamedFlow|WebKitPoint|WorkerLocation|WorkerNavigator|XMLHttpRequestException|XMLSerializer|XPathEvaluator|XPathException|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals._firstMeasurementRequest = true;
  $globals._nextMeasurementFrameScheduled = false;
}
var const$0000 = new JSSyntaxRegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0002 = Object.create(NoMoreElementsException.prototype, {});
var const$0005 = new JSSyntaxRegExp("<(\\w+)");
var const$0006 = Object.create(IllegalAccessException.prototype, {});
var const$0007 = Object.create(EmptyQueueException.prototype, {});
var const$0008 = _constMap(["body", "html", "head", "html", "caption", "table", "td", "tr", "tbody", "table", "colgroup", "table", "col", "colgroup", "tr", "tbody", "tbody", "table", "tfoot", "table", "thead", "table", "track", "audio"]);
var const$0009 = Object.create(SimpleClientRect.prototype, {left: {"value": (0), writeable: false}, top: {"value": (0), writeable: false}, width: {"value": (0), writeable: false}, height: {"value": (0), writeable: false}});
var const$0010 = ImmutableList.ImmutableList$from$factory([]);
var const$0011 = Object.create(EmptyElementRect.prototype, {client: {"value": const$0009, writeable: false}, scroll: {"value": const$0009, writeable: false}, bounding: {"value": const$0009, writeable: false}, clientRects: {"value": const$0010, writeable: false}, offset: {"value": const$0009, writeable: false}});
var $globals = {};
$static_init();
main();
