@echo off
REM Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
REM for details. All rights reserved. Use of this source code is governed by a
REM BSD-style license that can be found in the LICENSE file.

REM This script provides the entry point for frog on Windows, without having to 
REM explicitly call python frog.py. It is used on the buildbot and for any 
REM Windows user of frog.

REM Call frog using python.

set SCRIPTPATH=%~dp0

REM Does the string have a trailing slash? If so, remove it.
if %SCRIPTPATH:~-1%==\ set SCRIPTPATH=%SCRIPTPATH:~0,-1%

REM Canonicalize the direction of the slashes.
set script=%*
set script=%script:\=/%

python %SCRIPTPATH%\frog %script%
