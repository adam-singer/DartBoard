// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

interface HVisitor<R> {
  R visitAdd(HAdd node);
  R visitBailoutTarget(HBailoutTarget node);
  R visitBitAnd(HBitAnd node);
  R visitBitNot(HBitNot node);
  R visitBitOr(HBitOr node);
  R visitBitXor(HBitXor node);
  R visitBoolify(HBoolify node);
  R visitBoundsCheck(HBoundsCheck node);
  R visitDivide(HDivide node);
  R visitEquals(HEquals node);
  R visitExit(HExit node);
  R visitForeign(HForeign node);
  R visitForeignNew(HForeignNew);
  R visitGoto(HGoto node);
  R visitGreater(HGreater node);
  R visitGreaterEqual(HGreaterEqual node);
  R visitIdentity(HIdentity node);
  R visitIf(HIf node);
  R visitIndex(HIndex node);
  R visitIndexAssign(HIndexAssign node);
  R visitIntegerCheck(HIntegerCheck node);
  R visitInvokeClosure(HInvokeClosure node);
  R visitInvokeDynamicGetter(HInvokeDynamicGetter node);
  R visitInvokeDynamicMethod(HInvokeDynamicMethod node);
  R visitInvokeDynamicSetter(HInvokeDynamicSetter node);
  R visitInvokeInterceptor(HInvokeInterceptor node);
  R visitInvokeStatic(HInvokeStatic node);
  R visitInvokeSuper(HInvokeSuper node);
  R visitIs(HIs node);
  R visitLess(HLess node);
  R visitLessEqual(HLessEqual node);
  R visitLiteral(HLiteral node);
  R visitLiteralList(HLiteralList node);
  R visitLoad(HLoad node);
  R visitLocal(HLocal node);
  R visitLogicalOperator(HLogicalOperator node);
  R visitLoopBranch(HLoopBranch node);
  R visitModulo(HModulo node);
  R visitMultiply(HMultiply node);
  R visitNegate(HNegate node);
  R visitNot(HNot node);
  R visitParameterValue(HParameterValue node);
  R visitPhi(HPhi node);
  R visitReturn(HReturn node);
  R visitShiftLeft(HShiftLeft node);
  R visitShiftRight(HShiftRight node);
  R visitStatic(HStatic node);
  R visitStaticStore(HStaticStore node);
  R visitStore(HStore node);
  R visitSubtract(HSubtract node);
  R visitThis(HThis node);
  R visitThrow(HThrow node);
  R visitTruncatingDivide(HTruncatingDivide node);
  R visitTypeGuard(HTypeGuard node);
}

class HGraphVisitor {
  visitDominatorTree(HGraph graph) {
    void visitBasicBlockAndSuccessors(HBasicBlock block) {
      visitBasicBlock(block);
      List dominated = block.dominatedBlocks;
      for (int i = 0; i < dominated.length; i++) {
        visitBasicBlockAndSuccessors(dominated[i]);
      }
    }

    visitBasicBlockAndSuccessors(graph.entry);
  }

  visitPostDominatorTree(HGraph graph) {
    void visitBasicBlockAndSuccessors(HBasicBlock block) {
      List dominated = block.dominatedBlocks;
      for (int i = dominated.length - 1; i >= 0; i--) {
        visitBasicBlockAndSuccessors(dominated[i]);
      }
      visitBasicBlock(block);
    }

    visitBasicBlockAndSuccessors(graph.entry);
  }

  abstract visitBasicBlock(HBasicBlock block);
}

class HInstructionVisitor extends HGraphVisitor {
  HBasicBlock currentBlock;

  abstract visitInstruction(HInstruction node);

  visitBasicBlock(HBasicBlock node) {
    void visitInstructionList(HInstructionList list) {
      HInstruction instruction = list.first;
      while (instruction !== null) {
        visitInstruction(instruction);
        instruction = instruction.next;
        assert(instruction != list.first);
      }
    }

    currentBlock = node;
    visitInstructionList(node);
  }
}

class HGraph {
  HBasicBlock entry;
  HBasicBlock exit;
  final List<HBasicBlock> blocks;

  HGraph() : blocks = new List<HBasicBlock>() {
    entry = addNewBlock();
    // The exit block will be added later, so it has an id that is
    // after all others in the system.
    exit = new HBasicBlock();
  }

  void addBlock(HBasicBlock block) {
    int id = blocks.length;
    block.id = id;
    blocks.add(block);
    assert(blocks[id] === block);
  }

  HBasicBlock addNewBlock() {
    HBasicBlock result = new HBasicBlock();
    addBlock(result);
    return result;
  }

  HBasicBlock addNewLoopHeaderBlock() {
    HBasicBlock result = addNewBlock();
    result.loopInformation = new HLoopInformation(result);
    return result;
  }

  void finalize() {
    addBlock(exit);
    exit.open();
    exit.close(new HExit());
    assignDominators();
  }

  void assignDominators() {
    // Run through the blocks in order of increasing ids so we are
    // guaranteed that we have computed dominators for all blocks
    // higher up in the dominator tree.
    for (int i = 0, length = blocks.length; i < length; i++) {
      HBasicBlock block = blocks[i];
      List<HBasicBlock> predecessors = block.predecessors;
      if (block.isLoopHeader()) {
        assert(predecessors.length >= 2);
        block.assignCommonDominator(predecessors[0]);
      } else {
        for (int j = predecessors.length - 1; j >= 0; j--) {
          block.assignCommonDominator(predecessors[j]);
        }
      }
    }
  }

  bool isValid() {
    HValidator validator = new HValidator();
    validator.visitGraph(this);
    return validator.isValid;
  }
}

class HBaseVisitor extends HGraphVisitor implements HVisitor {
  HBasicBlock currentBlock;

  visitBasicBlock(HBasicBlock node) {
    currentBlock = node;

    HInstruction instruction = node.first;
    while (instruction !== null) {
      instruction.accept(this);
      instruction = instruction.next;
    }
  }

  visitInstruction(HInstruction instruction) {}

  visitBinaryArithmetic(HBinaryArithmetic node) => visitInvokeBinary(node);
  visitBinaryBitOp(HBinaryBitOp node) => visitBinaryArithmetic(node);
  visitInvoke(HInvoke node) => visitInstruction(node);
  visitInvokeBinary(HInvokeBinary node) => visitInvokeStatic(node);
  visitInvokeDynamic(HInvokeDynamic node) => visitInvoke(node);
  visitInvokeDynamicField(HInvokeDynamicField node) => visitInvokeDynamic(node);
  visitInvokeUnary(HInvokeUnary node) => visitInvokeStatic(node);
  visitConditionalBranch(HConditionalBranch node) => visitControlFlow(node);
  visitControlFlow(HControlFlow node) => visitInstruction(node);
  visitRelational(HRelational node) => visitInvokeBinary(node);

  visitAdd(HAdd node) => visitBinaryArithmetic(node);
  visitBitAnd(HBitAnd node) => visitBinaryBitOp(node);
  visitBitNot(HBitNot node) => visitInvokeUnary(node);
  visitBitOr(HBitOr node) => visitBinaryBitOp(node);
  visitBitXor(HBitXor node) => visitBinaryBitOp(node);
  visitBailoutTarget(HBailoutTarget node) => visitInstruction(node);
  visitBoolify(HBoolify node) => visitInstruction(node);
  visitBoundsCheck(HBoundsCheck node) => visitCheck(node);
  visitCheck(HCheck node) => visitInstruction(node);
  visitDivide(HDivide node) => visitBinaryArithmetic(node);
  visitEquals(HEquals node) => visitRelational(node);
  visitExit(HExit node) => visitControlFlow(node);
  visitForeign(HForeign node) => visitInstruction(node);
  visitForeignNew(HForeignNew node) => visitForeign(node);
  visitGoto(HGoto node) => visitControlFlow(node);
  visitGreater(HGreater node) => visitRelational(node);
  visitGreaterEqual(HGreaterEqual node) => visitRelational(node);
  visitIdentity(HIdentity node) => visitRelational(node);
  visitIf(HIf node) => visitConditionalBranch(node);
  visitIndex(HIndex node) => visitInvokeStatic(node);
  visitIndexAssign(HIndexAssign node) => visitInvokeStatic(node);
  visitIntegerCheck(HIntegerCheck node) => visitCheck(node);
  visitInvokeClosure(HInvokeClosure node)
      => visitInvokeDynamic(node);
  visitInvokeDynamicMethod(HInvokeDynamicMethod node)
      => visitInvokeDynamic(node);
  visitInvokeDynamicGetter(HInvokeDynamicGetter node)
      => visitInvokeDynamicField(node);
  visitInvokeDynamicSetter(HInvokeDynamicSetter node)
      => visitInvokeDynamicField(node);
  visitInvokeInterceptor(HInvokeInterceptor node)
      => visitInvokeStatic(node);
  visitInvokeStatic(HInvokeStatic node) => visitInvoke(node);
  visitInvokeSuper(HInvokeSuper node) => visitInvoke(node);
  visitLess(HLess node) => visitRelational(node);
  visitLessEqual(HLessEqual node) => visitRelational(node);
  visitLoad(HLoad node) => visitInstruction(node);
  visitLocal(HLocal node) => visitInstruction(node);
  visitLogicalOperator(HLogicalOperator node) => visitInstruction(node);
  visitLiteral(HLiteral node) => visitInstruction(node);
  visitLiteralList(HLiteralList node) => visitInstruction(node);
  visitLoopBranch(HLoopBranch node) => visitConditionalBranch(node);
  visitModulo(HModulo node) => visitBinaryArithmetic(node);
  visitNegate(HNegate node) => visitInvokeUnary(node);
  visitNot(HNot node) => visitInstruction(node);
  visitPhi(HPhi node) => visitInstruction(node);
  visitMultiply(HMultiply node) => visitBinaryArithmetic(node);
  visitParameterValue(HParameterValue node) => visitInstruction(node);
  visitReturn(HReturn node) => visitControlFlow(node);
  visitShiftRight(HShiftRight node) => visitBinaryBitOp(node);
  visitShiftLeft(HShiftLeft node) => visitBinaryBitOp(node);
  visitSubtract(HSubtract node) => visitBinaryArithmetic(node);
  visitStatic(HStatic node) => visitInstruction(node);
  visitStaticStore(HStaticStore node) => visitInstruction(node);
  visitStore(HStore node) => visitInstruction(node);
  visitThis(HThis node) => visitParameterValue(node);
  visitThrow(HThrow node) => visitControlFlow(node);
  visitTruncatingDivide(HTruncatingDivide node) => visitBinaryArithmetic(node);
  visitTypeGuard(HTypeGuard node) => visitInstruction(node);
  visitIs(HIs node) => visitInstruction(node);
}

class HInstructionList {
  HInstruction first = null;
  HInstruction last = null;

  bool isEmpty() {
    return first === null;
  }

  void addAfter(HInstruction cursor, HInstruction instruction) {
    if (cursor === null) {
      assert(isEmpty());
      first = last = instruction;
    } else if (cursor === last) {
      last.next = instruction;
      instruction.previous = last;
      last = instruction;
    } else {
      instruction.previous = cursor;
      instruction.next = cursor.next;
      cursor.next.previous = instruction;
      cursor.next = instruction;
    }
  }

  void addBefore(HInstruction cursor, HInstruction instruction) {
    if (cursor === null) {
      assert(isEmpty());
      first = last = instruction;
    } else if (cursor === first) {
      first.previous = instruction;
      instruction.next = first;
      first = instruction;
    } else {
      instruction.next = cursor;
      instruction.previous = cursor.previous;
      cursor.previous.next = instruction;
      cursor.previous = instruction;
    }
  }

  void detach(HInstruction instruction) {
    assert(contains(instruction));
    assert(instruction.isInBasicBlock());
    if (instruction.previous === null) {
      first = instruction.next;
    } else {
      instruction.previous.next = instruction.next;
    }
    if (instruction.next === null) {
      last = instruction.previous;
    } else {
      instruction.next.previous = instruction.previous;
    }
    instruction.previous = null;
    instruction.next = null;
  }

  void remove(HInstruction instruction) {
    assert(instruction.usedBy.isEmpty());
    detach(instruction);
  }

  /** Linear search for [instruction]. */
  bool contains(HInstruction instruction) {
    HInstruction cursor = first;
    while (cursor != null) {
      if (cursor === instruction) return true;
      cursor = cursor.next;
    }
    return false;
  }
}

class HBasicBlock extends HInstructionList {
  // The [id] must be such that any successor's id is greater than
  // this [id]. The exception are back-edges.
  int id;

  static final int STATUS_NEW = 0;
  static final int STATUS_OPEN = 1;
  static final int STATUS_CLOSED = 2;
  int status = STATUS_NEW;

  HInstructionList phis;

  HLoopInformation loopInformation = null;
  HBasicBlock parentLoopHeader = null;
  List<HBailoutTarget> bailouts;

  final List<HBasicBlock> predecessors;
  List<HBasicBlock> successors;

  HBasicBlock dominator = null;
  final List<HBasicBlock> dominatedBlocks;

  HBasicBlock() : this.withId(null);
  HBasicBlock.withId(this.id)
      : phis = new HInstructionList(),
        predecessors = <HBasicBlock>[],
        successors = const <HBasicBlock>[],
        dominatedBlocks = <HBasicBlock>[],
        bailouts = <HBailoutTarget>[];

  bool isNew() => status == STATUS_NEW;
  bool isOpen() => status == STATUS_OPEN;
  bool isClosed() => status == STATUS_CLOSED;

  bool isLoopHeader() => loopInformation !== null;
  bool hasBailouts() => !bailouts.isEmpty();

  void open() {
    assert(isNew());
    status = STATUS_OPEN;
  }

  void close(HControlFlow end) {
    assert(isOpen());
    addAfter(last, end);
    status = STATUS_CLOSED;
  }

  // TODO(kasperl): I really don't want to pass the compiler into this
  // method. Maybe we need a better logging framework.
  void printToCompiler(Compiler compiler) {
    HInstruction instruction = first;
    while (instruction != null) {
      var id = instruction.id;
      compiler.log('$id: $instruction ${instruction.inputsToString()}');
      instruction = instruction.next;
    }
  }

  void addAtEntry(HInstruction instruction) {
    assert(isClosed());
    assert(instruction is !HPhi);
    super.addBefore(first, instruction);
    instruction.notifyAddedToBlock(this);
  }

  void addAtExit(HInstruction instruction) {
    assert(isClosed());
    assert(last is HControlFlow);
    assert(instruction is !HPhi);
    super.addBefore(last, instruction);
    instruction.notifyAddedToBlock(this);
  }

  void moveAtExit(HInstruction instruction) {
    assert(instruction is !HPhi);
    assert(instruction.isInBasicBlock());
    assert(isClosed());
    assert(last is HControlFlow);
    super.addBefore(last, instruction);
    instruction.block = this;
    assert(isValid());
  }

  void add(HInstruction instruction) {
    assert(instruction is !HControlFlow);
    assert(instruction is !HPhi);
    super.addAfter(last, instruction);
    instruction.notifyAddedToBlock(this);
  }

  void addPhi(HPhi phi) {
    phis.addAfter(phis.last, phi);
    phi.notifyAddedToBlock(this);
  }

  void removePhi(HPhi phi) {
    phis.remove(phi);
    phi.notifyRemovedFromBlock(this);
  }

  void addAfter(HInstruction cursor, HInstruction instruction) {
    assert(cursor is !HPhi);
    assert(instruction is !HPhi);
    assert(isOpen() || isClosed());
    super.addAfter(cursor, instruction);
    instruction.notifyAddedToBlock(this);
  }

  void addBefore(HInstruction cursor, HInstruction instruction) {
    assert(cursor is !HPhi);
    assert(instruction is !HPhi);
    assert(isOpen() || isClosed());
    super.addBefore(cursor, instruction);
    instruction.notifyAddedToBlock(this);
  }

  void remove(HInstruction instruction) {
    assert(isOpen() || isClosed());
    assert(instruction is !HPhi);
    super.remove(instruction);
    instruction.notifyRemovedFromBlock(this);
  }

  void addSuccessor(HBasicBlock block) {
    // Forward branches are only allowed to new blocks.
    assert(isClosed() && (block.isNew() || block.id < id));
    if (successors.isEmpty()) {
      successors = [block];
    } else {
      successors.add(block);
    }
    block.predecessors.add(this);
  }

  void postProcessLoopHeader() {
    assert(isLoopHeader());
    // Only the first entry into the loop is from outside the
    // loop. All other entries must be back edges.
    for (int i = 1, length = predecessors.length; i < length; i++) {
      loopInformation.addBackEdge(predecessors[i]);
    }
  }

  /**
   * Rewrites all uses of the [from] instruction to using the [to]
   * instruction instead.
   */
  void rewrite(HInstruction from, HInstruction to) {
    for (HInstruction use in from.usedBy) {
      rewriteInput(use, from, to);
    }
    to.usedBy.addAll(from.usedBy);
    from.usedBy.clear();
  }

  static void rewriteInput(HInstruction instruction,
                           HInstruction from,
                           HInstruction to) {
    List inputs = instruction.inputs;
    for (int i = 0; i < inputs.length; i++) {
      if (inputs[i] === from) inputs[i] = to;
    }
  }

  bool isExitBlock() {
    return first === last && first is HExit;
  }

  void addDominatedBlock(HBasicBlock block) {
    assert(isClosed());
    assert(id !== null && block.id !== null);
    assert(dominatedBlocks.indexOf(block) < 0);
    // Keep the list of dominated blocks sorted such that if there are two
    // succeeding blocks in the list, the predecessor is before the successor.
    // Assume that we add the dominated blocks in the right order.
    int index = dominatedBlocks.length;
    while (index > 0 && dominatedBlocks[index - 1].id > block.id) {
      index--;
    }
    if (index == dominatedBlocks.length) {
      dominatedBlocks.add(block);
    } else {
      dominatedBlocks.insertRange(index, 1, block);
    }
    assert(block.dominator === null);
    block.dominator = this;
  }

  void removeDominatedBlock(HBasicBlock block) {
    assert(isClosed());
    assert(id !== null && block.id !== null);
    int index = dominatedBlocks.indexOf(block);
    assert(index >= 0);
    if (index == dominatedBlocks.length - 1) {
      dominatedBlocks.removeLast();
    } else {
      dominatedBlocks.removeRange(index, 1);
    }
    assert(block.dominator === this);
    block.dominator = null;
  }

  void assignCommonDominator(HBasicBlock predecessor) {
    assert(isClosed());
    if (dominator === null) {
      // If this basic block doesn't have a dominator yet we use the
      // given predecessor as the dominator.
      predecessor.addDominatedBlock(this);
    } else if (predecessor.dominator !== null) {
      // If the predecessor has a dominator and this basic block has a
      // dominator, we find a common parent in the dominator tree and
      // use that as the dominator.
      HBasicBlock first = dominator;
      HBasicBlock second = predecessor;
      while (first !== second) {
        if (first.id > second.id) {
          first = first.dominator;
        } else {
          second = second.dominator;
        }
        assert(first !== null && second !== null);
      }
      if (dominator !== first) {
        dominator.removeDominatedBlock(this);
        first.addDominatedBlock(this);
      }
    }
  }

  void forEachPhi(void f(HPhi phi)) {
    HPhi current = phis.first;
    while (current !== null) {
      f(current);
      current = current.next;
    }
  }

  bool isValid() {
    assert(isClosed());
    HValidator validator = new HValidator();
    validator.visitBasicBlock(this);
    return validator.isValid;
  }
}

class HLoopInformation {
  final HBasicBlock header;
  final List<HBasicBlock> blocks;
  final List<HBasicBlock> backEdges;

  HLoopInformation(this.header)
      : blocks = new List<HBasicBlock>(),
        backEdges = new List<HBasicBlock>();

  void addBackEdge(HBasicBlock predecessor) {
    backEdges.add(predecessor);
    addBlock(predecessor);
  }

  // Adds a block and transitively all its predecessors in the loop as
  // loop blocks.
  void addBlock(HBasicBlock block) {
    if (block === header) return;
    HBasicBlock parentHeader = block.parentLoopHeader;
    if (parentHeader === header) {
      // Nothing to do in this case.
    } else if (parentHeader !== null) {
      addBlock(parentHeader);
    } else {
      block.parentLoopHeader = header;
      blocks.add(block);
      for (int i = 0, length = block.predecessors.length; i < length; i++) {
        addBlock(block.predecessors[i]);
      }
    }
  }

  HBasicBlock getLastBackEdge() {
    int maxId = -1;
    HBasicBlock result = null;
    for (int i = 0, length = backEdges.length; i < length; i++) {
      HBasicBlock current = backEdges[i];
      if (current.id > maxId) {
        maxId = current.id;
        result = current;
      }
    }
    return result;
  }
}

class HType {
  final int flag;
  const HType(int this.flag);

  static final int FLAG_CONFLICTING = 0;
  static final int FLAG_UNKNOWN = 1;
  static final int FLAG_BOOLEAN = FLAG_UNKNOWN << 1;
  static final int FLAG_INTEGER = FLAG_BOOLEAN << 1;
  static final int FLAG_STRING = FLAG_INTEGER << 1;
  static final int FLAG_ARRAY = FLAG_STRING << 1;
  static final int FLAG_DOUBLE = FLAG_ARRAY << 1;

  static final HType CONFLICTING = const HType(FLAG_CONFLICTING);
  static final HType UNKNOWN = const HType(FLAG_UNKNOWN);
  static final HType BOOLEAN = const HType(FLAG_BOOLEAN);
  static final HType STRING = const HType(FLAG_STRING);
  static final HType ARRAY = const HType(FLAG_ARRAY);
  static final HType INTEGER = const HType(FLAG_INTEGER);
  static final HType DOUBLE = const HType(FLAG_DOUBLE);
  static final HType STRING_OR_ARRAY = const HType(FLAG_STRING | FLAG_ARRAY);
  static final HType NUMBER = const HType(FLAG_DOUBLE | FLAG_INTEGER);

  bool isConflicting() => this === CONFLICTING;
  bool isUnknown() => this === UNKNOWN;
  bool isBoolean() => this === BOOLEAN;
  bool isInteger() => this === INTEGER;
  bool isString() => this === STRING;
  bool isArray() => this === ARRAY;
  bool isNumber() => (this.flag & (FLAG_INTEGER | FLAG_DOUBLE)) != 0;
  bool isStringOrArray() => (this.flag & (FLAG_STRING | FLAG_ARRAY)) != 0;
  bool isKnown() => this !== UNKNOWN && this !== CONFLICTING;

  static HType getTypeFromFlag(int flag) {
    if (flag === CONFLICTING.flag) return CONFLICTING;
    if (flag === UNKNOWN.flag) return UNKNOWN;
    if (flag === BOOLEAN.flag) return BOOLEAN;
    if (flag === INTEGER.flag) return INTEGER;
    if (flag === DOUBLE.flag) return DOUBLE;
    if (flag === STRING.flag) return STRING;
    if (flag === ARRAY.flag) return ARRAY;
    if (flag === NUMBER.flag) return NUMBER;
    if (flag === STRING_OR_ARRAY.flag) return STRING_OR_ARRAY;
    assert(false);
  }

  HType combine(HType other) {
    if (isUnknown()) return other;
    if (other.isUnknown()) return this;
    return getTypeFromFlag(this.flag & other.flag);
  }
}

class HInstruction implements Hashable {
  final int id;
  static int idCounter;

  final List<HInstruction> inputs;
  final List<HInstruction> usedBy;

  HBasicBlock block;
  HInstruction previous = null;
  HInstruction next = null;
  int flags = 0;
  HType type = HType.UNKNOWN;

  // Changes flags.
  static final int FLAG_CHANGES_SOMETHING    = 0;
  static final int FLAG_CHANGES_COUNT        = FLAG_CHANGES_SOMETHING + 1;

  // Depends flags (one for each changes flag).
  static final int FLAG_DEPENDS_ON_SOMETHING = FLAG_CHANGES_COUNT;

  // Other flags.
  static final int FLAG_GENERATE_AT_USE_SITE = FLAG_DEPENDS_ON_SOMETHING + 1;
  static final int FLAG_USE_GVN              = FLAG_GENERATE_AT_USE_SITE + 1;

  HInstruction(this.inputs) : id = idCounter++, usedBy = <HInstruction>[];

  int hashCode() => id;

  bool getFlag(int position) => (flags & (1 << position)) != 0;
  void setFlag(int position) { flags |= (1 << position); }
  void clearFlag(int position) { flags &= ~(1 << position); }

  static int computeDependsOnFlags(int flags) => flags << FLAG_CHANGES_COUNT;

  int getChangesFlags() => flags & ((1 << FLAG_CHANGES_COUNT) - 1);
  bool hasSideEffects() => getChangesFlags() != 0;
  void prepareGvn() { setAllSideEffects(); }

  void setAllSideEffects() { flags |= ((1 << FLAG_CHANGES_COUNT) - 1); }
  void clearAllSideEffects() { flags &= ~((1 << FLAG_CHANGES_COUNT) - 1); }

  bool generateAtUseSite() => getFlag(FLAG_GENERATE_AT_USE_SITE);
  void tryGenerateAtUseSite() { setFlag(FLAG_GENERATE_AT_USE_SITE); }
  void clearGenerateAtUseSite()  { clearFlag(FLAG_GENERATE_AT_USE_SITE); }

  bool useGvn() => getFlag(FLAG_USE_GVN);
  void setUseGvn() { setFlag(FLAG_USE_GVN); }

  bool isArray() => type.isArray();
  bool isBoolean() => type.isBoolean();
  bool isInteger() => type.isInteger();
  bool isNumber() => type.isNumber();
  bool isString() => type.isString();
  bool isTypeUnknown() => type.isUnknown();
  bool isStringOrArray() => type.isStringOrArray();

  // Compute the type of the instruction.
  HType computeType() => HType.UNKNOWN;

  HType computeDesiredType() {
    HType candidateType = HType.UNKNOWN;
    for (final user in usedBy) {
      HType type = user.computeDesiredInputType(this);
      if (candidateType.isUnknown()) {
        candidateType = type;
      } else if (!type.isUnknown() && candidateType != type) {
        candidateType = candidateType.combine(type);
        if (!candidateType.isKnown()) {
          candidateType = HType.UNKNOWN;
          break;
        }
      }
    }
    return candidateType;
  }

  HType computeDesiredInputType(HInstruction input) => HType.UNKNOWN;

  // Returns whether the instruction does produce the type it claims.
  // For most instructions, this returns false. A type guard will be
  // inserted to make sure the users get the right type in.
  bool hasExpectedType() => false;

  // Re-compute and update the type of the instruction. Returns
  // whether or not the type was changed.
  bool updateType() {
    if (type.isConflicting()) return false;
    HType newType = computeType();
    HType desiredType = computeDesiredType();
    HType combined = newType.combine(desiredType);
    if (combined.isKnown()) newType = combined;

    bool changed = (type != newType);
    if (type.isUnknown()) {
      type = newType;
      return changed;
    } else if (changed) {
      type = type.combine(newType);
      return changed;
    }
    return false;
  }

  bool isInBasicBlock() => block !== null;

  String inputsToString() {
    void addAsCommaSeparated(StringBuffer buffer, List<HInstruction> list) {
      for (int i = 0; i < list.length; i++) {
        if (i != 0) buffer.add(', ');
        buffer.add("@${list[i].id}");
      }
    }

    StringBuffer buffer = new StringBuffer();
    buffer.add('(');
    addAsCommaSeparated(buffer, inputs);
    buffer.add(') - used at [');
    addAsCommaSeparated(buffer, usedBy);
    buffer.add(']');
    return buffer.toString();
  }

  bool equals(HInstruction other) {
    assert(useGvn() && other.useGvn());
    // Check that the type and the flags match.
    if (!typeEquals(other)) return false;
    if (flags != other.flags) return false;
    // Check that the inputs match.
    final int inputsLength = inputs.length;
    final List<HInstruction> otherInputs = other.inputs;
    if (inputsLength != otherInputs.length) return false;
    for (int i = 0; i < inputsLength; i++) {
      if (inputs[i] !== otherInputs[i]) return false;
    }
    // Check that the data in the instruction matches.
    return dataEquals(other);
  }

  // These methods should be overwritten by instructions that
  // participate in global value numbering.
  bool typeEquals(HInstruction other) => false;
  bool dataEquals(HInstruction other) => false;

  abstract accept(HVisitor visitor);

  void notifyAddedToBlock(HBasicBlock block) {
    assert(!isInBasicBlock());
    assert(this.block === null);
    // Add [this] to the inputs' uses.
    for (int i = 0; i < inputs.length; i++) {
      assert(inputs[i].isInBasicBlock());
      inputs[i].usedBy.add(this);
    }
    this.block = block;
    assert(isValid());
  }

  void notifyRemovedFromBlock(HBasicBlock block) {
    assert(isInBasicBlock());
    assert(usedBy.isEmpty());
    assert(this.block === block);

    // Remove [this] from the inputs' uses.
    for (int i = 0; i < inputs.length; i++) {
      List inputUsedBy = inputs[i].usedBy;
      for (int j = 0; j < inputUsedBy.length; j++) {
        if (inputUsedBy[j] === this) {
          inputUsedBy[j] = inputUsedBy[inputUsedBy.length - 1];
          inputUsedBy.removeLast();
          break;
        }
      }
    }
    this.block = null;
    assert(isValid());
  }

  bool isLiteralNull() => false;
  bool isLiteralNumber() => false;
  bool isLiteralString() => false;

  bool isValid() {
    HValidator validator = new HValidator();
    validator.currentBlock = block;
    validator.visitInstruction(this);
    return validator.isValid;
  }
}

class HBoolify extends HInstruction {
  HBoolify(HInstruction value) : super(<HInstruction>[value]);
  void prepareGvn() {
    assert(!hasSideEffects());
    setUseGvn();
  }

  HType computeType() => HType.BOOLEAN;
  bool hasExpectedType() => true;

  accept(HVisitor visitor) => visitor.visitBoolify(this);
  bool typeEquals(other) => other is HBoolify;
  bool dataEquals(HInstruction other) => true;
}

class HCheck extends HInstruction {
  HCheck(inputs) : super(inputs);

  // A check should never be generate at use site, otherwise we
  // cannot throw.
  void tryGenerateAtUseSite() {}

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HTypeGuard extends HInstruction {
  // Instruction id of the original guarded instruction.
  final int originalGuardedId;

  HTypeGuard(HType type, List<HInstruction> env, int this.originalGuardedId)
    : super(env) {
    this.type = type;
  }

  void prepareGvn() {
    assert(!hasSideEffects());
    setUseGvn();
  }

  HInstruction get guarded() => inputs.last();

  HType computeType() => type;
  bool hasExpectedType() => true;

  // A type guard should never be generate at use site, otherwise we
  // cannot bailout.
  void tryGenerateAtUseSite() {}

  accept(HVisitor visitor) => visitor.visitTypeGuard(this);
  bool typeEquals(other) => other is HTypeGuard;
  bool dataEquals(HTypeGuard other) => type == other.type;
}

class HBailoutTarget extends HInstruction {
  final int state;
  HBailoutTarget(this.state, inputs) : super(inputs);
  accept(HVisitor visitor) => visitor.visitBailoutTarget(this);
}

class HBoundsCheck extends HCheck {
  HBoundsCheck(length, index) : super(<HInstruction>[length, index]) {
    type = HType.INTEGER;
  }

  HInstruction get length() => inputs[0];
  HInstruction get index() => inputs[1];

  void prepareGvn() {
    assert(!hasSideEffects());
    setUseGvn();
  }

  HType computeType() => HType.INTEGER;
  bool hasExpectedType() => true;

  accept(HVisitor visitor) => visitor.visitBoundsCheck(this);
  bool typeEquals(other) => other is HBoundsCheck;
  bool dataEquals(HInstruction other) => true;
}

class HIntegerCheck extends HCheck {
  HIntegerCheck(value) : super(<HInstruction>[value]);

  HInstruction get value() => inputs[0];

  void prepareGvn() {
    assert(!hasSideEffects());
    setUseGvn();
  }

  HType computeType() => HType.INTEGER;
  bool hasExpectedType() => true;

  accept(HVisitor visitor) => visitor.visitIntegerCheck(this);
  bool typeEquals(other) => other is HIntegerCheck;
  bool dataEquals(HInstruction other) => true;
}

class HConditionalBranch extends HControlFlow {
  HConditionalBranch(inputs) : super(inputs);
  HInstruction get condition() => inputs[0];
  HBasicBlock get trueBranch() => block.successors[0];
  HBasicBlock get falseBranch() => block.successors[1];
  abstract toString();
}

class HControlFlow extends HInstruction {
  HControlFlow(inputs) : super(inputs);
  abstract toString();
}

class HInvoke extends HInstruction {
  /**
    * The first argument must be the target: either an [HStatic] node, or
    * the receiver of a method-call. The remaining inputs are the arguments
    * to the invocation.
    */
  HInvoke(List<HInstruction> inputs) : super(inputs);
  static final int ARGUMENTS_OFFSET = 1;

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HInvokeDynamic extends HInvoke {
  SourceString name;
  HInvokeDynamic(this.name, List<HInstruction> inputs) : super(inputs);
  toString() => 'invoke dynamic: $name';
  HInstruction get receiver() => inputs[0];

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HInvokeClosure extends HInvokeDynamic {
  Element element;
  HInvokeClosure(List<HInstruction> inputs)
    : super(const SourceString('call'), inputs);
  accept(HVisitor visitor) => visitor.visitInvokeClosure(this);
}

class HInvokeDynamicMethod extends HInvokeDynamic {
  HInvokeDynamicMethod(SourceString methodName, List<HInstruction> inputs)
    : super(methodName, inputs);
  toString() => 'invoke dynamic method: $name';
  accept(HVisitor visitor) => visitor.visitInvokeDynamicMethod(this);
}

class HInvokeDynamicField extends HInvokeDynamic {
  Element element;
  HInvokeDynamicField(this.element, name, inputs) : super(name, inputs);
  toString() => 'invoke dynamic field: $name';

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HInvokeDynamicGetter extends HInvokeDynamicField {
  HInvokeDynamicGetter(element, name, receiver)
    : super(element, name, [receiver]);
  toString() => 'invoke dynamic getter: $name';
  accept(HVisitor visitor) => visitor.visitInvokeDynamicGetter(this);
}

class HInvokeDynamicSetter extends HInvokeDynamicField {
  HInvokeDynamicSetter(element, name, receiver, value)
    : super(element, name, [receiver, value]);
  toString() => 'invoke dynamic setter: $name';
  accept(HVisitor visitor) => visitor.visitInvokeDynamicSetter(this);
}

class HInvokeStatic extends HInvoke {
  bool builtin = false;
  /** The first input must be the target. */
  HInvokeStatic(inputs) : super(inputs);
  toString() => 'invoke static: ${element.name}';
  accept(HVisitor visitor) => visitor.visitInvokeStatic(this);
  Element get element() => target.element;
  HStatic get target() => inputs[0];

  HType computeType() {
    if (element.isFactoryConstructor()
        && element.enclosingElement.name.toString() == 'List') {
      builtin = true;
      return HType.ARRAY;
    }
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => builtin;
}

class HInvokeSuper extends HInvokeStatic {
  HInvokeSuper(inputs) : super(inputs);
  toString() => 'invoke super: ${element.name}';
  accept(HVisitor visitor) => visitor.visitInvokeSuper(this);
}

class HInvokeInterceptor extends HInvokeStatic {
  final SourceString name;
  final bool getter;
  String builtinJsName;

  HInvokeInterceptor(SourceString this.name, bool this.getter, inputs)
    : super(inputs);
  toString() => 'invoke interceptor: ${element.name}';
  accept(HVisitor visitor) => visitor.visitInvokeInterceptor(this);

  HType computeType() {
    if (name == const SourceString('length') && inputs[1].isStringOrArray()) {
      builtinJsName = 'length';
      return HType.INTEGER;
    } else if (name == const SourceString('add') && inputs[1].isArray()) {
      builtinJsName = 'push';
    } else if (name == const SourceString('removeLast')
               && inputs[1].isArray()) {
      builtinJsName = 'pop';
    }
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    if (input == inputs[0]) return HType.UNKNOWN;
    if (input == inputs[1] && input.isStringOrArray()) {
      if (name == const SourceString('add')
          || name == const SourceString('removeLast')) {
        return HType.ARRAY;
      }
    }
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => builtinJsName != null;

  HInstruction fold() {
    if (name == const SourceString('length') && inputs[1].isLiteralString()) {
      // TODO(lrn): Account for escapes in string.
    }
    return this;
  }

  void prepareGvn() {
    if (builtinJsName == 'length') {
      assert(!hasSideEffects());
    } else {
      setAllSideEffects();
    }
  }

  bool typeEquals(other) => other is HInvokeInterceptor;
  bool dataEquals(HInvokeInterceptor other) {
    return builtinJsName == other.builtinJsName && name == other.name;
  }
}

class HForeign extends HInstruction {
  final SourceString code;
  final SourceString declaredType;
  HForeign(this.code, this.declaredType, List<HInstruction> inputs)
    : super(inputs);
  accept(HVisitor visitor) => visitor.visitForeign(this);

  HType computeType() {
    if (declaredType.stringValue == 'bool') return HType.BOOLEAN;
    if (declaredType.stringValue == 'int') return HType.INTEGER;
    if (declaredType.stringValue == 'num') return HType.NUMBER;
    if (declaredType.stringValue == 'String') return HType.STRING;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => true;
}

class HForeignNew extends HForeign {
  ClassElement element;
  HForeignNew(this.element, List<HInstruction> inputs)
      : super(const SourceString("new"), const SourceString("Object"), inputs);
  accept(HVisitor visitor) => visitor.visitForeignNew(this);
}

class HInvokeBinary extends HInvokeStatic {
  HInvokeBinary(HStatic target, HInstruction left, HInstruction right)
      : super(<HInstruction>[target, left, right]);

  HInstruction fold() {
    if (left.isLiteralNumber() && right.isLiteralNumber()) {
      HLiteral op1 = left;
      HLiteral op2 = right;
      return new HLiteral(evaluate(op1.value, op2.value), type);
    }
    return this;
  }

  HInstruction get left() => inputs[1];
  HInstruction get right() => inputs[2];

  HType computeInputsType() {
    HType leftType = left.type;
    HType rightType = right.type;
    if (leftType.isUnknown() || rightType.isUnknown()) {
      return HType.UNKNOWN;
    }
    return leftType.combine(rightType);
  }

  abstract evaluate(num a, num b);
}

class HBinaryArithmetic extends HInvokeBinary {
  HBinaryArithmetic(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);

  void prepareGvn() {
    // An arithmetic expression can take part in global value
    // numbering and do not have any side-effects if we know that all
    // inputs are numbers.
    if (builtin) {
      assert(!hasSideEffects());
      setUseGvn();
    } else {
      setAllSideEffects();
    }
  }

  HType computeType() {
    HType type = computeInputsType();
    builtin = type.isNumber();
    if (!type.isUnknown()) return type;
    if (left.isNumber()) return HType.NUMBER;
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (isNumber() || left.isNumber() || right.isNumber()) return HType.NUMBER;
    if (type.isUnknown()) return HType.NUMBER;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => builtin || type.isUnknown();

  abstract num evaluate(num a, num b);
}

class HAdd extends HBinaryArithmetic {
  HAdd(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitAdd(this);
  num evaluate(num a, num b) => a + b;
  bool typeEquals(other) => other is HAdd;
  bool dataEquals(HInstruction other) => true;

  HType computeType() {
    HType type = computeInputsType();
    builtin = (type.isNumber() || type.isString());
    if (type.isConflicting() && left.isString()) {
      builtin = right is HLiteral;
      return HType.STRING;
    }
    if (!type.isUnknown()) return type;
    if (left.isNumber()) return HType.NUMBER;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => builtin || type.isUnknown() || left.isString();

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (isString() || left.isString()) {
      return (input == left) ? HType.STRING : HType.UNKNOWN;
    }
    if (right.isString()) return HType.STRING;
    if (isNumber() || left.isNumber() || right.isNumber()) return HType.NUMBER;
    return HType.UNKNOWN;
  }
}

class HDivide extends HBinaryArithmetic {
  HDivide(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitDivide(this);
  num evaluate(num a, num b) => a / b;
  bool typeEquals(other) => other is HDivide;
  bool dataEquals(HInstruction other) => true;
}

class HModulo extends HBinaryArithmetic {
  HModulo(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitModulo(this);
  num evaluate(num a, num b) => a % b;
  bool typeEquals(other) => other is HModulo;
  bool dataEquals(HInstruction other) => true;
}

class HMultiply extends HBinaryArithmetic {
  HMultiply(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitMultiply(this);
  num evaluate(num a, num b) => a * b;
  bool typeEquals(other) => other is HMultiply;
  bool dataEquals(HInstruction other) => true;
}

class HSubtract extends HBinaryArithmetic {
  HSubtract(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitSubtract(this);
  num evaluate(num a, num b) => a - b;
  bool typeEquals(other) => other is HSubtract;
  bool dataEquals(HInstruction other) => true;
}

class HTruncatingDivide extends HBinaryArithmetic {
  HTruncatingDivide(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitTruncatingDivide(this);

  HInstruction fold() {
    // Avoid a DivisionByZeroException.
    if (right.isLiteralNumber() && right.dynamic.value == 0) {
      return this;
    }
    return super.fold();
  }

  num evaluate(num a, num b) => a ~/ b;
  bool typeEquals(other) => other is HTruncatingDivide;
  bool dataEquals(HInstruction other) => true;
}

// TODO(floitsch): Should HBinaryArithmetic really be the super class of
// HBinaryBitOp?
class HBinaryBitOp extends HBinaryArithmetic {
  HBinaryBitOp(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);

  HType computeType() {
    HType type = computeInputsType();
    builtin = type.isInteger();
    if (!type.isUnknown()) return type;
    if (left.isInteger()) return HType.INTEGER;
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    return HType.INTEGER;
  }

  HInstruction fold() {
    // Bit-operations are only defined on integers.
    if (left.isLiteralNumber() && right.isLiteralNumber()) {
      HLiteral op1 = left;
      HLiteral op2 = right;
      // Avoid exceptions.
      if (op1.isInteger() && op2.isInteger()) {
        return new HLiteral(evaluate(op1.value, op2.value), HType.INTEGER);
      }
    }
    return this;
  }

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HShiftLeft extends HBinaryBitOp {
  HShiftLeft(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitShiftLeft(this);

  HInstruction fold() {
    if (right.isLiteralNumber()) {
      // TODO(floitsch): find good max left-shift amount.
      final int MAX_SHIFT_LEFT_AMOUNT = 50;
      HLiteral op2 = right;
      // Only positive shifting is allowed. Also guard against out-of-memory
      // shifts.
      if (op2.value < 0 || op2.value > MAX_SHIFT_LEFT_AMOUNT) return this;
    }
    return super.fold();
  }

  int evaluate(int a, int b) => a << b;
  bool typeEquals(other) => other is HShiftLeft;
  bool dataEquals(HInstruction other) => true;
}

class HShiftRight extends HBinaryBitOp {
  HShiftRight(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitShiftRight(this);

  HInstruction fold() {
    if (right.isLiteralNumber()) {
      HLiteral op2 = right;
      // Only positive shifting is allowed.
      if (op2.value < 0) return this;
    }
    return super.fold();
  }

  int evaluate(int a, int b) => a >> b;
  bool typeEquals(other) => other is HShiftRight;
  bool dataEquals(HInstruction other) => true;
}

class HBitOr extends HBinaryBitOp {
  HBitOr(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitBitOr(this);

  int evaluate(int a, int b) => a | b;
  bool typeEquals(other) => other is HBitOr;
  bool dataEquals(HInstruction other) => true;
}

class HBitAnd extends HBinaryBitOp {
  HBitAnd(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitBitAnd(this);

  int evaluate(int a, int b) => a & b;
  bool typeEquals(other) => other is HBitAnd;
  bool dataEquals(HInstruction other) => true;
}

class HBitXor extends HBinaryBitOp {
  HBitXor(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  accept(HVisitor visitor) => visitor.visitBitXor(this);

  int evaluate(int a, int b) => a ^ b;
  bool typeEquals(other) => other is HBitXor;
  bool dataEquals(HInstruction other) => true;
}

class HInvokeUnary extends HInvokeStatic {
  HInvokeUnary(HStatic target, HInstruction input)
      : super(<HInstruction>[target, input]);

  HInstruction get operand() => inputs[1];

  void prepareGvn() {
    // A unary arithmetic expression can take part in global value
    // numbering and does not have any side-effects if its input is a
    // number.
    if (builtin) {
      assert(!hasSideEffects());
      setUseGvn();
    } else {
      setAllSideEffects();
    }
  }

  HType computeType() {
    HType type = operand.type;
    builtin = type.isNumber();
    if (!type.isUnknown()) return type;
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (type.isUnknown() || type.isNumber()) return HType.NUMBER;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => builtin || (type.isUnknown());

  abstract HInstruction fold();

  abstract num evaluate(num a);
}

class HNegate extends HInvokeUnary {
  HNegate(HStatic target, HInstruction input) : super(target, input);
  accept(HVisitor visitor) => visitor.visitNegate(this);

  HInstruction fold() {
    if (operand.isLiteralNumber()) {
      HLiteral input = operand;
      return new HLiteral(evaluate(input.value), type);
    }
    return this;
  }

  num evaluate(num a) => -a;
  bool typeEquals(other) => other is HNegate;
  bool dataEquals(HInstruction other) => true;
}

class HBitNot extends HInvokeUnary {
  HBitNot(HStatic target, HInstruction input) : super(target, input);
  accept(HVisitor visitor) => visitor.visitBitNot(this);

  HType computeType() {
    HType type = operand.type;
    builtin = type.isInteger();
    if (!type.isUnknown()) return type;
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    return HType.INTEGER;
  }

  HInstruction fold() {
    if (operand.isLiteralNumber()) {
      HLiteral input = operand;
      if (input.isInteger()) {
        return new HLiteral(evaluate(input.value), HType.INTEGER);
      }
    }
    return this;
  }

  int evaluate(int a) => ~a;
  bool typeEquals(other) => other is HBitNot;
  bool dataEquals(HInstruction other) => true;
}

class HExit extends HControlFlow {
  HExit() : super(const <HInstruction>[]);
  toString() => 'exit';
  accept(HVisitor visitor) => visitor.visitExit(this);
}

class HGoto extends HControlFlow {
  HGoto() : super(const <HInstruction>[]);
  toString() => 'goto';
  accept(HVisitor visitor) => visitor.visitGoto(this);
}

class HIf extends HConditionalBranch {
  bool hasElse;
  HIf(HInstruction condition, this.hasElse) : super(<HInstruction>[condition]);
  toString() => 'if';
  accept(HVisitor visitor) => visitor.visitIf(this);

  HBasicBlock get thenBlock() {
    assert(block.dominatedBlocks[0] === block.successors[0]);
    return block.successors[0];
  }

  HBasicBlock get elseBlock() {
    if (hasElse) {
      assert(block.dominatedBlocks[1] === block.successors[1]);
      return block.successors[1];
    } else {
      return null;
    }
  }

  HBasicBlock get joinBlock() {
    List<HBasicBlock> dominated = block.dominatedBlocks;
    if (hasElse) {
      if (dominated.length > 2) return dominated[2];
    } else {
      if (dominated.length > 1) return dominated[1];
    }
    return null;
  }
}

class HLoopBranch extends HConditionalBranch {
  HLoopBranch(HInstruction condition) : super(<HInstruction>[condition]);
  toString() => 'loop-branch';
  accept(HVisitor visitor) => visitor.visitLoopBranch(this);

  bool isDoWhile() {
    bool result = block.dominatedBlocks.length == 1;
    if (result) {
      // The first successor is the loop-body and thus a back-edge.
      assert(block.successors[0].id < block.id);
      assert(block.dominatedBlocks[0] === block.successors[1]);
    } else {
      assert(block.dominatedBlocks[0] === block.successors[0]);
      assert(block.dominatedBlocks[1] === block.successors[1]);;
    }
    return result;
  }
}

/**
 * A wrapper around a SourceString that stores extra information about
 * the (potentially implicit) quoting style of the original string.
 * For most strings, the quotes are included in the [wrappedString], but
 * parts of strings from a string interpolation might be missing one or
 * both quotes.
 */
class QuotedString {
  // Bits of flag values.
  static final int NO_FLAGS = 0;
  static final int RAW = 1 << 0;
  static final int MULTI_LINE = 1 << 1;
  static final int HAS_LEFT_QUOTE = 1 << 2;
  static final int HAS_RIGHT_QUOTE = 1 << 3;
  static final int HAS_BOTH_QUOTES = HAS_LEFT_QUOTE | HAS_RIGHT_QUOTE;
  // Whether the string uses single quotes ('). Default is double quotes (").
  static final int SINGLE_QUOTED = 1 << 4;

  final SourceString wrappedString;
  final int flags;

  /**
   * Finds the quote type for a string given a part of it containing the
   * starting quote. Returns flags, but doesn't include HAS_LEFT_QUOTE
   * or HAS_RIGHT_QUOTE.
   */
  static int flagsFromLeftQuote(SourceString sourceString) {
    Iterator<int> source = sourceString.iterator();
    int flags = 0;
    int start = 0;
    int quoteChar = source.next();
    if (quoteChar == $AT) {
      flags |= RAW;
      start = 1;
      quoteChar = source.next();
    }
    if (quoteChar == $SQ) {
      flags |= SINGLE_QUOTED;
    } else {
      assert(quoteChar == $DQ);
    }
    // String has one quote. Check it if has three.
    // If it only have two, the string must be an empty string literal,
    // and end after the second quote.
    if (source.hasNext() && source.next() == quoteChar && source.hasNext()) {
      assert(source.next() == quoteChar);
      flags |= MULTI_LINE;
    }
    return flags;
  }

  const QuotedString(this.wrappedString, this.flags);

  // TODO(lrn): Make flags RAW for a literal string when we support it.
  QuotedString.literal(String string) :
      this(new SourceString(string), NO_FLAGS);

  /**
   * Crates a [QuotedString] from a [SourceString] that contains
   * both its quotes.
   */
  factory QuotedString.explicit(SourceString string) {
    int flags = flagsFromLeftQuote(string);
    int leftQuotes = leftQuoteLengthFromFlags(flags | HAS_LEFT_QUOTE);
    int rightQuotes = rightQuoteLengthFromFlags(flags | HAS_RIGHT_QUOTE);
    SourceString unquoted = string.copyWithoutQuotes(leftQuotes, rightQuotes);
    return new QuotedString(unquoted, flags);
  }

  SourceString unquotedSource() {
    if ((flags & HAS_BOTH_QUOTES) == 0) return wrappedString;
    return wrappedString.copyWithoutQuotes(leftQuoteLength,
                                           rightQuoteLength);
  }

  bool get hasLeftQuote() => (flags & HAS_LEFT_QUOTE) != 0;
  bool get hasRightQuote() => (flags & HAS_RIGHT_QUOTE) != 0;
  bool get isMultiLine() => (flags & MULTI_LINE) != 0;
  bool get isRaw() => (flags & RAW) != 0;
  String get quoteChar() => ((flags & SINGLE_QUOTED) != 0) ? "'" : '"';
  int get quoteCharCode() => ((flags & SINGLE_QUOTED) != 0) ? $SQ : $DQ;

  int get leftQuoteLength() =>
     hasLeftQuote ? (isRaw ? 1 : 0) + (isMultiLine ? 3 : 1) : 0;
  int get rightQuoteLength() =>
     hasRightQuote ? (isMultiLine ? 3 : 1) : 0;
  static int leftQuoteLengthFromFlags(int flags) {
    if ((flags & HAS_LEFT_QUOTE) == 0) return 0;
    return (flags & (RAW | MULTI_LINE)) + 1;
  }
  static int rightQuoteLengthFromFlags(int flags) {
    if ((flags & HAS_RIGHT_QUOTE) == 0) return 0;
    return (flags & MULTI_LINE) + 1;
  }

  bool isEmpty() => unquotedSource().isEmpty();

  static int hexValue(int hexDigit) {
    // hexDigit is one of '0'..'9', 'A'..'F' and 'a'..'f'.
    if (hexDigit <= $9) {
      return hexDigit - $0;
    }
    // Make letters lowercase.
    hexDigit |= $a ^ $A;
    hexDigit -= $a - 10;
    assert(10 <= hexDigit && hexDigit <= 15);
    return hexDigit;
  }

  static bool isHexDigit(int characterCode) {
    if ($0 <= characterCode && characterCode <= $9) return true;
    characterCode |= $a ^ $A;
    return ($a <= characterCode && characterCode <= $f);
  }

  static int readUnicodeEscape(Iterator<int> iter,
                                void cancel(String s)) {
    if (!iter.hasNext()) cancel("Incomplete unicode escape.");
    int code = iter.next();
    if (code == $OPEN_CURLY_BRACKET) {
      // In Dart, '\u{'x{0..7}'}' is a valid escape, but not in
      // JS. Convert to a \uxxxx escape.
      int value = 0;
      int length = 0;
      if (!iter.hasNext()) cancel("Incomplete unicode escape.");
      int hexDigit = iter.next();
      do {
        if (!isHexDigit(hexDigit)) {
          cancel("Invalid character in unicode escape");
        }
        value = value * 16 + hexValue(hexDigit);
        length++;
        if (length > 7) {
          cancel("Invalid unicode escape length.");
        }
        if (!iter.hasNext()) cancel("Incomplete unicode escape.");
        hexDigit = iter.next();
      } while (hexDigit !== $CLOSE_CURLY_BRACKET);  // until '}'.
      return value;
    }
    // Simple four-digit unicode escape.
    int value = 0;
    for (int i = 0; i < 4; i++) {
      if (i > 0) {
        if (!iter.hasNext()) cancel("Incomplete unicode escape.");
        code = iter.next();
      }
      if (!isHexDigit(code)) cancel("Invalid character in unicode escape");
      value = value * 16 + hexValue(code);
    }
    return value;
  }

  /**
   * Write the contents of the quoted string to a [StringBuffer] in
   * a form that is valid as JavaScript string literal content.
   * The string is assumed quoted by [quote] characters.
   * This method doesn't try to make the shortest string, but rather
   * to be as close to the original string as possible.
   */
  void writeEscaped(StringBuffer buffer, int quote, void cancel(String s)) {
    bool raw = this.isRaw;
    Iterator<int> iter =
        wrappedString.copyWithoutQuotes(leftQuoteLength,
                                        rightQuoteLength).iterator();
    while (iter.hasNext()) {
      int code = iter.next();
      if (code == quote) {
        // We need to add a backslash before quotes, both in normal
        // and in raw strings.
        buffer.add(@'\');
        buffer.add(code == $SQ ? "'" : '"');
      } else if (code == $LF) {
        // Newlines in strings only occour in multiline strings.
        // They need to be written using escapes in JS..
        assert(isMultiLine);
        buffer.add(@'\n');
      } else if (code == $CR) {
        assert(isMultiLine);
        buffer.add(@'\r');
      } else if (code == $LS || code == $PS) {
        // These Unicode line terminators are invalid in JS strings.
        buffer.add(code == $LS ? @'\u2028' : @'\u2029');
      } else if (code != $BACKSLASH) {
        buffer.add(new String.fromCharCodes([code]));
      } else if (raw) {
        buffer.add(@'\\');
      } else {
        code = iter.next();
        // TODO(lrn): Reading \x and \u escapes also validates the
        // escape sequences. This should be done at an earlier step
        // to catch errors even in dead code.
        switch (code) {
          case $u:
            int value = readUnicodeEscape(iter, cancel);
            if (value >= 0xD800 && value <= 0xDFFF || value > 0x10ffff) {
              cancel('Invalid unicode scalar value.');
            }
            if (value > 0xffff) {
              cancel('Unhandled Unicode value: $value - outside the BMP.');
            }
            buffer.add(@'\u');
            for (int j = 12; j >= 0; j -= 4) {
              int digit = (value >> j) & 0xf;
              buffer.add("0123456789abcdef"[digit]);
            }
            break;
          case $x:
            buffer.add(@'\x');
            List<int> codes = <int>[];
            for (int i = 0; i < 2; i++) {
              if (!iter.hasNext()) cancel("Incomplete hex escape");
              code = iter.next();
              if (!isHexDigit(code)) {
                cancel("Invalid hex digit: " +
                       "${new String.fromCharCodes([code])}");
              }
              codes.add(code);
            }
            buffer.add(new String.fromCharCodes(codes));
            break;
          // Character escapes that identical in meaning in JS.
          case $b: buffer.add(@'\b'); break;
          case $f: buffer.add(@'\f'); break;
          case $n: buffer.add(@'\n'); break;
          case $r: buffer.add(@'\r'); break;
          case $t: buffer.add(@'\t'); break;
          case $v: buffer.add(@'\v'); break;
          // Identity escapes that must be escaped in JS strings.
          case $BACKSLASH: buffer.add(@'\\'); break;
          case $LF: buffer.add(@'\n'); break;
          case $CR: buffer.add(@'\r'); break;
          case $LS: buffer.add(@'\u2028'); break;
          case $PS: buffer.add(@'\u2029'); break;
          // Quotes may or may not need the escape.
          case $SQ:
          case $DQ:
            // Only escape quotes if they match the generated string quotes.
            if (code == quote) buffer.add(@'\');
            buffer.add(code === $SQ ? "'" : '"');
            break;
          default:
            // All other escaped characters are identity escapes,
            // and don't need a backslash in JS.
            buffer.add(new String.fromCharCodes([code]));
            break;
        }
      }
    }
  }

  /**
    * Does a conservative test for equality between two quoted strings.
    * Returns true if the two definitly have the same string.
    * Returns false if the strings are different, or if it's not possible
    * to (quickly) determine whether they are equal.
    */
  bool definitlyEquals(QuotedString other) {
    return flags == other.flags && wrappedString == other.wrappedString;
  }

  void printOn(StringBuffer buffer) {
    int start = leftQuoteLength;
    int end = rightQuoteLength;
    if (start == 1 && end == 1) {
      wrappedString.printOn(buffer);
    } else {
      String quote = quoteChar;
      buffer.add(quote);
      wrappedString.copyWithoutQuotes(start, end).printOn(buffer);
      buffer.add(quote);
    }
  }
}

class HLiteral extends HInstruction {
  final value;
  HLiteral(this.value, HType type) : super(<HInstruction>[]) {
    this.type = type;
    tryGenerateAtUseSite();  // Maybe avoid this if the literal is big?
  }
  void prepareGvn() {
    // We allow global value numbering of literals, but we still
    // prefer generating them at use sites. This allows us to do
    // better GVN'ing of instructions that use literals as input.
    assert(!hasSideEffects());
    setUseGvn();
  }
  toString() => 'literal: $value';
  accept(HVisitor visitor) => visitor.visitLiteral(this);

  HType computeType() {
    return type;
  }

  // Literals have the type they have. It can't be changed.
  bool updateType() => false;

  bool hasExpectedType() => true;

  bool isLiteralBoolean() => value is bool;
  bool isLiteralNull() => value === null;
  bool isLiteralNumber() => value is num;
  bool isLiteralString() => value is QuotedString;
  bool typeEquals(other) => other is HLiteral;
  bool dataEquals(HLiteral other) => value == other.value;
}

class HNot extends HInstruction {
  HNot(HInstruction value) : super(<HInstruction>[value]);
  void prepareGvn() {
    assert(!hasSideEffects());
    setUseGvn();
  }

  HType computeType() => HType.BOOLEAN;
  bool hasExpectedType() => true;
  HType computeDesiredInputType(HInstruction input) {
    return HType.BOOLEAN;
  }

  accept(HVisitor visitor) => visitor.visitNot(this);
  bool typeEquals(other) => other is HNot;
  bool dataEquals(HInstruction other) => true;
}

class HParameterValue extends HInstruction {
  final Element element;

  HParameterValue(this.element) : super(<HInstruction>[]) {
    tryGenerateAtUseSite();
  }

  void prepareGvn() {
    assert(!hasSideEffects());
  }
  toString() => 'parameter ${element.name}';
  accept(HVisitor visitor) => visitor.visitParameterValue(this);
}

class HThis extends HParameterValue {
  HThis() : super(null);
  toString() => 'this';
  accept(HVisitor visitor) => visitor.visitThis(this);
}

class HPhi extends HInstruction {
  final Element element;

  static final IS_NOT_LOGICAL_OPERATOR = 0;
  static final IS_AND = 1;
  static final IS_OR = 2;

  int logicalOperatorType = IS_NOT_LOGICAL_OPERATOR;

  // The order of the [inputs] must correspond to the order of the
  // predecessor-edges. That is if an input comes from the first predecessor
  // of the surrounding block, then the input must be the first in the [HPhi].
  HPhi.singleInput(this.element, HInstruction input)
      : super(<HInstruction>[input]);
  HPhi.manyInputs(this.element, List<HInstruction> inputs)
      : super(inputs);

  void addInput(HInstruction input) {
    assert(isInBasicBlock());
    inputs.add(input);
    input.usedBy.add(this);
  }

  // Compute the (shared) type of the inputs if any. If all inputs
  // have the same known type return it. If any two inputs have
  // different known types, we'll return a conflict -- otherwise we'll
  // simply return an unknown type.
  HType computeInputsType() {
    bool seenUnknown = false;
    HType candidateType = inputs[0].type;
    for (int i = 1, length = inputs.length; i < length; i++) {
      HType inputType = inputs[i].type;
      if (inputType.isUnknown()) return HType.UNKNOWN;
      candidateType = candidateType.combine(inputType);
      if (candidateType.isConflicting()) return HType.CONFLICTING;
    }
    return candidateType;
  }

  HType computeType() {
    HType type = computeInputsType();
    if (!type.isUnknown()) return type;
    return super.computeType();
  }

  HType computeDesiredInputType(HInstruction input) {
    if (type.isNumber()) return HType.NUMBER;
    if (type.isStringOrArray()) return HType.STRING_OR_ARRAY;
    return type;
  }

  bool hasExpectedType() {
    for (int i = 0; i < inputs.length; i++) {
      if (type.combine(inputs[i].type).isConflicting()) return false;
    }
    return true;
  }

  void setInitialTypeForLoopPhi() {
    assert(block.isLoopHeader());
    assert(type.isUnknown());
    type = inputs[0].type;
  }

  bool isLogicalOperator() => logicalOperatorType != IS_NOT_LOGICAL_OPERATOR;

  String logicalOperator() {
    assert(isLogicalOperator());
    if (logicalOperatorType == IS_AND) return "&&";
    assert(logicalOperatorType == IS_OR);
    return "||";
  }

  toString() => 'phi';
  accept(HVisitor visitor) => visitor.visitPhi(this);
}

class HRelational extends HInvokeBinary {
  HRelational(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right) {
    type = HType.BOOLEAN;
  }

  void prepareGvn() {
    // Relational expressions can take part in global value numbering
    // and do not have any side-effects if we know all the inputs are
    // numbers. This can be improved for at least equality.
    if (builtin) {
      assert(!hasSideEffects());
      setUseGvn();
    } else {
      setAllSideEffects();
    }
  }

  HType computeType() {
    builtin = computeInputsType().isNumber();
    return HType.BOOLEAN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    // For all relational operations exept HEquals, we expect to only
    // get numbers.
    return HType.NUMBER;
  }

  // A HRelational goes through the builtin operator or the top level
  // element. Therefore, it always has the expected type.
  bool hasExpectedType() => true;

  abstract bool evaluate(num a, num b);
}

class HEquals extends HRelational {
  HEquals(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a == b;
  accept(HVisitor visitor) => visitor.visitEquals(this);
  bool typeEquals(other) => other is HEquals;
  bool dataEquals(HInstruction other) => true;

  HType computeType() {
    builtin = computeInputsType().isNumber() || (left is HLiteral);
    return HType.BOOLEAN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (left.isNumber() || right.isNumber()) return HType.NUMBER;
    return HType.UNKNOWN;
  }
}

class HIdentity extends HRelational {
  HIdentity(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a === b;
  accept(HVisitor visitor) => visitor.visitIdentity(this);
  bool typeEquals(other) => other is HIdentity;
  bool dataEquals(HInstruction other) => true;

  HType computeType() {
    builtin = true;
    return HType.BOOLEAN;
  }

  bool hasExpectedType() => true;

  HType computeDesiredInputType(HInstruction input) => HType.UNKNOWN;
}

class HGreater extends HRelational {
  HGreater(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a > b;
  accept(HVisitor visitor) => visitor.visitGreater(this);
  bool typeEquals(other) => other is HGreater;
  bool dataEquals(HInstruction other) => true;
}

class HGreaterEqual extends HRelational {
  HGreaterEqual(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a >= b;
  accept(HVisitor visitor) => visitor.visitGreaterEqual(this);
  bool typeEquals(other) => other is HGreaterEqual;
  bool dataEquals(HInstruction other) => true;
}

class HLess extends HRelational {
  HLess(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a < b;
  accept(HVisitor visitor) => visitor.visitLess(this);
  bool typeEquals(other) => other is HLess;
  bool dataEquals(HInstruction other) => true;
}

class HLessEqual extends HRelational {
  HLessEqual(HStatic target, HInstruction left, HInstruction right)
      : super(target, left, right);
  bool evaluate(num a, num b) => a <= b;
  accept(HVisitor visitor) => visitor.visitLessEqual(this);
  bool typeEquals(other) => other is HLessEqual;
  bool dataEquals(HInstruction other) => true;
}

class HReturn extends HControlFlow {
  HReturn(value) : super(<HInstruction>[value]);
  toString() => 'return';
  accept(HVisitor visitor) => visitor.visitReturn(this);
}

class HThrow extends HControlFlow {
  HThrow(value) : super(<HInstruction>[value]);
  toString() => 'throw';
  accept(HVisitor visitor) => visitor.visitThrow(this);
}

class HStatic extends HInstruction {
  Element element;
  HStatic(this.element) : super(<HInstruction>[]) {
    tryGenerateAtUseSite();
  }
  void prepareGvn() {
    assert(!hasSideEffects());
    if (!element.isAssignable()) {
      setUseGvn();
    }
  }
  toString() => 'static ${element.name}';
  accept(HVisitor visitor) => visitor.visitStatic(this);

  bool typeEquals(other) => other is HStatic;
  bool dataEquals(HStatic other) => element == other.element;
}

class HStaticStore extends HInstruction {
  Element element;
  HStaticStore(this.element, HInstruction value) : super(<HInstruction>[value]);
  toString() => 'static store ${element.name}';
  accept(HVisitor visitor) => visitor.visitStaticStore(this);

  bool typeEquals(other) => other is HStaticStore;
  bool dataEquals(HStaticStore other) => element == other.element;
}

class HLiteralList extends HInstruction {
  HLiteralList(inputs) : super(inputs);
  toString() => 'literal list';
  accept(HVisitor visitor) => visitor.visitLiteralList(this);
  HType computeType() => HType.ARRAY;
  bool hasExpectedType() => true;

  void prepareGvn() {
    assert(!hasSideEffects());
  }
}

class HIndex extends HInvokeStatic {
  HIndex(HStatic target, HInstruction receiver, HInstruction index)
      : super(<HInstruction>[target, receiver, index]);
  toString() => 'index operator';
  accept(HVisitor visitor) => visitor.visitIndex(this);

  void prepareGvn() {
    if (builtin) {
      assert(!hasSideEffects());
    } else {
      setAllSideEffects();
    }
  }

  HInstruction get receiver() => inputs[1];
  HInstruction get index() => inputs[2];

  HType computeType() {
    builtin = receiver.isStringOrArray();
    return HType.UNKNOWN;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (input == receiver) return HType.STRING_OR_ARRAY;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => false;
}

class HIndexAssign extends HInvokeStatic {
  HIndexAssign(HStatic target,
               HInstruction receiver,
               HInstruction index,
               HInstruction value)
      : super(<HInstruction>[target, receiver, index, value]);
  toString() => 'index assign operator';
  accept(HVisitor visitor) => visitor.visitIndexAssign(this);

  HInstruction get receiver() => inputs[1];
  HInstruction get index() => inputs[2];
  HInstruction get value() => inputs[3];

  HType computeType() {
    builtin = receiver.isArray();
    return value.type;
  }

  HType computeDesiredInputType(HInstruction input) {
    // TODO(floitsch): we want the target to be a function.
    if (input == target) return HType.UNKNOWN;
    if (input == receiver) return HType.ARRAY;
    return HType.UNKNOWN;
  }

  bool hasExpectedType() => value.hasExpectedType();
}

class HNonSsaInstruction extends HInstruction {
  HNonSsaInstruction(inputs) : super(inputs);
  // Non-SSA instructions cannot take part in GVN.
  void prepareGvn() { unreachable(); }
  bool useGvn() { unreachable(); }
  void setUseGvn() { unreachable(); }

  // TODO(floitsch): make class abstract instead of adding an abstract method.
  abstract accept(HVisitor visitor);
}

class HLoad extends HNonSsaInstruction {
  HLoad(HLocal local, type) : super(<HInstruction>[local]) { this.type = type; }
  HLocal get local() => inputs[0];
  toString() => 'load';
  accept(HVisitor visitor) => visitor.visitLoad(this);
}

class HStore extends HNonSsaInstruction {
  HStore(HLocal local, HInstruction value)
      : super(<HInstruction>[local, value]);
  HLocal get local() => inputs[0];
  HInstruction get value() => inputs[1];
  toString() => 'store';
  accept(HVisitor visitor) => visitor.visitStore(this);
}

class HLocal extends HNonSsaInstruction {
  Element element;
  HInstruction declaredBy;
  HLocal(Element this.element) : super(<HInstruction>[]) {
    declaredBy = this;
  }
  toString() => 'local';
  accept(HVisitor visitor) => visitor.visitLocal(this);
}

class HLogicalOperator extends HNonSsaInstruction {
  String operation;
  HLogicalOperator(String this.operation,
                   HInstruction first,
                   HInstruction second)
      : super(<HInstruction>[first, second]);
  toString() => operation;
  accept(HVisitor visitor) => visitor.visitLogicalOperator(this);
  HInstruction get left() => inputs[0];
  HInstruction get right() => inputs[1];
  HType computeType() => HType.BOOLEAN;
  bool hasExpectedType() => true;
}

class HIs extends HInstruction {
  // TODO(ahe): This should be a Type, not ClassElement.
  final ClassElement typeExpression;

  HIs(this.typeExpression, HInstruction expression)
    : super(<HInstruction>[expression]);

  HInstruction get expression() => inputs[0];

  HType computeType() => HType.BOOLEAN;
  bool hasExpectedType() => true;

  accept(HVisitor visitor) => visitor.visitIs(this);

  toString() => "$expression is $typeExpression";
}
