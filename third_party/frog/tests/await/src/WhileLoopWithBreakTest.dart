// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Await within a loop with a break statement.

#import("await_test_helper.dart");

main() {
  var x = 0;
  while (x < 3) {
    final f = futureOf(1);
    final t = await f;
    if (x == 2) {
      break;
    }
    x += t;
  }
  Expect.equals(x, 2);
}

// This is roughly equivalent to:
// main() {
//   final _ret = new Completer();
//   var x = 0;
//   _after_loop_1() {
//     Expect.equals(x, 2);
//     _ret.complete(null);
//   }
//   _loop_1() {
//     while (x < 3) {
//       final f = futureOf(1);
//       f.then((t) {
//         if (x == 2) {
//           _after_loop_1();
//           return;
//         }
//         x += t;
//         _loop_1();
//       });
//       Futures.propagateError(f, _ret);
//       return;
//     }
//     _after_loop_1();
//   }();
//   return _ret;
// }
