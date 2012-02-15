// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#import("compiler_helper.dart");

final String TEST_ONE = @"""
void foo(bar) {
  print(1 + bar);
  print(1 + bar);
}
""";

main() {
  String generated = compile(TEST_ONE, 'foo');
  RegExp regexp = const RegExp("1 \\+ bar");
  Iterator matches = regexp.allMatches(generated).iterator();
  Expect.isTrue(matches.hasNext());
  matches.next();
  Expect.isFalse(matches.hasNext());
}
