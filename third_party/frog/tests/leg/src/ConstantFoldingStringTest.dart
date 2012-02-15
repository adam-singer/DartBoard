// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
// Test constant folding on strings.

#import("compiler_helper.dart");

final String STRING_FOLDING = """
void main() {
  var a = 'hello';
  var b = 'world';
  print(a + b);
}
""";

void compileAndTest(String code, String entry, RegExp regexp) {
  String generated = compile(code, entry);
  Expect.isTrue(regexp.hasMatch(generated));
}

main() {
  compileAndTest(
      STRING_FOLDING, 'main', const RegExp("print\\('hello' \\+ 'world'\\)"));
}
