// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// await on (non short-circuit, ie not: || &&) binary expressions.
#import("await_test_helper.dart");

class A {
  int x;
  A(this.x);
}

main() {
  Expect.equals(2, (await futureOf(new A(2))).x);
}
