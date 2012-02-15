// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#import("compiler_helper.dart");

final String TEST_ONE = @"""
foo(a) {
  a.add(42);
  a.removeLast();
  return a.length;
}
""";

main() {
  String generated = compile(TEST_ONE, 'foo');
  Expect.isTrue(generated.contains(@'.builtin$add$1$2('));
  Expect.isTrue(generated.contains(@'.builtin$removeLast$0$1('));
  Expect.isTrue(generated.contains(@'.builtin$get$length$1('));
}
