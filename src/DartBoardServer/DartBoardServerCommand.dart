// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class DartBoardServerCommand {

  static final START = 0;
  static final STOP = 1;

  DartBoardServerCommand.start(String this._host,
                          int this._port,
                          [int backlog = 5,
                           bool logging = false])
      : _command = START, _backlog = backlog, _logging = logging;
  DartBoardServerCommand.stop() : _command = STOP;

  bool get isStart() => _command == START;
  bool get isStop() => _command == STOP;

  String get host() => _host;
  int get port() => _port;
  bool get logging() => _logging;
  int get backlog() => _backlog;

  int _command;
  String _host;
  int _port;
  int _backlog;
  bool _logging;
}
