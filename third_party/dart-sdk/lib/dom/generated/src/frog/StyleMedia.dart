
class StyleMediaJs extends DOMTypeJs implements StyleMedia native "*StyleMedia" {

  String get type() native "return this.type;";

  bool matchMedium(String mediaquery) native;
}
