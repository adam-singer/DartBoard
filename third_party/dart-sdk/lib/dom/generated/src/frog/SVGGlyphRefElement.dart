
class SVGGlyphRefElementJs extends SVGElementJs implements SVGGlyphRefElement native "*SVGGlyphRefElement" {

  num get dx() native "return this.dx;";

  void set dx(num value) native "this.dx = value;";

  num get dy() native "return this.dy;";

  void set dy(num value) native "this.dy = value;";

  String get format() native "return this.format;";

  void set format(String value) native "this.format = value;";

  String get glyphRef() native "return this.glyphRef;";

  void set glyphRef(String value) native "this.glyphRef = value;";

  num get x() native "return this.x;";

  void set x(num value) native "this.x = value;";

  num get y() native "return this.y;";

  void set y(num value) native "this.y = value;";

  // From SVGURIReference

  SVGAnimatedStringJs get href() native "return this.href;";

  // From SVGStylable

  SVGAnimatedStringJs get className() native "return this.className;";

  CSSStyleDeclarationJs get style() native "return this.style;";

  CSSValueJs getPresentationAttribute(String name) native;
}
