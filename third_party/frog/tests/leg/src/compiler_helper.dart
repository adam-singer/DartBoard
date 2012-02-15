// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
// Test constant folding.

#library("compiler_helper");

#import("../../../leg/leg.dart", prefix: "leg");
#import("../../../leg/elements/elements.dart", prefix: "lego");
#import("../../../leg/ssa/ssa.dart", prefix: "ssa");
#import("parser_helper.dart");
#import("mock_compiler.dart");

class StringScript extends leg.Script {
  final String code;
  StringScript(this.code) : super(null, null);
  String get text() => code;
  String get name() => "mock script";
}

String compile(String code, [String entry = 'main']) {
  MockCompiler compiler = new MockCompiler();
  compiler.parseScript(code);
  lego.Element element = compiler.mainApp.find(buildSourceString(entry));
  if (element === null) return null;
  String generated = compiler.compile(new leg.WorkItem.toCompile(element));
  return generated;
}

String compileAll(String code) {
  leg.Compiler compiler = new MockCompiler();
  compiler.runCompiler(new StringScript(code));
  return compiler.assembledCode;
}

class HGraphPair {
  ssa.HGraph optimized;
  ssa.HGraph unoptimized;
  HGraphPair(this.optimized, this.unoptimized);
}

ssa.HGraph getGraph(MockCompiler compiler, leg.WorkItem work) {
  compiler.analyze(work);
  ssa.HGraph graph = compiler.builder.build(work);
  compiler.optimizer.optimize(work, graph);
  // Also run the code generator to get the unoptimized version in the
  // queue.
  compiler.generator.generate(work, graph);
  return graph;
}

HGraphPair getGraphs(String code, String entry) {
  MockCompiler compiler = new MockCompiler();
  compiler.parseScript(code);
  lego.Element element = compiler.mainApp.find(buildSourceString(entry));
  if (element === null) return null;
  leg.WorkItem work = new leg.WorkItem.toCompile(element);
  ssa.HGraph optimized = getGraph(compiler, work);
  ssa.HGraph unoptimized = null;
  work = compiler.lastBailoutWork;
  if (work != null && work.element == element) {
    unoptimized = getGraph(compiler, work);
  }
  return new HGraphPair(optimized, unoptimized);
}

String anyIdentifier = "[a-zA-Z][a-zA-Z0-9]*";

String getIntTypeCheck(String variable) {
  return "\\($variable !== \\($variable \\| 0\\)\\)";
}

bool checkNumberOfMatches(Iterator it, int nb) {
  for (int i = 0; i < nb; i++) {
    Expect.isTrue(it.hasNext());
    it.next();
  }
  Expect.isFalse(it.hasNext());
}
