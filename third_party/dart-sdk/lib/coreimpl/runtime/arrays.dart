// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// TODO(ngeoffray): Rename to Lists.
class Arrays {

  static String asString(List list) {
    String result = "[";
    int len = list.length;
    for (int i = 0; i < len; i++) {
      // TODO(4466785): Deal with recursion and formatting.
      result += list[i].toString() + ", ";
    }
    result += "]";
    return result;
  }

  static void copy(List src, int srcStart,
                   List dst, int dstStart, int count) {
    if (srcStart === null) srcStart = 0;
    if (dstStart === null) dstStart = 0;

    if (srcStart < dstStart) {
      for (int i = srcStart + count - 1, j = dstStart + count - 1;
           i >= srcStart; i--, j--) {
        dst[j] = src[i];
      }
    } else {
      for (int i = srcStart, j = dstStart; i < srcStart + count; i++, j++) {
        dst[j] = src[i];
      }
    }
  }

  static bool areEqual(List a, Object b) {
    if (a === b) return true;
    if (!(b is List)) return false;
    int length = a.length;
    if (length != b.length) return false;

    for (int i = 0; i < length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  /**
   * Returns the index in the list [a] of the given [element], starting
   * the search at index [startIndex] to [endIndex] (exclusive).
   * Returns -1 if [element] is not found.
   */
  static int indexOf(List a,
                     Object element,
                     int startIndex,
                     int endIndex) {
    if (startIndex >= a.length) {
      return -1;
    }
    if (startIndex < 0) {
      startIndex = 0;
    }
    for (int i = startIndex; i < endIndex; i++) {
      if (a[i] == element) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the last index in the list [a] of the given [element], starting
   * the search at index [startIndex] to 0.
   * Returns -1 if [element] is not found.
   */
  static int lastIndexOf(List a, Object element, int startIndex) {
    if (startIndex < 0) {
      return -1;
    }
    if (startIndex >= a.length) {
      startIndex = a.length - 1;
    }
    for (int i = startIndex; i >= 0; i--) {
      if (a[i] == element) {
        return i;
      }
    }
    return -1;
  }

  static void rangeCheck(List a, int start, int length) {
    if (length < 0) {
      throw new IllegalArgumentException("negative length $length");
    }
    if (start < 0 || start >= a.length) {
      throw new IndexOutOfRangeException(start);
    }
    if (start + length > a.length) {
      throw new IndexOutOfRangeException(start + length);
    }
  }
}

