//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
$defProp(Object.prototype, '$typeNameOf', function() {
  var constructor = this.constructor;
  if (typeof(constructor) == 'function') {
    // The constructor isn't null or undefined at this point. Try
    // to grab hold of its name.
    var name = constructor.name;
    // If the name is a non-empty string, we use that as the type
    // name of this object. On Firefox, we often get 'Object' as
    // the constructor name even for more specialized objects so
    // we have to fall through to the toString() based implementation
    // below in that case.
    if (name && typeof(name) == 'string' && name != 'Object') return name;
  }
  var string = Object.prototype.toString.call(this);
  var name = string.substring(8, string.length - 1);
  if (name == 'Window') {
    name = 'DOMWindow';
  } else if (name == 'Document') {
    name = 'HTMLDocument';
  }
  return name;
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
function $wrap_call$0(fn) { return fn; }
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
function $gt(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x > y : x.$gt(y);
}
function $gte(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x >= y : x.$gte(y);
}
function $lt(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x < y : x.$lt(y);
}
function $mod(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    var result = x % y;
    if (result == 0) {
      return 0;  // Make sure we don't return -0.0.
    } else if (result < 0) {
      if (y < 0) {
        return result - y;
      } else {
        return result + y;
      }
    }
    return result;
  } else {
    return x.$mod(y);
  }
}
function $mul(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x * y : x.$mul(y);
}
function $ne(x, y) {
  if (x == null) return y != null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x != y : !x.$eq(y);
}
function $sub(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x - y : x.$sub(y);
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
$defProp(Object.prototype, "add$2", function($0, $1) {
  return this.noSuchMethod("add", [$0, $1]);
});
$defProp(Object.prototype, "addEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("addEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "clearInterval$0", function() {
  return this.noSuchMethod("clearInterval", []);
});
$defProp(Object.prototype, "clearTimeout$0", function() {
  return this.noSuchMethod("clearTimeout", []);
});
$defProp(Object.prototype, "complete$1", function($0) {
  return this.noSuchMethod("complete", [$0]);
});
$defProp(Object.prototype, "contains$1", function($0) {
  return this.noSuchMethod("contains", [$0]);
});
$defProp(Object.prototype, "end$0", function() {
  return this.noSuchMethod("end", []);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "getContext$0", function() {
  return this.noSuchMethod("getContext", []);
});
$defProp(Object.prototype, "group$1", function($0) {
  return this.noSuchMethod("group", [$0]);
});
$defProp(Object.prototype, "is$BodyElement", function() {
  return false;
});
$defProp(Object.prototype, "is$DivElement", function() {
  return false;
});
$defProp(Object.prototype, "is$Duration", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
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
$defProp(Object.prototype, "item$1", function($0) {
  return this.noSuchMethod("item", [$0]);
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
$defProp(Object.prototype, "pushState$2", function($0, $1) {
  return this.noSuchMethod("pushState", [$0, $1]);
});
$defProp(Object.prototype, "query$1", function($0) {
  return this.noSuchMethod("query", [$0]);
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "removeEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("removeEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "replaceState$2", function($0, $1) {
  return this.noSuchMethod("replaceState", [$0, $1]);
});
$defProp(Object.prototype, "send$0", function() {
  return this.noSuchMethod("send", []);
});
$defProp(Object.prototype, "send$1", function($0) {
  return this.noSuchMethod("send", [$0]);
});
$defProp(Object.prototype, "setInterval$2", function($0, $1) {
  return this.noSuchMethod("setInterval", [$0, $1]);
});
$defProp(Object.prototype, "setTimeout$2", function($0, $1) {
  return this.noSuchMethod("setTimeout", [$0, $1]);
});
$defProp(Object.prototype, "some$1", function($0) {
  return this.noSuchMethod("some", [$0]);
});
$defProp(Object.prototype, "sort$1", function($0) {
  return this.noSuchMethod("sort", [$0]);
});
$defProp(Object.prototype, "start$0", function() {
  return this.noSuchMethod("start", []);
});
$defProp(Object.prototype, "timeStamp$0", function() {
  return this.noSuchMethod("timeStamp", []);
});
$defProp(Object.prototype, "webkitConvertPointFromNodeToPage$0", function() {
  return this.noSuchMethod("webkitConvertPointFromNodeToPage", []);
});
$defProp(Object.prototype, "webkitConvertPointFromNodeToPage$1", function($0) {
  return this.noSuchMethod("webkitConvertPointFromNodeToPage", [$0]);
});
$defProp(Object.prototype, "webkitConvertPointFromPageToNode$0", function() {
  return this.noSuchMethod("webkitConvertPointFromPageToNode", []);
});
$defProp(Object.prototype, "webkitConvertPointFromPageToNode$1", function($0) {
  return this.noSuchMethod("webkitConvertPointFromPageToNode", [$0]);
});
$defProp(Object.prototype, "webkitRequestAnimationFrame$2", function($0, $1) {
  return this.noSuchMethod("webkitRequestAnimationFrame", [$0, $1]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
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
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for NotImplementedException **************
function NotImplementedException() {

}
NotImplementedException.prototype.toString = function() {
  return "NotImplementedException";
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
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
Function.prototype.to$call$3 = function() {
  this.call$3 = this._genStub(3);
  this.to$call$3 = function() { return this.call$3; };
  return this.call$3;
};
Function.prototype.call$3 = function($0, $1, $2) {
  return this.to$call$3()($0, $1, $2);
};
function to$call$3(f) { return f && f.to$call$3(); }
// ********** Code for Math **************
Math.parseInt = function(str) {
  var ret = parseInt(str);
    if (isNaN(ret)) $throw(new BadNumberFormatException(str));
    return ret;
}
Math.parseDouble = function(str) {
  var ret = parseFloat(str);
    if (isNaN(ret) && str != 'NaN') $throw(new BadNumberFormatException(str));
    return ret;
}
Math.min = function(a, b) {
  if (a == b) return a;
    if (a < b) {
      if (isNaN(b)) return b;
      else return a;
    }
    if (isNaN(a)) return a;
    else return b;
}
Math.max = function(a, b) {
  return (a >= b) ? a : b;
}
// ********** Code for Strings **************
function Strings() {}
Strings.String$fromCharCodes$factory = function(charCodes) {
  return StringBase.createFromCharCodes(charCodes);
}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
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
$defProp(ListFactory.prototype, "is$List", function(){return true});
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
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "last", function() {
  return this.$index(this.get$length() - (1));
});
$defProp(ListFactory.prototype, "getRange", function(start, length) {
      if (length == 0) return [];
      if (length < 0) throw new IllegalArgumentException('length');
      if (start < 0 || start + length > this.length)
        throw new IndexOutOfRangeException(start);
      return this.slice(start, start + length);
    
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
$defProp(ListFactory.prototype, "some$1", function($0) {
  return this.some(to$call$1($0));
});
$defProp(ListFactory.prototype, "sort$1", function($0) {
  return this.sort(to$call$2($0));
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
    $throw(const$0001);
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
  $throw(const$0003);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0003);
}
ImmutableList.prototype.sort = function(compare) {
  $throw(const$0003);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0003);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0003);
}
ImmutableList.prototype.clear = function() {
  $throw(const$0003);
}
ImmutableList.prototype.removeLast = function() {
  $throw(const$0003);
}
ImmutableList.prototype.toString = function() {
  return ListFactory.ListFactory$from$factory(this).toString();
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear;
ImmutableList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for ImmutableMap **************
function ImmutableMap(keyValuePairs) {
  this._dart_coreimpl_internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._dart_coreimpl_internal.$index(key);
}
ImmutableMap.prototype.get$length = function() {
  return this._dart_coreimpl_internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._dart_coreimpl_internal.forEach(f);
}
ImmutableMap.prototype.getValues = function() {
  return this._dart_coreimpl_internal.getValues();
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._dart_coreimpl_internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0003);
}
ImmutableMap.prototype.putIfAbsent = function(key, ifAbsent) {
  $throw(const$0003);
}
ImmutableMap.prototype.clear = function() {
  $throw(const$0003);
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
JSSyntaxRegExp.prototype.hasMatch = function(str) {
  return this.re.test(str);
}
JSSyntaxRegExp.prototype.allMatches = function(str) {
  return new _AllMatchesIterable(this, str);
}
JSSyntaxRegExp.prototype.get$_global = function() {
  return new JSSyntaxRegExp._create$ctor(this.pattern, $add($add("g", (this.multiLine ? "m" : "")), (this.ignoreCase ? "i" : "")));
}
// ********** Code for MatchImplementation **************
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.str = str;
  this._start = _start;
  this._groups = _groups;
  this.pattern = pattern;
  this._end = _end;
}
MatchImplementation.prototype.start = function() {
  return this._start;
}
MatchImplementation.prototype.get$start = function() {
  return this.start.bind(this);
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj, args) {
    var func = this;
    if (typeof args !== 'undefined') {
      var boundArgs = Array.prototype.slice.call(arguments, 3);
      return function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
    } else {
      return function() {
        return func.apply(thisObj, arguments);
      };
    }
  };
MatchImplementation.prototype.end = function() {
  return this._end;
}
MatchImplementation.prototype.get$end = function() {
  return this.end.bind(this);
}
MatchImplementation.prototype.group = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.$index = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.end$0 = MatchImplementation.prototype.end;
MatchImplementation.prototype.group$1 = MatchImplementation.prototype.group;
MatchImplementation.prototype.start$0 = MatchImplementation.prototype.start;
// ********** Code for _AllMatchesIterable **************
function _AllMatchesIterable(_re, _str) {
  this._re = _re;
  this._str = _str;
}
_AllMatchesIterable.prototype.iterator = function() {
  return new _AllMatchesIterator(this._re, this._str);
}
// ********** Code for _AllMatchesIterator **************
function _AllMatchesIterator(re, _str) {
  this._dart_coreimpl_done = false;
  this._re = re.get$_global();
  this._str = _str;
}
_AllMatchesIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var next = this._next;
  this._next = null;
  return next;
}
_AllMatchesIterator.prototype.hasNext = function() {
  if (this._dart_coreimpl_done) {
    return false;
  }
  else if (this._next != null) {
    return true;
  }
  this._next = this._re.firstMatch(this._str);
  if (this._next == null) {
    this._dart_coreimpl_done = true;
    return false;
  }
  else {
    return true;
  }
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.remainder = function(other) {
  'use strict'; return this % other;
}
NumImplementation.prototype.isNegative = function() {
  'use strict'; return this == 0 ? (1 / this) < 0 : this < 0;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.round = function() {
  'use strict'; return Math.round(this);
}
NumImplementation.prototype.floor = function() {
  'use strict'; return Math.floor(this);
}
NumImplementation.prototype.ceil = function() {
  'use strict'; return Math.ceil(this);
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toInt = function() {
    'use strict';
    if (isNaN(this)) $throw(new BadNumberFormatException("NaN"));
    if ((this == Infinity) || (this == -Infinity)) {
      $throw(new BadNumberFormatException("Infinity"));
    }
    var truncated = (this < 0) ? Math.ceil(this) : Math.floor(this);
    if (truncated == -0.0) return 0;
    return truncated;
}
// ********** Code for DurationImplementation **************
function DurationImplementation(days, hours, minutes, seconds, milliseconds) {
  this.inMilliseconds = days * (86400000) + hours * (3600000) + minutes * (60000) + seconds * (1000) + milliseconds;
}
DurationImplementation.prototype.is$Duration = function(){return true};
DurationImplementation.prototype.get$inMilliseconds = function() { return this.inMilliseconds; };
DurationImplementation.prototype.get$inDays = function() {
  return $truncdiv(this.inMilliseconds, (86400000));
}
DurationImplementation.prototype.get$inHours = function() {
  return $truncdiv(this.inMilliseconds, (3600000));
}
DurationImplementation.prototype.get$inMinutes = function() {
  return $truncdiv(this.inMilliseconds, (60000));
}
DurationImplementation.prototype.get$inSeconds = function() {
  return $truncdiv(this.inMilliseconds, (1000));
}
DurationImplementation.prototype.$eq = function(other) {
  if (!(other && other.is$Duration())) return false;
  return this.inMilliseconds == other.get$inMilliseconds();
}
DurationImplementation.prototype.hashCode = function() {
  return this.inMilliseconds.hashCode();
}
DurationImplementation.prototype.toString = function() {
  function threeDigits(n) {
    if (n >= (100)) return ("" + n);
    if (n > (10)) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  if (this.inMilliseconds < (0)) {
    var duration = new DurationImplementation((0), (0), (0), (0), -this.inMilliseconds);
    return ("-" + duration);
  }
  var twoDigitMinutes = twoDigits(this.get$inMinutes().remainder((60)));
  var twoDigitSeconds = twoDigits(this.get$inSeconds().remainder((60)));
  var threeDigitMs = threeDigits(this.inMilliseconds.remainder((1000)));
  return ("" + this.get$inHours() + ":" + twoDigitMinutes + ":" + twoDigitSeconds + "." + threeDigitMs);
}
// ********** Code for FutureNotCompleteException **************
function FutureNotCompleteException() {

}
FutureNotCompleteException.prototype.toString = function() {
  return "Exception: future has not been completed";
}
// ********** Code for FutureAlreadyCompleteException **************
function FutureAlreadyCompleteException() {

}
FutureAlreadyCompleteException.prototype.toString = function() {
  return "Exception: future already completed";
}
// ********** Code for FutureImpl **************
function FutureImpl() {
  this._exceptionHandlers = new Array();
  this._dart_coreimpl_listeners = new Array();
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
  return this._dart_coreimpl_value;
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
    this._dart_coreimpl_listeners.add(onComplete);
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
    var $$list = this._dart_coreimpl_listeners;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var listener = $$i.next();
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._dart_coreimpl_listeners.get$length() > (0)) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._dart_coreimpl_value = value;
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
CompleterImpl.prototype.get$complete = function() {
  return this.complete.bind(this);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
CompleterImpl.prototype.complete$1 = CompleterImpl.prototype.complete;
// ********** Code for CompleterImpl_Size **************
$inherits(CompleterImpl_Size, CompleterImpl);
function CompleterImpl_Size() {
  this._futureImpl = new FutureImpl();
}
CompleterImpl_Size.prototype.complete$1 = CompleterImpl_Size.prototype.complete;
// ********** Code for CompleterImpl_bool **************
$inherits(CompleterImpl_bool, CompleterImpl);
function CompleterImpl_bool() {
  this._futureImpl = new FutureImpl();
}
CompleterImpl_bool.prototype.complete$1 = CompleterImpl_bool.prototype.complete;
// ********** Code for CompleterImpl_html_CSSStyleDeclaration **************
$inherits(CompleterImpl_html_CSSStyleDeclaration, CompleterImpl);
function CompleterImpl_html_CSSStyleDeclaration() {
  this._futureImpl = new FutureImpl();
}
CompleterImpl_html_CSSStyleDeclaration.prototype.complete$1 = CompleterImpl_html_CSSStyleDeclaration.prototype.complete;
// ********** Code for CompleterImpl_ElementRect **************
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {
  this._futureImpl = new FutureImpl();
}
CompleterImpl_ElementRect.prototype.complete$1 = CompleterImpl_ElementRect.prototype.complete;
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
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
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
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
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
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
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
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0000);
    this._numberOfDeleted++;
    return value;
  }
  return null;
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
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.getKeys = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, key);
  }
  );
  return list;
}
HashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, value);
  }
  );
  return list;
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
// ********** Code for HashMapImplementation_String$String **************
$inherits(HashMapImplementation_String$String, HashMapImplementation);
function HashMapImplementation_String$String() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_String$String.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
HashMapImplementation_String$String.prototype.clear$0 = HashMapImplementation_String$String.prototype.clear;
// ********** Code for HashMapImplementation_dart_core_String$int **************
$inherits(HashMapImplementation_dart_core_String$int, HashMapImplementation);
function HashMapImplementation_dart_core_String$int() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$int.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
HashMapImplementation_dart_core_String$int.prototype.clear$0 = HashMapImplementation_dart_core_String$int.prototype.clear;
// ********** Code for HashMapImplementation_String$num **************
$inherits(HashMapImplementation_String$num, HashMapImplementation);
function HashMapImplementation_String$num() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_String$num.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
HashMapImplementation_String$num.prototype.clear$0 = HashMapImplementation_String$num.prototype.clear;
// ********** Code for HashMapImplementation_int$_GridTemplateRect **************
$inherits(HashMapImplementation_int$_GridTemplateRect, HashMapImplementation);
function HashMapImplementation_int$_GridTemplateRect() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_int$_GridTemplateRect.prototype.is$Map_dart_core_String$Dynamic = function(){return false};
HashMapImplementation_int$_GridTemplateRect.prototype.clear$0 = HashMapImplementation_int$_GridTemplateRect.prototype.clear;
// ********** Code for HashMapImplementation_int$EventSummary **************
$inherits(HashMapImplementation_int$EventSummary, HashMapImplementation);
function HashMapImplementation_int$EventSummary() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_int$EventSummary.prototype.is$Map_dart_core_String$Dynamic = function(){return false};
HashMapImplementation_int$EventSummary.prototype.clear$0 = HashMapImplementation_int$EventSummary.prototype.clear;
// ********** Code for HashMapImplementation_int$View **************
$inherits(HashMapImplementation_int$View, HashMapImplementation);
function HashMapImplementation_int$View() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_int$View.prototype.is$Map_dart_core_String$Dynamic = function(){return false};
HashMapImplementation_int$View.prototype.clear$0 = HashMapImplementation_int$View.prototype.clear;
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.HashSetImplementation$from$factory = function(other) {
  var set = new HashSetImplementation();
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    set.add(e);
  }
  return set;
}
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.contains = function(value) {
  return this._backingMap.containsKey(value);
}
HashSetImplementation.prototype.remove = function(value) {
  if (!this._backingMap.containsKey(value)) return false;
  this._backingMap.remove(value);
  return true;
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
HashSetImplementation.prototype.some = function(f) {
  var keys = this._backingMap.getKeys();
  return keys.some$1(f);
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
HashSetImplementation.prototype.contains$1 = HashSetImplementation.prototype.contains;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
HashSetImplementation.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
// ********** Code for HashSetImplementation_String **************
$inherits(HashSetImplementation_String, HashSetImplementation);
function HashSetImplementation_String() {
  this._backingMap = new HashMapImplementation_String$String();
}
HashSetImplementation_String.prototype.contains$1 = HashSetImplementation_String.prototype.contains;
HashSetImplementation_String.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation_String.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
HashSetImplementation_String.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
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
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
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
LinkedHashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var index = (0);
  this._list.forEach(function _(entry) {
    list.$setindex(index++, entry.value);
  }
  );
  return list;
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
  this._dart_coreimpl_element = e;
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
  return this._dart_coreimpl_element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.nextEntry = function() {
  return this._next._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._dart_coreimpl_element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry_num **************
$inherits(DoubleLinkedQueueEntry_num, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_num(e) {
  this._dart_coreimpl_element = e;
}
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._dart_coreimpl_element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry__Move **************
$inherits(DoubleLinkedQueueEntry__Move, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry__Move(e) {
  this._dart_coreimpl_element = e;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0004);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0004);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel_num **************
$inherits(_DoubleLinkedQueueEntrySentinel_num, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_num() {
  DoubleLinkedQueueEntry_num.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel__Move **************
$inherits(_DoubleLinkedQueueEntrySentinel__Move, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel__Move() {
  DoubleLinkedQueueEntry__Move.call(this, null);
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
DoubleLinkedQueue.prototype.removeFirst = function() {
  return this._sentinel._next.remove();
}
DoubleLinkedQueue.prototype.first = function() {
  return this._sentinel._next.get$element();
}
DoubleLinkedQueue.prototype.get$first = function() {
  return this.first.bind(this);
}
DoubleLinkedQueue.prototype.last = function() {
  return this._sentinel._previous.get$element();
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.firstEntry = function() {
  return this._sentinel.nextEntry();
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
    f(entry._dart_coreimpl_element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.some = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._dart_coreimpl_element)) return true;
    entry = nextEntry;
  }
  return false;
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._dart_coreimpl_element)) other.addLast(entry._dart_coreimpl_element);
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
DoubleLinkedQueue.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
// ********** Code for DoubleLinkedQueue_num **************
$inherits(DoubleLinkedQueue_num, DoubleLinkedQueue);
function DoubleLinkedQueue_num() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_num();
}
DoubleLinkedQueue_num.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue_num.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
DoubleLinkedQueue_num.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
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
DoubleLinkedQueue_KeyValuePair.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
// ********** Code for DoubleLinkedQueue__Move **************
$inherits(DoubleLinkedQueue__Move, DoubleLinkedQueue);
function DoubleLinkedQueue__Move() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel__Move();
}
DoubleLinkedQueue__Move.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue__Move.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
DoubleLinkedQueue__Move.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
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
    $throw(const$0001);
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
StringImplementation.prototype.endsWith = function(other) {
    'use strict';
    if (other.length > this.length) return false;
    return other == this.substring(this.length - other.length);
}
StringImplementation.prototype.startsWith = function(other) {
    'use strict';
    if (other.length > this.length) return false;
    return other == this.substring(0, other.length);
}
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.contains = function(pattern, startIndex) {
  'use strict'; return this.indexOf(pattern, startIndex) >= 0;
}
StringImplementation.prototype._replaceFirst = function(from, to) {
  'use strict';return this.replace(from, to);
}
StringImplementation.prototype._replaceRegExp = function(from, to) {
  'use strict';return this.replace(from.re, to);
}
StringImplementation.prototype.replaceFirst = function(from, to) {
  if ((typeof(from) == 'string')) return this._replaceFirst(from, to);
  if (!!(from && from.is$RegExp())) return this._replaceRegExp(from, to);
  var $$list = from.allMatches(this);
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var match = $$i.next();
    return $add($add(this.substring((0), match.start$0()), to), this.substring(match.end$0()));
  }
}
StringImplementation.prototype._replaceAll = function(from, to) {
  'use strict';
  from = new RegExp(from.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g');
  to = to.replace(/\$/g, '$$$$'); // Escape sequences are fun!
  return this.replace(from, to);
}
StringImplementation.prototype.replaceAll = function(from, to) {
  if ((typeof(from) == 'string')) return this._replaceAll(from, to);
  if (!!(from && from.is$RegExp())) return this._replaceRegExp(from.get$dynamic().get$_global(), to);
  var buffer = new StringBufferImpl("");
  var lastMatchEnd = (0);
  var $$list = from.allMatches(this);
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var match = $$i.next();
    buffer.add$1(this.substring(lastMatchEnd, match.start$0()));
    buffer.add$1(to);
    lastMatchEnd = match.end$0();
  }
  buffer.add$1(this.substring(lastMatchEnd));
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
StringImplementation.prototype.contains$1 = StringImplementation.prototype.contains;
// ********** Code for Collections **************
function Collections() {}
Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
Collections.some = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) return true;
  }
  return false;
}
Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for DateImplementation **************
DateImplementation.now$ctor = function() {
  this.timeZone = new TimeZoneImplementation.local$ctor();
  this.value = DateImplementation._now();
  this._asJs();
}
DateImplementation.now$ctor.prototype = DateImplementation.prototype;
DateImplementation.withTimeZone$ctor = function(years, month, day, hours, minutes, seconds, milliseconds, timeZone) {
  this.timeZone = timeZone;
  this.value = DateImplementation._valueFromDecomposed(years, month, day, hours, minutes, seconds, milliseconds, timeZone.isUtc);
  this._asJs();
}
DateImplementation.withTimeZone$ctor.prototype = DateImplementation.prototype;
DateImplementation.fromEpoch$ctor = function(value, timeZone) {
  this.timeZone = timeZone;
  this.value = value;
}
DateImplementation.fromEpoch$ctor.prototype = DateImplementation.prototype;
function DateImplementation() {}
DateImplementation.DateImplementation$factory = function(years, month, day, hours, minutes, seconds, milliseconds) {
  return new DateImplementation.withTimeZone$ctor(years, month, day, hours, minutes, seconds, milliseconds, new TimeZoneImplementation.local$ctor());
}
DateImplementation.prototype.get$value = function() { return this.value; };
DateImplementation.prototype.get$timeZone = function() { return this.timeZone; };
DateImplementation.prototype.$eq = function(other) {
  if (!((other instanceof DateImplementation))) return false;
  return (this.value == other.get$value()) && ($eq(this.timeZone, other.get$timeZone()));
}
DateImplementation.prototype.get$year = function() {
  return this.isUtc ? this._asJs().getUTCFullYear() :
      this._asJs().getFullYear();
}
DateImplementation.prototype.get$month = function() {
  return this.isUtc ? this._asJs().getMonth() + 1 :
        this._asJs().getMonth() + 1;
}
DateImplementation.prototype.get$day = function() {
  return this.isUtc ? this._asJs().getUTCDate() : this._asJs().getDate()
}
DateImplementation.prototype.get$hours = function() {
  return this.isUtc ? this._asJs().getUTCHours() : this._asJs().getHours()
}
DateImplementation.prototype.get$minutes = function() {
  return this.isUtc ? this._asJs().getUTCMinutes() : this._asJs().getMinutes()
}
DateImplementation.prototype.get$seconds = function() {
  return this.isUtc ? this._asJs().getUTCSeconds() : this._asJs().getSeconds()
}
DateImplementation.prototype.get$milliseconds = function() {
  return this.isUtc ? this._asJs().getUTCMilliseconds() :
      this._asJs().getMilliseconds();
}
DateImplementation.prototype.isUtc = function() {
  return this.timeZone.isUtc;
}
DateImplementation.prototype.get$isUtc = function() {
  return this.isUtc.bind(this);
}
DateImplementation.prototype.toString = function() {
  function threeDigits(n) {
    if (n >= (100)) return ("" + n);
    if (n > (10)) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  var m = twoDigits(this.get$month());
  var d = twoDigits(this.get$day());
  var h = twoDigits(this.get$hours());
  var min = twoDigits(this.get$minutes());
  var sec = twoDigits(this.get$seconds());
  var ms = threeDigits(this.get$milliseconds());
  if (this.timeZone.isUtc) {
    return ("" + this.get$year() + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms + "Z");
  }
  else {
    return ("" + this.get$year() + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms);
  }
}
DateImplementation.prototype.add = function(duration) {
  return new DateImplementation.fromEpoch$ctor(this.value + duration.inMilliseconds, this.timeZone);
}
DateImplementation.prototype.difference = function(other) {
  return new DurationImplementation((0), (0), (0), (0), this.value - other.value);
}
DateImplementation._valueFromDecomposed = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  var jsMonth = month - 1;
    var value = isUtc ?
      Date.UTC(years, jsMonth, day,
               hours, minutes, seconds, milliseconds) :
      new Date(years, jsMonth, day,
               hours, minutes, seconds, milliseconds).valueOf();
    if (isNaN(value)) throw Error("Invalid Date");
    return value;
}
DateImplementation._now = function() {
  return new Date().valueOf();
}
DateImplementation.prototype._asJs = function() {
    if (!this.date) {
      this.date = new Date(this.value);
    }
    return this.date;
}
DateImplementation.prototype.add$1 = DateImplementation.prototype.add;
// ********** Code for TimeZoneImplementation **************
TimeZoneImplementation.local$ctor = function() {
  this.isUtc = false;
}
TimeZoneImplementation.local$ctor.prototype = TimeZoneImplementation.prototype;
function TimeZoneImplementation() {}
TimeZoneImplementation.prototype.$eq = function(other) {
  if (!((other instanceof TimeZoneImplementation))) return false;
  return $eq(this.isUtc, other.get$isUtc());
}
TimeZoneImplementation.prototype.toString = function() {
  if (this.isUtc) return "TimeZone (UTC)";
  return "TimeZone (Local)";
}
TimeZoneImplementation.prototype.get$isUtc = function() { return this.isUtc; };
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
$dynamic("get$id").Worker = function() {
  return this.id;
}
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
$dynamic("removeEventListener$3").EventTarget = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("removeEventListener$3")) {
    return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.removeEventListener$3.call(this, $0, $1, $2);
};
// ********** Code for _AbstractWorkerJs **************
$dynamic("addEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _ArrayBufferJs **************
// ********** Code for _ArrayBufferViewJs **************
// ********** Code for _NodeJs **************
$dynamic("get$attributes").Node = function() { return this.attributes; };
$dynamic("get$childNodes").Node = function() { return this.childNodes; };
$dynamic("get$firstChild").Node = function() { return this.firstChild; };
$dynamic("get$lastChild").Node = function() { return this.lastChild; };
$dynamic("get$ownerDocument").Node = function() { return this.ownerDocument; };
$dynamic("get$parentNode").Node = function() { return this.parentNode; };
$dynamic("get$textContent").Node = function() { return this.textContent; };
$dynamic("set$textContent").Node = function(value) { return this.textContent = value; };
$dynamic("addEventListener$3").Node = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("contains$1").Node = function($0) {
  return this.contains($0);
};
$dynamic("removeEventListener$3").Node = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _AttrJs **************
$dynamic("get$name").Attr = function() { return this.name; };
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
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
// ********** Code for _AudioGainJs **************
// ********** Code for _AudioGainNodeJs **************
// ********** Code for _AudioListenerJs **************
// ********** Code for _AudioPannerNodeJs **************
// ********** Code for _EventJs **************
$dynamic("get$target").Event = function() { return this.target; };
$dynamic("get$timeStamp").Event = function() { return this.timeStamp; };
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
// ********** Code for _CSSMediaRuleJs **************
// ********** Code for _CSSPageRuleJs **************
$dynamic("get$style").CSSPageRule = function() { return this.style; };
// ********** Code for _CSSValueJs **************
// ********** Code for _CSSPrimitiveValueJs **************
// ********** Code for _CSSRuleListJs **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
$dynamic("item$1").CSSRuleList = function($0) {
  return this.item($0);
};
// ********** Code for _CSSStyleDeclarationJs **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("item$1").CSSStyleDeclaration = function($0) {
  return this.item($0);
};
// ********** Code for _CSSStyleRuleJs **************
$dynamic("get$style").CSSStyleRule = function() { return this.style; };
// ********** Code for _StyleSheetJs **************
$dynamic("get$title").StyleSheet = function() { return this.title; };
$dynamic("get$type").StyleSheet = function() { return this.type; };
// ********** Code for _CSSStyleSheetJs **************
// ********** Code for _CSSUnknownRuleJs **************
// ********** Code for _CSSValueListJs **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
$dynamic("item$1").CSSValueList = function($0) {
  return this.item($0);
};
// ********** Code for _CanvasGradientJs **************
// ********** Code for _CanvasPatternJs **************
// ********** Code for _CanvasPixelArrayJs **************
$dynamic("is$List").CanvasPixelArray = function(){return true};
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
$dynamic("some").CanvasPixelArray = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").CanvasPixelArray = function() {
  return this.length == (0);
}
$dynamic("sort").CanvasPixelArray = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").CanvasPixelArray = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").CanvasPixelArray = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").CanvasPixelArray = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").CanvasPixelArray = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").CanvasPixelArray = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _CanvasRenderingContextJs **************
// ********** Code for _CanvasRenderingContext2DJs **************
$dynamic("set$font").CanvasRenderingContext2D = function(value) { return this.font = value; };
// ********** Code for _ClientRectJs **************
$dynamic("get$height").ClientRect = function() { return this.height; };
$dynamic("get$width").ClientRect = function() { return this.width; };
// ********** Code for _ClientRectListJs **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
$dynamic("item$1").ClientRectList = function($0) {
  return this.item($0);
};
// ********** Code for _ClipboardJs **************
// ********** Code for _CloseEventJs **************
// ********** Code for _CommentJs **************
// ********** Code for _UIEventJs **************
$dynamic("get$keyCode").UIEvent = function() { return this.keyCode; };
$dynamic("get$pageX").UIEvent = function() { return this.pageX; };
$dynamic("get$pageY").UIEvent = function() { return this.pageY; };
$dynamic("get$view").UIEvent = function() { return this.view; };
// ********** Code for _CompositionEventJs **************
// ********** Code for _ConsoleJs **************
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
_ConsoleJs.get$timeStamp = function() {
  return this.timeStamp.bind(this);
}
_ConsoleJs.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
_ConsoleJs.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
_ConsoleJs.group$1 = _ConsoleJs.group;
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
$dynamic("removeEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _DOMExceptionJs **************
$dynamic("get$name").DOMException = function() { return this.name; };
// ********** Code for _DOMFileSystemJs **************
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
// ********** Code for _DOMFileSystemSyncJs **************
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
// ********** Code for _DOMFormDataJs **************
// ********** Code for _DOMImplementationJs **************
// ********** Code for _DOMMimeTypeJs **************
$dynamic("get$type").DOMMimeType = function() { return this.type; };
// ********** Code for _DOMMimeTypeArrayJs **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
$dynamic("item$1").DOMMimeTypeArray = function($0) {
  return this.item($0);
};
// ********** Code for _DOMParserJs **************
// ********** Code for _DOMPluginJs **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
$dynamic("item$1").DOMPlugin = function($0) {
  return this.item($0);
};
// ********** Code for _DOMPluginArrayJs **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
$dynamic("item$1").DOMPluginArray = function($0) {
  return this.item($0);
};
// ********** Code for _DOMSelectionJs **************
$dynamic("get$type").DOMSelection = function() { return this.type; };
// ********** Code for _DOMTokenListJs **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("contains$1").DOMTokenList = function($0) {
  return this.contains($0);
};
$dynamic("item$1").DOMTokenList = function($0) {
  return this.item($0);
};
// ********** Code for _DOMSettableTokenListJs **************
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for _DOMURLJs **************
// ********** Code for _DOMWindowJs **************
$dynamic("get$applicationCache").DOMWindow = function() { return this.applicationCache; };
$dynamic("get$console").DOMWindow = function() { return this.console; };
$dynamic("get$history").DOMWindow = function() { return this.history; };
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$location").DOMWindow = function() { return this.location; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
$dynamic("get$navigator").DOMWindow = function() { return this.navigator; };
$dynamic("get$screen").DOMWindow = function() { return this.screen; };
$dynamic("get$status").DOMWindow = function() { return this.status; };
$dynamic("get$blur").DOMWindow = function() {
  return this.blur.bind(this);
}
$dynamic("get$focus").DOMWindow = function() {
  return this.focus.bind(this);
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
$dynamic("removeEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("setInterval$2").DOMWindow = function($0, $1) {
  return this.setInterval($wrap_call$0(to$call$0($0)), $1);
};
$dynamic("setTimeout$2").DOMWindow = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
};
$dynamic("webkitRequestAnimationFrame$2").DOMWindow = function($0, $1) {
  return this.webkitRequestAnimationFrame($wrap_call$1(to$call$1($0)), $1);
};
// ********** Code for _DataTransferItemJs **************
$dynamic("get$type").DataTransferItem = function() { return this.type; };
// ********** Code for _DataTransferItemListJs **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("add$2").DataTransferItemList = function($0, $1) {
  return this.add($0, $1);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
$dynamic("item$1").DataTransferItemList = function($0) {
  return this.item($0);
};
// ********** Code for _DataViewJs **************
// ********** Code for _DatabaseJs **************
// ********** Code for _DatabaseSyncJs **************
// ********** Code for _WorkerContextJs **************
$dynamic("get$location").WorkerContext = function() { return this.location; };
$dynamic("get$navigator").WorkerContext = function() { return this.navigator; };
$dynamic("addEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("setInterval$2").WorkerContext = function($0, $1) {
  return this.setInterval($wrap_call$0(to$call$0($0)), $1);
};
$dynamic("setTimeout$2").WorkerContext = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
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
$dynamic("get$name").Entry = function() { return this.name; };
// ********** Code for _DirectoryEntryJs **************
// ********** Code for _EntrySyncJs **************
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
// ********** Code for _DirectoryEntrySyncJs **************
// ********** Code for _DirectoryReaderJs **************
// ********** Code for _DirectoryReaderSyncJs **************
// ********** Code for _DocumentJs **************
$dynamic("get$body").Document = function() { return this.body; };
$dynamic("get$documentElement").Document = function() { return this.documentElement; };
$dynamic("get$location").Document = function() { return this.location; };
$dynamic("get$readyState").Document = function() { return this.readyState; };
$dynamic("get$title").Document = function() { return this.title; };
// ********** Code for _DocumentFragmentJs **************
// ********** Code for _DocumentTypeJs **************
$dynamic("get$name").DocumentType = function() { return this.name; };
// ********** Code for _DynamicsCompressorNodeJs **************
// ********** Code for _ElementJs **************
$dynamic("get$childElementCount").Element = function() { return this.childElementCount; };
$dynamic("get$firstElementChild").Element = function() { return this.firstElementChild; };
$dynamic("get$lastElementChild").Element = function() { return this.lastElementChild; };
$dynamic("get$nextElementSibling").Element = function() { return this.nextElementSibling; };
$dynamic("get$previousElementSibling").Element = function() { return this.previousElementSibling; };
$dynamic("get$style").Element = function() { return this.style; };
$dynamic("get$blur").Element = function() {
  return this.blur.bind(this);
}
$dynamic("get$focus").Element = function() {
  return this.focus.bind(this);
}
// ********** Code for _ElementTimeControlJs **************
// ********** Code for _ElementTraversalJs **************
$dynamic("get$childElementCount").ElementTraversal = function() { return this.childElementCount; };
$dynamic("get$firstElementChild").ElementTraversal = function() { return this.firstElementChild; };
$dynamic("get$lastElementChild").ElementTraversal = function() { return this.lastElementChild; };
$dynamic("get$nextElementSibling").ElementTraversal = function() { return this.nextElementSibling; };
$dynamic("get$previousElementSibling").ElementTraversal = function() { return this.previousElementSibling; };
// ********** Code for _EntityJs **************
// ********** Code for _EntityReferenceJs **************
// ********** Code for _EntryArrayJs **************
$dynamic("get$length").EntryArray = function() { return this.length; };
$dynamic("item$1").EntryArray = function($0) {
  return this.item($0);
};
// ********** Code for _EntryArraySyncJs **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
$dynamic("item$1").EntryArraySync = function($0) {
  return this.item($0);
};
// ********** Code for _ErrorEventJs **************
// ********** Code for _EventExceptionJs **************
$dynamic("get$name").EventException = function() { return this.name; };
// ********** Code for _EventSourceJs **************
$dynamic("get$readyState").EventSource = function() { return this.readyState; };
$dynamic("addEventListener$3").EventSource = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").EventSource = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _FileJs **************
$dynamic("get$name").File = function() { return this.name; };
// ********** Code for _FileEntryJs **************
// ********** Code for _FileEntrySyncJs **************
// ********** Code for _FileErrorJs **************
// ********** Code for _FileExceptionJs **************
$dynamic("get$name").FileException = function() { return this.name; };
// ********** Code for _FileListJs **************
$dynamic("get$length").FileList = function() { return this.length; };
$dynamic("item$1").FileList = function($0) {
  return this.item($0);
};
// ********** Code for _FileReaderJs **************
$dynamic("get$readyState").FileReader = function() { return this.readyState; };
$dynamic("addEventListener$3").FileReader = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").FileReader = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _FileReaderSyncJs **************
// ********** Code for _FileWriterJs **************
$dynamic("get$length").FileWriter = function() { return this.length; };
$dynamic("get$readyState").FileWriter = function() { return this.readyState; };
// ********** Code for _FileWriterSyncJs **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayJs **************
var _Float32ArrayJs = {};
$dynamic("is$List").Float32Array = function(){return true};
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
$dynamic("some").Float32Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Float32Array = function() {
  return this.length == (0);
}
$dynamic("sort").Float32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Float32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Float32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Float32Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Float32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Float64ArrayJs **************
var _Float64ArrayJs = {};
$dynamic("is$List").Float64Array = function(){return true};
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
$dynamic("some").Float64Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Float64Array = function() {
  return this.length == (0);
}
$dynamic("sort").Float64Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Float64Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float64Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Float64Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Float64Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Float64Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _GeolocationJs **************
// ********** Code for _GeopositionJs **************
// ********** Code for _HTMLAllCollectionJs **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
$dynamic("item$1").HTMLAllCollection = function($0) {
  return this.item($0);
};
// ********** Code for _HTMLElementJs **************
$dynamic("get$children").HTMLElement = function() { return this.children; };
$dynamic("get$className").HTMLElement = function() { return this.className; };
$dynamic("set$className").HTMLElement = function(value) { return this.className = value; };
$dynamic("get$id").HTMLElement = function() { return this.id; };
$dynamic("set$innerHTML").HTMLElement = function(value) { return this.innerHTML = value; };
$dynamic("set$tabIndex").HTMLElement = function(value) { return this.tabIndex = value; };
$dynamic("get$title").HTMLElement = function() { return this.title; };
$dynamic("get$click").HTMLElement = function() {
  return this.click.bind(this);
}
// ********** Code for _HTMLAnchorElementJs **************
$dynamic("get$hash").HTMLAnchorElement = function() { return this.hash; };
$dynamic("get$host").HTMLAnchorElement = function() { return this.host; };
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
$dynamic("get$protocol").HTMLAnchorElement = function() { return this.protocol; };
$dynamic("get$target").HTMLAnchorElement = function() { return this.target; };
$dynamic("set$target").HTMLAnchorElement = function(value) { return this.target = value; };
$dynamic("get$text").HTMLAnchorElement = function() { return this.text; };
$dynamic("get$type").HTMLAnchorElement = function() { return this.type; };
// ********** Code for _HTMLAppletElementJs **************
$dynamic("get$height").HTMLAppletElement = function() { return this.height; };
$dynamic("set$height").HTMLAppletElement = function(value) { return this.height = value; };
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
$dynamic("get$width").HTMLAppletElement = function() { return this.width; };
$dynamic("set$width").HTMLAppletElement = function(value) { return this.width = value; };
// ********** Code for _HTMLAreaElementJs **************
$dynamic("get$hash").HTMLAreaElement = function() { return this.hash; };
$dynamic("get$host").HTMLAreaElement = function() { return this.host; };
$dynamic("get$protocol").HTMLAreaElement = function() { return this.protocol; };
$dynamic("get$target").HTMLAreaElement = function() { return this.target; };
$dynamic("set$target").HTMLAreaElement = function(value) { return this.target = value; };
// ********** Code for _HTMLMediaElementJs **************
$dynamic("get$readyState").HTMLMediaElement = function() { return this.readyState; };
$dynamic("get$load").HTMLMediaElement = function() {
  return this.load.bind(this);
}
// ********** Code for _HTMLAudioElementJs **************
// ********** Code for _HTMLBRElementJs **************
// ********** Code for _HTMLBaseElementJs **************
$dynamic("get$target").HTMLBaseElement = function() { return this.target; };
$dynamic("set$target").HTMLBaseElement = function(value) { return this.target = value; };
// ********** Code for _HTMLBaseFontElementJs **************
// ********** Code for _HTMLBodyElementJs **************
$dynamic("get$text").HTMLBodyElement = function() { return this.text; };
$dynamic("set$text").HTMLBodyElement = function(value) { return this.text = value; };
// ********** Code for _HTMLButtonElementJs **************
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$type").HTMLButtonElement = function() { return this.type; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
// ********** Code for _HTMLCanvasElementJs **************
$dynamic("get$height").HTMLCanvasElement = function() { return this.height; };
$dynamic("set$height").HTMLCanvasElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLCanvasElement = function() { return this.width; };
$dynamic("set$width").HTMLCanvasElement = function(value) { return this.width = value; };
// ********** Code for _HTMLCollectionJs **************
$dynamic("is$List").HTMLCollection = function(){return true};
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
$dynamic("some").HTMLCollection = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").HTMLCollection = function() {
  return this.get$length() == (0);
}
$dynamic("sort").HTMLCollection = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").HTMLCollection = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
$dynamic("last").HTMLCollection = function() {
  return this.$index(this.get$length() - (1));
}
$dynamic("getRange").HTMLCollection = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").HTMLCollection = function($0) {
  return this.item($0);
};
$dynamic("some$1").HTMLCollection = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").HTMLCollection = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _HTMLContentElementJs **************
// ********** Code for _HTMLDListElementJs **************
// ********** Code for _HTMLDetailsElementJs **************
// ********** Code for _HTMLDirectoryElementJs **************
// ********** Code for _HTMLDivElementJs **************
// ********** Code for _HTMLDocumentJs **************
$dynamic("get$activeElement").HTMLDocument = function() { return this.activeElement; };
$dynamic("clear$0").HTMLDocument = function() {
  return this.clear();
};
// ********** Code for _HTMLEmbedElementJs **************
$dynamic("get$height").HTMLEmbedElement = function() { return this.height; };
$dynamic("set$height").HTMLEmbedElement = function(value) { return this.height = value; };
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
$dynamic("get$type").HTMLEmbedElement = function() { return this.type; };
$dynamic("get$width").HTMLEmbedElement = function() { return this.width; };
$dynamic("set$width").HTMLEmbedElement = function(value) { return this.width = value; };
// ********** Code for _HTMLFieldSetElementJs **************
// ********** Code for _HTMLFontElementJs **************
// ********** Code for _HTMLFormElementJs **************
$dynamic("get$elements").HTMLFormElement = function() { return this.elements; };
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
$dynamic("get$target").HTMLFormElement = function() { return this.target; };
$dynamic("set$target").HTMLFormElement = function(value) { return this.target = value; };
// ********** Code for _HTMLFrameElementJs **************
$dynamic("get$height").HTMLFrameElement = function() { return this.height; };
$dynamic("get$location").HTMLFrameElement = function() { return this.location; };
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
$dynamic("get$width").HTMLFrameElement = function() { return this.width; };
// ********** Code for _HTMLFrameSetElementJs **************
// ********** Code for _HTMLHRElementJs **************
$dynamic("get$width").HTMLHRElement = function() { return this.width; };
$dynamic("set$width").HTMLHRElement = function(value) { return this.width = value; };
// ********** Code for _HTMLHeadElementJs **************
// ********** Code for _HTMLHeadingElementJs **************
// ********** Code for _HTMLHtmlElementJs **************
// ********** Code for _HTMLIFrameElementJs **************
$dynamic("get$height").HTMLIFrameElement = function() { return this.height; };
$dynamic("set$height").HTMLIFrameElement = function(value) { return this.height = value; };
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
$dynamic("get$width").HTMLIFrameElement = function() { return this.width; };
$dynamic("set$width").HTMLIFrameElement = function(value) { return this.width = value; };
// ********** Code for _HTMLImageElementJs **************
$dynamic("get$complete").HTMLImageElement = function() { return this.complete; };
$dynamic("get$height").HTMLImageElement = function() { return this.height; };
$dynamic("set$height").HTMLImageElement = function(value) { return this.height = value; };
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
$dynamic("get$width").HTMLImageElement = function() { return this.width; };
$dynamic("set$width").HTMLImageElement = function(value) { return this.width = value; };
$dynamic("get$x").HTMLImageElement = function() { return this.x; };
$dynamic("get$y").HTMLImageElement = function() { return this.y; };
// ********** Code for _HTMLInputElementJs **************
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$type").HTMLInputElement = function() { return this.type; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
// ********** Code for _HTMLKeygenElementJs **************
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
$dynamic("get$type").HTMLKeygenElement = function() { return this.type; };
// ********** Code for _HTMLLIElementJs **************
$dynamic("get$type").HTMLLIElement = function() { return this.type; };
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for _HTMLLabelElementJs **************
// ********** Code for _HTMLLegendElementJs **************
// ********** Code for _HTMLLinkElementJs **************
$dynamic("get$target").HTMLLinkElement = function() { return this.target; };
$dynamic("set$target").HTMLLinkElement = function(value) { return this.target = value; };
$dynamic("get$type").HTMLLinkElement = function() { return this.type; };
// ********** Code for _HTMLMapElementJs **************
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
// ********** Code for _HTMLMarqueeElementJs **************
$dynamic("get$height").HTMLMarqueeElement = function() { return this.height; };
$dynamic("set$height").HTMLMarqueeElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLMarqueeElement = function() { return this.width; };
$dynamic("set$width").HTMLMarqueeElement = function(value) { return this.width = value; };
$dynamic("get$start").HTMLMarqueeElement = function() {
  return this.start.bind(this);
}
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
// ********** Code for _HTMLMenuElementJs **************
// ********** Code for _HTMLMetaElementJs **************
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
// ********** Code for _HTMLMeterElementJs **************
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for _HTMLModElementJs **************
// ********** Code for _HTMLOListElementJs **************
$dynamic("get$start").HTMLOListElement = function() { return this.start; };
$dynamic("set$start").HTMLOListElement = function(value) { return this.start = value; };
$dynamic("get$type").HTMLOListElement = function() { return this.type; };
// ********** Code for _HTMLObjectElementJs **************
$dynamic("get$height").HTMLObjectElement = function() { return this.height; };
$dynamic("set$height").HTMLObjectElement = function(value) { return this.height = value; };
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
$dynamic("get$type").HTMLObjectElement = function() { return this.type; };
$dynamic("get$width").HTMLObjectElement = function() { return this.width; };
$dynamic("set$width").HTMLObjectElement = function(value) { return this.width = value; };
// ********** Code for _HTMLOptGroupElementJs **************
// ********** Code for _HTMLOptionElementJs **************
$dynamic("get$text").HTMLOptionElement = function() { return this.text; };
$dynamic("set$text").HTMLOptionElement = function(value) { return this.text = value; };
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for _HTMLOptionsCollectionJs **************
$dynamic("is$List").HTMLOptionsCollection = function(){return true};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
$dynamic("set$length").HTMLOptionsCollection = function(value) {
  this.length = value;
}
// ********** Code for _HTMLOutputElementJs **************
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$type").HTMLOutputElement = function() { return this.type; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for _HTMLParagraphElementJs **************
// ********** Code for _HTMLParamElementJs **************
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$type").HTMLParamElement = function() { return this.type; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for _HTMLPreElementJs **************
$dynamic("get$width").HTMLPreElement = function() { return this.width; };
$dynamic("set$width").HTMLPreElement = function(value) { return this.width = value; };
// ********** Code for _HTMLProgressElementJs **************
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for _HTMLQuoteElementJs **************
// ********** Code for _HTMLScriptElementJs **************
$dynamic("get$text").HTMLScriptElement = function() { return this.text; };
$dynamic("set$text").HTMLScriptElement = function(value) { return this.text = value; };
$dynamic("get$type").HTMLScriptElement = function() { return this.type; };
// ********** Code for _HTMLSelectElementJs **************
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$type").HTMLSelectElement = function() { return this.type; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
$dynamic("add$2").HTMLSelectElement = function($0, $1) {
  return this.add($0, $1);
};
$dynamic("item$1").HTMLSelectElement = function($0) {
  return this.item($0);
};
// ********** Code for _HTMLShadowElementJs **************
// ********** Code for _HTMLSourceElementJs **************
$dynamic("get$type").HTMLSourceElement = function() { return this.type; };
// ********** Code for _HTMLSpanElementJs **************
// ********** Code for _HTMLStyleElementJs **************
$dynamic("get$type").HTMLStyleElement = function() { return this.type; };
// ********** Code for _HTMLTableCaptionElementJs **************
// ********** Code for _HTMLTableCellElementJs **************
$dynamic("get$height").HTMLTableCellElement = function() { return this.height; };
$dynamic("set$height").HTMLTableCellElement = function(value) { return this.height = value; };
$dynamic("get$rowSpan").HTMLTableCellElement = function() { return this.rowSpan; };
$dynamic("get$width").HTMLTableCellElement = function() { return this.width; };
$dynamic("set$width").HTMLTableCellElement = function(value) { return this.width = value; };
// ********** Code for _HTMLTableColElementJs **************
$dynamic("get$width").HTMLTableColElement = function() { return this.width; };
$dynamic("set$width").HTMLTableColElement = function(value) { return this.width = value; };
// ********** Code for _HTMLTableElementJs **************
$dynamic("get$width").HTMLTableElement = function() { return this.width; };
$dynamic("set$width").HTMLTableElement = function(value) { return this.width = value; };
// ********** Code for _HTMLTableRowElementJs **************
// ********** Code for _HTMLTableSectionElementJs **************
// ********** Code for _HTMLTextAreaElementJs **************
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$type").HTMLTextAreaElement = function() { return this.type; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for _HTMLTitleElementJs **************
$dynamic("get$text").HTMLTitleElement = function() { return this.text; };
$dynamic("set$text").HTMLTitleElement = function(value) { return this.text = value; };
// ********** Code for _HTMLTrackElementJs **************
$dynamic("get$readyState").HTMLTrackElement = function() { return this.readyState; };
// ********** Code for _HTMLUListElementJs **************
$dynamic("get$type").HTMLUListElement = function() { return this.type; };
// ********** Code for _HTMLUnknownElementJs **************
// ********** Code for _HTMLVideoElementJs **************
$dynamic("get$height").HTMLVideoElement = function() { return this.height; };
$dynamic("set$height").HTMLVideoElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLVideoElement = function() { return this.width; };
$dynamic("set$width").HTMLVideoElement = function(value) { return this.width = value; };
// ********** Code for _HashChangeEventJs **************
// ********** Code for _HighPass2FilterNodeJs **************
// ********** Code for _HistoryJs **************
$dynamic("get$length").History = function() { return this.length; };
$dynamic("pushState$2").History = function($0, $1) {
  return this.pushState($0, $1);
};
$dynamic("replaceState$2").History = function($0, $1) {
  return this.replaceState($0, $1);
};
// ********** Code for _IDBAnyJs **************
// ********** Code for _IDBCursorJs **************
$dynamic("get$source").IDBCursor = function() { return this.source; };
// ********** Code for _IDBCursorWithValueJs **************
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
// ********** Code for _IDBDatabaseJs **************
$dynamic("get$name").IDBDatabase = function() { return this.name; };
$dynamic("addEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBDatabaseErrorJs **************
// ********** Code for _IDBDatabaseExceptionJs **************
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
// ********** Code for _IDBFactoryJs **************
// ********** Code for _IDBIndexJs **************
$dynamic("get$name").IDBIndex = function() { return this.name; };
// ********** Code for _IDBKeyJs **************
// ********** Code for _IDBKeyRangeJs **************
// ********** Code for _IDBObjectStoreJs **************
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("add$2").IDBObjectStore = function($0, $1) {
  return this.add($0, $1);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for _IDBRequestJs **************
$dynamic("get$readyState").IDBRequest = function() { return this.readyState; };
$dynamic("get$source").IDBRequest = function() { return this.source; };
$dynamic("addEventListener$3").IDBRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").IDBRequest = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBTransactionJs **************
$dynamic("addEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _IDBVersionChangeEventJs **************
// ********** Code for _IDBVersionChangeRequestJs **************
// ********** Code for _ImageDataJs **************
$dynamic("get$height").ImageData = function() { return this.height; };
$dynamic("get$width").ImageData = function() { return this.width; };
// ********** Code for _Int16ArrayJs **************
var _Int16ArrayJs = {};
$dynamic("is$List").Int16Array = function(){return true};
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
$dynamic("some").Int16Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Int16Array = function() {
  return this.length == (0);
}
$dynamic("sort").Int16Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Int16Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Int16Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int16Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Int32ArrayJs **************
var _Int32ArrayJs = {};
$dynamic("is$List").Int32Array = function(){return true};
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
$dynamic("some").Int32Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Int32Array = function() {
  return this.length == (0);
}
$dynamic("sort").Int32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Int32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Int32Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Int8ArrayJs **************
var _Int8ArrayJs = {};
$dynamic("is$List").Int8Array = function(){return true};
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
$dynamic("some").Int8Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Int8Array = function() {
  return this.length == (0);
}
$dynamic("sort").Int8Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Int8Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Int8Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int8Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _JavaScriptAudioNodeJs **************
// ********** Code for _JavaScriptCallFrameJs **************
$dynamic("get$column").JavaScriptCallFrame = function() { return this.column; };
$dynamic("get$type").JavaScriptCallFrame = function() { return this.type; };
// ********** Code for _KeyboardEventJs **************
// ********** Code for _MediaStreamJs **************
$dynamic("get$readyState").MediaStream = function() { return this.readyState; };
$dynamic("addEventListener$3").MediaStream = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").MediaStream = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _LocalMediaStreamJs **************
// ********** Code for _LocationJs **************
$dynamic("get$hash").Location = function() { return this.hash; };
$dynamic("get$host").Location = function() { return this.host; };
$dynamic("get$protocol").Location = function() { return this.protocol; };
// ********** Code for _LowPass2FilterNodeJs **************
// ********** Code for _MediaControllerJs **************
$dynamic("addEventListener$3").MediaController = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").MediaController = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _MediaElementAudioSourceNodeJs **************
// ********** Code for _MediaErrorJs **************
// ********** Code for _MediaListJs **************
$dynamic("is$List").MediaList = function(){return true};
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
$dynamic("some").MediaList = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").MediaList = function() {
  return this.length == (0);
}
$dynamic("sort").MediaList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").MediaList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").MediaList = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").MediaList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").MediaList = function($0) {
  return this.item($0);
};
$dynamic("some$1").MediaList = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").MediaList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _MediaQueryListJs **************
// ********** Code for _MediaQueryListListenerJs **************
// ********** Code for _MediaStreamEventJs **************
// ********** Code for _MediaStreamListJs **************
$dynamic("get$length").MediaStreamList = function() { return this.length; };
$dynamic("item$1").MediaStreamList = function($0) {
  return this.item($0);
};
// ********** Code for _MediaStreamTrackJs **************
// ********** Code for _MediaStreamTrackListJs **************
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
$dynamic("item$1").MediaStreamTrackList = function($0) {
  return this.item($0);
};
// ********** Code for _MemoryInfoJs **************
// ********** Code for _MessageChannelJs **************
// ********** Code for _MessageEventJs **************
$dynamic("get$source").MessageEvent = function() { return this.source; };
// ********** Code for _MessagePortJs **************
$dynamic("get$start").MessagePort = function() {
  return this.start.bind(this);
}
$dynamic("addEventListener$3").MessagePort = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("postMessage$1").MessagePort = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").MessagePort = function($0, $1) {
  return this.postMessage($0, $1);
};
$dynamic("removeEventListener$3").MessagePort = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
// ********** Code for _MetadataJs **************
// ********** Code for _MouseEventJs **************
$dynamic("get$clientX").MouseEvent = function() { return this.clientX; };
$dynamic("get$clientY").MouseEvent = function() { return this.clientY; };
$dynamic("get$x").MouseEvent = function() { return this.x; };
$dynamic("get$y").MouseEvent = function() { return this.y; };
// ********** Code for _MutationEventJs **************
// ********** Code for _NamedNodeMapJs **************
$dynamic("is$List").NamedNodeMap = function(){return true};
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
$dynamic("some").NamedNodeMap = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").NamedNodeMap = function() {
  return this.length == (0);
}
$dynamic("sort").NamedNodeMap = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").NamedNodeMap = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NamedNodeMap = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").NamedNodeMap = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").NamedNodeMap = function($0) {
  return this.item($0);
};
$dynamic("some$1").NamedNodeMap = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").NamedNodeMap = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _NavigatorJs **************
$dynamic("get$userAgent").Navigator = function() { return this.userAgent; };
// ********** Code for _NavigatorUserMediaErrorJs **************
// ********** Code for _NodeFilterJs **************
// ********** Code for _NodeIteratorJs **************
// ********** Code for _NodeListJs **************
$dynamic("is$List").NodeList = function(){return true};
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
$dynamic("some").NodeList = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").NodeList = function() {
  return this.length == (0);
}
$dynamic("sort").NodeList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").NodeList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").NodeList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").NodeList = function($0) {
  return this.item($0);
};
$dynamic("some$1").NodeList = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").NodeList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _NodeSelectorJs **************
// ********** Code for _NotationJs **************
// ********** Code for _NotificationJs **************
$dynamic("addEventListener$3").Notification = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").Notification = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _NotificationCenterJs **************
// ********** Code for _OESStandardDerivativesJs **************
// ********** Code for _OESTextureFloatJs **************
// ********** Code for _OESVertexArrayObjectJs **************
// ********** Code for _OfflineAudioCompletionEventJs **************
// ********** Code for _OperationNotAllowedExceptionJs **************
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
// ********** Code for _OverflowEventJs **************
// ********** Code for _PageTransitionEventJs **************
// ********** Code for _PeerConnectionJs **************
$dynamic("get$readyState").PeerConnection = function() { return this.readyState; };
$dynamic("addEventListener$3").PeerConnection = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").PeerConnection = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("send$1").PeerConnection = function($0) {
  return this.send($0);
};
// ********** Code for _PerformanceJs **************
// ********** Code for _PerformanceNavigationJs **************
$dynamic("get$type").PerformanceNavigation = function() { return this.type; };
// ********** Code for _PerformanceTimingJs **************
// ********** Code for _PopStateEventJs **************
// ********** Code for _PositionErrorJs **************
// ********** Code for _ProcessingInstructionJs **************
$dynamic("get$target").ProcessingInstruction = function() { return this.target; };
// ********** Code for _ProgressEventJs **************
// ********** Code for _RGBColorJs **************
// ********** Code for _RangeJs **************
// ********** Code for _RangeExceptionJs **************
$dynamic("get$name").RangeException = function() { return this.name; };
// ********** Code for _RealtimeAnalyserNodeJs **************
// ********** Code for _RectJs **************
// ********** Code for _SQLErrorJs **************
// ********** Code for _SQLExceptionJs **************
// ********** Code for _SQLResultSetJs **************
// ********** Code for _SQLResultSetRowListJs **************
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
$dynamic("item$1").SQLResultSetRowList = function($0) {
  return this.item($0);
};
// ********** Code for _SQLTransactionJs **************
// ********** Code for _SQLTransactionSyncJs **************
// ********** Code for _SVGElementJs **************
$dynamic("get$id").SVGElement = function() { return this.id; };
// ********** Code for _SVGAElementJs **************
$dynamic("get$target").SVGAElement = function() { return this.target; };
$dynamic("get$className").SVGAElement = function() { return this.className; };
// ********** Code for _SVGAltGlyphDefElementJs **************
// ********** Code for _SVGTextContentElementJs **************
$dynamic("get$className").SVGTextContentElement = function() { return this.className; };
// ********** Code for _SVGTextPositioningElementJs **************
$dynamic("get$x").SVGTextPositioningElement = function() { return this.x; };
$dynamic("get$y").SVGTextPositioningElement = function() { return this.y; };
// ********** Code for _SVGAltGlyphElementJs **************
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
$dynamic("get$baseVal").SVGAnimatedAngle = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedBooleanJs **************
$dynamic("get$baseVal").SVGAnimatedBoolean = function() { return this.baseVal; };
$dynamic("set$baseVal").SVGAnimatedBoolean = function(value) { return this.baseVal = value; };
// ********** Code for _SVGAnimatedEnumerationJs **************
$dynamic("get$baseVal").SVGAnimatedEnumeration = function() { return this.baseVal; };
$dynamic("set$baseVal").SVGAnimatedEnumeration = function(value) { return this.baseVal = value; };
// ********** Code for _SVGAnimatedIntegerJs **************
$dynamic("get$baseVal").SVGAnimatedInteger = function() { return this.baseVal; };
$dynamic("set$baseVal").SVGAnimatedInteger = function(value) { return this.baseVal = value; };
// ********** Code for _SVGAnimatedLengthJs **************
$dynamic("get$baseVal").SVGAnimatedLength = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedLengthListJs **************
$dynamic("get$baseVal").SVGAnimatedLengthList = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedNumberJs **************
$dynamic("get$baseVal").SVGAnimatedNumber = function() { return this.baseVal; };
$dynamic("set$baseVal").SVGAnimatedNumber = function(value) { return this.baseVal = value; };
// ********** Code for _SVGAnimatedNumberListJs **************
$dynamic("get$baseVal").SVGAnimatedNumberList = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedPreserveAspectRatioJs **************
$dynamic("get$baseVal").SVGAnimatedPreserveAspectRatio = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedRectJs **************
$dynamic("get$baseVal").SVGAnimatedRect = function() { return this.baseVal; };
// ********** Code for _SVGAnimatedStringJs **************
$dynamic("get$baseVal").SVGAnimatedString = function() { return this.baseVal; };
$dynamic("set$baseVal").SVGAnimatedString = function(value) { return this.baseVal = value; };
// ********** Code for _SVGAnimatedTransformListJs **************
$dynamic("get$baseVal").SVGAnimatedTransformList = function() { return this.baseVal; };
// ********** Code for _SVGCircleElementJs **************
$dynamic("get$className").SVGCircleElement = function() { return this.className; };
// ********** Code for _SVGClipPathElementJs **************
$dynamic("get$className").SVGClipPathElement = function() { return this.className; };
// ********** Code for _SVGColorJs **************
// ********** Code for _SVGComponentTransferFunctionElementJs **************
$dynamic("get$offset").SVGComponentTransferFunctionElement = function() { return this.offset; };
$dynamic("get$type").SVGComponentTransferFunctionElement = function() { return this.type; };
// ********** Code for _SVGCursorElementJs **************
$dynamic("get$x").SVGCursorElement = function() { return this.x; };
$dynamic("get$y").SVGCursorElement = function() { return this.y; };
// ********** Code for _SVGDefsElementJs **************
$dynamic("get$className").SVGDefsElement = function() { return this.className; };
// ********** Code for _SVGDescElementJs **************
$dynamic("get$className").SVGDescElement = function() { return this.className; };
// ********** Code for _SVGDocumentJs **************
// ********** Code for _SVGElementInstanceJs **************
$dynamic("get$childNodes").SVGElementInstance = function() { return this.childNodes; };
$dynamic("get$firstChild").SVGElementInstance = function() { return this.firstChild; };
$dynamic("get$lastChild").SVGElementInstance = function() { return this.lastChild; };
$dynamic("get$parentNode").SVGElementInstance = function() { return this.parentNode; };
$dynamic("addEventListener$3").SVGElementInstance = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").SVGElementInstance = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _SVGElementInstanceListJs **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
$dynamic("item$1").SVGElementInstanceList = function($0) {
  return this.item($0);
};
// ********** Code for _SVGEllipseElementJs **************
$dynamic("get$className").SVGEllipseElement = function() { return this.className; };
// ********** Code for _SVGExceptionJs **************
$dynamic("get$name").SVGException = function() { return this.name; };
// ********** Code for _SVGExternalResourcesRequiredJs **************
// ********** Code for _SVGFEBlendElementJs **************
$dynamic("get$height").SVGFEBlendElement = function() { return this.height; };
$dynamic("get$width").SVGFEBlendElement = function() { return this.width; };
$dynamic("get$x").SVGFEBlendElement = function() { return this.x; };
$dynamic("get$y").SVGFEBlendElement = function() { return this.y; };
$dynamic("get$className").SVGFEBlendElement = function() { return this.className; };
// ********** Code for _SVGFEColorMatrixElementJs **************
$dynamic("get$type").SVGFEColorMatrixElement = function() { return this.type; };
$dynamic("get$height").SVGFEColorMatrixElement = function() { return this.height; };
$dynamic("get$width").SVGFEColorMatrixElement = function() { return this.width; };
$dynamic("get$x").SVGFEColorMatrixElement = function() { return this.x; };
$dynamic("get$y").SVGFEColorMatrixElement = function() { return this.y; };
$dynamic("get$className").SVGFEColorMatrixElement = function() { return this.className; };
// ********** Code for _SVGFEComponentTransferElementJs **************
$dynamic("get$height").SVGFEComponentTransferElement = function() { return this.height; };
$dynamic("get$width").SVGFEComponentTransferElement = function() { return this.width; };
$dynamic("get$x").SVGFEComponentTransferElement = function() { return this.x; };
$dynamic("get$y").SVGFEComponentTransferElement = function() { return this.y; };
$dynamic("get$className").SVGFEComponentTransferElement = function() { return this.className; };
// ********** Code for _SVGFECompositeElementJs **************
$dynamic("get$height").SVGFECompositeElement = function() { return this.height; };
$dynamic("get$width").SVGFECompositeElement = function() { return this.width; };
$dynamic("get$x").SVGFECompositeElement = function() { return this.x; };
$dynamic("get$y").SVGFECompositeElement = function() { return this.y; };
$dynamic("get$className").SVGFECompositeElement = function() { return this.className; };
// ********** Code for _SVGFEConvolveMatrixElementJs **************
$dynamic("get$height").SVGFEConvolveMatrixElement = function() { return this.height; };
$dynamic("get$width").SVGFEConvolveMatrixElement = function() { return this.width; };
$dynamic("get$x").SVGFEConvolveMatrixElement = function() { return this.x; };
$dynamic("get$y").SVGFEConvolveMatrixElement = function() { return this.y; };
$dynamic("get$className").SVGFEConvolveMatrixElement = function() { return this.className; };
// ********** Code for _SVGFEDiffuseLightingElementJs **************
$dynamic("get$height").SVGFEDiffuseLightingElement = function() { return this.height; };
$dynamic("get$width").SVGFEDiffuseLightingElement = function() { return this.width; };
$dynamic("get$x").SVGFEDiffuseLightingElement = function() { return this.x; };
$dynamic("get$y").SVGFEDiffuseLightingElement = function() { return this.y; };
$dynamic("get$className").SVGFEDiffuseLightingElement = function() { return this.className; };
// ********** Code for _SVGFEDisplacementMapElementJs **************
$dynamic("get$height").SVGFEDisplacementMapElement = function() { return this.height; };
$dynamic("get$width").SVGFEDisplacementMapElement = function() { return this.width; };
$dynamic("get$x").SVGFEDisplacementMapElement = function() { return this.x; };
$dynamic("get$y").SVGFEDisplacementMapElement = function() { return this.y; };
$dynamic("get$className").SVGFEDisplacementMapElement = function() { return this.className; };
// ********** Code for _SVGFEDistantLightElementJs **************
// ********** Code for _SVGFEDropShadowElementJs **************
$dynamic("get$height").SVGFEDropShadowElement = function() { return this.height; };
$dynamic("get$width").SVGFEDropShadowElement = function() { return this.width; };
$dynamic("get$x").SVGFEDropShadowElement = function() { return this.x; };
$dynamic("get$y").SVGFEDropShadowElement = function() { return this.y; };
$dynamic("get$className").SVGFEDropShadowElement = function() { return this.className; };
// ********** Code for _SVGFEFloodElementJs **************
$dynamic("get$height").SVGFEFloodElement = function() { return this.height; };
$dynamic("get$width").SVGFEFloodElement = function() { return this.width; };
$dynamic("get$x").SVGFEFloodElement = function() { return this.x; };
$dynamic("get$y").SVGFEFloodElement = function() { return this.y; };
$dynamic("get$className").SVGFEFloodElement = function() { return this.className; };
// ********** Code for _SVGFEFuncAElementJs **************
// ********** Code for _SVGFEFuncBElementJs **************
// ********** Code for _SVGFEFuncGElementJs **************
// ********** Code for _SVGFEFuncRElementJs **************
// ********** Code for _SVGFEGaussianBlurElementJs **************
$dynamic("get$height").SVGFEGaussianBlurElement = function() { return this.height; };
$dynamic("get$width").SVGFEGaussianBlurElement = function() { return this.width; };
$dynamic("get$x").SVGFEGaussianBlurElement = function() { return this.x; };
$dynamic("get$y").SVGFEGaussianBlurElement = function() { return this.y; };
$dynamic("get$className").SVGFEGaussianBlurElement = function() { return this.className; };
// ********** Code for _SVGFEImageElementJs **************
$dynamic("get$height").SVGFEImageElement = function() { return this.height; };
$dynamic("get$width").SVGFEImageElement = function() { return this.width; };
$dynamic("get$x").SVGFEImageElement = function() { return this.x; };
$dynamic("get$y").SVGFEImageElement = function() { return this.y; };
$dynamic("get$className").SVGFEImageElement = function() { return this.className; };
// ********** Code for _SVGFEMergeElementJs **************
$dynamic("get$height").SVGFEMergeElement = function() { return this.height; };
$dynamic("get$width").SVGFEMergeElement = function() { return this.width; };
$dynamic("get$x").SVGFEMergeElement = function() { return this.x; };
$dynamic("get$y").SVGFEMergeElement = function() { return this.y; };
$dynamic("get$className").SVGFEMergeElement = function() { return this.className; };
// ********** Code for _SVGFEMergeNodeElementJs **************
// ********** Code for _SVGFEMorphologyElementJs **************
$dynamic("get$height").SVGFEMorphologyElement = function() { return this.height; };
$dynamic("get$width").SVGFEMorphologyElement = function() { return this.width; };
$dynamic("get$x").SVGFEMorphologyElement = function() { return this.x; };
$dynamic("get$y").SVGFEMorphologyElement = function() { return this.y; };
$dynamic("get$className").SVGFEMorphologyElement = function() { return this.className; };
// ********** Code for _SVGFEOffsetElementJs **************
$dynamic("get$height").SVGFEOffsetElement = function() { return this.height; };
$dynamic("get$width").SVGFEOffsetElement = function() { return this.width; };
$dynamic("get$x").SVGFEOffsetElement = function() { return this.x; };
$dynamic("get$y").SVGFEOffsetElement = function() { return this.y; };
$dynamic("get$className").SVGFEOffsetElement = function() { return this.className; };
// ********** Code for _SVGFEPointLightElementJs **************
$dynamic("get$x").SVGFEPointLightElement = function() { return this.x; };
$dynamic("get$y").SVGFEPointLightElement = function() { return this.y; };
// ********** Code for _SVGFESpecularLightingElementJs **************
$dynamic("get$height").SVGFESpecularLightingElement = function() { return this.height; };
$dynamic("get$width").SVGFESpecularLightingElement = function() { return this.width; };
$dynamic("get$x").SVGFESpecularLightingElement = function() { return this.x; };
$dynamic("get$y").SVGFESpecularLightingElement = function() { return this.y; };
$dynamic("get$className").SVGFESpecularLightingElement = function() { return this.className; };
// ********** Code for _SVGFESpotLightElementJs **************
$dynamic("get$x").SVGFESpotLightElement = function() { return this.x; };
$dynamic("get$y").SVGFESpotLightElement = function() { return this.y; };
// ********** Code for _SVGFETileElementJs **************
$dynamic("get$height").SVGFETileElement = function() { return this.height; };
$dynamic("get$width").SVGFETileElement = function() { return this.width; };
$dynamic("get$x").SVGFETileElement = function() { return this.x; };
$dynamic("get$y").SVGFETileElement = function() { return this.y; };
$dynamic("get$className").SVGFETileElement = function() { return this.className; };
// ********** Code for _SVGFETurbulenceElementJs **************
$dynamic("get$type").SVGFETurbulenceElement = function() { return this.type; };
$dynamic("get$height").SVGFETurbulenceElement = function() { return this.height; };
$dynamic("get$width").SVGFETurbulenceElement = function() { return this.width; };
$dynamic("get$x").SVGFETurbulenceElement = function() { return this.x; };
$dynamic("get$y").SVGFETurbulenceElement = function() { return this.y; };
$dynamic("get$className").SVGFETurbulenceElement = function() { return this.className; };
// ********** Code for _SVGFilterElementJs **************
$dynamic("get$height").SVGFilterElement = function() { return this.height; };
$dynamic("get$width").SVGFilterElement = function() { return this.width; };
$dynamic("get$x").SVGFilterElement = function() { return this.x; };
$dynamic("get$y").SVGFilterElement = function() { return this.y; };
$dynamic("get$className").SVGFilterElement = function() { return this.className; };
// ********** Code for _SVGStylableJs **************
$dynamic("get$className").SVGStylable = function() { return this.className; };
$dynamic("get$style").SVGStylable = function() { return this.style; };
// ********** Code for _SVGFilterPrimitiveStandardAttributesJs **************
$dynamic("get$height").SVGFilterPrimitiveStandardAttributes = function() { return this.height; };
$dynamic("get$width").SVGFilterPrimitiveStandardAttributes = function() { return this.width; };
$dynamic("get$x").SVGFilterPrimitiveStandardAttributes = function() { return this.x; };
$dynamic("get$y").SVGFilterPrimitiveStandardAttributes = function() { return this.y; };
// ********** Code for _SVGFitToViewBoxJs **************
// ********** Code for _SVGFontElementJs **************
// ********** Code for _SVGFontFaceElementJs **************
// ********** Code for _SVGFontFaceFormatElementJs **************
// ********** Code for _SVGFontFaceNameElementJs **************
// ********** Code for _SVGFontFaceSrcElementJs **************
// ********** Code for _SVGFontFaceUriElementJs **************
// ********** Code for _SVGForeignObjectElementJs **************
$dynamic("get$height").SVGForeignObjectElement = function() { return this.height; };
$dynamic("get$width").SVGForeignObjectElement = function() { return this.width; };
$dynamic("get$x").SVGForeignObjectElement = function() { return this.x; };
$dynamic("get$y").SVGForeignObjectElement = function() { return this.y; };
$dynamic("get$className").SVGForeignObjectElement = function() { return this.className; };
// ********** Code for _SVGGElementJs **************
$dynamic("get$className").SVGGElement = function() { return this.className; };
// ********** Code for _SVGGlyphElementJs **************
// ********** Code for _SVGGlyphRefElementJs **************
$dynamic("get$x").SVGGlyphRefElement = function() { return this.x; };
$dynamic("get$y").SVGGlyphRefElement = function() { return this.y; };
$dynamic("get$className").SVGGlyphRefElement = function() { return this.className; };
// ********** Code for _SVGGradientElementJs **************
$dynamic("get$className").SVGGradientElement = function() { return this.className; };
// ********** Code for _SVGHKernElementJs **************
// ********** Code for _SVGImageElementJs **************
$dynamic("get$height").SVGImageElement = function() { return this.height; };
$dynamic("get$width").SVGImageElement = function() { return this.width; };
$dynamic("get$x").SVGImageElement = function() { return this.x; };
$dynamic("get$y").SVGImageElement = function() { return this.y; };
$dynamic("get$className").SVGImageElement = function() { return this.className; };
// ********** Code for _SVGLangSpaceJs **************
// ********** Code for _SVGLengthJs **************
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
// ********** Code for _SVGLengthListJs **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for _SVGLineElementJs **************
$dynamic("get$className").SVGLineElement = function() { return this.className; };
// ********** Code for _SVGLinearGradientElementJs **************
// ********** Code for _SVGLocatableJs **************
// ********** Code for _SVGMPathElementJs **************
// ********** Code for _SVGMarkerElementJs **************
$dynamic("get$className").SVGMarkerElement = function() { return this.className; };
// ********** Code for _SVGMaskElementJs **************
$dynamic("get$height").SVGMaskElement = function() { return this.height; };
$dynamic("get$width").SVGMaskElement = function() { return this.width; };
$dynamic("get$x").SVGMaskElement = function() { return this.x; };
$dynamic("get$y").SVGMaskElement = function() { return this.y; };
$dynamic("get$className").SVGMaskElement = function() { return this.className; };
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
$dynamic("get$className").SVGPathElement = function() { return this.className; };
// ********** Code for _SVGPathSegJs **************
// ********** Code for _SVGPathSegArcAbsJs **************
$dynamic("get$x").SVGPathSegArcAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegArcAbs = function() { return this.y; };
// ********** Code for _SVGPathSegArcRelJs **************
$dynamic("get$x").SVGPathSegArcRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegArcRel = function() { return this.y; };
// ********** Code for _SVGPathSegClosePathJs **************
// ********** Code for _SVGPathSegCurvetoCubicAbsJs **************
$dynamic("get$x").SVGPathSegCurvetoCubicAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoCubicAbs = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoCubicRelJs **************
$dynamic("get$x").SVGPathSegCurvetoCubicRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoCubicRel = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsJs **************
$dynamic("get$x").SVGPathSegCurvetoCubicSmoothAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoCubicSmoothAbs = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelJs **************
$dynamic("get$x").SVGPathSegCurvetoCubicSmoothRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoCubicSmoothRel = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoQuadraticAbsJs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoQuadraticAbs = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoQuadraticRelJs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoQuadraticRel = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsJs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticSmoothAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoQuadraticSmoothAbs = function() { return this.y; };
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelJs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticSmoothRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegCurvetoQuadraticSmoothRel = function() { return this.y; };
// ********** Code for _SVGPathSegLinetoAbsJs **************
$dynamic("get$x").SVGPathSegLinetoAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegLinetoAbs = function() { return this.y; };
// ********** Code for _SVGPathSegLinetoHorizontalAbsJs **************
$dynamic("get$x").SVGPathSegLinetoHorizontalAbs = function() { return this.x; };
// ********** Code for _SVGPathSegLinetoHorizontalRelJs **************
$dynamic("get$x").SVGPathSegLinetoHorizontalRel = function() { return this.x; };
// ********** Code for _SVGPathSegLinetoRelJs **************
$dynamic("get$x").SVGPathSegLinetoRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegLinetoRel = function() { return this.y; };
// ********** Code for _SVGPathSegLinetoVerticalAbsJs **************
$dynamic("get$y").SVGPathSegLinetoVerticalAbs = function() { return this.y; };
// ********** Code for _SVGPathSegLinetoVerticalRelJs **************
$dynamic("get$y").SVGPathSegLinetoVerticalRel = function() { return this.y; };
// ********** Code for _SVGPathSegListJs **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsJs **************
$dynamic("get$x").SVGPathSegMovetoAbs = function() { return this.x; };
$dynamic("get$y").SVGPathSegMovetoAbs = function() { return this.y; };
// ********** Code for _SVGPathSegMovetoRelJs **************
$dynamic("get$x").SVGPathSegMovetoRel = function() { return this.x; };
$dynamic("get$y").SVGPathSegMovetoRel = function() { return this.y; };
// ********** Code for _SVGPatternElementJs **************
$dynamic("get$height").SVGPatternElement = function() { return this.height; };
$dynamic("get$width").SVGPatternElement = function() { return this.width; };
$dynamic("get$x").SVGPatternElement = function() { return this.x; };
$dynamic("get$y").SVGPatternElement = function() { return this.y; };
$dynamic("get$className").SVGPatternElement = function() { return this.className; };
// ********** Code for _SVGPointJs **************
$dynamic("get$x").SVGPoint = function() { return this.x; };
$dynamic("get$y").SVGPoint = function() { return this.y; };
// ********** Code for _SVGPointListJs **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementJs **************
$dynamic("get$className").SVGPolygonElement = function() { return this.className; };
// ********** Code for _SVGPolylineElementJs **************
$dynamic("get$className").SVGPolylineElement = function() { return this.className; };
// ********** Code for _SVGPreserveAspectRatioJs **************
// ********** Code for _SVGRadialGradientElementJs **************
// ********** Code for _SVGRectJs **************
$dynamic("get$height").SVGRect = function() { return this.height; };
$dynamic("set$height").SVGRect = function(value) { return this.height = value; };
$dynamic("get$width").SVGRect = function() { return this.width; };
$dynamic("set$width").SVGRect = function(value) { return this.width = value; };
$dynamic("get$x").SVGRect = function() { return this.x; };
$dynamic("get$y").SVGRect = function() { return this.y; };
// ********** Code for _SVGRectElementJs **************
$dynamic("get$height").SVGRectElement = function() { return this.height; };
$dynamic("get$width").SVGRectElement = function() { return this.width; };
$dynamic("get$x").SVGRectElement = function() { return this.x; };
$dynamic("get$y").SVGRectElement = function() { return this.y; };
$dynamic("get$className").SVGRectElement = function() { return this.className; };
// ********** Code for _SVGRenderingIntentJs **************
// ********** Code for _SVGSVGElementJs **************
$dynamic("get$height").SVGSVGElement = function() { return this.height; };
$dynamic("get$width").SVGSVGElement = function() { return this.width; };
$dynamic("get$x").SVGSVGElement = function() { return this.x; };
$dynamic("get$y").SVGSVGElement = function() { return this.y; };
$dynamic("get$className").SVGSVGElement = function() { return this.className; };
// ********** Code for _SVGScriptElementJs **************
$dynamic("get$type").SVGScriptElement = function() { return this.type; };
// ********** Code for _SVGSetElementJs **************
// ********** Code for _SVGStopElementJs **************
$dynamic("get$offset").SVGStopElement = function() { return this.offset; };
$dynamic("get$className").SVGStopElement = function() { return this.className; };
// ********** Code for _SVGStringListJs **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementJs **************
$dynamic("get$title").SVGStyleElement = function() { return this.title; };
$dynamic("get$type").SVGStyleElement = function() { return this.type; };
// ********** Code for _SVGSwitchElementJs **************
$dynamic("get$className").SVGSwitchElement = function() { return this.className; };
// ********** Code for _SVGSymbolElementJs **************
$dynamic("get$className").SVGSymbolElement = function() { return this.className; };
// ********** Code for _SVGTRefElementJs **************
// ********** Code for _SVGTSpanElementJs **************
// ********** Code for _SVGTestsJs **************
// ********** Code for _SVGTextElementJs **************
// ********** Code for _SVGTextPathElementJs **************
// ********** Code for _SVGTitleElementJs **************
$dynamic("get$className").SVGTitleElement = function() { return this.className; };
// ********** Code for _SVGTransformJs **************
$dynamic("get$type").SVGTransform = function() { return this.type; };
// ********** Code for _SVGTransformListJs **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for _SVGTransformableJs **************
// ********** Code for _SVGURIReferenceJs **************
// ********** Code for _SVGUnitTypesJs **************
// ********** Code for _SVGUseElementJs **************
$dynamic("get$height").SVGUseElement = function() { return this.height; };
$dynamic("get$width").SVGUseElement = function() { return this.width; };
$dynamic("get$x").SVGUseElement = function() { return this.x; };
$dynamic("get$y").SVGUseElement = function() { return this.y; };
$dynamic("get$className").SVGUseElement = function() { return this.className; };
// ********** Code for _SVGVKernElementJs **************
// ********** Code for _SVGViewElementJs **************
// ********** Code for _SVGZoomAndPanJs **************
// ********** Code for _SVGViewSpecJs **************
// ********** Code for _SVGZoomEventJs **************
// ********** Code for _ScreenJs **************
$dynamic("get$height").Screen = function() { return this.height; };
$dynamic("get$width").Screen = function() { return this.width; };
// ********** Code for _ScriptProfileJs **************
$dynamic("get$title").ScriptProfile = function() { return this.title; };
// ********** Code for _ScriptProfileNodeJs **************
$dynamic("get$children").ScriptProfileNode = function() { return this.children; };
// ********** Code for _ShadowRootJs **************
$dynamic("get$host").ShadowRoot = function() { return this.host; };
// ********** Code for _SharedWorkerJs **************
// ********** Code for _SharedWorkerContextJs **************
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
// ********** Code for _SpeechInputEventJs **************
// ********** Code for _SpeechInputResultJs **************
// ********** Code for _SpeechInputResultListJs **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
$dynamic("item$1").SpeechInputResultList = function($0) {
  return this.item($0);
};
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
$dynamic("is$List").StyleSheetList = function(){return true};
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
$dynamic("some").StyleSheetList = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").StyleSheetList = function() {
  return this.length == (0);
}
$dynamic("sort").StyleSheetList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").StyleSheetList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").StyleSheetList = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").StyleSheetList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").StyleSheetList = function($0) {
  return this.item($0);
};
$dynamic("some$1").StyleSheetList = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").StyleSheetList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _TextEventJs **************
// ********** Code for _TextMetricsJs **************
$dynamic("get$width").TextMetrics = function() { return this.width; };
// ********** Code for _TextTrackJs **************
$dynamic("addEventListener$3").TextTrack = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").TextTrack = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TextTrackCueJs **************
$dynamic("get$id").TextTrackCue = function() { return this.id; };
$dynamic("get$text").TextTrackCue = function() { return this.text; };
$dynamic("set$text").TextTrackCue = function(value) { return this.text = value; };
$dynamic("addEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TextTrackCueListJs **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
$dynamic("item$1").TextTrackCueList = function($0) {
  return this.item($0);
};
// ********** Code for _TextTrackListJs **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
$dynamic("addEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("item$1").TextTrackList = function($0) {
  return this.item($0);
};
$dynamic("removeEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _TimeRangesJs **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
$dynamic("get$end").TimeRanges = function() {
  return this.end.bind(this);
}
$dynamic("get$start").TimeRanges = function() {
  return this.start.bind(this);
}
// ********** Code for _TouchJs **************
$dynamic("get$clientX").Touch = function() { return this.clientX; };
$dynamic("get$clientY").Touch = function() { return this.clientY; };
$dynamic("get$pageX").Touch = function() { return this.pageX; };
$dynamic("get$pageY").Touch = function() { return this.pageY; };
$dynamic("get$target").Touch = function() { return this.target; };
// ********** Code for _TouchEventJs **************
$dynamic("get$changedTouches").TouchEvent = function() { return this.changedTouches; };
$dynamic("get$touches").TouchEvent = function() { return this.touches; };
// ********** Code for _TouchListJs **************
$dynamic("is$List").TouchList = function(){return true};
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
$dynamic("some").TouchList = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").TouchList = function() {
  return this.length == (0);
}
$dynamic("sort").TouchList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").TouchList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").TouchList = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").TouchList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("item$1").TouchList = function($0) {
  return this.item($0);
};
$dynamic("some$1").TouchList = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").TouchList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _TrackEventJs **************
// ********** Code for _TreeWalkerJs **************
$dynamic("get$firstChild").TreeWalker = function() {
  return this.firstChild.bind(this);
}
$dynamic("get$lastChild").TreeWalker = function() {
  return this.lastChild.bind(this);
}
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
// ********** Code for _Uint16ArrayJs **************
var _Uint16ArrayJs = {};
$dynamic("is$List").Uint16Array = function(){return true};
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
$dynamic("some").Uint16Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Uint16Array = function() {
  return this.length == (0);
}
$dynamic("sort").Uint16Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Uint16Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Uint16Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint16Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Uint32ArrayJs **************
var _Uint32ArrayJs = {};
$dynamic("is$List").Uint32Array = function(){return true};
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
$dynamic("some").Uint32Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Uint32Array = function() {
  return this.length == (0);
}
$dynamic("sort").Uint32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Uint32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Uint32Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Uint8ArrayJs **************
var _Uint8ArrayJs = {};
$dynamic("is$List").Uint8Array = function(){return true};
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
$dynamic("some").Uint8Array = function(f) {
  return dom__Collections.some(this, f);
}
$dynamic("isEmpty").Uint8Array = function() {
  return this.length == (0);
}
$dynamic("sort").Uint8Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("getRange").Uint8Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
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
$dynamic("some$1").Uint8Array = function($0) {
  return this.some($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint8Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
// ********** Code for _Uint8ClampedArrayJs **************
var _Uint8ClampedArrayJs = {};
$dynamic("is$List").Uint8ClampedArray = function(){return true};
// ********** Code for _ValidityStateJs **************
// ********** Code for _WaveShaperNodeJs **************
// ********** Code for _WebGLActiveInfoJs **************
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
$dynamic("get$type").WebGLActiveInfo = function() { return this.type; };
// ********** Code for _WebGLBufferJs **************
// ********** Code for _WebGLCompressedTextureS3TCJs **************
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
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
// ********** Code for _WebKitAnimationEventJs **************
// ********** Code for _WebKitAnimationListJs **************
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
$dynamic("item$1").WebKitAnimationList = function($0) {
  return this.item($0);
};
// ********** Code for _WebKitBlobBuilderJs **************
// ********** Code for _WebKitCSSKeyframeRuleJs **************
$dynamic("get$style").WebKitCSSKeyframeRule = function() { return this.style; };
// ********** Code for _WebKitCSSKeyframesRuleJs **************
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
// ********** Code for _WebKitCSSMatrixJs **************
// ********** Code for _WebKitCSSRegionRuleJs **************
// ********** Code for _WebKitCSSTransformValueJs **************
// ********** Code for _WebKitNamedFlowJs **************
// ********** Code for _WebKitPointJs **************
$dynamic("get$x").WebKitPoint = function() { return this.x; };
$dynamic("get$y").WebKitPoint = function() { return this.y; };
// ********** Code for _WebKitTransitionEventJs **************
// ********** Code for _WebSocketJs **************
$dynamic("get$protocol").WebSocket = function() { return this.protocol; };
$dynamic("get$readyState").WebSocket = function() { return this.readyState; };
$dynamic("addEventListener$3").WebSocket = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").WebSocket = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("send$1").WebSocket = function($0) {
  return this.send($0);
};
// ********** Code for _WheelEventJs **************
$dynamic("get$clientX").WheelEvent = function() { return this.clientX; };
$dynamic("get$clientY").WheelEvent = function() { return this.clientY; };
$dynamic("get$wheelDeltaX").WheelEvent = function() { return this.wheelDeltaX; };
$dynamic("get$wheelDeltaY").WheelEvent = function() { return this.wheelDeltaY; };
$dynamic("get$x").WheelEvent = function() { return this.x; };
$dynamic("get$y").WheelEvent = function() { return this.y; };
// ********** Code for _WorkerJs **************
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").Worker = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for _WorkerLocationJs **************
$dynamic("get$hash").WorkerLocation = function() { return this.hash; };
$dynamic("get$host").WorkerLocation = function() { return this.host; };
$dynamic("get$protocol").WorkerLocation = function() { return this.protocol; };
// ********** Code for _WorkerNavigatorJs **************
$dynamic("get$userAgent").WorkerNavigator = function() { return this.userAgent; };
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
$dynamic("removeEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("send$0").XMLHttpRequest = function() {
  return this.send();
};
$dynamic("send$1").XMLHttpRequest = function($0) {
  return this.send($0);
};
// ********** Code for _XMLHttpRequestExceptionJs **************
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
// ********** Code for _XMLHttpRequestProgressEventJs **************
// ********** Code for _XMLHttpRequestUploadJs **************
$dynamic("addEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("removeEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for _XMLSerializerJs **************
// ********** Code for _XPathEvaluatorJs **************
// ********** Code for _XPathExceptionJs **************
$dynamic("get$name").XPathException = function() { return this.name; };
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
dom__Collections.some = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) return true;
  }
  return false;
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
_WebKitPointFactoryProvider.WebKitPoint$factory = function(x, y) {
  return new WebKitPoint(x, y);
}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
_XMLHttpRequestFactoryProvider.XMLHttpRequest$factory = function() {
  return new XMLHttpRequest();
}
// ********** Code for _XSLTProcessorFactoryProvider **************
function _XSLTProcessorFactoryProvider() {}
// ********** Code for dom__VariableSizeListIterator **************
function dom__VariableSizeListIterator() {}
dom__VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
dom__VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
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
_Lists.indexOf = function(a, element, startIndex, endIndex) {
  if (startIndex >= a.get$length()) {
    return (-1);
  }
  if (startIndex < (0)) {
    startIndex = (0);
  }
  for (var i = startIndex;
   i < endIndex; i++) {
    if ($eq(a.$index(i), element)) {
      return i;
    }
  }
  return (-1);
}
_Lists.getRange = function(a, start, length, accumulator) {
  if (length < (0)) $throw(new IllegalArgumentException("length"));
  if (start < (0)) $throw(new IndexOutOfRangeException(start));
  var end = start + length;
  if (end > a.get$length()) $throw(new IndexOutOfRangeException(end));
  for (var i = start;
   i < end; i++) {
    accumulator.add(a.$index(i));
  }
  return accumulator;
}
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
NodeWrappingImplementation.prototype.get$document = function() {
  return LevelDom.wrapDocument(this._ptr.get$ownerDocument());
}
NodeWrappingImplementation.prototype.get$parent = function() {
  return LevelDom.wrapNode(this._ptr.get$parentNode());
}
NodeWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$textContent();
}
NodeWrappingImplementation.prototype.set$text = function(value) {
  this._ptr.set$textContent(value);
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
NodeWrappingImplementation.prototype.contains = function(otherNode) {
  while (otherNode != null && $ne(otherNode, this)) {
    otherNode = otherNode.get$parent();
  }
  return $eq(otherNode, this);
}
NodeWrappingImplementation.prototype.contains$1 = NodeWrappingImplementation.prototype.contains;
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
  var match = const$0002.firstMatch(html);
  if (null != match) {
    tag = match.group$1((1)).toLowerCase();
    if (const$0005.containsKey(tag)) {
      parentTag = const$0005.$index(tag);
    }
  }
  var temp = get$document().createElement(parentTag);
  temp.set$innerHTML(html);
  var element;
  if (temp.get$childElementCount() == (1)) {
    element = LevelDom.wrapElement(temp.get$firstElementChild());
  }
  else if (parentTag == "html" && temp.get$childElementCount() == (2)) {
    element = LevelDom.wrapElement(temp.get$children().item$1(tag == "head" ? (0) : (1)));
  }
  else {
    $throw(new IllegalArgumentException($add(("HTML had " + temp.get$childElementCount() + " "), "top level elements but 1 expected")));
  }
  element.remove$0();
  return element;
}
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
ElementWrappingImplementation.prototype.get$attributes = function() {
  if (null == this._elementAttributeMap) {
    this._elementAttributeMap = new ElementAttributeMap._wrap$ctor(this._ptr);
  }
  return this._elementAttributeMap;
}
ElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new _ChildrenElementList._wrap$ctor(this._ptr);
  }
  return this._elements;
}
ElementWrappingImplementation.prototype.get$classes = function() {
  if (null == this._cssClassSet) {
    this._cssClassSet = new _CssClassSet(this._ptr);
  }
  return this._cssClassSet;
}
ElementWrappingImplementation.prototype.get$firstElementChild = function() {
  return LevelDom.wrapElement(this._ptr.get$firstElementChild());
}
ElementWrappingImplementation.prototype.get$id = function() {
  return this._ptr.get$id();
}
ElementWrappingImplementation.prototype.set$innerHTML = function(value) {
  this._ptr.set$innerHTML(value);
}
ElementWrappingImplementation.prototype.get$lastElementChild = function() {
  return LevelDom.wrapElement(this._ptr.get$lastElementChild());
}
ElementWrappingImplementation.prototype.get$nextElementSibling = function() {
  return LevelDom.wrapElement(this._ptr.get$nextElementSibling());
}
ElementWrappingImplementation.prototype.get$previousElementSibling = function() {
  return LevelDom.wrapElement(this._ptr.get$previousElementSibling());
}
ElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
ElementWrappingImplementation.prototype.set$tabIndex = function(value) {
  this._ptr.set$tabIndex(value);
}
ElementWrappingImplementation.prototype.get$title = function() {
  return this._ptr.get$title();
}
ElementWrappingImplementation.prototype.blur = function() {
  this._ptr.blur();
}
ElementWrappingImplementation.prototype.get$blur = function() {
  return this.blur.bind(this);
}
ElementWrappingImplementation.prototype.contains = function(element) {
  return this._ptr.contains$1(LevelDom.unwrap(element));
}
ElementWrappingImplementation.prototype.focus = function() {
  this._ptr.focus();
}
ElementWrappingImplementation.prototype.get$focus = function() {
  return this.focus.bind(this);
}
ElementWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
ElementWrappingImplementation.prototype.queryAll = function(selectors) {
  return new FrozenElementList._wrap$ctor(this._ptr.querySelectorAll(selectors));
}
ElementWrappingImplementation.prototype.get$rect = function() {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return new ElementRectWrappingImplementation($this._ptr);
  })
  , new CompleterImpl_ElementRect());
}
ElementWrappingImplementation.prototype.get$computedStyle = function() {
  return this.getComputedStyle("");
}
ElementWrappingImplementation.prototype.getComputedStyle = function(pseudoElement) {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return LevelDom.wrapCSSStyleDeclaration(get$window().getComputedStyle($this._ptr, pseudoElement));
  })
  , new CompleterImpl_html_CSSStyleDeclaration());
}
ElementWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
ElementWrappingImplementation.prototype.contains$1 = ElementWrappingImplementation.prototype.contains;
ElementWrappingImplementation.prototype.query$1 = ElementWrappingImplementation.prototype.query;
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
AnchorElementWrappingImplementation.prototype.get$hash = function() {
  return this._ptr.get$hash();
}
AnchorElementWrappingImplementation.prototype.get$host = function() {
  return this._ptr.get$host();
}
AnchorElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
AnchorElementWrappingImplementation.prototype.get$protocol = function() {
  return this._ptr.get$protocol();
}
AnchorElementWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
AnchorElementWrappingImplementation.prototype.set$target = function(value) {
  this._ptr.set$target(value);
}
AnchorElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
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
AreaElementWrappingImplementation.prototype.get$hash = function() {
  return this._ptr.get$hash();
}
AreaElementWrappingImplementation.prototype.get$host = function() {
  return this._ptr.get$host();
}
AreaElementWrappingImplementation.prototype.get$protocol = function() {
  return this._ptr.get$protocol();
}
AreaElementWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
AreaElementWrappingImplementation.prototype.set$target = function(value) {
  this._ptr.set$target(value);
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
MediaElementWrappingImplementation.prototype.load = function() {
  this._ptr.load();
  return;
}
MediaElementWrappingImplementation.prototype.get$load = function() {
  return this.load.bind(this);
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
EventWrappingImplementation.EventWrappingImplementation$factory = function(type, canBubble, cancelable) {
  var e = get$document().createEvent("Event");
  e.initEvent(type, canBubble, cancelable);
  return LevelDom.wrapEvent(e);
}
EventWrappingImplementation.prototype.get$target = function() {
  return LevelDom.wrapEventTarget(this._ptr.get$target());
}
EventWrappingImplementation.prototype.get$timeStamp = function() {
  return this._ptr.get$timeStamp();
}
EventWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
EventWrappingImplementation.prototype.preventDefault = function() {
  this._ptr.preventDefault();
  return;
}
EventWrappingImplementation.prototype.stopPropagation = function() {
  this._ptr.stopPropagation();
  return;
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
BaseElementWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
BaseElementWrappingImplementation.prototype.set$target = function(value) {
  this._ptr.set$target(value);
}
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ButtonElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
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
CanvasElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
CanvasElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
CanvasElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
CanvasElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
CanvasElementWrappingImplementation.prototype.getContext = function(contextId) {
  if (null == contextId) {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext$0());
  }
  else {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext(contextId));
  }
}
CanvasElementWrappingImplementation.prototype.getContext$0 = CanvasElementWrappingImplementation.prototype.getContext;
// ********** Code for CanvasRenderingContextWrappingImplementation **************
$inherits(CanvasRenderingContextWrappingImplementation, DOMWrapperBase);
CanvasRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasRenderingContextWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContextWrappingImplementation.prototype;
function CanvasRenderingContextWrappingImplementation() {}
// ********** Code for CanvasRenderingContext2DWrappingImplementation **************
$inherits(CanvasRenderingContext2DWrappingImplementation, CanvasRenderingContextWrappingImplementation);
CanvasRenderingContext2DWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasRenderingContext2DWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContext2DWrappingImplementation.prototype;
function CanvasRenderingContext2DWrappingImplementation() {}
CanvasRenderingContext2DWrappingImplementation.prototype.set$font = function(value) {
  this._ptr.set$font(value);
}
CanvasRenderingContext2DWrappingImplementation.prototype.measureText = function(text) {
  return LevelDom.wrapTextMetrics(this._ptr.measureText(text));
}
// ********** Code for CommentWrappingImplementation **************
$inherits(CommentWrappingImplementation, CharacterDataWrappingImplementation);
CommentWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
CommentWrappingImplementation._wrap$ctor.prototype = CommentWrappingImplementation.prototype;
function CommentWrappingImplementation() {}
// ********** Code for ConsoleWrappingImplementation **************
$inherits(ConsoleWrappingImplementation, DOMWrapperBase);
ConsoleWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ConsoleWrappingImplementation._wrap$ctor.prototype = ConsoleWrappingImplementation.prototype;
function ConsoleWrappingImplementation() {}
ConsoleWrappingImplementation.prototype.timeStamp = function() {
  this._ptr.timeStamp$0();
  return;
}
ConsoleWrappingImplementation.prototype.get$timeStamp = function() {
  return this.timeStamp.bind(this);
}
ConsoleWrappingImplementation.prototype.warn = function(arg) {
  this._ptr.warn(LevelDom.unwrapMaybePrimitive(arg));
  return;
}
ConsoleWrappingImplementation.prototype.timeStamp$0 = ConsoleWrappingImplementation.prototype.timeStamp;
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
DivElementWrappingImplementation.prototype.is$DivElement = function(){return true};
DivElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation.prototype.is$html_Element = function(){return true};
EmbedElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
EmbedElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
EmbedElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
EmbedElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
EmbedElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
EmbedElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
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
FormElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
FormElementWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
FormElementWrappingImplementation.prototype.set$target = function(value) {
  this._ptr.set$target(value);
}
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
HRElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
HRElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
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
// ********** Code for HistoryWrappingImplementation **************
$inherits(HistoryWrappingImplementation, DOMWrapperBase);
HistoryWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
HistoryWrappingImplementation._wrap$ctor.prototype = HistoryWrappingImplementation.prototype;
function HistoryWrappingImplementation() {}
HistoryWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
HistoryWrappingImplementation.prototype.back = function() {
  this._ptr.back();
  return;
}
HistoryWrappingImplementation.prototype.forward = function() {
  this._ptr.forward();
  return;
}
HistoryWrappingImplementation.prototype.pushState = function(data, title, url) {
  if (null == url) {
    this._ptr.pushState$2(LevelDom.unwrapMaybePrimitive(data), title);
    return;
  }
  else {
    this._ptr.pushState(LevelDom.unwrapMaybePrimitive(data), title, url);
    return;
  }
}
HistoryWrappingImplementation.prototype.replaceState = function(data, title, url) {
  if (null == url) {
    this._ptr.replaceState$2(LevelDom.unwrapMaybePrimitive(data), title);
    return;
  }
  else {
    this._ptr.replaceState(LevelDom.unwrapMaybePrimitive(data), title, url);
    return;
  }
}
HistoryWrappingImplementation.prototype.pushState$2 = HistoryWrappingImplementation.prototype.pushState;
HistoryWrappingImplementation.prototype.replaceState$2 = HistoryWrappingImplementation.prototype.replaceState;
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
IFrameElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
IFrameElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
IFrameElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
IFrameElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
IFrameElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ImageElementWrappingImplementation.prototype.get$complete = function() {
  return this._ptr.get$complete();
}
ImageElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ImageElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ImageElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
ImageElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
ImageElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
ImageElementWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
ImageElementWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
InputElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
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
KeygenElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
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
LinkElementWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
LinkElementWrappingImplementation.prototype.set$target = function(value) {
  this._ptr.set$target(value);
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
LocationWrappingImplementation.prototype.get$hash = function() {
  return this._ptr.get$hash();
}
LocationWrappingImplementation.prototype.get$host = function() {
  return this._ptr.get$host();
}
LocationWrappingImplementation.prototype.get$protocol = function() {
  return this._ptr.get$protocol();
}
LocationWrappingImplementation.prototype.reload = function() {
  this._ptr.reload();
  return;
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
MapElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
MarqueeElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
MarqueeElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
MarqueeElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
MarqueeElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
MarqueeElementWrappingImplementation.prototype.start = function() {
  this._ptr.start$0();
  return;
}
MarqueeElementWrappingImplementation.prototype.get$start = function() {
  return this.start.bind(this);
}
MarqueeElementWrappingImplementation.prototype.start$0 = MarqueeElementWrappingImplementation.prototype.start;
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
MetaElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
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
// ********** Code for NavigatorWrappingImplementation **************
$inherits(NavigatorWrappingImplementation, DOMWrapperBase);
NavigatorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
NavigatorWrappingImplementation._wrap$ctor.prototype = NavigatorWrappingImplementation.prototype;
function NavigatorWrappingImplementation() {}
NavigatorWrappingImplementation.prototype.get$userAgent = function() {
  return this._ptr.get$userAgent();
}
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
OListElementWrappingImplementation.prototype.get$start = function() {
  return this._ptr.get$start();
}
OListElementWrappingImplementation.prototype.set$start = function(value) {
  this._ptr.set$start(value);
}
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
OptionElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
OptionElementWrappingImplementation.prototype.set$text = function(value) {
  this._ptr.set$text(value);
}
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
OutputElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
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
ParamElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
ParamElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ParamElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
ParamElementWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for PointWrappingImplementation **************
$inherits(PointWrappingImplementation, DOMWrapperBase);
PointWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
PointWrappingImplementation._wrap$ctor.prototype = PointWrappingImplementation.prototype;
function PointWrappingImplementation() {}
PointWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
PointWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation.prototype.is$html_Element = function(){return true};
PreElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
PreElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ProcessingInstructionWrappingImplementation **************
$inherits(ProcessingInstructionWrappingImplementation, NodeWrappingImplementation);
ProcessingInstructionWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProcessingInstructionWrappingImplementation._wrap$ctor.prototype = ProcessingInstructionWrappingImplementation.prototype;
function ProcessingInstructionWrappingImplementation() {}
ProcessingInstructionWrappingImplementation.prototype.get$target = function() {
  return this._ptr.get$target();
}
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
SVGElementWrappingImplementation.prototype.get$classes = function() {
  if (null == this._cssClassSet) {
    this._cssClassSet = new _SVGClassSet(this._ptr);
  }
  return this._cssClassSet;
}
SVGElementWrappingImplementation.prototype.get$id = function() {
  return this._ptr.get$id();
}
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
SVGElementWrappingImplementation.prototype.set$innerHTML = function(svg) {
  var container = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
function SVGAElementWrappingImplementation() {}
SVGAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGAElementWrappingImplementation.prototype.get$target = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$target());
}
SVGAElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGTextContentElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGTextPositioningElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLengthList(this._ptr.get$x());
}
SVGTextPositioningElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLengthList(this._ptr.get$y());
}
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
function SVGAltGlyphElementWrappingImplementation() {}
SVGAltGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
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
SVGAnimatedEnumerationWrappingImplementation.prototype.get$baseVal = function() {
  return this._ptr.get$baseVal();
}
SVGAnimatedEnumerationWrappingImplementation.prototype.set$baseVal = function(value) {
  this._ptr.set$baseVal(value);
}
// ********** Code for SVGAnimatedLengthListWrappingImplementation **************
$inherits(SVGAnimatedLengthListWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthListWrappingImplementation.prototype;
function SVGAnimatedLengthListWrappingImplementation() {}
SVGAnimatedLengthListWrappingImplementation.prototype.get$baseVal = function() {
  return LevelDom.wrapSVGLengthList(this._ptr.get$baseVal());
}
// ********** Code for SVGAnimatedLengthWrappingImplementation **************
$inherits(SVGAnimatedLengthWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthWrappingImplementation.prototype;
function SVGAnimatedLengthWrappingImplementation() {}
SVGAnimatedLengthWrappingImplementation.prototype.get$baseVal = function() {
  return LevelDom.wrapSVGLength(this._ptr.get$baseVal());
}
// ********** Code for SVGAnimatedNumberWrappingImplementation **************
$inherits(SVGAnimatedNumberWrappingImplementation, DOMWrapperBase);
SVGAnimatedNumberWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedNumberWrappingImplementation._wrap$ctor.prototype = SVGAnimatedNumberWrappingImplementation.prototype;
function SVGAnimatedNumberWrappingImplementation() {}
SVGAnimatedNumberWrappingImplementation.prototype.get$baseVal = function() {
  return this._ptr.get$baseVal();
}
SVGAnimatedNumberWrappingImplementation.prototype.set$baseVal = function(value) {
  this._ptr.set$baseVal(value);
}
// ********** Code for SVGAnimatedStringWrappingImplementation **************
$inherits(SVGAnimatedStringWrappingImplementation, DOMWrapperBase);
SVGAnimatedStringWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedStringWrappingImplementation._wrap$ctor.prototype = SVGAnimatedStringWrappingImplementation.prototype;
function SVGAnimatedStringWrappingImplementation() {}
SVGAnimatedStringWrappingImplementation.prototype.get$baseVal = function() {
  return this._ptr.get$baseVal();
}
SVGAnimatedStringWrappingImplementation.prototype.set$baseVal = function(value) {
  this._ptr.set$baseVal(value);
}
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
function SVGCircleElementWrappingImplementation() {}
SVGCircleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGCircleElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGClipPathElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGComponentTransferFunctionElementWrappingImplementation.prototype.get$offset = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$offset());
}
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
SVGCursorElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGCursorElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
function SVGDefsElementWrappingImplementation() {}
SVGDefsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGDefsElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGDescElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
SVGDescElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGElementInstanceListWrappingImplementation **************
$inherits(SVGElementInstanceListWrappingImplementation, DOMWrapperBase);
SVGElementInstanceListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGElementInstanceListWrappingImplementation._wrap$ctor.prototype = SVGElementInstanceListWrappingImplementation.prototype;
function SVGElementInstanceListWrappingImplementation() {}
SVGElementInstanceListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SVGElementInstanceListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapSVGElementInstance(this._ptr.item$1(index));
}
SVGElementInstanceListWrappingImplementation.prototype.item$1 = SVGElementInstanceListWrappingImplementation.prototype.item;
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
function SVGEllipseElementWrappingImplementation() {}
SVGEllipseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGEllipseElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEBlendElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEBlendElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEBlendElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEBlendElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEBlendElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEColorMatrixElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGFEComponentTransferElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEDropShadowElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEFloodElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEFloodElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEFloodElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEFloodElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEFloodElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEImageElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEImageElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEImageElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEImageElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEImageElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGFEMergeElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEMergeElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEMergeElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEMergeElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEMergeElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEOffsetElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFEPointLightElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$x());
}
SVGFEPointLightElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$y());
}
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFESpecularLightingElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFESpotLightElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$x());
}
SVGFESpotLightElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$y());
}
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFETileElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFETileElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFETileElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFETileElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFETileElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGFETurbulenceElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGFilterElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFilterElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGFilterElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFilterElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGFilterElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGForeignObjectElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGGElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGGlyphRefElementWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
SVGGlyphRefElementWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
SVGGlyphRefElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGGradientElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGImageElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGImageElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGImageElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGImageElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGImageElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
SVGImageElementWrappingImplementation.prototype.get$style = function() {
  return LevelDom.wrapCSSStyleDeclaration(this._ptr.get$style());
}
// ********** Code for SVGLengthListWrappingImplementation **************
$inherits(SVGLengthListWrappingImplementation, DOMWrapperBase);
SVGLengthListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLengthListWrappingImplementation._wrap$ctor.prototype = SVGLengthListWrappingImplementation.prototype;
function SVGLengthListWrappingImplementation() {}
SVGLengthListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGLengthListWrappingImplementation.prototype.clear$0 = SVGLengthListWrappingImplementation.prototype.clear;
// ********** Code for SVGLengthWrappingImplementation **************
$inherits(SVGLengthWrappingImplementation, DOMWrapperBase);
SVGLengthWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLengthWrappingImplementation._wrap$ctor.prototype = SVGLengthWrappingImplementation.prototype;
function SVGLengthWrappingImplementation() {}
SVGLengthWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
SVGLengthWrappingImplementation.prototype.set$value = function(value) {
  this._ptr.set$value(value);
}
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
function SVGLineElementWrappingImplementation() {}
SVGLineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGLineElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
function SVGMarkerElementWrappingImplementation() {}
SVGMarkerElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGMarkerElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGMaskElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGMaskElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGMaskElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGMaskElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGMaskElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGPathElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGPatternElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGPatternElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGPatternElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGPatternElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGPatternElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
SVGPolygonElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGPolylineElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGRectElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGRectElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGRectElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGRectElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGRectElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGStopElementWrappingImplementation.prototype.get$offset = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$offset());
}
SVGStopElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGStyleElementWrappingImplementation.prototype.get$title = function() {
  return this._ptr.get$title();
}
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
SVGSwitchElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGSymbolElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
function SVGTitleElementWrappingImplementation() {}
SVGTitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGTitleElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
SVGUseElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGUseElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGUseElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGUseElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGUseElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
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
UIEventWrappingImplementation.prototype.get$pageX = function() {
  return this._ptr.get$pageX();
}
UIEventWrappingImplementation.prototype.get$pageY = function() {
  return this._ptr.get$pageY();
}
UIEventWrappingImplementation.prototype.get$view = function() {
  return LevelDom.wrapWindow(this._ptr.get$view());
}
// ********** Code for SVGZoomEventWrappingImplementation **************
$inherits(SVGZoomEventWrappingImplementation, UIEventWrappingImplementation);
SVGZoomEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGZoomEventWrappingImplementation._wrap$ctor.prototype = SVGZoomEventWrappingImplementation.prototype;
function SVGZoomEventWrappingImplementation() {}
// ********** Code for ScreenWrappingImplementation **************
$inherits(ScreenWrappingImplementation, DOMWrapperBase);
ScreenWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ScreenWrappingImplementation._wrap$ctor.prototype = ScreenWrappingImplementation.prototype;
function ScreenWrappingImplementation() {}
ScreenWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ScreenWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ScriptElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
ScriptElementWrappingImplementation.prototype.set$text = function(value) {
  this._ptr.set$text(value);
}
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
SelectElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
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
SelectElementWrappingImplementation.prototype.add = function(element, before) {
  this._ptr.add$2(LevelDom.unwrap(element), LevelDom.unwrap(before));
  return;
}
SelectElementWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapNode(this._ptr.item$1(index));
}
SelectElementWrappingImplementation.prototype.add$2 = SelectElementWrappingImplementation.prototype.add;
SelectElementWrappingImplementation.prototype.item$1 = SelectElementWrappingImplementation.prototype.item;
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
TableCellElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
TableCellElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
TableCellElementWrappingImplementation.prototype.get$rowSpan = function() {
  return this._ptr.get$rowSpan();
}
TableCellElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableCellElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TableColElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableColElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TableElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
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
TextAreaElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
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
// ********** Code for TextMetricsWrappingImplementation **************
$inherits(TextMetricsWrappingImplementation, DOMWrapperBase);
TextMetricsWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TextMetricsWrappingImplementation._wrap$ctor.prototype = TextMetricsWrappingImplementation.prototype;
function TextMetricsWrappingImplementation() {}
TextMetricsWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
function TitleElementWrappingImplementation() {}
TitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TitleElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
TitleElementWrappingImplementation.prototype.set$text = function(value) {
  this._ptr.set$text(value);
}
// ********** Code for TouchListWrappingImplementation **************
$inherits(TouchListWrappingImplementation, DOMWrapperBase);
TouchListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TouchListWrappingImplementation._wrap$ctor.prototype = TouchListWrappingImplementation.prototype;
function TouchListWrappingImplementation() {}
TouchListWrappingImplementation.prototype.is$List = function(){return true};
TouchListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
TouchListWrappingImplementation.prototype.$index = function(index) {
  return LevelDom.wrapTouch(this._ptr.$index(index));
}
TouchListWrappingImplementation.prototype.$setindex = function(index, value) {
  this._ptr.$setindex(index, LevelDom.unwrap(value));
}
TouchListWrappingImplementation.prototype.add = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
TouchListWrappingImplementation.prototype.addAll = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
TouchListWrappingImplementation.prototype.sort = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
TouchListWrappingImplementation.prototype.indexOf = function(element, start) {
  return Lists.indexOf(this, element, start, this.get$length());
}
TouchListWrappingImplementation.prototype.clear = function() {
  $throw(new UnsupportedOperationException("Cannot clear immutable List."));
}
TouchListWrappingImplementation.prototype.removeLast = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
TouchListWrappingImplementation.prototype.last = function() {
  return this.$index(this.get$length() - (1));
}
TouchListWrappingImplementation.prototype.forEach = function(f) {
  _Collections.forEach(this, f);
}
TouchListWrappingImplementation.prototype.filter = function(f) {
  return _Collections.filter(this, new Array(), f);
}
TouchListWrappingImplementation.prototype.some = function(f) {
  return _Collections.some(this, f);
}
TouchListWrappingImplementation.prototype.getRange = function(start, length) {
  $throw(new NotImplementedException());
}
TouchListWrappingImplementation.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
TouchListWrappingImplementation.prototype.iterator = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
TouchListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapTouch(this._ptr.item$1(index));
}
TouchListWrappingImplementation.prototype.add$1 = TouchListWrappingImplementation.prototype.add;
TouchListWrappingImplementation.prototype.clear$0 = TouchListWrappingImplementation.prototype.clear;
TouchListWrappingImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
TouchListWrappingImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
TouchListWrappingImplementation.prototype.item$1 = TouchListWrappingImplementation.prototype.item;
TouchListWrappingImplementation.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
TouchListWrappingImplementation.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for TouchWrappingImplementation **************
$inherits(TouchWrappingImplementation, DOMWrapperBase);
TouchWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TouchWrappingImplementation._wrap$ctor.prototype = TouchWrappingImplementation.prototype;
function TouchWrappingImplementation() {}
TouchWrappingImplementation.prototype.get$clientX = function() {
  return this._ptr.get$clientX();
}
TouchWrappingImplementation.prototype.get$clientY = function() {
  return this._ptr.get$clientY();
}
TouchWrappingImplementation.prototype.get$pageX = function() {
  return this._ptr.get$pageX();
}
TouchWrappingImplementation.prototype.get$pageY = function() {
  return this._ptr.get$pageY();
}
TouchWrappingImplementation.prototype.get$target = function() {
  return LevelDom.wrapEventTarget(this._ptr.get$target());
}
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
VideoElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
VideoElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
VideoElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
VideoElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for WebGLContextEventWrappingImplementation **************
$inherits(WebGLContextEventWrappingImplementation, EventWrappingImplementation);
WebGLContextEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLContextEventWrappingImplementation._wrap$ctor.prototype = WebGLContextEventWrappingImplementation.prototype;
function WebGLContextEventWrappingImplementation() {}
// ********** Code for WebGLRenderingContextWrappingImplementation **************
$inherits(WebGLRenderingContextWrappingImplementation, CanvasRenderingContextWrappingImplementation);
WebGLRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLRenderingContextWrappingImplementation._wrap$ctor.prototype = WebGLRenderingContextWrappingImplementation.prototype;
function WebGLRenderingContextWrappingImplementation() {}
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapCSSStyleDeclaration = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new CSSStyleDeclarationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapCanvasRenderingContext = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CanvasRenderingContext":

      return new CanvasRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext2D":

      return new CanvasRenderingContext2DWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderingContext":

      return new WebGLRenderingContextWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapConsole = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new ConsoleWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDOMApplicationCache = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new DOMApplicationCacheWrappingImplementation._wrap$ctor(raw);
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
LevelDom.wrapElementList = function(raw) {
  return null == raw ? null : new FrozenElementList._wrap$ctor(raw);
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
LevelDom.wrapEventTarget = function(raw) {
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

    case "DOMApplicationCache":

      return new DOMApplicationCacheWrappingImplementation._wrap$ctor(raw);

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

    case "EventSource":

      return new EventSourceWrappingImplementation._wrap$ctor(raw);

    case "EventTarget":

      return new EventTargetWrappingImplementation._wrap$ctor(raw);

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

    case "MessagePort":

      return new MessagePortWrappingImplementation._wrap$ctor(raw);

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

    case "Notification":

      return new NotificationWrappingImplementation._wrap$ctor(raw);

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

    case "SVGElementInstance":

      return new SVGElementInstanceWrappingImplementation._wrap$ctor(raw);

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

    case "SharedWorker":

      return new SharedWorkerWrappingImplementation._wrap$ctor(raw);

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

    case "WebSocket":

      return new WebSocketWrappingImplementation._wrap$ctor(raw);

    case "Window":

      return new WindowWrappingImplementation._wrap$ctor(raw);

    case "Worker":

      return new WorkerWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequest":

      return new XMLHttpRequestWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestUpload":

      return new XMLHttpRequestUploadWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapHistory = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new HistoryWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapLocation = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new LocationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapNavigator = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new NavigatorWrappingImplementation._wrap$ctor(raw);
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
LevelDom.wrapPoint = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new PointWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedEnumeration = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedEnumerationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedLength = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedLengthWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedLengthList = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedLengthListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedNumber = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedNumberWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedString = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedStringWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGElementInstance = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGElementInstanceWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGElementInstanceList = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGElementInstanceListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGLength = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGLengthWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGLengthList = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGLengthListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapScreen = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new ScreenWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapTextMetrics = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new TextMetricsWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapTouch = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new TouchWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapTouchList = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new TouchListWrappingImplementation._wrap$ctor(raw);
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
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
_Collections.some = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) return true;
  }
  return false;
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for PointFactoryProvider **************
function PointFactoryProvider() {}
PointFactoryProvider.Point$factory = function(x, y) {
  return new PointWrappingImplementation._wrap$ctor(_WebKitPointFactoryProvider.WebKitPoint$factory(x, y));
}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._htmlimpl_list.get$length() > this._htmlimpl_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._htmlimpl_list.$index(this._htmlimpl_pos++);
}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._htmlimpl_length > this._htmlimpl_pos;
}
// ********** Code for _VariableSizeListIterator_html_Touch **************
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(list) {
  this._htmlimpl_list = list;
  this._htmlimpl_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Touch **************
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(list) {
  this._htmlimpl_length = list.get$length();
  _VariableSizeListIterator_html_Touch.call(this, list);
}
// ********** Code for Lists **************
function Lists() {}
Lists.indexOf = function(a, element, startIndex, endIndex) {
  if (startIndex >= a.get$length()) {
    return (-1);
  }
  if (startIndex < (0)) {
    startIndex = (0);
  }
  for (var i = startIndex;
   i < endIndex; i++) {
    if ($eq(a.$index(i), element)) {
      return i;
    }
  }
  return (-1);
}
Lists.getRange = function(a, start, length) {
  if (start < (0)) {
    $throw(new IndexOutOfRangeException(start));
  }
  else if (length < (0)) {
    $throw(new IllegalArgumentException(("negative length " + length)));
  }
  else if (start + length > a.get$length()) {
    $throw(new IndexOutOfRangeException(Math.min(a.get$length(), start)));
  }
  var result = [];
  for (var i = (0);
   $lt(i, length); i = $add(i, (1))) {
    result.add$1(a.$index($add(start, i)));
  }
  return result;
}
// ********** Code for AbstractWorkerWrappingImplementation **************
$inherits(AbstractWorkerWrappingImplementation, EventTargetWrappingImplementation);
AbstractWorkerWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
AbstractWorkerWrappingImplementation._wrap$ctor.prototype = AbstractWorkerWrappingImplementation.prototype;
function AbstractWorkerWrappingImplementation() {}
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
ElementEventsImplementation.prototype.get$blur = function() {
  return this._get("blur");
}
ElementEventsImplementation.prototype.get$click = function() {
  return this._get("click");
}
ElementEventsImplementation.prototype.get$focus = function() {
  return this._get("focus");
}
ElementEventsImplementation.prototype.get$keyDown = function() {
  return this._get("keydown");
}
ElementEventsImplementation.prototype.get$keyUp = function() {
  return this._get("keyup");
}
ElementEventsImplementation.prototype.get$load = function() {
  return this._get("load");
}
ElementEventsImplementation.prototype.get$mouseDown = function() {
  return this._get("mousedown");
}
ElementEventsImplementation.prototype.get$mouseMove = function() {
  return this._get("mousemove");
}
ElementEventsImplementation.prototype.get$mouseOut = function() {
  return this._get("mouseout");
}
ElementEventsImplementation.prototype.get$mouseOver = function() {
  return this._get("mouseover");
}
ElementEventsImplementation.prototype.get$mouseUp = function() {
  return this._get("mouseup");
}
ElementEventsImplementation.prototype.get$mouseWheel = function() {
  return this._get("mousewheel");
}
ElementEventsImplementation.prototype.get$touchCancel = function() {
  return this._get("touchcancel");
}
ElementEventsImplementation.prototype.get$touchEnd = function() {
  return this._get("touchend");
}
ElementEventsImplementation.prototype.get$touchLeave = function() {
  return this._get("touchleave");
}
ElementEventsImplementation.prototype.get$touchMove = function() {
  return this._get("touchmove");
}
ElementEventsImplementation.prototype.get$touchStart = function() {
  return this._get("touchstart");
}
ElementEventsImplementation.prototype.get$transitionEnd = function() {
  return this._get("webkitTransitionEnd");
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
BodyElementWrappingImplementation.prototype.is$BodyElement = function(){return true};
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
// ********** Code for _CssClassSet **************
function _CssClassSet(_element) {
  this._htmlimpl_element = _element;
}
_CssClassSet.prototype.toString = function() {
  return this._formatSet(this._read());
}
_CssClassSet.prototype.iterator = function() {
  return this._read().iterator();
}
_CssClassSet.prototype.forEach = function(f) {
  this._read().forEach$1(f);
}
_CssClassSet.prototype.filter = function(f) {
  return this._read().filter$1(f);
}
_CssClassSet.prototype.some = function(f) {
  return this._read().some$1(f);
}
_CssClassSet.prototype.isEmpty = function() {
  return this._read().isEmpty();
}
_CssClassSet.prototype.get$length = function() {
  return this._read().get$length();
}
_CssClassSet.prototype.contains = function(value) {
  return this._read().contains(value);
}
_CssClassSet.prototype.add = function(value) {
  this._modify((function (s) {
    return s.add$1(value);
  })
  );
}
_CssClassSet.prototype.remove = function(value) {
  var s = this._read();
  var result = s.remove(value);
  this._write(s);
  return result;
}
_CssClassSet.prototype.addAll = function(collection) {
  this._modify((function (s) {
    return s.addAll(collection);
  })
  );
}
_CssClassSet.prototype.clear = function() {
  this._modify((function (s) {
    return s.clear$0();
  })
  );
}
_CssClassSet.prototype._modify = function(f) {
  var s = this._read();
  f(s);
  this._write(s);
}
_CssClassSet.prototype._read = function() {
  var s = new HashSetImplementation_String();
  var $$list = this._className().split_(" ");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var name = $$i.next();
    var trimmed = name.trim();
    if (!trimmed.isEmpty()) {
      s.add(trimmed);
    }
  }
  return s;
}
_CssClassSet.prototype._className = function() {
  return this._htmlimpl_element.get$className();
}
_CssClassSet.prototype._write = function(s) {
  this._htmlimpl_element.set$className(this._formatSet(s));
}
_CssClassSet.prototype._formatSet = function(s) {
  var list = ListFactory.ListFactory$from$factory(s);
  return Strings.join(list, " ");
}
_CssClassSet.prototype.add$1 = _CssClassSet.prototype.add;
_CssClassSet.prototype.clear$0 = _CssClassSet.prototype.clear;
_CssClassSet.prototype.contains$1 = _CssClassSet.prototype.contains;
_CssClassSet.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_CssClassSet.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
_CssClassSet.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
// ********** Code for CSSStyleDeclarationWrappingImplementation **************
$inherits(CSSStyleDeclarationWrappingImplementation, DOMWrapperBase);
CSSStyleDeclarationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSStyleDeclarationWrappingImplementation._wrap$ctor.prototype = CSSStyleDeclarationWrappingImplementation.prototype;
function CSSStyleDeclarationWrappingImplementation() {}
CSSStyleDeclarationWrappingImplementation.get$_browserPrefix = function() {
  if (null == $globals.CSSStyleDeclarationWrappingImplementation__cachedBrowserPrefix) {
    if (_Device.get$isFirefox()) {
      $globals.CSSStyleDeclarationWrappingImplementation__cachedBrowserPrefix = "-moz-";
    }
    else {
      $globals.CSSStyleDeclarationWrappingImplementation__cachedBrowserPrefix = "-webkit-";
    }
  }
  return $globals.CSSStyleDeclarationWrappingImplementation__cachedBrowserPrefix;
}
CSSStyleDeclarationWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CSSStyleDeclarationWrappingImplementation.prototype.getPropertyValue = function(propertyName) {
  return this._ptr.getPropertyValue(propertyName);
}
CSSStyleDeclarationWrappingImplementation.prototype.item = function(index) {
  return this._ptr.item$1(index);
}
CSSStyleDeclarationWrappingImplementation.prototype.removeProperty = function(propertyName) {
  return this._ptr.removeProperty(propertyName);
}
CSSStyleDeclarationWrappingImplementation.prototype.setProperty = function(propertyName, value, priority) {
  this._ptr.setProperty(propertyName, ("" + value), priority);
}
CSSStyleDeclarationWrappingImplementation.prototype.get$typeName = function() {
  return "CSSStyleDeclaration";
}
CSSStyleDeclarationWrappingImplementation.prototype.get$borderBottomWidth = function() {
  return this.getPropertyValue("border-bottom-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$borderLeftWidth = function() {
  return this.getPropertyValue("border-left-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$borderRightWidth = function() {
  return this.getPropertyValue("border-right-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$borderTopWidth = function() {
  return this.getPropertyValue("border-top-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$columnGap = function() {
  return this.getPropertyValue(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "column-gap"));
}
CSSStyleDeclarationWrappingImplementation.prototype.get$columnSpan = function() {
  return this.getPropertyValue(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "column-span"));
}
CSSStyleDeclarationWrappingImplementation.prototype.get$columnWidth = function() {
  return this.getPropertyValue(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "column-width"));
}
CSSStyleDeclarationWrappingImplementation.prototype.set$display = function(value) {
  this.setProperty("display", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$font = function(value) {
  this.setProperty("font", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$fontSize = function() {
  return this.getPropertyValue("font-size");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$height = function() {
  return this.getPropertyValue("height");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$height = function(value) {
  this.setProperty("height", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$left = function(value) {
  this.setProperty("left", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$maxHeight = function() {
  return this.getPropertyValue("max-height");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$maxWidth = function() {
  return this.getPropertyValue("max-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$minHeight = function() {
  return this.getPropertyValue("min-height");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$minWidth = function() {
  return this.getPropertyValue("min-width");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$opacity = function(value) {
  this.setProperty("opacity", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$overflow = function(value) {
  this.setProperty("overflow", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$position = function() {
  return this.getPropertyValue("position");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$position = function(value) {
  this.setProperty("position", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$top = function(value) {
  this.setProperty("top", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$transform = function(value) {
  this.setProperty(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "transform"), value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$transformOrigin = function(value) {
  this.setProperty(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "transform-origin"), value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$transitionDuration = function(value) {
  this.setProperty(("" + CSSStyleDeclarationWrappingImplementation.get$_browserPrefix() + "transition-duration"), value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.get$width = function() {
  return this.getPropertyValue("width");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$width = function(value) {
  this.setProperty("width", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.set$zIndex = function(value) {
  this.setProperty("z-index", value, "");
}
CSSStyleDeclarationWrappingImplementation.prototype.item$1 = CSSStyleDeclarationWrappingImplementation.prototype.item;
// ********** Code for CustomEventWrappingImplementation **************
$inherits(CustomEventWrappingImplementation, EventWrappingImplementation);
CustomEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CustomEventWrappingImplementation._wrap$ctor.prototype = CustomEventWrappingImplementation.prototype;
function CustomEventWrappingImplementation() {}
// ********** Code for _Device **************
function _Device() {}
_Device.get$userAgent = function() {
  return get$window().navigator.userAgent;
}
_Device.get$isFirefox = function() {
  return _Device.get$userAgent().contains("Firefox", (0));
}
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
FilteredElementList.prototype.is$List = function(){return true};
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
FilteredElementList.prototype.sort = function(compare) {
  $throw(const$0023);
}
FilteredElementList.prototype.removeRange = function(start, length) {
  this.get$_filtered().getRange(start, length).forEach$1((function (el) {
    return el.remove$0();
  })
  );
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne(last)) {
    last.remove$0();
  }
  return last;
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter$1(f);
}
FilteredElementList.prototype.some = function(f) {
  return this.get$_filtered().some$1(f);
}
FilteredElementList.prototype.isEmpty = function() {
  return this.get$_filtered().isEmpty();
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.set$length = function(newLength) {
  var len = this.get$length();
  if ($gte(newLength, len)) {
    return;
  }
  else if (newLength < (0)) {
    $throw(const$0021);
  }
  this.removeRange(newLength - (1), $sub(len, newLength));
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.getRange = function(start, length) {
  return this.get$_filtered().getRange(start, length);
}
FilteredElementList.prototype.indexOf = function(element, start) {
  return this.get$_filtered().indexOf(element, start);
}
FilteredElementList.prototype.last = function() {
  return this.get$_filtered().last();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FilteredElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
FilteredElementList.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
FilteredElementList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for EmptyStyleDeclaration **************
$inherits(EmptyStyleDeclaration, CSSStyleDeclarationWrappingImplementation);
function EmptyStyleDeclaration() {
  CSSStyleDeclarationWrappingImplementation._wrap$ctor.call(this, get$document().createElement("div").style);
}
EmptyStyleDeclaration.prototype.removeProperty = function(propertyName) {
  $throw(new UnsupportedOperationException("Can't modify a frozen style declaration."));
}
EmptyStyleDeclaration.prototype.setProperty = function(propertyName, value, priority) {
  $throw(new UnsupportedOperationException("Can't modify a frozen style declaration."));
}
// ********** Code for EmptyElementRect **************
function EmptyElementRect() {
  this.client = const$0011;
  this.scroll = const$0011;
  this.bounding = const$0011;
  this.clientRects = const$0012;
  this.offset = const$0011;
}
EmptyElementRect.prototype.get$offset = function() { return this.offset; };
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
    return const$0013;
  })
  , new CompleterImpl_ElementRect());
}
DocumentFragmentWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
DocumentFragmentWrappingImplementation.prototype.queryAll = function(selectors) {
  return LevelDom.wrapElementList(this._ptr.querySelectorAll(selectors));
}
DocumentFragmentWrappingImplementation.prototype.set$tabIndex = function(value) {
  $throw(new UnsupportedOperationException("Tab index can't be set for document fragments."));
}
DocumentFragmentWrappingImplementation.prototype.get$id = function() {
  return "";
}
DocumentFragmentWrappingImplementation.prototype.get$title = function() {
  return "";
}
DocumentFragmentWrappingImplementation.prototype.get$firstElementChild = function() {
  return this.get$elements().first();
}
DocumentFragmentWrappingImplementation.prototype.get$lastElementChild = function() {
  return this.get$elements().last();
}
DocumentFragmentWrappingImplementation.prototype.get$nextElementSibling = function() {
  return null;
}
DocumentFragmentWrappingImplementation.prototype.get$previousElementSibling = function() {
  return null;
}
DocumentFragmentWrappingImplementation.prototype.get$parent = function() {
  return null;
}
DocumentFragmentWrappingImplementation.prototype.get$attributes = function() {
  return const$0020;
}
DocumentFragmentWrappingImplementation.prototype.get$classes = function() {
  return new HashSetImplementation_String();
}
DocumentFragmentWrappingImplementation.prototype.get$style = function() {
  return new EmptyStyleDeclaration();
}
DocumentFragmentWrappingImplementation.prototype.get$computedStyle = function() {
  return _emptyStyleFuture();
}
DocumentFragmentWrappingImplementation.prototype.blur = function() {

}
DocumentFragmentWrappingImplementation.prototype.get$blur = function() {
  return this.blur.bind(this);
}
DocumentFragmentWrappingImplementation.prototype.focus = function() {

}
DocumentFragmentWrappingImplementation.prototype.get$focus = function() {
  return this.focus.bind(this);
}
DocumentFragmentWrappingImplementation.prototype.query$1 = DocumentFragmentWrappingImplementation.prototype.query;
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
DocumentWrappingImplementation.prototype.get$activeElement = function() {
  return LevelDom.wrapElement(this._documentPtr.get$dynamic().get$activeElement());
}
DocumentWrappingImplementation.prototype.get$parent = function() {
  return null;
}
DocumentWrappingImplementation.prototype.get$body = function() {
  return LevelDom.wrapElement(this._documentPtr.get$body());
}
DocumentWrappingImplementation.prototype.get$readyState = function() {
  return this._documentPtr.get$readyState();
}
DocumentWrappingImplementation.prototype.get$title = function() {
  return this._documentPtr.get$title();
}
DocumentWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new DocumentEventsImplementation._wrap$ctor(this._documentPtr);
  }
  return this._on;
}
// ********** Code for DOMApplicationCacheEventsImplementation **************
$inherits(DOMApplicationCacheEventsImplementation, EventsImplementation);
DOMApplicationCacheEventsImplementation._wrap$ctor = function(ptr) {
  EventsImplementation._wrap$ctor.call(this, ptr);
}
DOMApplicationCacheEventsImplementation._wrap$ctor.prototype = DOMApplicationCacheEventsImplementation.prototype;
function DOMApplicationCacheEventsImplementation() {}
DOMApplicationCacheEventsImplementation.prototype.get$updateReady = function() {
  return this._get("updateready");
}
// ********** Code for DOMApplicationCacheWrappingImplementation **************
$inherits(DOMApplicationCacheWrappingImplementation, EventTargetWrappingImplementation);
DOMApplicationCacheWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
DOMApplicationCacheWrappingImplementation._wrap$ctor.prototype = DOMApplicationCacheWrappingImplementation.prototype;
function DOMApplicationCacheWrappingImplementation() {}
DOMApplicationCacheWrappingImplementation.prototype.get$status = function() {
  return this._ptr.get$status();
}
DOMApplicationCacheWrappingImplementation.prototype.swapCache = function() {
  this._ptr.swapCache();
}
DOMApplicationCacheWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new DOMApplicationCacheEventsImplementation._wrap$ctor(this._ptr);
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
_ChildrenElementList.prototype.is$List = function(){return true};
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
_ChildrenElementList.prototype.some = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    if (f(element)) {
      return true;
    }
  }
  ;
  return false;
}
_ChildrenElementList.prototype.isEmpty = function() {
  return null == this._element.get$firstElementChild();
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.set$length = function(newLength) {
  $throw(const$0014);
}
_ChildrenElementList.prototype.$index = function(index) {
  return LevelDom.wrapElement(this._childElements.$index(index));
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._element.replaceChild(LevelDom.unwrap(value), this._childElements.item$1(index));
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
_ChildrenElementList.prototype.sort = function(compare) {
  $throw(const$0023);
}
_ChildrenElementList.prototype.getRange = function(start, length) {
  return new _ElementList(Lists.getRange(this, start, length));
}
_ChildrenElementList.prototype.indexOf = function(element, start) {
  return Lists.indexOf(this, element, start, this.get$length());
}
_ChildrenElementList.prototype.clear = function() {
  this._element.set$textContent("");
}
_ChildrenElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne(last)) {
    this._element.removeChild(LevelDom.unwrap(last));
  }
  return last;
}
_ChildrenElementList.prototype.last = function() {
  return LevelDom.wrapElement(this._element.get$lastElementChild());
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
_ChildrenElementList.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
_ChildrenElementList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for FrozenElementList **************
FrozenElementList._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
}
FrozenElementList._wrap$ctor.prototype = FrozenElementList.prototype;
function FrozenElementList() {}
FrozenElementList.prototype.is$List = function(){return true};
FrozenElementList.prototype.get$_ptr = function() { return this._ptr; };
FrozenElementList.prototype.get$first = function() {
  return this.$index((0));
}
FrozenElementList.prototype.forEach = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    f(el);
  }
}
FrozenElementList.prototype.filter = function(f) {
  var out = new _ElementList([]);
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    if (f(el)) out.add$1(el);
  }
  return out;
}
FrozenElementList.prototype.some = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    if (f(element)) {
      return true;
    }
  }
  ;
  return false;
}
FrozenElementList.prototype.isEmpty = function() {
  return $eq(this._ptr.get$length(), (0));
}
FrozenElementList.prototype.get$length = function() {
  return this._ptr.get$length();
}
FrozenElementList.prototype.set$length = function(newLength) {
  $throw(const$0014);
}
FrozenElementList.prototype.$index = function(index) {
  return LevelDom.wrapElement(this._ptr.$index(index));
}
FrozenElementList.prototype.$setindex = function(index, value) {
  $throw(const$0014);
}
FrozenElementList.prototype.add = function(value) {
  $throw(const$0014);
}
FrozenElementList.prototype.iterator = function() {
  return new FrozenElementListIterator(this);
}
FrozenElementList.prototype.addAll = function(collection) {
  $throw(const$0014);
}
FrozenElementList.prototype.sort = function(compare) {
  $throw(const$0014);
}
FrozenElementList.prototype.getRange = function(start, length) {
  return new _ElementList(Lists.getRange(this, start, length));
}
FrozenElementList.prototype.indexOf = function(element, start) {
  return Lists.indexOf(this, element, start, this.get$length());
}
FrozenElementList.prototype.clear = function() {
  $throw(const$0014);
}
FrozenElementList.prototype.removeLast = function() {
  $throw(const$0014);
}
FrozenElementList.prototype.last = function() {
  return this.$index(this.get$length() - (1));
}
FrozenElementList.prototype.add$1 = FrozenElementList.prototype.add;
FrozenElementList.prototype.clear$0 = FrozenElementList.prototype.clear;
FrozenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FrozenElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
FrozenElementList.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
FrozenElementList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for FrozenElementListIterator **************
function FrozenElementListIterator(_list) {
  this._htmlimpl_index = (0);
  this._list = _list;
}
FrozenElementListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._list.$index(this._htmlimpl_index++);
}
FrozenElementListIterator.prototype.hasNext = function() {
  return this._htmlimpl_index < this._list.get$length();
}
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._list.forEach$1(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._list.filter(f);
}
_ListWrapper.prototype.some = function(f) {
  return this._list.some$1(f);
}
_ListWrapper.prototype.isEmpty = function() {
  return this._list.isEmpty();
}
_ListWrapper.prototype.get$length = function() {
  return this._list.get$length();
}
_ListWrapper.prototype.set$length = function(newLength) {
  this._list.set$length(newLength);
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
_ListWrapper.prototype.sort = function(compare) {
  return this._list.sort$1(compare);
}
_ListWrapper.prototype.indexOf = function(element, start) {
  return this._list.indexOf(element, start);
}
_ListWrapper.prototype.clear = function() {
  return this._list.clear();
}
_ListWrapper.prototype.removeLast = function() {
  return this._list.removeLast();
}
_ListWrapper.prototype.last = function() {
  return this._list.last();
}
_ListWrapper.prototype.getRange = function(start, length) {
  return this._list.getRange(start, length);
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
_ListWrapper.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
_ListWrapper.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._list = _list;
}
_ListWrapper_Element.prototype.is$List = function(){return true};
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear;
_ListWrapper_Element.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Element.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
_ListWrapper_Element.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
_ListWrapper_Element.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.is$List = function(){return true};
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.getRange = function(start, length) {
  return new _ElementList(_ListWrapper_Element.prototype.getRange.call(this, start, length));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ElementAttributeMap **************
ElementAttributeMap._wrap$ctor = function(_element) {
  this._element = _element;
}
ElementAttributeMap._wrap$ctor.prototype = ElementAttributeMap.prototype;
function ElementAttributeMap() {}
ElementAttributeMap.prototype.is$Map_dart_core_String$Dynamic = function(){return true};
ElementAttributeMap.prototype.containsKey = function(key) {
  return this._element.hasAttribute(key);
}
ElementAttributeMap.prototype.$index = function(key) {
  return this._element.getAttribute(key);
}
ElementAttributeMap.prototype.$setindex = function(key, value) {
  this._element.setAttribute(key, value);
}
ElementAttributeMap.prototype.clear = function() {
  var attributes = this._element.get$attributes();
  for (var i = $sub(attributes.get$length(), (1));
   i >= (0); i--) {
    this._element.removeAttribute(attributes.item$1(i).get$name());
  }
}
ElementAttributeMap.prototype.forEach = function(f) {
  var attributes = this._element.get$attributes();
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    var item = attributes.item$1(i);
    f(item.get$name(), item.get$value());
  }
}
ElementAttributeMap.prototype.getValues = function() {
  var attributes = this._element.get$attributes();
  var values = new Array(attributes.get$length());
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    values.$setindex(i, attributes.item$1(i).get$value());
  }
  return values;
}
ElementAttributeMap.prototype.get$length = function() {
  return this._element.get$attributes().get$length();
}
ElementAttributeMap.prototype.clear$0 = ElementAttributeMap.prototype.clear;
ElementAttributeMap.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
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
ElementRectWrappingImplementation.prototype.get$offset = function() { return this.offset; };
// ********** Code for ErrorEventWrappingImplementation **************
$inherits(ErrorEventWrappingImplementation, EventWrappingImplementation);
ErrorEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ErrorEventWrappingImplementation._wrap$ctor.prototype = ErrorEventWrappingImplementation.prototype;
function ErrorEventWrappingImplementation() {}
// ********** Code for EventSourceWrappingImplementation **************
$inherits(EventSourceWrappingImplementation, EventTargetWrappingImplementation);
EventSourceWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
EventSourceWrappingImplementation._wrap$ctor.prototype = EventSourceWrappingImplementation.prototype;
function EventSourceWrappingImplementation() {}
EventSourceWrappingImplementation.prototype.get$readyState = function() {
  return this._ptr.get$readyState();
}
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
  this._htmlimpl_add(listener, useCapture);
  return this;
}
EventListenerListImplementation.prototype.remove = function(listener, useCapture) {
  this._htmlimpl_remove(listener, useCapture);
  return this;
}
EventListenerListImplementation.prototype.dispatch = function(evt) {
  return this._ptr.dispatchEvent(LevelDom.unwrap(evt));
}
EventListenerListImplementation.prototype._htmlimpl_add = function(listener, useCapture) {
  this._ptr.addEventListener$3(this._type, this._findOrAddWrapper(listener, useCapture), useCapture);
}
EventListenerListImplementation.prototype._htmlimpl_remove = function(listener, useCapture) {
  var wrapper = this._removeWrapper(listener, useCapture);
  if (null != wrapper) {
    this._ptr.removeEventListener$3(this._type, wrapper, useCapture);
  }
}
EventListenerListImplementation.prototype._removeWrapper = function(listener, useCapture) {
  var $0;
  if (null == this._wrappers) {
    return null;
  }
  for (var i = (0);
   i < this._wrappers.get$length(); i++) {
    var wrapper = this._wrappers.$index(i);
    if ((($0 = wrapper.raw) == null ? null == (listener) : $0 === listener) && $eq(wrapper.useCapture, useCapture)) {
      if (i + (1) != this._wrappers.get$length()) {
        this._wrappers.$setindex(i, this._wrappers.removeLast());
      }
      else {
        this._wrappers.removeLast();
      }
      return wrapper.wrapped;
    }
  }
  return null;
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
EventListenerListImplementation.prototype.add$2 = function($0, $1) {
  return this.add(to$call$1($0), $1);
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
MessageEventWrappingImplementation.prototype.get$source = function() {
  return LevelDom.wrapWindow(this._ptr.get$source());
}
// ********** Code for MessagePortWrappingImplementation **************
$inherits(MessagePortWrappingImplementation, EventTargetWrappingImplementation);
MessagePortWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessagePortWrappingImplementation._wrap$ctor.prototype = MessagePortWrappingImplementation.prototype;
function MessagePortWrappingImplementation() {}
// ********** Code for MouseEventWrappingImplementation **************
$inherits(MouseEventWrappingImplementation, UIEventWrappingImplementation);
MouseEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MouseEventWrappingImplementation._wrap$ctor.prototype = MouseEventWrappingImplementation.prototype;
function MouseEventWrappingImplementation() {}
MouseEventWrappingImplementation.prototype.get$clientX = function() {
  return this._ptr.get$clientX();
}
MouseEventWrappingImplementation.prototype.get$clientY = function() {
  return this._ptr.get$clientY();
}
MouseEventWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
MouseEventWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
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
_ChildrenNodeList.prototype.is$List = function(){return true};
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
_ChildrenNodeList.prototype.some = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    if (f(element)) {
      return true;
    }
  }
  ;
  return false;
}
_ChildrenNodeList.prototype.isEmpty = function() {
  return !this._node.hasChildNodes();
}
_ChildrenNodeList.prototype.get$length = function() {
  return this._childNodes.get$length();
}
_ChildrenNodeList.prototype.set$length = function(newLength) {
  $throw(new UnsupportedOperationException(""));
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
_ChildrenNodeList.prototype.sort = function(compare) {
  $throw(const$0023);
}
_ChildrenNodeList.prototype.getRange = function(start, length) {
  return new _NodeList(Lists.getRange(this, start, length));
}
_ChildrenNodeList.prototype.indexOf = function(element, start) {
  return Lists.indexOf(this, element, start, this.get$length());
}
_ChildrenNodeList.prototype.clear = function() {
  this._node.set$textContent("");
}
_ChildrenNodeList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne(last)) {
    this._node.removeChild(LevelDom.unwrap(last));
  }
  return last;
}
_ChildrenNodeList.prototype.last = function() {
  return LevelDom.wrapNode(this._node.get$lastChild());
}
_ChildrenNodeList.prototype.add$1 = _ChildrenNodeList.prototype.add;
_ChildrenNodeList.prototype.clear$0 = _ChildrenNodeList.prototype.clear;
_ChildrenNodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenNodeList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
_ChildrenNodeList.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
_ChildrenNodeList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._list = _list;
}
_ListWrapper_Node.prototype.is$List = function(){return true};
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear;
_ListWrapper_Node.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Node.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
_ListWrapper_Node.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
_ListWrapper_Node.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for _NodeList **************
$inherits(_NodeList, _ListWrapper_Node);
function _NodeList(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeList.prototype.is$List = function(){return true};
_NodeList.prototype.filter = function(f) {
  return new _NodeList(_ListWrapper_Node.prototype.filter.call(this, f));
}
_NodeList.prototype.getRange = function(start, length) {
  return new _NodeList(_ListWrapper_Node.prototype.getRange.call(this, start, length));
}
_NodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for NotificationWrappingImplementation **************
$inherits(NotificationWrappingImplementation, EventTargetWrappingImplementation);
NotificationWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotificationWrappingImplementation._wrap$ctor.prototype = NotificationWrappingImplementation.prototype;
function NotificationWrappingImplementation() {}
NotificationWrappingImplementation.prototype.get$typeName = function() {
  return "Notification";
}
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ObjectElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ObjectElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ObjectElementWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
ObjectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ObjectElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
ObjectElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
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
// ********** Code for SharedWorkerWrappingImplementation **************
$inherits(SharedWorkerWrappingImplementation, AbstractWorkerWrappingImplementation);
SharedWorkerWrappingImplementation._wrap$ctor = function(ptr) {
  AbstractWorkerWrappingImplementation._wrap$ctor.call(this, ptr);
}
SharedWorkerWrappingImplementation._wrap$ctor.prototype = SharedWorkerWrappingImplementation.prototype;
function SharedWorkerWrappingImplementation() {}
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
// ********** Code for _SVGClassSet **************
$inherits(_SVGClassSet, _CssClassSet);
function _SVGClassSet(element) {
  _CssClassSet.call(this, element);
}
_SVGClassSet.prototype._className = function() {
  return this._htmlimpl_element.get$className().get$baseVal();
}
_SVGClassSet.prototype._write = function(s) {
  this._htmlimpl_element.get$className().set$baseVal(this._formatSet(s));
}
// ********** Code for SVGElementInstanceWrappingImplementation **************
$inherits(SVGElementInstanceWrappingImplementation, EventTargetWrappingImplementation);
SVGElementInstanceWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementInstanceWrappingImplementation._wrap$ctor.prototype = SVGElementInstanceWrappingImplementation.prototype;
function SVGElementInstanceWrappingImplementation() {}
SVGElementInstanceWrappingImplementation.prototype.get$childNodes = function() {
  return LevelDom.wrapSVGElementInstanceList(this._ptr.get$childNodes());
}
SVGElementInstanceWrappingImplementation.prototype.get$firstChild = function() {
  return LevelDom.wrapSVGElementInstance(this._ptr.get$firstChild());
}
SVGElementInstanceWrappingImplementation.prototype.get$lastChild = function() {
  return LevelDom.wrapSVGElementInstance(this._ptr.get$lastChild());
}
SVGElementInstanceWrappingImplementation.prototype.get$parentNode = function() {
  return LevelDom.wrapSVGElementInstance(this._ptr.get$parentNode());
}
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGSVGElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGSVGElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
SVGSVGElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGSVGElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
SVGSVGElementWrappingImplementation.prototype.get$className = function() {
  return LevelDom.wrapSVGAnimatedString(this._ptr.get$className());
}
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
TouchEventWrappingImplementation.prototype.get$changedTouches = function() {
  return LevelDom.wrapTouchList(this._ptr.get$changedTouches());
}
TouchEventWrappingImplementation.prototype.get$touches = function() {
  return LevelDom.wrapTouchList(this._ptr.get$touches());
}
// ********** Code for TransitionEventWrappingImplementation **************
$inherits(TransitionEventWrappingImplementation, EventWrappingImplementation);
TransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TransitionEventWrappingImplementation._wrap$ctor.prototype = TransitionEventWrappingImplementation.prototype;
function TransitionEventWrappingImplementation() {}
// ********** Code for WebSocketWrappingImplementation **************
$inherits(WebSocketWrappingImplementation, EventTargetWrappingImplementation);
WebSocketWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebSocketWrappingImplementation._wrap$ctor.prototype = WebSocketWrappingImplementation.prototype;
function WebSocketWrappingImplementation() {}
WebSocketWrappingImplementation.prototype.get$protocol = function() {
  return this._ptr.get$protocol();
}
WebSocketWrappingImplementation.prototype.get$readyState = function() {
  return this._ptr.get$readyState();
}
WebSocketWrappingImplementation.prototype.send = function(data) {
  return this._ptr.send$1(data);
}
WebSocketWrappingImplementation.prototype.get$typeName = function() {
  return "WebSocket";
}
WebSocketWrappingImplementation.prototype.send$1 = WebSocketWrappingImplementation.prototype.send;
// ********** Code for WheelEventWrappingImplementation **************
$inherits(WheelEventWrappingImplementation, UIEventWrappingImplementation);
WheelEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WheelEventWrappingImplementation._wrap$ctor.prototype = WheelEventWrappingImplementation.prototype;
function WheelEventWrappingImplementation() {}
WheelEventWrappingImplementation.prototype.get$clientX = function() {
  return this._ptr.get$clientX();
}
WheelEventWrappingImplementation.prototype.get$clientY = function() {
  return this._ptr.get$clientY();
}
WheelEventWrappingImplementation.prototype.get$wheelDeltaX = function() {
  return this._ptr.get$wheelDeltaX();
}
WheelEventWrappingImplementation.prototype.get$wheelDeltaY = function() {
  return this._ptr.get$wheelDeltaY();
}
WheelEventWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
WheelEventWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
// ********** Code for WindowEventsImplementation **************
$inherits(WindowEventsImplementation, EventsImplementation);
WindowEventsImplementation._wrap$ctor = function(_ptr) {
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
WindowEventsImplementation._wrap$ctor.prototype = WindowEventsImplementation.prototype;
function WindowEventsImplementation() {}
WindowEventsImplementation.prototype.get$blur = function() {
  return this._get("blur");
}
WindowEventsImplementation.prototype.get$click = function() {
  return this._get("click");
}
WindowEventsImplementation.prototype.get$focus = function() {
  return this._get("focus");
}
WindowEventsImplementation.prototype.get$keyDown = function() {
  return this._get("keydown");
}
WindowEventsImplementation.prototype.get$load = function() {
  return this._get("load");
}
WindowEventsImplementation.prototype.get$message = function() {
  return this._get("message");
}
WindowEventsImplementation.prototype.get$mouseDown = function() {
  return this._get("mousedown");
}
WindowEventsImplementation.prototype.get$mouseOut = function() {
  return this._get("mouseout");
}
WindowEventsImplementation.prototype.get$mouseOver = function() {
  return this._get("mouseover");
}
WindowEventsImplementation.prototype.get$mouseWheel = function() {
  return this._get("mousewheel");
}
WindowEventsImplementation.prototype.get$popState = function() {
  return this._get("popstate");
}
WindowEventsImplementation.prototype.get$resize = function() {
  return this._get("resize");
}
WindowEventsImplementation.prototype.get$touchEnd = function() {
  return this._get("touchend");
}
WindowEventsImplementation.prototype.get$touchStart = function() {
  return this._get("touchstart");
}
WindowEventsImplementation.prototype.get$transitionEnd = function() {
  return this._get("webkitTransitionEnd");
}
WindowEventsImplementation.prototype.get$contentLoaded = function() {
  return this._get("DOMContentLoaded");
}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.get$applicationCache = function() {
  return LevelDom.wrapDOMApplicationCache(this._ptr.get$applicationCache());
}
WindowWrappingImplementation.prototype.get$console = function() {
  return LevelDom.wrapConsole(this._ptr.get$console());
}
WindowWrappingImplementation.prototype.get$history = function() {
  return LevelDom.wrapHistory(this._ptr.get$history());
}
WindowWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
WindowWrappingImplementation.prototype.get$location = function() {
  return LevelDom.wrapLocation(this._ptr.get$location());
}
WindowWrappingImplementation.prototype.get$name = function() {
  return this._ptr.get$name();
}
WindowWrappingImplementation.prototype.get$navigator = function() {
  return LevelDom.wrapNavigator(this._ptr.get$navigator());
}
WindowWrappingImplementation.prototype.get$screen = function() {
  return LevelDom.wrapScreen(this._ptr.get$screen());
}
WindowWrappingImplementation.prototype.get$status = function() {
  return this._ptr.get$status();
}
WindowWrappingImplementation.prototype.set$top = function(value) {
  this._ptr.set$top(LevelDom.unwrap(value));
}
WindowWrappingImplementation.prototype.blur = function() {
  this._ptr.blur();
}
WindowWrappingImplementation.prototype.get$blur = function() {
  return this.blur.bind(this);
}
WindowWrappingImplementation.prototype.clearInterval = function(handle) {
  if (null == handle) {
    this._ptr.clearInterval$0();
  }
  else {
    this._ptr.clearInterval(handle);
  }
}
WindowWrappingImplementation.prototype.clearTimeout = function(handle) {
  if (null == handle) {
    this._ptr.clearTimeout$0();
  }
  else {
    this._ptr.clearTimeout(handle);
  }
}
WindowWrappingImplementation.prototype.focus = function() {
  this._ptr.focus();
}
WindowWrappingImplementation.prototype.get$focus = function() {
  return this.focus.bind(this);
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
WindowWrappingImplementation.prototype.setInterval = function(handler, timeout) {
  return this._ptr.setInterval$2(handler, timeout);
}
WindowWrappingImplementation.prototype.setTimeout = function(handler, timeout) {
  return this._ptr.setTimeout$2(handler, timeout);
}
WindowWrappingImplementation.prototype.webkitConvertPointFromNodeToPage = function(node, p) {
  if (null == node) {
    if (null == p) {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromNodeToPage$0());
    }
  }
  else {
    if (null == p) {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromNodeToPage$1(LevelDom.unwrap(node)));
    }
    else {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromNodeToPage(LevelDom.unwrap(node), LevelDom.unwrap(p)));
    }
  }
  $throw("Incorrect number or type of arguments");
}
WindowWrappingImplementation.prototype.webkitConvertPointFromPageToNode = function(node, p) {
  if (null == node) {
    if (null == p) {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromPageToNode$0());
    }
  }
  else {
    if (null == p) {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromPageToNode$1(LevelDom.unwrap(node)));
    }
    else {
      return LevelDom.wrapPoint(this._ptr.webkitConvertPointFromPageToNode(LevelDom.unwrap(node), LevelDom.unwrap(p)));
    }
  }
  $throw("Incorrect number or type of arguments");
}
WindowWrappingImplementation.prototype.webkitRequestAnimationFrame = function(callback, element) {
  return this._ptr.webkitRequestAnimationFrame$2(callback, LevelDom.unwrap(element));
}
WindowWrappingImplementation.prototype.requestLayoutFrame = function(callback) {
  _addMeasurementFrameCallback(callback);
}
WindowWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new WindowEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
WindowWrappingImplementation.prototype.clearInterval$0 = WindowWrappingImplementation.prototype.clearInterval;
WindowWrappingImplementation.prototype.clearTimeout$0 = WindowWrappingImplementation.prototype.clearTimeout;
WindowWrappingImplementation.prototype.open$2 = WindowWrappingImplementation.prototype.open;
WindowWrappingImplementation.prototype.open$3 = WindowWrappingImplementation.prototype.open;
WindowWrappingImplementation.prototype.postMessage$1 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$2 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$3 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.setInterval$2 = function($0, $1) {
  return this.setInterval(to$call$0($0), $1);
};
WindowWrappingImplementation.prototype.setTimeout$2 = function($0, $1) {
  return this.setTimeout(to$call$0($0), $1);
};
WindowWrappingImplementation.prototype.webkitConvertPointFromNodeToPage$0 = WindowWrappingImplementation.prototype.webkitConvertPointFromNodeToPage;
WindowWrappingImplementation.prototype.webkitConvertPointFromNodeToPage$1 = WindowWrappingImplementation.prototype.webkitConvertPointFromNodeToPage;
WindowWrappingImplementation.prototype.webkitConvertPointFromPageToNode$0 = WindowWrappingImplementation.prototype.webkitConvertPointFromPageToNode;
WindowWrappingImplementation.prototype.webkitConvertPointFromPageToNode$1 = WindowWrappingImplementation.prototype.webkitConvertPointFromPageToNode;
WindowWrappingImplementation.prototype.webkitRequestAnimationFrame$2 = function($0, $1) {
  return this.webkitRequestAnimationFrame(to$call$1($0), $1);
};
// ********** Code for WorkerWrappingImplementation **************
$inherits(WorkerWrappingImplementation, EventTargetWrappingImplementation);
WorkerWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WorkerWrappingImplementation._wrap$ctor.prototype = WorkerWrappingImplementation.prototype;
function WorkerWrappingImplementation() {}
WorkerWrappingImplementation.prototype.postMessage = function(message, messagePort) {
  if (null == messagePort) {
    this._ptr.postMessage$1(message);
    return;
  }
  else {
    this._ptr.postMessage$2(message, LevelDom.unwrap(messagePort));
    return;
  }
}
WorkerWrappingImplementation.prototype.postMessage$1 = WorkerWrappingImplementation.prototype.postMessage;
WorkerWrappingImplementation.prototype.postMessage$2 = WorkerWrappingImplementation.prototype.postMessage;
// ********** Code for XMLHttpRequestProgressEventWrappingImplementation **************
$inherits(XMLHttpRequestProgressEventWrappingImplementation, ProgressEventWrappingImplementation);
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  ProgressEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestProgressEventWrappingImplementation.prototype;
function XMLHttpRequestProgressEventWrappingImplementation() {}
// ********** Code for XMLHttpRequestUploadWrappingImplementation **************
$inherits(XMLHttpRequestUploadWrappingImplementation, EventTargetWrappingImplementation);
XMLHttpRequestUploadWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestUploadWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestUploadWrappingImplementation.prototype;
function XMLHttpRequestUploadWrappingImplementation() {}
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
XMLHttpRequestWrappingImplementation.prototype.open$3 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.open$4 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.open$5 = XMLHttpRequestWrappingImplementation.prototype.open;
XMLHttpRequestWrappingImplementation.prototype.send$0 = XMLHttpRequestWrappingImplementation.prototype.send;
XMLHttpRequestWrappingImplementation.prototype.send$1 = XMLHttpRequestWrappingImplementation.prototype.send;
// ********** Code for top level **************
function _emptyStyleFuture() {
  return _createMeasurementFuture((function () {
    return new EmptyStyleDeclaration();
  })
  , new CompleterImpl_html_CSSStyleDeclaration());
}
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    html_get$window().get$on().get$message().add$1((function (e) {
      return _completeMeasurementFutures();
    })
    );
    $globals._firstMeasurementRequest = false;
  }
  html_get$window().postMessage("DART-MEASURE", "*");
}
function _addMeasurementFrameCallback(callback) {
  if (null == $globals._pendingMeasurementFrameCallbacks) {
    $globals._pendingMeasurementFrameCallbacks = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingMeasurementFrameCallbacks.add(callback);
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
//  ********** Library uri **************
// ********** Code for Uri **************
function Uri() {}
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
//  ********** Library observable **************
// ********** Code for AbstractObservable **************
function AbstractObservable(parent) {
  this.uid = EventBatch.genUid();
  this.listeners = new Array();
  this.parent = parent;
}
AbstractObservable.prototype.get$isObserved = function() {
  for (var obj = this;
   obj != null; obj = obj.parent) {
    if (this.listeners.get$length() > (0)) {
      return true;
    }
  }
  return false;
}
AbstractObservable.prototype.addChangeListener = function(listener) {
  if (this.listeners.indexOf(listener, (0)) == (-1)) {
    this.listeners.add(listener);
    return true;
  }
  return false;
}
AbstractObservable.prototype.recordPropertyUpdate = function(propertyName, newValue, oldValue) {
  this.recordEvent(new ChangeEvent.property$ctor(this, propertyName, newValue, oldValue));
}
AbstractObservable.prototype.recordListUpdate = function(index, newValue, oldValue) {
  this.recordEvent(new ChangeEvent.list$ctor(this, (0), index, newValue, oldValue));
}
AbstractObservable.prototype.recordListInsert = function(index, newValue) {
  this.recordEvent(new ChangeEvent.list$ctor(this, (1), index, newValue, null));
}
AbstractObservable.prototype.recordListRemove = function(index, oldValue) {
  this.recordEvent(new ChangeEvent.list$ctor(this, (2), index, null, oldValue));
}
AbstractObservable.prototype.recordGlobalChange = function() {
  this.recordEvent(new ChangeEvent.global$ctor(this));
}
AbstractObservable.prototype.recordEvent = function(event) {
  var $this = this; // closure support
  if (!this.get$isObserved()) {
    return;
  }
  if ($globals.EventBatch_current != null) {
    var summary = $globals.EventBatch_current.getEvents(this);
    summary.addEvent(event);
  }
  else {
    EventBatch.wrap((function (ignore) {
      $this.recordEvent(event);
    })
    ).call$1();
  }
}
// ********** Code for ObservableList **************
$inherits(ObservableList, AbstractObservable);
function ObservableList() {}
ObservableList.prototype.is$List = function(){return true};
ObservableList.prototype.$index = function(index) {
  return this._internal.$index(index);
}
ObservableList.prototype.$setindex = function(index, value) {
  this.recordListUpdate(index, value, this._internal.$index(index));
  this._internal.$setindex(index, value);
}
ObservableList.prototype.get$length = function() {
  return this._internal.get$length();
}
ObservableList.prototype.set$length = function(value) {
  this._internal.set$length(value);
  this.recordGlobalChange();
}
ObservableList.prototype.clear = function() {
  this._internal.clear();
  this.recordGlobalChange();
}
ObservableList.prototype.sort = function(compare) {
  this._internal.sort(compare);
  this.recordGlobalChange();
}
ObservableList.prototype.add = function(element) {
  this.recordListInsert(this.get$length(), element);
  this._internal.add(element);
}
ObservableList.prototype.addAll = function(elements) {
  for (var $$i = elements.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    this.add(element);
  }
}
ObservableList.prototype.last = function() {
  return this._internal.last();
}
ObservableList.prototype.removeLast = function() {
  var result = this._internal.removeLast();
  this.recordListRemove(this.get$length(), result);
  return result;
}
ObservableList.prototype.indexOf = function(element, start) {
  return this._internal.indexOf(element, start);
}
ObservableList.prototype.getRange = function(start, length) {
  $throw(const$0006);
}
ObservableList.prototype.iterator = function() {
  return this._internal.iterator();
}
ObservableList.prototype.filter = function(f) {
  return this._internal.filter$1(f);
}
ObservableList.prototype.some = function(f) {
  return this._internal.some$1(f);
}
ObservableList.prototype.forEach = function(f) {
  this._internal.forEach$1(f);
}
ObservableList.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
ObservableList.prototype.add$1 = ObservableList.prototype.add;
ObservableList.prototype.clear$0 = ObservableList.prototype.clear;
ObservableList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
ObservableList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
ObservableList.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
ObservableList.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for ObservableList_Article **************
$inherits(ObservableList_Article, ObservableList);
function ObservableList_Article(parent) {
  this._internal = new Array();
  AbstractObservable.call(this, parent);
}
ObservableList_Article.prototype.is$List = function(){return true};
ObservableList_Article.prototype.add$1 = ObservableList_Article.prototype.add;
ObservableList_Article.prototype.clear$0 = ObservableList_Article.prototype.clear;
ObservableList_Article.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
ObservableList_Article.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
ObservableList_Article.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
ObservableList_Article.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for ObservableList_Feed **************
$inherits(ObservableList_Feed, ObservableList);
function ObservableList_Feed(parent) {
  this._internal = new Array();
  AbstractObservable.call(this, parent);
}
ObservableList_Feed.prototype.is$List = function(){return true};
ObservableList_Feed.prototype.add$1 = ObservableList_Feed.prototype.add;
ObservableList_Feed.prototype.clear$0 = ObservableList_Feed.prototype.clear;
ObservableList_Feed.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
ObservableList_Feed.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
ObservableList_Feed.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
ObservableList_Feed.prototype.sort$1 = function($0) {
  return this.sort(to$call$2($0));
};
// ********** Code for ObservableValue **************
$inherits(ObservableValue, AbstractObservable);
function ObservableValue() {}
ObservableValue.prototype.get$value = function() {
  return this._value;
}
ObservableValue.prototype.set$value = function(newValue) {
  if ((null == newValue ? null != (this._value) : newValue !== this._value)) {
    var oldValue = this._value;
    this._value = newValue;
    this.recordPropertyUpdate("value", newValue, oldValue);
  }
}
// ********** Code for ObservableValue_bool **************
$inherits(ObservableValue_bool, ObservableValue);
function ObservableValue_bool(value, parent) {
  this._value = value;
  AbstractObservable.call(this, parent);
}
// ********** Code for ObservableValue_int **************
$inherits(ObservableValue_int, ObservableValue);
function ObservableValue_int(value, parent) {
  this._value = value;
  AbstractObservable.call(this, parent);
}
// ********** Code for ObservableValue_Article **************
$inherits(ObservableValue_Article, ObservableValue);
function ObservableValue_Article(value, parent) {
  this._value = value;
  AbstractObservable.call(this, parent);
}
// ********** Code for ChangeEvent **************
ChangeEvent.property$ctor = function(target, propertyName, newValue, oldValue) {
  this.target = target;
  this.oldValue = oldValue;
  this.index = null;
  this.propertyName = propertyName;
  this.type = (0);
  this.newValue = newValue;
}
ChangeEvent.property$ctor.prototype = ChangeEvent.prototype;
ChangeEvent.global$ctor = function(target) {
  this.target = target;
  this.oldValue = null;
  this.index = null;
  this.propertyName = null;
  this.type = (3);
  this.newValue = null;
}
ChangeEvent.global$ctor.prototype = ChangeEvent.prototype;
ChangeEvent.list$ctor = function(target, type, index, newValue, oldValue) {
  this.target = target;
  this.oldValue = oldValue;
  this.index = index;
  this.propertyName = null;
  this.type = type;
  this.newValue = newValue;
}
ChangeEvent.list$ctor.prototype = ChangeEvent.prototype;
function ChangeEvent() {}
ChangeEvent.prototype.get$target = function() { return this.target; };
ChangeEvent.prototype.get$type = function() { return this.type; };
// ********** Code for EventSummary **************
function EventSummary(target) {
  this.target = target;
  this.events = new Array();
}
EventSummary.prototype.get$target = function() { return this.target; };
EventSummary.prototype.addEvent = function(e) {
  this.events.add(e);
}
EventSummary.prototype.notify = function() {
  if (!this.events.isEmpty()) {
    for (var obj = this.target;
     obj != null; obj = obj.parent) {
      var $$list = obj.listeners;
      for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
        var listener = $$i.next();
        listener.call$1(this);
      }
    }
  }
}
// ********** Code for EventBatch **************
EventBatch._internal$ctor = function() {
  this.sealed = false;
  this.summaries = new HashMapImplementation_int$EventSummary();
}
EventBatch._internal$ctor.prototype = EventBatch.prototype;
function EventBatch() {}
EventBatch.wrap = function(userFunction) {
  return (function (e) {
    if ($globals.EventBatch_current == null) {
      var batch = new EventBatch._internal$ctor();
      $globals.EventBatch_current = batch;
      var result = null;
      try {
        result = userFunction(e);
      } finally {
        $globals.EventBatch_current = null;
        batch._notify();
      }
      return result;
    }
    else {
      return userFunction(e);
    }
  })
  ;
}
EventBatch.genUid = function() {
  if ($globals.EventBatch_nextUid == null) {
    $globals.EventBatch_nextUid = (1);
  }
  return $globals.EventBatch_nextUid++;
}
EventBatch.prototype.getEvents = function(obj) {
  var uid = obj.uid;
  var summary = this.summaries.$index(uid);
  if (summary == null) {
    summary = new EventSummary(obj);
    this.summaries.$setindex(uid, summary);
  }
  return summary;
}
EventBatch.prototype._notify = function() {
  this.sealed = true;
  var $$list = this.summaries.getValues();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var summary = $$i.next();
    summary.notify();
  }
}
// ********** Code for top level **************
//  ********** Library utilslib **************
// ********** Code for CollectionUtils **************
function CollectionUtils() {}
CollectionUtils.map = function(source, mapper) {
  var result = new Array(!!(source && source.is$List()) ? source.get$dynamic().get$length() : null);
  var i = (0);
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    result.$setindex(i++, mapper.call$1(item));
  }
  return result;
}
CollectionUtils.find = function(source, test) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    if (test(item)) return item;
  }
  return null;
}
CollectionUtils.orderBy = function(source, selector) {
  var result = ListFactory.ListFactory$from$factory(source);
  CollectionUtils.sortBy(result, selector);
  return result;
}
CollectionUtils.sortBy = function(list, selector) {
  if (selector != null) {
    list.sort$1((function (x, y) {
      return selector(x) - selector(y);
    })
    );
  }
  else {
    list.sort$1((function (x, y) {
      return $sub(x, y);
    })
    );
  }
}
CollectionUtils.sum = function(source, selector) {
  var iter = source.iterator();
  var total = (0);
  if (selector != null) {
    do {
      total += selector(iter.next());
    }
    while (iter.hasNext())
  }
  else {
    do {
      total = $add(total, iter.next());
    }
    while (iter.hasNext())
  }
  return total;
}
// ********** Code for DateUtils **************
function DateUtils() {}
DateUtils.toRecentTimeString = function(then) {
  function datesAreEqual(d1, d2) {
    return (d1.get$year() == d2.get$year()) && (d1.get$month() == d2.get$month()) && (d1.get$day() == d2.get$day());
  }
  var now = new DateImplementation.now$ctor();
  if (datesAreEqual(then, now)) {
    return DateUtils.toHourMinutesString(new DurationImplementation((0), then.get$hours(), then.get$minutes(), then.get$seconds(), then.get$milliseconds()));
  }
  var today = DateImplementation.DateImplementation$factory(now.get$year(), now.get$month(), now.get$day(), (0), (0), (0), (0));
  var delta = today.difference(then);
  if (delta.inMilliseconds < (86400000)) {
    return "Yesterday";
  }
  else if (delta.inMilliseconds < (604800000)) {
    return const$0015.$index(DateUtils.getWeekday(then));
  }
  else {
    function twoDigits(n) {
      if (n >= (10)) return ("" + n);
      return ("0" + n);
    }
    var twoDigitMonth = twoDigits(then.get$month());
    var twoDigitDay = twoDigits(then.get$day());
    return ("" + then.get$year() + "-" + twoDigitMonth + "-" + twoDigitDay);
  }
}
DateUtils.getWeekday = function(dateTime) {
  var unixTimeStart = DateImplementation.DateImplementation$factory((1970), (1), (1), (0), (0), (0), (0));
  var msSince1970 = dateTime.difference(unixTimeStart).inMilliseconds;
  var daysSince1970 = $truncdiv(msSince1970, (86400000));
  return ($mod((daysSince1970 + (3)), (7)));
}
DateUtils.toHourMinutesString = function(duration) {
  var hours = duration.get$inHours();
  var a;
  if (hours >= (12)) {
    a = "pm";
    if (hours != (12)) {
      hours -= (12);
    }
  }
  else {
    a = "am";
    if (hours == (0)) {
      hours += (12);
    }
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  var mm = twoDigits(duration.get$inMinutes().remainder((60)));
  return ("" + hours + ":" + mm + " " + a);
}
// ********** Code for StringUtils **************
function StringUtils() {}
StringUtils.parseInt = function(str, ifNull) {
  return (str == null) ? ifNull : Math.parseInt(str);
}
// ********** Code for utilslib_Uri **************
$inherits(utilslib_Uri, Uri);
function utilslib_Uri() {}
utilslib_Uri.encodeComponent = function(component) {
  if (component == null) return component;
  return component.replaceAll(":", "%3A").replaceAll("/", "%2F").replaceAll("?", "%3F").replaceAll("=", "%3D").replaceAll("&", "%26").replaceAll(" ", "%20");
}
// ********** Code for top level **************
//  ********** Library base **************
// ********** Code for CallbackData **************
function CallbackData(callback, minTime) {
  this.callback = callback;
  this.minTime = minTime;
  if (null == $globals.CallbackData__nextId) {
    $globals.CallbackData__nextId = (1);
  }
  this.id = $globals.CallbackData__nextId++;
}
CallbackData.prototype.get$callback = function() { return this.callback; };
CallbackData.prototype.get$id = function() { return this.id; };
CallbackData.prototype.ready = function(time) {
  return null == this.minTime || this.minTime <= time;
}
// ********** Code for AnimationScheduler **************
function AnimationScheduler() {
  this._frameCount = (0);
  this._webkitAnimationFrameMaybeAvailable = true;
  this._isMobileSafari = false;
  this._callbacks = new Array();
  if (this._isMobileSafari) {
    var element = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
    html_get$document().get$body().get$nodes().add(element);
    this._safariHackStyle = element.get$style();
    this._safariHackStyle.set$position("absolute");
  }
}
AnimationScheduler.prototype.cancelRequestAnimationFrame = function(id) {
  this._callbacks = this._callbacks.filter$1((function (e) {
    return e.id != id;
  })
  );
}
AnimationScheduler.prototype.requestAnimationFrame = function(callback, element, minTime) {
  var callbackData = new CallbackData(callback, minTime);
  this._requestAnimationFrameHelper(callbackData);
  return callbackData.get$id();
}
AnimationScheduler.prototype._requestAnimationFrameHelper = function(callbackData) {
  this._callbacks.add(callbackData);
  if (null == this._intervalId) {
    this._setupInterval();
  }
}
AnimationScheduler.prototype._setupInterval = function() {
  var $this = this; // closure support
  if (false) {
    this._intervalId = html_get$window().setInterval(this.get$_base_step(), (16));
  }
  else {
    if (this._webkitAnimationFrameMaybeAvailable) {
      try {
        this._intervalId = html_get$window().webkitRequestAnimationFrame((function (ignored) {
          $this._base_step();
        })
        , html_get$document());
      } catch (e) {
        e = _toDartException(e);
        this._webkitAnimationFrameMaybeAvailable = false;
      }
    }
    if (!this._webkitAnimationFrameMaybeAvailable) {
      this._intervalId = html_get$window().setTimeout((function () {
        $this._base_step();
      })
      , (16));
    }
  }
}
AnimationScheduler.prototype._base_step = function() {
  if (this._callbacks.isEmpty()) {
    if (false) {
      html_get$window().clearInterval(this._intervalId);
    }
    this._intervalId = null;
  }
  else if (true) {
    this._intervalId = null;
    this._setupInterval();
  }
  var numRemaining = (0);
  var minTime = new DateImplementation.now$ctor().value + (16);
  var len = this._callbacks.get$length();
  var $$list = this._callbacks;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var callback = $$i.next();
    if (!callback.ready(minTime)) {
      numRemaining++;
    }
  }
  if (numRemaining == len) {
    return;
  }
  var currentCallbacks = this._callbacks;
  this._callbacks = new Array();
  for (var $$i = currentCallbacks.iterator(); $$i.hasNext(); ) {
    var callbackData = $$i.next();
    if (callbackData.ready(minTime)) {
      try {
        (callbackData.get$callback())(minTime);
      } catch (e) {
        e = _toDartException(e);
        var msg = e.toString();
        dart_core_print(("Suppressed exception " + msg + " triggered by callback"));
      }
    }
    else {
      this._callbacks.add(callbackData);
    }
  }
  this._frameCount++;
  if (this._isMobileSafari) {
    var offset = $mod(this._frameCount, (2));
    this._safariHackStyle.set$left(("" + offset + "px"));
  }
}
AnimationScheduler.prototype.get$_base_step = function() {
  return this._base_step.bind(this);
}
// ********** Code for Device **************
function Device() {}
Device.get$userAgent = function() {
  return html_get$window().get$navigator().get$userAgent();
}
Device.get$isMobileSafari = function() {
  return const$0008.hasMatch(Device.get$userAgent());
}
Device.get$isAndroid = function() {
  return Device.get$userAgent().contains("Android", (0));
}
Device.get$supportsTouch = function() {
  if ($globals.Device__supportsTouch == null) {
    $globals.Device__supportsTouch = Device.get$isMobileSafari() || Device.get$isAndroid();
  }
  return $globals.Device__supportsTouch;
}
// ********** Code for Env **************
function Env() {}
Env.requestAnimationFrame = function(callback, element, minTime) {
  if ($globals.Env__animationScheduler == null) {
    $globals.Env__animationScheduler = new AnimationScheduler();
  }
  return $globals.Env__animationScheduler.requestAnimationFrame(callback, element, minTime);
}
Env.cancelRequestAnimationFrame = function(id) {
  html_get$window().clearTimeout(id);
  $globals.Env__animationScheduler.cancelRequestAnimationFrame(id);
}
// ********** Code for Size **************
function Size(width, height) {
  this.width = width;
  this.height = height;
}
Size.prototype.get$width = function() { return this.width; };
Size.prototype.set$width = function(value) { return this.width = value; };
Size.prototype.get$height = function() { return this.height; };
Size.prototype.set$height = function(value) { return this.height = value; };
Size.prototype.$eq = function(other) {
  return null != other && this.width == other.width && this.height == other.height;
}
Size.prototype.round = function() {
  this.width = this.width.round();
  this.height = this.height.round();
  return this;
}
Size.prototype.toString = function() {
  return ("(" + this.width + " x " + this.height + ")");
}
// ********** Code for top level **************
//  ********** Library touch **************
// ********** Code for FxUtil **************
function FxUtil() {}
FxUtil.setPosition = function(el, point) {
  var x = point.x;
  var y = point.y;
  el.get$style().set$transform(("" + "translate3d" + "(" + x + "px," + y + "px,0px)"));
}
FxUtil.setTranslate = function(el, x, y, z) {
  el.get$style().set$transform(("" + "translate3d" + "(" + x + "px," + y + "px," + z + "px)"));
}
FxUtil.setWebkitTransform = function(el, x, y, z, rotation, scale, originX, originY) {
  var style = el.get$style();
  var transform = ("" + "translate3d" + "(" + x + "px," + y + "px," + z + "px)");
  if (null != rotation) {
    transform = transform.concat((" " + "rotate" + "(" + rotation + "deg)"));
  }
  if (null != scale) {
    transform = transform.concat((" " + "scale" + "(" + scale + ")"));
  }
  style.set$transform(transform);
  if (null != originX || null != originY) {
    style.set$transformOrigin(("" + originX + "px " + originY + "px"));
  }
}
FxUtil.computeRelativePosition = function(element, target) {
  var testPoint = PointFactoryProvider.Point$factory((0), (0));
  var pagePoint = html_get$window().webkitConvertPointFromNodeToPage(element, testPoint);
  var pointRelativeToTarget = html_get$window().webkitConvertPointFromPageToNode(target, pagePoint);
  return new Coordinate(pointRelativeToTarget.get$x(), pointRelativeToTarget.get$y());
}
FxUtil.setLeftAndTop = function(el, x, y) {
  var style = el.get$style();
  style.set$left(("" + x + "px"));
  style.set$top(("" + y + "px"));
}
// ********** Code for BouncingState **************
function BouncingState() {}
// ********** Code for _Move **************
function _Move(x, y, vx, vy, time) {
  this.time = time;
  this.x = x;
  this.vx = vx;
  this.y = y;
  this.vy = vy;
}
_Move.prototype.get$x = function() { return this.x; };
_Move.prototype.get$y = function() { return this.y; };
_Move.prototype.get$vx = function() { return this.vx; };
_Move.prototype.get$vy = function() { return this.vy; };
// ********** Code for Solver **************
function Solver() {}
Solver.solve = function(fn, targetY, startX, maxIterations) {
  var lastX = (0);
  var lastY = fn(lastX);
  var deltaX;
  var deltaY;
  var minX = null;
  var maxX = null;
  var x = startX;
  var delta = startX;
  for (var i = (0);
   i < maxIterations; i++) {
    var y = fn(x);
    if (y.round() == targetY.round()) {
      return x;
    }
    if (y > targetY) {
      maxX = x;
    }
    else {
      minX = x;
    }
    var errorY = targetY - y;
    deltaX = x - lastX;
    deltaY = y - lastY;
    lastX = x;
    lastY = y;
    if (deltaY != (0)) {
      delta = errorY * deltaX / deltaY;
    }
    x += delta;
    if (minX != null && maxX != null && (x > minX || x < maxX)) {
      x = (minX + maxX) / (2);
    }
  }
  html_get$window().get$console().warn(("Could not find an exact solution. LastY=" + lastY + ",\n        targetY=" + targetY + " lastX=" + lastX + " delta=" + delta + "  deltaX=" + deltaX + "\n        deltaY=" + deltaY));
  return x;
}
// ********** Code for SingleDimensionPhysics **************
function SingleDimensionPhysics() {
  this._bouncingState = (0);
  this.customDecelerationFactor = (1);
}
SingleDimensionPhysics.prototype.configure = function(minCoord, maxCoord, initialOffset, customDecelerationFactor_, velocity_) {
  this._bouncingState = (0);
  this._minCoord = minCoord;
  this._maxCoord = maxCoord;
  this._currentOffset = initialOffset;
  this.customDecelerationFactor = customDecelerationFactor_;
  this._adjustInitialVelocityAndBouncingState(velocity_);
}
SingleDimensionPhysics.prototype.solve = function(initialOffset, targetOffset, customDecelerationFactor_) {
  var $this = this; // closure support
  initialOffset = initialOffset.round();
  targetOffset = targetOffset.round();
  if (initialOffset == targetOffset) {
    return (0);
  }
  return Solver.solve((function (velocity_) {
    $this.configure(null, null, initialOffset.round(), customDecelerationFactor_, velocity_);
    $this.stepAll();
    return $this._currentOffset;
  })
  , targetOffset, targetOffset > initialOffset ? (20) : (-20), (50));
}
SingleDimensionPhysics.prototype._adjustInitialVelocityAndBouncingState = function(v) {
  this.velocity = v * (16.666666666666668) * (1.25);
  if (this.velocity.abs() < (4.166666666666667)) {
    if (null != this._minCoord && this._currentOffset < this._minCoord) {
      this.velocity = (this._minCoord - this._currentOffset) * (0.11666666666666667);
      this.velocity = Math.max(this.velocity, (0.16666666666666669));
      this._bouncingState = (2);
    }
    else if (null != this._maxCoord && this._currentOffset > this._maxCoord) {
      this.velocity = (this._currentOffset - this._maxCoord) * (0.11666666666666667);
      this.velocity = -Math.max(this.velocity, (0.16666666666666669));
      this._bouncingState = (2);
    }
  }
}
SingleDimensionPhysics.prototype._adjustVelocity = function() {
  var speed = this.velocity.abs();
  this.velocity = this.velocity * (0.97);
  if (this.customDecelerationFactor != null) {
    this.velocity = this.velocity * this.customDecelerationFactor;
  }
  if (speed < (1.3333333333333335)) {
    this.velocity = this.velocity * (0.92);
  }
  var stretchDistance;
  if (null != this._minCoord && this._currentOffset < this._minCoord) {
    stretchDistance = this._minCoord - this._currentOffset;
  }
  else {
    if (null != this._maxCoord && this._currentOffset > this._maxCoord) {
      stretchDistance = this._maxCoord - this._currentOffset;
    }
  }
  if (stretchDistance != null) {
    if (stretchDistance * this.velocity < (0)) {
      this._bouncingState = this._bouncingState == (2) ? (0) : (1);
      this.velocity = this.velocity + (stretchDistance * (0.11666666666666667));
    }
    else {
      this._bouncingState = (2);
      this.velocity = stretchDistance > (0) ? Math.max(stretchDistance * (0.11666666666666667), (0.16666666666666669)) : Math.min(stretchDistance * (0.11666666666666667), (-0.16666666666666669));
    }
  }
  else {
    this._bouncingState = (0);
  }
}
SingleDimensionPhysics.prototype.step = function() {
  if (null != this.velocity) {
    this._currentOffset = this._currentOffset + this.velocity;
    this._adjustVelocity();
  }
}
SingleDimensionPhysics.prototype.stepAll = function() {
  while (!this.isDone()) {
    this.step();
  }
}
SingleDimensionPhysics.prototype.isVelocityAboveThreshold = function(threshold) {
  return this.velocity.abs() >= threshold;
}
SingleDimensionPhysics.prototype.isDone = function() {
  return this._bouncingState == (0) && !this.isVelocityAboveThreshold((0.16666666666666669));
}
// ********** Code for TimeoutMomentum **************
function TimeoutMomentum(_delegate, defaultDecelerationFactor) {
  this.physicsX = new SingleDimensionPhysics();
  this._defaultDecelerationFactor = defaultDecelerationFactor;
  this._decelerating = false;
  this._moves = new DoubleLinkedQueue__Move();
  this._delegate = _delegate;
  this.physicsY = new SingleDimensionPhysics();
}
TimeoutMomentum.prototype._calculateMoves = function() {
  this._moves.clear();
  var time = TimeUtil.now();
  while (!this.physicsX.isDone() || !this.physicsY.isDone()) {
    this._stepWithoutAnimation();
    time += (16.666666666666668);
    if (this._isStepNecessary()) {
      this._moves.add(new _Move(this._nextX, this._nextY, this.physicsX.velocity, this.physicsY.velocity, time));
      this._previousOffset.y = this._nextY;
      this._previousOffset.x = this._nextX;
    }
  }
}
TimeoutMomentum.prototype.get$decelerating = function() {
  return this._decelerating;
}
TimeoutMomentum.prototype.get$decelerationFactor = function() {
  return this._customDecelerationFactor;
}
TimeoutMomentum.prototype._isStepNecessary = function() {
  return this._nextY != this._previousOffset.y || this._nextX != this._previousOffset.x;
}
TimeoutMomentum.prototype.calculateVelocity = function(start_, target, decelerationFactor) {
  return new Coordinate(this.physicsX.solve(start_.x, target.x, decelerationFactor), this.physicsY.solve(start_.y, target.y, decelerationFactor));
}
TimeoutMomentum.prototype.start = function(velocity, minCoord, maxCoord, initialOffset, decelerationFactor) {
  this._customDecelerationFactor = this._defaultDecelerationFactor;
  if (null != decelerationFactor) {
    this._customDecelerationFactor = decelerationFactor;
  }
  if (null != this._stepTimeout) {
    Env.cancelRequestAnimationFrame(this._stepTimeout);
    this._stepTimeout = null;
  }
  this._previousOffset = initialOffset.clone();
  this.physicsX.configure(minCoord.x, maxCoord.x, initialOffset.x, this._customDecelerationFactor, velocity.x);
  this.physicsY.configure(minCoord.y, maxCoord.y, initialOffset.y, this._customDecelerationFactor, velocity.y);
  if (!this.physicsX.isDone() || !this.physicsY.isDone()) {
    this._calculateMoves();
    if (!this._moves.isEmpty()) {
      var firstTime = this._moves.first().time;
      this._stepTimeout = Env.requestAnimationFrame(this.get$_step(), null, firstTime);
      this._decelerating = true;
      return true;
    }
  }
  this._decelerating = false;
  return false;
}
TimeoutMomentum.prototype.start.$optional = ['decelerationFactor', 'null']
TimeoutMomentum.prototype.get$start = function() {
  return this.start.bind(this);
}
TimeoutMomentum.prototype._stepWithoutAnimation = function() {
  this.physicsX.step();
  this.physicsY.step();
  this._nextX = this.physicsX._currentOffset.round().toInt();
  this._nextY = this.physicsY._currentOffset.round().toInt();
}
TimeoutMomentum.prototype._step = function(timestamp) {
  var $0;
  this._stepTimeout = null;
  var lastEpoch = timestamp - (16.666666666666668);
  while (!this._moves.isEmpty() && (($0 = this._moves.first()) == null ? null != (this._moves.last()) : $0 !== this._moves.last()) && this._moves.first().time < lastEpoch) {
    this._moves.removeFirst();
  }
  if (!this._moves.isEmpty()) {
    var move = this._moves.removeFirst();
    this._delegate.onDecelerate(move.get$x(), move.get$y());
    if (!this._moves.isEmpty()) {
      var nextTime = this._moves.first().time;
      this._stepTimeout = Env.requestAnimationFrame(this.get$_step(), null, nextTime);
    }
    else {
      this.stop();
    }
  }
}
TimeoutMomentum.prototype.get$_step = function() {
  return this._step.bind(this);
}
TimeoutMomentum.prototype.abort = function() {
  this._decelerating = false;
  this._moves.clear();
  if (null != this._stepTimeout) {
    Env.cancelRequestAnimationFrame(this._stepTimeout);
    this._stepTimeout = null;
  }
}
TimeoutMomentum.prototype.stop = function() {
  var wasDecelerating = this._decelerating;
  this._decelerating = false;
  var velocity;
  if (!this._moves.isEmpty()) {
    var move = this._moves.first();
    var velocityScale = (20.833333333333336);
    velocity = new Coordinate(move.get$vx() / velocityScale, move.get$vy() / velocityScale);
  }
  else {
    velocity = new Coordinate((0), (0));
  }
  this._moves.clear();
  if (null != this._stepTimeout) {
    Env.cancelRequestAnimationFrame(this._stepTimeout);
    this._stepTimeout = null;
  }
  if (wasDecelerating) {
    this._delegate.onDecelerationEnd();
  }
  return velocity;
}
TimeoutMomentum.prototype.get$destination = function() {
  if (!this._moves.isEmpty()) {
    var lastMove = this._moves.last();
    return new Coordinate(lastMove.get$x(), lastMove.get$y());
  }
  else {
    return null;
  }
}
// ********** Code for Scroller **************
function Scroller(scrollableElem, verticalEnabled, horizontalEnabled, momentumEnabled, lookupContentSizeDelegate, defaultDecelerationFactor, scrollTechnique, capture) {
  var $this = this; // closure support
  this._scrollTechnique = null != scrollTechnique ? scrollTechnique : (1);
  this.horizontalEnabled = horizontalEnabled;
  this._minPoint = new Coordinate((0), (0));
  this._minOffset = new Coordinate((0), (0));
  this._maxPoint = new Coordinate((0), (0));
  this._maxOffset = new Coordinate((0), (0));
  this._lookupContentSizeDelegate = lookupContentSizeDelegate;
  this._frame = scrollableElem.get$parent();
  this._element = scrollableElem;
  this._contentOffset = new Coordinate((0), (0));
  this._activeGesture = false;
  this._isStopping = false;
  this.verticalEnabled = verticalEnabled;
  this._started = false;
  this._momentumEnabled = momentumEnabled;
  this._touchHandler = new TouchHandler(this, scrollableElem.get$parent());
  this._momentum = new TimeoutMomentum(this, defaultDecelerationFactor);
  var parentElem = scrollableElem.get$parent();
  this._setOffsetFunction = Scroller._getOffsetFunction(this._scrollTechnique);
  this._touchHandler.setDraggable(this);
  this._touchHandler.enable(capture);
  this._frame.get$on().get$mouseWheel().add$1((function (e) {
    if (e.get$wheelDeltaY() != (0) && $this.verticalEnabled || e.get$wheelDeltaX() != (0) && $this.horizontalEnabled) {
      var x = $this.horizontalEnabled ? e.get$wheelDeltaX() : (0);
      var y = $this.verticalEnabled ? e.get$wheelDeltaY() : (0);
      $this.throwDelta(x, y, (0.84));
      e.preventDefault();
    }
  })
  );
  this._frame.get$on().get$keyDown().add$1((function (e) {
    var handled = false;
    switch (e.get$keyCode()) {
      case (33):

        $this.throwDelta((0), $this._scrollSize.height * (0.85));
        handled = true;
        break;

      case (34):

        $this.throwDelta((0), -$this._scrollSize.height * (0.85));
        handled = true;
        break;

      case (35):

        $this.throwTo($this._maxPoint.x, $this._minPoint.y, (0.84));
        handled = true;
        break;

      case (36):

        $this.throwTo($this._maxPoint.x, $this._maxPoint.y, (0.84));
        handled = true;
        break;

    }
    if (handled) {
      e.preventDefault();
    }
  })
  );
  if (this._scrollTechnique == (2)) {
    this._element.get$computedStyle().then((function (style) {

    })
    );
  }
  this._initLayer();
}
Scroller.prototype.get$onScrollerStart = function() {
  if (null == this._onScrollerStart) {
    this._onScrollerStart = new SimpleEventListenerList();
  }
  return this._onScrollerStart;
}
Scroller.prototype.get$onScrollerEnd = function() {
  if (null == this._onScrollerEnd) {
    this._onScrollerEnd = new SimpleEventListenerList();
  }
  return this._onScrollerEnd;
}
Scroller.prototype.get$onScrollerDragEnd = function() {
  if (null == this._onScrollerDragEnd) {
    this._onScrollerDragEnd = new SimpleEventListenerList();
  }
  return this._onScrollerDragEnd;
}
Scroller.prototype.get$onContentMoved = function() {
  if (null == this._onContentMoved) {
    this._onContentMoved = new SimpleEventListenerList();
  }
  return this._onContentMoved;
}
Scroller.prototype.get$onDecelStart = function() {
  if (null == this._onDecelStart) {
    this._onDecelStart = new SimpleEventListenerList();
  }
  return this._onDecelStart;
}
Scroller.prototype.addScrollListener = function(listener) {
  if (null == this._scrollWatcher) {
    this._scrollWatcher = new ScrollWatcher(this);
    this._scrollWatcher.initialize();
  }
  this._scrollWatcher.addListener(listener);
}
Scroller.prototype._adjustValue = function(newPosition, minPosition, maxPosition) {
  if (newPosition < minPosition) {
    newPosition -= ((newPosition - minPosition) / (2));
  }
  else {
    if (newPosition > maxPosition) {
      newPosition -= ((newPosition - maxPosition) / (2));
    }
  }
  return newPosition;
}
Scroller.prototype.get$currentTarget = function() {
  var end = this._momentum.get$destination();
  if (null == end) {
    end = this._contentOffset;
  }
  return end;
}
Scroller.prototype.get$contentOffset = function() {
  return this._contentOffset;
}
Scroller.prototype.throwTo = function(x, y, decelerationFactor) {
  var $this = this; // closure support
  this.reconfigure((function () {
    var snappedTarget = $this._snapToBounds(x, y);
    if (decelerationFactor == null) {
      decelerationFactor = $this._momentum.get$decelerationFactor();
    }
    if ($ne(snappedTarget, $this.get$currentTarget())) {
      $this._momentum.abort();
      $this._startDeceleration($this._momentum.calculateVelocity($this._contentOffset, snappedTarget, decelerationFactor), decelerationFactor);
      $this.get$onDecelStart().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:decel_start", true, true));
    }
  })
  );
}
Scroller.prototype.throwDelta = function(deltaX, deltaY, decelerationFactor) {
  var start = this._contentOffset;
  var end = this.get$currentTarget();
  var x = end.x.toInt();
  var y = end.y.toInt();
  if (deltaX != (0) && $ne(deltaX.isNegative(), (end.x - start.x).isNegative())) {
    x = start.x;
  }
  if (deltaY != (0) && $ne(deltaY.isNegative(), (end.y - start.y).isNegative())) {
    y = start.y;
  }
  x += deltaX.toInt();
  y += deltaY.toInt();
  this.throwTo(x, y, decelerationFactor);
}
Scroller.prototype.setPosition = function(x, y) {
  this._momentum.abort();
  this._contentOffset.x = x;
  this._contentOffset.y = y;
  this._snapContentOffsetToBounds();
  this._setContentOffset(this._contentOffset.x, this._contentOffset.y);
}
Scroller.prototype._getAdjustedContentSize = function() {
  return new Size(Math.max(this._scrollSize.width, this._contentSize.width), Math.max(this._scrollSize.height, this._contentSize.height));
}
Scroller.prototype.getElement = function() {
  return this._element;
}
Scroller.prototype.getFrame = function() {
  return this._frame;
}
Scroller.prototype.getHorizontalOffset = function() {
  return this._contentOffset.x;
}
Scroller.prototype.getHorizontalScrollPercent = function(x) {
  x = null != x ? x : this._contentOffset.x;
  return (x - this._minPoint.x) / (this._maxPoint.x - this._minPoint.x);
}
Scroller.prototype.getVerticalOffset = function() {
  return this._contentOffset.y;
}
Scroller.prototype.getVerticalScrollPercent = function(y) {
  y = null != y ? y : this._contentOffset.y;
  return (y - this._minPoint.y) / Math.max((1), this._maxPoint.y - this._minPoint.y);
}
Scroller.prototype._initLayer = function() {
  this._setContentOffset(this._maxPoint.x, this._maxPoint.y);
}
Scroller.prototype.onDecelerate = function(x, y) {
  this._setContentOffset(x, y);
}
Scroller.prototype.onDecelerationEnd = function() {
  this.get$onScrollerEnd().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:scroll_end", true, true));
  this._started = false;
}
Scroller.prototype.onDragEnd = function() {
  $globals.Scroller__dragInProgress = false;
  var decelerating = false;
  if (this._activeGesture) {
    if (this._momentumEnabled) {
      decelerating = this._startDeceleration(this._touchHandler.getEndVelocity());
    }
  }
  this.get$onScrollerDragEnd().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:drag_end", true, true));
  if (!decelerating) {
    this._snapContentOffsetToBounds();
    this.get$onScrollerEnd().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:scroll_end", true, true));
    this._started = false;
  }
  else {
    this.get$onDecelStart().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:decel_start", true, true));
  }
  this._activeGesture = false;
}
Scroller.prototype.onDragMove = function() {
  if (this._isStopping || (!this._activeGesture && $globals.Scroller__dragInProgress)) {
    return;
  }
  var contentStart = this._contentStartOffset;
  var newX = contentStart.x + this._touchHandler.getDragDeltaX();
  var newY = contentStart.y + this._touchHandler.getDragDeltaY();
  newY = this._shouldScrollVertically() ? this._adjustValue(newY, this._minPoint.y, this._maxPoint.y) : (0);
  newX = this._shouldScrollHorizontally() ? this._adjustValue(newX, this._minPoint.x, this._maxPoint.x) : (0);
  if (!this._activeGesture) {
    this._activeGesture = true;
    $globals.Scroller__dragInProgress = true;
  }
  if (!this._started) {
    this._started = true;
    this.get$onScrollerStart().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:scroll_start", true, true));
  }
  this._setContentOffset(newX, newY);
}
Scroller.prototype.onDragStart = function(e) {
  if ($gt(e.get$touches().get$length(), (1))) {
    return false;
  }
  var shouldHorizontal = this._shouldScrollHorizontally();
  var shouldVertical = this._shouldScrollVertically();
  var verticalish = this._touchHandler.getDragDeltaY().abs() > this._touchHandler.getDragDeltaX().abs();
  return !!(shouldVertical || shouldHorizontal && !verticalish);
}
Scroller.prototype.onTouchEnd = function() {

}
Scroller.prototype.onTouchStart = function(e) {
  var $this = this; // closure support
  this.reconfigure((function () {
    var touch = e.get$touches().$index((0));
    if ($this._momentum.get$decelerating()) {
      e.preventDefault();
      e.stopPropagation();
      $this.stop();
    }
    $this._contentStartOffset = $this._contentOffset.clone();
    $this._snapContentOffsetToBounds();
  })
  );
  return true;
}
Scroller.prototype.reconfigure = function(callback) {
  var $this = this; // closure support
  this._resize((function () {
    $this._snapContentOffsetToBounds();
    callback();
  })
  );
}
Scroller.prototype._resize = function(callback) {
  var $this = this; // closure support
  var frameRect = this._frame.get$rect();
  var contentSizeFuture;
  if (null != this._lookupContentSizeDelegate) {
    contentSizeFuture = this._lookupContentSizeDelegate.call$0();
    contentSizeFuture.then((function (size) {
      $this._contentSize = size;
    })
    );
  }
  else {
    contentSizeFuture = this._element.get$rect();
    contentSizeFuture.then((function (rect) {
      $this._contentSize = new Size(rect.scroll.get$width(), rect.scroll.get$height());
    })
    );
  }
  joinFutures([frameRect, contentSizeFuture], (function () {
    $this._scrollSize = new Size(frameRect.get$value().get$offset().get$width(), frameRect.get$value().get$offset().get$height());
    var adjusted = $this._getAdjustedContentSize();
    $this._maxPoint = new Coordinate(-$this._maxOffset.x, -$this._maxOffset.y);
    $this._minPoint = new Coordinate(Math.min($this._scrollSize.width - adjusted.width + $this._minOffset.x, $this._maxPoint.x), Math.min($this._scrollSize.height - adjusted.height + $this._minOffset.y, $this._maxPoint.y));
    callback();
  })
  );
}
Scroller.prototype._snapToBounds = function(x, y) {
  var clampX = GoogleMath.clamp(this._minPoint.x, x, this._maxPoint.x);
  var clampY = GoogleMath.clamp(this._minPoint.y, y, this._maxPoint.y);
  return new Coordinate(clampX, clampY);
}
Scroller.prototype._setContentOffset = function(x, y) {
  this._contentOffset.x = x;
  this._contentOffset.y = y;
  this._setOffsetFunction.call$3(this._element, x, y);
  this.get$onContentMoved().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:content_moved", true, true));
}
Scroller.prototype._shouldScrollHorizontally = function() {
  return this.horizontalEnabled && this._scrollSize.width < this._contentSize.width;
}
Scroller.prototype._shouldScrollVertically = function() {
  return this.verticalEnabled;
}
Scroller.prototype._snapContentOffsetToBounds = function() {
  var clampX = GoogleMath.clamp(this._minPoint.x, this._contentOffset.x, this._maxPoint.x);
  var clampY = GoogleMath.clamp(this._minPoint.y, this._contentOffset.y, this._maxPoint.y);
  if (this._contentOffset.x != clampX || this._contentOffset.y != clampY) {
    this._setContentOffset(clampX, clampY);
  }
}
Scroller.prototype._startDeceleration = function(velocity, decelerationFactor) {
  if (!this._shouldScrollHorizontally()) {
    velocity.x = (0);
  }
  if (!this._shouldScrollVertically()) {
    velocity.y = (0);
  }
  return this._momentum.start(velocity, this._minPoint, this._maxPoint, this._contentOffset, decelerationFactor);
}
Scroller.prototype.stop = function() {
  return this._momentum.stop();
}
Scroller._getOffsetFunction = function(scrollTechnique) {
  return scrollTechnique == (1) ? (function (el, x, y) {
    FxUtil.setTranslate(el, x, y, (0));
  })
   : (function (el, x, y) {
    FxUtil.setLeftAndTop(el, x, y);
  })
  ;
}
// ********** Code for ScrollerEventType **************
function ScrollerEventType() {}
// ********** Code for SimpleEventListenerList **************
function SimpleEventListenerList() {
  this._listeners = new Array();
}
SimpleEventListenerList.prototype.add = function(handler, useCapture) {
  this._add(handler, useCapture);
  return this;
}
SimpleEventListenerList.prototype.remove = function(handler, useCapture) {
  this._remove(handler, useCapture);
  return this;
}
SimpleEventListenerList.prototype._add = function(handler, useCapture) {
  this._listeners.add(handler);
}
SimpleEventListenerList.prototype._remove = function(handler, useCapture) {
  $throw("Not implemented yet.");
}
SimpleEventListenerList.prototype.dispatch = function(evt) {
  var $$list = this._listeners;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var listener = $$i.next();
    listener(evt);
  }
}
SimpleEventListenerList.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
SimpleEventListenerList.prototype.add$2 = function($0, $1) {
  return this.add(to$call$1($0), $1);
};
// ********** Code for ScrollerScrollTechnique **************
function ScrollerScrollTechnique() {}
// ********** Code for TouchHandler **************
function TouchHandler(touchable, element) {
  this._recentTouchesX = new Array();
  this._touchable = touchable;
  this._tracking = false;
  this._dragging = false;
  this._totalMoveY = (0);
  this._totalMoveX = (0);
  this._recentTouchesY = new Array();
  this._touching = false;
  this._element = element != null ? element : touchable.getElement();
}
TouchHandler.prototype._beginTracking = function() {
  this._tracking = true;
}
TouchHandler.prototype._endTracking = function() {
  this._tracking = false;
  this._dragging = false;
  this._totalMoveY = (0);
  this._totalMoveX = (0);
}
TouchHandler.prototype._correctVelocity = function(velocity) {
  var absVelocity = velocity.abs();
  if (absVelocity > (5)) {
    absVelocity = this._recentTouchesY.get$length() < (6) ? (1) : (5);
  }
  return absVelocity * (velocity < (0) ? (-1) : (1));
}
TouchHandler.prototype.enable = function(capture) {
  var $this = this; // closure support
  var onEnd = (function (e) {
    $this._onEnd(e.get$timeStamp(), e);
  })
  ;
  _addEventListeners(this._element, (function (e) {
    $this._onStart(e);
  })
  , (function (e) {
    $this._onMove(e);
  })
  , to$call$1(onEnd), to$call$1(onEnd), capture);
}
TouchHandler.prototype.getDragDeltaX = function() {
  return this._lastTouchX - this._startTouchX;
}
TouchHandler.prototype.getDragDeltaY = function() {
  return this._lastTouchY - this._startTouchY;
}
TouchHandler.prototype.getEndVelocity = function() {
  var velocityX = (0);
  var velocityY = (0);
  if (this._recentTouchesX.get$length() > (0)) {
    var timeDeltaX = Math.max((1), $sub(this._endTime, this._recentTouchesX.$index((1))));
    velocityX = ($sub(this._endTouchX, this._recentTouchesX.$index((0)))) / timeDeltaX;
  }
  if (this._recentTouchesY.get$length() > (0)) {
    var timeDeltaY = Math.max((1), $sub(this._endTime, this._recentTouchesY.$index((1))));
    velocityY = ($sub(this._endTouchY, this._recentTouchesY.$index((0)))) / timeDeltaY;
  }
  velocityX = this._correctVelocity(velocityX);
  velocityY = this._correctVelocity(velocityY);
  return new Coordinate(velocityX, velocityY);
}
TouchHandler.prototype._getLastTouch = function() {
  return this._lastEvent.get$touches().$index((0));
}
TouchHandler.prototype._onEnd = function(timeStamp, e) {
  this._touching = false;
  this._touchable.onTouchEnd();
  if (!this._tracking || null == this._draggable) {
    return;
  }
  var touch = this._getLastTouch();
  var clientX = touch.get$clientX();
  var clientY = touch.get$clientY();
  if (this._dragging) {
    this._endTime = timeStamp;
    this._endTouchX = clientX;
    this._endTouchY = clientY;
    this._recentTouchesX = this._removeOldTouches(this._recentTouchesX, timeStamp);
    this._recentTouchesY = this._removeOldTouches(this._recentTouchesY, timeStamp);
    this._draggable.onDragEnd();
    if (null != e) {
      e.preventDefault();
    }
    ClickBuster.preventGhostClick(this._startTouchX, this._startTouchY);
  }
  this._endTracking();
}
TouchHandler.prototype._onMove = function(e) {
  if (!this._tracking || null == this._draggable) {
    return;
  }
  var touch = e.get$touches().$index((0));
  var clientX = touch.get$clientX();
  var clientY = touch.get$clientY();
  var moveX = this._lastTouchX - clientX;
  var moveY = this._lastTouchY - clientY;
  this._totalMoveX = this._totalMoveX + moveX.abs();
  this._totalMoveY = this._totalMoveY + moveY.abs();
  this._lastTouchX = clientX;
  this._lastTouchY = clientY;
  if (!this._dragging && ((this._totalMoveY > (2) && this._draggable.verticalEnabled) || (this._totalMoveX > (2) && this._draggable.horizontalEnabled))) {
    this._dragging = this._draggable.onDragStart(e);
    if (!this._dragging) {
      this._endTracking();
    }
    else {
      this._startTouchX = clientX;
      this._startTouchY = clientY;
      this._startTime = e.get$timeStamp();
    }
  }
  if (this._dragging) {
    this._draggable.onDragMove();
    this._lastEvent = e;
    e.preventDefault();
    this._recentTouchesX = this._removeTouchesInWrongDirection(this._recentTouchesX, this._lastMoveX, moveX);
    this._recentTouchesY = this._removeTouchesInWrongDirection(this._recentTouchesY, this._lastMoveY, moveY);
    this._recentTouchesX = this._removeOldTouches(this._recentTouchesX, e.get$timeStamp());
    this._recentTouchesY = this._removeOldTouches(this._recentTouchesY, e.get$timeStamp());
    this._recentTouchesX.add(clientX);
    this._recentTouchesX.add(e.get$timeStamp());
    this._recentTouchesY.add(clientY);
    this._recentTouchesY.add(e.get$timeStamp());
  }
  this._lastMoveX = moveX;
  this._lastMoveY = moveY;
}
TouchHandler.prototype._onStart = function(e) {
  var $0, $1;
  if (this._touching) {
    return;
  }
  this._touching = true;
  if (!this._touchable.onTouchStart(e) || null == this._draggable) {
    return;
  }
  var touch = e.get$touches().$index((0));
  this._startTouchX = (this._lastTouchX = ($0 = touch.get$clientX()), $0);
  this._startTouchY = (this._lastTouchY = ($1 = touch.get$clientY()), $1);
  this._startTime = e.get$timeStamp();
  this._recentTouchesX = new Array();
  this._recentTouchesY = new Array();
  this._recentTouchesX.add(touch.get$clientX());
  this._recentTouchesX.add(e.get$timeStamp());
  this._recentTouchesY.add(touch.get$clientY());
  this._recentTouchesY.add(e.get$timeStamp());
  this._lastEvent = e;
  this._beginTracking();
}
TouchHandler.prototype._removeOldTouches = function(recentTouches, recentTime) {
  var count = (0);
  var len = recentTouches.get$length();
  while ($lt(count, len) && $sub(recentTime, recentTouches.$index(count + (1))) > (250) || ($sub(len, count)) > (10)) {
    count += (2);
  }
  return count == (0) ? recentTouches : TouchHandler._removeFirstN(recentTouches, count);
}
TouchHandler._removeFirstN = function(list, n) {
  return list.getRange(n, list.get$length() - n);
}
TouchHandler.prototype._removeTouchesInWrongDirection = function(recentTouches, lastMove, recentMove) {
  if (lastMove != (0) && recentMove != (0) && recentTouches.get$length() > (2) && TouchHandler._xor(lastMove > (0), recentMove > (0))) {
    return TouchHandler._removeFirstN(recentTouches, recentTouches.get$length() - (2));
  }
  return recentTouches;
}
TouchHandler._xor = function(a, b) {
  return ((null == a ? null == (true) : a === true) || (null == b ? null == (true) : b === true)) && !((null == a ? null == (true) : a === true) && (null == b ? null == (true) : b === true));
}
TouchHandler.prototype.setDraggable = function(draggable) {
  this._draggable = draggable;
}
// ********** Code for ClickBuster **************
function ClickBuster() {}
ClickBuster._onClick = function(e) {
  if (TimeUtil.now() - $globals.ClickBuster__lastPreventedTime > (2500)) {
    return;
  }
  var coord = new Coordinate.fromClient$ctor(e);
  var entry = $globals.ClickBuster__coordinates.firstEntry();
  while ($ne(entry)) {
    if (ClickBuster._hitTest(entry.get$element(), entry.nextEntry().get$element(), coord.get$x(), coord.get$y())) {
      entry.nextEntry().remove();
      entry.remove$0();
      return;
    }
    else {
      entry = entry.nextEntry().nextEntry();
    }
  }
  e.stopPropagation();
  e.preventDefault();
}
ClickBuster._onTouchStart = function(e) {
  var te = e;
  var coord = new Coordinate.fromClient$ctor(te.get$touches().$index((0)));
  $globals.ClickBuster__coordinates.add$1(coord.get$x());
  $globals.ClickBuster__coordinates.add$1(coord.get$y());
  html_get$window().setTimeout((function () {
    ClickBuster._removeCoordinate(coord.get$x(), coord.get$y());
  })
  , (2500));
  ClickBuster._toggleTapHighlights(true);
}
ClickBuster._hitTest = function(x, y, eventX, eventY) {
  return (eventX - x).abs() < (25) && (eventY - y).abs() < (25);
}
ClickBuster._removeCoordinate = function(x, y) {
  var entry = $globals.ClickBuster__coordinates.firstEntry();
  while ($ne(entry)) {
    if ($eq(entry.get$element(), x) && $eq(entry.nextEntry().get$element(), y)) {
      entry.nextEntry().remove();
      entry.remove$0();
      return;
    }
    else {
      entry = entry.nextEntry().nextEntry();
    }
  }
}
ClickBuster._toggleTapHighlights = function(enable) {
  html_get$document().get$body().get$style().setProperty("-webkit-tap-highlight-color", enable ? "" : "rgba(0,0,0,0)", "");
}
ClickBuster.preventGhostClick = function(x, y) {
  if (null == $globals.ClickBuster__coordinates) {
    html_get$document().get$on().get$click().add((function (e) {
      ClickBuster._onClick(e);
    })
    , true);
    html_get$document().get$on().get$focus().add((function (e) {
      $globals.ClickBuster__lastPreventedTime = (0);
    })
    , true);
    var startFn = (function (e) {
      ClickBuster._onTouchStart(e);
    })
    ;
    if (!Device.get$supportsTouch()) {
      startFn = mouseToTouchCallback(to$call$1(startFn));
    }
    EventUtil.observe(html_get$document(), Device.get$supportsTouch() ? html_get$document().get$on().get$touchStart() : html_get$document().get$on().get$mouseDown(), startFn, true, true);
    $globals.ClickBuster__coordinates = new DoubleLinkedQueue_num();
  }
  ClickBuster._toggleTapHighlights(false);
  $globals.ClickBuster__lastPreventedTime = TimeUtil.now();
  var entry = $globals.ClickBuster__coordinates.firstEntry();
  while ($ne(entry)) {
    if (ClickBuster._hitTest(entry.get$element(), entry.nextEntry().get$element(), x, y)) {
      entry.nextEntry().remove();
      entry.remove$0();
      return;
    }
    else {
      entry = entry.nextEntry().nextEntry();
    }
  }
}
// ********** Code for EventUtil **************
function EventUtil() {}
EventUtil.observe = function(element, listenerList, handler, capture, removeHandlerOnFocus) {
  listenerList.add(handler, capture);
  if (removeHandlerOnFocus) {
    element.get$on().get$focus().add$1((function (e) {
      listenerList.remove(handler, capture);
    })
    );
    element.get$on().get$blur().add$1((function (e) {
      listenerList.add(handler, capture);
    })
    );
  }
}
// ********** Code for Coordinate **************
function Coordinate(x, y) {
  this.y = y;
  this.x = x;
}
Coordinate.fromClient$ctor = function(input) {
  Coordinate.call(this, input.get$clientX(), input.get$clientY());
}
Coordinate.fromClient$ctor.prototype = Coordinate.prototype;
Coordinate.prototype.get$x = function() { return this.x; };
Coordinate.prototype.get$y = function() { return this.y; };
Coordinate.prototype.$eq = function(other) {
  return null != other && this.x == other.x && this.y == other.y;
}
Coordinate.prototype.clone = function() {
  return new Coordinate(this.x, this.y);
}
Coordinate.prototype.toString = function() {
  return ("(" + this.x + ", " + this.y + ")");
}
// ********** Code for Interval **************
function Interval(start, end) {
  this.start = start;
  this.end = end;
}
Interval.prototype.get$start = function() { return this.start; };
Interval.prototype.get$end = function() { return this.end; };
Interval.prototype.get$length = function() {
  return this.end - this.start;
}
Interval.prototype.$eq = function(other) {
  return null != other && other.start == this.start && other.end == this.end;
}
Interval.prototype.union = function(other) {
  return new Interval(Math.min(this.start, other.start), Math.max(this.end, other.end));
}
Interval.prototype.contains = function(value) {
  return value >= this.start && value < this.end;
}
Interval.prototype.toString = function() {
  return ("(" + this.start + ", " + this.end + ")");
}
Interval.prototype.contains$1 = Interval.prototype.contains;
// ********** Code for GoogleMath **************
function GoogleMath() {}
GoogleMath.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
// ********** Code for Scrollbar **************
function Scrollbar(scroller, displayOnHover) {
  var $this = this; // closure support
  this._scrollInProgress = false;
  this._scrollBarDragInProgressValue = false;
  this._displayOnHover = displayOnHover;
  this._frame = scroller.getFrame();
  this._hovering = false;
  this._scroller = scroller;
  this._cachedSize = new HashMapImplementation_String$num();
  this._boundHideFn = (function () {
    $this._showScrollbars(false);
  })
  ;
}
Scrollbar.prototype.get$_scrollBarDragInProgress = function() {
  return this._scrollBarDragInProgressValue;
}
Scrollbar.prototype.set$_scrollBarDragInProgress = function(value) {
  this._scrollBarDragInProgressValue = value;
  this._toggleClass(this._verticalElement, "drag", value && this._currentScrollVertical);
  this._toggleClass(this._horizontalElement, "drag", value && !this._currentScrollVertical);
}
Scrollbar.prototype._toggleClass = function(e, className, enabled) {
  if (enabled) {
    if (!e.get$classes().contains(className)) {
      e.get$classes().add(className);
    }
  }
  else {
    e.get$classes().remove(className);
  }
}
Scrollbar.prototype.initialize = function() {
  var $this = this; // closure support
  if (this._verticalElement != null) {
    return;
  }
  this._verticalElement = ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"touch-scrollbar touch-scrollbar-vertical\"></div>");
  this._horizontalElement = ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"touch-scrollbar touch-scrollbar-horizontal\"></div>");
  this._scroller.addScrollListener(this);
  var scrollerEl = this._scroller.getElement();
  if (!Device.get$supportsTouch()) {
    _addEventListeners(this._verticalElement, this.get$_onStart(), this.get$_onMove(), this.get$_onEnd(), this.get$_onEnd(), true);
    _addEventListeners(this._horizontalElement, this.get$_onStart(), this.get$_onMove(), this.get$_onEnd(), this.get$_onEnd(), true);
  }
  this._scroller.addScrollListener(this);
  this._showScrollbars(false);
  this._scroller.get$onScrollerStart().add$1(this.get$_onScrollerStart());
  this._scroller.get$onScrollerEnd().add$1(this.get$_onScrollerEnd());
  if (this._displayOnHover) {
    this._frame.get$on().get$click().add$2((function (e) {
      if (!$this._frame.contains(html_get$document().get$activeElement())) {
        scrollerEl.focus();
      }
    })
    , false);
    this._frame.get$on().get$mouseOver().add((function (e) {
      var activeElement = html_get$document().get$activeElement();
      if (!!(activeElement && activeElement.is$BodyElement()) || (!$this._frame.contains(activeElement) && !!(activeElement && activeElement.is$DivElement()))) {
        scrollerEl.focus();
      }
      if ($eq($this._hovering, false)) {
        $this._hovering = true;
        $this._cancelTimeout();
        $this._showScrollbars(true);
        $this.refresh();
      }
    })
    , false);
    this._frame.get$on().get$mouseOut().add((function (e) {
      $this._hovering = false;
      if (!$this._scrollInProgress && $this._timerId == null) {
        $this._boundHideFn.call$0();
      }
    })
    , false);
  }
}
Scrollbar.prototype._onStart = function(e) {
  var elementOver = e.get$target();
  if ($eq(elementOver, this._verticalElement) || $eq(elementOver, this._horizontalElement)) {
    this._currentScrollVertical = $eq(elementOver, this._verticalElement);
    if (this._currentScrollVertical) {
      this._currentScrollStartMouse = e.get$pageY();
      this._currentScrollStartOffset = this._scroller.getVerticalOffset();
    }
    else {
      this._currentScrollStartMouse = e.get$pageX();
      this._currentScrollStartOffset = this._scroller.getHorizontalOffset();
    }
    this._refreshScrollRatio();
    this.set$_scrollBarDragInProgress(true);
    this._scroller._momentum.abort();
    e.stopPropagation();
  }
}
Scrollbar.prototype.get$_onStart = function() {
  return this._onStart.bind(this);
}
Scrollbar.prototype._refreshScrollRatio = function() {
  var contentSize = this._scroller._getAdjustedContentSize();
  if (this._currentScrollVertical) {
    this._refreshScrollRatioHelper(this._scroller._scrollSize.height, contentSize.height);
  }
  else {
    this._refreshScrollRatioHelper(this._scroller._scrollSize.width, contentSize.width);
  }
}
Scrollbar.prototype._refreshScrollRatioHelper = function(frameSize, contentSize) {
  var frameTravelDistance = frameSize - this._defaultScrollSize(frameSize, contentSize) - (20);
  if (frameTravelDistance < (0.001)) {
    this._currentScrollRatio = (0);
  }
  else {
    this._currentScrollRatio = (contentSize - frameSize) / frameTravelDistance;
  }
}
Scrollbar.prototype._onMove = function(e) {
  if (!this.get$_scrollBarDragInProgress()) {
    return;
  }
  this._refreshScrollRatio();
  var coordinate = this._currentScrollVertical ? e.get$pageY() : e.get$pageX();
  var delta = (coordinate - this._currentScrollStartMouse) * this._currentScrollRatio;
  if (delta != (0)) {
    var x;
    var y;
    this._currentScrollStartOffset = this._currentScrollStartOffset - delta;
    if (this._currentScrollVertical) {
      x = this._scroller.getHorizontalOffset();
      y = this._currentScrollStartOffset.toInt();
    }
    else {
      x = this._currentScrollStartOffset.toInt();
      y = this._scroller.getVerticalOffset();
    }
    this._scroller.setPosition(x, y);
  }
  this._currentScrollStartMouse = coordinate;
}
Scrollbar.prototype.get$_onMove = function() {
  return this._onMove.bind(this);
}
Scrollbar.prototype._onEnd = function(e) {
  this.set$_scrollBarDragInProgress(false);
  this._scroller.get$onScrollerDragEnd().dispatch(EventWrappingImplementation.EventWrappingImplementation$factory("scroller:drag_end", true, true));
}
Scrollbar.prototype.get$_onEnd = function() {
  return this._onEnd.bind(this);
}
Scrollbar.prototype._onScrollerEnd = function(e) {
  this._cancelTimeout();
  this._timerId = html_get$window().setTimeout(to$call$0(this._boundHideFn), (300));
  this._scrollInProgress = false;
}
Scrollbar.prototype.get$_onScrollerEnd = function() {
  return this._onScrollerEnd.bind(this);
}
Scrollbar.prototype.onScrollerMoved = function(scrollX, scrollY, decelerating) {
  if ($eq(this._scrollInProgress, false)) {
    this._onScrollerStart(null);
    this._onScrollerEnd(null);
  }
  this.updateScrollbars(scrollX, scrollY);
}
Scrollbar.prototype.refresh = function() {
  var $this = this; // closure support
  if ($eq(this._scrollInProgress, false) && $eq(this._hovering, false)) {
    return;
  }
  this._scroller._resize((function () {
    $this.updateScrollbars($this._scroller.getHorizontalOffset(), $this._scroller.getVerticalOffset());
  })
  );
}
Scrollbar.prototype.updateScrollbars = function(scrollX, scrollY) {
  var contentSize = this._scroller._getAdjustedContentSize();
  if (this._scroller._shouldScrollHorizontally()) {
    var scrollPercentX = this._scroller.getHorizontalScrollPercent(scrollX);
    this._updateScrollbar(this._horizontalElement, scrollX, scrollPercentX, this._scroller._scrollSize.width, contentSize.width, "right", "width");
  }
  if (this._scroller._shouldScrollVertically()) {
    var scrollPercentY = this._scroller.getVerticalScrollPercent(scrollY);
    this._updateScrollbar(this._verticalElement, scrollY, scrollPercentY, this._scroller._scrollSize.height, contentSize.height, "bottom", "height");
  }
}
Scrollbar.prototype._onScrollerStart = function(e) {
  this._scrollInProgress = true;
  this._cancelTimeout();
  this._showScrollbars(true);
}
Scrollbar.prototype.get$_onScrollerStart = function() {
  return this._onScrollerStart.bind(this);
}
Scrollbar.prototype._cancelTimeout = function() {
  if (this._timerId != null) {
    html_get$window().clearTimeout(this._timerId);
    this._timerId = null;
  }
}
Scrollbar.prototype._showScrollbars = function(show) {
  if ($eq(this._hovering, true) && this._displayOnHover) {
    show = true;
  }
  this._toggleOpacity(this._verticalElement, show);
  this._toggleOpacity(this._horizontalElement, show);
}
Scrollbar.prototype._toggleOpacity = function(element, show) {
  if (show) {
    element.get$style().removeProperty("opacity");
  }
  else {
    element.get$style().set$opacity("0");
  }
}
Scrollbar.prototype._defaultScrollSize = function(frameSize, contentSize) {
  return GoogleMath.clamp((frameSize - (20)) * frameSize / contentSize, (30), frameSize - (20));
}
Scrollbar.prototype._updateScrollbar = function(element, offset, scrollPercent, frameSize, contentSize, cssPos, cssSize) {
  if (!this._cachedSize.containsKey(cssSize)) {
    if (offset == null || contentSize < frameSize) {
      return;
    }
    this._frame.get$nodes().add(element);
  }
  var stretchPercent;
  if (scrollPercent > (1)) {
    stretchPercent = scrollPercent - (1);
  }
  else {
    stretchPercent = scrollPercent < (0) ? -scrollPercent : (0);
  }
  var scrollPx = stretchPercent * (contentSize - frameSize);
  var maxSize = this._defaultScrollSize(frameSize, contentSize);
  var size = Math.max((8), maxSize - scrollPx);
  var maxOffset = frameSize - size - (20);
  var pos = GoogleMath.clamp(scrollPercent * maxOffset, (0), maxOffset) + (10);
  pos = pos.round();
  size = size.round();
  var style = element.get$style();
  style.setProperty(cssPos, ("" + pos + "px"), "");
  if ($ne(this._cachedSize.$index(cssSize), size)) {
    this._cachedSize.$setindex(cssSize, size);
    style.setProperty(cssSize, ("" + size + "px"), "");
  }
  if ($eq(element.get$parent())) {
    this._frame.get$nodes().add(element);
  }
}
// ********** Code for ScrollWatcher **************
function ScrollWatcher(scroller) {
  this._scroller = scroller;
  this._listeners = new Array();
}
ScrollWatcher.prototype.addListener = function(listener) {
  this._listeners.add(listener);
}
ScrollWatcher.prototype._dispatchScroll = function(scrollX, scrollY, decelerating) {
  var $$list = this._listeners;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var listener = $$i.next();
    listener.onScrollerMoved(scrollX, scrollY, decelerating);
  }
}
ScrollWatcher.prototype.initialize = function() {
  var $this = this; // closure support
  this._scrollerEl = this._scroller.getElement();
  this._scroller.get$onContentMoved().add$1((function (e) {
    $this._onContentMoved(e);
  })
  );
}
ScrollWatcher.prototype._onContentMoved = function(e) {
  var scrollX = this._scroller.getHorizontalOffset();
  var scrollY = this._scroller.getVerticalOffset();
  this._dispatchScroll(scrollX, scrollY, false);
}
// ********** Code for TimeUtil **************
function TimeUtil() {}
TimeUtil.now = function() {
  return new DateImplementation.now$ctor().value;
}
// ********** Code for MockTouch **************
function MockTouch(wrapped) {
  this.wrapped = wrapped;
}
MockTouch.prototype.get$clientX = function() {
  return this.wrapped.get$clientX();
}
MockTouch.prototype.get$clientY = function() {
  return this.wrapped.get$clientY();
}
MockTouch.prototype.get$pageX = function() {
  return this.wrapped.get$pageX();
}
MockTouch.prototype.get$pageY = function() {
  return this.wrapped.get$pageY();
}
MockTouch.prototype.get$target = function() {
  return this.wrapped.get$target();
}
// ********** Code for MockTouchEvent **************
function MockTouchEvent(wrapped, touches, targetTouches, changedTouches) {
  this.targetTouches = targetTouches;
  this.touches = touches;
  this.changedTouches = changedTouches;
  this.wrapped = wrapped;
}
MockTouchEvent.prototype.get$touches = function() { return this.touches; };
MockTouchEvent.prototype.get$changedTouches = function() { return this.changedTouches; };
MockTouchEvent.prototype.get$target = function() {
  return this.wrapped.get$target();
}
MockTouchEvent.prototype.get$timeStamp = function() {
  return this.wrapped.get$timeStamp();
}
MockTouchEvent.prototype.get$type = function() {
  return this.wrapped.get$type();
}
MockTouchEvent.prototype.preventDefault = function() {
  this.wrapped.preventDefault();
}
MockTouchEvent.prototype.stopPropagation = function() {
  this.wrapped.stopPropagation();
}
MockTouchEvent.prototype.get$keyCode = function() {
  return this.wrapped.get$keyCode();
}
MockTouchEvent.prototype.get$pageX = function() {
  return this.wrapped.get$pageX();
}
MockTouchEvent.prototype.get$pageY = function() {
  return this.wrapped.get$pageY();
}
MockTouchEvent.prototype.get$view = function() {
  return this.wrapped.get$view();
}
// ********** Code for top level **************
function joinFutures(futures, callback) {
  var count = (0);
  var len = futures.get$length();
  function helper(value) {
    count++;
    if (count == len) {
      callback();
    }
  }
  for (var $$i = futures.iterator(); $$i.hasNext(); ) {
    var p = $$i.next();
    p.then(helper);
  }
}
function mouseToTouchCallback(callback) {
  return (function (e) {
    var touches = [];
    var targetTouches = [];
    var changedTouches = [];
    var mockTouch = new MockTouch(e);
    var mockTouchList = [mockTouch];
    if (e.get$type() == "mouseup") {
      changedTouches = mockTouchList;
    }
    else {
      touches = mockTouchList;
      targetTouches = mockTouchList;
    }
    callback(new MockTouchEvent(e, touches, targetTouches, changedTouches));
    e.preventDefault();
  })
  ;
}
function _addEventListeners(node, onStart, onMove, onEnd, onCancel, capture) {
  var removeListeners;
  function onEndWrapper(e) {
    removeListeners.call$0();
    return onEnd(e);
  }
  function onLeaveWrapper(e) {
    removeListeners.call$0();
    return onEnd(e);
  }
  function onCancelWrapper(e) {
    removeListeners.call$0();
    return onCancel(e);
  }
  if (Device.get$supportsTouch()) {
    removeListeners = (function () {
      html_get$document().get$on().get$touchMove().remove(onMove, capture);
      html_get$document().get$on().get$touchEnd().remove(onEndWrapper, capture);
      html_get$document().get$on().get$touchLeave().remove(onLeaveWrapper, capture);
      html_get$document().get$on().get$touchCancel().remove(onCancelWrapper, capture);
    })
    ;
    node.get$on().get$touchStart().add((function (e) {
      html_get$document().get$on().get$touchMove().add(onMove, capture);
      html_get$document().get$on().get$touchEnd().add(onEndWrapper, capture);
      html_get$document().get$on().get$touchLeave().add(onLeaveWrapper, capture);
      html_get$document().get$on().get$touchCancel().add(onCancelWrapper, capture);
      return onStart(e);
    })
    , capture);
  }
  else {
    onStart = mouseToTouchCallback(onStart);
    onMove = mouseToTouchCallback(onMove);
    onEnd = mouseToTouchCallback(onEnd);
    removeListeners = (function () {
      html_get$document().get$on().get$mouseMove().remove(onMove, capture);
      html_get$document().get$on().get$mouseUp().remove(onEndWrapper, capture);
      html_get$document().get$on().get$touchCancel().remove(onCancelWrapper, capture);
    })
    ;
    node.get$on().get$mouseDown().add((function (e) {
      html_get$document().get$on().get$mouseMove().add(onMove, capture);
      html_get$document().get$on().get$mouseUp().add(onEndWrapper, capture);
      html_get$document().get$on().get$touchCancel().add(onCancelWrapper, capture);
      return onStart(e);
    })
    , capture);
  }
}
//  ********** Library layout.dart **************
// ********** Code for ViewLayout **************
function ViewLayout(view) {
  this.view = view;
}
ViewLayout.ViewLayout$fromView$factory = function(view) {
  if (ViewLayout.hasCustomLayout(view)) {
    return new GridLayout(view);
  }
  else {
    return new ViewLayout(view);
  }
}
ViewLayout.prototype.get$layoutParams = function() { return this.layoutParams; };
ViewLayout.prototype.set$layoutParams = function(value) { return this.layoutParams = value; };
ViewLayout.prototype.get$view = function() { return this.view; };
ViewLayout.hasCustomLayout = function(view) {
  return $eq(view.customStyle.$index("display"), "-dart-grid");
}
ViewLayout.prototype.get$_style = function() {
  return this.layoutParams.style.get$value();
}
ViewLayout.prototype.cacheExistingBrowserLayout = function() {
  this._cachedViewRect = this.view.get$node().get$rect();
}
ViewLayout.prototype.get$currentWidth = function() {
  return this._cachedViewRect.get$value().get$offset().get$width();
}
ViewLayout.prototype.get$currentHeight = function() {
  return this._cachedViewRect.get$value().get$offset().get$height();
}
ViewLayout.prototype.get$borderLeftWidth = function() {
  return ViewLayout._toPixels(this.get$_style().get$borderLeftWidth());
}
ViewLayout.prototype.get$borderTopWidth = function() {
  return ViewLayout._toPixels(this.get$_style().get$borderTopWidth());
}
ViewLayout.prototype.get$borderRightWidth = function() {
  return ViewLayout._toPixels(this.get$_style().get$borderRightWidth());
}
ViewLayout.prototype.get$borderBottomWidth = function() {
  return ViewLayout._toPixels(this.get$_style().get$borderBottomWidth());
}
ViewLayout.prototype.get$borderWidth = function() {
  return this.get$borderLeftWidth() + this.get$borderRightWidth();
}
ViewLayout.prototype.get$borderHeight = function() {
  return this.get$borderTopWidth() + this.get$borderBottomWidth();
}
ViewLayout.prototype.measureLayout = function(size, changed) {

}
ViewLayout.prototype.setBounds = function(left, top, width, height) {
  this._measuredLeft = left;
  this._measuredTop = top;
  this._measuredWidth = width - this.get$borderWidth();
  this._measuredHeight = height - this.get$borderHeight();
  var completer = new CompleterImpl_Size();
  completer.complete$1(new Size(this._measuredWidth, this._measuredHeight));
  this.measureLayout(completer.get$future());
}
ViewLayout.prototype.applyLayout = function() {
  if (this._measuredLeft != null) {
    var style = this.view.get$node().get$style();
    style.set$position("absolute");
    style.set$left(("" + this._measuredLeft + "px"));
    style.set$top(("" + this._measuredTop + "px"));
    style.set$width(("" + this._measuredWidth + "px"));
    style.set$height(("" + this._measuredHeight + "px"));
    style.set$zIndex(("" + this.layoutParams.get$layer()));
    this._measuredLeft = null;
    this._measuredTop = null;
    this._measuredWidth = null;
    this._measuredHeight = null;
    if (!ViewLayout.hasCustomLayout(this.view)) {
      var $$list = this.view.get$childViews();
      for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
        var child = $$i.next();
        child.doLayout();
      }
    }
  }
}
ViewLayout.prototype.measureContent = function(parent, dimension, mode) {
  switch (dimension) {
    case const$0022:

      return this.measureWidth(parent, mode);

    case const$0024:

      return this.measureHeight(parent, mode);

  }
}
ViewLayout.prototype.measureWidth = function(parent, mode) {
  var style = this.layoutParams.style.get$value();
  switch (mode) {
    case const$0027:

      return ViewLayout._styleToPixels(style.get$minWidth(), this.get$currentWidth(), parent.get$currentWidth());

    case const$0028:

      return ViewLayout._styleToPixels(style.get$maxWidth(), this.get$currentWidth(), parent.get$currentWidth());

  }
}
ViewLayout.prototype.measureHeight = function(parent, mode) {
  var style = this.layoutParams.style.get$value();
  switch (mode) {
    case const$0027:

      return ViewLayout._styleToPixels(style.get$minHeight(), this.get$currentHeight(), parent.get$currentHeight());

    case const$0028:

      return ViewLayout._styleToPixels(style.get$maxHeight(), this.get$currentHeight(), parent.get$currentHeight());

  }
}
ViewLayout._toPixels = function(style) {
  if (style.endsWith("px")) {
    return Math.parseInt(style.substring((0), style.length - (2)));
  }
  else {
    $throw(new UnsupportedOperationException(("Unknown min/max content size format: \"" + style + "\"")));
  }
}
ViewLayout._styleToPixels = function(style, size, parentSize) {
  if (style == "none") {
    return size;
  }
  if (style.endsWith("%")) {
    var percent = Math.parseDouble(style.substring((0), style.length - (1)));
    return ((percent / (100)) * parentSize).toInt();
  }
  return ViewLayout._toPixels(style);
}
// ********** Code for GridLayout **************
$inherits(GridLayout, ViewLayout);
function GridLayout(view) {
  this.rows = _GridTrackParser.parse(view.customStyle.$index("grid-rows"));
  this.rowSizing = _GridTrackParser.parseTrackSizing(view.customStyle.$index("grid-row-sizing"));
  this.template = _GridTemplateParser.parse(view.customStyle.$index("grid-template"));
  this.columnSizing = _GridTrackParser.parseTrackSizing(view.customStyle.$index("grid-column-sizing"));
  this.columns = _GridTrackParser.parse(view.customStyle.$index("grid-columns"));
  ViewLayout.call(this, view);
  this._rowTracks = this.rows != null ? this.rows.tracks : new Array();
  this._columnTracks = this.columns != null ? this.columns.tracks : new Array();
}
GridLayout.prototype.get$currentWidth = function() {
  return this._gridWidth;
}
GridLayout.prototype.get$currentHeight = function() {
  return this._gridHeight;
}
GridLayout.prototype.cacheExistingBrowserLayout = function() {

}
GridLayout.prototype.measureLayout = function(size, changed) {
  var $this = this; // closure support
  this._ensureAllTracks();
  html_get$window().requestLayoutFrame((function () {
    $this._gridWidth = size.get$value().get$width();
    $this._gridHeight = size.get$value().get$height();
    if ($this._rowTracks.get$length() > (0) && $this._columnTracks.get$length() > (0)) {
      $this._measureTracks();
      $this._setBoundsOfChildren();
      if (changed != null) {
        changed.complete(true);
      }
    }
  })
  );
}
GridLayout.prototype._measureTracks = function() {
  try {
    this._dimension = const$0022;
    this._computeUsedBreadthOfTracks(this._columnTracks);
    this._dimension = const$0024;
    this._computeUsedBreadthOfTracks(this._rowTracks);
  } finally {
    this._dimension = null;
  }
}
GridLayout.prototype._getRemainingSpace = function(tracks) {
  var remaining = this._getGridContentSize();
  remaining -= CollectionUtils.sum(tracks, (function (t) {
    return t.get$usedBreadth();
  })
  );
  return Math.max((0), remaining);
}
GridLayout.prototype._computeUsedBreadthOfTracks = function(tracks) {
  var $this = this; // closure support
  var items = CollectionUtils.map(this.view.get$childViews(), (function (view_) {
    return view_.get$layout();
  })
  );
  CollectionUtils.sortBy(items, (function (item) {
    return $this._getSpanCount(item);
  })
  );
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$usedBreadth(t.get$minSizing().resolveLength(this._getGridContentSize()));
    t.set$maxBreadth(t.get$maxSizing().resolveLength(this._getGridContentSize()));
    t.set$updatedBreadth((0));
  }
  var USED_BREADTH = const$0025;
  var MAX_BREADTH = const$0026;
  this._distributeSpaceBySpanCount(items, const$0027, USED_BREADTH);
  this._distributeSpaceBySpanCount(items, const$0028, USED_BREADTH);
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    if (t.get$maxBreadth() < t.get$usedBreadth()) {
      t.set$maxBreadth(t.get$usedBreadth());
    }
  }
  this._distributeSpaceBySpanCount(items, const$0027, MAX_BREADTH);
  this._distributeSpaceBySpanCount(items, const$0028, MAX_BREADTH);
  this._distributeSpaceToTracks(tracks, this._getRemainingSpace(tracks), USED_BREADTH, false);
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$usedBreadth(t.get$updatedBreadth());
  }
  var tempBreadth = this._calcNormalizedFractionBreadth(tracks);
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$usedBreadth(Math.max(t.get$usedBreadth(), $mul(tempBreadth, t.get$maxSizing().get$fractionValue())));
  }
  this._computeTrackPositions(tracks);
}
GridLayout.prototype._computeTrackPositions = function(tracks) {
  var position = (0);
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$start(position);
    position += t.get$usedBreadth();
  }
  var finalPosition = position;
  for (var i = (0);
   i < tracks.get$length(); i++) {
    var startEdge = tracks.$index(i).get$start();
    var endEdge = null;
    if (i < tracks.get$length() - (1)) {
      endEdge = tracks.$index(i + (1)).get$start().round().toInt();
      tracks.$index(i + (1)).set$start(endEdge);
    }
    else {
      endEdge = finalPosition.round().toInt();
    }
    var breadth = endEdge - startEdge;
    tracks.$index(i).set$usedBreadth(breadth);
  }
}
GridLayout.prototype._calcNormalizedFractionBreadth = function(tracks) {
  var fractionTracks = tracks.filter$1((function (t) {
    return t.get$maxSizing().get$isFraction();
  })
  );
  for (var $$i = fractionTracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$tempBreadth(t.get$usedBreadth() / t.get$maxSizing().get$fractionValue());
  }
  CollectionUtils.sortBy(fractionTracks, (function (t) {
    return t.get$tempBreadth();
  })
  );
  var spaceNeededFromFractionTracks = this._getRemainingSpace(tracks);
  var currentBandFractionBreadth = (0);
  var accumulatedFractions = (0);
  for (var $$i = fractionTracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    if (t.get$tempBreadth() != currentBandFractionBreadth) {
      if (t.get$tempBreadth() * accumulatedFractions > spaceNeededFromFractionTracks) {
        break;
      }
      currentBandFractionBreadth = t.get$tempBreadth();
    }
    accumulatedFractions += t.get$maxSizing().get$fractionValue();
    spaceNeededFromFractionTracks += t.get$usedBreadth();
  }
  return spaceNeededFromFractionTracks / accumulatedFractions;
}
GridLayout.prototype._distributeSpaceToTracks = function(tracks, freeSpace, breadth, ignoreMaxBreadth) {
  var $0;
  tracks = CollectionUtils.orderBy(tracks, (function (t) {
    return t.get$maxBreadth() - breadth.getSize(t);
  })
  );
  for (var i = (0);
   i < tracks.get$length(); i++) {
    var share = freeSpace / (tracks.get$length() - i);
    share = Math.min(share, tracks.$index(i).get$maxBreadth());
    tracks.$index(i).set$tempBreadth(share);
    freeSpace -= share;
  }
  if (freeSpace > (0) && ignoreMaxBreadth) {
    for (var i = (0);
     i < tracks.get$length(); i++) {
      var share = freeSpace / (tracks.get$length() - i);
      ($0 = tracks.$index(i)).set$tempBreadth($add($0.get$tempBreadth(), share));
      freeSpace = $sub(freeSpace, share);
    }
  }
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    t.set$updatedBreadth(Math.max(t.get$updatedBreadth(), t.get$tempBreadth()));
  }
}
GridLayout.prototype._distributeSpaceBySpanCount = function(items, sizeMode, breadth) {
  var $this = this; // closure support
  items = items.filter$1((function (item) {
    return GridLayout._hasContentSizedTracks($this._getTracks(item), sizeMode, breadth);
  })
  );
  var tracks = [];
  for (var i = (0);
   i < items.get$length(); i++) {
    var item = items.$index(i);
    var itemTargetSize = item.measureContent(this, this._dimension, sizeMode);
    var spannedTracks = this._getTracks(item);
    this._distributeSpaceToTracks(spannedTracks, itemTargetSize, breadth, true);
    tracks.addAll(spannedTracks);
    var spanCountFinished = false;
    if (i + (1) == items.get$length()) {
      spanCountFinished = true;
    }
    else if (this._getSpanCount(item) != this._getSpanCount(items.$index(i + (1)))) {
      spanCountFinished = true;
    }
    if (spanCountFinished) {
      for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
        var t = $$i.next();
        breadth.setSize(t, Math.max(breadth.getSize(t), t.get$updatedBreadth()));
      }
      tracks = [];
    }
  }
}
GridLayout._hasContentSizedTracks = function(tracks, sizeMode, breadth) {
  for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
    var t = $$i.next();
    var fn = breadth.getSizingFunction(t);
    if ($eq(sizeMode, const$0028) && fn.get$isMaxContentSized() || $eq(sizeMode, const$0027) && fn.get$isContentSized()) {
      return tracks.get$length() == (1) || !tracks.some((function (t_) {
        return t_.get$isFractional();
      })
      );
    }
  }
  return false;
}
GridLayout.prototype._ensureTrack = function(tracks, sizing, start, span) {
  start -= (1);
  var length = start + span;
  var first = Math.min(start, tracks.get$length());
  tracks.set$length(Math.max(tracks.get$length(), length));
  for (var i = first;
   i < length; i++) {
    if ($eq(tracks.$index(i))) {
      tracks.$setindex(i, new GridTrack(sizing));
    }
  }
}
GridLayout.prototype._ensureAllTracks = function() {
  var items = CollectionUtils.map(this.view.get$childViews(), (function (view_) {
    return view_.get$layout();
  })
  );
  for (var $$i = items.iterator(); $$i.hasNext(); ) {
    var child = $$i.next();
    if (child.get$layoutParams() == null) {
      var p = new GridLayoutParams(child.get$view(), this);
      this._ensureTrack(this._rowTracks, this.rowSizing, p.get$row(), p.get$rowSpan());
      this._ensureTrack(this._columnTracks, this.columnSizing, p.get$column(), p.get$columnSpan());
      child.set$layoutParams(p);
    }
    child.cacheExistingBrowserLayout();
  }
}
GridLayout.prototype._setBoundsOfChildren = function() {
  var items = CollectionUtils.map(this.view.get$childViews(), (function (view_) {
    return view_.get$layout();
  })
  );
  for (var $$i = items.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    var childLayout = item.get$layoutParams();
    var xPos = this._getTrackLocationX(childLayout);
    var yPos = this._getTrackLocationY(childLayout);
    var left = xPos.get$start(), width = xPos.get$length();
    var top = yPos.get$start(), height = yPos.get$length();
    xPos = childLayout.columnAlign.align(xPos, item.get$currentWidth());
    yPos = childLayout.rowAlign.align(yPos, item.get$currentHeight());
    item.setBounds(xPos.get$start(), yPos.get$start(), xPos.get$length(), yPos.get$length());
  }
}
GridLayout.prototype._getGridContentSize = function() {
  switch (this._dimension) {
    case const$0022:

      return this._gridWidth;

    case const$0024:

      return this._gridHeight;

  }
}
GridLayout.prototype._getTrackLocationX = function(childLayout) {
  var start = childLayout.column - (1);
  var end = start + childLayout.columnSpan - (1);
  start = this._columnTracks.$index(start).get$start();
  end = this._columnTracks.$index(end).get$end();
  return new _GridLocation(start, end - start);
}
GridLayout.prototype._getTrackLocationY = function(childLayout) {
  var start = childLayout.row - (1);
  var end = start + childLayout.rowSpan - (1);
  start = this._rowTracks.$index(start).get$start();
  end = this._rowTracks.$index(end).get$end();
  return new _GridLocation(start, end - start);
}
GridLayout.prototype._getTracks = function(item) {
  var childLayout = item.layoutParams;
  var start, span;
  var tracks;
  switch (this._dimension) {
    case const$0022:

      start = childLayout.column - (1);
      span = childLayout.columnSpan;
      tracks = this._columnTracks;
      break;

    case const$0024:

      start = childLayout.row - (1);
      span = childLayout.rowSpan;
      tracks = this._rowTracks;

  }
  var result = new Array(span);
  for (var i = (0);
   i < span; i++) {
    result.$setindex(i, tracks.$index(start + i));
  }
  return result;
}
GridLayout.prototype._getSpanCount = function(item) {
  var childLayout = item.layoutParams;
  return ($eq(this._dimension, const$0022) ? childLayout.columnSpan : childLayout.rowSpan);
}
// ********** Code for LayoutParams **************
function LayoutParams(node) {
  this.style = node.get$computedStyle();
}
LayoutParams.prototype.get$style = function() { return this.style; };
LayoutParams.prototype.get$layer = function() {
  return (0);
}
// ********** Code for GridLayoutParams **************
$inherits(GridLayoutParams, LayoutParams);
function GridLayoutParams(view, layout) {
  LayoutParams.call(this, view.get$node());
  this.rowAlign = new GridItemAlignment.fromString$ctor(view.customStyle.$index("grid-row-align"));
  this.columnAlign = new GridItemAlignment.fromString$ctor(view.customStyle.$index("grid-column-align"));
  this.layer = StringUtils.parseInt(view.customStyle.$index("grid-layer"), (0));
  this.rowSpan = StringUtils.parseInt(view.customStyle.$index("grid-row-span"));
  this.columnSpan = StringUtils.parseInt(view.customStyle.$index("grid-column-span"));
  var line = _GridItemParser.parse(view.customStyle.$index("grid-row"), layout.rows);
  if ($ne(line)) {
    this.row = line.get$start();
    if ($ne(line.get$length())) {
      if (this.rowSpan != null) {
        $throw(new UnsupportedOperationException("grid-row-span cannot be with grid-row that defines an end"));
      }
      this.rowSpan = line.get$length();
    }
  }
  line = _GridItemParser.parse(view.customStyle.$index("grid-column"), layout.columns);
  if ($ne(line)) {
    this.column = line.get$start();
    if ($ne(line.get$length())) {
      if (this.columnSpan != null) {
        $throw(new UnsupportedOperationException("grid-column-span cannot be with grid-column that defines an end"));
      }
      this.columnSpan = line.get$length();
    }
  }
  var cell = _GridTemplateParser.parseCell(view.customStyle.$index("grid-cell"));
  if (cell != null && cell != "none") {
    if (this.row != null || this.column != null || this.rowSpan != null || this.columnSpan != null) {
      $throw(new UnsupportedOperationException("grid-cell cannot be used with grid-row and grid-column"));
    }
    if (layout.template == null) {
      $throw(new UnsupportedOperationException("grid-cell requires that grid-template is set on the parent"));
    }
    var rect = layout.template.lookupCell(cell);
    this.row = rect.get$row();
    this.column = rect.get$column();
    this.rowSpan = rect.get$rowSpan();
    this.columnSpan = rect.get$columnSpan();
  }
  else {
    if (this.rowSpan == null) this.rowSpan = (1);
    if (this.columnSpan == null) this.columnSpan = (1);
    if (this.row == null && this.column == null) {
      $throw(new UnsupportedOperationException("grid-flow is not implemented so at least one row or one column must be defined"));
    }
    if (this.row == null) this.row = (1);
    if (this.column == null) this.column = (1);
  }
}
GridLayoutParams.prototype.get$row = function() { return this.row; };
GridLayoutParams.prototype.get$column = function() { return this.column; };
GridLayoutParams.prototype.get$rowSpan = function() { return this.rowSpan; };
GridLayoutParams.prototype.get$columnSpan = function() { return this.columnSpan; };
GridLayoutParams.prototype.get$layer = function() { return this.layer; };
// ********** Code for _Parser **************
function _Parser(_src) {
  this._src = _src;
  this._layout_dart_offset = (0);
}
_Parser._isWhitespace = function(c) {
  switch (c) {
    case (32):
    case (9):
    case (10):
    case (13):

      return true;

  }
  return false;
}
_Parser._isDigit = function(c) {
  return ((48) <= c) && (c <= (57));
}
_Parser._isLetter = function(c) {
  return ((97) <= c) && (c <= (122)) || ((65) <= c) && (c <= (90));
}
_Parser.prototype._error = function(msg) {
  $throw(new SyntaxErrorException(msg, this._src, this._layout_dart_offset));
}
_Parser.prototype.get$length = function() {
  return this._src.length;
}
_Parser.prototype.get$remaining = function() {
  return this._src.length - this._layout_dart_offset;
}
_Parser.prototype._peekChar = function() {
  return this._src.charCodeAt(this._layout_dart_offset);
}
_Parser.prototype.get$endOfInput = function() {
  return this._layout_dart_offset >= this._src.length;
}
_Parser.prototype._maybeEatWhitespace = function() {
  var start = this._layout_dart_offset;
  while (this._layout_dart_offset < this.get$length() && _Parser._isWhitespace(this._peekChar())) {
    this._layout_dart_offset++;
  }
  return this._layout_dart_offset != start;
}
_Parser.prototype._maybeEatMultiLineComment = function() {
  if (this._maybeEat("/*", false)) {
    while (!this._maybeEat("*/", false)) {
      if (this._layout_dart_offset >= this.get$length()) {
        this._error("expected */");
      }
      this._layout_dart_offset++;
    }
    return true;
  }
  return false;
}
_Parser.prototype._maybeEatWhitespaceOrComments = function() {
  while (this._maybeEatWhitespace() || this._maybeEatMultiLineComment()) {
  }
}
_Parser.prototype._eatEnd = function() {
  this._maybeEatWhitespaceOrComments();
  if (!this.get$endOfInput()) {
    this._error("expected end of input");
  }
}
_Parser.prototype._maybeEat = function(value, eatWhitespace) {
  if (eatWhitespace) {
    this._maybeEatWhitespaceOrComments();
  }
  if (this.get$remaining() < value.length) {
    return false;
  }
  for (var i = (0);
   i < value.length; i++) {
    if (this._src[this._layout_dart_offset + i] != value[i]) {
      return false;
    }
  }
  if (_Parser._isLetter(value.charCodeAt(value.length - (1)))) {
    var i = this._layout_dart_offset + value.length;
    if (i < this._src.length && _Parser._isLetter(this._src.charCodeAt(i))) {
      return false;
    }
  }
  this._layout_dart_offset = this._layout_dart_offset + value.length;
  return true;
}
_Parser.prototype._eat = function(value, eatWhitespace) {
  if (!this._maybeEat(value, true)) {
    this._error(("expected \"" + value + "\""));
  }
}
_Parser.prototype._maybeEatString = function() {
  var quote = "'";
  if (!this._maybeEat(quote, true)) {
    quote = "\"";
    if (!this._maybeEat(quote, true)) {
      return null;
    }
  }
  var hasEscape = false;
  var start = this._layout_dart_offset;
  while (!this._maybeEat(quote, true)) {
    if (this.get$endOfInput()) {
      this._error(("expected \"" + quote + "\""));
    }
    if (this._maybeEat("\\", true)) {
      hasEscape = true;
    }
    this._layout_dart_offset++;
  }
  var result = this._src.substring(start, this._layout_dart_offset - (1));
  if (hasEscape) {
    result = result.replaceFirst("\\", "");
  }
  return result;
}
_Parser.prototype._eatWord = function() {
  var start = this._layout_dart_offset;
  while (this._layout_dart_offset < this.get$length() && _Parser._isLetter(this._peekChar())) {
    this._layout_dart_offset++;
  }
  return this._src.substring(start, this._layout_dart_offset);
}
_Parser.prototype._maybeEatInt = function() {
  var start = this._layout_dart_offset;
  var dot = false;
  while (this._layout_dart_offset < this.get$length() && _Parser._isDigit(this._peekChar())) {
    this._layout_dart_offset++;
  }
  if (start == this._layout_dart_offset) {
    return null;
  }
  return Math.parseInt(this._src.substring(start, this._layout_dart_offset));
}
_Parser.prototype._eatInt = function() {
  var result = this._maybeEatInt();
  if (result == null) {
    this._error("expected positive integer");
  }
  return result;
}
_Parser.prototype._eatDouble = function() {
  var start = this._layout_dart_offset;
  var dot = false;
  while (this._layout_dart_offset < this.get$length()) {
    var c = this._peekChar();
    if (!_Parser._isDigit(c)) {
      if (c == (46) && !dot) {
        dot = true;
      }
      else {
        break;
      }
    }
    this._layout_dart_offset++;
  }
  if (start == this._layout_dart_offset) {
    this._error("expected positive decimal number");
  }
  return Math.parseDouble(this._src.substring(start, this._layout_dart_offset));
}
// ********** Code for _GridTemplateParser **************
$inherits(_GridTemplateParser, _Parser);
_GridTemplateParser._internal$ctor = function(src) {
  _Parser.call(this, src);
}
_GridTemplateParser._internal$ctor.prototype = _GridTemplateParser.prototype;
function _GridTemplateParser() {}
_GridTemplateParser.parse = function(str) {
  if (str == null) return null;
  var p = new _GridTemplateParser._internal$ctor(str);
  var result = p._parseTemplate();
  p._eatEnd();
  return result;
}
_GridTemplateParser.parseCell = function(str) {
  if (str == null) return null;
  var p = new _GridTemplateParser._internal$ctor(str);
  var result = p._maybeEatString();
  p._eatEnd();
  return result;
}
_GridTemplateParser.prototype._parseTemplate = function() {
  if (this._maybeEat("none", true)) {
    return null;
  }
  var rows = new Array();
  var row;
  while ((row = this._maybeEatString()) != null) {
    rows.add$1(row);
  }
  if ($eq(rows.get$length(), (0))) {
    this._error("expected at least one cell, or \"none\"");
  }
  return new GridTemplate(rows);
}
// ********** Code for _GridItemParser **************
$inherits(_GridItemParser, _Parser);
_GridItemParser._internal$ctor = function(src) {
  _Parser.call(this, src);
}
_GridItemParser._internal$ctor.prototype = _GridItemParser.prototype;
function _GridItemParser() {}
_GridItemParser.parse = function(cell, list) {
  if (cell == null) return null;
  var p = new _GridItemParser._internal$ctor(cell);
  var result = p._parseTrack(list);
  p._eatEnd();
  return result;
}
_GridItemParser.prototype._parseTrack = function(list) {
  if (this._maybeEat("auto", true)) {
    return null;
  }
  var start = this._maybeParseLine(list);
  if (start == null) {
    this._error("expected row/column number or name");
  }
  var end = this._maybeParseLine(list);
  var span = null;
  if (end != null) {
    span = end - start;
    if (span <= (0)) {
      this._error("expected row/column span to be a positive integer");
    }
  }
  return new _GridLocation(start, span);
}
_GridItemParser.prototype._maybeParseLine = function(list) {
  if (this._maybeEat("start", true)) {
    return (1);
  }
  else if (this._maybeEat("end", true)) {
    return list.tracks.get$length() + (1);
  }
  var name = this._maybeEatString();
  if (name == null) {
    return this._maybeEatInt();
  }
  else {
    var edge = list.lineNames.$index(name);
    if (edge == null) {
      this._error($add(("row/column name \"" + name + "\" not found in the parent's "), " grid-row/grid-columns properties"));
    }
    return edge;
  }
}
// ********** Code for _GridTrackParser **************
$inherits(_GridTrackParser, _Parser);
_GridTrackParser._internal$ctor = function(src) {
  this._tracks = new Array();
  this._lineNames = new HashMapImplementation_dart_core_String$int();
  _Parser.call(this, src);
}
_GridTrackParser._internal$ctor.prototype = _GridTrackParser.prototype;
function _GridTrackParser() {}
_GridTrackParser.parse = function(str) {
  if (str == null) return null;
  var p = new _GridTrackParser._internal$ctor(str);
  var result = p._parseTrackList();
  p._eatEnd();
  return result;
}
_GridTrackParser.parseTrackSizing = function(str) {
  if (str == null) str = "auto";
  var p = new _GridTrackParser._internal$ctor(str);
  var result = p._parseTrackMinmax();
  p._eatEnd();
  return result;
}
_GridTrackParser.prototype._parseTrackList = function() {
  if (this._maybeEat("none", true)) {
    return null;
  }
  this._parseTrackListHelper();
  return new GridTrackList(this._tracks, this._lineNames);
}
_GridTrackParser.prototype._parseTrackListHelper = function(resultTracks) {
  this._maybeEatWhitespace();
  while (!this.get$endOfInput()) {
    var name = null;
    while ((name = this._maybeEatString()) != null) {
      this._lineNames.$setindex(name, this._tracks.get$length() + (1));
    }
    this._maybeEatWhitespace();
    if (this.get$endOfInput()) {
      return;
    }
    if (resultTracks != null) {
      if (this._peekChar() == (41)) {
        return;
      }
      resultTracks.add(new GridTrack(this._parseTrackMinmax()));
    }
    else {
      this._parseTrackGroup();
    }
    this._maybeEatWhitespace();
  }
}
_GridTrackParser.prototype._parseTrackGroup = function() {
  if (this._maybeEat("(", true)) {
    var tracks = new Array();
    this._parseTrackListHelper(tracks);
    this._eat(")", true);
    if (this._maybeEat("[", true)) {
      var expand = this._eatInt();
      this._eat("]", true);
      if (expand <= (0)) {
        this._error("expected positive number");
      }
      for (var i = (0);
       i < expand; i++) {
        for (var $$i = tracks.iterator(); $$i.hasNext(); ) {
          var t = $$i.next();
          this._tracks.add(t.clone());
        }
      }
    }
  }
  else {
    this._tracks.add(new GridTrack(this._parseTrackMinmax()));
  }
}
_GridTrackParser.prototype._parseTrackMinmax = function() {
  if (this._maybeEat("auto", true) || this._maybeEat("fit-content", true)) {
    return const$0019;
  }
  if (this._maybeEat("minmax(", true)) {
    var min = this._parseTrackBreadth();
    this._eat(",", true);
    var max = this._parseTrackBreadth();
    this._eat(")", true);
    return new TrackSizing(min, max);
  }
  else {
    var breadth = this._parseTrackBreadth();
    return new TrackSizing(breadth, breadth);
  }
}
_GridTrackParser.prototype._parseTrackBreadth = function() {
  if (this._maybeEat("min-content", true)) {
    return const$0017;
  }
  else if (this._maybeEat("max-content", true)) {
    return const$0018;
  }
  var value = this._eatDouble();
  var units;
  if (this._maybeEat("%", true)) {
    units = "%";
  }
  else {
    units = this._eatWord();
  }
  if (units == "fr") {
    return new FractionSizing(value);
  }
  else {
    return new FixedSizing(value, units);
  }
}
// ********** Code for SyntaxErrorException **************
function SyntaxErrorException(_message, _source, _offset) {
  this._layout_dart_message = _message;
  this._offset = _offset;
  this._source = _source;
}
SyntaxErrorException.prototype.toString = function() {
  var location;
  if (this._offset < this._source.length) {
    location = $add("location: ", this._source.substring(this._offset));
  }
  else {
    location = "end of input";
  }
  return ("SyntaxErrorException: " + this._layout_dart_message + " at " + location);
}
// ********** Code for GridTrackList **************
function GridTrackList(tracks, lineNames) {
  this.tracks = tracks;
  this.lineNames = lineNames;
}
// ********** Code for GridTrack **************
function GridTrack(sizing) {
  this.sizing = sizing;
}
GridTrack.prototype.get$start = function() { return this.start; };
GridTrack.prototype.set$start = function(value) { return this.start = value; };
GridTrack.prototype.get$usedBreadth = function() { return this.usedBreadth; };
GridTrack.prototype.set$usedBreadth = function(value) { return this.usedBreadth = value; };
GridTrack.prototype.get$maxBreadth = function() { return this.maxBreadth; };
GridTrack.prototype.set$maxBreadth = function(value) { return this.maxBreadth = value; };
GridTrack.prototype.get$updatedBreadth = function() { return this.updatedBreadth; };
GridTrack.prototype.set$updatedBreadth = function(value) { return this.updatedBreadth = value; };
GridTrack.prototype.get$tempBreadth = function() { return this.tempBreadth; };
GridTrack.prototype.set$tempBreadth = function(value) { return this.tempBreadth = value; };
GridTrack.prototype.clone = function() {
  return new GridTrack(this.sizing.clone());
}
GridTrack.prototype.get$minSizing = function() {
  return this.sizing.min;
}
GridTrack.prototype.get$maxSizing = function() {
  return this.sizing.max;
}
GridTrack.prototype.get$end = function() {
  return this.start + this.usedBreadth;
}
GridTrack.prototype.get$isFractional = function() {
  return this.get$minSizing().get$isFraction() || this.get$maxSizing().get$isFraction();
}
// ********** Code for GridItemAlignment **************
GridItemAlignment.fromString$ctor = function(value) {
  this.value = (value == null) ? "stretch" : value;
  switch (this.value) {
    case "start":
    case "end":
    case "center":
    case "stretch":

      break;

    default:

      $throw(new UnsupportedOperationException(("invalid row/column alignment \"" + value + "\"")));

  }
}
GridItemAlignment.fromString$ctor.prototype = GridItemAlignment.prototype;
function GridItemAlignment() {}
GridItemAlignment.prototype.get$value = function() { return this.value; };
GridItemAlignment.prototype.align = function(span, size) {
  switch (this.value) {
    case "start":

      return new _GridLocation(span.start, size);

    case "end":

      return new _GridLocation(span.get$end() - size, size);

    case "center":

      size = Math.min(size, span.length);
      var center = span.start + span.length / (2);
      var left = center - size / (2);
      return new _GridLocation(left.round().toInt(), size);

    case "stretch":

      return span;

  }
}
// ********** Code for GridTemplate **************
function GridTemplate(rows) {
  this._rects = new HashMapImplementation_int$_GridTemplateRect();
  this._numRows = rows.get$length();
  this._buildRects(rows);
}
GridTemplate.prototype._buildRects = function(templateRows) {
  for (var r = (0);
   r < templateRows.get$length(); r++) {
    var row = templateRows.$index(r);
    for (var c = (0);
     c < row.length; c++) {
      var cell = row.charCodeAt(c);
      var rect = this._rects.$index(cell);
      if ($ne(rect)) {
        rect.add$2(r + (1), c + (1));
      }
      else {
        this._rects.$setindex(cell, new _GridTemplateRect(cell, r + (1), c + (1)));
      }
    }
  }
  var $$list = this._rects.getValues();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var rect = $$i.next();
    rect.checkValid();
  }
}
GridTemplate.prototype.lookupCell = function(cell) {
  if (cell.length != (1)) {
    $throw(new UnsupportedOperationException(("grid-cell \"" + cell + "\" must be a one character string")));
  }
  var rect = this._rects.$index(cell.charCodeAt((0)));
  if ($eq(rect)) {
    $throw(new UnsupportedOperationException(("grid-cell \"" + cell + "\" not found in parent's grid-template")));
  }
  return rect;
}
// ********** Code for _GridTemplateRect **************
function _GridTemplateRect(_char, row, column) {
  this._layout_dart_count = (1);
  this.columnSpan = (1);
  this.row = row;
  this._char = _char;
  this.column = column;
  this.rowSpan = (1);
}
_GridTemplateRect.prototype.get$column = function() { return this.column; };
_GridTemplateRect.prototype.get$columnSpan = function() { return this.columnSpan; };
_GridTemplateRect.prototype.get$row = function() { return this.row; };
_GridTemplateRect.prototype.get$rowSpan = function() { return this.rowSpan; };
_GridTemplateRect.prototype.add = function(r, c) {
  this._layout_dart_count++;
  this.rowSpan = Math.max(this.rowSpan, r - this.row + (1));
  this.columnSpan = Math.max(this.columnSpan, c - this.column + (1));
}
_GridTemplateRect.prototype.checkValid = function() {
  var expected = this.rowSpan * this.columnSpan;
  if (expected != this._layout_dart_count) {
    var cell = Strings.String$fromCharCodes$factory([this._char]);
    $throw(new UnsupportedOperationException($add(("grid-template \"" + cell + "\""), (" is not square, expected " + expected + " cells but got " + this._layout_dart_count))));
  }
}
_GridTemplateRect.prototype.add$2 = _GridTemplateRect.prototype.add;
// ********** Code for _GridLocation **************
function _GridLocation(start, length) {
  this.start = start;
  this.length = length;
}
_GridLocation.prototype.get$length = function() { return this.length; };
_GridLocation.prototype.get$start = function() { return this.start; };
_GridLocation.prototype.get$end = function() {
  return this.start + this.length;
}
// ********** Code for SizingFunction **************
function SizingFunction() {

}
SizingFunction.prototype.get$isContentSized = function() {
  return this.get$isMinContentSized() || this.get$isMaxContentSized();
}
SizingFunction.prototype.get$isMinContentSized = function() {
  return false;
}
SizingFunction.prototype.get$isMaxContentSized = function() {
  return false;
}
SizingFunction.prototype.get$isFraction = function() {
  return false;
}
SizingFunction.prototype.resolveLength = function(gridSize) {
  return (0);
}
SizingFunction.prototype.get$fractionValue = function() {
  return (0);
}
SizingFunction.prototype.clone = function() {
  return this;
}
// ********** Code for FixedSizing **************
$inherits(FixedSizing, SizingFunction);
function FixedSizing(length, units) {
  this._contentSized = false;
  this.units = units;
  this.length = length;
  SizingFunction.call(this);
  if (this.units != "px" && this.units != "%") {
    $throw(new UnsupportedOperationException("Units other than px and %"));
  }
}
FixedSizing.prototype.get$length = function() { return this.length; };
FixedSizing.prototype.clone = function() {
  return new FixedSizing(this.length, this.units);
}
FixedSizing.prototype.get$isMinContentSized = function() {
  return this._contentSized;
}
FixedSizing.prototype.resolveLength = function(gridSize) {
  if (this.units == "%") {
    if (gridSize == null) {
      this._contentSized = true;
      return (0);
    }
    this._contentSized = false;
    return (this.length / (100)) * gridSize;
  }
  else {
    return this.length;
  }
}
FixedSizing.prototype.toString = function() {
  return ("FixedSizing: " + this.length + this.units + " " + this._contentSized);
}
// ********** Code for FractionSizing **************
$inherits(FractionSizing, SizingFunction);
function FractionSizing(fractionValue) {
  this.fractionValue = fractionValue;
  SizingFunction.call(this);
}
FractionSizing.prototype.get$fractionValue = function() { return this.fractionValue; };
FractionSizing.prototype.get$isFraction = function() {
  return true;
}
FractionSizing.prototype.toString = function() {
  return ("FixedSizing: " + this.fractionValue + "fr");
}
// ********** Code for MinContentSizing **************
$inherits(MinContentSizing, SizingFunction);
function MinContentSizing() {
  SizingFunction.call(this);
}
MinContentSizing.prototype.get$isMinContentSized = function() {
  return true;
}
MinContentSizing.prototype.toString = function() {
  return "MinContentSizing";
}
// ********** Code for MaxContentSizing **************
$inherits(MaxContentSizing, SizingFunction);
function MaxContentSizing() {
  SizingFunction.call(this);
}
MaxContentSizing.prototype.get$isMaxContentSized = function() {
  return true;
}
MaxContentSizing.prototype.toString = function() {
  return "MaxContentSizing";
}
// ********** Code for TrackSizing **************
function TrackSizing(min, max) {
  this.min = min;
  this.max = max;
}
TrackSizing.auto$ctor = function() {
  this.min = const$0017;
  this.max = const$0018;
}
TrackSizing.auto$ctor.prototype = TrackSizing.prototype;
TrackSizing.prototype.clone = function() {
  return new TrackSizing(this.min.clone(), this.max.clone());
}
// ********** Code for _UsedBreadthAccumulator **************
function _UsedBreadthAccumulator() {

}
_UsedBreadthAccumulator.prototype.setSize = function(t, value) {
  t.usedBreadth = value;
}
_UsedBreadthAccumulator.prototype.getSize = function(t) {
  return t.usedBreadth;
}
_UsedBreadthAccumulator.prototype.getSizingFunction = function(t) {
  return t.get$minSizing();
}
// ********** Code for _MaxBreadthAccumulator **************
function _MaxBreadthAccumulator() {

}
_MaxBreadthAccumulator.prototype.setSize = function(t, value) {
  t.maxBreadth = value;
}
_MaxBreadthAccumulator.prototype.getSize = function(t) {
  return t.maxBreadth;
}
_MaxBreadthAccumulator.prototype.getSizingFunction = function(t) {
  return t.get$maxSizing();
}
// ********** Code for Dimension **************
Dimension._internal$ctor = function(name) {
  this.name = name;
}
Dimension._internal$ctor.prototype = Dimension.prototype;
function Dimension() {}
Dimension.prototype.get$name = function() { return this.name; };
// ********** Code for ContentSizeMode **************
ContentSizeMode._internal$ctor = function(name) {
  this.name = name;
}
ContentSizeMode._internal$ctor.prototype = ContentSizeMode.prototype;
function ContentSizeMode() {}
ContentSizeMode.prototype.get$name = function() { return this.name; };
// ********** Code for top level **************
//  ********** Library view **************
// ********** Code for View **************
function View() {
  this.customStyle = new HashMapImplementation_String$String();
}
View.fromNode$ctor = function(_node) {
  this._view_node = _node;
  this.customStyle = new HashMapImplementation_String$String();
}
View.fromNode$ctor.prototype = View.prototype;
View.html$ctor = function(html) {
  this._view_node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(html);
  this.customStyle = new HashMapImplementation_String$String();
}
View.html$ctor.prototype = View.prototype;
View.prototype.get$node = function() {
  if (null == this._view_node) {
    this._render();
  }
  return this._view_node;
}
View.prototype.get$childViews = function() {
  return const$0016;
}
View.prototype.childViewAdded = function(child) {
  if (this.get$isInDocument()) {
    child._enterDocument();
    this.doLayout();
  }
}
View.prototype.childViewRemoved = function(child) {
  if (this.get$isInDocument()) {
    child._exitDocument();
  }
}
View.prototype.get$isRendered = function() {
  return null != this._view_node;
}
View.prototype.get$isInDocument = function() {
  return null != this._view_node && this.get$node().get$document().contains(this.get$node());
}
View.prototype.addToDocument = function(parentNode) {
  this._render();
  parentNode.get$nodes().add(this._view_node);
  this._hookGlobalLayoutEvents();
  this._enterDocument();
}
View.prototype.render = function() {
  $throw("abstract");
}
View.prototype.afterRender = function(node) {

}
View.prototype.enterDocument = function() {

}
View.prototype.exitDocument = function() {

}
View.prototype.windowResized = function() {

}
View.prototype.watch = function(observable, watcher) {
  var summary = new EventSummary(observable);
  watcher(summary);
  this.attachWatch(observable, watcher);
}
View.prototype.attachWatch = function(observable, watcher) {
  observable.addChangeListener(watcher);
}
View.prototype.addOnClick = function(handler) {
  this._view_node.get$on().get$click().add$1(handler);
}
View.prototype.set$hidden = function(hidden) {
  if (hidden) {
    this.get$node().get$style().set$display("none");
  }
  else {
    this.get$node().get$style().set$display("");
  }
}
View.prototype.addClass = function(className) {
  this.get$node().get$classes().add(className);
}
View.prototype.removeClass = function(className) {
  this.get$node().get$classes().remove(className);
}
View.div = function(cssClass, body) {
  if (body == null) {
    body = "";
  }
  return new View.html$ctor(("<div class=\"" + cssClass + "\">" + body + "</div>"));
}
View.prototype._render = function() {
  if (this._view_node == null) {
    this._view_node = this.render();
  }
  this.afterRender(this._view_node);
}
View.prototype._enterDocument = function() {
  var $$list = this.get$childViews();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var child = $$i.next();
    child._enterDocument();
  }
  this.enterDocument();
}
View.prototype.get$layout = function() {
  if ($eq(this._view_layout)) {
    this._view_layout = ViewLayout.ViewLayout$fromView$factory(this);
  }
  return this._view_layout;
}
View.prototype._exitDocument = function() {
  this.exitDocument();
  var $$list = this.get$childViews();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var child = $$i.next();
    child._exitDocument();
  }
}
View.prototype._hookGlobalLayoutEvents = function() {
  var $this = this; // closure support
  if (this._resizeHandler == null) {
    this._resizeHandler = to$call$1(EventBatch.wrap((function (e) {
      return $this.doLayout();
    })
    ));
  }
  html_get$window().get$on().get$resize().add$1(this._resizeHandler);
  this.doLayout();
}
View.prototype.doLayout = function() {
  var $this = this; // closure support
  this._measureLayout().then((function (changed) {
    if (changed) {
      $this._applyLayoutToChildren();
    }
  })
  );
}
View.prototype._measureLayout = function() {
  var changed = new CompleterImpl_bool();
  this._measureLayoutHelper(changed);
  html_get$window().requestLayoutFrame((function () {
    if (!changed.get$future().get$isComplete()) {
      changed.complete$1(false);
    }
  })
  );
  return changed.get$future();
}
View.prototype._measureLayoutHelper = function(changed) {
  this.windowResized();
  if (ViewLayout.hasCustomLayout(this)) {
    var sizeCompleter = new CompleterImpl_Size();
    this._view_node.get$rect().then((function (rect) {
      sizeCompleter.complete(new Size(rect.client.get$width(), rect.client.get$height()));
    })
    );
    this.get$layout().measureLayout(sizeCompleter.get$future(), changed);
  }
  else {
    var $$list = this.get$childViews();
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var child = $$i.next();
      child._measureLayoutHelper(changed);
    }
  }
}
View.prototype._applyLayoutToChildren = function() {
  var $$list = this.get$childViews();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var child = $$i.next();
    child._applyLayout();
  }
}
View.prototype._applyLayout = function() {
  if ($ne(this._view_layout)) {
    this._view_layout.applyLayout();
  }
  this._applyLayoutToChildren();
}
View.prototype.set$transform = function(transform) {
  this.get$node().get$style().set$transform(transform);
}
// ********** Code for CompositeView **************
$inherits(CompositeView, View);
function CompositeView(_cssName, nestedContainer, scrollable, vertical, showScrollbar) {
  this._nestedContainer = nestedContainer;
  this._view_cssName = _cssName;
  this._view_vertical = vertical;
  this.childViews = new Array();
  this._view_showScrollbar = showScrollbar;
  this._view_scrollable = scrollable;
  View.call(this);
}
CompositeView.prototype.get$childViews = function() { return this.childViews; };
CompositeView.prototype.render = function() {
  var node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("<div class=\"" + this._view_cssName + "\"></div>"));
  if (this._nestedContainer) {
    this.container = ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"scroll-container\"></div>");
    node.get$nodes().add(this.container);
  }
  else {
    this.container = node;
  }
  if (this._view_scrollable) {
    this.scroller = new Scroller(this.container, this._view_vertical, !this._view_vertical, true, null, (1), null, false);
    if (this._view_showScrollbar) {
      this._view_scrollbar = new Scrollbar(this.scroller, true);
    }
  }
  var $$list = this.childViews;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var childView = $$i.next();
    this.container.get$nodes().add(childView.get$node());
  }
  return node;
}
CompositeView.prototype.afterRender = function(node) {
  if (null != this._view_scrollbar) {
    this._view_scrollbar.initialize();
  }
}
CompositeView.prototype.addChild = function(view) {
  this.childViews.add(view);
  if (null != this.container) {
    this.container.get$nodes().add(view.get$node());
  }
  this.childViewAdded(view);
  return view;
}
CompositeView.prototype.removeChild = function(view) {
  this.childViews = this.childViews.filter$1(function _(e) {
    return $ne(view, e);
  }
  );
  if (null != this.container) {
    view.get$node().remove();
  }
}
// ********** Code for ConveyorView **************
$inherits(ConveyorView, CompositeView);
function ConveyorView() {
  this.animationTimeoutId = null;
  CompositeView.call(this, "conveyor-view", true, false, false, false);
}
ConveyorView.prototype.render = function() {
  var result = CompositeView.prototype.render.call(this);
  this.container.get$attributes().$setindex("class", "conveyor-view-container");
  return result;
}
ConveyorView.prototype.selectView = function(targetView_, animate) {
  this.selectedView = targetView_;
  if (this.get$isRendered()) {
    this.adjustOffset(animate);
  }
}
ConveyorView.prototype.adjustOffset = function(animate) {
  var $this = this; // closure support
  var index = this.getIndexOfSelectedView();
  var durationSeconds = animate ? (0.25) : (0);
  var style = this.container.get$style();
  style.set$transitionDuration(("" + durationSeconds + "s"));
  var xTranslationPercent = -index * (100);
  style.set$transform(("translate3d(" + xTranslationPercent + "%, 0px, 0px)"));
  if (this.animationTimeoutId != null) {
    html_get$window().clearTimeout(this.animationTimeoutId);
  }
  if (animate) {
    this.animationTimeoutId = html_get$window().setTimeout((function () {
      $this._onAnimationEnd();
    })
    , ($mul(durationSeconds, (1000))).toInt());
  }
}
ConveyorView.prototype.getIndexOfSelectedView = function() {
  for (var i = (0);
   i < this.childViews.get$length(); i++) {
    if ($eq(this.childViews.$index(i), this.selectedView)) {
      return i;
    }
  }
  $throw("view not found");
}
ConveyorView.prototype.addChild = function(view) {
  view.addClass("conveyor-item");
  view.set$transform($add("translate3d(" + (this.childViews.get$length() * (100)), "%, 0, 0)"));
  return CompositeView.prototype.addChild.call(this, view);
}
ConveyorView.prototype._onAnimationEnd = function() {
  if (this.viewSelected != null) {
    this.viewSelected.call$1(this.selectedView);
  }
}
// ********** Code for MeasureText **************
function MeasureText(font) {
  this.font = font;
  if (null == $globals.MeasureText__context) {
    var canvas = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("canvas");
    $globals.MeasureText__context = canvas.getContext("2d");
  }
  if (null == this._spaceLength) {
    $globals.MeasureText__context.set$font(this.font);
    this._spaceLength = $globals.MeasureText__context.measureText(" ").get$width();
    this._typicalCharLength = $globals.MeasureText__context.measureText("k").get$width();
  }
}
MeasureText.isWhitespace = function(character) {
  return character == " " || character == "\t" || character == "\n";
}
MeasureText.prototype.addLineBrokenText = function(sb, text, lineWidth, maxLines) {
  text = text.trim();
  if (null == sb) {
    $globals.MeasureText__context.set$font(this.font);
    var textWidth = $globals.MeasureText__context.measureText(text).get$width().toInt();
    if (textWidth >= (lineWidth + this._spaceLength) * (maxLines - (1))) {
      return maxLines;
    }
    else if (textWidth == (0)) {
      return (0);
    }
    else if (textWidth < lineWidth) {
      return (1);
    }
  }
  var lines = (0);
  this.lineBreak(text, lineWidth, maxLines, (function (start, end, width) {
    lines++;
    if (lines == maxLines) {
      end = Math.min(end + (50), text.length);
    }
    if (null != sb) {
      if (lines > (1)) {
        sb.add("<br>");
      }
      sb.add(text.substring(start, end));
    }
  })
  );
  return lines;
}
MeasureText.prototype.lineBreak = function(text, lineWidth, maxLines, callback) {
  $globals.MeasureText__context.set$font(this.font);
  var lines = (0);
  var currentLength = (0);
  var startIndex = (0);
  var wordStartIndex = null;
  var lastWordEndIndex = null;
  var lastWhitespace = true;
  for (var i = (0), len = text.length;
   i <= len; i++) {
    var whitespace = i == len || MeasureText.isWhitespace(text[i]);
    if (whitespace && !lastWhitespace) {
      var wordLength = $globals.MeasureText__context.measureText(text.substring(wordStartIndex, i)).get$width();
      currentLength += wordLength;
      if (currentLength > lineWidth) {
        if (null != lastWordEndIndex) {
          lines++;
          callback.call$3(startIndex, lastWordEndIndex, currentLength - wordLength);
        }
        if (lines == maxLines) {
          return;
        }
        startIndex = wordStartIndex;
        currentLength = wordLength;
      }
      lastWordEndIndex = i;
      currentLength += this._spaceLength;
      wordStartIndex = null;
    }
    else if (null == wordStartIndex && !whitespace) {
      wordStartIndex = i;
    }
    lastWhitespace = whitespace;
  }
  if (currentLength > (0)) {
    callback.call$3(startIndex, text.length, currentLength);
  }
}
// ********** Code for PageState **************
function PageState() {
  this.target = new ObservableValue_int((0));
  this.current = new ObservableValue_int((0));
  this.length = new ObservableValue_int((1));
}
PageState.prototype.get$target = function() { return this.target; };
PageState.prototype.get$length = function() { return this.length; };
// ********** Code for PagedContentView **************
$inherits(PagedContentView, CompositeView);
function PagedContentView(content) {
  this.content = content;
  this.pages = new PageState();
  CompositeView.call(this, "paged-content", false, false, false, false);
  this.addChild(new PagedColumnView(this.pages, this.content));
  this.addChild(new PageNumberView(this.pages));
}
// ********** Code for PageNumberView **************
$inherits(PageNumberView, View);
function PageNumberView(pages) {
  this.pages = pages;
  View.call(this);
}
PageNumberView.prototype.render = function() {
  var node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory("        <div class=\"page-number\">\n          <div class=\"page-number-left\">&lsaquo;</div>\n          <div class=\"page-number-label\"></div>\n          <div class=\"page-number-right\">&rsaquo;</div>\n        </div>\n        ");
  this._left = node.query$1(".page-number-left");
  this._label = node.query$1(".page-number-label");
  this._right = node.query$1(".page-number-right");
  return node;
}
PageNumberView.prototype.enterDocument = function() {
  var $this = this; // closure support
  this.watch(this.pages.current, (function (s) {
    return $this._update();
  })
  );
  this.watch(this.pages.length, (function (s) {
    return $this._update();
  })
  );
  this._left.get$on().get$click().add$1((function (e) {
    if ($this.pages.current.get$value() > (0)) {
      $this.pages.target.set$value($this.pages.current.get$value() - (1));
    }
  })
  );
  this._right.get$on().get$click().add$1((function (e) {
    if ($this.pages.current.get$value() + (1) < $this.pages.length.get$value()) {
      $this.pages.target.set$value($this.pages.current.get$value() + (1));
    }
  })
  );
}
PageNumberView.prototype._update = function() {
  this._label.set$text(("" + (this.pages.current.get$value() + (1)) + " of " + this.pages.length.get$value()));
}
// ********** Code for PagedColumnView **************
$inherits(PagedColumnView, View);
function PagedColumnView(pages, contentView) {
  this.pages = pages;
  this.contentView = contentView;
  View.call(this);
}
PagedColumnView.prototype.render = function() {
  var $this = this; // closure support
  var node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory("      <div class=\"paged-column\">\n        <div class=\"paged-column-container\"></div>\n      </div>");
  this._container = node.query$1(".paged-column-container");
  this._container.get$nodes().add(this.contentView.get$node());
  this.scroller = new Scroller(this._container, false, true, true, (function () {
    var completer = new CompleterImpl_Size();
    $this._container.get$rect().then((function (rect) {
      completer.complete$1(new Size($this._getViewLength(rect), (1)));
    })
    );
    return completer.get$future();
  })
  , (0.84), null, false);
  this.scroller.get$onDecelStart().add$1(this.get$_snapToPage());
  this.scroller.get$onScrollerDragEnd().add$1(this.get$_snapToPage());
  this.scroller.get$onContentMoved().add$1(this.get$_view_onContentMoved());
  return node;
}
PagedColumnView.prototype._getViewLength = function(rect) {
  return this._computePageSize(rect) * this.pages.length.get$value();
}
PagedColumnView.prototype.enterDocument = function() {
  var $this = this; // closure support
  this.contentView.get$node().get$computedStyle().then((function (style) {
    $this._computeColumnGap(style);
    $this.windowResized();
    var $$list = $this.contentView.get$node().queryAll("img");
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var img = $$i.next();
      if (!img.get$complete()) {
        img.get$on().get$load().add$1((function (e) {
          $this._updatePageCount(to$call$0(null));
        })
        );
      }
    }
    $this.watch($this.pages.target, (function (s) {
      return $this._view_onPageSelected();
    })
    );
    $this.watch($this.pages.length, (function (s) {
      return $this._view_onPageSelected();
    })
    );
  })
  );
}
PagedColumnView.prototype._computeColumnGap = function(style) {
  var gap = style.get$columnGap();
  if (gap == "normal") {
    gap = style.get$fontSize();
  }
  this._columnGap = PagedColumnView._toPixels(gap, "column-gap or font-size");
  this._columnWidth = PagedColumnView._toPixels(style.get$columnWidth(), "column-width");
}
PagedColumnView._toPixels = function(value, message) {
  if (value.endsWith("px")) {
    value = value.substring((0), value.length - (2));
  }
  return Math.parseDouble(value).round().toInt();
}
PagedColumnView.prototype.windowResized = function() {
  var $this = this; // closure support
  this.get$node().get$rect().then((function (rect) {
    $this.contentView.get$node().get$style().set$height(("" + rect.offset.get$height() + "px"));
  })
  );
  this._updatePageCount(to$call$0(null));
}
PagedColumnView.prototype._updatePageCount = function(callback) {
  var $this = this; // closure support
  var pageLength = (1);
  this._container.get$rect().then((function (rect) {
    if (rect.scroll.get$width() > rect.offset.get$width()) {
      pageLength = (rect.scroll.get$width() / $this._computePageSize(rect)).ceil().toInt();
    }
    pageLength = Math.max(pageLength, (1));
    var oldPage = $this.pages.target.get$value();
    var newPage = Math.min(oldPage, pageLength - (1));
    if (oldPage == newPage) {
      $this.pages.target.set$value((0));
    }
    $this.pages.target.set$value(newPage);
    $this.pages.length.set$value(pageLength);
    if (callback != null) {
      callback();
    }
  })
  );
}
PagedColumnView.prototype._view_onContentMoved = function(e) {
  var $this = this; // closure support
  this._container.get$rect().then((function (rect) {
    var current = $this.scroller.get$contentOffset().x;
    var pageSize = $this._computePageSize(rect);
    $this.pages.current.set$value(-(current / pageSize).round().toInt());
  })
  );
}
PagedColumnView.prototype.get$_view_onContentMoved = function() {
  return this._view_onContentMoved.bind(this);
}
PagedColumnView.prototype._snapToPage = function(e) {
  var $this = this; // closure support
  var current = this.scroller.get$contentOffset().x;
  var currentTarget = this.scroller.get$currentTarget().x;
  this._container.get$rect().then((function (rect) {
    var pageSize = $this._computePageSize(rect);
    var destination;
    var currentPageNumber = -(current / pageSize).round();
    var pageNumber = -currentTarget / pageSize;
    if (current == currentTarget) {
      pageNumber = pageNumber.round();
    }
    else {
      if (currentPageNumber == pageNumber.round() && (pageNumber - currentPageNumber).abs() > (0.01) && -current + $this._viewportSize < $this._getViewLength(rect) && current < (0)) {
        pageNumber = currentTarget < current ? currentPageNumber + (1) : currentPageNumber - (1);
      }
      else {
        pageNumber = pageNumber.round();
      }
    }
    pageNumber = pageNumber.toInt();
    var translate = -pageNumber * pageSize;
    $this.pages.current.set$value(pageNumber);
    if (currentTarget != translate) {
      $this.scroller.throwTo(translate, (0));
    }
    else {
      $this.pages.target.set$value(pageNumber);
    }
  })
  );
}
PagedColumnView.prototype.get$_snapToPage = function() {
  return this._snapToPage.bind(this);
}
PagedColumnView.prototype._computePageSize = function(rect) {
  this._viewportSize = rect.offset.get$width();
  var perPage = Math.max((1), $truncdiv((this._viewportSize + this._columnGap), (this._columnWidth + this._columnGap)));
  var columnSize = $truncdiv((this._viewportSize - (perPage - (1)) * this._columnGap), perPage);
  return perPage * (columnSize + this._columnGap);
}
PagedColumnView.prototype._view_onPageSelected = function() {
  var $this = this; // closure support
  this._container.get$rect().then((function (rect) {
    var translate = -$this.pages.target.get$value() * $this._computePageSize(rect);
    $this.scroller.throwTo(translate, (0));
  })
  );
}
// ********** Code for SliderMenu **************
$inherits(SliderMenu, View);
function SliderMenu(_menuItems, onSelect) {
  this._menuItems = _menuItems;
  this.onSelect = onSelect;
  View.call(this);
}
SliderMenu.prototype.render = function() {
  var items = new StringBufferImpl("");
  var $$list = this._menuItems;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    items.add$1(("<div class=\"sm-item\">" + item + "</div>"));
  }
  return ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("        <div class=\"sm-root\">\n          <div class=\"sm-item-box\">\n            <div class=\"sm-item-filler\"></div>\n            " + items + "\n            <div class=\"sm-item-filler\"></div>\n          </div>\n          <div class=\"sm-slider-box\">\n            <div class=\"sm-triangle\"></div>\n          </div>\n        </div>\n        "));
}
SliderMenu.prototype.enterDocument = function() {
  var $this = this; // closure support
  this.selectItem(this.get$node().query(".sm-item"), false);
  if (Device.get$supportsTouch()) {
    this.get$node().get$on().get$touchStart().add$1((function (event) {
      $this.touchItem = $this.itemOfTouchEvent(event);
      if ($this.touchItem != null) {
        $this.selectItemText($this.touchItem);
      }
      event.preventDefault();
    })
    );
    this.get$node().get$on().get$touchEnd().add$1((function (event) {
      if ($this.touchItem != null) {
        if ($eq($this.itemOfTouchEvent(event), $this.touchItem)) {
          $this.selectItem($this.touchItem, true);
        }
        else {
          $this.selectItemText($this.selectedItem);
        }
        $this.touchItem = null;
      }
      event.preventDefault();
    })
    );
  }
  else {
    this.get$node().get$on().get$click().add$1((function (event) {
      return $this.selectItem(event.get$target(), true);
    })
    );
  }
  html_get$window().get$on().get$resize().add$1((function (event) {
    return $this.updateIndicator(false);
  })
  );
}
SliderMenu.prototype.itemOfTouchEvent = function(event) {
  var node = event.get$changedTouches().$index((0)).get$target();
  return this.itemOfNode(node);
}
SliderMenu.prototype.itemOfNode = function(node) {
  while (node != null && $ne(node, html_get$document())) {
    if (!!(node && node.is$html_Element())) {
      var element = node;
      if (element.get$classes().contains("sm-item")) {
        return element;
      }
    }
    node = node.get$parent();
  }
  return null;
}
SliderMenu.prototype.selectItemText = function(item) {
  var $$list = this.get$node().queryAll(".sm-item");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var sliderItem = $$i.next();
    sliderItem.get$classes().remove("sel");
  }
  item.get$classes().add("sel");
}
SliderMenu.prototype.selectItem = function(item, animate) {
  if (!item.get$classes().contains("sm-item")) {
    return;
  }
  this.selectedItem = item;
  this.selectItemText(item);
  this.updateIndicator(animate);
  this.onSelect(item.get$text());
}
SliderMenu.prototype.selectNext = function(animate) {
  var result = this.get$node().query(".sm-item.sel").get$nextElementSibling();
  if ($ne(result)) {
    this.selectItem(result, animate);
  }
}
SliderMenu.prototype.selectPrevious = function(animate) {
  var result = this.get$node().query(".sm-item.sel").get$previousElementSibling();
  if ($ne(result)) {
    this.selectItem(result, animate);
  }
}
SliderMenu.prototype.updateIndicator = function(animate) {
  var $this = this; // closure support
  if (this.selectedItem != null) {
    this.selectedItem.get$rect().then((function (rect) {
      var x = rect.offset.get$left() + rect.offset.get$width() / (2) - (12);
      $this._moveIndicator(x, animate);
    })
    );
  }
  else {
    this._moveIndicator((0), animate);
  }
}
SliderMenu.prototype._moveIndicator = function(x, animate) {
  var duration = animate ? ".3s" : "0s";
  var triangle = this.get$node().query(".sm-triangle");
  triangle.get$style().set$transitionDuration(duration);
  FxUtil.setWebkitTransform(triangle, x, (0), (0));
}
// ********** Code for top level **************
//  ********** Library swarmlib **************
// ********** Code for App **************
function App() {

}
App.prototype.run = function() {
  var $this = this; // closure support
  if (html_get$document().get$readyState() == "interactive" || html_get$document().get$readyState() == "complete" || html_get$document().get$readyState() == "loaded") {
    html_get$window().setTimeout((function () {
      return $this.onLoad();
    })
    , (0));
  }
  else {
    html_get$window().get$on().get$contentLoaded().add$1(EventBatch.wrap((function (event) {
      return $this.onLoad();
    })
    ));
  }
}
App.prototype.onLoad = function() {
  var $this = this; // closure support
  html_get$document().get$on().get$touchMove().add$1((function (event) {
    return event.preventDefault();
  })
  );
  if (!this.swapAndReloadCache()) {
    html_get$window().get$applicationCache().get$on().get$updateReady().add$1((function (e) {
      return $this.swapAndReloadCache();
    })
    );
  }
}
App.prototype.eraseSplashScreen = function() {
  var splash = html_get$document().query("#appSplash");
  if (null != splash) {
    splash.remove$0();
  }
}
App.prototype.swapAndReloadCache = function() {
  var $0;
  var appCache = html_get$window().get$applicationCache();
  if ((($0 = appCache.get$status()) == null ? null != ((4)) : $0 !== (4))) {
    return false;
  }
  dart_core_print("App cache update ready, now swapping...");
  html_get$window().get$applicationCache().swapCache();
  dart_core_print("App cache swapped, now reloading page...");
  html_get$window().get$location().reload();
  return true;
}
// ********** Code for BiIterator **************
function BiIterator() {}
BiIterator.prototype.next = function() {
  var $0;
  if (this.currentIndex.get$value() < this.list.get$length() - (1)) {
    ($0 = this.currentIndex).set$value($0.get$value() + (1));
  }
  return this.list.$index(this.currentIndex.get$value());
}
BiIterator.prototype.get$current = function() {
  return this.list.$index(this.currentIndex.get$value());
}
BiIterator.prototype.previous = function() {
  var $0;
  if (this.currentIndex.get$value() > (0)) {
    ($0 = this.currentIndex).set$value($0.get$value() - (1));
  }
  return this.list.$index(this.currentIndex.get$value());
}
BiIterator.prototype.jumpToValue = function(val) {
  var $0;
  for (var i = (0);
   i < this.list.get$length(); i++) {
    if ((($0 = this.list.$index(i)) == null ? null == (val) : $0 === val)) {
      this.currentIndex.set$value(i);
      break;
    }
  }
}
// ********** Code for BiIterator_Article **************
$inherits(BiIterator_Article, BiIterator);
function BiIterator_Article(list, oldListeners) {
  this.currentIndex = new ObservableValue_int((0));
  this.list = list;
  if (oldListeners != null) {
    this.currentIndex.listeners = oldListeners;
  }
}
// ********** Code for BiIterator_Feed **************
$inherits(BiIterator_Feed, BiIterator);
function BiIterator_Feed(list, oldListeners) {
  this.currentIndex = new ObservableValue_int((0));
  this.list = list;
  if (oldListeners != null) {
    this.currentIndex.listeners = oldListeners;
  }
}
// ********** Code for BiIterator_Section **************
$inherits(BiIterator_Section, BiIterator);
function BiIterator_Section(list, oldListeners) {
  this.currentIndex = new ObservableValue_int((0));
  this.list = list;
  if (oldListeners != null) {
    this.currentIndex.listeners = oldListeners;
  }
}
// ********** Code for DialogView **************
$inherits(DialogView, View);
function DialogView(_title, _cssName, _content) {
  this._content = _content;
  this._title = _title;
  this._cssName = _cssName;
  View.call(this);
}
DialogView.prototype.render = function() {
  var $this = this; // closure support
  var node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("      <div class=\"dialog-modal\">\n        <div class=\"dialog " + this._cssName + "\">\n          <div class=\"dialog-title-area\">\n            <span class=\"dialog-title\">" + this._title + "</span>\n          </div>\n          <div class=\"dialog-body\"></div>\n        </div>\n      </div>"));
  this._done = new PushButtonView("Done", "done-button", EventBatch.wrap((function (e) {
    return $this.onDone();
  })
  ));
  var titleArea = node.query$1(".dialog-title-area");
  titleArea.get$nodes().add(this._done.get$node());
  this.container = node.query$1(".dialog-body");
  this.container.get$nodes().add(this._content.get$node());
  return node;
}
DialogView.prototype.onDone = function() {

}
// ********** Code for ConfigHintDialog **************
$inherits(ConfigHintDialog, DialogView);
ConfigHintDialog._impl$ctor = function(_parent, _doneHandler, content) {
  this._doneHandler = _doneHandler;
  this._parent = _parent;
  DialogView.call(this, "Feed configuration", "", content);
}
ConfigHintDialog._impl$ctor.prototype = ConfigHintDialog.prototype;
function ConfigHintDialog() {}
ConfigHintDialog.ConfigHintDialog$factory = function(parent, doneHandler) {
  var content = ConfigHintDialog.makeContent();
  return new ConfigHintDialog._impl$ctor(parent, doneHandler, content);
}
ConfigHintDialog.prototype.onDone = function() {
  this._doneHandler.call$0();
}
ConfigHintDialog.makeContent = function() {
  return new View.html$ctor("        <div>\n          Add or remove feeds in\n          <a href=\"https://www.google.com/reader\" target=\"_blank\">\n            Google Reader</a>'s \"Subscriptions\".\n          Then come back here and click \"Done\" and we'll load your updated\n          list of subscriptions.\n        </div>\n        ");
}
// ********** Code for HelpDialog **************
$inherits(HelpDialog, DialogView);
function HelpDialog(_parent, _doneHandler) {
  this._doneHandler = _doneHandler;
  this._parent = _parent;
  DialogView.call(this, "Information", "", HelpDialog.makeContent());
}
HelpDialog.prototype.onDone = function() {
  this._doneHandler.call$0();
}
HelpDialog.makeContent = function() {
  return new View.html$ctor(("        <div>\n        \n          <p>\n          Keyboard shortcuts: \n          " + HelpDialog.generateTableHtml() + "  \n          </p>\n\n          <p>\n          <div id=\"dart-logo\">  \n          <a href=\"http://dartlang.org\">\n          Dart, the programming language</a>.\n          </div>\n          </p>\n        </div>\n        "));
}
HelpDialog.generateTableHtml = function() {
  var cellStart = "<th valign=\"middle\" align=\"center\">";
  return ("<table width=\"90%\" border=1 cellspacing=\"0\" cellpadding=\"2\">\n            <tr bgcolor=\"#c3d9ff\"> \n              " + cellStart + " Shortcut Key </th>\n              " + cellStart + " Action </th>\n            </tr>\n            <tr>\n              " + cellStart + " j, &lt;down arrow&gt; </th>\n              " + cellStart + " Next Article </th>\n            </tr>\n            <tr>\n              " + cellStart + " k, &lt;up arrow&gt; </th>\n              " + cellStart + " Previous Article </th>\n            </tr>\n            <tr>\n              " + cellStart + " o, &lt;enter&gt; </th>\n              " + cellStart + " Open Article </th>\n            </tr>\n            <tr>\n              " + cellStart + " &lt;esc&gt;, &lt;delete&gt; </th>\n              " + cellStart + " Back </th>\n            </tr>\n            <tr>\n              " + cellStart + " a, h, &lt;left arrow&gt; </th>\n              " + cellStart + " Left </th>\n            </tr>\n            <tr>\n              " + cellStart + " d, l, &lt;right arrow&gt; </th>\n              " + cellStart + " Right </th>\n            </tr>\n            <tr>\n              " + cellStart + " n </th>\n              " + cellStart + " Next Category </th>\n            </tr>\n            <tr>\n              " + cellStart + " p </th>\n              " + cellStart + " Previous Category </th>\n            </tr>\n\n        </table>");
}
// ********** Code for UIState **************
function UIState() {

}
UIState.prototype.startHistoryTracking = function() {
  var $this = this; // closure support
  this.stopHistoryTracking();
  var firstEvent = true;
  this._historyTracking = to$call$1(EventBatch.wrap((function (event) {
    var state = html_get$window().get$location().get$hash();
    if (state.startsWith("#")) {
      state = state.substring((1), state.length);
    }
    if (firstEvent && state != "") {
      html_get$window().get$history().replaceState(null, html_get$document().get$title(), "#");
    }
    else if (state != "") {
      $this.loadFromHistory(json_JSON.parse(state));
    }
    firstEvent = false;
  })
  ));
  html_get$window().get$on().get$popState().add$1(this._historyTracking);
}
UIState.prototype.stopHistoryTracking = function() {
  if (this._historyTracking != null) {
    html_get$window().get$on().get$popState().add$1(this._historyTracking);
  }
}
UIState.prototype.pushToHistory = function() {
  if (this._historyTracking == null) {
    $throw("history tracking not started");
  }
  var state = json_JSON.stringify(this.toHistory());
  html_get$window().get$history().pushState(null, html_get$document().get$title(), $add("#", state));
}
// ********** Code for SwarmState **************
$inherits(SwarmState, UIState);
function SwarmState(_dataModel) {
  var $this = this; // closure support
  this._dataModel = _dataModel;
  this.currentArticle = new ObservableValue_Article();
  this.storyMaximized = new ObservableValue_bool(false);
  this.storyTextMode = new ObservableValue_bool(true);
  this.selectedArticle = new ObservableValue_Article();
  UIState.call(this);
  this.startHistoryTracking();
  this._sectionIterator = new BiIterator_Section(this._dataModel.get$sections());
  this._feedIterator = new BiIterator_Feed(this._sectionIterator.get$current().feeds);
  this._articleIterator = new BiIterator_Article(this._feedIterator.get$current().articles);
  this.currentArticle.addChangeListener((function (e) {
    $this._articleIterator.jumpToValue($this.currentArticle.get$value());
  })
  );
}
SwarmState.prototype.toHistory = function() {
  var data = new HashMapImplementation();
  data.$setindex("section", this.get$currentSection().id);
  data.$setindex("feed", this.get$currentFeed().id);
  if (this.currentArticle.get$value() != null) {
    data.$setindex("article", this.currentArticle.get$value().id);
  }
  return data;
}
SwarmState.prototype.loadFromHistory = function(values) {
  if ($ne(values.$index("section"))) {
    this._sectionIterator.jumpToValue(this._dataModel.findSectionById(values.$index("section")));
  }
  else {
    this._sectionIterator = new BiIterator_Section(this._dataModel.get$sections());
  }
  if ($ne(values.$index("feed")) && this.get$currentSection() != null) {
    this._feedIterator.jumpToValue(this.get$currentSection().findFeed(values.$index("feed")));
  }
  else {
    this._feedIterator = new BiIterator_Feed(this._sectionIterator.get$current().feeds);
  }
  if ($ne(values.$index("article")) && this.get$currentFeed() != null) {
    this.currentArticle.set$value(this.get$currentFeed().findArticle(values.$index("article")));
    this._articleIterator.jumpToValue(this.currentArticle.get$value());
  }
  else {
    this._articleIterator = new BiIterator_Article(this._feedIterator.get$current().articles);
    this.currentArticle.set$value(null);
  }
  this.storyMaximized.set$value(false);
}
SwarmState.prototype.goToNextArticle = function() {
  this.currentArticle.set$value(this._articleIterator.next());
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.goToPreviousArticle = function() {
  this.currentArticle.set$value(this._articleIterator.previous());
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.goToNextSelectedArticle = function() {
  this.selectedArticle.set$value(this._articleIterator.next());
}
SwarmState.prototype.goToPreviousSelectedArticle = function() {
  this.selectedArticle.set$value(this._articleIterator.previous());
}
SwarmState.prototype.goToNextFeed = function() {
  var newFeed = this._feedIterator.next();
  var oldIndex = this._articleIterator.currentIndex.get$value();
  this._articleIterator = new BiIterator_Article(newFeed.get$articles(), this._articleIterator.currentIndex.listeners);
  this._articleIterator.currentIndex.set$value(oldIndex);
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.goToPreviousFeed = function() {
  var newFeed = this._feedIterator.previous();
  var oldIndex = this._articleIterator.currentIndex.get$value();
  this._articleIterator = new BiIterator_Article(newFeed.get$articles(), this._articleIterator.currentIndex.listeners);
  this._articleIterator.currentIndex.set$value(oldIndex);
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.goToNextSection = function(sliderMenu) {
  var oldSection = this.get$currentSection();
  var oldIndex = this._articleIterator.currentIndex.get$value();
  sliderMenu.selectNext(true);
  if ($ne(oldSection, this._sectionIterator.get$current())) {
    this._feedIterator = new BiIterator_Feed(this._sectionIterator.get$current().feeds, this._feedIterator.currentIndex.listeners);
    this._articleIterator = new BiIterator_Article(this._feedIterator.get$current().articles, this._articleIterator.currentIndex.listeners);
    this._articleIterator.currentIndex.set$value(oldIndex);
    this.selectedArticle.set$value(this._articleIterator.get$current());
  }
}
SwarmState.prototype.goToPreviousSection = function(sliderMenu) {
  var oldSection = this.get$currentSection();
  var oldIndex = this._articleIterator.currentIndex.get$value();
  sliderMenu.selectPrevious(true);
  if ($ne(oldSection, this._sectionIterator.get$current())) {
    this._feedIterator = new BiIterator_Feed(this._sectionIterator.get$current().feeds, this._feedIterator.currentIndex.listeners);
    this._feedIterator.currentIndex.set$value(this._feedIterator.list.get$length() - (1));
    this._articleIterator = new BiIterator_Article(this._feedIterator.get$current().articles, this._articleIterator.currentIndex.listeners);
    this._articleIterator.currentIndex.set$value(oldIndex);
    this.selectedArticle.set$value(this._articleIterator.get$current());
  }
}
SwarmState.prototype.selectStoryAsCurrent = function() {
  this.currentArticle.set$value(this._articleIterator.get$current());
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.clearCurrentArticle = function() {
  this.currentArticle.set$value(null);
}
SwarmState.prototype.goToFirstArticleInSection = function() {
  this.selectedArticle.set$value(this._articleIterator.get$current());
}
SwarmState.prototype.get$inMainView = function() {
  return this.currentArticle.get$value() == null;
}
SwarmState.prototype.get$hasArticleSelected = function() {
  return this.selectedArticle.get$value() != null;
}
SwarmState.prototype.markCurrentAsRead = function() {
  this.currentArticle.get$value().unread.set$value(false);
}
SwarmState.prototype.moveToNewSection = function(sectionTitle) {
  this._sectionIterator.currentIndex.set$value(this._dataModel.findSectionIndex(sectionTitle));
  this._feedIterator = new BiIterator_Feed(this._sectionIterator.get$current().feeds, this._feedIterator.currentIndex.listeners);
  this._articleIterator = new BiIterator_Article(this._feedIterator.get$current().articles, this._articleIterator.currentIndex.listeners);
}
SwarmState.prototype.get$currentSection = function() {
  return this._sectionIterator.get$current();
}
SwarmState.prototype.get$currentFeed = function() {
  return this._feedIterator.get$current();
}
// ********** Code for FrontView **************
$inherits(FrontView, CompositeView);
function FrontView(swarm) {
  var $this = this; // closure support
  this.backKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(8), (27)]);
  this.rightKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(39), (68), (76)]);
  this.swarm = swarm;
  this.previousPageKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(80)]);
  this.nextPageKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(78)]);
  this.leftKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(37), (65), (72)]);
  this.openKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(13), (79)]);
  this.nextPrevShown = false;
  this.downKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(74), (40)]);
  this.upKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(75), (38)]);
  CompositeView.call(this, "front-view fullpage", false, false, false, false);
  this.topView = new CompositeView("top-view", false, false, false, false);
  this.headerView = new HeaderView(this.swarm);
  this.topView.addChild(this.headerView);
  this.sliderMenu = new SliderMenu(this.swarm.sections.get$sectionTitles(), (function (sectionTitle) {
    $this.swarm.state.moveToNewSection(sectionTitle);
    $this._onSectionSelected(sectionTitle);
    $this.swarm.state.selectedArticle.set$value(null);
  })
  );
  this.topView.addChild(this.sliderMenu);
  this.addChild(this.topView);
  this.bottomView = new CompositeView("bottom-view", false, false, false, false);
  this.addChild(this.bottomView);
  this.sections = new ConveyorView();
  this.sections.viewSelected = this.get$_onSectionTransitionEnded();
}
FrontView.prototype.get$currentSection = function() {
  var view = this.sections.selectedView;
  if ($eq(view)) {
    view = this.sections.childViews.$index((0));
    this.sections.selectView(view, true);
  }
  return view;
}
FrontView.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this._createSectionViews();
  this.attachWatch(this.swarm.state.currentArticle, (function (e) {
    $this._refreshCurrentArticle();
  })
  );
  this.attachWatch(this.swarm.state.storyMaximized, (function (e) {
    $this._refreshMaximized();
  })
  );
}
FrontView.prototype._refreshCurrentArticle = function() {
  if (!this.swarm.state.get$inMainView()) {
    this._animateToStory(this.swarm.state.currentArticle.get$value());
  }
  else {
    this._animateToMainView();
  }
}
FrontView.prototype._animateToMainView = function() {
  var $this = this; // closure support
  this.sliderMenu.removeClass("hidden");
  this.storyView.addClass("hidden-story");
  this.get$currentSection().set$storyMode(false);
  this.headerView.startTransitionToMainView();
  this.get$currentSection().dataSourceView.reattachSubview(this.detachedView.source, this.detachedView, true);
  function handler(e) {
    $this.storyView.get$node().get$on().get$transitionEnd().remove(handler, false);
    $this.get$currentSection().set$hidden(false);
    $this.removeChild($this.storyView);
    $this.storyView = null;
    $this.detachedView.removeClass("sel");
    $this.detachedView = null;
  }
  this.storyView.get$node().get$on().get$transitionEnd().add$1(handler);
}
FrontView.prototype._animateToStory = function(item) {
  var $this = this; // closure support
  var source = item.dataSource;
  if (this.detachedView != null && $ne(this.detachedView.source, source)) {
    return;
  }
  if (this.storyView != null) {
    this.removeChild(this.storyView);
    this.storyView = this.addChild(new StoryContentView(this.swarm, item));
  }
  else {
    var view = this.get$currentSection().findView(source);
    var newPosition = FxUtil.computeRelativePosition(view.get$node(), this.bottomView.get$node());
    this.get$currentSection().dataSourceView.detachSubview(view.get$source());
    this.detachedView = view;
    FxUtil.setPosition(view.get$node(), newPosition);
    this.bottomView.addChild(view);
    view.addClass("sel");
    this.get$currentSection().set$storyMode(true);
    this.storyView = new StoryContentView(this.swarm, item);
    html_get$window().setTimeout((function () {
      $this._animateDataSourceToMinimized();
      $this.sliderMenu.addClass("hidden");
      html_get$window().setTimeout((function () {
        $this.storyView.addClass("hidden-story");
        $this.addChild($this.storyView);
        html_get$window().setTimeout((function () {
          $this.storyView.removeClass("hidden-story");
        })
        , (0));
        $this.headerView.endTransitionToStoryView();
      })
      , (0));
    })
    , (0));
  }
}
FrontView.prototype._refreshMaximized = function() {
  if (this.swarm.state.storyMaximized.get$value()) {
    this._animateDataSourceToMaximized();
  }
  else {
    this._animateDataSourceToMinimized();
  }
}
FrontView.prototype._animateDataSourceToMaximized = function() {
  FxUtil.setWebkitTransform(this.topView.get$node(), (0), (-80), (0));
  if (this.detachedView != null) {
    FxUtil.setWebkitTransform(this.detachedView.get$node(), (0), (-34), (0));
  }
}
FrontView.prototype._animateDataSourceToMinimized = function() {
  if (this.detachedView != null) {
    FxUtil.setWebkitTransform(this.detachedView.get$node(), (0), (0), (0));
    FxUtil.setWebkitTransform(this.topView.get$node(), (0), (0), (0));
  }
}
FrontView.prototype._onSectionTransitionEnded = function(selectedView) {
  var $$list = this.sections.childViews;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var view = $$i.next();
    if ($eq(view, selectedView)) {
      view.showSources();
    }
    else {
      view.hideSources();
    }
  }
}
FrontView.prototype.get$_onSectionTransitionEnded = function() {
  return this._onSectionTransitionEnded.bind(this);
}
FrontView.prototype._onSectionSelected = function(sectionTitle) {
  var section = this.swarm.sections.findSection(sectionTitle);
  var $$list = this.sections.childViews;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var view = $$i.next();
    if ($eq(view.get$section(), section)) {
      this.sections.selectView(view, true);
      break;
    }
  }
}
FrontView.prototype._createSectionViews = function() {
  var $$list = this.swarm.sections;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var section = $$i.next();
    var viewFactory = new DataSourceViewFactory(this.swarm);
    var sectionView = new SectionView(this.swarm, section, viewFactory);
    sectionView.get$node();
    this.sections.addChild(sectionView);
  }
  this.addChild(this.sections);
}
FrontView.prototype.processKeyEvent = function(e) {
  var code = e.get$keyCode();
  if (this.swarm.state.get$inMainView()) {
    if (!this.swarm.state.get$hasArticleSelected()) {
      this.swarm.state.goToFirstArticleInSection();
    }
    else if (this.rightKeyPresses.contains(code)) {
      this.swarm.state.goToNextFeed();
    }
    else if (this.leftKeyPresses.contains(code)) {
      this.swarm.state.goToPreviousFeed();
    }
    else if (this.downKeyPresses.contains(code)) {
      this.swarm.state.goToNextSelectedArticle();
    }
    else if (this.upKeyPresses.contains(code)) {
      this.swarm.state.goToPreviousSelectedArticle();
    }
    else if (this.openKeyPresses.contains(code)) {
      this.swarm.state.selectStoryAsCurrent();
    }
    else if (this.nextPageKeyPresses.contains(code)) {
      this.swarm.state.goToNextSection(this.sliderMenu);
    }
    else if (this.previousPageKeyPresses.contains(code)) {
      this.swarm.state.goToPreviousSection(this.sliderMenu);
    }
  }
  else {
    if (this.downKeyPresses.contains(code)) {
      this.swarm.state.goToNextArticle();
    }
    else if (this.upKeyPresses.contains(code)) {
      this.swarm.state.goToPreviousArticle();
    }
    else if (this.backKeyPresses.contains(code)) {
      this.swarm.state.clearCurrentArticle();
    }
  }
}
// ********** Code for SwarmBackButton **************
$inherits(SwarmBackButton, View);
function SwarmBackButton(swarm) {
  this.swarm = swarm;
  View.call(this);
}
SwarmBackButton.prototype.render = function() {
  return ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"back-arrow button\"></div>");
}
SwarmBackButton.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this.addOnClick((function (e) {
    _backToMain($this.swarm.state);
  })
  );
}
// ********** Code for HeaderView **************
$inherits(HeaderView, CompositeView);
function HeaderView(swarm) {
  this.swarm = swarm;
  CompositeView.call(this, "header-view", false, false, false, false);
  this._backButton = this.addChild(new SwarmBackButton(this.swarm));
  this._title = this.addChild(View.div("app-title", "Swarm"));
  this._configButton = this.addChild(View.div("config button"));
  this._refreshButton = this.addChild(View.div("refresh button"));
  this._infoButton = this.addChild(View.div("info-button button"));
  this._webBackButton = this.addChild(new WebBackButton());
  this._webForwardButton = this.addChild(new WebForwardButton());
  this._newWindowButton = this.addChild(View.div("new-window-button button"));
}
HeaderView.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this.attachWatch(this.swarm.state.storyTextMode, (function (e) {
    $this.refreshWebStoryButtons();
  })
  );
  this._title.addOnClick((function (e) {
    _backToMain($this.swarm.state);
  })
  );
  this._configButton.addOnClick((function (e) {
    if ($this._configDialog == null) {
      $this._configDialog = ConfigHintDialog.ConfigHintDialog$factory($this.swarm.frontView, (function () {
        $this.swarm.frontView.removeChild($this._configDialog);
        $this._configDialog = null;
        $this.swarm.sections.refresh();
      })
      );
      $this.swarm.frontView.addChild($this._configDialog);
    }
  })
  );
  this._refreshButton.addOnClick(to$call$1(EventBatch.wrap((function (e) {
    $this.swarm.refresh();
  })
  )));
  this._infoButton.addOnClick((function (e) {
    if ($this._infoDialog == null) {
      $this._infoDialog = new HelpDialog($this.swarm.frontView, (function () {
        $this.swarm.frontView.removeChild($this._infoDialog);
        $this._infoDialog = null;
        $this.swarm.sections.refresh();
      })
      );
      $this.swarm.frontView.addChild($this._infoDialog);
    }
  })
  );
  this._newWindowButton.addOnClick((function (e) {
    var currentArticleSrcUrl = $this.swarm.state.currentArticle.get$value().srcUrl;
    html_get$window().open(currentArticleSrcUrl, "_blank");
  })
  );
  this.startTransitionToMainView();
}
HeaderView.prototype.refreshWebStoryButtons = function() {
  var webButtonsHidden = true;
  if (this.swarm.state.currentArticle.get$value() != null) {
    webButtonsHidden = this.swarm.state.storyTextMode.get$value();
  }
  this._webBackButton.set$hidden(webButtonsHidden);
  this._webForwardButton.set$hidden(webButtonsHidden);
  this._newWindowButton.set$hidden(webButtonsHidden);
}
HeaderView.prototype.startTransitionToMainView = function() {
  this._title.removeClass("in-story");
  this._backButton.removeClass("in-story");
  this._configButton.removeClass("in-story");
  this._refreshButton.removeClass("in-story");
  this._infoButton.removeClass("in-story");
  this.refreshWebStoryButtons();
}
HeaderView.prototype.endTransitionToStoryView = function() {
  this._title.addClass("in-story");
  this._backButton.addClass("in-story");
  this._configButton.addClass("in-story");
  this._refreshButton.addClass("in-story");
  this._infoButton.addClass("in-story");
}
// ********** Code for WebBackButton **************
$inherits(WebBackButton, View);
function WebBackButton() {
  View.call(this);
}
WebBackButton.prototype.render = function() {
  return ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"web-back-button button\"></div>");
}
WebBackButton.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this.addOnClick((function (e) {
    WebBackButton.back();
  })
  );
}
WebBackButton.back = function() {
  html_get$window().get$history().back();
}
// ********** Code for WebForwardButton **************
$inherits(WebForwardButton, View);
function WebForwardButton() {
  View.call(this);
}
WebForwardButton.prototype.render = function() {
  return ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"web-forward-button button\"></div>");
}
WebForwardButton.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this.addOnClick((function (e) {
    WebForwardButton.forward();
  })
  );
}
WebForwardButton.forward = function() {
  html_get$window().get$history().forward();
}
// ********** Code for DataSourceViewFactory **************
function DataSourceViewFactory(swarm) {
  this.swarm = swarm;
}
DataSourceViewFactory.prototype.newView = function(data) {
  return new DataSourceView(data, this.swarm);
}
DataSourceViewFactory.prototype.get$width = function() {
  return ArticleViewLayout.getSingleton().width;
}
DataSourceViewFactory.prototype.get$height = function() {
  return null;
}
// ********** Code for DataSourceView **************
$inherits(DataSourceView, CompositeView);
function DataSourceView(source, swarm) {
  this.source = source;
  CompositeView.call(this, "query", false, false, false, false);
  this.get$node().get$nodes().add(ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("<h2>" + this.source.title + "</h2>")));
  this.itemsView = this.addChild(new VariableSizeListView_Article(this.source.articles, new ArticleViewFactory(swarm), true, true, swarm.state.currentArticle, !Device.get$supportsTouch(), false, true, !Device.get$supportsTouch()));
  this.itemsView.addClass("story-section");
  this.get$node().get$nodes().add(ElementWrappingImplementation.ElementWrappingImplementation$html$factory("<div class=\"query-name-shadow\"></div>"));
  this.get$node().get$on().get$mouseDown().add((function (e) {
    swarm.state.storyMaximized.set$value(false);
  })
  , false);
}
DataSourceView.prototype.get$source = function() { return this.source; };
// ********** Code for ArticleViewFactory **************
function ArticleViewFactory(swarm) {
  this.layout = ArticleViewLayout.getSingleton();
  this.swarm = swarm;
}
ArticleViewFactory.prototype.get$layout = function() { return this.layout; };
ArticleViewFactory.prototype.newView = function(item) {
  return new ArticleView(item, this.swarm, this.layout);
}
ArticleViewFactory.prototype.getWidth = function(item) {
  return this.layout.width;
}
ArticleViewFactory.prototype.getHeight = function(item) {
  return this.layout.computeHeight(item);
}
// ********** Code for ArticleViewMetrics **************
function ArticleViewMetrics(height, titleLines, bodyLines) {
  this.titleLines = titleLines;
  this.bodyLines = bodyLines;
  this.height = height;
}
ArticleViewMetrics.prototype.get$height = function() { return this.height; };
// ********** Code for ArticleViewLayout **************
function ArticleViewLayout() {
  this.measureTitleText = new MeasureText("bold 13px arial,sans-serif");
  this.measureBodyText = new MeasureText("13px arial,sans-serif");
  var screenWidth = html_get$window().get$screen().get$width();
  this.width = (297);
}
ArticleViewLayout.prototype.get$width = function() { return this.width; };
ArticleViewLayout.prototype.set$width = function(value) { return this.width = value; };
ArticleViewLayout.getSingleton = function() {
  if ($globals.ArticleViewLayout__singleton == null) {
    $globals.ArticleViewLayout__singleton = new ArticleViewLayout();
  }
  return $globals.ArticleViewLayout__singleton;
}
ArticleViewLayout.prototype.computeHeight = function(item) {
  if (item == null) {
    dart_core_print("Null item encountered.");
    return (0);
  }
  return this.computeLayout(item, null, null).height;
}
ArticleViewLayout.prototype.computeLayout = function(item, titleBuffer, snippetBuffer) {
  var titleWidth = this.width - (36);
  if (item.hasThumbnail) {
    titleWidth = this.width - (107);
  }
  var titleLines = this.measureTitleText.addLineBrokenText(titleBuffer, item.title, titleWidth, (2));
  var bodyLines = this.measureBodyText.addLineBrokenText(snippetBuffer, item.textBody, this.width - (36), (4));
  var height = $mul(bodyLines, (18)) + (102);
  if ($eq(bodyLines, (0))) {
    height = (92);
  }
  return new ArticleViewMetrics(height, titleLines, bodyLines);
}
// ********** Code for ArticleView **************
$inherits(ArticleView, View);
function ArticleView(item, swarm, articleLayout) {
  this.articleLayout = articleLayout;
  this.item = item;
  this.swarm = swarm;
  View.call(this);
}
ArticleView.prototype.render = function() {
  var node;
  var byline = this.item.author.length > (0) ? this.item.author : this.item.dataSource.title;
  var date = DateUtils.toRecentTimeString(this.item.date);
  var storyClass = "story no-thumb";
  var thumbnail = "";
  if (this.item.hasThumbnail) {
    storyClass = "story";
    thumbnail = ("<img src=\"" + this.item.get$thumbUrl() + "\"></img>");
  }
  var title = new StringBufferImpl("");
  var snippet = new StringBufferImpl("");
  var metrics = this.articleLayout.computeLayout(this.item, title, snippet);
  node = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("<div class=\"" + storyClass + "\">\n  " + thumbnail + "\n  <div class=\"title\">" + title + "</div>\n  <div class=\"byline\">" + byline + "</div>\n  <div class=\"dateline\">" + date + "</div>\n  <div class=\"snippet\">" + snippet + "</div>\n</div>"));
  if ((this.item.textBody == null) || (this.item.textBody.trim() == "")) {
    node.query(".snippet").remove();
  }
  return node;
}
ArticleView.prototype.afterRender = function(node) {
  var $this = this; // closure support
  this.addOnClick((function (e) {
    $this.item.unread.set$value(false);
    var oldArticle = $this.swarm.state.currentArticle.get$value();
    $this.swarm.state.currentArticle.set$value($this.item);
    $this.swarm.state.storyTextMode.set$value(true);
    if ($eq(oldArticle)) {
      $this.swarm.state.pushToHistory();
    }
  })
  );
  this.watch(this.swarm.state.currentArticle, (function (e) {
    if (!$this.swarm.state.get$inMainView()) {
      $this.swarm.state.markCurrentAsRead();
    }
    $this._refreshSelected($this.swarm.state.currentArticle);
  })
  );
  this.watch(this.swarm.state.selectedArticle, (function (e) {
    $this._refreshSelected($this.swarm.state.selectedArticle);
    $this._updateViewForSelectedArticle();
  })
  );
  this.watch(this.item.unread, (function (e) {
    if ($this.item.unread.get$value()) {
      node.get$classes().add("story-unread");
    }
    else {
      node.get$classes().remove("story-unread");
    }
  })
  );
}
ArticleView.prototype._updateViewForSelectedArticle = function() {
  var selArticle = this.swarm.state.selectedArticle.get$value();
  if (this.swarm.state.get$hasArticleSelected()) {
    if (!this.swarm.state.get$inMainView()) {
      this.swarm.frontView.detachedView.itemsView.showView(selArticle);
    }
    else {
      if (this.swarm.frontView.get$currentSection().inCurrentView(selArticle)) {
        this.swarm.frontView.get$currentSection().dataSourceView.showView(selArticle.dataSource);
        var dataView = this.swarm.frontView.get$currentSection().findView(selArticle.dataSource);
        if (dataView != null) {
          dataView.itemsView.showView(selArticle);
        }
      }
    }
  }
}
ArticleView.prototype._refreshSelected = function(curItem) {
  if ($eq(curItem.get$value(), this.item)) {
    this.addClass("sel");
  }
  else {
    this.removeClass("sel");
  }
}
// ********** Code for StoryContentView **************
$inherits(StoryContentView, View);
function StoryContentView(swarm, item) {
  this.item = item;
  this.swarm = swarm;
  View.call(this);
}
StoryContentView.prototype.get$childViews = function() {
  return [this._pagedStory];
}
StoryContentView.prototype.render = function() {
  var storyContent = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("<div class=\"story-content\">" + this.item.get$htmlBody() + "</div>"));
  var $$list = storyContent.queryAll("iframe, script, style, object, embed, frameset, frame");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    element.remove();
  }
  this._pagedStory = new PagedContentView(new View.fromNode$ctor(storyContent));
  var $$list = storyContent.queryAll("a");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var anchor = $$i.next();
    anchor.set$target("_blank");
  }
  var date = DateUtils.toRecentTimeString(this.item.date);
  var container = ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("      <div class=\"story-view\">\n        <div class=\"story-text-view\">\n          <div class=\"story-header\">\n            <a class=\"story-title\" href=\"" + this.item.srcUrl + "\" target=\"_blank\">\n              " + this.item.title + "</a>\n            <div class=\"story-byline\">\n              " + this.item.author + " - " + this.item.dataSource.title + "\n            </div>\n            <div class=\"story-dateline\">" + date + "</div>\n          </div>\n          <div class=\"paged-story\"></div>\n          <div class=\"spacer\"></div>\n        </div>\n      </div>"));
  container.query$1(".paged-story").replaceWith(this._pagedStory.get$node());
  return container;
}
// ********** Code for SectionView **************
$inherits(SectionView, CompositeView);
function SectionView(swarm, section, _viewFactory) {
  this.pageState = new PageState();
  this.swarm = swarm;
  this.section = section;
  this._viewFactory = _viewFactory;
  this.loadingText = new View.html$ctor("<div class=\"loading-section\"></div>");
  CompositeView.call(this, "section-view", false, false, false, false);
  this.addChild(this.loadingText);
}
SectionView.prototype.get$section = function() { return this.section; };
SectionView.prototype.showSources = function() {
  this.loadingText.get$node().get$style().set$display("none");
  if (this.dataSourceView == null) {
    this.dataSourceView = new ListView_Feed(this.section.feeds, this._viewFactory, true, false, null, true, true, true, false, this.pageState);
    this.dataSourceView.addClass("data-source-view");
    this.addChild(this.dataSourceView);
    this.pageNumberView = this.addChild(new PageNumberView(this.pageState));
    this.get$node().get$style().set$opacity("1");
  }
  else {
    this.addChild(this.dataSourceView);
    this.addChild(this.pageNumberView);
    this.get$node().get$style().set$opacity("1");
  }
  this.dataSourceView.scroller.reconfigure((function () {

  })
  );
}
SectionView.prototype.hideSources = function() {
  if (this.dataSourceView != null) {
    this.get$node().get$style().set$opacity("0.6");
    this.removeChild(this.dataSourceView);
    this.removeChild(this.pageNumberView);
  }
  this.loadingText.get$node().get$style().set$display("block");
}
SectionView.prototype.findView = function(dataSource) {
  return this.dataSourceView.getSubview(this.dataSourceView.findIndex(dataSource));
}
SectionView.prototype.inCurrentView = function(article) {
  return this.dataSourceView.findIndex(article.dataSource) != null;
}
SectionView.prototype.set$storyMode = function(inStoryMode) {
  if (inStoryMode) {
    this.addClass("hide-all-queries");
  }
  else {
    this.removeClass("hide-all-queries");
  }
}
// ********** Code for Swarm **************
$inherits(Swarm, App);
function Swarm() {
  var $this = this; // closure support
  this.onLoadFired = false;
  App.call(this);
  Sections.initializeFromUrl((function (currSections) {
    $this.sections = currSections;
    $this.state = new SwarmState($this.sections);
    $this.setupApp();
  })
  );
  html_get$document().get$on().get$keyUp().add$1((function (e) {
    if ($this.frontView != null) {
      $this.frontView.processKeyEvent(e);
    }
  })
  );
}
Swarm.prototype.refresh = function() {
  var $this = this; // closure support
  this.sections.refresh();
  this.sections.get$sectionTitles().forEach$1((function (title) {
    var section = $this.sections.findSection(title);
    section.feeds.addChangeListener((function (data) {
      dart_core_print("Refresh sections not impl yet.");
    })
    );
  })
  );
}
Swarm.prototype.onLoad = function() {
  this.onLoadFired = true;
  App.prototype.onLoad.call(this);
  this.setupApp();
}
Swarm.prototype.setupApp = function() {
  if (this.onLoadFired && this.state != null) {
    this.render();
    this.refresh();
    this.eraseSplashScreen();
  }
}
Swarm.prototype.render = function() {
  this.frontView = new FrontView(this);
  this.frontView.addToDocument(html_get$document().get$body());
}
// ********** Code for Sections **************
function Sections(_sections) {
  this._sections = _sections;
}
Sections.prototype.$index = function(i) {
  return this._sections.$index(i);
}
Sections.prototype.get$length = function() {
  return this._sections.get$length();
}
Sections.prototype.get$sectionTitles = function() {
  return CollectionUtils.map(this._sections, (function (s) {
    return s.get$title();
  })
  );
}
Sections.prototype.refresh = function() {

}
Sections.prototype.findSection = function(name) {
  return CollectionUtils.find(this._sections, (function (sect) {
    return sect.get$title() == name;
  })
  );
}
Sections.prototype.iterator = function() {
  return this._sections.iterator();
}
Sections.get$runningFromFile = function() {
  return html_get$window().get$location().get$protocol().startsWith("file:");
}
Sections.get$home = function() {
  return $add($add(html_get$window().get$location().get$protocol(), "//"), html_get$window().get$location().get$host());
}
Sections.initializeFromData = function(data, callback) {
  var sections = new Array();
  var c = data.$index("documents");
  for (var i = (0);
   i < (5); i++) {
    sections.add$1(Section.decode(i, c));
  }
  callback(new Sections(sections));
}
Sections.initializeFromUrl = function(callback) {
  var d = new HashMapImplementation();
  d.$setindex("documents", [_map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"]), _map(["id", "someid", "date", "somedate", "code", "somecode"])]);
  Sections.initializeFromData(d, callback);
}
Sections.prototype.findSectionById = function(id) {
  return CollectionUtils.find(this._sections, (function (section) {
    return $eq(section.get$id(), id);
  })
  );
}
Sections.prototype.findSectionIndex = function(name) {
  for (var i = (0);
   i < this._sections.get$length(); i++) {
    if (name == this._sections.$index(i).get$title()) {
      return i;
    }
  }
  return (-1);
}
Sections.prototype.get$sections = function() {
  return this._sections;
}
Sections.prototype.filter = function(f) {
  return Collections.filter(this, new Array(), f);
}
Sections.prototype.some = function(f) {
  return Collections.some(this, f);
}
Sections.prototype.forEach = function(f) {
  Collections.forEach(this, f);
}
Sections.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
Sections.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
Sections.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
Sections.prototype.some$1 = function($0) {
  return this.some(to$call$1($0));
};
// ********** Code for Section **************
function Section(id, title, feeds) {
  this.title = title;
  this.id = id;
  this.feeds = feeds;
}
Section.prototype.get$id = function() { return this.id; };
Section.prototype.get$title = function() { return this.title; };
Section.decode = function(i, c) {
  var sectionId = ("Code Section " + i);
  var sectionTitle = ("Code Section " + i);
  var nSources = (10);
  var feeds = new ObservableList_Feed();
  for (var j = (0);
   $lt(j, nSources); j++) {
    feeds.add$1(Feed.decode(c));
  }
  return new Section(sectionId, sectionTitle, feeds);
}
Section.prototype.findFeed = function(id_) {
  return CollectionUtils.find(this.feeds, (function (feed) {
    return $eq(feed.get$id(), id_);
  })
  );
}
// ********** Code for Feed **************
function Feed(id, title, iconUrl, description) {
  this.title = title;
  this.error = new ObservableValue_bool(false);
  this.description = description;
  this.iconUrl = iconUrl;
  this.id = id;
  this.articles = new ObservableList_Article();
}
Feed.prototype.get$id = function() { return this.id; };
Feed.prototype.get$title = function() { return this.title; };
Feed.prototype.get$articles = function() { return this.articles; };
Feed.decode = function(c) {
  var sourceId = "feed.sourceId ";
  var sourceTitle = "feed.sourceTitle ";
  var sourceIcon = "feed.sourceIcon ";
  var feed = new Feed(sourceId, sourceTitle, sourceIcon, "");
  var nItems = (10);
  for (var i = (0);
   $lt(i, nItems); i++) {
    if (!c.isEmpty()) {
      var a = c.removeLast();
      feed.get$articles().add(Article.decodeHeader(feed, a));
    }
  }
  return feed;
}
Feed.prototype.findArticle = function(id_) {
  return CollectionUtils.find(this.articles, (function (article) {
    return $eq(article.get$id(), id_);
  })
  );
}
// ********** Code for Article **************
function Article(dataSource, id, date, title, author, srcUrl, hasThumbnail, textBody, _htmlBody, unread, error) {
  this.title = title;
  this.dataSource = dataSource;
  this.date = date;
  this.srcUrl = srcUrl;
  this.unread = new ObservableValue_bool(unread);
  this.hasThumbnail = hasThumbnail;
  this.textBody = textBody;
  this.id = id;
  this.error = error;
  this.author = author;
  this._htmlBody = _htmlBody;
}
Article.prototype.get$id = function() { return this.id; };
Article.prototype.get$title = function() { return this.title; };
Article.prototype.get$htmlBody = function() {
  this._ensureLoaded();
  return this._htmlBody;
}
Article.prototype.get$dataUri = function() {
  return utilslib_Uri.encodeComponent(this.id).replaceAll(",", "%2C").replaceAll("%2F", "/");
}
Article.prototype.get$thumbUrl = function() {
  if (!this.hasThumbnail) return null;
  var home;
  if (Sections.get$runningFromFile()) {
    home = "http://dart.googleplex.com";
  }
  else {
    home = Sections.get$home();
  }
  return ("" + home + "/data/" + this.get$dataUri() + ".jpg?v=0");
}
Article.prototype._ensureLoaded = function() {
  if (null != this._htmlBody) return;
  var name = ("" + this.get$dataUri() + ".html");
  var req = XMLHttpRequestWrappingImplementation.XMLHttpRequestWrappingImplementation$factory();
  req.open$3("GET", "/getCode?docId=", false);
  req.send$0();
  this._htmlBody = req.get$responseText();
}
Article.decodeHeader = function(source, code) {
  var id = code.$index("id");
  var title = "title";
  var srcUrl = "srcUrl";
  var hasThumbnail = "hasThumbnail";
  var author = "author";
  var dateInSeconds = "dateInSeconds";
  var snippet = code.$index("code");
  var date = new DateImplementation.now$ctor();
  return new Article(source, id, date, title, author, srcUrl, hasThumbnail, snippet, null, true, false);
}
// ********** Code for _PlaceholderView **************
$inherits(_PlaceholderView, View);
function _PlaceholderView() {
  View.call(this);
}
_PlaceholderView.prototype.render = function() {
  return ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
}
// ********** Code for GenericListView **************
$inherits(GenericListView, View);
function GenericListView() {}
GenericListView.prototype.onSelectedItemChange = function() {
  this._select(this.findIndex(this._lastSelectedItem), false);
  this._select(this.findIndex(this._selectedItem.get$value()), true);
  this._lastSelectedItem = this._selectedItem.get$value();
}
GenericListView.prototype.get$childViews = function() {
  return this._itemViews.getValues();
}
GenericListView.prototype._onClick = function(e) {
  var index = this._findAssociatedIndex(e.get$target());
  if (index != null) {
    this._selectedItem.set$value(this._data.$index(index));
  }
}
GenericListView.prototype._findAssociatedIndex = function(leafNode) {
  var node = leafNode;
  while (node != null && $ne(node, this._containerElem)) {
    if ($eq(node.get$parent(), this._containerElem)) {
      return this._nodeToIndex(node);
    }
    node = node.get$parent();
  }
  return null;
}
GenericListView.prototype._nodeToIndex = function(node) {
  var index = node.get$attributes().$index("data-index");
  if (index != null && index.length > (0)) {
    return Math.parseInt(index);
  }
  return null;
}
GenericListView.prototype.render = function() {
  var $this = this; // closure support
  var node = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  if (this._scrollable) {
    this._containerElem = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
    this._containerElem.set$tabIndex((-1));
    node.get$nodes().add(this._containerElem);
  }
  else {
    this._containerElem = node;
  }
  if (this._scrollable) {
    this.scroller = new Scroller(this._containerElem, this._vertical, !this._vertical, true, (function () {
      var width = $this._layout.getWidth($this._viewLength);
      var height = $this._layout.getHeight($this._viewLength);
      width = width != null ? width : (0);
      height = height != null ? height : (0);
      var completer = new CompleterImpl_Size();
      completer.complete$1(new Size(width, height));
      return completer.get$future();
    })
    , this._paginate && this._snapToItems ? (0.84) : (1), null, false);
    this.scroller.get$onContentMoved().add$1((function (e) {
      return $this.renderVisibleItems(false);
    })
    );
    if (this._pages != null) {
      this.watch(this._pages.target, (function (s) {
        return $this._onPageSelected();
      })
      );
    }
    if (this._snapToItems) {
      this.scroller.get$onDecelStart().add$1((function (e) {
        return $this._decelStart();
      })
      );
      this.scroller.get$onScrollerDragEnd().add$1((function (e) {
        return $this._decelStart();
      })
      );
    }
    if (this._showScrollbar) {
      this._scrollbar = new Scrollbar(this.scroller, true);
    }
  }
  else {
    this._reserveArea();
    this.renderVisibleItems(true);
  }
  return node;
}
GenericListView.prototype.afterRender = function(node) {
  var $this = this; // closure support
  if ((this._data instanceof ObservableList)) {
    var observable = this._data;
    this.attachWatch(observable, (function (e) {
      if ($eq(e.target, observable)) {
        $this.onDataChange();
      }
    })
    );
  }
  if (this._selectedItem != null) {
    this.addOnClick(function function_(e) {
      $this._onClick(e);
    }
    );
  }
  if (this._selectedItem != null) {
    this.watch(this._selectedItem, (function (summary) {
      return $this.onSelectedItemChange();
    })
    );
  }
}
GenericListView.prototype.onDataChange = function() {
  this._layout.onDataChange();
  this._renderItems();
}
GenericListView.prototype._reserveArea = function() {
  var style = this._containerElem.get$style();
  var width = this._layout.getWidth(this._viewLength);
  var height = this._layout.getHeight(this._viewLength);
  if (width != null) {
    style.set$width(("" + width + "px"));
  }
  if (height != null) {
    style.set$height(("" + height + "px"));
  }
  style.set$overflow("hidden");
}
GenericListView.prototype.onResize = function() {
  var $this = this; // closure support
  var lastViewLength = this._viewLength;
  this.get$node().get$rect().then((function (rect) {
    $this._viewLength = $this._vertical ? rect.offset.get$height() : rect.offset.get$width();
    if ($this._viewLength != lastViewLength) {
      if ($this._scrollbar != null) {
        $this._scrollbar.refresh();
      }
      $this.renderVisibleItems(true);
    }
  })
  );
}
GenericListView.prototype.enterDocument = function() {
  if (this.scroller != null) {
    this.onResize();
    if (this._scrollbar != null) {
      this._scrollbar.initialize();
    }
  }
}
GenericListView.prototype.getNextIndex = function(index, forward) {
  var delta = forward ? (1) : (-1);
  if (this._paginate) {
    var newPage = Math.max((0), this._layout.getPage(index, this._viewLength) + delta);
    index = this._layout.getPageStartIndex(newPage, this._viewLength);
  }
  else {
    index += delta;
  }
  return GoogleMath.clamp(index, (0), this._data.get$length() - (1));
}
GenericListView.prototype._decelStart = function() {
  var currentTarget = this.scroller.verticalEnabled ? this.scroller.get$currentTarget().y : this.scroller.get$currentTarget().x;
  var current = this.scroller.verticalEnabled ? this.scroller.get$contentOffset().y : this.scroller.get$contentOffset().x;
  var targetIndex = this._layout.getSnapIndex(currentTarget, this._viewLength);
  if (current != currentTarget) {
    var currentIndex = this._layout.getSnapIndex(current, this._viewLength);
    if (currentIndex == targetIndex && (currentTarget - current).abs() > (15) && -this._layout.getOffset(targetIndex) != currentTarget) {
      var snappedCurrentPosition = -this._layout.getOffset(targetIndex);
      targetIndex = this.getNextIndex(targetIndex, currentTarget < current);
    }
  }
  var targetPosition = -this._layout.getOffset(targetIndex);
  if (currentTarget != targetPosition) {
    if (this.scroller.verticalEnabled) {
      this.scroller.throwTo(this.scroller.get$contentOffset().x, targetPosition);
    }
    else {
      this.scroller.throwTo(targetPosition, this.scroller.get$contentOffset().y);
    }
  }
  else {
    if (this._pages != null) {
      this._pages.target.set$value(this._layout.getPage(targetIndex, this._viewLength));
    }
  }
}
GenericListView.prototype._renderItems = function() {
  for (var i = this._activeInterval.start;
   i < this._activeInterval.end; i++) {
    this._removeView(i);
  }
  this._itemViews.clear();
  this._activeInterval = new Interval((0), (0));
  if (this.scroller == null) {
    this._reserveArea();
  }
  this.renderVisibleItems(false);
}
GenericListView.prototype._onPageSelected = function() {
  if ($ne(this._pages.target, this._layout.getPage(this._activeInterval.start, this._viewLength))) {
    this._throwTo(this._layout.getOffset(this._layout.getPageStartIndex(this._pages.target.get$value(), this._viewLength)));
  }
}
GenericListView.prototype.get$_offset = function() {
  return this.scroller.verticalEnabled ? this.scroller.getVerticalOffset() : this.scroller.getHorizontalOffset();
}
GenericListView.prototype.getVisibleInterval = function() {
  return this._layout.computeVisibleInterval(this.get$_offset(), this._viewLength, (0));
}
GenericListView.prototype.renderVisibleItems = function(lengthChanged) {
  var targetInterval;
  if (this.scroller != null) {
    targetInterval = this.getVisibleInterval();
  }
  else {
    targetInterval = new Interval((0), this._data.get$length());
  }
  if (this._pages != null) {
    this._pages.current.set$value(this._layout.getPage(targetInterval.start, this._viewLength));
  }
  if (this._pages != null) {
    this._pages.length.set$value(this._data.get$length() > (0) ? this._layout.getPage(this._data.get$length() - (1), this._viewLength) + (1) : (0));
  }
  if (!this._removeClippedViews) {
    targetInterval = targetInterval.union(this._activeInterval);
  }
  if ($eq(lengthChanged, false) && $eq(targetInterval, this._activeInterval)) {
    return;
  }
  for (var i = this._activeInterval.start, end = Math.min(targetInterval.start, this._activeInterval.end);
   i < end; i++) {
    this._removeView(i);
  }
  for (var i = Math.max(targetInterval.end, this._activeInterval.start);
   i < this._activeInterval.end; i++) {
    this._removeView(i);
  }
  for (var i = targetInterval.start, end = Math.min(this._activeInterval.start, targetInterval.end);
   i < end; i++) {
    this._addView(i);
  }
  for (var i = Math.max(this._activeInterval.end, targetInterval.start);
   i < targetInterval.end; i++) {
    this._addView(i);
  }
  this._activeInterval = targetInterval;
}
GenericListView.prototype._removeView = function(index) {
  if (!((this._itemViews.$index(index) instanceof _PlaceholderView))) {
    this._itemViews.$index(index).get$node().remove();
    this.childViewRemoved(this._itemViews.$index(index));
  }
}
GenericListView.prototype._newView = function(index) {
  var view = this._layout.newView(index);
  view.get$node().get$attributes().$setindex("data-index", index.toString());
  return view;
}
GenericListView.prototype._addView = function(index) {
  if (this._itemViews.containsKey(index)) {
    var view = this._itemViews.$index(index);
    this._addViewHelper(view, index);
    this.childViewAdded(view);
    return view;
  }
  var view = this._newView(index);
  this._itemViews.$setindex(index, view);
  if (index == (0)) {
    view.addClass("first-child");
  }
  this._selectHelper(view, $eq(this._data.$index(index), this._lastSelectedItem));
  this._addViewHelper(view, index);
  this.childViewAdded(view);
  return view;
}
GenericListView.prototype._addViewHelper = function(view, index) {
  this._positionSubview(view.get$node(), index);
  if ($ne(view.get$node().get$parent(), this._containerElem)) {
    this._containerElem.get$nodes().add(view.get$node());
  }
}
GenericListView.prototype.detachSubview = function(itemData) {
  var index = this.findIndex(itemData);
  var view = this._itemViews.$index(index);
  if (view == null) {
    this._addView(index);
    view = this._itemViews.$index(index);
  }
  var placeholder = new _PlaceholderView();
  view.get$node().replaceWith(placeholder.get$node());
  this._itemViews.$setindex(index, placeholder);
  return view;
}
GenericListView.prototype.reattachSubview = function(data, view, animate) {
  var $this = this; // closure support
  var index = this.findIndex(data);
  var currentPosition;
  if (animate) {
    currentPosition = FxUtil.computeRelativePosition(view.get$node(), this._containerElem);
  }
  view.enterDocument();
  this._itemViews.$index(index).get$node().replaceWith(view.get$node());
  this._itemViews.$setindex(index, view);
  if (animate) {
    FxUtil.setTranslate(view.get$node(), currentPosition.get$x(), currentPosition.get$y(), (0));
    html_get$window().setTimeout((function () {
      $this._positionSubview(view.get$node(), index);
    })
    , (0));
  }
  else {
    this._positionSubview(view.get$node(), index);
  }
}
GenericListView.prototype.findIndex = function(targetItem) {
  var i = (0);
  var $$list = this._data;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    if ($eq(item, targetItem)) {
      return i;
    }
    i++;
  }
  return null;
}
GenericListView.prototype._positionSubview = function(node, index) {
  if (this._vertical) {
    FxUtil.setTranslate(node, (0), this._layout.getOffset(index), (0));
  }
  else {
    FxUtil.setTranslate(node, this._layout.getOffset(index), (0), (0));
  }
  node.get$style().set$zIndex(index.toString());
}
GenericListView.prototype._select = function(index, selected) {
  if (index != null) {
    var subview = this.getSubview(index);
    if ($ne(subview)) {
      this._selectHelper(subview, selected);
    }
  }
}
GenericListView.prototype._selectHelper = function(view, selected) {
  if (selected) {
    view.addClass("sel");
  }
  else {
    view.removeClass("sel");
  }
}
GenericListView.prototype.getSubview = function(index) {
  return this._itemViews.$index(index);
}
GenericListView.prototype.showView = function(targetItem) {
  var index = this.findIndex(targetItem);
  if (index != null) {
    if (this._layout.getOffset(index) < -this.get$_offset()) {
      this._throwTo(this._layout.getOffset(index));
    }
    else if (this._layout.getOffset(index + (1)) > (-this.get$_offset() + this._viewLength)) {
      this._throwTo(this._layout.getOffset(index + (1)) - this._viewLength);
    }
  }
}
GenericListView.prototype._throwTo = function(offset) {
  if (this._vertical) {
    this.scroller.throwTo((0), -offset);
  }
  else {
    this.scroller.throwTo(-offset, (0));
  }
}
// ********** Code for GenericListView_Article **************
$inherits(GenericListView_Article, GenericListView);
function GenericListView_Article(_layout, _data, _scrollable, _vertical, _selectedItem, _snapToItems, _paginate, _removeClippedViews, _showScrollbar, _pages) {
  var $this = this; // closure support
  this._vertical = _vertical;
  this._data = _data;
  this._itemViews = new HashMapImplementation_int$View();
  this._paginate = _paginate;
  this._removeClippedViews = _removeClippedViews;
  this._layout = _layout;
  this._pages = _pages;
  this._viewLength = (0);
  this._showScrollbar = _showScrollbar;
  this._snapToItems = _snapToItems;
  this._selectedItem = _selectedItem;
  this._scrollable = _scrollable;
  this._activeInterval = new Interval((0), (0));
  View.call(this);
  if (this._scrollable) {
    html_get$window().get$on().get$resize().add$1((function (event) {
      if ($this.get$isInDocument()) {
        $this.onResize();
      }
    })
    );
  }
}
// ********** Code for GenericListView_Feed **************
$inherits(GenericListView_Feed, GenericListView);
function GenericListView_Feed(_layout, _data, _scrollable, _vertical, _selectedItem, _snapToItems, _paginate, _removeClippedViews, _showScrollbar, _pages) {
  var $this = this; // closure support
  this._removeClippedViews = _removeClippedViews;
  this._layout = _layout;
  this._pages = _pages;
  this._showScrollbar = _showScrollbar;
  this._viewLength = (0);
  this._data = _data;
  this._itemViews = new HashMapImplementation_int$View();
  this._vertical = _vertical;
  this._paginate = _paginate;
  this._activeInterval = new Interval((0), (0));
  this._snapToItems = _snapToItems;
  this._selectedItem = _selectedItem;
  this._scrollable = _scrollable;
  View.call(this);
  if (this._scrollable) {
    html_get$window().get$on().get$resize().add$1((function (event) {
      if ($this.get$isInDocument()) {
        $this.onResize();
      }
    })
    );
  }
}
// ********** Code for FixedSizeListViewLayout **************
function FixedSizeListViewLayout() {}
FixedSizeListViewLayout.prototype.onDataChange = function() {

}
FixedSizeListViewLayout.prototype.newView = function(index) {
  return this.itemViewFactory.newView(this._data.$index(index));
}
FixedSizeListViewLayout.prototype.get$_itemLength = function() {
  return this._vertical ? this.itemViewFactory.get$height() : this.itemViewFactory.get$width();
}
FixedSizeListViewLayout.prototype.getWidth = function(viewLength) {
  return this._vertical ? this.itemViewFactory.get$width() : this.getLength(viewLength);
}
FixedSizeListViewLayout.prototype.getHeight = function(viewLength) {
  return this._vertical ? this.getLength(viewLength) : this.itemViewFactory.get$height();
}
FixedSizeListViewLayout.prototype.getLength = function(viewLength) {
  var itemLength = this._vertical ? this.itemViewFactory.get$height() : this.itemViewFactory.get$width();
  if (viewLength == null || viewLength == (0)) {
    return itemLength * this._data.get$length();
  }
  else if (this._paginate) {
    if (this._data.get$length() > (0)) {
      var pageLength = this.getPageLength(viewLength);
      return $mul(this.getPage(this._data.get$length() - (1), viewLength), pageLength) + Math.max(viewLength, pageLength);
    }
    else {
      return (0);
    }
  }
  else {
    return itemLength * (this._data.get$length() - (1)) + Math.max(viewLength, itemLength);
  }
}
FixedSizeListViewLayout.prototype.getOffset = function(index) {
  return index * this.get$_itemLength();
}
FixedSizeListViewLayout.prototype.getPageLength = function(viewLength) {
  var itemsPerPage = (viewLength / this.get$_itemLength()).floor();
  return (Math.max((1), itemsPerPage) * this.get$_itemLength()).toInt();
}
FixedSizeListViewLayout.prototype.getPage = function(index, viewLength) {
  return (this.getOffset(index) / this.getPageLength(viewLength)).floor().toInt();
}
FixedSizeListViewLayout.prototype.getPageStartIndex = function(page, viewLength) {
  return (this.getPageLength(viewLength) / this.get$_itemLength()).toInt() * page;
}
FixedSizeListViewLayout.prototype.getSnapIndex = function(offset, viewLength) {
  var index = (-offset / this.get$_itemLength()).round().toInt();
  if (this._paginate) {
    index = this.getPageStartIndex(this.getPage(index, viewLength), viewLength);
  }
  return GoogleMath.clamp(index, (0), this._data.get$length() - (1));
}
FixedSizeListViewLayout.prototype.computeVisibleInterval = function(offset, viewLength, bufferLength) {
  var targetIntervalStart = Math.max((0), ((-offset - bufferLength) / this.get$_itemLength()).floor());
  var targetIntervalEnd = GoogleMath.clamp(((-offset + viewLength + bufferLength) / this.get$_itemLength()).ceil(), targetIntervalStart, this._data.get$length());
  return new Interval(targetIntervalStart.toInt(), targetIntervalEnd.toInt());
}
// ********** Code for FixedSizeListViewLayout_Feed **************
$inherits(FixedSizeListViewLayout_Feed, FixedSizeListViewLayout);
function FixedSizeListViewLayout_Feed(itemViewFactory, _data, _vertical, _paginate) {
  this._paginate = _paginate;
  this._data = _data;
  this._vertical = _vertical;
  this.itemViewFactory = itemViewFactory;
}
// ********** Code for ListView **************
$inherits(ListView, GenericListView);
function ListView() {}
// ********** Code for ListView_Feed **************
$inherits(ListView_Feed, ListView);
function ListView_Feed(data, itemViewFactory, scrollable, vertical, selectedItem, snapToItems, paginate, removeClippedViews, showScrollbar, pages) {
  GenericListView_Feed.call(this, new FixedSizeListViewLayout_Feed(itemViewFactory, data, vertical, paginate), data, scrollable, vertical, selectedItem, snapToItems, paginate, removeClippedViews, showScrollbar, pages);
}
// ********** Code for VariableSizeListViewLayout **************
function VariableSizeListViewLayout(itemViewFactory, data, _vertical, _paginate) {
  this._lastVisibleInterval = new Interval((0), (0));
  this._vertical = _vertical;
  this._data = data;
  this.itemViewFactory = itemViewFactory;
  this._lastOffset = (0);
  this._paginate = _paginate;
  this._itemOffsets = [];
  this._lengths = [];
  this._itemOffsets.add((0));
}
VariableSizeListViewLayout.prototype.onDataChange = function() {
  this._itemOffsets.clear();
  this._itemOffsets.add((0));
  this._lengths.clear();
}
VariableSizeListViewLayout.prototype.newView = function(index) {
  return this.itemViewFactory.newView(this._data.$index(index));
}
VariableSizeListViewLayout.prototype.getWidth = function(viewLength) {
  if (this._vertical) {
    return this.itemViewFactory.getWidth(null);
  }
  else {
    return this.getLength(viewLength);
  }
}
VariableSizeListViewLayout.prototype.getHeight = function(viewLength) {
  if (this._vertical) {
    return this.getLength(viewLength);
  }
  else {
    return this.itemViewFactory.getHeight(null);
  }
}
VariableSizeListViewLayout.prototype.getLength = function(viewLength) {
  if (this._data.get$length() == (0)) {
    return viewLength;
  }
  else {
    this.getOffset(this._data.get$length());
    return (this.getOffset(this._data.get$length() - (1)) - this.getOffset((0))) + Math.max(this._lengths.$index(this._lengths.get$length() - (1)), viewLength);
  }
}
VariableSizeListViewLayout.prototype.getOffset = function(index) {
  if (index >= this._itemOffsets.get$length()) {
    var offset = this._itemOffsets.$index(this._itemOffsets.get$length() - (1));
    for (var i = this._itemOffsets.get$length();
     i <= index; i++) {
      var length = this._vertical ? this.itemViewFactory.getHeight(this._data.$index(i - (1))) : this.itemViewFactory.getWidth(this._data.$index(i - (1)));
      offset += length;
      this._itemOffsets.add(offset);
      this._lengths.add(length);
    }
  }
  return this._itemOffsets.$index(index);
}
VariableSizeListViewLayout.prototype.getPage = function(index, viewLength) {
  $throw("Not implemented");
}
VariableSizeListViewLayout.prototype.getPageStartIndex = function(page, viewLength) {
  $throw("Not implemented");
}
VariableSizeListViewLayout.prototype.getSnapIndex = function(offset, viewLength) {
  for (var i = (1);
   i < this._data.get$length(); i++) {
    if (this.getOffset(i) + this.getOffset(i - (1)) > -offset * (2)) {
      return i - (1);
    }
  }
  return this._data.get$length() - (1);
}
VariableSizeListViewLayout.prototype.computeVisibleInterval = function(offset, viewLength, bufferLength) {
  offset = offset.toInt();
  var start = this._findFirstItemBefore(-offset - bufferLength, this._lastVisibleInterval != null ? this._lastVisibleInterval.start : (0));
  var end = this._findFirstItemAfter(-offset + viewLength + bufferLength, this._lastVisibleInterval != null ? this._lastVisibleInterval.end : (0));
  this._lastVisibleInterval = new Interval(start, Math.max(start, end));
  this._lastOffset = offset;
  return this._lastVisibleInterval;
}
VariableSizeListViewLayout.prototype._findFirstItemAfter = function(target, hint) {
  for (var i = (0);
   i < this._data.get$length(); i++) {
    if (this.getOffset(i) > target) {
      return i;
    }
  }
  return this._data.get$length();
}
VariableSizeListViewLayout.prototype._findFirstItemBefore = function(target, hint) {
  for (var i = (1);
   i < this._data.get$length(); i++) {
    if (this.getOffset(i) >= target) {
      return i - (1);
    }
  }
  return Math.max(this._data.get$length() - (1), (0));
}
// ********** Code for VariableSizeListView **************
$inherits(VariableSizeListView, GenericListView);
function VariableSizeListView() {}
// ********** Code for VariableSizeListView_Article **************
$inherits(VariableSizeListView_Article, VariableSizeListView);
function VariableSizeListView_Article(data, itemViewFactory, scrollable, vertical, selectedItem, snapToItems, paginate, removeClippedViews, showScrollbar, pages) {
  GenericListView_Article.call(this, new VariableSizeListViewLayout(itemViewFactory, data, vertical, paginate), data, scrollable, vertical, selectedItem, snapToItems, paginate, removeClippedViews, showScrollbar, pages);
}
// ********** Code for PushButtonView **************
$inherits(PushButtonView, View);
function PushButtonView(_text, _cssClass, _clickHandler) {
  this._text = _text;
  this._cssClass = _cssClass;
  this._clickHandler = _clickHandler;
  View.call(this);
}
PushButtonView.prototype.render = function() {
  return ElementWrappingImplementation.ElementWrappingImplementation$html$factory(("<button class=\"" + this._cssClass + "\">" + this._text + "</button>"));
}
PushButtonView.prototype.afterRender = function(node) {
  this.addOnClick(to$call$1(this._clickHandler));
}
// ********** Code for top level **************
function _backToMain(state) {
  if (state.currentArticle.get$value() != null) {
    state.clearCurrentArticle();
    state.storyTextMode.set$value(true);
    state.pushToHistory();
  }
}
//  ********** Library swarm **************
// ********** Code for top level **************
function main() {
  new Swarm().run();
}
// 275 dynamic types.
// 505 types
// 44 !leaf
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
  var v0/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v1/*SVGTextPositioningElement*/ = 'SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement';
  var v2/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v3/*SVGGradientElement*/ = 'SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement';
  var v4/*SVGTextContentElement*/ = [v1/*SVGTextPositioningElement*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v5/*HTMLElement*/ = [v0/*HTMLMediaElement*/,'HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v6/*SVGElement*/ = [v2/*SVGComponentTransferFunctionElement*/,v3/*SVGGradientElement*/,v4/*SVGTextContentElement*/,'SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v7/*UIEvent*/ = 'UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent';
  var v8/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v9/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v10/*Element*/ = [v5/*HTMLElement*/,v6/*SVGElement*/,'Element'].join('|');
  var v11/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v12/*Node*/ = [v8/*CharacterData*/,v9/*Document*/,v10/*Element*/,'Node|Attr|DocumentFragment|ShadowRoot|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v13/*Uint8Array*/ = 'Uint8Array|Uint8ClampedArray';
  var v14/*AudioParam*/ = 'AudioParam|AudioGain';
  var v15/*Blob*/ = 'Blob|File';
  var v16/*CSSRule*/ = 'CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule|WebKitCSSRegionRule';
  var v17/*CSSValueList*/ = 'CSSValueList|WebKitCSSTransformValue';
  var v18/*DOMTokenList*/ = 'DOMTokenList|DOMSettableTokenList';
  var v19/*Entry*/ = 'Entry|DirectoryEntry|FileEntry';
  var v20/*EntrySync*/ = 'EntrySync|DirectoryEntrySync|FileEntrySync';
  var v21/*Event*/ = [v7/*UIEvent*/,'Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MediaStreamEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent'].join('|');
  var v22/*EventTarget*/ = [v11/*AbstractWorker*/,v12/*Node*/,'EventTarget|DOMApplicationCache|DOMWindow|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|XMLHttpRequest|XMLHttpRequestUpload'].join('|');
  var v23/*HTMLCollection*/ = 'HTMLCollection|HTMLOptionsCollection';
  var v24/*IDBCursor*/ = 'IDBCursor|IDBCursorWithValue';
  var v25/*IDBRequest*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v26/*MediaStream*/ = 'MediaStream|LocalMediaStream';
  var v27/*SVGStylable*/ = 'SVGStylable|SVGFilterPrimitiveStandardAttributes';
  var v28/*StyleSheet*/ = 'StyleSheet|CSSStyleSheet';
  var v29/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v11/*AbstractWorker*/]
    , ['AudioParam', v14/*AudioParam*/]
    , ['Blob', v15/*Blob*/]
    , ['CSSRule', v16/*CSSRule*/]
    , ['CSSValueList', v17/*CSSValueList*/]
    , ['CharacterData', v8/*CharacterData*/]
    , ['DOMTokenList', v18/*DOMTokenList*/]
    , ['Document', v9/*Document*/]
    , ['HTMLMediaElement', v0/*HTMLMediaElement*/]
    , ['HTMLElement', v5/*HTMLElement*/]
    , ['SVGComponentTransferFunctionElement', v2/*SVGComponentTransferFunctionElement*/]
    , ['SVGGradientElement', v3/*SVGGradientElement*/]
    , ['SVGTextPositioningElement', v1/*SVGTextPositioningElement*/]
    , ['SVGTextContentElement', v4/*SVGTextContentElement*/]
    , ['SVGElement', v6/*SVGElement*/]
    , ['Element', v10/*Element*/]
    , ['Entry', v19/*Entry*/]
    , ['EntrySync', v20/*EntrySync*/]
    , ['UIEvent', v7/*UIEvent*/]
    , ['Event', v21/*Event*/]
    , ['Node', v12/*Node*/]
    , ['EventTarget', v22/*EventTarget*/]
    , ['HTMLCollection', v23/*HTMLCollection*/]
    , ['IDBCursor', v24/*IDBCursor*/]
    , ['IDBRequest', v25/*IDBRequest*/]
    , ['MediaStream', v26/*MediaStream*/]
    , ['SVGStylable', v27/*SVGStylable*/]
    , ['StyleSheet', v28/*StyleSheet*/]
    , ['Uint8Array', v13/*Uint8Array*/]
    , ['WorkerContext', v29/*WorkerContext*/]
    , ['DOMType', [v13/*Uint8Array*/,v14/*AudioParam*/,v15/*Blob*/,v16/*CSSRule*/,v17/*CSSValueList*/,v18/*DOMTokenList*/,v19/*Entry*/,v20/*EntrySync*/,v21/*Event*/,v22/*EventTarget*/,v23/*HTMLCollection*/,v24/*IDBCursor*/,v25/*IDBRequest*/,v26/*MediaStream*/,v27/*SVGStylable*/,v28/*StyleSheet*/,v29/*WorkerContext*/,'DOMType|ArrayBuffer|ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|AudioBuffer|AudioContext|AudioListener|AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode|BarInfo|CSSRuleList|CSSStyleDeclaration|CSSValue|CSSPrimitiveValue|SVGColor|SVGPaint|CanvasGradient|CanvasPattern|CanvasPixelArray|CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|ClientRect|ClientRectList|Clipboard|Coordinates|Counter|Crypto|DOMException|DOMFileSystem|DOMFileSystemSync|DOMFormData|DOMImplementation|DOMMimeType|DOMMimeTypeArray|DOMParser|DOMPlugin|DOMPluginArray|DOMSelection|DOMURL|DataTransferItem|DataTransferItemList|Database|DatabaseSync|DirectoryReader|DirectoryReaderSync|ElementTimeControl|ElementTraversal|EntryArray|EntryArraySync|EventException|FileError|FileException|FileList|FileReader|FileReaderSync|FileWriter|FileWriterSync|Geolocation|Geoposition|HTMLAllCollection|History|IDBAny|IDBDatabase|IDBDatabaseError|IDBDatabaseException|IDBFactory|IDBIndex|IDBKey|IDBKeyRange|IDBObjectStore|IDBTransaction|ImageData|JavaScriptCallFrame|Location|MediaController|MediaError|MediaList|MediaQueryList|MediaQueryListListener|MediaStreamList|MediaStreamTrack|MediaStreamTrackList|MemoryInfo|MessageChannel|Metadata|NamedNodeMap|Navigator|NavigatorUserMediaError|NodeFilter|NodeIterator|NodeList|NodeSelector|NotificationCenter|OESStandardDerivatives|OESTextureFloat|OESVertexArrayObject|OperationNotAllowedException|PeerConnection|Performance|PerformanceNavigation|PerformanceTiming|PositionError|RGBColor|Range|RangeException|Rect|SQLError|SQLException|SQLResultSet|SQLResultSetRowList|SQLTransaction|SQLTransactionSync|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGElementInstanceList|SVGException|SVGExternalResourcesRequired|SVGFitToViewBox|SVGLangSpace|SVGLength|SVGLengthList|SVGLocatable|SVGTransformable|SVGMatrix|SVGNumber|SVGNumberList|SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel|SVGPathSegList|SVGPoint|SVGPointList|SVGPreserveAspectRatio|SVGRect|SVGRenderingIntent|SVGStringList|SVGTests|SVGTransform|SVGTransformList|SVGURIReference|SVGUnitTypes|SVGZoomAndPan|SVGViewSpec|Screen|ScriptProfile|ScriptProfileNode|SpeechInputResult|SpeechInputResultList|Storage|StorageInfo|StyleMedia|StyleSheetList|TextMetrics|TextTrack|TextTrackCue|TextTrackCueList|TextTrackList|TimeRanges|Touch|TouchList|TreeWalker|ValidityState|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextureS3TC|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitAnimation|WebKitAnimationList|WebKitBlobBuilder|WebKitCSSMatrix|WebKitNamedFlow|WebKitPoint|WorkerLocation|WorkerNavigator|XMLHttpRequestException|XMLSerializer|XPathEvaluator|XPathException|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals.Scroller__dragInProgress = false;
  $globals._firstMeasurementRequest = true;
  $globals._nextMeasurementFrameScheduled = false;
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = new JSSyntaxRegExp("<(\\w+)");
var const$0003 = Object.create(IllegalAccessException.prototype, {});
var const$0004 = Object.create(EmptyQueueException.prototype, {});
var const$0005 = _constMap(["body", "html", "head", "html", "caption", "table", "td", "tr", "colgroup", "table", "col", "colgroup", "tr", "tbody", "tbody", "table", "tfoot", "table", "thead", "table", "track", "audio"]);
var const$0006 = Object.create(NotImplementedException.prototype, {});
var const$0008 = new JSSyntaxRegExp("iPhone|iPod|iPad");
var const$0011 = Object.create(SimpleClientRect.prototype, {left: {"value": (0), writeable: false}, top: {"value": (0), writeable: false}, width: {"value": (0), writeable: false}, height: {"value": (0), writeable: false}});
var const$0012 = ImmutableList.ImmutableList$from$factory([]);
var const$0013 = Object.create(EmptyElementRect.prototype, {client: {"value": const$0011, writeable: false}, scroll: {"value": const$0011, writeable: false}, bounding: {"value": const$0011, writeable: false}, clientRects: {"value": const$0012, writeable: false}, offset: {"value": const$0011, writeable: false}});
var const$0014 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "", writeable: false}});
var const$0015 = ImmutableList.ImmutableList$from$factory(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
var const$0016 = ImmutableList.ImmutableList$from$factory([]);
var const$0017 = Object.create(MinContentSizing.prototype, {});
var const$0018 = Object.create(MaxContentSizing.prototype, {});
var const$0019 = Object.create(TrackSizing.prototype, {min: {"value": const$0017, writeable: false}, max: {"value": const$0018, writeable: false}});
var const$0020 = _constMap([]);
var const$0021 = Object.create(IllegalArgumentException.prototype, {_arg: {"value": "Invalid list length", writeable: false}});
var const$0022 = Object.create(Dimension.prototype, {name: {"value": "width", writeable: false}});
var const$0023 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "TODO(jacobr): should we impl?", writeable: false}});
var const$0024 = Object.create(Dimension.prototype, {name: {"value": "height", writeable: false}});
var const$0025 = Object.create(_UsedBreadthAccumulator.prototype, {});
var const$0026 = Object.create(_MaxBreadthAccumulator.prototype, {});
var const$0027 = Object.create(ContentSizeMode.prototype, {name: {"value": "min", writeable: false}});
var const$0028 = Object.create(ContentSizeMode.prototype, {name: {"value": "max", writeable: false}});
var $globals = {};
$static_init();
main();
