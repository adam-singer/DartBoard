bool DEBUG=true;
debugPrint(var p) {
  if (DEBUG) {
    print(p);
  }  
}

debugPrintMethod(f) {
  if (DEBUG) {
    f();
  }
}

