#import('../../src/DartBoardServer/CouchDBWrapperImpl.dart');

void main() {
  CouchDBWrapperImpl cdb = new CouchDBWrapperImpl();
  cdb.listDb();
  
  print("Hello World");
  while(true);
}
