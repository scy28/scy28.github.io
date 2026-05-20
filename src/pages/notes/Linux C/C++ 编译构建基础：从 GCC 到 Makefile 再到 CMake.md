---
layout: ../../layouts/NoteLayout.astro
title: "Linux C/C++ 编译构建基础：从 GCC 到 Makefile 再到 CMake"
date: "2026-05-18"
lasteditdate: "2026-05-20"
description: "梳理 C/C++ 程序从 GCC 编译流程、Makefile 构建规则到 CMake 工程管理的基础知识。"
---

## 1. 笔记简介

这篇笔记整理了 C/C++ 程序从源代码到可执行文件的基本构建过程，重点包括 GCC/G++ 的编译流程、Makefile 的构建规则、静态库与动态库的区别，以及 CMake 在工程管理中的作用。

这些内容常见于 Linux、嵌入式 Linux、Windows MinGW、CMake 工程和跨平台 C/C++ 项目中。理解这些概念后，可以更清楚地知道程序是如何被编译出来的，也能更好地理解 Makefile、CMake、动态库、静态库等工具和文件的作用。

## 2. 核心知识点

### 2.1 GCC 与 G++

`gcc` 常用于编译 C 程序，`g++` 常用于编译 C++ 程序。

更准确地说，GCC 是 GNU Compiler Collection，也就是 GNU 编译器集合。`gcc` 和 `g++` 都是编译驱动程序，它们会在背后调用预处理器、编译器、汇编器和链接器。

二者常见区别如下：

| 工具 | 常用场景 | 说明 |
|---|---|---|
| `gcc` | C 程序 | 常用于编译 `.c` 文件 |
| `g++` | C++ 程序 | 会自动按照 C++ 规则编译，并链接 C++ 标准库 |

因此，C++ 程序一般应该使用 `g++` 编译。如果使用 `gcc` 编译 C++ 程序，可能会在链接阶段出现 C++ 标准库相关错误。

### 2.2 GCC 编译的四个阶段

一个 C 文件从源代码到可执行文件，通常会经历四个阶段：

```text
.c 源文件
  ↓ 预处理
.i 预处理文件
  ↓ 编译
.s 汇编文件
  ↓ 汇编
.o 目标文件
  ↓ 链接
可执行文件
```

各阶段含义如下：

| 阶段 | 作用 | 常见生成文件 |
|---|---|---|
| 预处理 | 处理 `#include`、`#define`、条件编译等内容 | `.i` |
| 编译 | 将 C/C++ 代码转换成汇编代码 | `.s` |
| 汇编 | 将汇编代码转换成目标文件 | `.o` |
| 链接 | 将多个目标文件和库文件组合成可执行程序 | 可执行文件 |

对应命令示例：

```bash
gcc -E main.c -o main.i
gcc -S main.i -o main.s
gcc -c main.s -o main.o
gcc main.o -o app
```

平时常用的一条命令：

```bash
gcc main.c -o app
```

实际上是 GCC 自动完成了预处理、编译、汇编和链接四个阶段。

### 2.3 `.c`、`.h`、`.o` 文件的关系

`.c` 或 `.cpp` 是源文件，通常是真正参与编译的文件。

`.h` 是头文件，通常用于存放函数声明、结构体声明、宏定义等内容。头文件一般不会单独编译，而是通过：

```c
#include "add.h"
```

被包含进 `.c` 或 `.cpp` 文件中，在预处理阶段展开。

`.o` 是目标文件，是源文件经过编译和汇编后得到的中间文件。多个 `.o` 文件可以进一步链接成最终可执行程序。

可以简单理解为：

```text
.c / .cpp + .h
      ↓
     .o
      ↓
  可执行文件
```

### 2.4 为什么要分步编译

假设一个工程有这些文件：

```text
main.c
add.c
sub.c
add.h
sub.h
```

如果直接执行：

```bash
gcc main.c add.c sub.c -o app
```

那么每次都会重新编译所有源文件。

更合理的方式是：

```bash
gcc -c main.c -o main.o
gcc -c add.c -o add.o
gcc -c sub.c -o sub.o

gcc main.o add.o sub.o -o app
```

这样如果只修改了 `add.c`，理论上只需要重新生成 `add.o`，然后重新链接最终程序即可。

分步编译的意义是减少不必要的重复编译，提高工程构建效率。

### 2.5 Makefile 的作用

Makefile 不是编译器，也不是 GCC 的替代品。真正负责编译代码的仍然是 `gcc`、`g++`、`clang` 或 MSVC。

Makefile 的作用是描述构建规则，包括：

```text
要生成什么目标；
这个目标依赖哪些文件；
应该用什么命令生成。
```

`make` 工具会读取 Makefile，并根据文件修改时间判断哪些目标需要重新生成。

### 2.6 Makefile 的基本结构

Makefile 最基本的规则是：

```makefile
目标文件: 依赖文件
	命令
```

注意：命令前面必须是 Tab，而不是普通空格。

示例：

```makefile
app: main.o add.o
	gcc main.o add.o -o app

main.o: main.c add.h
	gcc -c main.c -o main.o

add.o: add.c add.h
	gcc -c add.c -o add.o

clean:
	rm -f app *.o
```

这表示：

- 生成 `app` 需要 `main.o` 和 `add.o`；
- 生成 `main.o` 需要 `main.c` 和 `add.h`；
- 生成 `add.o` 需要 `add.c` 和 `add.h`；
- `clean` 用来清理编译产物。

### 2.7 Makefile 的自动变量

Makefile 中常见的自动变量有：

| 变量 | 含义 |
|---|---|
| `$@` | 当前规则的目标文件 |
| `$<` | 当前规则的第一个依赖文件 |
| `$^` | 当前规则的所有依赖文件 |

例如：

```makefile
app: main.o add.o
	gcc $^ -o $@
```

等价于：

```makefile
app: main.o add.o
	gcc main.o add.o -o app
```

再如：

```makefile
%.o: %.c
	gcc -c $< -o $@
```

表示所有 `.o` 文件都可以由同名 `.c` 文件编译得到。

例如：

```text
main.o 由 main.c 生成
add.o 由 add.c 生成
sub.o 由 sub.c 生成
```

一个简洁的通用 Makefile 可以写成：

```makefile
CC = gcc
TARGET = app
OBJS = main.o add.o sub.o

$(TARGET): $(OBJS)
	$(CC) $^ -o $@

%.o: %.c
	$(CC) -c $< -o $@

clean:
	rm -f $(TARGET) $(OBJS)
```

### 2.8 静态库与动态库

`.o` 是目标文件，是单个源文件编译后的中间结果。静态库和动态库通常是由一个或多个 `.o` 文件进一步生成的。

关系可以理解为：

```text
.c / .cpp
   ↓
  .o
   ↓
静态库 / 动态库 / 可执行文件
```

Linux 下常见库文件如下：

| 类型 | 后缀 | 特点 |
|---|---|---|
| 静态库 | `.a` | 编译链接时打包进可执行文件 |
| 动态库 | `.so` | 程序运行时加载 |

静态库可以理解为把库代码直接放进最终可执行文件里。动态库可以理解为程序运行时再去外部加载库文件。

两者区别如下：

| 对比项 | 静态库 | 动态库 |
|---|---|---|
| Linux 后缀 | `.a` | `.so` |
| 链接方式 | 编译时链接进程序 | 运行时加载 |
| 可执行文件体积 | 较大 | 较小 |
| 运行时依赖 | 较少 | 需要能找到动态库 |
| 更新库文件 | 通常需要重新编译 | 接口兼容时可直接替换库 |

Windows 下的动态库通常是 `.dll`，类似于 Linux 下的 `.so`。Windows 下的静态库通常是 `.lib`。

但需要注意，Windows 中的 `.lib` 可能有两种含义：

| 文件 | 可能含义 |
|---|---|
| `.lib` | 真正的静态库 |
| `.lib` | DLL 对应的导入库 |

如果 `.lib` 是静态库，代码会被链接进 `.exe`。如果 `.lib` 是 DLL 的导入库，它只是告诉链接器函数在某个 `.dll` 中，程序运行时仍然需要对应的 `.dll`。

在 MinGW 中，也可能看到：

```text
xxx.dll
libxxx.dll.a
```

其中 `libxxx.dll.a` 通常是 DLL 的导入库。

### 2.9 CMake 的作用

CMake 是构建系统生成工具。它通常不直接编译代码，而是根据 `CMakeLists.txt` 生成不同平台需要的构建文件。

整体关系如下：

```text
CMakeLists.txt
    ↓ cmake
Makefile / build.ninja / Visual Studio 工程 / Xcode 工程
    ↓ make / ninja / MSBuild / xcodebuild
gcc / g++ / MSVC / clang
    ↓
可执行文件或库文件
```

可以这样理解：

```text
编译器：真正编译代码；
Makefile：描述编译规则；
make：执行 Makefile 中的规则；
CMake：生成 Makefile 或其他构建文件。
```

Makefile 主要解决的是多文件工程中手写 `gcc/g++` 命令太麻烦的问题。CMake 解决的是更高一层的问题：复杂工程、跨平台工程、多目录工程、多库依赖工程中，手写 Makefile 仍然难以维护。

一个简单的 C++ 项目可以这样写 `CMakeLists.txt`：

```cmake
cmake_minimum_required(VERSION 3.10)

project(MyCppProject)

set(CMAKE_CXX_STANDARD 17)

add_executable(app
    src/main.cpp
    src/add.cpp
)

target_include_directories(app PRIVATE
    include
)
```

常见命令含义如下：

| 命令 | 作用 |
|---|---|
| `cmake_minimum_required` | 指定 CMake 最低版本 |
| `project` | 指定工程名称 |
| `set(CMAKE_CXX_STANDARD 17)` | 指定 C++ 标准 |
| `add_executable` | 生成可执行程序 |
| `target_include_directories` | 添加头文件搜索路径 |
| `target_link_libraries` | 链接外部库 |

### 2.10 MSVC、Ninja、Visual Studio 和 Xcode

这些概念容易混，是因为它们不在同一个层级。

整体关系如下：

```text
CMakeLists.txt
    ↓ CMake
Makefile / build.ninja / Visual Studio 工程 / Xcode 工程
    ↓
make / ninja / MSBuild / xcodebuild
    ↓
gcc / g++ / MSVC / clang
    ↓
可执行文件或库文件
```

各自含义如下：

| 名称 | 类型 | 作用 |
|---|---|---|
| MSVC | 编译器工具链 | Windows 下常用的 C/C++ 编译工具链 |
| Visual Studio | IDE | 微软的集成开发环境 |
| Ninja | 构建工具 | 类似 make，读取 `build.ninja` |
| Xcode | IDE | 苹果 macOS/iOS 开发环境 |
| clang | 编译器 | macOS 和部分 Linux 项目常用编译器 |

MSVC 不是 Visual Studio。Visual Studio 是开发环境，MSVC 是其中常用的 C/C++ 编译工具链。

Ninja 和 make 是同一层级。make 读取 Makefile，ninja 读取 `build.ninja`。

Xcode 和 Visual Studio 是同一类工具。Visual Studio 常见于 Windows，Xcode 常见于 macOS。

## 3. 我的理解修正版

C/C++ 程序从源文件到可执行文件，中间需要经历预处理、编译、汇编和链接几个阶段。GCC/G++ 负责真正执行这些编译工作，其中 `gcc` 常用于 C 程序，`g++` 常用于 C++ 程序。

对于简单程序，可以直接使用一条 `gcc` 或 `g++` 命令生成可执行文件。但在多文件工程中，如果每次都把所有源文件一起编译，会造成重复编译。因此，更合理的方式是先把每个源文件编译成 `.o` 目标文件，再把多个 `.o` 文件链接成最终程序。

Makefile 的作用就是管理这种多文件构建过程。它通过“目标、依赖、命令”的形式描述构建规则，make 根据这些规则判断哪些文件需要重新编译。

当工程规模进一步增大，涉及多个目录、多个库、不同平台或不同编译器时，手写 Makefile 会变得难以维护。这时可以使用 CMake。CMake 通过 `CMakeLists.txt` 描述工程结构，然后生成 Makefile、Ninja 文件、Visual Studio 工程或 Xcode 工程，让同一套代码更容易在不同平台上构建。

## 4. 疑问与解答

### Q1：Makefile 为什么能避免每次都重新编译所有文件？

make 会根据目标文件和依赖文件的修改时间来判断是否需要重新生成。

如果目标文件不存在，或者依赖文件比目标文件更新，就重新执行对应命令。

例如：

```makefile
add.o: add.c add.h
	gcc -c add.c -o add.o
```

如果 `add.c` 或 `add.h` 被修改，`add.o` 就需要重新生成。如果它们都没有变化，`add.o` 就不需要重新编译。

### Q2：`.o` 文件和 `.so` 文件有什么区别？

`.o` 是目标文件，是源文件编译后的中间产物。

`.so` 是 Linux 下的动态链接库，通常由一个或多个 `.o` 文件进一步链接生成。

可以理解为：

```text
.c → .o → .so
```

`.o` 是中间文件，`.so` 是可以被程序运行时加载的动态库。

### Q3：动态库和静态库的核心区别是什么？

静态库会在编译链接时被打包进最终可执行文件。

动态库不会完整打包进程序，而是在程序运行时加载。

简单记忆：

```text
静态库：编译时放进程序里。
动态库：运行时从外部加载。
```

Linux 下：

```text
静态库：.a
动态库：.so
```

Windows 下：

```text
静态库：.lib
动态库：.dll
```

### Q4：CMake 相比 Makefile 的核心优势是什么？

Makefile 主要适合管理具体编译规则。

CMake 更适合管理完整工程结构，尤其是跨平台和复杂工程。

可以简单理解为：

```text
Makefile 解决“编译命令太多”的问题；
CMake 解决“工程结构太复杂、平台差异太多”的问题。
```

## 5. 易混点简表

| 易混点 | 正确理解 |
|---|---|
| gcc 和 g++ | C 程序常用 gcc，C++ 程序常用 g++ |
| `.h` 文件 | 头文件一般不单独编译，而是被源文件包含 |
| `.o` 和 `.so` | `.o` 是目标文件，`.so` 是动态库 |
| Makefile 和 gcc | Makefile 管理规则，gcc 执行编译 |
| CMake 和 Makefile | CMake 可以生成 Makefile，但不等于 Makefile |
| MSVC 和 Visual Studio | MSVC 是编译器工具链，Visual Studio 是 IDE |
| make 和 Ninja | 都是构建工具，分别读取 Makefile 和 build.ninja |
| Windows `.lib` | 可能是静态库，也可能是 DLL 的导入库 |

## 6. 一句话总结

GCC/G++ 负责真正编译代码，Makefile 负责管理多文件编译规则，CMake 负责生成更适合复杂工程和跨平台开发的构建系统。