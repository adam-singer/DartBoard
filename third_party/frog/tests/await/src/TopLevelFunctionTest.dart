// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within a top-level function.

#import("await_test_helper.dart");

bool called = false;

func() {
  final f = futureOf(3);
  final x = await f;
  Expect.equals(3, x);
  called = true;
}

main() {
  Expect.equals(false, called);
  final f = func();
  Expect.equals(false, called);
  await f;
  Expect.equals(true, called);
}
