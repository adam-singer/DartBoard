
#library('DartBoardServerLib');
#import('dart:io');
#import("../../third_party/HttpServer/http.dart");
#import("../../third_party/json/dart_json.dart");

#source('CouchDBWrapperImpl.dart');
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
    String HIGHLIGHTLOCATION="/Users/adam/dart/DartBoard/src/DartBoardClient/highlight.css"; 
    
    String DARTBOARDCLIENTHTMLREQUEST="/DartBoardClient.html";
    String DARTBOARDCLIENTDARTREQUEST="/DartBoardClient.dart";
    String DARTBOARDCLIENTDARTJSREQUEST="/DartBoardClient.dart.js";
    String DARTBOARDCSSREQUEST="/dartboard.css";
    String PHOTOREQUEST="/photo.jpg";
    String STYLEREQUEST="/style.css";
    String HIGHLIGHTREQUEST="/highlight.css";
    
    Map DARTBOARDCLIENT={};
    DARTBOARDCLIENT[DARTBOARDCLIENTHTMLREQUEST]= DARTBOARDCLIENTHTMLLOCATION;
    DARTBOARDCLIENT[DARTBOARDCLIENTDARTREQUEST]= DARTBOARDCLIENTDARTLOCATION;
    DARTBOARDCLIENT[DARTBOARDCLIENTDARTJSREQUEST]= DARTBOARDCLIENTDARTJSLOCATION;
    DARTBOARDCLIENT[DARTBOARDCSSREQUEST]= DARTBOARDCSSLOCATION;
    DARTBOARDCLIENT[PHOTOREQUEST]= PHOTOLOCATION;
    DARTBOARDCLIENT[STYLEREQUEST]= STYLELOCATION;
    DARTBOARDCLIENT[HIGHLIGHTREQUEST]= HIGHLIGHTLOCATION;
    
//"DartBoardClient.html":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.html", 
//"DartBoardClient.dart":"/Users/adam/dart/DartBoard/src/DartBoardClient/DartBoardClient.dart"
    

    InitDb();
    
    addHandler("/",
      (HTTPRequest request, HTTPResponse response) =>
          redirectPageHandler(
              request, response, DARTBOARDCLIENTHTMLREQUEST.substring(1)));
    
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
    
    addHandler(HIGHLIGHTREQUEST,
      (HTTPRequest request, HTTPResponse response) =>
          fileHandler(request, response, DARTBOARDCLIENT[HIGHLIGHTREQUEST]));
    
    addHandler("/getCode", (HTTPRequest request, HTTPResponse response) {
      if (request.queryParameters.containsKey('docId')) {
        String docId = request.queryParameters['docId'];
        debugPrint('/getCode requested docId = ${docId}');
        request.dataEnd = (String data) {
          final receiveCouchPort = new ReceivePort();
          receiveCouchPort.receive((var message, SendPort notUsedHere) {
            debugPrint("/getCode receiveCouchPort.message = ${message}");
            receiveCouchPort.close();
            _sendJSONResponse(response,{'docId':docId, 'code': JSON.parse(message)['code']});
          });
          
          new CouchIsolate().spawn().then((SendPort sp) {
            Map m = {'command':'getCode', 'dbName':'codedb' ,'docId':docId};
            sp.send(m, receiveCouchPort.toSendPort());
          });  
        };
      } else {
        request.dataEnd = (String data) {
          _sendJSONResponse(response,{});
        };
      }
      
      
    });
    
    addHandler("/dartExec", (request, response) {
      
      // Send back to client if both parts of the data was recivied.
      
      debugPrint("calling /dartExec");
      void dataEndHandler(String data) {
        if (data is! String) {
          // TODO: throw exception or report server error.
        }
        
        var requestData = JSON.parse(data);
        debugPrint(requestData);

        Map responseMessage = new Map();
        
        final receivePort = new ReceivePort();
        receivePort.receive((var message, SendPort notUsedHere) {
          debugPrint("Received message:");
          debugPrint("console = ${message['console']}");
          debugPrint("error = ${message['error']}");
          receivePort.close();
          
          responseMessage['console'] = message['console'];
          responseMessage['error'] = message['error'];
          
          if (responseMessage.containsKey('url')) {
            _sendJSONResponse(response,responseMessage);
          }
        });

        var c = requestData["code"];       
        new ExeIsolate().spawn().then((SendPort sendPort) {
          sendPort.send(c, receivePort.toSendPort());
        }); 
        
        /*
          Create isolate to store the requestData["code"] into
          couchdb, when message returns then close connection
          and bubble response to client.  
        */
        debugPrint("calling CouchIsolate");
        final receiveCouchPort = new ReceivePort();
        receiveCouchPort.receive((var message, SendPort notUsedHere) {
          debugPrint("receiveCouchPort.message = ${message}");
          receiveCouchPort.close();
          
          responseMessage['url'] = message;
          
          if (responseMessage.containsKey('console')) {
            _sendJSONResponse(response,responseMessage);
          }
        });
        
        new CouchIsolate().spawn().then((SendPort sp) {
          Map m = {'command':'saveCode', 'dbName':'codedb' ,'code':requestData["code"]};
          sp.send(m, receiveCouchPort.toSendPort());
        });
        
      };
      
      request.dataEnd = dataEndHandler;
    });  
  }
    
  InitDb() {
    debugPrint("calling InitDb");
    final receiveCouchPort = new ReceivePort();
    receiveCouchPort.receive((var message, SendPort notUsedHere) {
      debugPrint("receiveCouchPort.message = ${message}");
      receiveCouchPort.close();
    });
    
    new CouchIsolate().spawn().then((SendPort sp) {
      Map m = {'command':'createDatabase', 'dbName':'codedb'};
      sp.send(m, receiveCouchPort.toSendPort());
    });
    
  }
  
}

