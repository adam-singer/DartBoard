
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
    String BASE="/Users/adam/dart/DartBoard/src/DartBoardClient";
    // find . | sed 's/\.\(.*\)/\"\1\"\:BASE\+\"\1\"\,/g'
    final Map uriMapping = 
    {
     
     //"/":BASE+"/DartBoardClient.html",
     "/DartBoardClient.html":BASE+"/DartBoardClient.html",
     "/DartBoardClient.dart":BASE+"/DartBoardClient.dart",              
     "/DartBoardClient.dart.js":BASE+"/DartBoardClient.dart.js",
     "/dartboard.css":BASE+"/dartboard.css",
     "/photo.jpg":BASE+"/photo.jpg",
     "/style.css":BASE+"/style.css", 
     "/highlight.css":BASE+"/highlight.css",
     "/dart.js":BASE+"/dart.js", 
     
     
     "/swarm":BASE+"/swarm",
     "/swarm/dart.js":BASE+"/swarm/dart.js",
     "/swarm/App.dart":BASE+"/swarm/App.dart",
     "/swarm/appengine":BASE+"/swarm/appengine",
     "/swarm/appengine/app.yaml":BASE+"/swarm/appengine/app.yaml",
     "/swarm/appengine/cron.yaml":BASE+"/swarm/appengine/cron.yaml",
     "/swarm/appengine/dev.html":BASE+"/swarm/appengine/dev.html",
     "/swarm/appengine/encoder.py":BASE+"/swarm/appengine/encoder.py",
     "/swarm/appengine/index.yaml":BASE+"/swarm/appengine/index.yaml",
     "/swarm/appengine/login.html":BASE+"/swarm/appengine/login.html",
     "/swarm/appengine/main.py":BASE+"/swarm/appengine/main.py",
     "/swarm/appengine/queue.yaml":BASE+"/swarm/appengine/queue.yaml",
     "/swarm/appengine/top.html":BASE+"/swarm/appengine/top.html",
     "/swarm/appengine/upload.html":BASE+"/swarm/appengine/upload.html",
     "/swarm/back-21.png":BASE+"/swarm/back-21.png",
     "/swarm/BiIterator.dart":BASE+"/swarm/BiIterator.dart",
     "/swarm/buildapp.py":BASE+"/swarm/buildapp.py",
     "/swarm/buildit.sh":BASE+"/swarm/buildit.sh",
     "/swarm/cacheimages.py":BASE+"/swarm/cacheimages.py",
     "/swarm/CannedData.dart":BASE+"/swarm/CannedData.dart",
     "/swarm/ConfigHintDialog.dart":BASE+"/swarm/ConfigHintDialog.dart",
     "/swarm/CSS.dart":BASE+"/swarm/CSS.dart",
     "/swarm/Dart_Logo_21.png":BASE+"/swarm/Dart_Logo_21.png",
     "/swarm/DataSource.dart":BASE+"/swarm/DataSource.dart",
     "/swarm/Decoder.dart":BASE+"/swarm/Decoder.dart",
     "/swarm/externallink.svg":BASE+"/swarm/externallink.svg",
     "/swarm/favicon.png":BASE+"/swarm/favicon.png",
     "/swarm/favicon128.png":BASE+"/swarm/favicon128.png",
     "/swarm/gen_manifest.py":BASE+"/swarm/gen_manifest.py",
     "/swarm/HelpDialog.dart":BASE+"/swarm/HelpDialog.dart",
     "/swarm/info.svg":BASE+"/swarm/info.svg",
     "/swarm/lefttriangle.svg":BASE+"/swarm/lefttriangle.svg",
     "/swarm/manifest.json":BASE+"/swarm/manifest.json",
     "/swarm/pigeons-jumpinjimmyjava-white90pct-q70.jpg":BASE+"/swarm/pigeons-jumpinjimmyjava-white90pct-q70.jpg",
     "/swarm/README":BASE+"/swarm/README",
     "/swarm/refresh-21.png":BASE+"/swarm/refresh-21.png",
     "/swarm/righttriangle.svg":BASE+"/swarm/righttriangle.svg",
     "/swarm/settings-21.png":BASE+"/swarm/settings-21.png",
     "/swarm/sliderarrow.svg":BASE+"/swarm/sliderarrow.svg",
     "/swarm/swarm-dev.pem":BASE+"/swarm/swarm-dev.pem",
     "/swarm/swarm.css":BASE+"/swarm/swarm.css",
     "/swarm/swarm.dart":BASE+"/swarm/swarm.dart",
     "/swarm/swarm.dart.js":BASE+"/swarm/swarm.dart.js",
     "/swarm/swarm.html":BASE+"/swarm/swarm.html",
     "/swarm/swarm.scss":BASE+"/swarm/swarm.scss",
     "/swarm/SwarmApp.dart":BASE+"/swarm/SwarmApp.dart",
     "/swarm/swarmlib.dart":BASE+"/swarm/swarmlib.dart",
     "/swarm/SwarmState.dart":BASE+"/swarm/SwarmState.dart",
     "/swarm/SwarmViews.dart":BASE+"/swarm/SwarmViews.dart",
     "/swarm/UIState.dart":BASE+"/swarm/UIState.dart",
     "/swarm/Views.dart":BASE+"/swarm/Views.dart",
     "/ui_lib":BASE+"/ui_lib",
     "/ui_lib/base":BASE+"/ui_lib/base",
     "/ui_lib/base/AnimationScheduler.dart":BASE+"/ui_lib/base/AnimationScheduler.dart",
     "/ui_lib/base/base.dart":BASE+"/ui_lib/base/base.dart",
     "/ui_lib/base/Device.dart":BASE+"/ui_lib/base/Device.dart",
     "/ui_lib/base/DomWrapper.dart":BASE+"/ui_lib/base/DomWrapper.dart",
     "/ui_lib/base/Env.dart":BASE+"/ui_lib/base/Env.dart",
     "/ui_lib/base/Size.dart":BASE+"/ui_lib/base/Size.dart",
     "/ui_lib/layout":BASE+"/ui_lib/layout",
     "/ui_lib/layout/GridLayout.dart":BASE+"/ui_lib/layout/GridLayout.dart",
     "/ui_lib/layout/GridLayoutParams.dart":BASE+"/ui_lib/layout/GridLayoutParams.dart",
     "/ui_lib/layout/GridLayoutParser.dart":BASE+"/ui_lib/layout/GridLayoutParser.dart",
     "/ui_lib/layout/GridTracks.dart":BASE+"/ui_lib/layout/GridTracks.dart",
     "/ui_lib/layout/layout.dart":BASE+"/ui_lib/layout/layout.dart",
     "/ui_lib/layout/SizingFunctions.dart":BASE+"/ui_lib/layout/SizingFunctions.dart",
     "/ui_lib/layout/ViewLayout.dart":BASE+"/ui_lib/layout/ViewLayout.dart",
     "/ui_lib/observable":BASE+"/ui_lib/observable",
     "/ui_lib/observable/ChangeEvent.dart":BASE+"/ui_lib/observable/ChangeEvent.dart",
     "/ui_lib/observable/EventBatch.dart":BASE+"/ui_lib/observable/EventBatch.dart",
     "/ui_lib/observable/observable.dart":BASE+"/ui_lib/observable/observable.dart",
     "/ui_lib/touch":BASE+"/ui_lib/touch",
     "/ui_lib/touch/BezierPhysics.dart":BASE+"/ui_lib/touch/BezierPhysics.dart",
     "/ui_lib/touch/ClickBuster.dart":BASE+"/ui_lib/touch/ClickBuster.dart",
     "/ui_lib/touch/EventUtil.dart":BASE+"/ui_lib/touch/EventUtil.dart",
     "/ui_lib/touch/FxUtil.dart":BASE+"/ui_lib/touch/FxUtil.dart",
     "/ui_lib/touch/Geometry.dart":BASE+"/ui_lib/touch/Geometry.dart",
     "/ui_lib/touch/InfiniteScroller.dart":BASE+"/ui_lib/touch/InfiniteScroller.dart",
     "/ui_lib/touch/Math.dart":BASE+"/ui_lib/touch/Math.dart",
     "/ui_lib/touch/Momentum.dart":BASE+"/ui_lib/touch/Momentum.dart",
     "/ui_lib/touch/resources":BASE+"/ui_lib/touch/resources",
     "/ui_lib/touch/resources/touch.css":BASE+"/ui_lib/touch/resources/touch.css",
     "/ui_lib/touch/Scrollbar.dart":BASE+"/ui_lib/touch/Scrollbar.dart",
     "/ui_lib/touch/Scroller.dart":BASE+"/ui_lib/touch/Scroller.dart",
     "/ui_lib/touch/ScrollWatcher.dart":BASE+"/ui_lib/touch/ScrollWatcher.dart",
     "/ui_lib/touch/TimeUtil.dart":BASE+"/ui_lib/touch/TimeUtil.dart",
     "/ui_lib/touch/touch.dart":BASE+"/ui_lib/touch/touch.dart",
     "/ui_lib/touch/TouchHandler.dart":BASE+"/ui_lib/touch/TouchHandler.dart",
     "/ui_lib/touch/TouchUtil.dart":BASE+"/ui_lib/touch/TouchUtil.dart",
     "/ui_lib/util":BASE+"/ui_lib/util",
     "/ui_lib/util/CollectionUtils.dart":BASE+"/ui_lib/util/CollectionUtils.dart",
     "/ui_lib/util/DateUtils.dart":BASE+"/ui_lib/util/DateUtils.dart",
     "/ui_lib/util/StringUtils.dart":BASE+"/ui_lib/util/StringUtils.dart",
     "/ui_lib/util/Uri.dart":BASE+"/ui_lib/util/Uri.dart",
     "/ui_lib/util/utilslib.dart":BASE+"/ui_lib/util/utilslib.dart",
     "/ui_lib/view":BASE+"/ui_lib/view",
     "/ui_lib/view/CompositeView.dart":BASE+"/ui_lib/view/CompositeView.dart",
     "/ui_lib/view/ConveyorView.dart":BASE+"/ui_lib/view/ConveyorView.dart",
     "/ui_lib/view/MeasureText.dart":BASE+"/ui_lib/view/MeasureText.dart",
     "/ui_lib/view/PagedViews.dart":BASE+"/ui_lib/view/PagedViews.dart",
     "/ui_lib/view/resources":BASE+"/ui_lib/view/resources",
     "/ui_lib/view/resources/view.css":BASE+"/ui_lib/view/resources/view.css",
     "/ui_lib/view/SliderMenu.dart":BASE+"/ui_lib/view/SliderMenu.dart",
     "/ui_lib/view/view.dart":BASE+"/ui_lib/view/view.dart"
    };
    
    String DARTBOARDCLIENTHTMLREQUEST="/DartBoardClient.html";
       
    InitDb();
    
    // Redirect
    addHandler("/",
      (HTTPRequest request, HTTPResponse response) =>
          redirectPageHandler(
              request, response, DARTBOARDCLIENTHTMLREQUEST.substring(1)));
    
    // add uri map handlers
    uriMapping.forEach((var k, var v) {
      addHandler(k,
        (HTTPRequest request, HTTPResponse response) =>
            fileHandler(request, response, v));
    });
    
    addHandler("/getCodeViewer", (HTTPRequest request, HTTPResponse response) {
      int limit = 500; // FIX: bad workaround for reaching the connection limit
      request.dataEnd = (String data) {
      
        final receiveCouchPort = new ReceivePort();
        receiveCouchPort.receive((var message, SendPort notUsedHere) {
          debugPrint("/getCodeViewer receiveCouchPort.message = ${message}");
          receiveCouchPort.close();
          
          List codeViewerDocuments = [];
          final receiveDocCouchPort = new ReceivePort();
          receiveDocCouchPort.receive((var mm, SendPort _) {
            debugPrint("/getCode receiveCouchPort.message = ${mm}");
            
            codeViewerDocuments.add(mm);
       
            if (JSON.parse(message)["rows"].length == codeViewerDocuments.length || codeViewerDocuments.length == limit) {
              receiveDocCouchPort.close();
              _sendJSONResponse(response,{'documents':codeViewerDocuments});
            }
          });

          new CouchIsolate().spawn().then((SendPort sp) {
            int i = limit;
            if (i!=0) {
              JSON.parse(message)["rows"].forEach((var doc) {
                Map m = {'command':'getCode', 'dbName':'codedb' ,'docId':doc["id"]};
                sp.send(m, receiveDocCouchPort.toSendPort());   
                
              });
            }
            i--;
          });  
        });
        
        // Call our couch isolate
        new CouchIsolate().spawn().then((SendPort sp) {
          Map m = {'command':'getCodeViewer', 'dbName':'codedb'};
          sp.send(m, receiveCouchPort.toSendPort());
        }); 
        
      };
    });
    
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
          var d = new Date.now();
          Map m = {'command':'saveCode', 'dbName':'codedb' ,'code':requestData["code"], 'date':d.toString()};
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

