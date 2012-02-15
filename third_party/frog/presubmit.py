#!/usr/bin/env python
# Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
# for details. All rights reserved. Use of this source code is governed by a
# BSD-style license that can be found in the LICENSE file.

import optparse
import os
import stat
import subprocess
import sys
import time


class Error(Exception):
  pass


def BuildOptions():
  """Configures an option parser for this script"""
  result = optparse.OptionParser()
  result.add_option(
      '--notest',
      help='Skip running test.py',
      default=False,
      action='store_true')
  result.add_option(
      '--leg-only',
      help='Only run leg tests',
      default=False,
      action='store_true')
  return result


def RunCommand(*arguments, **kwargs):
  pattern = None
  if 'pattern' in kwargs:
    pattern = kwargs['pattern']
  expected_exit_code = 0
  if 'exit_code' in kwargs:
    expected_exit_code = kwargs['exit_code']
  stdout = subprocess.PIPE
  if 'verbose' in kwargs and kwargs['verbose']:
    print ' '.join(arguments)
    stdout = None
  try:
    proc = subprocess.Popen(arguments,
                            stdout=stdout,
                            stderr=subprocess.STDOUT)
    stdout = proc.communicate()[0]
    exit_code = proc.wait()
  except OSError as e:
    raise Error('%s: %s' % (arguments[0], e.strerror))
  if exit_code != expected_exit_code:
    DiagnoseError(arguments, stdout)
    raise Error('%s returned %s' % (arguments[0], exit_code))
  if pattern and not pattern in stdout:
    DiagnoseError(arguments, stdout)
    raise Error('%s failed' % arguments[0])


def DiagnoseError(arguments, stdout):
  quoted_arguments = ' '.join([repr(s) for s in arguments])
  sys.stderr.write('Command failed:\n%s\n' % quoted_arguments)
  if stdout:
    sys.stderr.write(stdout)


EXECUTABLE = (stat.S_IRUSR | stat.S_IWUSR | stat.S_IXUSR |
              stat.S_IRGRP | stat.S_IXGRP |
              stat.S_IROTH | stat.S_IXOTH)

def SelfHost():
  def b(s):
    """Adds ANSI escape-code for bold-face"""
    return "\033[1m%s\033[0m" % s

  # VM Checked/CompileAll, produces checked
  print 'Started'
  start = time.time()
  RunCommand('./frog.py',
             '--vm_flags=--compile_all --enable_type_checks --enable_asserts',
             '--', '--compile_all', '--enable_type_checks', '--out=minfrog',
             'minfrog.dart')
  elapsed = time.time() - start
  mode = 'in checked mode + compile all'
  print 'Compiling minfrog on Dart VM took %s seconds %s' % (
      b('%.1f' % elapsed), b(mode))
  os.chmod('./minfrog', EXECUTABLE)

  # VM Production
  start = time.time()
  RunCommand('./frog.py', '--', '--out=minfrog', 'minfrog.dart')
  elapsed = time.time() - start
  mode = 'in production mode'
  print 'Compiling minfrog on Dart VM took %s seconds %s' % (
      b('%.1f' % elapsed), b(mode))
  os.chmod('./minfrog', EXECUTABLE)

  # Selfhost Production
  start = time.time()
  # TODO(jmesserly): --warnings_as_errors disabled until corelib is moved to
  # new factory syntax.
  RunCommand('./minfrog', '--out=minfrog', # '--warnings_as_errors',
             'minfrog.dart', 'tests/hello.dart', verbose=True)
  elapsed = time.time() - start
  size = os.path.getsize('./minfrog') / 1024
  print 'Bootstrapping minfrog took %s seconds %s' % (b('%.1f' % elapsed),
                                              b('in production mode'))
  print 'Generated %s minfrog is %s kB' % (b('production'), b(size))


def main():
  (options, args) = BuildOptions().parse_args()

  RunCommand('../tools/build.py', '--mode=release')

  if not options.leg_only:
    SelfHost()

  test_cmd = ['../tools/test.py', '--report', '--timeout=30',
              '--progress=color', '--mode=release', '--checked']

  if options.notest: return

  if args:
    if options.leg_only:
      test_cmd.append('--component=leg')
    else:
      test_cmd.append('--component=frogsh,leg')
    test_cmd.extend(args)
    RunCommand(*test_cmd, verbose=True)
  else:
    if not options.leg_only:
      # Run frog.py on the corelib tests, so we get some frog.py coverage.
      cmd = test_cmd + ['--component=frog', 'corelib']
      RunCommand(*cmd, verbose=True)

      # Run frogium client tests. This is a pretty quick test but
      # tends to uncover different issues due to the size/complexity
      # of the DOM APIs.
      cmd = test_cmd + ['--component=frogium', 'client']
      RunCommand(*cmd, verbose=True)

      # TODO(jimhug): Consider adding co19 back when it delivers more value
      #   than pain.
      # Run frogsh on most of the tests.
      cmd = test_cmd + ['--component=frogsh', 'language', 'corelib',
                        'isolate', 'peg', 'frog', 'css', 'dartdoc']
      RunCommand(*cmd, verbose=True)

    # Run leg unit tests.
    cmd = test_cmd + ['--component=vm', 'leg']
    RunCommand(*cmd, verbose=True)

    # Leg does not implement checked mode yet.
    test_cmd.remove('--checked')

    cmd = test_cmd + ['--component=leg', 'leg_only']
    RunCommand(*cmd, verbose=True)

    # Run leg on "built-in" tests.
    cmd = test_cmd + ['--component=leg']
    RunCommand(*cmd, verbose=True)


if __name__ == '__main__':
  try:
    sys.exit(main())
  except Error as e:
    sys.stderr.write('%s\n' % e)
    sys.exit(1)
