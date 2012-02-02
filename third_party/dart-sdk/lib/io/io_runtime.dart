// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// The dart:io library is the concatenation of all the files in
// io_sources.gypi. This file needs to be the first file in that
// concatenation.

#library("io");
#import("dart:nativewrappers");
#import("dart:coreimpl");
#source("runtime/buffer_list.dart");
#source("runtime/chunked_stream.dart");
#source("runtime/directory.dart");
#source("runtime/directory_impl.dart");
#source("runtime/eventhandler.dart");
#source("runtime/file.dart");
#source("runtime/file_impl.dart");
#source("runtime/input_stream.dart");
#source("runtime/list_stream.dart");
#source("runtime/list_stream_impl.dart");
#source("runtime/output_stream.dart");
#source("runtime/stream_util.dart");
#source("runtime/string_stream.dart");
#source("runtime/platform.dart");
#source("runtime/platform_impl.dart");
#source("runtime/process.dart");
#source("runtime/process_impl.dart");
#source("runtime/socket.dart");
#source("runtime/socket_impl.dart");
#source("runtime/socket_stream.dart");
#source("runtime/socket_stream_impl.dart");
#source("runtime/stdio.dart");
#source("runtime/timer.dart");
#source("runtime/timer_impl.dart");
