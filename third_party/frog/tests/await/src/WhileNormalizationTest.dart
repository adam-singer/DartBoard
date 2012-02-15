// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within the test of a while loop.

#import("await_test_helper.dart");

main() {
  var x = 10;
  var y = 0;
  while (y < 3 || await futureOf(x) > 0) {
    x--;
    y++;
  }
  Expect.equals(7, x);
}
