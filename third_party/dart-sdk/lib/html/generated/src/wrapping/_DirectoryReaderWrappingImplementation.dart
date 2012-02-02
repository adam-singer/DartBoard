// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// WARNING: Do not edit - generated code.

class DirectoryReaderWrappingImplementation extends DOMWrapperBase implements DirectoryReader {
  DirectoryReaderWrappingImplementation._wrap(ptr) : super._wrap(ptr) {}

  void readEntries(EntriesCallback successCallback, [ErrorCallback errorCallback]) {
    if (errorCallback === null) {
      _ptr.readEntries(successCallback);
      return;
    } else {
      _ptr.readEntries(successCallback, LevelDom.unwrap(errorCallback));
      return;
    }
  }
}
