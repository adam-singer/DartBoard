
/*
main() {
  var p = [
           """
main() {
  print('hello world');
}
""",

"""
main() {
  print('good bye world');
}
""",

"""
main() {
  print('Error world')
}
"""
];
  
  final receivePort = new ReceivePort();
  receivePort.receive((var message, SendPort notUsedHere) {
    print("Received message:");
    print("console = ${message['console']}");
    print("error = ${message['error']}");
    //receivePort.close();
  });


  p.forEach((var c) {
    new ExeIsolate().spawn().then((SendPort sendPort) {
      sendPort.send(c, receivePort.toSendPort());
    });
  });
}
*/

class ExeIsolate extends Isolate {
  ExeIsolate() : super.heavy() {
    
  }
  
void main() {
  port.receive((String code, SendPort replyTo) {
  
  var dir = CreateDirectory();
  File file = CreateDartFile(code, dir);
  print(file);
  ExecuteFile(file, (var m) {
    debugPrint("console output = ");
    debugPrint("${m['console']}");
    CleanUp(file,dir);
    debugPrint("files cleaned");
    replyTo.send(m);//send message back from isolate exeuction
  });
  
  });
}

CleanUp(f,d) {
  debugPrint("enter CleanUp");
  // delete file
  f.delete();
  f.deleteHandler = () {
    debugPrint("successful dir delete");
  };
  f.errorHandler = (e) {
    debugPrint("error: ${e}");
  };
  
  // delete directory
  d.delete();
  d.deleteHandler = () {
    debugPrint("successful dir delete");
  };
  d.errorHandler = (e) {
    debugPrint("error: ${e}");
  };
}

CreateDirectory() {
  Directory d = new Directory(BUILDPATH);
  debugPrint(" d: d.path = ${d.path}");
  d.createTempSync();
  debugPrint("d.createTempSync(): d.path = ${d.path}");
  return d;
}

CreateDartFile(var source, var directory) {
  String fullname = "${directory.path}${PATHSEP}main.dart";
  debugPrint("fullname = ${fullname}");
  File f = new File(fullname);
  
  f.errorHandler = (e) {
    debugPrint("error: ${e}");
  };
  
  f.createHandler = () {
    debugPrint("file created");
  };
  
  f.createSync();
  RandomAccessFile r = f.openSync(FileMode.WRITE);
  int len = r.writeStringSync(source);
  r.closeSync();
  debugPrint("len = ${len}");
  debugPrint("source.length = ${source.length}");
  if (len != source.length) {
    throw new Exception("create file failed: len != source.length");
  }
  
  return f;
}
// file and return object. results will be returned by f
// TODO: make example of different between error and non error
ExecuteFile(var file, f(s)) {
  debugPrint("entering ExecuteFile (${file}, ${f})");
  debugPrint("Process.start(${DARTCOMMAND}, [${file.fullPathSync()}]);");
  Process p = new Process.start(DARTCOMMAND, ["${file.fullPathSync()}"]);
  Map results = {};
  
  p.startHandler = () {
    debugPrint("process started: " + p.toString());
  };
  
  StringBuffer sb = new StringBuffer();
  p.stdout.dataHandler = () {
    while(p.stdout.available() != 0) {
      sb.add(new String.fromCharCodes(p.stdout.read()));
    }
  };
  
  p.stderr.dataHandler = () {
    while(p.stderr.available() != 0) {
      sb.add(new String.fromCharCodes(p.stderr.read()));
    }
  };
  
  p.errorHandler = (ProcessException error) {
    debugPrint("error");
    results["error"] = error.toString();
    print("${error.toString()}");
  };
  
  p.exitHandler = (var exitCode) {
    p.close();
    results["console"] = sb.toString();
    f(results);
  };
  
}

}

class DartExec {

}
