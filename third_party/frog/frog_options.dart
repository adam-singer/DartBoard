// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/** General options used by the compiler. */
FrogOptions options;

/** Extracts options from command-line arguments. */
void parseOptions(String homedir, List<String> args, FileSystem files) {
  assert(options == null);
  options = new FrogOptions(homedir, args, files);
}

// TODO(sigmund): make into a generic option parser...
class FrogOptions {
  /** Location of corelib and other special dart libraries. */
  String libDir;

  /* The top-level dart script to compile. */
  String dartScript;

  /** Where to place the generated code. */
  String outfile;

  // TODO(dgrove): fix this. For now, either 'sdk' or 'dev'.
  final config = 'dev';


  // Options that modify behavior significantly
  bool legOnly = false;
  bool enableAsserts = false;
  bool enableTypeChecks = false;
  bool warningsAsErrors = false;
  bool verifyImplements = false; // TODO(jimhug): Implement
  bool compileAll = false;
  bool forceDynamic = false;
  bool dietParse = false;
  bool compileOnly = false;
  bool inferTypes = false;
  bool checkOnly = false;

  // Specifies non-compliant behavior where array bounds checks are
  // not implemented in generated code.
  bool disableBoundsChecks = false;

  // Message support
  bool throwOnErrors = false;
  bool throwOnWarnings = false;
  bool throwOnFatal = false;
  bool showInfo = false;
  bool showWarnings = true;
  bool useColors = true;

  // Not currently settable via command line.
  // Intended for use by compiler implementer during debugging.
  // TODO(jmesserly): what are the right values for these?
  int maxInferenceIterations = 4;

  /**
   * Options to be used later for passing to the generated code. These are all
   * the arguments after the first dart script, if any.
   */
  List<String> childArgs;

  FrogOptions(String homedir, List<String> args, FileSystem files) {
    if (config == 'dev') {
      libDir = joinPaths(homedir, '/lib'); // Default value for --libdir.
    } else if (config == 'sdk') {
      libDir = joinPaths(homedir, '/../lib');
    } else {
      world.error('Invalid configuration $config', null);
      throw('Invalid configuration');
    }

    bool ignoreUnrecognizedFlags = false;
    bool passedLibDir = false;
    childArgs = [];

    // Start from 2 to skip arguments representing the compiler command
    // (node/python followed by frogsh/frog.py).
    loop: for (int i = 2; i < args.length; i++) {
      var arg = args[i];

      switch (arg) {
        case '--leg':
        case '--enable_leg':
        case '--leg_only':
          legOnly = true;
          break;

        case '--enable_asserts':
          enableAsserts = true;
          break;

        case '--enable_type_checks':
          enableTypeChecks = true;
          // This flag also enables asserts in VM
          enableAsserts = true;
          break;

        case '--verify_implements':
          verifyImplements = true;
          break;

        case '--compile_all':
          compileAll = true;
          break;

        case '--check-only':
          checkOnly = true;
          break;

        case '--diet-parse':
          dietParse = true;
          break;

        case '--ignore-unrecognized-flags':
          ignoreUnrecognizedFlags = true;
          break;

        case '--verbose':
          showInfo = true;
          break;

        case '--suppress_warnings':
          showWarnings = false;
          break;

        case '--warnings_as_errors':
          warningsAsErrors = true;
          break;

        case '--throw_on_errors':
          throwOnErrors = true;
          break;

        case '--throw_on_warnings':
          throwOnWarnings = true;
          break;

        case '--compile-only':
          // As opposed to compiling and running, the default behavior.
          compileOnly = true;
          break;

        case '--Xforce_dynamic':
          forceDynamic = true;
          break;

        case '--no_colors':
          useColors = false;
          break;

        case '--Xinfer_types':
          inferTypes = true;
          break;

        case '--checked':
          enableTypeChecks = true;
          enableAsserts = true;
          break;

        case '--unchecked':
          disableBoundsChecks = true;
          break;

        default:
          if (arg.endsWith('.dart')) {
            dartScript = arg;
            childArgs = args.getRange(i + 1, args.length - i - 1);
            break loop;
          } else if (arg.startsWith('--out=')) {
            outfile = arg.substring('--out='.length);
          } else if (arg.startsWith('--libdir=')) {
            libDir = arg.substring('--libdir='.length);
            passedLibDir = true;
          } else {
            if (!ignoreUnrecognizedFlags) {
              print('unrecognized flag: "$arg"');
            }
          }
      }
    }

    // TODO(jimhug): Remove this hack.
    if (!passedLibDir && config == 'dev' && !files.fileExists(libDir)) {
      // Try locally
      var temp = 'frog/lib';
      if (files.fileExists(temp)) {
        libDir = temp;
      } else {
        libDir = 'lib';
      }
    }
  }
}
