// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#library('minfrog');

#import('lib/node/node.dart');
#import('file_system_node.dart');
#import('lang.dart');

void main() {
  // Get the home directory from our executable.
  var homedir = path.dirname(fs.realpathSync(process.argv[1]));

  // Note: we create a copy of argv here because the one that is passed in is
  // potentially a JS Array object from outside the sandbox. Hence it will have
  // the wrong prototype.
  var argv = [];
  for (int i = 0; i < process.argv.length; i++) {
    argv.add(process.argv[i]);
    if (i == 1) {
      var terminal = process.env['TERM'];
      if (terminal == null || !terminal.startsWith('xterm')) {
        argv.add('--no_colors');
      }
    }
  }

  if (compile(homedir, argv, new NodeFileSystem())) {
    var code = world.getGeneratedCode();
    if (options.compileOnly) {
      if (options.outfile != null) {
        print('Compilation succeded. Code generated in: ${options.outfile}');
      } else {
        print('Compilation succeded.');
      }
    } else {
      process.argv = [argv[0], argv[1]];
      process.argv.addAll(options.childArgs);
      // TODO(jmesserly): we shouldn't force the child process to patch argv.
      // Instead, we should be injecting code into the child to fix argv's
      // prototype (and possible the proto of require, process, and console).
      vm.runInNewContext(code, createSandbox());
    }
  } else {
    process.exit(1);
  }
}
