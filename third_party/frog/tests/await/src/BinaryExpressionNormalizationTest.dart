// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// await on (non short-circuit, ie not: || &&) binary expressions.
#import("await_test_helper.dart");

main() {
  Expect.equals(true, await futureOf(1) < await futureOf(2));
  Expect.equals(false, await futureOf(1) >= await futureOf(2));
  Expect.equals(4, await futureOf(1) + await futureOf(3));
  Expect.equals(1, await futureOf(3) - await futureOf(2));
  int x;
  Expect.equals(4, (x = await futureOf(3) + 1));
  Expect.equals(4, x);
  Expect.equals(8, (x += await futureOf(3) + 1));
  Expect.equals(8, x);
}
