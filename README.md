# TaskMate 📝

> 您的智能任务管理助手

TaskMate 是一个功能强大、界面美观的移动端任务管理应用，帮助用户高效地组织和管理日常待办事项。支持优先级分类、智能排序、数据持久化等核心功能。

## ✨ 特性

- 🎯 **任务管理** - 轻松创建、编辑、删除和完成任务
- 🏷️ **优先级分类** - 四级优先级系统（低、中、高、紧急）
- 🔍 **智能搜索** - 快速搜索任务标题和描述
- 📊 **数据统计** - 实时显示任务完成情况和统计信息
- 💾 **数据持久化** - 本地存储，数据永不丢失
- 🎨 **优雅界面** - 现代化 UI 设计，用户体验优秀
- 📱 **跨平台** - 支持 iOS 和 Android

## 🚀 快速开始

### 环境要求

- Node.js 18+
- React Native CLI
- Android Studio (Android 开发)
- Xcode (iOS 开发)

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/KevinRunzhi/TaskMate.git
   cd taskmate
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **iOS 安装 Pods**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **启动应用**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## 📱 功能展示

### 主界面
- 📈 任务统计卡片
- 📋 任务列表展示
- 🔍 搜索和过滤功能

### 任务管理
- ✅ 任务状态切换（待处理 → 进行中 → 已完成）
- 🏷️ 优先级标识和筛选
- 📅 截止日期显示
- 🏷️ 任务标签管理

### 优先级系统
- 🟢 **低优先级** - 日常例行任务
- 🟡 **中优先级** - 重要但不紧急
- 🔴 **高优先级** - 重要且紧急
- 🟣 **紧急** - 需要立即处理

## 🛠️ 技术栈

- **框架**: React Native 0.73
- **语言**: TypeScript
- **状态管理**: Zustand
- **导航**: React Navigation 6
- **存储**: AsyncStorage
- **UI组件**: React Native Elements
- **工具**: Metro, ESLint, Prettier

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── TaskItem.tsx    # 任务项组件
│   ├── TaskList.tsx    # 任务列表组件
│   ├── PrioritySelector.tsx  # 优先级选择器
│   └── ...
├── screens/            # 页面组件
│   ├── HomeScreen.tsx  # 主页面
│   └── ...
├── store/              # 状态管理
│   └── taskStore.ts    # 任务状态管理
├── services/           # 服务层
│   └── taskService.ts  # 数据服务
├── hooks/              # 自定义Hooks
│   └── useTasks.ts     # 任务管理Hook
├── types/              # 类型定义
│   └── index.ts        # 全局类型
└── utils/              # 工具函数
    ├── constants.ts    # 常量定义
    └── helpers.ts      # 助手函数
```

## 🎨 设计理念

TaskMate 采用现代化的 Material Design 风格，注重用户体验：

- **简洁明了** - 界面干净，功能一目了然
- **高效操作** - 最少的点击完成最多的任务
- **视觉反馈** - 丰富的动画和状态提示
- **无障碍设计** - 支持辅助功能，人人可用

## 🔧 开发命令

```bash
# 启动开发服务器
npm start

# 运行 Android
npm run android

# 运行 iOS
npm run ios

# 代码检查
npm run lint

# 类型检查
npm run typecheck

# 运行测试
npm test
```

## 📊 数据模型

### Task (任务)
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  tags?: string[];
}
```

### Priority (优先级)
```typescript
enum Priority {
  LOW = 'low',        // 低优先级
  MEDIUM = 'medium',  // 中优先级
  HIGH = 'high',      // 高优先级
  URGENT = 'urgent'   // 紧急
}
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

### 贡献方式

1. 🐛 报告 Bug
2. 💡 提出新功能建议
3. 📝 改进文档
4. 🔧 提交代码

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢所有为 TaskMate 做出贡献的开发者和用户！

## 📞 联系我们

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/KevinRunzhi/TaskMate/issues)
- 💬 讨论: [GitHub Discussions](https://github.com/KevinRunzhi/TaskMate/discussions)

---

**TaskMate** - 让任务管理变得简单高效 ✨
