// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within a try-catch block, the awaited future produces the error.

#import("await_test_helper.dart");

errorDuring() {
  try {
    final ef = errorOf("my error");
    final t = await ef;
    return t;
  } catch (e) {
    Expect.equals("my error", e);
    return 2;
  }
}

main() {
  int t = await errorDuring();
  Expect.equals(2, t);
}
