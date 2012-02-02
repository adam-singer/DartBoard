
#library('DartBoardServerLib');
#import('dart:io');
#import("../../third_party/HttpServer/http.dart");
#import("../../third_party/json/dart_json.dart");


#source('IsolatedServer.dart');
#source('ServerMain.dart');
#source('DartBoardServerStatus.dart');
#source('DartExec.dart');
#source('DartBoardServerCommand.dart');

final BUILDPATH="/tmp/";
final PATHSEP="/";
final DARTCOMMAND="/Users/adam/dart/DartBoard/third_party/dart-sdk/bin/dart";

bool DEBUG=true; 

debugPrint(var p) {
  if (DEBUG) {
    print(p);
  }  
}

class DartBoardServer extends IsolatedServer {
  
  DartBoardServer() : super() {
    //TODO: not the right place to put this
    Map DARTBOARDCLIENT={
"DartBoardClient.html":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.html", 
"DartBoardClient.dart":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.dart"
};

    addHandler("/",
      (HTTPRequest request, HTTPResponse response) =>
          redirectPageHandler(
              request, response, "DartBoardClient.html"));
    
    addHandler("/DartBoardClient.html",
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT["DartBoardClient.html"]));
    
    addHandler("/DartBoardClient.dart",
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT["DartBoardClient.dart"]));
    
    addHandler("/dartExec", (request, response) {
      debugPrint("calling /dartExec");
      void dataEndHandler(String data) {
        if (data is! String) {
          // TODO: throw exception or report server error.
        }
        
        var requestData = JSON.parse(data);
        debugPrint(requestData);

        final receivePort = new ReceivePort();
        receivePort.receive((var message, SendPort notUsedHere) {
          debugPrint("Received message:");
          debugPrint("console = ${message['console']}");
          debugPrint("error = ${message['error']}");
          receivePort.close();
          _sendJSONResponse(response,message);
        });

        var c = requestData["code"];       
        new ExeIsolate().spawn().then((SendPort sendPort) {
          sendPort.send(c, receivePort.toSendPort());
        });        
      };
      
      request.dataEnd = dataEndHandler;
    });
    
  }
}

