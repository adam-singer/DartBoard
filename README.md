Dart Board
==========

An example implementation of try.dartlang.org. This is still in the early stages. Thinking forward about doing some couchdb integration and maybe #tag cloud at a later time. 

Currently only works on mac and has few hard coded paths that need to be fixed.A modified DartVM needs to be compiled with the bin/ objects removed, they could be considered unsafe in this type of implementation. 


Run server:

    cd src/DartBoardServer/
    ../../third_party/dart-sdk/bin/dart ./DartBoardServer.dart

Run client:

    dartium http://127.0.0.1:8888/DartBoardClient.html

