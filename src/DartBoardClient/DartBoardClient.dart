#import('dart:html');
#import('dart:json');
class DartBoardClient {

  DartBoardClient() {
  }

  void run() {
    
    document.query('#submitButton').on.click.add((var event) {
      print("click submit button");
      TextAreaElement t = document.query('#editorBuffer');
      //print("editorBuffer = ${t.value}");
      // Send over xml request
      var messageRequest = {"code":t.value};
      sendRequest("/dartExec", messageRequest,
        (Map response) {
         print("on success");   
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
