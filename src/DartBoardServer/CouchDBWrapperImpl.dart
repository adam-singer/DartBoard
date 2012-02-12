//#library('CouchDB');
//#import("dart:io");
//#import("../../third_party/HttpServer/http.dart");
//#import('dart:html');
// Use HTTPClient from http server lib

// CouchIsolate is neat, blog this/add to presentation. 
class CouchIsolate extends Isolate {
  CouchIsolate() : super.light() {
    
  }
  
  void main() {
    port.receive((Map message, SendPort replyTo) {
      debugPrint("Entering CouchIsolate");
      CouchDBWrapperImpl couch = new CouchDBWrapperImpl(replyTo);
      
      
      if (message['command']=='createDatabase') {
        couch.createDb(message['dbName']);
      } else if (message['command']=='saveCode') {
        //TODO: json what we want not the whole message
        couch.saveDoc(message['dbName'], JSON.stringify(message));
      } else if (message['command']=='getCode') {
        couch.openDoc(message['dbName'], message['docId']);
      } else if (message['command']=='getCodeList') {
        
      }
      
      /*
      if (message=='createDatabase') {
        couch.createDb('codeDb');
      } else if (message=='saveCode') {
        
      } else if (message=='getCode') {
        
      } else if (message=='') {
        
      }
      */
      
    });
  }
}

class CouchDBWrapperImpl {
  bool DEBUG;
  String baseUri = '';
  String host;
  int port;
  SendPort replyTo;
  
  CouchDBWrapperImpl(SendPort this.replyTo, [String this.host='127.0.0.1', int this.port=5984, bool this.DEBUG=true]) { }
  
  _print(var d) {
    if (DEBUG) {
      print(d);
    }
  }
  
  // database operations
  createDb(var dbName) {
    var s = putHttp('${baseUri}/${dbName}/');
    _print(s);
    return s;
  }
  
  deleteDb(var dbName) {
    var s = deleteHttp('${baseUri}/${dbName}/');
    _print(s);
    return s;
  }
  
  
  listDb() {
    var s = getHttp('${baseUri}/_all_dbs');
    _print(s);
    return s;
  }
  
  infoDb(var dbName) {
    var s = getHttp('${baseUri}/${dbName}');
    _print(s);
    return s;
  }
  
  // document operations 
  listDoc(var dbName) {
    var s = getHttp('${baseUri}/${dbName}/_all_docs');
    _print(s);
    return s;
  }
  
  openDoc(var dbName, var docId) {
    var s = getHttp('${baseUri}/${dbName}/${docId}');
    _print(s);
    return s;
  }
  
  saveDoc(var dbName, var body, [var docId]) {
    if (docId is String) {
      // Save body to docid
      var s = putHttp('${baseUri}/${dbName}/${docId}', body);
      _print(s);
      return s;
    } else {
      var s = postHttp('${baseUri}/${dbName}', body);
      _print(s);
      return s;
    }
  }
  
  deleteDoc(var dbName, var docId, [var rev_id]) {
    var s = deleteHttp('${baseUri}/${dbName}/${docId}?rev=${rev_id}');
    _print(s);
    return s;
  }
    
  // Basic http methods
  getHttp(var uri) {
    HTTPClient h = new HTTPClient();
    h.open('GET', host, port, uri);
    h.openHandler = (HTTPClientRequest request) {
      request.setHeader('Accept', 'application/json');
      request.responseReceived = (HTTPClientResponse response) {
        response.dataReceived = (List<int> data) {
          String s = new String.fromCharCodes(data);          
          replyTo.send(s);
        };
      };
      request.writeDone();
    };
  }
  
  postHttp(var uri, var body) {
    HTTPClient h = new HTTPClient();
    h.open('POST', host, port, uri);
    h.openHandler = (HTTPClientRequest request) {
      request.setHeader('Content-type', 'application/json');
      
      request.responseReceived = (HTTPClientResponse response) {
        response.dataReceived = (List<int> data) {
          String s = new String.fromCharCodes(data);          
          replyTo.send(s);
        };
      };
      
      request.writeString(body, ()=>print('postHttp write'));
      request.writeDone();
    };
  }
  
  putHttp(var uri, [var body]) {
    HTTPClient h = new HTTPClient();
    h.open('PUT', host, port, uri);
    h.openHandler = (HTTPClientRequest request) {
      request.setHeader('Content-type', 'application/json');
      
      request.responseReceived = (HTTPClientResponse response) {
        response.dataReceived = (List<int> data) {
          String s = new String.fromCharCodes(data);          
          replyTo.send(s);
        };
      };
      
      if (body is String && body.length > 0) {
        request.writeString(body, ()=>print('postHttp write'));
      }
      
      request.writeDone();
    };
  }
  
  deleteHttp(var uri) {
    HTTPClient h = new HTTPClient();
    h.open('DELETE', host, port, uri);
    h.openHandler = (HTTPClientRequest request) {
      request.responseReceived = (HTTPClientResponse response) {
        response.dataReceived = (List<int> data) {
          String s = new String.fromCharCodes(data);          
          replyTo.send(s);
        };
      };
      request.writeDone();
    };
  }
}
