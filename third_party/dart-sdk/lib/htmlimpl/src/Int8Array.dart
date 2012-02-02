// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

interface Int8Array extends ArrayBufferView
    default Int8ArrayWrappingImplementation {

  static final int BYTES_PER_ELEMENT = 1;

  Int8Array(int length);

  Int8Array.from(List<num> list);

  Int8Array.fromBuffer(ArrayBuffer buffer);

  int get length();

  Int8Array subarray(int start, [int end]);
}
