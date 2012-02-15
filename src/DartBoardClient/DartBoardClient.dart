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
    
    /*
    DivElement view = document.query('#view');
    document.window.on.resize.add((var event) {
      document.rect.then((ElementRect rect) {
       view.style.left = "50%";
       view.style.top = "50%";
       debugPrint("rect.client.height = ${rect.client.height}");
       debugPrint("rect.client.width = ${rect.client.width}");
       view.style.marginLeft = ((rect.client.width-350)/2).toString() + "px";
      });
    });
    */
    
    //TextAreaElement textAreaElement = document.query('#editorBuffer');
    
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
    
    ////DivElement scrollContainer = document.query('#scroll-container');
        
    /*
    textAreaElement.on.scroll.add((var sc) {
      if (sc != null) {
        textAreaElement.rect.then((ElementRect rect) {
          int scrollTop = rect.scroll.top;
          int left = rect.scroll.left;
          scrollContainer.style.top = -scrollTop;
          scrollContainer.style.left = -left;
        });
      }
    });
    */
    
    //TextAreaElement editorBuffer = document.query('#editorBuffer');
//    editorBuffer.on.keyUp.add((KeyboardEvent event) {
//      
//      return;
//      
//      String s = new String.fromCharCodes([event.keyCode]);
//      // careful of dartium, some events get fired twice. 
//      debugPrint("event.keyCode = " + event.keyCode);
//      debugPrint("event.keyIdentifier = " + event.keyIdentifier);
//      debugPrint("event.keyCode.toString = " + s);
//      debugPrint("event.keyLocation = " + event.keyLocation);
//      debugPrint("selectionEnd = " + editorBuffer.selectionEnd);
//      debugPrint("selectionStart = " + editorBuffer.selectionStart);
//      debugPrint("=================");
//      //editorBuffer.innerHTML = "";
//      //editorBuffer.value = "";
//      DivElement d = document.query('#editorBufferContainer');//.insertAdjacentText(text:editorBuffer.value);
//      
//      
//      editorBuffer.rect.then((ElementRect rect) {
//        
//        int editorWidth = rect.client.width;
//        int offsetWidth = rect.offset.width;
//        scrollWidth = rect.scroll.width;
//        scrollHeight = rect.scroll.height;
//        //print("scrollWidth=${scrollWidth}");
//        //print("offsetWidth=${offsetWidth}");
//        //print("editorWidth=${editorWidth}");
//        d.style.width=scrollWidth;
//        d.style.height=scrollHeight;
//        d.firstElementChild.style.height=scrollHeight;
//      });
//      
//      /*
//        set the style of the text area to transparent after data entered. 
//       */
//      
//      StringBuffer sb = new StringBuffer();
//      num i = 0;
//      editorBuffer.value.split('\n').forEach((var _s) {
//        sb.add("<div style='top:${i}; position: absolute;width:${scrollWidth};font-family: monospace; font-size: 15px;line-height: 1.2;  overflow:scroll;overflow-x: scroll;overflow-y: scroll;'><span>" + _s+ "</span></div>");
//        //i+=17.5;
//        i+=17;
//      });
//      
//      //var textEl = new Element.html("<div>" + editorBuffer.value + "</div>");
//      DivElement textEl = new Element.html("<div style='top:0;position: absolute;height:${scrollHeight};width:${scrollWidth};font-family: monospace; font-size: 15px;line-height: 1.2;overflow:scroll;overflow-x: scroll;overflow-y: scroll;'>" + sb.toString() + "</div>");
//      d.nodes.forEach((var n) {
//        n.remove();
//      });
//      
//      
//      d.nodes.add(textEl);
//      
//    });
    
    
    // document.query('#submitButton').on.click.add((var event) {
    codeMirror.button.on.click.add((var event) {
      print("click submit button");
      //TextAreaElement t = document.query('#editorBuffer');

      
      //print("editorBuffer = ${t.value}");
      // Send over xml request
      var messageRequest = {"code":codeMirror.textarea.value};
      sendRequest("/dartExec", messageRequest,
        (Map response) {
         //print("on success");   
         print(response["console"]);
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
         var a = new Element.html('<a href="${codeUri}">Code</a>');
         p.nodes.add(a);
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
