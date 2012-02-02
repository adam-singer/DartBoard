#import('DartBoardServerLib.dart');

final DEFAULT_PORT = 8888;
final DEFAULT_HOST = "127.0.0.1";

main() {
  debugPrint("Starting Server");
  ServerMain serverMain = new ServerMain.start(new DartBoardServer(), DEFAULT_HOST, DEFAULT_PORT);
  debugPrint("Exiting Server");
}
