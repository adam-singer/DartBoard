
class ClipboardJs extends DOMTypeJs implements Clipboard native "*Clipboard" {

  String get dropEffect() native "return this.dropEffect;";

  void set dropEffect(String value) native "this.dropEffect = value;";

  String get effectAllowed() native "return this.effectAllowed;";

  void set effectAllowed(String value) native "this.effectAllowed = value;";

  FileListJs get files() native "return this.files;";

  DataTransferItemListJs get items() native "return this.items;";

  List get types() native "return this.types;";

  void clearData([String type = null]) native;

  void getData(String type) native;

  bool setData(String type, String data) native;

  void setDragImage(HTMLImageElementJs image, int x, int y) native;
}
