#import('dart:html');
#import('dart:json');

class DartBoardClient {

  DartBoardClient() {
  }

  int scrollWidth=400;
  int scrollHeight=400;
  void run() {
    DivElement view = document.query('#view');
    document.window.on.resize.add((var event) {
      document.rect.then((ElementRect rect) {
       view.style.left = "50%";
       view.style.top = "50%";
       //print("rect.client.height = ${rect.client.height}");
       //print("rect.client.width = ${rect.client.width}");
       view.style.marginLeft = ((rect.client.width-350)/2).toString() + "px";
      });
    });
    
    TextAreaElement textAreaElement = document.query('#editorBuffer');
    DivElement scrollContainer = document.query('#scroll-container');
    
    textAreaElement.on.mouseWheel.add((var mw) {
      if (mw != null) {
        print (mw.type);
      }  
    });
    
    textAreaElement.on.scroll.add((var sc) {
      if (sc != null) {
        print(sc.type);
       
        //print(sc.rect.scroll.top);
        //print(sc.x);
        //print(sc.y);
        
        textAreaElement.rect.then((ElementRect rect) {
          int scrollTop = rect.scroll.top;
          int left = rect.scroll.left;
          //print("scrollTop=${scrollTop}");
          //print("left=${left}");
          scrollContainer.style.top = -scrollTop;
          scrollContainer.style.left = -left;
        });
      }
      //print(textAreaElement.scroll);
      //int sl = textAreaElement.scrollLeft;
      //int st = textAreaElement.scrollTop;
      
      //print("textAreaElement.scrollTop=${st}");
      //print("textAreaElement.scrollLeft=${sl}");
    });
    
    //PreElement codeEl = document.query('#code');
    //print(codeEl.);
    TextAreaElement editorBuffer = document.query('#editorBuffer');
    //  editorBuffer.on.input.add((KeyboardEvent event) {
    //  print(event.type);
      //print(event.keyCode);
    //});
    editorBuffer.on.keyUp.add((KeyboardEvent event) {
      
      return;
      
      String s = new String.fromCharCodes([event.keyCode]);
      // careful of dartium, some events get fired twice. 
      print("event.keyCode = " + event.keyCode);
      print("event.keyIdentifier = " + event.keyIdentifier);
      print("event.keyCode.toString = " + s);
      print("event.keyLocation = " + event.keyLocation);
      print("selectionEnd = " + editorBuffer.selectionEnd);
      print("selectionStart = " + editorBuffer.selectionStart);
      print("=================");
      //editorBuffer.innerHTML = "";
      //editorBuffer.value = "";
      DivElement d = document.query('#editorBufferContainer');//.insertAdjacentText(text:editorBuffer.value);
      
      
      editorBuffer.rect.then((ElementRect rect) {
        
        int editorWidth = rect.client.width;
        int offsetWidth = rect.offset.width;
        scrollWidth = rect.scroll.width;
        scrollHeight = rect.scroll.height;
        //print("scrollWidth=${scrollWidth}");
        //print("offsetWidth=${offsetWidth}");
        //print("editorWidth=${editorWidth}");
        d.style.width=scrollWidth;
        d.style.height=scrollHeight;
        d.firstElementChild.style.height=scrollHeight;
      });
      
      /*
        set the style of the text area to transparent after data entered. 
       */
      
      StringBuffer sb = new StringBuffer();
      num i = 0;
      editorBuffer.value.split('\n').forEach((var _s) {
        sb.add("<div style='top:${i}; position: absolute;width:${scrollWidth};font-family: monospace; font-size: 15px;line-height: 1.2;  overflow:scroll;overflow-x: scroll;overflow-y: scroll;'><span>" + _s+ "</span></div>");
        //i+=17.5;
        i+=17;
      });
      
      //var textEl = new Element.html("<div>" + editorBuffer.value + "</div>");
      DivElement textEl = new Element.html("<div style='top:0;position: absolute;height:${scrollHeight};width:${scrollWidth};font-family: monospace; font-size: 15px;line-height: 1.2;overflow:scroll;overflow-x: scroll;overflow-y: scroll;'>" + sb.toString() + "</div>");
      d.nodes.forEach((var n) {
        n.remove();
      });
      
      
      d.nodes.add(textEl);
      
    });
    
    //editorBuffer.style.visibility = "hidden"; 
    
    
    document.query('#submitButton').on.click.add((var event) {
      print("click submit button");
      TextAreaElement t = document.query('#editorBuffer');

      
      //print("editorBuffer = ${t.value}");
      // Send over xml request
      var messageRequest = {"code":t.value};
      sendRequest("/dartExec", messageRequest,
        (Map response) {
         //print("on success");   
         print(response["console"]);
         ParagraphElement p = document.query('#results');
         p.innerHTML = response["console"];
        }, 
        () {
        print("message failed");
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
    print('sendRequest '+ url+ " " + JSON.stringify(data));
    request.send(JSON.stringify(data));   
    return request;
  }
  
}

void main() {
  new DartBoardClient().run();
}
