---
title: "ADB 是什么？"
date: "2026-05-18"
description: "解释 ADB 的基本概念和常见用途。"
---

## 1. ADB 的基本概念

ADB，全称是 Android Debug Bridge，也就是 Android 调试桥。它是一种用于电脑和 Android 设备之间通信的命令行工具。

## 2. ADB 能做什么？

ADB 可以用来查看设备连接状态、安装应用、查看日志、进入设备 shell、传输文件等。在 Android 开发、设备调试和部分嵌入式设备调试中都很常见。

## 3. 常见命令

```bash
adb devices
adb shell
adb push 本地文件 设备路径
adb pull 设备路径 本地路径
```

## 4. 简单理解

可以把 ADB 理解成电脑和 Android 设备之间的一座调试桥。电脑通过这座桥向设备发送命令，设备再把执行结果返回给电脑。