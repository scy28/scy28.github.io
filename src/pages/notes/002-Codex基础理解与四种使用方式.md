---
layout: ../../layouts/NoteLayout.astro
title: "Codex基础理解与四种使用方式"
date: "2026-06-06"
lasteditdate: "2026-06-06"
description: "梳理 Codex、LLM、Agent、Coding Agent 的关系，以及 Codex 桌面端、IDE 插件、CLI、网页端四种使用方式。"
noteid: "002"
---

## 1. 笔记简介

这篇笔记整理 Codex 的基础概念和几种主要使用方式。理解 Codex 之前，需要先分清几层关系：LLM 是基础模型能力，Agent 是把模型接入工具和环境后的执行系统，Coding Agent 则是专门面向代码项目的软件开发 Agent。

Codex 可以放在 Coding Agent 这一类工具中理解。类似的产品或能力还包括 Claude Code、Cursor Agent、一些 IDE 内置的 AI 编程 Agent 等。它们的共同点是：不只是回答代码问题，还会读取项目、理解上下文、修改文件、运行命令、检查结果，并在一定权限边界内完成开发任务。

## 2. 核心知识点

### 2.1 LLM、Agent、Coding Agent 和 Codex 的关系

可以先用一张层级表来理解：

| 层级 | 含义 | 例子 |
|---|---|---|
| LLM | 负责理解、推理和生成内容的大语言模型 | GPT、Claude、豆包背后的模型能力 |
| Agent | 在 LLM 外层加入工具、记忆、上下文、权限和执行流程 | 能查资料、调工具、操作文件或调用外部系统的智能体 |
| Coding Agent | 面向软件开发场景的 Agent | Codex、Claude Code、Cursor Agent 等 |
| Codex | OpenAI 的 Coding Agent 产品 | 可在桌面端、IDE、CLI、网页端使用 |

普通问答式 LLM 更像“会解释和生成内容的模型入口”。Coding Agent 则更像“可以围绕项目行动的开发助手”：它不只生成答案，还会结合项目文件、命令行、Git diff、测试结果、浏览器或外部工具来推进任务。

因此，Codex 不是单纯的聊天 UI。聊天框只是入口，背后真正重要的是 Agent 工作流：模型负责判断下一步，工具负责执行动作，沙箱和审批负责限制风险，线程和项目上下文负责保存任务状态。

### 2.2 Codex 的四种使用方式

Codex 常见入口可以分成四类：桌面应用、IDE 插件、CLI 和网页端。它们使用的是同一类 Coding Agent 能力，但适合的工作位置不同。

| 使用方式 | 入口 | 适合场景 | 主要特点 |
|---|---|---|---|
| 桌面应用 | macOS / Windows 的 Codex app | 多项目、多线程、本地项目开发、工作树并行任务 | 功能最完整，适合长期管理多个项目 |
| IDE 插件 | VS Code、Cursor、Windsurf 等 VS Code 兼容编辑器，也有 JetBrains 集成 | 边看代码边解释、修改、补全当前文件或选中代码 | 和编辑器上下文贴得最近 |
| CLI | 终端里的 `codex` 命令 | 在当前目录中让 Codex 读代码、改文件、跑命令，也适合脚本化任务 | 轻量、直接、适合终端工作流 |
| 网页端 | `https://chatgpt.com/codex/cloud` | 连接 GitHub 仓库后，把任务交给云端环境处理 | 适合云端任务、PR、远程并行处理 |

![Codex 桌面应用主界面](/images/notes/n002-codex-agent/codex-desktop-main.png)

<p class="figure-title">图1 Codex 桌面应用主界面</p>

图1展示了 Codex 桌面应用把项目、线程、输入框、GitHub / Linear 等入口集中在一个界面里。它更像项目级任务中枢，而不是单纯的聊天窗口。

桌面应用的优势是集中：可以选择项目、创建多个线程、使用 Local / Worktree / Cloud 模式、查看 Git diff、打开集成终端、使用 in-app browser，并和 IDE 插件同步上下文。

![VS Code 中的 Codex 插件界面](/images/notes/n002-codex-agent/codex-vscode-plugin.png)

<p class="figure-title">图2 VS Code 中的 Codex 插件界面</p>

图2展示了 IDE 插件把 Codex 放进编辑器侧边栏后的工作方式。它适合在阅读当前文件、选择代码片段或处理 TODO 时直接让 Codex 接住上下文。

IDE 插件的优势是贴着代码。打开文件、选中代码、引用 `@文件名`，再让 Codex 解释当前文件或完成局部修改，会比在普通聊天窗口里描述项目更自然。

![Codex CLI 终端界面](/images/notes/n002-codex-agent/codex-cli-main.png)

<p class="figure-title">图3 Codex CLI 终端界面</p>

图3展示了 CLI 版本运行在终端里的状态。它适合在某个项目目录中直接启动 Codex，让它围绕当前目录工作。

CLI 的价值不是界面，而是位置。它就在终端里，可以进入任意项目目录后运行 `codex`，让 Codex 读取项目、修改文件、跑测试；也可以通过 `codex exec` 做非交互式任务，把 Agent 接进脚本或自动化流程。

![Codex 网页端界面](/images/notes/n002-codex-agent/codex-web-main.png)

<p class="figure-title">图4 Codex 网页端界面</p>

图4展示了 Codex 网页端偏向云端任务的视角，适合把 GitHub 仓库中的问题交给远端环境处理。

网页端更像云端 Coding Agent。它适合连接 GitHub 仓库后，让 Codex 在远端环境中读取仓库、执行任务、产出改动，并进一步生成 PR。

![Codex 网页端需要连接 GitHub](/images/notes/n002-codex-agent/codex-web-github.png)

<p class="figure-title">图5 Codex 网页端连接 GitHub 的入口</p>

图5展示了网页端连接 GitHub 的入口。网页端如果要真正处理代码仓库，通常需要连接 GitHub，因为云端任务需要仓库读取、运行和提交改动的权限。

### 2.3 安装、登录与 npm

Codex 可以用 ChatGPT 账号登录，也可以用 OpenAI API key 登录。两条路径的计费和功能范围不同：

| 登录方式 | 适合场景 | 计费和功能特点 |
|---|---|---|
| ChatGPT 账号 | 个人日常使用、桌面端、CLI、IDE 插件、网页端 | 使用 ChatGPT 计划内包含的 Codex 权益 |
| OpenAI API key | CI、脚本、自动化、本地程序化任务 | 按 OpenAI Platform API token 用量计费，部分依赖 ChatGPT 工作区或云端服务的功能可能不可用 |

CLI 的常见安装方式包括官方安装脚本和 npm：

```powershell
# Windows 官方安装脚本
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"

# 使用 npm 安装
npm install -g @openai/codex
```

```bash
# macOS / Linux 官方安装脚本
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# 使用 npm 安装
npm install -g @openai/codex
```

`npm` 是 Node.js 生态中的包管理器和包注册表。它最常用于安装 JavaScript / Node.js 相关依赖，但也经常用来分发命令行工具。`npm install -g @openai/codex` 表示从 npm registry 全局安装 OpenAI 发布的 Codex CLI 包，安装完成后终端中就可以使用 `codex` 命令。

### 2.4 沙箱、权限和工具调用

Codex 能改文件、跑命令，所以本地使用时必须有权限边界。这里可以把两个概念分开：

| 控制 | 作用 |
|---|---|
| sandbox | 技术边界：限制命令能访问哪些目录、能否联网、能否写入文件 |
| approval | 审批边界：当 Codex 要越过当前权限时，是否需要人工确认 |

常见沙箱模式：

| 模式 | 含义 |
|---|---|
| `read-only` | 只能读取，不主动修改文件或运行有影响的命令 |
| `workspace-write` | 可以在当前工作区内读写和运行常规命令 |
| `danger-full-access` | 基本取消沙箱限制，风险最高 |

CLI 并不等于“直接拥有整台电脑权限”。更合理的默认方式是让 Codex 在当前项目工作区内运行，越界时再触发审批。Windows、macOS、Linux / WSL2 上的沙箱实现方式不同，但目标一致：让 Coding Agent 可以做实际工作，同时把风险限制在明确边界内。

### 2.5 额度和收费

Codex 的使用可以按两条计费线理解。

第一条是 ChatGPT 订阅线。ChatGPT 的不同套餐会包含不同程度的 Codex 权益，常见的 Plus 价格是每月 20 美元。不同套餐的额度和可用模型不同，界面里通常会按滚动时间窗口显示剩余额度，例如 5 小时额度、一周额度等；更高档位会提供更高的使用上限。

第二条是 API key 计费线。使用 OpenAI API key 登录 Codex CLI、SDK 或 IDE 插件时，消耗走 OpenAI Platform，用多少 token 收多少费用。这条路径更适合 CI、脚本、自动化和共享环境。

![桌面应用中的额度提示](/images/notes/n002-codex-agent/codex-desktop-usage.png)

<p class="figure-title">图6 桌面应用中的额度提示</p>

图6展示了桌面应用中不同模型或不同时间窗口下的剩余额度。

![VS Code 插件中的额度提示](/images/notes/n002-codex-agent/codex-vscode-usage.png)

<p class="figure-title">图7 VS Code 插件中的额度提示</p>

图7展示了 IDE 插件中的额度提示区域，用来确认当前可用额度或模型相关状态。

![CLI 中的额度提示](/images/notes/n002-codex-agent/codex-cli-usage.png)

<p class="figure-title">图8 CLI 中的额度提示</p>

图8展示了 CLI 中的状态提示。通过 `/status` 可以查看当前线程、上下文和 rate limits 等状态。

影响消耗的因素主要包括模型、推理强度、任务复杂度、是否使用图片生成、是否调用子 Agent 或自动化任务。个人使用时可以先把它记成：ChatGPT 订阅线看套餐和时间窗口，API key 线看 token 用量。

## 3. 我的理解重述与修正

Codex 属于 Coding Agent，而不是普通问答模型本身。ChatGPT、豆包这类产品可以作为通用 LLM 问答入口；Codex、Claude Code、Cursor Agent 这一类工具，则是在模型能力之外接入了项目上下文、文件系统、命令行、Git、浏览器、MCP 或其他工具。

桌面应用可以看作 Codex 的项目工作台，IDE 插件是编辑器里的 Codex，CLI 是终端里的 Codex，网页端是云端 GitHub 工作流里的 Codex。它们不是四个完全不同的东西，而是同一个 Coding Agent 能力在不同工作位置上的入口。

普通对话和项目 Agent 工作也要区分：如果只是问概念，Codex 和 ChatGPT 中相同模型的表现可能接近；如果任务涉及代码仓库、文件修改、命令执行和验证结果，Codex 的优势才会明显出现。

## 4. 问题解答

### Q1：Codex 和普通 LLM 问答的核心区别是什么？

普通 LLM 问答主要生成回答；Codex 这样的 Coding Agent 会围绕项目执行任务。

更具体地说，LLM 负责理解和生成，Agent 负责把模型输出接到工具链上。Coding Agent 则把工具链重点放在软件开发场景：读代码、改文件、运行测试、分析报错、做代码审查、生成提交或 PR。

### Q2：Codex 桌面应用支持哪些系统？

Codex app 当前主要面向 macOS 和 Windows。Windows 版本支持原生 Windows agent、PowerShell、Windows sandbox，也可以配置到 WSL2。Linux 上更常见的入口是 CLI 和 IDE 插件。

### Q3：CLI 是什么意思？

CLI 是 Command Line Interface，中文可以理解为“命令行界面”。它不是某一个具体终端，而是一种使用方式：在 PowerShell、Windows Terminal、cmd、Git Bash、macOS Terminal 或 Linux shell 中输入命令来操作程序。

Codex CLI 就是通过 `codex` 命令启动 Codex：

```bash
codex
codex "Explain this codebase to me"
codex exec "Fix the CI failure"
```

### Q4：网页端为什么需要连接 GitHub？

Codex web 的重点是云端代码任务。要让它处理仓库中的代码，就需要知道仓库位置，也需要读取代码、运行任务和提交改动的权限。因此网页端通常要连接 GitHub 后，才能完整使用云端 Coding Agent 工作流。

### Q5：四种入口怎么选择？

| 任务 | 更适合的入口 |
|---|---|
| 多项目、多个线程、长期管理本地任务 | 桌面应用 |
| 正在编辑代码，希望 Codex 理解当前文件 | IDE 插件 |
| 在终端里处理当前目录、跑命令、接脚本 | CLI |
| 让云端基于 GitHub 仓库执行任务或生成 PR | 网页端 |

## 5. 易混淆点对照

| 易混淆点 | 区别 |
|---|---|
| LLM 和 Agent | LLM 负责理解与生成；Agent 在 LLM 外层接入工具、权限、环境和执行流程 |
| Agent 和 Coding Agent | Agent 是通用智能体概念；Coding Agent 是面向软件开发任务的 Agent |
| ChatGPT 和 Codex | ChatGPT 更偏通用对话入口；Codex 更偏软件开发任务执行入口 |
| Codex 和 Claude Code / Cursor Agent | 都可放在 Coding Agent 工具范畴中，但所属公司、入口形态、工具链和生态不同 |
| 桌面应用和网页端 | 桌面应用偏本地项目工作台；网页端偏云端 GitHub 仓库任务 |
| IDE 插件和桌面应用 | IDE 插件贴近当前编辑器；桌面应用更适合项目级、多线程任务管理 |
| CLI 和终端 | 终端是运行命令的环境；CLI 是程序提供的命令行使用方式 |
| npm 和应用商店 | npm 是 Node.js 生态包管理器和注册表；应用商店是操作系统或平台的软件分发渠道 |
| ChatGPT 订阅额度和 API key 计费 | ChatGPT 登录走套餐权益和时间窗口；API key 登录走 OpenAI Platform token 计费 |
| 沙箱和审批 | 沙箱是技术边界；审批是越界前的人类确认流程 |

## 6. 总结

Codex 的核心定位是 Coding Agent：它把大语言模型接入项目文件、命令行、Git、浏览器和外部工具，让模型不只回答问题，还能在明确权限边界内推进开发任务。

四种使用方式对应四个工作位置：桌面应用是项目工作台，IDE 插件贴近代码编辑器，CLI 贴近终端和自动化，网页端贴近云端 GitHub 工作流。
