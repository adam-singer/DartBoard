// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class IsolatedServer extends Isolate {
  Map _requestHandlers; // Request handlers 
  String _host; // Host
  int _port; // Listening port
  HTTPServer _server;  // HTTP server instance.
  
  // Static HTML.
  List<int> _redirectPage;
  List<int> _notFoundPage;
  
  static final String redirectPageHtml = """
<html>
<head><title>Welcome to the dart server</title></head>
<body><h1>Redirecting to the front page...</h1></body>
</html>""";
  static final String notFoundPageHtml = """
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body></html>""";
  
  
  IsolatedServer() : super() {
    _requestHandlers = new Map();
  }
  
  void main() {
    this.port.receive(
      void _(var message, SendPort replyTo) {
        if (message.isStart) {
          _host = message.host;
          _port = message.port;
          //_logging = message.logging;
          replyTo.send(new DartBoardServerStatus.starting(), null);
          _server = new HTTPServer();
          try {
            _server.listen(
                _host,
                _port,
                (HTTPRequest req, HTTPResponse rsp) =>
                    _requestReceivedHandler(req, rsp),
                backlog: message.backlog);
            replyTo.send(new DartBoardServerStatus.started(_server.port), null);
            //_loggingTimer = new Timer.repeating(_handleLogging, 1000);
          } catch (var e) {
            replyTo.send(new DartBoardServerStatus.error(e.toString()), null);
          }
        } else if (message.isStop) {
          replyTo.send(new DartBoardServerStatus.stopping(), null);
          stop();
          replyTo.send(new DartBoardServerStatus.stopped(), null);
        }
      });
  }
  
  
  void addHandler(String path, void handler(HTTPRequest request, HTTPResponse response)) {
    _requestHandlers[path] = handler;
  }
  
  void redirectPageHandler(HTTPRequest request,
                           HTTPResponse response,
                           String redirectPath) {
    if (_redirectPage == null) {
      _redirectPage = redirectPageHtml.charCodes();
    }
    response.statusCode = HTTPStatus.FOUND;
    response.setHeader(
        "Location", "http://$_host:$_port/${redirectPath}");
    response.contentLength = _redirectPage.length;
    response.writeList(_redirectPage, 0, _redirectPage.length);
    response.writeDone();
  }
  
  // Serve the content of a file.
  void fileHandler(
      HTTPRequest request, HTTPResponse response, [String fileName = null]) {
    debugPrint("fileHandler: $fileName");
    final int BUFFER_SIZE = 4096;
    if (fileName == null) {
      fileName = request.path.substring(1);
    }
    File file = new File(fileName);
    if (file.existsSync()) {
      RandomAccessFile openedFile = file.openSync();
      int totalRead = 0;
      List<int> buffer = new List<int>(BUFFER_SIZE);

      String mimeType = "text/html; charset=UTF-8";
      int lastDot = fileName.lastIndexOf(".", fileName.length);
      if (lastDot != -1) {
        String extension = fileName.substring(lastDot);
        if (extension == ".css") { mimeType = "text/css"; }
        if (extension == ".js") { mimeType = "application/javascript"; }
        if (extension == ".ico") { mimeType = "image/vnd.microsoft.icon"; }
        if (extension == ".png") { mimeType = "image/png"; }
      }
      response.setHeader("Content-Type", mimeType);
      response.contentLength = openedFile.lengthSync();

      bool checkDone() {
        if (totalRead == openedFile.lengthSync()) {
          openedFile.closeSync();
          response.writeDone();
          return true;
        }
        return false;
      }

      void writeFileData() {
        if (checkDone()) return;
        while (totalRead < openedFile.lengthSync()) {
          var read = openedFile.readListSync(buffer, 0, BUFFER_SIZE);
          totalRead += read;

          // Write this buffer and get a callback when it makes sense
          // to write more.
          bool writeCompleted =
              response.writeList(buffer, 0, read, writeFileData);
          if (writeCompleted) {
            if (checkDone()) return;
          } else {
            break;
          }
        }
      }

      writeFileData();
    } else {
      debugPrint("File not found: $fileName");
      _notFoundHandler(request, response);
    }
  }
  
  // Serve the not found page.
  void _notFoundHandler(HTTPRequest request, HTTPResponse response) {
    if (_notFoundPage == null) {
      _notFoundPage = notFoundPageHtml.charCodes();
    }
    response.statusCode = HTTPStatus.NOT_FOUND;
    response.setHeader("Content-Type", "text/html; charset=UTF-8");
    response.contentLength = _notFoundPage.length;
    response.writeList(_notFoundPage, 0, _notFoundPage.length);
    response.writeDone();
  }
  
  void _requestReceivedHandler(HTTPRequest request, HTTPResponse response) {
    //if (_logRequests) {
    if (true) {
      String method = request.method;
      String uri = request.uri;
      debugPrint("Request: $method $uri");
      debugPrint("Request headers:");
      request.headers.forEach(
          (String name, String value) => print("$name: $value"));
      debugPrint("Request parameters:");
      request.queryParameters.forEach(
          (String name, String value) => print("$name = $value"));
      debugPrint("");
    }

    var requestHandler =_requestHandlers[request.path];
    if (requestHandler != null) {
      requestHandler(request, response);
    } else {
      debugPrint('No request handler found for ${request.path}');
      _notFoundHandler(request, response);
    }
  }
  
  void _sendJSONResponse(HTTPResponse response, Map responseData) {
    print('_sendJSONResponse(): ' + JSON.stringify(responseData));
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.writeString(JSON.stringify(responseData));
    response.writeDone();
  }
  
  stop() {
    _server.close();
    //_cleanupTimer.cancel();
    this.port.close();
  }
}
