// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class ClassElementParser extends PartialParser {
  ClassElementParser(Listener listener) : super(listener);

  Token parseClassBody(Token token) => fullParseClassBody(token);
}

class PartialClassElement extends ClassElement {
  final Token beginToken;
  final Token endToken;
  Node cachedNode;

  PartialClassElement(SourceString name,
                      Token this.beginToken,
                      Token this.endToken,
                      CompilationUnitElement enclosing)
    : super(name, enclosing);

  ClassNode parseNode(DiagnosticListener diagnosticListener) {
    if (cachedNode != null) return cachedNode;
    MemberListener listener = new MemberListener(diagnosticListener, this);
    Parser parser = new ClassElementParser(listener);
    Token token = parser.parseClass(beginToken);
    assert(token === endToken.next);
    cachedNode = listener.popNode();
    assert(listener.nodes.isEmpty());
    return cachedNode;
  }

  Token position() => beginToken;
}

class MemberListener extends NodeListener {
  final ClassElement enclosingElement;

  MemberListener(DiagnosticListener listener,
                 [Element this.enclosingElement = null])
    : super(listener);

  bool isConstructorName(Node nameNode) {
    if (enclosingElement === null ||
        enclosingElement.kind != ElementKind.CLASS) {
      return false;
    }
    SourceString name;
    if (nameNode.asIdentifier() != null) {
      name = nameNode.asIdentifier().source;
    } else {
      Send send = nameNode.asSend();
      name = send.receiver.asIdentifier().source;
    }
    return enclosingElement.name == name;
  }

  void endMethod(Token getOrSet, Token beginToken, Token endToken) {
    super.endMethod(getOrSet, beginToken, endToken);
    FunctionExpression method = popNode();
    pushNode(null);
    bool isConstructor = isConstructorName(method.name);
    SourceString name;
    Node methodName = method.name;
    if (methodName.asSend() != null) {
      Send send = methodName.asSend();
      Identifier receiver = send.receiver.asIdentifier();
      Identifier selector = send.selector.asIdentifier();
      if (selector.asOperator() != null) {
        name = Elements.constructOperatorName(
            receiver.source, selector.source);
      } else {
        name = Elements.constructConstructorName(
            receiver.source, selector.source);
      }
    } else {
      name = methodName.asIdentifier().source;
    }
    ElementKind kind = ElementKind.FUNCTION;
    if (isConstructor) {
      if (getOrSet !== null) {
        recoverableError('illegal modifier', token: getOrSet);
      }
      kind = ElementKind.GENERATIVE_CONSTRUCTOR;
    } else if (getOrSet !== null) {
      kind = (getOrSet.stringValue === 'get')
             ? ElementKind.GETTER : ElementKind.SETTER;
    }
    Element memberElement =
        new PartialFunctionElement(name, beginToken, getOrSet, endToken,
                                   kind, method.modifiers, enclosingElement);
    enclosingElement.addMember(memberElement, listener);
  }

  void endFactoryMethod(Token factoryKeyword, Token periodBeforeName,
                        Token endToken) {
    super.endFactoryMethod(factoryKeyword, periodBeforeName, endToken);
    FunctionExpression method = popNode();
    pushNode(null);
    // TODO(ahe): Named constructors.
    if (method.name.asIdentifier() == null) {
      listener.cancel('Qualified factory names not implemented', node: method);
    }
    Identifier name = method.name;
    ElementKind kind = ElementKind.FUNCTION;
    Element memberElement =
        new PartialFunctionElement(name.source, factoryKeyword, null, endToken,
                                   kind, method.modifiers, enclosingElement);
    enclosingElement.addMember(memberElement, listener);
  }

  void endFields(int count, Token beginToken, Token endToken) {
    super.endFields(count, beginToken, endToken);
    VariableDefinitions variableDefinitions = popNode();
    Modifiers modifiers = variableDefinitions.modifiers;
    pushNode(null);
    void buildFieldElement(SourceString name, Element fields) {
      Element element = new VariableElement(
          name, fields, ElementKind.FIELD, enclosingElement);
      enclosingElement.addMember(element, listener);
    }
    buildFieldElements(modifiers, variableDefinitions.definitions,
                       enclosingElement,
                       buildFieldElement, beginToken, endToken);
  }

  void endInitializer(Token assignmentOperator) {
    pushNode(null); // Super expects an expression, but
                    // ClassElementParser just skips expressions.
    super.endInitializer(assignmentOperator);
  }

  void endInitializers(int count, Token beginToken, Token endToken) {
    pushNode(null);
  }
}
