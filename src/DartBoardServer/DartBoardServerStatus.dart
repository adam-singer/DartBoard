// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class DartBoardServerStatus {
  static final STARTING = 0;
  static final STARTED = 1;
  static final STOPPING = 2;
  static final STOPPED = 3;
  static final ERROR = 4;

  DartBoardServerStatus(this._state, this._message);
  DartBoardServerStatus.starting() : _state = STARTING;
  DartBoardServerStatus.started(this._port) : _state = STARTED;
  DartBoardServerStatus.stopping() : _state = STOPPING;
  DartBoardServerStatus.stopped() : _state = STOPPED;
  DartBoardServerStatus.error([this._error]) : _state = ERROR;

  bool get isStarting() => _state == STARTING;
  bool get isStarted() => _state == STARTED;
  bool get isStopping() => _state == STOPPING;
  bool get isStopped() => _state == STOPPED;
  bool get isError() => _state == ERROR;

  int get state() => _state;
  String get message() {
    if (_message != null) return _message;
    switch (_state) {
      case STARTING: return "Server starting";
      case STARTED: return "Server listening";
      case STOPPING: return "Server stopping";
      case STOPPED: return "Server stopped";
      case ERROR:
        if (_error == null) {
          return "Server error";
        } else {
          return "Server error: $_error";
        }
    }
  }

  int get port() => _port;
  Dynamic get error() => _error;

  int _state;
  String _message;
  int _port;
  var _error;
}
