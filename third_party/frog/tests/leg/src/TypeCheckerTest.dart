// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#import("../../../leg/leg.dart");
#import("../../../leg/elements/elements.dart");
#import("../../../leg/tree/tree.dart");
#import('../../../leg/scanner/scannerlib.dart');
#import("../../../leg/util/util.dart");
#import("mock_compiler.dart");
#import("parser_helper.dart");

Type intType;
Type boolType;
Type stringType;
Type doubleType;
Type objectType;

main() {
  List tests = [testSimpleTypes,
                testReturn,
                testFor,
                testWhile,
                testOperators,
                testMethodInvocationArgumentCount,
                testMethodInvocations,
                testControlFlow,
                // testNewExpression,
                testConditionalExpression,
                testIfStatement,
                testThis];
  for (Function test in tests) {
    setup();
    test();
  }
}

testSimpleTypes() {
  Expect.equals(intType, analyzeType("3"));
  Expect.equals(boolType, analyzeType("false"));
  Expect.equals(boolType, analyzeType("true"));
  Expect.equals(stringType, analyzeType("'hestfisk'"));
}

testReturn() {
  analyzeTopLevel("void foo() { return 3; }", MessageKind.RETURN_VALUE_IN_VOID);
  analyzeTopLevel("int bar() { return 'hest'; }", MessageKind.NOT_ASSIGNABLE);
  analyzeTopLevel("void baz() { var x; return x; }");
  analyzeTopLevel(returnWithType("int", "'string'"),
                  MessageKind.NOT_ASSIGNABLE);
  analyzeTopLevel(returnWithType("", "'string'"));
  analyzeTopLevel(returnWithType("Object", "'string'"));
  analyzeTopLevel(returnWithType("String", "'string'"));
  analyzeTopLevel(returnWithType("String", null));
  analyzeTopLevel(returnWithType("int", null));
  analyzeTopLevel(returnWithType("void", ""));
  analyzeTopLevel(returnWithType("void", 1), MessageKind.RETURN_VALUE_IN_VOID);
  analyzeTopLevel(returnWithType("void", null));
  analyzeTopLevel(returnWithType("String", ""), MessageKind.RETURN_NOTHING);
  // analyzeTopLevel("String foo() {};"); // Should probably fail.
}

testFor() {
  analyze("for (var x;true;x = x + 1) {}");
  analyze("for (var x;null;x = x + 1) {}");
  analyze("for (var x;0;x = x + 1) {}", MessageKind.NOT_ASSIGNABLE);
  analyze("for (var x;'';x = x + 1) {}", MessageKind.NOT_ASSIGNABLE);

   analyze("for (;true;) {}");
   analyze("for (;null;) {}");
   analyze("for (;0;) {}", MessageKind.NOT_ASSIGNABLE);
   analyze("for (;'';) {}", MessageKind.NOT_ASSIGNABLE);

  // Foreach tests
//  TODO(karlklose): for each is not yet implemented.
//  analyze("{ List<String> strings = ['1','2','3']; " +
//          "for (String s in strings) {} }");
//  analyze("{ List<int> ints = [1,2,3]; for (String s in ints) {} }",
//          MessageKind.NOT_ASSIGNABLE);
//  analyze("for (String s in true) {}", MessageKind.METHOD_NOT_FOUND);
}

testWhile() {
  analyze("while (true) {}");
  analyze("while (null) {}");
  analyze("while (0) {}", MessageKind.NOT_ASSIGNABLE);
  analyze("while ('') {}", MessageKind.NOT_ASSIGNABLE);

  analyze("do {} while (true);");
  analyze("do {} while (null);");
  analyze("do {} while (0);", MessageKind.NOT_ASSIGNABLE);
  analyze("do {} while ('');", MessageKind.NOT_ASSIGNABLE);
  analyze("do { int i = 0.5; } while (true);", MessageKind.NOT_ASSIGNABLE);
  analyze("do { int i = 0.5; } while (null);", MessageKind.NOT_ASSIGNABLE);
}

testOperators() {
  // TODO(karlklose): add the DartC tests for operators when we can parse
  // classes with operators.
  for (final op in ['+', '-', '*', '/', '%', '~/', '|', '&']) {
    analyze("{ var i = 1 ${op} 2; }");
    analyze("{ var i = 1; i ${op}= 2; }");
    analyze("{ int i; var j = (i = true) ${op} 2; }",
            MessageKind.NOT_ASSIGNABLE);
    analyze("{ int i; var j = 1 ${op} (i = true); }",
            MessageKind.NOT_ASSIGNABLE);
  }
  for (final op in ['-', '~']) {
    analyze("{ var i = ${op}1; }");
    analyze("{ int i; var j = ${op}(i = true); }", MessageKind.NOT_ASSIGNABLE);
  }
  for (final op in ['++', '--']) {
    analyze("{ int i = 1; int j = i${op}; }");
    analyze("{ int i = 1; bool j = i${op}; }", MessageKind.NOT_ASSIGNABLE);
    analyze("{ bool b = true; bool j = b${op}; }");
    analyze("{ bool b = true; int j = ${op}b; }");
  }
  for (final op in ['||', '&&']) {
    analyze("{ bool b = (true ${op} false); }");
    analyze("{ int b = true ${op} false; }", MessageKind.NOT_ASSIGNABLE);
    analyze("{ bool b = (1 ${op} false); }", MessageKind.NOT_ASSIGNABLE);
    analyze("{ bool b = (true ${op} 2); }", MessageKind.NOT_ASSIGNABLE);
  }
  for (final op in ['>', '<', '<=', '>=', '==', '!=', '===', '!==']) {
    analyze("{ bool b = 1 ${op} 2; }");
    analyze("{ int i = 1 ${op} 2; }", MessageKind.NOT_ASSIGNABLE);
    analyze("{ int i; bool b = (i = true) ${op} 2; }",
            MessageKind.NOT_ASSIGNABLE);
    analyze("{ int i; bool b = 1 ${op} (i = true); }",
            MessageKind.NOT_ASSIGNABLE);
  }
}

void testMethodInvocationArgumentCount() {
  compiler.parseScript(CLASS_WITH_METHODS);
  final String header = "{ ClassWithMethods c; ";
  analyze(header + "c.untypedNoArgumentMethod(1); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  analyze(header + "c.untypedOneArgumentMethod(); }",
          MessageKind.MISSING_ARGUMENT);
  analyze(header + "c.untypedOneArgumentMethod(1, 1); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  analyze(header + "c.untypedTwoArgumentMethod(); }",
          MessageKind.MISSING_ARGUMENT);
  analyze(header + "c.untypedTwoArgumentMethod(1, 2, 3); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  analyze(header + "c.intNoArgumentMethod(1); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  analyze(header + "c.intOneArgumentMethod(); }",
          MessageKind.MISSING_ARGUMENT);
  analyze(header + "c.intOneArgumentMethod(1, 1); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  analyze(header + "c.intTwoArgumentMethod(); }",
          MessageKind.MISSING_ARGUMENT);
  analyze(header + "c.intTwoArgumentMethod(1, 2, 3); }",
          MessageKind.ADDITIONAL_ARGUMENT);
  // analyze(header + "c.untypedField(); }");
}

void testMethodInvocations() {
  compiler.parseScript(CLASS_WITH_METHODS);
  final String header = "{ ClassWithMethods c; int i; int j; ";

  analyze(header + "int k = c.untypedNoArgumentMethod(); }");
  analyze(header + "ClassWithMethods x = c.untypedNoArgumentMethod(); }");

  analyze(header + "int k = c.untypedOneArgumentMethod(c); }");
  analyze(header + "ClassWithMethods x = c.untypedOneArgumentMethod(1); }");
  analyze(header + "int k = c.untypedOneArgumentMethod('string'); }");
  analyze(header + "int k = c.untypedOneArgumentMethod(i); }");

  analyze(header + "int k = c.untypedTwoArgumentMethod(1, 'string'); }");
  analyze(header + "int k = c.untypedTwoArgumentMethod(i, j); }");
  analyze(header + "ClassWithMethods x = c.untypedTwoArgumentMethod(i, c); }");

  analyze(header + "int k = c.intNoArgumentMethod(); }");
  analyze(header + "ClassWithMethods x = c.intNoArgumentMethod(); }",
          MessageKind.NOT_ASSIGNABLE);

  analyze(header + "int k = c.intOneArgumentMethod(c); }",
          MessageKind.NOT_ASSIGNABLE);
  analyze(header + "ClassWithMethods x = c.intOneArgumentMethod(1); }",
          MessageKind.NOT_ASSIGNABLE);
  analyze(header + "int k = c.intOneArgumentMethod('string'); }",
          MessageKind.NOT_ASSIGNABLE);
  analyze(header + "int k = c.intOneArgumentMethod(i); }");

  analyze(header + "int k = c.intTwoArgumentMethod(1, 'string'); }",
          MessageKind.NOT_ASSIGNABLE);
  analyze(header + "int k = c.intTwoArgumentMethod(i, j); }");
  analyze(header + "ClassWithMethods x = c.intTwoArgumentMethod(i, j); }",
          MessageKind.NOT_ASSIGNABLE);
}

/** Tests analysis of returns (not required by the specification). */
void testControlFlow() {
  analyzeTopLevel("int foo() { if (true) { return 1; } }",
                  MessageKind.MAYBE_MISSING_RETURN);
  final bar =
      """void bar() {
        if (true) {
          if (true) { return; } else { return; }
        } else { return; }
      }""";
  analyzeTopLevel(bar);
  analyzeTopLevel("void baz() { return; int i = 1; }",
                  MessageKind.UNREACHABLE_CODE);
  final qux =
      """void qux() {
        if (true) {
          return;
        } else if (true) {
          if (true) {
            return;
          }
          throw 'hest';
        }
        throw 'fisk';
      }""";
  analyzeTopLevel(qux);
  analyzeTopLevel("int hest() {}", MessageKind.MISSING_RETURN);
  final fisk = """int fisk() {
                    if (true) {
                      if (true) { return 1; } else {}
                    } else { return 1; }
                  }""";
  analyzeTopLevel(fisk, MessageKind.MAYBE_MISSING_RETURN);
}

testNewExpression() {
  compiler.parseScript("class A {}");
  analyze("A a = new A();");
  analyze("int i = new A();", MessageKind.NOT_ASSIGNABLE);

// TODO(karlklose): constructors are not yet implemented.
//  compiler.parseScript(
//    "class Foo {\n" +
//    "  Foo(int x) {}\n" +
//    "  Foo.foo() {}\n" +
//    "  Foo.bar([int i = null]) {}\n" +
//    "}\n" +
//    "interface Bar<T> factory Baz {\n" +
//    "  Bar.make();\n" +
//    "}\n" +
//    "class Baz {\n" +
//    "  factory Bar<S>.make(S x) { return null; }\n" +
//    "}");
//
//  analyze("Foo x = new Foo(0);");
//  analyze("Foo x = new Foo();", MessageKind.MISSING_ARGUMENT);
//  analyze("Foo x = new Foo('');", MessageKind.NOT_ASSIGNABLE);
//  analyze("Foo x = new Foo(0, null);", MessageKind.ADDITIONAL_ARGUMENT);
//
//  analyze("Foo x = new Foo.foo();");
//  analyze("Foo x = new Foo.foo(null);", MessageKind.ADDITIONAL_ARGUMENT);
//
//  analyze("Foo x = new Foo.bar();");
//  analyze("Foo x = new Foo.bar(0);");
//  analyze("Foo x = new Foo.bar('');", MessageKind.NOT_ASSIGNABLE);
//  analyze("Foo x = new Foo.bar(0, null);",
//          MessageKind.ADDITIONAL_ARGUMENT);
//
//  analyze("Bar<String> x = new Bar<String>.make('');");
}

testConditionalExpression() {
  analyze("int i = true ? 2 : 1;");
  analyze("int i = true ? 'hest' : 1;");
  analyze("int i = true ? 'hest' : 'fisk';", MessageKind.NOT_ASSIGNABLE);
  analyze("String s = true ? 'hest' : 'fisk';");

  analyze("true ? 1 : 2;");
  analyze("null ? 1 : 2;");
  analyze("0 ? 1 : 2;", MessageKind.NOT_ASSIGNABLE);
  analyze("'' ? 1 : 2;", MessageKind.NOT_ASSIGNABLE);
  analyze("{ int i; true ? i = 2.7 : 2; }",
          MessageKind.NOT_ASSIGNABLE);
  analyze("{ int i; true ? 2 : i = 2.7; }",
          MessageKind.NOT_ASSIGNABLE);
  analyze("{ int i; i = true ? 2.7 : 2; }");
}

testIfStatement() {
  analyze("if (true) {}");
  analyze("if (null) {}");
  analyze("if (0) {}",
  MessageKind.NOT_ASSIGNABLE);
  analyze("if ('') {}",
          MessageKind.NOT_ASSIGNABLE);
  analyze("{ int i = 27; if (true) { i = 2.7; } else {} }",
          MessageKind.NOT_ASSIGNABLE);
  analyze("{ int i = 27; if (true) {} else { i = 2.7; } }",
          MessageKind.NOT_ASSIGNABLE);
}

testThis() {
  String script = "class Foo {}";
  LibraryElement library = mockLibrary(compiler, script);
  compiler.parseScript(script, library);
  ClassElement foo = library.find(const SourceString("Foo"));
  analyzeIn(foo, "{ int i = this; }", MessageKind.NOT_ASSIGNABLE);
  analyzeIn(foo, "{ Object o = this; }");
  analyzeIn(foo, "{ Foo f = this; }");
}

final CLASS_WITH_METHODS = '''
class ClassWithMethods {
  untypedNoArgumentMethod() {}
  untypedOneArgumentMethod(argument) {}
  untypedTwoArgumentMethod(argument1, argument2) {}

  int intNoArgumentMethod() {}
  int intOneArgumentMethod(int argument) {}
  int intTwoArgumentMethod(int argument1, int argument2) {}

  Function functionField;
  var untypedField;
  int intField;
}''';

Types types;
MockCompiler compiler;

String returnWithType(String type, expression) {
  return "$type foo() { return $expression; }";
}

Node parseExpression(String text) =>
  parseBodyCode(text, (parser, token) => parser.parseExpression(token));

void setup() {
  compiler = new MockCompiler();
  types = compiler.types;
  intType = lookupType(Types.INT, compiler, types);
  doubleType = lookupType(Types.DOUBLE, compiler, types);
  boolType = lookupType(Types.BOOL, compiler, types);
  stringType = lookupType(Types.STRING, compiler, types);
  objectType = lookupType(Types.OBJECT, compiler, types);
}

Type analyzeType(String text) {
  var node = parseExpression(text);
  TypeCheckerVisitor visitor =
      new TypeCheckerVisitor(compiler, new TreeElementMapping(), types);
  return visitor.analyze(node);
}

analyzeTopLevel(String text, [expectedWarnings]) {
  if (expectedWarnings === null) expectedWarnings = [];
  if (expectedWarnings is !List) expectedWarnings = [expectedWarnings];

  LibraryElement library = mockLibrary(compiler, text);

  Link<Element> topLevelElements = parseUnit(text, compiler, library);

  for (Link<Element> elements = topLevelElements;
       !elements.isEmpty();
       elements = elements.tail) {
    Node node = elements.head.parseNode(compiler);
    TreeElements mapping = compiler.resolver.resolve(elements.head);
    TypeCheckerVisitor checker =
        new TypeCheckerVisitor(compiler, mapping, types);
    compiler.clearWarnings();
    checker.analyze(node);
    compareWarningKinds(text, expectedWarnings, compiler.warnings);
  }
}

analyze(String text, [expectedWarnings]) {
  if (expectedWarnings === null) expectedWarnings = [];
  if (expectedWarnings is !List) expectedWarnings = [expectedWarnings];

  Token tokens = scan(text);
  NodeListener listener = new NodeListener(compiler);
  Parser parser = new Parser(listener);
  parser.parseStatement(tokens);
  Node node = listener.popNode();
  TreeElements elements = compiler.resolveNodeStatement(node, compiler.mainApp);
  TypeCheckerVisitor checker = new TypeCheckerVisitor(compiler, elements,
                                                                types);
  compiler.clearWarnings();
  checker.analyze(node);
  compareWarningKinds(text, expectedWarnings, compiler.warnings);
}

analyzeIn(ClassElement classElement, String text, [expectedWarnings]) {
  if (expectedWarnings === null) expectedWarnings = [];
  if (expectedWarnings is !List) expectedWarnings = [expectedWarnings];

  Token tokens = scan(text);
  NodeListener listener = new NodeListener(compiler);
  Parser parser = new Parser(listener);
  parser.parseStatement(tokens);
  Node node = listener.popNode();
  TreeElements elements = compiler.resolveNodeStatement(node, classElement);
  TypeCheckerVisitor checker = new TypeCheckerVisitor(compiler, elements,
                                                                types);
  compiler.clearWarnings();
  checker.currentClass = classElement;
  checker.analyze(node);
  compareWarningKinds(text, expectedWarnings, compiler.warnings);
}
