
class HTMLMenuElementJs extends HTMLElementJs implements HTMLMenuElement native "*HTMLMenuElement" {

  bool get compact() native "return this.compact;";

  void set compact(bool value) native "this.compact = value;";
}
