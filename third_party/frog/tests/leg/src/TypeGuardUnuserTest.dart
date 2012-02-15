// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#import("compiler_helper.dart");

final String TEST_ONE = @"""
foo(a) {
  int c = foo(1);
  if (a) c = foo(2);
  return c;
}
""";


final String TEST_TWO = @"""
bar(a) {}
foo(d) {
  int a = 1;
  int c = foo(1);
  if (true) {}
  return a + c;
}
""";

final String TEST_THREE = @"""
foo(int param1, int param2) {
  return param1 + param2;
}
""";


main() {
  String generated = compile(TEST_ONE, 'foo');
  RegExp regexp = new RegExp(getIntTypeCheck(anyIdentifier));
  Iterator<Match> matches = regexp.allMatches(generated).iterator();
  checkNumberOfMatches(matches, 0);

  regexp = const RegExp("return c;");
  Expect.isTrue(regexp.hasMatch(generated));

  generated = compile(TEST_TWO, 'foo');
  regexp = const RegExp("foo\\\$1\\(1\\)");
  matches = regexp.allMatches(generated).iterator();
  checkNumberOfMatches(matches, 1);

  generated = compile(TEST_THREE, 'foo');
  regexp = new RegExp(getIntTypeCheck('param1'));
  Expect.isTrue(regexp.hasMatch(generated));
  regexp = new RegExp(getIntTypeCheck('param2'));
  Expect.isTrue(regexp.hasMatch(generated));
}
