// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class Universe {
  final Element scope;

  Map<SourceString, Element> elements;
  Map<Element, String> generatedCode;
  Map<Element, String> generatedBailoutCode;
  final Set<ClassElement> instantiatedClasses;
  // TODO(floitsch): we want more information than just the method name. For
  // example the number of arguments, etc.
  final Map<SourceString, Set<int>> invokedNames;
  final Set<SourceString> invokedGetters;
  final Set<SourceString> invokedSetters;

  Universe() : elements = {}, generatedCode = {}, generatedBailoutCode = {},
               instantiatedClasses = new Set<ClassElement>(),
               invokedNames = new Map<SourceString, Set<int>>(),
               invokedGetters = new Set<SourceString>(),
               invokedSetters = new Set<SourceString>(),
               scope = new Element(const SourceString('global scope'),
                                   null, null);

  Element find(SourceString name) {
    return elements[name];
  }

  void define(Element element, Compiler compiler) {
    Element existing = elements.putIfAbsent(element.name, () => element);
    if (existing !== element) {
      compiler.cancel('duplicate definition', token: element.position());
      compiler.cancel('existing definition', token: existing.position());
    }
  }

  void addGeneratedCode(WorkItem work, String code) {
    if (work.isBailoutVersion()) {
      generatedBailoutCode[work.element] = code;
    } else {
      generatedCode[work.element] = code;
    }
  }
}
