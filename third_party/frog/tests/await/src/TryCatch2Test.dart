// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within a try-catch block, error occurs before the await.

#import("await_test_helper.dart");

errorBefore() {
  try {
    throw "error";
    final t = await futureOf(0);
    return t;
  } catch (e) {
    return 1;
  }
}

main() {
  int t = await errorBefore();
  Expect.equals(1, t);
}
