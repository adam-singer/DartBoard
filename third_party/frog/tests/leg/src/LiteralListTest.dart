// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#import("compiler_helper.dart");

final String TEST_ONE = @"""
foo() {
  print([1, 2]);
  print([3]);
  var c = [4, 5];
  print(c);
}
""";

main() {
  String generated = compile(TEST_ONE, 'foo');
  Expect.isTrue(generated.contains('print\$1([1, 2]);'));
  Expect.isTrue(generated.contains('print\$1([3]);'));
  Expect.isTrue(generated.contains('print\$1([4, 5]);'));
}
