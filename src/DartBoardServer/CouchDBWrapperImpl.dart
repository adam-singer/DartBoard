class CouchDBWrapperImpl {
  bool DEBUG=false;
  String baseUri = '/couchdb';
  
  
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
  
  XMLHttpRequest connect() {    
    var _xmlHttpRequest = new XMLHttpRequest();
    _xmlHttpRequest.on.error.add((var event) {
      _print('on error: '+event);
    });
    _xmlHttpRequest.on.abort.add((var event) {
      _print('on abort: '+event);
    });
    
    return _xmlHttpRequest;
  }
  
  
  // Basic http methods
  getHttp(var uri) {
    XMLHttpRequest c = connect(); 
    c.open('GET', uri, false);
    c.setRequestHeader('Accept', 'application/json');
    c.send();
    return c.responseText;
  }
  
  postHttp(var uri, var body) {
    XMLHttpRequest c = connect();
    c.open('POST', uri, false);
    c.setRequestHeader('Content-type', 'application/json');
    c.send(body);
    return c.responseText;
  }
  
  putHttp(var uri, [var body]) {
    XMLHttpRequest c = connect();
    c.open('PUT', uri, false);
    if (body is String && body.length > 0) {
      c.setRequestHeader('Content-type', 'application/json');
      c.send(body);
    } else {
      c.send();
    }
    
    return c.responseText;
  }
  
  deleteHttp(var uri) {
    XMLHttpRequest c = connect();
    c.open('DELETE', uri, false);
    c.send();
    return c.responseText;
  }
}
