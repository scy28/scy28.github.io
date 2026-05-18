---
title: "eMMC 是什么？"
date: "2026-05-18"
description: "解释 eMMC 的基本概念，以及它在嵌入式 Linux 设备中的作用。"
---

## 1. eMMC 的基本概念

eMMC，全称是 Embedded MultiMediaCard，是一种嵌入式存储器。它通常直接焊接在开发板或产品主板上，用来存放系统镜像、应用程序和用户数据。

## 2. eMMC 和 SD 卡的区别

SD 卡通常是可插拔的，而 eMMC 通常是板载的。对于嵌入式 Linux 设备来说，eMMC 更适合作为系统盘，因为它稳定性更好，不容易因为接触不良导致系统启动失败。

## 3. 在嵌入式 Linux 中的作用

在 RK3566、V3S、T113 等 SoC 平台中，系统镜像可以烧录到 SD 卡、NAND Flash、NOR Flash 或 eMMC 中。对于长期运行的产品，eMMC 通常比 SD 卡更适合作为系统存储。