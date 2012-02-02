// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class _ChunkedInputStream implements ChunkedInputStream {
  _ChunkedInputStream(InputStream this._input, [int chunkSize])
      : _chunkSize = chunkSize, _bufferList = new _BufferList() {
    if (_chunkSize === null) {
      _chunkSize = 0;
    }
    _input.closeHandler = _closeHandler;
  }

  List<int> read() {
    if (_closed) return null;
    var result = _bufferList.readBytes(_chunkSize);
    if (result == null) {
      _readData();
      result = _bufferList.readBytes(_chunkSize);
    }
    if (result == null && _inputClosed) {
      if (_bufferList.length == 0) {
        result = null;
      } else {
        result = _bufferList.readBytes(_bufferList.length);
      }
    }
    _checkInstallDataHandler();
    return result;
  }

  int get chunkSize() => _chunkSize;

  void set chunkSize(int chunkSize) {
    _chunkSize = chunkSize;
    _checkInstallDataHandler();
    _checkScheduleCallback();
  }

  bool get closed() => _closed;

  void set dataHandler(void callback()) {
    _clientDataHandler = callback;
    _checkInstallDataHandler();
  }

  void set closeHandler(void callback()) {
    _clientCloseHandler = callback;
  }

  void set errorHandler(void callback()) {
    _input.errorHandler = callback;
  }

  void _dataHandler() {
    _readData();
    if (_bufferList.length >= _chunkSize && _clientDataHandler !== null) {
      _clientDataHandler();
    }
    _checkScheduleCallback();
    _checkInstallDataHandler();
  }

  void _readData() {
    List<int> data = _input.read();
    if (data !== null) {
      _bufferList.add(data);
    }
  }

  void _closeHandler() {
    _inputClosed = true;
    if (_bufferList.length == 0 && _clientCloseHandler !== null) {
      _clientCloseHandler();
      _closed = true;
    } else {
      _checkScheduleCallback();
    }
  }

  void _checkInstallDataHandler() {
    if (_clientDataHandler === null) {
      _input.dataHandler = null;
    } else {
      if (_bufferList.length < _chunkSize && !_inputClosed) {
        _input.dataHandler = _dataHandler;
      } else {
        _input.dataHandler = null;
      }
    }
  }

  void _checkScheduleCallback() {
    // TODO(sgjesse): Find a better way of scheduling callbacks from
    // the event loop.
    void issueDataCallback(Timer timer) {
      _scheduledDataCallback = null;
      if (_clientDataHandler !== null) {
        _clientDataHandler();
        _checkScheduleCallback();
      }
    }

    void issueCloseCallback(Timer timer) {
      _scheduledCloseCallback = null;
      if (!_closed) {
        if (_clientCloseHandler !== null) _clientCloseHandler();
        _closed = true;
      }
    }

    // Schedule data callback if enough data in buffer.
    if ((_bufferList.length >=_chunkSize ||
         (_bufferList.length > 0 && _inputClosed)) &&
        _clientDataHandler !== null &&
        _scheduledDataCallback == null) {
      _scheduledDataCallback = new Timer(issueDataCallback, 0);
    }

    // Schedule close callback if no more data and input is closed.
    if (_bufferList.length == 0 &&
        _inputClosed &&
        !_closed &&
        _scheduledCloseCallback == null) {
      _scheduledCloseCallback = new Timer(issueCloseCallback, 0);
    }
  }

  InputStream _input;
  _BufferList _bufferList;
  int _chunkSize;
  bool _inputClosed = false;  // Is the underlying input stream closed?
  bool _closed = false;  // Has the close handler been called?.
  Timer _scheduledDataCallback;
  Timer _scheduledCloseCallback;
  Function _clientDataHandler;
  Function _clientCloseHandler;
}
