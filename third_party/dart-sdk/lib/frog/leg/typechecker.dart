// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class TypeCheckerTask extends CompilerTask {
  TypeCheckerTask(Compiler compiler) : super(compiler);
  String get name() => "Type checker";

  void check(Node tree, TreeElements elements) {
    measure(() {
      Visitor visitor =
          new TypeCheckerVisitor(compiler, elements, compiler.types);
      try {
        tree.accept(visitor);
      } catch (CancelTypeCheckException e) {
        compiler.reportWarning(e.node, new TypeWarning(MessageKind.GENERIC,
                                                       [e.reason]));
      }
    });
  }
}

interface Type {
  SourceString get name();
  Element get element();
}

/**
 * A statement type tracks whether a statement returns or may return.
 */
class StatementType implements Type {
  final String stringName;
  Element get element() => null;

  SourceString get name() => new SourceString(stringName);

  const StatementType(this.stringName);

  static final RETURNING = const StatementType('<returning>');
  static final NOT_RETURNING = const StatementType('<not returning>');
  static final MAYBE_RETURNING = const StatementType('<maybe returning>');

  /** Combine the information about two control-flow edges that are joined. */
  StatementType join(StatementType other) {
    return (this === other) ? this : MAYBE_RETURNING;
  }

  String toString() => stringName;
}

class SimpleType implements Type {
  final SourceString name;
  final Element element;

  const SimpleType(SourceString this.name, Element this.element);
  SimpleType.named(SourceString name)
    : this.name = name, element = new Element(name, null, null);

  String toString() => name.toString();
}

class FunctionType implements Type {
  final Element element;
  final Type returnType;
  final Link<Type> parameterTypes;

  const FunctionType(Type this.returnType, Link<Type> this.parameterTypes,
                     Element this.element);

  toString() {
    StringBuffer sb = new StringBuffer();
    bool first = true;
    sb.add('(');
    parameterTypes.printOn(sb, ', ');
    sb.add(') -> ${returnType}');
    return sb.toString();
  }

  SourceString get name() => const SourceString('Function');
}

class Types {
  static final VOID = const SourceString('void');
  static final INT = const SourceString('int');
  static final DOUBLE = const SourceString('double');
  static final DYNAMIC = const SourceString('Dynamic');
  static final STRING = const SourceString('String');
  static final BOOL = const SourceString('bool');
  static final OBJECT = const SourceString('Object');

  final SimpleType voidType;
  final SimpleType dynamicType;

  Types() : voidType = new SimpleType.named(VOID),
            dynamicType = new SimpleType.named(DYNAMIC);

  Type lookup(SourceString s) {
    if (VOID == s) {
      return voidType;
    } else if (DYNAMIC == s || s.stringValue === 'var') {
      return dynamicType;
    }
    return null;
  }

  /** Returns true if t is a subtype of s */
  bool isSubtype(Type t, Type s) {
    return t === s || t === dynamicType || s === dynamicType ||
           s.name == Types.OBJECT;
  }

  bool isAssignable(Type r, Type s) {
    return isSubtype(r, s) || isSubtype(s, r);
  }
}

class CancelTypeCheckException {
  final Node node;
  final String reason;

  CancelTypeCheckException(this.node, this.reason);
}

Type lookupType(SourceString name, Compiler compiler, types) {
  Type t = types.lookup(name);
  if (t !== null) return t;
  Element element = compiler.universe.find(name);
  if (element !== null && element.kind === ElementKind.CLASS) {
    return element.computeType(compiler);
  }
  return null;
}

class TypeCheckerVisitor implements Visitor<Type> {
  final Compiler compiler;
  final TreeElements elements;
  Node lastSeenNode;
  final Types types;

  Type expectedReturnType;
  ClassElement currentClass;

  Type intType;
  Type doubleType;
  Type boolType;
  Type stringType;
  Type objectType;

  TypeCheckerVisitor(Compiler this.compiler, TreeElements this.elements,
                     Types this.types) {
    intType = lookupType(Types.INT, compiler, types);
    doubleType = lookupType(Types.DOUBLE, compiler, types);
    boolType = lookupType(Types.BOOL, compiler, types);
    stringType = lookupType(Types.STRING, compiler, types);
    objectType = lookupType(Types.OBJECT, compiler, types);
  }

  Type fail(node, [reason]) {
    String message = 'cannot type-check';
    if (reason !== null) {
      message = '$message: $reason';
    }
    throw new CancelTypeCheckException(node, message);
  }

  reportTypeWarning(Node node, MessageKind kind, [List arguments = const []]) {
    compiler.reportWarning(node, new TypeWarning(kind, arguments));
  }

  Type analyzeNonVoid(Node node) {
    Type type = analyze(node);
    if (type == types.voidType) {
      reportTypeWarning(node, MessageKind.VOID_EXPRESSION);
    }
    return type;
  }

  Type analyzeWithDefault(Node node, Type defaultValue) {
    return node !== null ? analyze(node) : defaultValue;
  }

  Type analyze(Node node) {
    if (node == null) {
      final String error = 'internal error: unexpected node: null';
      if (lastSeenNode != null) {
        fail(null, error);
      } else {
        compiler.cancel(error);
      }
    } else {
      lastSeenNode = node;
    }
    Type result = node.accept(this);
    // TODO(karlklose): record type?
    return result;
  }

  /**
   * Check if a value of type t can be assigned to a variable,
   * parameter or return value of type s.
   */
  checkAssignable(Node node, Type s, Type t) {
    if (!types.isAssignable(s, t)) {
      reportTypeWarning(node, MessageKind.NOT_ASSIGNABLE, [s, t]);
    }
  }

  checkCondition(Expression condition) {
    checkAssignable(condition, boolType, analyze(condition));
  }

  Type visitBlock(Block node) {
    return analyze(node.statements);
  }

  Type visitClassNode(ClassNode node) {
    fail(node);
  }

  Type visitDoWhile(DoWhile node) {
    StatementType bodyType = analyze(node.body);
    checkCondition(node.condition);
    return bodyType.join(StatementType.NOT_RETURNING);
  }

  Type visitExpressionStatement(ExpressionStatement node) {
    analyze(node.expression);
    return StatementType.NOT_RETURNING;
  }

  /** Dart Programming Language Specification: 11.5.1 For Loop */
  Type visitFor(For node) {
    analyzeWithDefault(node.initializer, StatementType.NOT_RETURNING);
    checkCondition(node.condition);
    analyzeWithDefault(node.update, StatementType.NOT_RETURNING);
    StatementType bodyType = analyze(node.body);
    return bodyType.join(StatementType.NOT_RETURNING);
  }

  Type visitFunctionExpression(FunctionExpression node) {
    final FunctionElement element = elements[node];
    FunctionType functionType = computeType(element);
    Type returnType = functionType.returnType;
    Type previous = expectedReturnType;
    expectedReturnType = returnType;
    if (element.isMember()) currentClass = element.enclosingElement;
    StatementType bodyType = analyze(node.body);
    if (returnType != types.voidType && returnType != types.dynamicType
        && bodyType != StatementType.RETURNING) {
      MessageKind kind;
      if (bodyType == StatementType.MAYBE_RETURNING) {
        kind = MessageKind.MAYBE_MISSING_RETURN;
      } else {
        kind = MessageKind.MISSING_RETURN;
      }
      reportTypeWarning(node.name, kind);
    }
    expectedReturnType = previous;
    return functionType;
  }

  Type visitIdentifier(Identifier node) {
    if (node.isThis()) {
      return currentClass.computeType(compiler);
    } else {
      fail(node, 'internal error: unexpected identifier');
    }
  }

  Type visitIf(If node) {
    checkCondition(node.condition);
    StatementType thenType = analyze(node.thenPart);
    StatementType elseType = node.hasElsePart ? analyze(node.elsePart)
                                              : StatementType.NOT_RETURNING;
    return thenType.join(elseType);
  }

  Type visitLoop(Loop node) {
    fail(node, 'internal error');
  }

  Type lookupMethodType(Node node, ClassElement classElement,
                        SourceString name) {
    Element member = classElement.lookupLocalMember(name);
    if (member !== null && member.kind == ElementKind.FUNCTION) {
      return computeType(member);
    }
    reportTypeWarning(node, MessageKind.METHOD_NOT_FOUND,
                      [classElement.name, name]);
    return types.dynamicType;
  }

  Link<Type> analyzeArguments(Link<Node> arguments) {
    LinkBuilder<Type> builder = new LinkBuilder<Type>();
    while(!arguments.isEmpty()) {
      builder.addLast(analyze(arguments.head));
      arguments = arguments.tail;
    }
    return builder.toLink();
  }

  Type visitSend(Send node) {
    if (Elements.isClosureSend(node, elements)) {
      // TODO(karlklose): Finish implementation.
      return types.dynamicType;
    }

    Identifier selector = node.selector.asIdentifier();
    String name = selector.source.stringValue;

    if (node.isOperator) {
      final Node firstArgument = node.receiver;
      final Type firstArgumentType = analyze(node.receiver);
      final arguments = node.arguments;
      final Node secondArgument = arguments.isEmpty() ? null : arguments.head;
      final Type secondArgumentType = analyzeWithDefault(secondArgument, null);

      if (name === '+' || name === '=' || name === '-'
          || name === '*' || name === '/' || name === '%'
          || name === '~/' || name === '|' || name ==='&'
          || name === '^' || name === '~'|| name === '<<'
          || name === '>>' || name === '[]') {
        return types.dynamicType;
      } else if (name === '<' || name === '>' || name === '<='
                 || name === '>=' || name === '==' || name === '!='
                 || name === '===' || name === '!==') {
        return boolType;
      } else if (name === '||' || name === '&&' || name === '!') {
        checkAssignable(firstArgument, boolType, firstArgumentType);
        if (!arguments.isEmpty()) {
          // TODO(karlklose): check number of arguments in validator.
          checkAssignable(secondArgument, boolType, secondArgumentType);
        }
        return boolType;
      } else if (name === 'is') {
        return boolType;
      }
      fail(selector, 'unexpected operator ${name}');

    } else if (node.isPropertyAccess) {
      if (node.receiver !== null) fail(node, 'cannot handle fields');
      Element element = elements[node];
      if (element === null) fail(node.selector, 'unresolved property');
      return element.computeType(compiler);

    } else if (node.isFunctionObjectInvocation) {
      fail(node.receiver, 'function object invocation unimplemented');

    } else {
      Link<Type> argumentTypes = analyzeArguments(node.arguments);
      FunctionType funType;
      if (node.receiver !== null) {
        Type receiverType = analyze(node.receiver);
        if (receiverType === types.dynamicType) return types.dynamicType;
        if (receiverType === null) {
          fail(node.receiver, 'receivertype is null');
        }
        ClassElement classElement = receiverType.element;
        // TODO(karlklose): substitute type arguments.
        Type memberType = lookupMethodType(node, classElement, selector.source);
        if (memberType === types.dynamicType) return types.dynamicType;
        if (memberType is !FunctionType) {
          fail(node, 'can only handle function types');
        }
        funType = memberType;
      } else {
        Element element = elements[node];
        if (element.kind === ElementKind.FUNCTION) {
          funType = element.computeType(compiler);
        } else if (element.kind === ElementKind.FOREIGN) {
          return types.dynamicType;
        } else {
          fail(node, 'unexpected element kind ${element.kind}');
        }
      }
      Link<Type> parameterTypes = funType.parameterTypes;
      Link<Node> argumentNodes = node.arguments;
      while (!argumentTypes.isEmpty() && !parameterTypes.isEmpty()) {
        checkAssignable(argumentNodes.head, parameterTypes.head,
                        argumentTypes.head);
        argumentTypes = argumentTypes.tail;
        parameterTypes = parameterTypes.tail;
        argumentNodes = argumentNodes.tail;
      }
      if (!argumentTypes.isEmpty()) {
        reportTypeWarning(argumentNodes.head, MessageKind.ADDITIONAL_ARGUMENT);
      } else if (!parameterTypes.isEmpty()) {
        reportTypeWarning(node, MessageKind.MISSING_ARGUMENT,
                          [parameterTypes.head]);
      }
      return funType.returnType;
    }
  }

  visitSendSet(SendSet node) {
    Identifier selector = node.selector;
    final name = node.assignmentOperator.source.stringValue;
    if (name === '++' || name === '--') {
      final Element element = elements[node.selector];
      final Type receiverType = computeType(element);
      // TODO(karlklose): this should be the return type instead of int.
      return node.isPrefix ? intType : receiverType;
    } else {
      Type targetType = computeType(elements[node]);
      Node value = node.arguments.head;
      checkAssignable(value, targetType, analyze(value));
      return targetType;
    }
  }

  Type visitLiteralInt(LiteralInt node) {
    return intType;
  }

  Type visitLiteralDouble(LiteralDouble node) {
    return doubleType;
  }

  Type visitLiteralBool(LiteralBool node) {
    return boolType;
  }

  Type visitLiteralString(LiteralString node) {
    return stringType;
  }

  Type visitLiteralNull(LiteralNull node) {
    return types.dynamicType;
  }

  Type visitNewExpression(NewExpression node) {
    return analyze(node.send.selector);
  }

  Type visitLiteralList(LiteralList node) {
    fail(node, 'unimplemented');
  }

  Type visitNodeList(NodeList node) {
    Type type = StatementType.NOT_RETURNING;
    bool reportedDeadCode = false;
    for (Link<Node> link = node.nodes; !link.isEmpty(); link = link.tail) {
      Type nextType = analyze(link.head);
      if (type == StatementType.RETURNING) {
        if (!reportedDeadCode) {
          reportTypeWarning(link.head, MessageKind.UNREACHABLE_CODE);
          reportedDeadCode = true;
        }
      } else if (type == StatementType.MAYBE_RETURNING){
        if (nextType == StatementType.RETURNING) {
          type = nextType;
        }
      } else {
        type = nextType;
      }
    }
    return type;
  }

  Type visitOperator(Operator node) {
    fail(node, 'internal error');
  }

  /** Dart Programming Language Specification: 11.10 Return */
  Type visitReturn(Return node) {
    final expression = node.expression;
    final isVoidFunction = (expectedReturnType === types.voidType);

    // Executing a return statement return e; [...] It is a static type warning
    // if the type of e may not be assigned to the declared return type of the
    // immediately enclosing function.
    if (expression !== null) {
      final expressionType = analyze(expression);
      if (isVoidFunction
          && !types.isAssignable(expressionType, types.voidType)) {
        reportTypeWarning(expression, MessageKind.RETURN_VALUE_IN_VOID,
                          [expressionType]);
      } else {
        checkAssignable(expression, expectedReturnType, expressionType);
      }

    // Let f be the function immediately enclosing a return statement of the
    // form 'return;' It is a static warning if both of the following conditions
    // hold:
    // - f is not a generative constructor.
    // - The return type of f may not be assigned to void.
    } else if (!types.isAssignable(expectedReturnType, types.voidType)) {
      reportTypeWarning(node, MessageKind.RETURN_NOTHING, [expectedReturnType]);
    }
    return StatementType.RETURNING;
  }

  Type visitThrow(Throw node) {
    if (node.expression !== null) analyze(node.expression);
    return StatementType.RETURNING;
  }

  Type computeType(Element element) {
    if (element === null) return types.dynamicType;
    return element.computeType(compiler);
  }

  Type visitTypeAnnotation(TypeAnnotation node) {
    if (node.typeName === null) return types.dynamicType;
    Identifier identifier = node.typeName.asIdentifier();
    if (identifier === null) {
      fail(node.typeName, 'library prefix not implemented');
    }
    // TODO(ahe): Why wasn't this resolved by the resolver?
    Type type = lookupType(identifier.source, compiler, types);
    if (type === null) {
      // The type name cannot be resolved, but the resolver
      // already gave a warning, so we continue checking.
      return types.dynamicType;
    }
    return type;
  }

  Type visitVariableDefinitions(VariableDefinitions node) {
    Type type = analyzeWithDefault(node.type, types.dynamicType);
    if (type == types.voidType) {
      reportTypeWarning(node.type, MessageKind.VOID_VARIABLE);
      type = types.dynamicType;
    }
    for (Link<Node> link = node.definitions.nodes; !link.isEmpty();
         link = link.tail) {
      Node initialization = link.head;
      compiler.ensure(initialization is Identifier
                      || initialization is Send);
      if (initialization is Send) {
        Type initializer = analyzeNonVoid(link.head);
        checkAssignable(node, type, initializer);
      }
    }
    return StatementType.NOT_RETURNING;
  }

  Type visitWhile(While node) {
    checkCondition(node.condition);
    StatementType bodyType = analyze(node.body);
    return bodyType.join(StatementType.NOT_RETURNING);
  }

  Type visitParenthesizedExpression(ParenthesizedExpression node) {
    return analyze(node.expression);
  }

  Type visitConditional(Conditional node) {
    checkCondition(node.condition);
    Type thenType = analyzeNonVoid(node.thenExpression);
    Type elseType = analyzeNonVoid(node.elseExpression);
    if (types.isSubtype(thenType, elseType)) {
      return thenType;
    } else if (types.isSubtype(elseType, thenType)) {
      return elseType;
    } else {
      return objectType;
    }
  }

  Type visitModifiers(Modifiers node) {}

  visitStringInterpolation(StringInterpolation node) {
    node.visitChildren(this);
    return stringType;
  }

  visitStringInterpolationPart(StringInterpolationPart node) {
    node.visitChildren(this);
  }

  visitEmptyStatement(EmptyStatement node) {
    return StatementType.NOT_RETURNING;
  }

  visitBreakStatement(BreakStatement node) {
    compiler.unimplemented('visitBreakStatement', node: node);
  }

  visitContinueStatement(ContinueStatement node) {
    compiler.unimplemented('visitContinueStatement', node: node);
  }

  visitForInStatement(ForInStatement node) {
    node.visitChildren(this);
  }

  visitLabelledStatement(LabelledStatement node) {
    compiler.unimplemented('visitLabelledStatement', node: node);
  }

  visitLiteralMap(LiteralMap node) {
    compiler.unimplemented('visitLiteralMap', node: node);
  }

  visitLiteralMapEntry(LiteralMapEntry node) {
    compiler.unimplemented('visitLiteralMapEntry', node: node);
  }

  visitNamedArgument(NamedArgument node) {
    compiler.unimplemented('visitNamedArgument', node: node);
  }

  visitSwitchStatement(SwitchStatement node) {
    compiler.unimplemented('visitSwitchStatement', node: node);
  }

  visitTryStatement(TryStatement node) {
    compiler.unimplemented('visitTryStatement', node: node);
  }

  visitScriptTag(ScriptTag node) {
    compiler.unimplemented('visitScriptTag', node: node);
  }

  visitCatchBlock(CatchBlock node) {
    compiler.unimplemented('visitCatchBlock', node: node);
  }

  visitTypedef(Typedef node) {
    compiler.unimplemented('visitTypedef', node: node);
  }
}
