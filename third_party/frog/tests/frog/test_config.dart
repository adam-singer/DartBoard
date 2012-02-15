// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#library("frog_test_config");

#import("../../../tools/testing/dart/test_suite.dart");

class FrogTestSuite extends StandardTestSuite {
  FrogTestSuite(Map configuration)
      : super(configuration,
              "frog",
              "frog/tests/frog/src",
              ["frog/tests/frog/frog.status"]);
}
