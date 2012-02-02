
class DOMTokenListJs extends DOMTypeJs implements DOMTokenList native "*DOMTokenList" {

  int get length() native "return this.length;";

  void add(String token) native;

  bool contains(String token) native;

  String item(int index) native;

  void remove(String token) native;

  String toString() native;

  bool toggle(String token) native;
}
