// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Linear not-normalized await expression
#import("await_test_helper.dart");

main() => Expect.equals(3, await futureOf(3));
