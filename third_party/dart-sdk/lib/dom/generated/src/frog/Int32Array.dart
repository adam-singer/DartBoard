
class Int32ArrayJs extends ArrayBufferViewJs implements Int32Array, List<int> native "*Int32Array" {

  factory Int32Array(int length) =>  _construct(length);

  factory Int32Array.fromList(List<int> list) => _construct(list);

  factory Int32Array.fromBuffer(ArrayBuffer buffer) => _construct(buffer);

  static _construct(arg) native 'return new Int32Array(arg);';

  static final int BYTES_PER_ELEMENT = 4;

  int get length() native "return this.length;";

  int operator[](int index) native "return this[index];";

  void operator[]=(int index, int value) native "this[index] = value";
  // -- start List<int> mixins.
  // int is the element type.

  // From Iterable<int>:

  Iterator<int> iterator() {
    // Note: NodeLists are not fixed size. And most probably length shouldn't
    // be cached in both iterator _and_ forEach method. For now caching it
    // for consistency.
    return new _FixedSizeListIterator<int>(this);
  }

  // From Collection<int>:

  void add(int value) {
    throw new UnsupportedOperationException("Cannot add to immutable List.");
  }

  void addLast(int value) {
    throw new UnsupportedOperationException("Cannot add to immutable List.");
  }

  void addAll(Collection<int> collection) {
    throw new UnsupportedOperationException("Cannot add to immutable List.");
  }

  void forEach(void f(int element)) => _Collections.forEach(this, f);

  Collection map(f(int element)) => _Collections.map(this, [], f);

  Collection<int> filter(bool f(int element)) =>
     _Collections.filter(this, <int>[], f);

  bool every(bool f(int element)) => _Collections.every(this, f);

  bool some(bool f(int element)) => _Collections.some(this, f);

  bool isEmpty() => this.length == 0;

  // From List<int>:

  void sort(int compare(int a, int b)) {
    throw new UnsupportedOperationException("Cannot sort immutable List.");
  }

  int indexOf(int element, [int start = 0]) =>
      _Lists.indexOf(this, element, start, this.length);

  int lastIndexOf(int element, [int start = 0]) =>
      _Lists.lastIndexOf(this, element, start);

  int last() => this[length - 1];

  // FIXME: implement thesee.
  void setRange(int start, int length, List<int> from, [int startFrom]) {
    throw new UnsupportedOperationException("Cannot setRange on immutable List.");
  }
  void removeRange(int start, int length) {
    throw new UnsupportedOperationException("Cannot removeRange on immutable List.");
  }
  void insertRange(int start, int length, [int initialValue]) {
    throw new UnsupportedOperationException("Cannot insertRange on immutable List.");
  }
  List<int> getRange(int start, int length) =>
      _Lists.getRange(this, start, length, <int>[]);

  // -- end List<int> mixins.

  void setElements(Object array, [int offset = null]) native;

  Int32ArrayJs subarray(int start, [int end = null]) native;
}
