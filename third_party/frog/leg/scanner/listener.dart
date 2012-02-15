// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

final bool VERBOSE = false;

class Listener {
  void beginArguments(Token token) {
  }

  void endArguments(int count, Token beginToken, Token endToken) {
  }

  void beginBlock(Token token) {
  }

  void endBlock(int count, Token beginToken, Token endToken) {
  }

  void beginClassBody(Token token) {
  }

  void endClassBody(int memberCount, Token beginToken, Token endToken) {
  }

  void beginClassDeclaration(Token token) {
  }

  void endClassDeclaration(int interfacesCount, Token beginToken,
                           Token extendsKeyword, Token implementsKeyword,
                           Token endToken) {
  }

  void beginDoWhileStatement(Token token) {
  }

  void endDoWhileStatement(Token doKeyword, Token whileKeyword,
                           Token endToken) {
  }

  void beginExpressionStatement(Token token) {
  }

  void endExpressionStatement(Token token) {
  }

  void beginDefaultClause(Token token) {
  }

  void handleNoDefaultClause(Token token) {
  }

  void endDefaultClause(Token defaultKeyword) {
  }

  void beginFactoryMethod(Token token) {
  }

  void endFactoryMethod(Token factoryKeyword, Token periodBeforeName,
                        Token endToken) {
  }

  void beginFormalParameter(Token token) {
  }

  void endFormalParameter(Token token, Token thisKeyword) {
  }

  void beginFormalParameters(Token token) {
  }

  void endFormalParameters(int count, Token beginToken, Token endToken) {
  }

  void endFields(int count, Token beginToken, Token endToken) {
  }

  void beginForStatement(Token token) {
  }

  void endForStatement(int updateExpressionCount,
                       Token beginToken, Token endToken) {
  }

  void endForInStatement(Token beginToken, Token inKeyword, Token endToken) {
  }

  void beginFunction(Token token) {
  }

  void endFunction(Token getOrSet, Token endToken) {
  }

  void beginFunctionBody(Token token) {
  }

  void endFunctionBody(int count, Token beginToken, Token endToken) {
  }

  void handleNoFunctionBody(Token token) {
  }

  void beginFunctionName(Token token) {
  }

  void endFunctionName(Token token) {
  }

  void beginFunctionTypeAlias(Token token) {
  }

  void endFunctionTypeAlias(Token typedefKeyword, Token endToken) {
  }

  void beginIfStatement(Token token) {
  }

  void endIfStatement(Token ifToken, Token elseToken) {
  }

  void beginInitializedIdentifier(Token token) {
  }

  void endInitializedIdentifier() {
  }

  void beginInitializer(Token token) {
  }

  void endInitializer(Token assignmentOperator) {
  }

  void beginInitializers(Token token) {
  }

  void endInitializers(int count, Token beginToken, Token endToken) {
  }

  void handleNoInitializers() {
  }

  void beginInterface(Token token) {
  }

  void endInterface(int supertypeCount, Token interfaceKeyword,
                    Token extendsKeyword, Token endToken) {
  }

  void beginLabelledStatement(Token token) {
  }

  void endLabelledStatement(Token colon) {
  }

  void beginLiteralMapEntry(Token token) {
  }

  void endLiteralMapEntry(Token colon, Token endToken) {
  }

  void beginLiteralString(Token token) {
  }

  void endLiteralString(int interpolationCount) {
  }

  void beginMember(Token token) {
  }

  void endMethod(Token getOrSet, Token beginToken, Token endToken) {
  }

  void beginOptionalFormalParameters(Token token) {
  }

  void endOptionalFormalParameters(int count,
                                   Token beginToken, Token endToken) {
  }

  void beginReturnStatement(Token token) {
  }

  void endReturnStatement(bool hasExpression,
                          Token beginToken, Token endToken) {
  }

  void beginScriptTag(Token token) {
  }

  void endScriptTag(bool hasPrefix, Token beginToken, Token endToken) {
  }

  void beginSend(Token token) {
  }

  void endSend(Token token) {
  }

  void beginSwitchStatement(Token token) {
  }

  void endSwitchStatement(Token switchKeyword, Token endToken) {
  }

  void beginSwitchBlock(Token token) {
  }

  void endSwitchBlock(int caseCount, Token beginToken, Token endToken) {
  }

  void beginThrowStatement(Token token) {
  }

  void endThrowStatement(Token throwToken, Token endToken) {
  }

  void endRethrowStatement(Token throwToken, Token endToken) {
  }

  void beginTopLevelMember(Token token) {
  }

  void endTopLevelFields(int count, Token beginToken, Token endToken) {
  }

  void endTopLevelMethod(Token beginToken, Token getOrSet, Token endToken) {
  }

  void beginTryStatement(Token token) {
  }

  void handleCatchBlock(Token catchKeyword) {
  }

  void handleFinallyBlock(Token finallyKeyword) {
  }

  void endTryStatement(int catchCount, Token tryKeyword, Token finallyKeyword) {
  }

  void endType(int count, Token beginToken, Token endToken) {
  }

  void beginTypeArguments(Token token) {
  }

  void endTypeArguments(int count, Token beginToken, Token endToken) {
  }

  void handleNoTypeArguments(Token token) {
  }

  void beginTypeVariable(Token token) {
  }

  void endTypeVariable(Token token) {
  }

  void beginTypeVariables(Token token) {
  }

  void endTypeVariables(int count, Token beginToken, Token endToken) {
  }

  void beginUnamedFunction(Token token) {
  }

  void endUnamedFunction(Token token) {
  }

  void beginVariablesDeclaration(Token token) {
  }

  void endVariablesDeclaration(int count, Token endToken) {
  }

  void beginWhileStatement(Token token) {
  }

  void endWhileStatement(Token whileKeyword, Token endToken) {
  }

  void handleAssignmentExpression(Token token) {
  }

  void handleBinaryExpression(Token token) {
  }

  void handleConditionalExpression(Token question, Token colon) {
  }

  void handleConstExpression(Token token, bool named) {
  }

  void handleFunctionTypedFormalParameter(Token token) {
  }

  void handleIdentifier(Token token) {
  }

  void handleIndexedExpression(Token openCurlyBracket,
                               Token closeCurlyBracket) {
  }

  void handleIsOperator(Token operathor, Token not, Token endToken) {
    // TODO(ahe): Rename [operathor] to "operator" when VM bug is fixed.
  }

  void handleLiteralBool(Token token) {
  }

  void handleBreakStatement(bool hasTarget,
                            Token breakKeyword, Token endToken) {
  }

  void handleContinueStatement(bool hasTarget,
                               Token continueKeyword, Token endToken) {
  }

  void handleDefaultCase(Token colon, Token defaultKeyword, int statementCount,
                         Token endToken) {
  }

  void handleEmptyStatement(Token token) {
  }

  /** Called with either the token containing a double literal, or
    * an immediately preceding "unary plus" token.
    */
  void handleLiteralDouble(Token token) {
  }

  /** Called with either the token containing an integer literal,
    * or an immediately preceding "unary plus" token.
    */
  void handleLiteralInt(Token token) {
  }

  void handleLiteralList(int count, Token beginToken, Token constKeyword,
                         Token endToken) {
  }

  void handleLiteralMap(int count, Token beginToken, Token constKeyword,
                        Token endToken) {
  }

  void handleLiteralNull(Token token) {
  }

  void handleModifier(Token token) {
  }

  void handleModifiers(int count) {
  }

  void handleNamedArgument(Token colon) {
  }

  void handleNewExpression(Token token, bool named) {
  }

  void handleNoArguments(Token token) {
  }

  void handleNoExpression(Token token) {
  }

  void handleNoType(Token token) {
  }

  void handleNoTypeVariables(Token token) {
  }

  void handleOperatorName(Token operatorKeyword, Token token) {
  }

  void handleParenthesizedExpression(BeginGroupToken token) {
  }

  void handleQualified(Token period) {
  }

  void handleStringPart(Token token) {
  }

  void handleSuperExpression(Token token) {
  }

  void handleSwitchCase(Token colon, Token caseKeyword, int statementCount,
                        Token endToken) {
  }

  void handleThisExpression(Token token) {
  }

  void handleUnaryPostfixAssignmentExpression(Token token) {
  }

  void handleUnaryPrefixExpression(Token token) {
  }

  void handleUnaryPrefixAssignmentExpression(Token token) {
  }

  void handleValuedFormalParameter(Token equals, Token token) {
  }

  void handleVoidKeyword(Token token) {
  }

  Token expected(String string, Token token) {
    error("expected '$string', but got '$token'", token);
    return skipToEof(token);
  }

  void expectedIdentifier(Token token) {
    error("expected identifier, but got '$token'", token);
  }

  Token expectedType(Token token) {
    error("expected a type, but got '$token'", token);
    return skipToEof(token);
  }

  Token expectedExpression(Token token) {
    error("Expected an expression, but got '$token'", token);
    return skipToEof(token);
  }

  Token unexpected(Token token) {
    error("Unexpected token '$token'", token);
    return skipToEof(token);
  }

  skipToEof(Token token) {
    while (token.info !== EOF_INFO) {
      token = token.next;
    }
    return token;
  }

  void recoverableError(String message, [Token token, Node node]) {
    if (token === null && node !== null) {
      token = node.getBeginToken();
    }
    error(message, token);
  }

  void error(String message, Token token) {
    throw new ParserError("$message @ ${token.charOffset}");
  }
}

class ParserError {
  final String reason;
  ParserError(this.reason);
  toString() => reason;
}

/**
 * A listener for parser events.
 */
class ElementListener extends Listener {
  final DiagnosticListener listener;
  final CompilationUnitElement compilationUnitElement;
  final StringValidator stringValidator;
  Link<StringQuoting> interpolationScope;

  Link<Node> nodes = const EmptyLink<Node>();

  ElementListener(DiagnosticListener listener,
                  CompilationUnitElement this.compilationUnitElement)
      : this.listener = listener,
        stringValidator = new StringValidator(listener),
        interpolationScope = const EmptyLink<StringQuoting>();

  void pushQuoting(StringQuoting quoting) {
    interpolationScope = interpolationScope.prepend(quoting);
  }

  StringQuoting popQuoting() {
    StringQuoting result = interpolationScope.head;
    interpolationScope = interpolationScope.tail;
    return result;
  }

  LiteralString popLiteralString() {
    Node node = popNode();
    if (node is !LiteralString) {
      listener.cancel("String is not a compile time constant", node: node);
      return null;
    }
    return node;
  }

  void endScriptTag(bool hasPrefix, Token beginToken, Token endToken) {
    LiteralString prefix = null;
    Identifier argumentName = null;
    if (hasPrefix) {
      prefix = popLiteralString();
      argumentName = popNode();
    }
    LiteralString firstArgument = popLiteralString();
    Identifier tag = popNode();
    compilationUnitElement.addTag(new ScriptTag(tag, firstArgument,
                                                argumentName, prefix,
                                                beginToken, endToken),
                                  listener);
  }

  void endClassDeclaration(int interfacesCount, Token beginToken,
                           Token extendsKeyword, Token implementsKeyword,
                           Token endToken) {
    NodeList interfaces =
        makeNodeList(interfacesCount, implementsKeyword, null, ",");
    TypeAnnotation supertype = popNode();
    Identifier name = popNode();
    pushElement(new PartialClassElement(
        name.source, beginToken, endToken, compilationUnitElement));
  }

  void endDefaultClause(Token defaultKeyword) {
    listener.cancel("Default clauses are not implemented",
                    token: defaultKeyword);
  }

  void handleNoDefaultClause(Token token) {
    pushNode(null);
  }

  void endInterface(int supertypeCount, Token interfaceKeyword,
                    Token extendsKeyword, Token endToken) {
    // TODO(ahe): Record the defaultClause.
    Node defaultClause = popNode();
    NodeList supertypes =
        makeNodeList(supertypeCount, extendsKeyword, null, ",");
    Identifier name = popNode();
    pushElement(new PartialClassElement(
        name.source, interfaceKeyword, endToken, compilationUnitElement));
  }

  void endFunctionTypeAlias(Token typedefKeyword, Token endToken) {
    listener.cancel("typedef is not implemented", token: typedefKeyword);
  }

  void endTopLevelMethod(Token beginToken, Token getOrSet, Token endToken) {
    Identifier name = popNode();
    Modifiers modifiers = popNode();
    pushElement(new PartialFunctionElement(name.source, beginToken, getOrSet,
                                           endToken, ElementKind.FUNCTION,
                                           modifiers, compilationUnitElement));
  }

  void endTopLevelFields(int count, Token beginToken, Token endToken) {
    void buildFieldElement(SourceString name, Element fields) {
      pushElement(new VariableElement(
          name, fields, ElementKind.FIELD, compilationUnitElement));
    }
    NodeList variables = makeNodeList(count, null, null, ",");
    Modifiers modifiers = popNode();
    buildFieldElements(modifiers, variables, compilationUnitElement,
                       buildFieldElement,
                       beginToken, endToken);
  }

  void buildFieldElements(Modifiers modifiers,
                          NodeList variables,
                          ContainerElement enclosingElement,
                          void buildFieldElement(SourceString name,
                                                 Element fields),
                          Token beginToken, Token endToken) {
    Element fields = new PartialFieldListElement(beginToken,
                                                 endToken,
                                                 modifiers,
                                                 enclosingElement);
    for (Link<Node> nodes = variables.nodes; !nodes.isEmpty();
         nodes = nodes.tail) {
      Expression initializedIdentifier = nodes.head;
      Identifier identifier = initializedIdentifier.asIdentifier();
      if (identifier === null) {
        identifier = initializedIdentifier.asSendSet().selector.asIdentifier();
      }
      SourceString name = identifier.source;
      buildFieldElement(name, fields);
    }
  }

  void handleIdentifier(Token token) {
    pushNode(new Identifier(token));
  }

  void handleQualified(Token period) {
    Identifier last = popNode();
    Identifier first = popNode();
    pushNode(new Send(first, last));
  }

  void handleNoType(Token token) {
    pushNode(null);
  }

  void endTypeVariable(Token token) {
    TypeAnnotation bound = popNode();
    Identifier name = popNode();
  }

  void endTypeArguments(int count, Token beginToken, Token endToken) {
    pushNode(makeNodeList(count, beginToken, endToken, ','));
  }

  void handleNoTypeArguments(Token token) {
    pushNode(null);
  }

  void endType(int count, Token beginToken, Token endToken) {
    NodeList typeArguments = popNode();
    Expression typeName = popNode();
    for (int i = 1; i < count; i++) {
      // TODO(ahe): I don't think this is correct for foo.bar.baz.
      typeName = new Send(popNode(), typeName);
    }
    pushNode(new TypeAnnotation(typeName, typeArguments));
  }

  void handleParenthesizedExpression(BeginGroupToken token) {
    Expression expression = popNode();
    pushNode(new ParenthesizedExpression(expression, token));
  }

  void handleModifier(Token token) {
    pushNode(new Identifier(token));
  }

  void handleModifiers(int count) {
    NodeList nodes = makeNodeList(count, null, null, null);
    pushNode(new Modifiers(nodes));
  }

  Token expected(String string, Token token) {
    listener.cancel("expected '$string', but got '$token'", token: token);
    return skipToEof(token);
  }

  void expectedIdentifier(Token token) {
    listener.cancel("expected identifier, but got '$token'", token: token);
    pushNode(null);
  }

  Token expectedType(Token token) {
    listener.cancel("expected a type, but got '$token'", token: token);
    pushNode(null);
    return skipToEof(token);
  }

  Token expectedExpression(Token token) {
    listener.cancel("Expected an expression, but got '$token'", token: token);
    pushNode(null);
    return skipToEof(token);
  }

  Token unexpected(Token token) {
    listener.cancel("Unexpected token '$token'", token: token);
    return skipToEof(token);
  }

  void recoverableError(String message, [Token token, Node node]) {
    listener.cancel(message, token: token, node: node);
  }

  void pushElement(Element element) {
    compilationUnitElement.addMember(element, listener);
  }

  void pushNode(Node node) {
    nodes = nodes.prepend(node);
    if (VERBOSE) log("push $nodes");
  }

  Node popNode() {
    assert(!nodes.isEmpty());
    Node node = nodes.head;
    nodes = nodes.tail;
    if (VERBOSE) log("pop $nodes");
    return node;
  }

  Node peekNode() {
    assert(!nodes.isEmpty());
    Node node = nodes.head;
    if (VERBOSE) log("peek $node");
    return node;
  }

  void log(message) {
    print(message);
  }

  NodeList makeNodeList(int count, Token beginToken, Token endToken,
                        String delimiter) {
    Link<Node> nodes = const EmptyLink<Node>();
    for (; count > 0; --count) {
      // This effectively reverses the order of nodes so they end up
      // in correct (source) order.
      nodes = nodes.prepend(popNode());
    }
    SourceString sourceDelimiter =
        (delimiter === null) ? null : new SourceString(delimiter);
    return new NodeList(beginToken, nodes, endToken, sourceDelimiter);
  }

  void beginLiteralString(Token token) {
    SourceString source = token.value;
    StringQuoting quoting = StringValidator.quotingFromString(source);
    pushQuoting(quoting);
    // Just wrap the token for now. At the end of the interpolation,
    // when we know how many there are, go back and validate the tokens.
    pushNode(new LiteralString(token, null));
  }

  void handleStringPart(Token token) {
    // Just push an unvalidated token now, and replace it when we know the
    // end of the interpolation.
    pushNode(new LiteralString(token, null));
  }

  void endLiteralString(int count) {
    StringQuoting quoting = popQuoting();

    Link<StringInterpolationPart> parts =
        const EmptyLink<StringInterpolationPart>();
    // Parts of the string interpolation are popped in reverse order,
    // starting with the last literal string part.
    bool isLast = true;
    for (int i = 0; i < count; i++) {
      LiteralString string = popNode();
      DartString validation =
          stringValidator.validateInterpolationPart(string.token, quoting,
                                                    isFirst: false,
                                                    isLast: isLast);
      // Replace the unvalidated LiteralString with a new LiteralString
      // object that has the validation result included.
      string = new LiteralString(string.token, validation);
      Expression expression = popNode();
      parts = parts.prepend(new StringInterpolationPart(expression, string));
      isLast = false;
    }

    LiteralString string = popNode();
    DartString validation =
        stringValidator.validateInterpolationPart(string.token, quoting,
                                                  isFirst: true,
                                                  isLast: isLast);
    string = new LiteralString(string.token, validation);
    if (isLast) {
      pushNode(string);
    } else {
      NodeList nodes = new NodeList(null, parts, null, null);
      pushNode(new StringInterpolation(string, nodes));
    }
  }
}

class NodeListener extends ElementListener {
  NodeListener(DiagnosticListener listener) : super(listener, null);

  void endClassDeclaration(int interfacesCount, Token beginToken,
                           Token extendsKeyword, Token implementsKeyword,
                           Token endToken) {
    NodeList body = popNode();
    NodeList interfaces =
        makeNodeList(interfacesCount, implementsKeyword, null, ",");
    TypeAnnotation supertype = popNode();
    // TODO(ahe): Type variables.
    Identifier name = popNode();
    pushNode(new ClassNode(name, supertype, interfaces, null,
                           beginToken, extendsKeyword, endToken));
  }

  void endFunctionTypeAlias(Token typedefKeyword, Token endToken) {
    NodeList formals = popNode();
    NodeList typeParameters = null; // TODO(ahe): Don't discard these.
    Identifier name = popNode();
    TypeAnnotation returnType = popNode();
    pushNode(new Typedef(returnType, name, typeParameters, formals,
                         typedefKeyword, endToken));
  }

  void endInterface(int supertypeCount, Token interfaceKeyword,
                    Token extendsKeyword, Token endToken) {
    NodeList body = popNode();
    NodeList defaultClause = popNode();
    NodeList supertypes = makeNodeList(supertypeCount, extendsKeyword,
                                       null, ',');
    Identifier name = popNode();
    pushNode(new ClassNode(name, null, supertypes, defaultClause,
                           interfaceKeyword, null, endToken));
  }

  void endDefaultClause(Token defaultKeyword) {
    pushNode(makeNodeList(1, defaultKeyword, null, null));
  }

  void endClassBody(int memberCount, Token beginToken, Token endToken) {
    pushNode(makeNodeList(memberCount, beginToken, endToken, null));
  }

  void endTopLevelFields(int count, Token beginToken, Token endToken) {
    NodeList variables = makeNodeList(count, null, null, ",");
    Modifiers modifiers = popNode();
    pushNode(new VariableDefinitions(null, modifiers, variables, endToken));
  }

  void endTopLevelMethod(Token beginToken, Token getOrSet, Token endToken) {
    Statement body = popNode();
    NodeList formalParameters = popNode();
    Identifier name = popNode();
    Modifiers modifiers = popNode();
    pushElement(new PartialFunctionElement(name.source, beginToken, getOrSet,
                                           endToken, ElementKind.FUNCTION,
                                           modifiers, compilationUnitElement));
  }

  void endFormalParameter(Token token, Token thisKeyword) {
    Expression name = popNode();
    if (thisKeyword !== null) {
      name = new Send(new Identifier(thisKeyword), name);
    }
    TypeAnnotation type = popNode();
    Modifiers modifiers = popNode();
    pushNode(new VariableDefinitions(type, modifiers,
                                     new NodeList.singleton(name), token));
  }

  void endFormalParameters(int count, Token beginToken, Token endToken) {
    pushNode(makeNodeList(count, beginToken, endToken, ","));
  }

  void endArguments(int count, Token beginToken, Token endToken) {
    pushNode(makeNodeList(count, beginToken, endToken, ","));
  }

  void handleNoArguments(Token token) {
    pushNode(null);
  }

  void endReturnStatement(bool hasExpression,
                          Token beginToken, Token endToken) {
    Expression expression = hasExpression ? popNode() : null;
    pushNode(new Return(beginToken, endToken, expression));
  }

  void endExpressionStatement(Token token) {
    pushNode(new ExpressionStatement(popNode(), token));
  }

  void handleOnError(Token token, var error) {
    listener.cancel("internal error: '${token.value}': ${error}", token: token);
  }

  void handleLiteralInt(Token token) {
    pushNode(new LiteralInt(token, (t, e) => handleOnError(t, e)));
  }

  void handleLiteralDouble(Token token) {
    pushNode(new LiteralDouble(token, (t, e) => handleOnError(t, e)));
  }

  void handleLiteralBool(Token token) {
    pushNode(new LiteralBool(token, (t, e) => handleOnError(t, e)));
  }

  void handleLiteralNull(Token token) {
    pushNode(new LiteralNull(token));
  }

  void handleBinaryExpression(Token token) {
    Node argument = popNode();
    Node receiver = popNode();
    if (token.stringValue === '.') {
      if (argument is !Send) internalError(node: argument);
      if (argument.asSend().receiver !== null) internalError(node: argument);
      if (argument is SendSet) internalError(node: argument);
      pushNode(argument.asSend().copyWithReceiver(receiver));
    } else {
      NodeList arguments = new NodeList.singleton(argument);
      pushNode(new Send(receiver, new Operator(token), arguments));
    }
  }

  void handleAssignmentExpression(Token token) {
    Node arg = popNode();
    Node node = popNode();
    Send send = node.asSend();
    if (send === null) internalError(node: node);
    if (!(send.isPropertyAccess || send.isIndex)) internalError(node: send);
    if (send.asSendSet() !== null) internalError(node: send);
    NodeList arguments;
    if (send.isIndex) {
      Link<Node> link = new Link<Node>(arg);
      link = link.prepend(send.arguments.head);
      arguments = new NodeList(null, link);
    } else {
      arguments = new NodeList.singleton(arg);
    }
    Operator op = new Operator(token);
    pushNode(new SendSet(send.receiver, send.selector, op, arguments));
  }

  void handleConditionalExpression(Token question, Token colon) {
    Node elseExpression = popNode();
    Node thenExpression = popNode();
    Node condition = popNode();
    pushNode(new Conditional(
        condition, thenExpression, elseExpression, question, colon));
  }

  void endSend(Token token) {
    NodeList arguments = popNode();
    Node selector = popNode();
    // TODO(ahe): Handle receiver.
    pushNode(new Send(null, selector, arguments));
  }

  void handleVoidKeyword(Token token) {
    pushNode(new TypeAnnotation(new Identifier(token), null));
  }

  void endFunctionBody(int count, Token beginToken, Token endToken) {
    pushNode(new Block(makeNodeList(count, beginToken, endToken, null)));
  }

  void handleNoFunctionBody(Token token) {
    pushNode(null);
  }

  void endFunction(Token getOrSet, Token endToken) {
    Statement body = popNode();
    NodeList initializers = popNode();
    NodeList formals = popNode();
    // The name can be an identifier or a send in case of named constructors.
    Expression name = popNode();
    TypeAnnotation type = popNode();
    Modifiers modifiers = popNode();
    pushNode(new FunctionExpression(name, formals, body, type,
                                    modifiers, initializers, getOrSet));
  }

  void endVariablesDeclaration(int count, Token endToken) {
    // TODO(ahe): Pick one name for this concept, either
    // VariablesDeclaration or VariableDefinitions.
    NodeList variables = makeNodeList(count, null, null, ",");
    TypeAnnotation type = popNode();
    Modifiers modifiers = popNode();
    pushNode(new VariableDefinitions(type, modifiers, variables, endToken));
  }

  void endInitializer(Token assignmentOperator) {
    Expression initializer = popNode();
    NodeList arguments = new NodeList.singleton(initializer);
    Expression name = popNode();
    Operator op = new Operator(assignmentOperator);
    pushNode(new SendSet(null, name, op, arguments));
  }

  void endIfStatement(Token ifToken, Token elseToken) {
    Statement elsePart = (elseToken === null) ? null : popNode();
    Statement thenPart = popNode();
    ParenthesizedExpression condition = popNode();
    pushNode(new If(condition, thenPart, elsePart, ifToken, elseToken));
  }

  void endForStatement(int updateExpressionCount,
                       Token beginToken, Token endToken) {
    Statement body = popNode();
    NodeList updates = makeNodeList(updateExpressionCount, null, null, ',');
    Statement condition = popNode();
    Node initializer = popNode();
    pushNode(new For(initializer, condition, updates, body, beginToken));
  }

  void handleNoExpression(Token token) {
    pushNode(null);
  }

  void endDoWhileStatement(Token doKeyword, Token whileKeyword,
                           Token endToken) {
    Expression condition = popNode();
    Statement body = popNode();
    pushNode(new DoWhile(body, condition, doKeyword, whileKeyword, endToken));
  }

  void endWhileStatement(Token whileKeyword, Token endToken) {
    Statement body = popNode();
    Expression condition = popNode();
    pushNode(new While(condition, body, whileKeyword));
  }

  void endBlock(int count, Token beginToken, Token endToken) {
    pushNode(new Block(makeNodeList(count, beginToken, endToken, null)));
  }

  void endThrowStatement(Token throwToken, Token endToken) {
    Expression expression = popNode();
    pushNode(new Throw(expression, throwToken, endToken));
  }

  void endRethrowStatement(Token throwToken, Token endToken) {
    pushNode(new Throw(null, throwToken, endToken));
  }

  void handleUnaryPrefixExpression(Token token) {
    pushNode(new Send.prefix(popNode(), new Operator(token)));
  }

  void handleSuperExpression(Token token) {
    pushNode(new Identifier(token));
  }

  void handleThisExpression(Token token) {
    pushNode(new Identifier(token));
  }

  void handleUnaryAssignmentExpression(Token token, bool isPrefix) {
    Node node = popNode();
    Send send = node.asSend();
    if (send === null) internalError(node: node);
    if (!(send.isPropertyAccess || send.isIndex)) internalError(node: send);
    if (send.asSendSet() !== null) internalError(node: send);
    Node argument = null;
    if (send.isIndex) argument = send.arguments.head;
    Operator op = new Operator(token);

    if (isPrefix) {
      pushNode(new SendSet.prefix(send.receiver, send.selector, op, argument));
    } else {
      pushNode(new SendSet.postfix(send.receiver, send.selector, op, argument));
    }
  }

  void handleUnaryPostfixAssignmentExpression(Token token) {
    handleUnaryAssignmentExpression(token, false);
  }

  void handleUnaryPrefixAssignmentExpression(Token token) {
    handleUnaryAssignmentExpression(token, true);
  }

  void endInitializers(int count, Token beginToken, Token endToken) {
    pushNode(makeNodeList(count, beginToken, null, ','));
  }

  void handleNoInitializers() {
    pushNode(null);
  }

  void endFields(int count, Token beginToken, Token endToken) {
    NodeList variables = makeNodeList(count, null, null, ",");
    Modifiers modifiers = popNode();
    pushNode(new VariableDefinitions(null, modifiers, variables, endToken));
  }

  void endMethod(Token getOrSet, Token beginToken, Token endToken) {
    Statement body = popNode();
    NodeList initializers = popNode();
    NodeList formalParameters = popNode();
    Expression name = popNode();
    Modifiers modifiers = popNode();
    pushNode(new FunctionExpression(name, formalParameters, body, null,
                                    modifiers, initializers, getOrSet));
  }

  void handleLiteralMap(int count, Token beginToken, Token constKeyword,
                        Token endToken) {
    NodeList entries = makeNodeList(count, beginToken, endToken, ',');
    NodeList typeArguments = popNode();
    pushNode(new LiteralMap(typeArguments, entries));
  }

  void endLiteralMapEntry(Token colon, Token endToken) {
    Expression value = popNode();
    Expression key = popNode();
    if (key.asLiteralString() === null) {
      recoverableError('expected a constant string', node: key);
    }
    pushNode(new LiteralMapEntry(key, colon, value));
  }

  void handleLiteralList(int count, Token beginToken, Token constKeyword,
                         Token endToken) {
    NodeList elements = makeNodeList(count, beginToken, endToken, ',');
    NodeList typeArguments = popNode();
    // TODO(ahe): Type arguments are discarded.
    pushNode(new LiteralList(null, elements, constKeyword));
  }

  void handleIndexedExpression(Token openSquareBracket,
                               Token closeSquareBracket) {
    NodeList arguments =
        makeNodeList(1, openSquareBracket, closeSquareBracket, null);
    Node receiver = popNode();
    Node selector = new Operator.synthetic('[]');
    pushNode(new Send(receiver, selector, arguments));
  }

  void handleNewExpression(Token token, bool named) {
    NodeList arguments = popNode();
    Node name = popNode();
    if (named) {
      TypeAnnotation type = popNode();
      name = new Send(type, name);
    }
    pushNode(new NewExpression(token, new Send(null, name, arguments)));
  }

  void handleConstExpression(Token token, bool named) {
    NodeList arguments = popNode();
    if (named) {
      Identifier name = popNode();
    }
    TypeAnnotation type = popNode();
    pushNode(new NewExpression(token, new Send(null, type, arguments)));
  }

  void handleOperatorName(Token operatorKeyword, Token token) {
    Operator op = new Operator(token);
    pushNode(new Send(new Identifier(operatorKeyword), op, null));
  }

  void handleNamedArgument(Token colon) {
    Expression expression = popNode();
    Identifier name = popNode();
    pushNode(new NamedArgument(name, colon, expression));
  }

  void endOptionalFormalParameters(int count,
                                   Token beginToken, Token endToken) {
    pushNode(makeNodeList(count, beginToken, endToken, ','));
  }

  void handleFunctionTypedFormalParameter(Token endToken) {
    NodeList formals = popNode();
    Identifier name = popNode();
    TypeAnnotation returnType = popNode();
    pushNode(null); // Signal "no type" to endFormalParameter.
    pushNode(new FunctionExpression(name, formals, null, returnType,
                                    null, null, null));
  }

  void handleValuedFormalParameter(Token equals, Token token) {
    Expression defaultValue = popNode();
    Expression parameterName = popNode();
    pushNode(new SendSet(null, parameterName, new Operator(equals),
                         new NodeList.singleton(defaultValue)));
  }

  void endTryStatement(int catchCount, Token tryKeyword, Token finallyKeyword) {
    Block finallyBlock = null;
    if (finallyKeyword !== null) {
      finallyBlock = popNode();
    }
    NodeList catchBlocks = makeNodeList(catchCount, null, null, null);
    Block tryBlock = popNode();
    pushNode(new TryStatement(tryBlock, catchBlocks, finallyBlock,
                              tryKeyword, finallyKeyword));
  }

  void handleCatchBlock(Token catchKeyword) {
    Block block = popNode();
    NodeList formals = popNode();
    pushNode(new CatchBlock(formals, block, catchKeyword));
  }

  void endSwitchStatement(Token switchKeyword, Token endToken) {
    popNode(); // Discard block.
    ParenthesizedExpression expression = popNode();
    SwitchStatement node =
      new SwitchStatement(expression, switchKeyword, endToken);
    pushNode(node);
  }

  void endSwitchBlock(int caseCount, Token beginToken, Token endToken) {
    pushNode(makeNodeList(caseCount, beginToken, endToken, null));
  }

  void handleSwitchCase(Token colon, Token caseKeyword, int statementCount,
                        Token endToken) {
    NodeList statements = makeNodeList(statementCount, null, null, null);
    Expression expression = popNode();
    if (colon !== null) {
      popNode(); // Discard label.
    }
    pushNode(statements);
    listener.cancel('switch cases are not implemented', token: caseKeyword);
  }

  void handleDefaultCase(Token colon, Token defaultKeyword, int statementCount,
                         Token endToken) {
    NodeList statements = makeNodeList(statementCount, null, null, null);
    if (colon !== null) {
      popNode(); // Discard label.
    }
    pushNode(statements);
    listener.cancel('default case is not implemented', token: defaultKeyword);
  }

  void handleBreakStatement(bool hasTarget,
                            Token breakKeyword, Token endToken) {
    Identifier target = null;
    if (hasTarget) {
      target = popNode();
    }
    pushNode(new BreakStatement(target, breakKeyword, endToken));
  }

  void handleContinueStatement(bool hasTarget,
                               Token continueKeyword, Token endToken) {
    Identifier target = null;
    if (hasTarget) {
      target = popNode();
    }
    pushNode(new ContinueStatement(target, continueKeyword, endToken));
  }

  void handleEmptyStatement(Token token) {
    pushNode(new EmptyStatement(token));
  }

  void endFactoryMethod(Token factoryKeyword, Token periodBeforeName,
                        Token endToken) {
    Statement body = popNode();
    NodeList formals = popNode();
    Node name = popNode();
    if (periodBeforeName !== null) {
      // A library prefix was handled in [handleQualified].
      name = new Send(popNode(), name);
    }
    handleModifier(factoryKeyword);
    handleModifiers(1);
    Modifiers modifiers = popNode();
    pushNode(new FunctionExpression(name, formals, body, null,
                                    modifiers, null, null));
  }

  void endForInStatement(Token beginToken, Token inKeyword, Token endToken) {
    Statement body = popNode();
    Expression expression = popNode();
    Node declaredIdentifier = popNode();
    pushNode(new ForInStatement(declaredIdentifier, expression, body,
                                beginToken, inKeyword));
  }

  void endUnamedFunction(Token token) {
    Statement body = popNode();
    NodeList formals = popNode();
    pushNode(new FunctionExpression(null, formals, body, null,
                                    null, null, null));
  }

  void handleIsOperator(Token operathor, Token not, Token endToken) {
    if (not !== null) {
      listener.cancel('negated is-operator is not implemented', token: not);
    }
    TypeAnnotation type = popNode();
    Expression expression = popNode();
    NodeList arguments = new NodeList.singleton(type);
    pushNode(new Send(expression, new Operator(operathor), arguments));
  }

  void endLabelledStatement(Token colon) {
    Statement statement = popNode();
    Identifier label = popNode();
    pushNode(new LabelledStatement(label, colon, statement));
  }

  void log(message) {
    listener.log(message);
  }

  void internalError([Token token, Node node]) {
    listener.cancel('internal error', token: token, node: node);
    throw 'internal error';
  }
}

class PartialFunctionElement extends FunctionElement {
  final Token beginToken;
  final Token getOrSet;
  final Token endToken;

  PartialFunctionElement(SourceString name,
                         Token this.beginToken,
                         Token this.getOrSet,
                         Token this.endToken,
                         ElementKind kind,
                         Modifiers modifiers,
                         Element enclosing)
    : super(name, kind, modifiers, enclosing);

  FunctionExpression parseNode(DiagnosticListener listener) {
    if (cachedNode != null) return cachedNode;
    cachedNode = parse(listener,
                       (p) => p.parseFunction(beginToken, getOrSet));
    return cachedNode;
  }

  Token position() => beginToken;
}

class PartialFieldListElement extends VariableListElement {
  final Token beginToken;
  final Token endToken;

  PartialFieldListElement(Token this.beginToken,
                          Token this.endToken,
                          Modifiers modifiers,
                          Element enclosing)
    : super(ElementKind.VARIABLE_LIST, modifiers, enclosing);

  VariableDefinitions parseNode(DiagnosticListener listener) {
    if (cachedNode != null) return cachedNode;
    cachedNode =
        parse(listener, (p) => p.parseVariablesDeclaration(beginToken));
    return cachedNode;
  }

  Token position() => beginToken;
}

Node parse(DiagnosticListener diagnosticListener, doParse(Parser parser)) {
  NodeListener listener = new NodeListener(diagnosticListener);
  doParse(new Parser(listener));
  Node node = listener.popNode();
  assert(listener.nodes.isEmpty());
  return node;
}
