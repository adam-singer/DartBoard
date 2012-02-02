// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

interface Timer default _Timer{
  /**
   * Creates a new timer. The [callback] callback is invoked after
   * [milliSeconds] milliseconds.
   */
  Timer(void callback(Timer timer), int milliSeconds);

  /**
   * Creates a new repeating timer. The [callback] is invoked every
   * [milliSeconds] millisecond until cancelled.
   */
  Timer.repeating(void callback(Timer timer), int milliSeconds);

  /**
   * Cancels the timer.
   */
  void cancel();
}

