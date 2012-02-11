
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
    String DARTBOARDCLIENTHTMLLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.html";
    String DARTBOARDCLIENTDARTLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.dart";
    String DARTBOARDCLIENTDARTJSLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.dart.js";
    String DARTBOARDCSSLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/dartboard.css";
    String PHOTOLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/photo.jpg";
    String STYLELOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/style.css"; 
    
    String DARTBOARDCLIENTHTMLREQUEST="/DartBoardClient.html";
    String DARTBOARDCLIENTDARTREQUEST="/DartBoardClient.dart";
    String DARTBOARDCLIENTDARTJSREQUEST="/DartBoardClient.dart.js";
    String DARTBOARDCSSREQUEST="/dartboard.css";
    String PHOTOREQUEST="/photo.jpg";
    String STYLEREQUEST="/style.css";
    
    Map DARTBOARDCLIENT={};
    DARTBOARDCLIENT[DARTBOARDCLIENTHTMLREQUEST]= DARTBOARDCLIENTHTMLLOCATION;
    DARTBOARDCLIENT[DARTBOARDCLIENTDARTREQUEST]= DARTBOARDCLIENTDARTLOCATION;
    DARTBOARDCLIENT[DARTBOARDCLIENTDARTJSREQUEST]= DARTBOARDCLIENTDARTJSLOCATION;
    DARTBOARDCLIENT[DARTBOARDCSSREQUEST]= DARTBOARDCSSLOCATION;
    DARTBOARDCLIENT[PHOTOREQUEST]= PHOTOLOCATION;
    DARTBOARDCLIENT[STYLEREQUEST]= STYLELOCATION;
    
//"DartBoardClient.html":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.html", 
//"DartBoardClient.dart":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.dart"

 
    
    addHandler("/",
      (HTTPRequest request, HTTPResponse response) =>
          redirectPageHandler(
              request, response, DARTBOARDCLIENTHTMLREQUEST));
    
// Roll this into a loop
    addHandler(DARTBOARDCLIENTHTMLREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[DARTBOARDCLIENTHTMLREQUEST]));
    
    addHandler(DARTBOARDCLIENTDARTREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[DARTBOARDCLIENTDARTREQUEST]));
    
    addHandler(DARTBOARDCLIENTDARTJSREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[DARTBOARDCLIENTDARTJSREQUEST]));
    
    addHandler(DARTBOARDCSSREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[DARTBOARDCSSREQUEST]));
    
    addHandler(PHOTOREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[PHOTOREQUEST]));
    
    addHandler(STYLEREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[STYLEREQUEST]));
    
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

