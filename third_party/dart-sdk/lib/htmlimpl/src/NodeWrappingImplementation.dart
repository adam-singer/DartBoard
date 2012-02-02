// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class _ChildrenNodeList implements NodeList {
  // Raw node.
  final _node;
  final _childNodes;

  _ChildrenNodeList._wrap(var node)
    : _childNodes = node.childNodes,
      _node = node;

  List<Node> _toList() {
    final output = new List(_childNodes.length);
    for (int i = 0, len = _childNodes.length; i < len; i++) {
      output[i] = LevelDom.wrapNode(_childNodes[i]);
    }
    return output;
  }

  Node get first() {
    return LevelDom.wrapNode(_node.firstChild);
  }

  void forEach(void f(Node element)) => _toList().forEach(f);

  Collection map(f(Node element)) => _toList().map(f);

  NodeList filter(bool f(Node element)) => new _NodeList(_toList().filter(f));

  bool every(bool f(Node element)) {
    for(Node element in this) {
      if (!f(element)) {
        return false;
      }
    };
    return true;
  }

  bool some(bool f(Node element)) {
    for(Node element in this) {
      if (f(element)) {
        return true;
      }
    };
    return false;
  }

  /** @domName Node.hasChildNodes */
  bool isEmpty() {
    return !_node.hasChildNodes();
  }

  int get length() {
    return _childNodes.length;
  }

  Node operator [](int index) {
    return LevelDom.wrapNode(_childNodes[index]);
  }

  void operator []=(int index, Node value) {
    _node.replaceChild(LevelDom.unwrap(value), _childNodes[index]);
  }

   void set length(int newLength) {
     throw new UnsupportedOperationException('');
   }

  /** @domName Node.appendChild */
  Node add(Node value) {
    _node.appendChild(LevelDom.unwrap(value));
    return value;
  }

  Node addLast(Node value) {
    _node.appendChild(LevelDom.unwrap(value));
    return value;
  }

  Iterator<Node> iterator() {
    return _toList().iterator();
  }

  void addAll(Collection<Node> collection) {
    for (Node node in collection) {
      _node.appendChild(LevelDom.unwrap(node));
    }
  }

  void sort(int compare(Node a, Node b)) {
    throw const UnsupportedOperationException('TODO(jacobr): should we impl?');
  }

  void copyFrom(List<Object> src, int srcStart, int dstStart, int count) {
    throw 'Not impl yet. todo(jacobr)';
  }

  void setRange(int start, int length, List from, [int startFrom = 0]) =>
    Lists.setRange(this, start, length, from, startFrom);

  void removeRange(int start, int length) =>
    Lists.removeRange(this, start, length, (i) => this[i].remove());

  void insertRange(int start, int length, [initialValue = null]) {
    throw const NotImplementedException();
  }

  NodeList getRange(int start, int length) =>
    new _NodeList(Lists.getRange(this, start, length));

  int indexOf(Node element, [int start = 0]) {
    return Lists.indexOf(this, element, start, this.length);
  }

  int lastIndexOf(Node element, [int start = null]) {
    if (start === null) start = length - 1;
    return Lists.lastIndexOf(this, element, start);
  }

  void clear() {
    _node.textContent = '';
  }

  Node removeLast() {
    final last = this.last();
    if (last != null) {
      _node.removeChild(LevelDom.unwrap(last));
    }
    return last;
  }

  Node last() {
    return LevelDom.wrapNode(_node.lastChild);
  }
}

// TODO(nweiz): when all implementations we target have the same name for the
// coreimpl implementation of List<E>, extend that rather than wrapping.
class _ListWrapper<E> implements List<E> {
  List<E> _list;

  _ListWrapper(List<E> this._list);

  Iterator<E> iterator() => _list.iterator();

  void forEach(void f(E element)) => _list.forEach(f);

  Collection map(f(E element)) => _list.map(f);

  List<E> filter(bool f(E element)) => _list.filter(f);

  bool every(bool f(E element)) => _list.every(f);

  bool some(bool f(E element)) => _list.some(f);

  bool isEmpty() => _list.isEmpty();

  int get length() => _list.length;

  E operator [](int index) => _list[index];

  void operator []=(int index, E value) { _list[index] = value; }

  void set length(int newLength) { _list.length = newLength; }

  void add(E value) => _list.add(value);

  void addLast(E value) => _list.addLast(value);

  void addAll(Collection<E> collection) => _list.addAll(collection);

  void sort(int compare(E a, E b)) => _list.sort(compare);

  int indexOf(E element, [int start = 0]) => _list.indexOf(element, start);

  int lastIndexOf(E element, [int start = 0]) =>
    _list.lastIndexOf(element, start);

  void clear() => _list.clear();

  E removeLast() => _list.removeLast();

  E last() => _list.last();

  List<E> getRange(int start, int length) => _list.getRange(start, length);

  void setRange(int start, int length, List<E> from, [int startFrom = 0]) =>
    _list.setRange(start, length, from, startFrom);

  void removeRange(int start, int length) => _list.removeRange(start, length);

  void insertRange(int start, int length, [E initialValue = null]) =>
    _list.insertRange(start, length, initialValue);

  E get first() => _list[0];
}

class _NodeList extends _ListWrapper<Node> implements NodeList {
  _NodeList(List<Node> list) : super(list);

  NodeList filter(bool f(Node element)) => new _NodeList(super.filter(f));

  NodeList getRange(int start, int length) =>
    new _NodeList(super.getRange(start, length));
}

class NodeWrappingImplementation extends EventTargetWrappingImplementation implements Node {
  NodeList _nodes;

  NodeWrappingImplementation._wrap(ptr) : super._wrap(ptr);

  void set nodes(Collection<Node> value) {
    // Copy list first since we don't want liveness during iteration.
    List copy = new List.from(value);
    nodes.clear();
    nodes.addAll(copy);
  }

  NodeList get nodes() {
    if (_nodes === null) {
      _nodes = new _ChildrenNodeList._wrap(_ptr);
    }
    return _nodes;
  }

  Node get nextNode() => LevelDom.wrapNode(_ptr.nextSibling);

  Document get document() => LevelDom.wrapDocument(_ptr.ownerDocument);

  Node get parent() => LevelDom.wrapNode(_ptr.parentNode);

  Node get previousNode() => LevelDom.wrapNode(_ptr.previousSibling);

  String get text() => _ptr.textContent;

  void set text(String value) { _ptr.textContent = value; }

  // New methods implemented.
  Node replaceWith(Node otherNode) {
    try {
      _ptr.parentNode.replaceChild(LevelDom.unwrap(otherNode), _ptr);
    } catch(var e) {
      // TODO(jacobr): what should we return on failure?
    }
    return this;
  }

  Node remove() {
    // TODO(jacobr): should we throw an exception if parent is already null?
    if (_ptr.parentNode !== null) {
      _ptr.parentNode.removeChild(_ptr);
    }
    return this;
  }

  /** @domName contains */
  bool contains(Node otherNode) {
    // TODO: Feature detect and use built in.
    while (otherNode != null && otherNode != this) {
      otherNode = otherNode.parent;
    }
    return otherNode == this;
  }

  // TODO(jacobr): remove when/if List supports a method similar to
  // insertBefore or we switch NodeList to implement LinkedList rather than
  // array.
  Node insertBefore(Node newChild, Node refChild) {
    return LevelDom.wrapNode(_ptr.insertBefore(
        LevelDom.unwrap(newChild), LevelDom.unwrap(refChild)));
  }

  Node clone(bool deep) {
    return LevelDom.wrapNode(_ptr.cloneNode(deep));
  }
}
