
class XMLHttpRequestProgressEventJs extends ProgressEventJs implements XMLHttpRequestProgressEvent native "*XMLHttpRequestProgressEvent" {

  int get position() native "return this.position;";

  int get totalSize() native "return this.totalSize;";
}
