// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within a lambda function.

#import("await_test_helper.dart");

main() {
  bool called = false;
  func() {
    final f = futureOf(3);
    final x = await f;
    Expect.equals(3, x);
    called = true;
  }
  Expect.equals(false, called);
  final f2 = func();
  Expect.equals(false, called);
  await f2;
  Expect.equals(true, called);
}
