// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#library('file_system_vm');
#import('dart:io');
#import('file_system.dart');

/** File system implementation using the vm api's. */
class VMFileSystem implements FileSystem {
  void writeString(String outfile, String text) {
    var f = new File(outfile);
    var stream = f.openOutputStream();
    stream.write(text.charCodes());
    stream.close();
  }

  String readAll(String filename) {
    var file = (new File(filename)).openSync();
    var length = file.lengthSync();
    var buffer = new List<int>(length);
    var bytes = file.readListSync(buffer, 0, length);
    file.closeSync();
    return new String.fromCharCodes(buffer);
  }

  bool fileExists(String filename) {
    return new File(filename).existsSync();
  }

  void createDirectory(String path, [bool recursive = false]) {
    // TODO(rnystrom): Implement.
    throw 'createDirectory() is not implemented by VMFileSystem yet.';
  }

  void removeDirectory(String path, [bool recursive = false]) {
    // TODO(rnystrom): Implement.
    throw 'removeDirectory() is not implemented by VMFileSystem yet.';
  }
}
