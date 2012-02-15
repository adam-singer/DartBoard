// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

class ScannerTask extends CompilerTask {
  ScannerTask(Compiler compiler) : super(compiler);
  String get name() => 'Scanner';

  void scan(CompilationUnitElement compilationUnit) {
    measure(() {
      scanElements(compilationUnit);
      if (compilationUnit.kind === ElementKind.LIBRARY) {
        processScriptTags(compilationUnit);
      }
    });
  }

  void processScriptTags(LibraryElement library) {
    for (ScriptTag tag in library.tags.reverse()) {
      SourceString argument = tag.argument.value.copyWithoutQuotes(1, 1);
      Uri cwd = new Uri(scheme: 'file', path: compiler.currentDirectory);
      Uri base = cwd.resolve(library.script.name.toString());
      Uri resolved = base.resolve(argument.toString());
      if (tag.isImport()) {
        importLibrary(library, loadLibrary(resolved, tag), tag.prefix);
      } else if (tag.isLibrary()) {
        if (library.libraryTag !== null) {
          compiler.cancel("duplicated library declaration", node: tag);
        } else {
          library.libraryTag = tag;
        }
      } else if (tag.isSource()) {
        Script script = compiler.readScript(resolved, tag);
        CompilationUnitElement unit =
          new CompilationUnitElement(script, library);
        compiler.withCurrentElement(unit, () => scan(unit));
      } else {
        compiler.cancel("illegal script tag: ${tag.tag}", node: tag);
      }
    }
    if (library !== compiler.coreLibrary) {
      importLibrary(library, compiler.coreLibrary, null);
    }
  }

  void scanElements(CompilationUnitElement compilationUnit) {
    compiler.log("scanning $compilationUnit");
    Script script = compilationUnit.script;
    Token tokens;
    try {
      tokens = new StringScanner(script.text).tokenize();
    } catch (MalformedInputException ex) {
      Token token;
      var message;
      if (ex.position is num) {
        // TODO(ahe): Always use tokens in MalformedInputException.
        token = new Token(EOF_INFO, ex.position);
      } else {
        token = ex.position;
      }
      compiler.cancel(ex.message, token: token);
    }
    ElementListener listener = new ElementListener(compiler, compilationUnit);
    PartialParser parser = new PartialParser(listener);
    parser.parseUnit(tokens);
  }

  LibraryElement loadLibrary(Uri uri, ScriptTag node) {
    bool newLibrary = false;
    LibraryElement library =
      compiler.universe.libraries.putIfAbsent(uri.toString(), () {
          newLibrary = true;
          Script script = compiler.readScript(uri, node);
          return new LibraryElement(script);
        });
    if (newLibrary) {
      compiler.withCurrentElement(library, () => scan(library));
    }
    return library;
  }

  void importLibrary(LibraryElement library, LibraryElement imported,
                     LiteralString prefix) {
    if (prefix !== null) {
      library.define(new PrefixElement(prefix, imported, library), compiler);
    } else {
      for (Link<Element> link = imported.topLevelElements; !link.isEmpty();
           link = link.tail) {
        compiler.withCurrentElement(link.head, () {
            library.define(link.head, compiler);
          });
      }
    }
  }
}
