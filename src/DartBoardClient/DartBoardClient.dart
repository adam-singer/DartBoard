#import('dart:html');
#import('dart:json');
#import("../../third_party/uri/uri.dart");
#import("../../third_party/utils/dartdoc/classify.dart", prefix:"classify");
#source('CodeMirrorImpl.dart');
#source('debug.dart');
class DartBoardClient {
  CodeMirrorImpl codeMirror;
  
  DartBoardClient() {
  }

  //int scrollWidth=400;
  //int scrollHeight=400;
  void run() {
    codeMirror = new CodeMirrorImpl();
    document.window.on.resize.add((_) => codeMirror.viewResizeHandler(document));
    Element root = codeMirror.getMirror();
    document.body.nodes.add(root);
    codeMirror.viewResizeHandler(document);
    
    Map queryArguments = {};
    Uri uri;
    try { 
      debugPrint('href = ' + document.window.location.href);
      uri = new Uri.fromString(document.window.location.href);
      debugPrint('query = ${uri.query}');
      
      uri.query.split('&').forEach((String s) {
        List arg = s.split('=');
        if (arg.length == 2 && !arg[0].isEmpty()) {
          queryArguments[arg[0]] = arg[1];
        }
      });
      
      
      debugPrintMethod( () {
        queryArguments.forEach((var k, var v) {
          print('k=${k},v=${v}');
        });
      });
    } catch (Exception ex) {
      print('url parse exception: '+ex.toString());
    }
    
    if (queryArguments.containsKey('docId')) {
      // If we have docId then try and fetch from server. 
      sendRequest("/getCode?docId=${queryArguments['docId']}", {}, (Map response){
        debugPrintMethod( () { 
          debugPrint("/getCode");
          response.forEach((var k, var v) {
            print('k=${k},v=${v}');
          });
        });
        
        //codeMirror.textarea.value = response['code'];
        //codeMirror.keyboardHandler(null);
        codeMirror.loadText(response['code']);
      }, ()=>debugPrint("message failed"));
    }
    
    codeMirror.button.on.click.add((var event) {
      print("click submit button");
      
      //print("editorBuffer = ${t.value}");
      // Send over xml request
      var messageRequest = {"code":codeMirror.textarea.value};
      sendRequest("/dartExec", messageRequest,
        (Map response) {
         //print("on success");   
         debugPrint(response["console"]);
         ParagraphElement p = document.query('#console');
         
         StringBuffer sb = new StringBuffer();
         response["console"].split('\n').forEach((var cs){ 
           sb.add(cs + '<br>');
         });
         //p.innerHTML = response["console"];
         p.innerHTML = '<pre>' + sb.toString() + '</pre>';
         
         // print debug 
         response.forEach((var k, var v) {
           print('k=${k},v=${v}');
         });
         p.innerHTML = p.innerHTML + '<br/>'; 
         String codeUri = uri.path + "?docId=" + JSON.parse(response['url'])['id'];
         codeMirror.updateCodeLink(codeUri);
         //var a = new Element.html('<a href="${codeUri}">Code</a>');
         //p.nodes.add(a);
         //+ uri.path + "?docId=" + JSON.parse(response['url'])['id'];
        }, 
        () {
          debugPrint("message failed");
      });
    });
  }

  XMLHttpRequest sendRequest(String url, var data, var onSuccess, var onError) {
    XMLHttpRequest request = new XMLHttpRequest();
    request.on.readyStateChange.add((Event event) {
      if (request.readyState != 4) return;
      if (request.status == 200) {
        onSuccess(JSON.parse(request.responseText));
      } else {
        onError();
      }
    });
    
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    debugPrint('sendRequest '+ url+ " " + JSON.stringify(data));
    request.send(JSON.stringify(data));   
    return request;
  }
  
  
}

void main() {
  new DartBoardClient().run();
}
