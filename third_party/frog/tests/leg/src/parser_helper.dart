// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#library('parser_helper');

#import("../../../../lib/uri/uri.dart");

#import("../../../leg/elements/elements.dart");
#import("../../../leg/tree/tree.dart");
#import('../../../leg/scanner/scannerlib.dart');
#import("../../../leg/leg.dart");
#import("../../../leg/util/util.dart");

class LoggerCanceler implements DiagnosticListener {
  void cancel([String reason, node, token, instruction]) {
    throw new CompilerCancelledException(reason);
  }

  void log(message) {
    print(message);
  }
}

Token scan(String text) => new StringScanner(text).tokenize();

Node parseBodyCode(String text, Function parseMethod) {
  Token tokens = scan(text);
  LoggerCanceler lc = new LoggerCanceler();
  NodeListener listener = new NodeListener(lc);
  Parser parser = new Parser(listener);
  Token endToken = parseMethod(parser, tokens);
  assert(endToken.kind == EOF_TOKEN);
  Node node = listener.popNode();
  Expect.isNotNull(node);
  Expect.isTrue(listener.nodes.isEmpty(), 'Not empty: ${listener.nodes}');
  return node;
}

Node parseStatement(String text) =>
  parseBodyCode(text, (parser, tokens) => parser.parseStatement(tokens));

Node parseFunction(String text, Compiler compiler) {
  Element element = parseUnit(text, compiler, compiler.mainApp).head;
  Expect.isNotNull(element);
  Expect.equals(ElementKind.FUNCTION, element.kind);
  return element.parseNode(compiler);
}

class MockFile {
  final filename = '<string>';
  final text;
  MockFile(this.text);
}

Link<Element> parseUnit(String text, Compiler compiler,
                        LibraryElement library) {
  Token tokens = scan(text);
  Uri uri = new Uri(scheme: "source");
  var script = new Script(uri, new MockFile(text));
  var unit = new CompilationUnitElement(script, library);
  ElementListener listener = new ElementListener(compiler, unit);
  PartialParser parser = new PartialParser(listener);
  compiler.withCurrentElement(unit, () => parser.parseUnit(tokens));
  return unit.topLevelElements;
}

// TODO(ahe): We define this method to avoid having to import
// the scanner in the tests. We should move SourceString to another
// location instead.
SourceString buildSourceString(String name) {
  return new SourceString(name);
}
