
class SVGAnimatedEnumerationJs extends DOMTypeJs implements SVGAnimatedEnumeration native "*SVGAnimatedEnumeration" {

  int get animVal() native "return this.animVal;";

  int get baseVal() native "return this.baseVal;";

  void set baseVal(int value) native "this.baseVal = value;";
}
