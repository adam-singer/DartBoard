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
    port.receive((String _, SendPort replyTo) {
      debugPrint("Entering CouchIsolate");
      HTTPClient h = new HTTPClient();
      h.open('GET', "127.0.0.1", 5984, "/_all_dbs");
      h.openHandler = (HTTPClientRequest r) {
        
        debugPrint("CouchIsolate open handler called");
        r.setHeader('Accept', 'application/json');
        r.responseReceived = (HTTPClientResponse rr) {
          rr.dataReceived = (List<int> data) {
            debugPrint("CouchIsolate= " + data.length);
            String s = new String.fromCharCodes(data);
            debugPrint("CouchIsolate= " + s);
            //return s;
            replyTo.send(s);
          };
        };
        
        r.writeDone();
      };
    });
  }
}

class CouchDBWrapperImpl {
  bool DEBUG=true;
  String baseUri = '';
  String host = '127.0.0.1';
  int port = 5984;
  
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
  
  HTTPClient connect() {    
    var _xmlHttpRequest = new HTTPClient();
    //_xmlHttpRequest.on.error.add((var event) {
    //   _print('on error: '+event);
    //});
    //_xmlHttpRequest.on.abort.add((var event) {
    //  _print('on abort: '+event);
    //});
    _xmlHttpRequest.errorHandler = (int status) {
      print('on error: ${status}');
    };
    
    return _xmlHttpRequest;
  }
  
  
  // Basic http methods
  getHttp(var uri) {
    
    HTTPClient c = connect(); 
     
    _print('GET ' + host + ":" + port + uri);
    c.open('GET', host, port, uri);
    
    c.openHandler = (HTTPClientRequest request) {
      _print("open handler called");
      request.setHeader('Accept', 'application/json');
      request.responseReceived = (HTTPClientResponse response) {
        response.dataReceived = (List<int> data) {
          _print(data.length);
          String s = new String.fromCharCodes(data);
          _print(s);
          //return s;
        };
      };
    };
    
    return "";

//    c.open('GET', uri, false);
//    c.setRequestHeader('Accept', 'application/json');
//    c.send();
//    return c.responseText;
  }
  
  postHttp(var uri, var body) {
    HTTPClient c = connect();
//    c.open('POST', uri, false);
//    c.setRequestHeader('Content-type', 'application/json');
//    c.send(body);
//    return c.responseText;
  }
  
  putHttp(var uri, [var body]) {
    HTTPClient c = connect();
//    c.open('PUT', uri, false);
//    if (body is String && body.length > 0) {
//      c.setRequestHeader('Content-type', 'application/json');
//      c.send(body);
//    } else {
//      c.send();
//    }
//    
//    return c.responseText;
  }
  
  deleteHttp(var uri) {
    HTTPClient c = connect();
//    c.open('DELETE', uri, false);
//    c.send();
//    return c.responseText;
  }
}
