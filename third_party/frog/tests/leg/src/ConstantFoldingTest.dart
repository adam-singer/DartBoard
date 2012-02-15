// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
// Test constant folding on numbers.

#import("compiler_helper.dart");

final String NUMBER_FOLDING = """
void main() {
  var a = 4;
  var b = 3;
  print(a + b);
}
""";

final String NEGATIVE_NUMBER_FOLDING = """
void main() {
  var a = 4;
  var b = -3;
  print(a + b);
}
""";

final String NULL_EQUALS_FOLDING = """
foo(a, b, c, d) {
  if (a == null) return 1;
  if (null == b) return 2;
  if (4 == c) return 3;
  if ("foo" == d) return 3;
}
""";


void compileAndTest(String code, String entry, RegExp regexp) {
  String generated = compile(code, entry);
  Expect.isTrue(regexp.hasMatch(generated));
}

main() {
  compileAndTest(
      NUMBER_FOLDING, 'main', const RegExp(@"print\$1\(7\)"));
  compileAndTest(
      NEGATIVE_NUMBER_FOLDING, 'main', const RegExp(@"print\$1\(1\)"));

  String generated = compile(NULL_EQUALS_FOLDING, 'foo');
  RegExp regexp = const RegExp(@'eqNull\$1\(a\)');
  Expect.isTrue(regexp.hasMatch(generated));

  regexp = const RegExp(@'\(void 0\) === b');
  Expect.isTrue(regexp.hasMatch(generated));

  regexp = const RegExp('4 === c');
  Expect.isTrue(regexp.hasMatch(generated));

  regexp = const RegExp("'foo' === d");
  Expect.isTrue(regexp.hasMatch(generated));
}
