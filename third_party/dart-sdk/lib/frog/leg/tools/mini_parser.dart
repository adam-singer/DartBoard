// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

#library('parser');

#import('dart:io');

#import('../../../utils/utf8/utf8.dart');

#import('../elements/elements.dart');
#import('../scanner/scanner_implementation.dart');
#import('../scanner/scannerlib.dart');
#import('../tree/tree.dart');
#import('../util/characters.dart');

#source('../../source.dart');
#source('../scanner/byte_array_scanner.dart');
#source('../scanner/byte_strings.dart');

int charCount = 0;
Stopwatch stopwatch;

void main() {
  filesWithCrashes = [];
  stopwatch = new Stopwatch();
  MyOptions options = new MyOptions();

  void printStats() {
    int kb = (charCount / 1024).round().toInt();
    String stats =
        '$classCount classes (${kb}Kb) in ${stopwatch.elapsedInMs()}ms';
    if (errorCount != 0) {
      stats += ' with $errorCount errors';
    }
    if (options.diet) {
      print('Diet parsed $stats.');
    } else {
      print('Parsed $stats.');
    }
    if (filesWithCrashes.length !== 0) {
      print('The following ${filesWithCrashes.length} files caused a crash:');
      for (String file in filesWithCrashes) {
        print(file);
      }
    }
  }

  for (String argument in new Options().arguments) {
    if (argument == "--diet") {
      options.diet = true;
      continue;
    }
    if (argument == "--throw") {
      options.throwOnError = true;
      continue;
    }
    if (argument == "--scan-only") {
      options.scanOnly = true;
      continue;
    }
    if (argument == "--read-only") {
      options.readOnly = true;
      continue;
    }
    if (argument == "--ast") {
      options.buildAst = true;
      continue;
    }
    if (argument == "-") {
      parseFilesFrom(stdin, options, printStats);
      return;
    }
    stopwatch.start();
    parseFile(argument, options);
    stopwatch.stop();
  }

  printStats();
}

void parseFile(String filename, MyOptions options) {
  List<int> bytes = read(filename);
  charCount += bytes.length;
  if (options.readOnly) return;
  MySourceFile file = new MySourceFile(filename, bytes);
  final Listener listener = options.buildAst
      ? new MyNodeListener(file, options)
      : new MyListener(file);
  final Parser parser = options.diet
      ? new PartialParser(listener)
      : new Parser(listener);
  try {
    Token token = scan(file);
    if (!options.scanOnly) parser.parseUnit(token);
  } catch (ParserError ex) {
    if (options.throwOnError) {
      throw;
    } else {
      print(ex);
    }
  } catch (MalformedInputException ex) {
    // Already diagnosed.
  } catch (var ex) {
    print('Error in file: $filename');
    throw;
  }
  if (options.buildAst) {
    MyNodeListener l = listener;
    if (!l.nodes.isEmpty()) {
      String message = 'Stack not empty after parsing';
      print(formatError(message, l.nodes.head.getBeginToken(),
                        l.nodes.head.getEndToken(), file));
      throw message;
    }
  }
}

Token scan(MySourceFile source) {
  Scanner scanner = new ByteArrayScanner(source.rawText);
  try {
    return scanner.tokenize();
  } catch (MalformedInputException ex) {
    if (ex.position is Token) {
      print(formatError(ex.message, ex.position, ex.position, source));
    } else {
      Token fakeToken = new Token(QUESTION_INFO, ex.position);
      print(formatError(ex.message, fakeToken, fakeToken, source));
    }
    throw;
  }
}

var filesWithCrashes;

void parseFilesFrom(InputStream input, MyOptions options, Function whenDone) {
  void readLine(String line) {
    stopwatch.start();
    try {
      parseFile(line, options);
    } catch (var ex, var trace) {
      filesWithCrashes.add(line);
      print(ex);
      print(trace);
    }
    stopwatch.stop();
  }
  forEachLine(input, readLine, whenDone);
}

void forEachLine(InputStream input,
                 void lineHandler(String line),
                 void closeHandler()) {
  StringInputStream stringStream = new StringInputStream(input);
  stringStream.lineHandler = () {
    String line;
    while ((line = stringStream.readLine()) !== null) {
      lineHandler(line);
    }
  };
  stringStream.closeHandler = closeHandler;
}

List<int> read(String filename) {
  RandomAccessFile file = new File(filename).openSync();
  bool threw = true;
  try {
    int size = file.lengthSync();
    List<int> bytes = new List<int>(size + 1);
    file.readListSync(bytes, 0, size);
    bytes[size] = $EOF;
    threw = false;
    return bytes;
  } finally {
    try {
      file.closeSync();
    } catch (var ex) {
      if (!threw) throw;
    }
  }
}

int classCount = 0;
int errorCount = 0;

class MyListener extends Listener {
  final SourceFile file;

  MyListener(this.file);

  void beginClassDeclaration(Token token) {
    classCount++;
  }

  void beginInterface(Token token) {
    classCount++;
  }

  void error(String message, Token token) {
    throw new ParserError(formatError(message, token, token, file));
  }
}

void formatError(String message, Token beginToken, Token endToken,
                 SourceFile file) {
  ++errorCount;
  if (beginToken === null) return '${file.filename}: $message';
  String tokenString = endToken.toString();
  int begin = beginToken.charOffset;
  int end = endToken.charOffset + tokenString.length;
  return file.getLocationMessage(message, begin, end, true);
}

class MyNodeListener extends NodeListener {
  MyNodeListener(SourceFile file, MyOptions options)
    : super(new MyCanceller(file, options), null);

  void beginClassDeclaration(Token token) {
    classCount++;
  }

  void beginInterface(Token token) {
    classCount++;
  }

  void endClassDeclaration(int interfacesCount, Token beginToken,
                           Token extendsKeyword, Token implementsKeyword,
                           Token endToken) {
    super.endClassDeclaration(interfacesCount, beginToken,
                              extendsKeyword, implementsKeyword,
                              endToken);
    ClassNode node = popNode(); // Discard ClassNode and assert the type.
  }

  void endInterface(int supertypeCount, Token interfaceKeyword,
                    Token extendsKeyword, Token endToken) {
    super.endInterface(supertypeCount, interfaceKeyword, extendsKeyword,
                       endToken);
    ClassNode node = popNode(); // Discard ClassNode and assert the type.
  }

  void endTopLevelFields(int count, Token beginToken, Token endToken) {
    super.endTopLevelFields(count, beginToken, endToken);
    VariableDefinitions node = popNode(); // Discard node and assert the type.
  }

  void endFunctionTypeAlias(Token typedefKeyword, Token endToken) {
    super.endFunctionTypeAlias(typedefKeyword, endToken);
    Typedef node = popNode(); // Discard Typedef and assert type type.
  }

  void endLibraryTag(bool hasPrefix, Token beginToken, Token endToken) {
    super.endLibraryTag(hasPrefix, beginToken, endToken);
    ScriptTag node = popNode(); // Discard ScriptTag and assert type type.
  }

  void log(message) {
    print(message);
  }
}

class MyCanceller implements Canceler {
  final SourceFile file;
  final MyOptions options;

  MyCanceller(this.file, this.options);

  void cancel([String reason, node, token, instruction]) {
    Token beginToken;
    Token endToken;
    if (token !== null) {
      beginToken = token;
      endToken = token;
    } else if (node !== null) {
      beginToken = node.getBeginToken();
      endToken = node.getEndToken();
    }
    String message = formatError(reason, beginToken, endToken, file);
    if (options.throwOnError) throw new ParserError(message);
    print(message);
  }
}

class MyOptions {
  bool diet = false;
  bool throwOnError = false;
  bool scanOnly = false;
  bool readOnly = false;
  bool buildAst = false;
}

class MySourceFile extends SourceFile {
  final rawText;
  var stringText;

  MySourceFile(filename, this.rawText) : super(filename, null);

  String get text() {
    if (rawText is String) {
      return rawText;
    } else {
      if (stringText === null) {
        stringText = new String.fromCharCodes(rawText);
        if (stringText.endsWith('\u0000')) {
          // Strip trailing NUL used by ByteArrayScanner to signal EOF.
          stringText = stringText.substring(0, stringText.length - 1);
        }
      }
      return stringText;
    }
  }

  set text(String newText) {
    throw "not supported";
  }
}

// Hacks to allow sourcing in ../source.dart:
var world = const Mock();
var options = const Mock();
String _GREEN_COLOR = '\u001b[32m';
String _RED_COLOR = '\u001b[31m';
String _MAGENTA_COLOR = '\u001b[35m';
String _NO_COLOR = '\u001b[0m';

class Mock {
  const Mock();
  bool get useColors() => true;
  internalError(message) { throw message.toString(); }
}
