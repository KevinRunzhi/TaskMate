# 开发指南 🛠️

本文档提供 TaskMate 项目的详细开发指南。

## 环境搭建

### 系统要求

- **Node.js**: 18.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **React Native CLI**: 最新版本
- **Android Studio**: Android 开发 (API Level 21+)
- **Xcode**: iOS 开发 (iOS 12.0+)

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/taskmate.git
   cd taskmate
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **iOS 配置**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android 配置**
   确保 Android SDK 和模拟器已正确配置

## 开发工作流

### 启动开发服务器

```bash
# 启动 Metro
npm start

# 或者直接运行平台
npm run android  # Android
npm run ios      # iOS
```

### 代码检查

```bash
# ESLint 检查
npm run lint

# TypeScript 类型检查
npm run typecheck

# 同时运行所有检查
npm run check
```

### 调试

1. **React Native Debugger**
   - 下载并安装 React Native Debugger
   - 启动应用后在设备上开启调试模式

2. **Chrome DevTools**
   - 在应用中摇晃设备或按 Cmd+D (iOS) / Cmd+M (Android)
   - 选择 "Debug with Chrome"

3. **Flipper**
   - 推荐使用 Flipper 进行网络请求和状态调试

## 项目架构

### 目录结构
```
src/
├── components/          # 可复用组件
│   ├── TaskItem.tsx    # 任务项组件
│   ├── TaskList.tsx    # 任务列表
│   ├── Priority*/      # 优先级相关组件
│   └── index.ts        # 组件导出
├── screens/            # 页面组件
│   └── HomeScreen.tsx  # 主页面
├── store/              # 状态管理
│   └── taskStore.ts    # 任务状态
├── services/           # 服务层
│   └── taskService.ts  # 数据服务
├── hooks/              # 自定义 Hooks
│   └── useTasks.ts     # 任务管理 Hook
├── types/              # TypeScript 类型
│   └── index.ts        # 全局类型定义
└── utils/              # 工具函数
    ├── constants.ts    # 常量
    └── helpers.ts      # 助手函数
```

### 架构原则

1. **关注点分离**
   - UI 组件专注于展示
   - 业务逻辑在 Hook 和 Store 中
   - 数据访问在 Service 层

2. **类型安全**
   - 所有组件和函数都有完整的 TypeScript 类型
   - 严格的类型检查配置

3. **可复用性**
   - 组件设计考虑复用性
   - 通过 props 控制组件行为

## 开发规范

### 组件开发

1. **函数组件**
   ```typescript
   import React from 'react';
   import { View, Text, StyleSheet } from 'react-native';

   interface ComponentProps {
     title: string;
     onPress?: () => void;
   }

   export const Component: React.FC<ComponentProps> = ({ title, onPress }) => {
     return (
       <View style={styles.container}>
         <Text style={styles.title}>{title}</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: {
       padding: 16,
     },
     title: {
       fontSize: 18,
       fontWeight: 'bold',
     },
   });
   ```

2. **样式规范**
   - 使用 StyleSheet.create
   - 颜色值从 constants.ts 引用
   - 响应式设计考虑

3. **性能优化**
   - 使用 React.memo 避免不必要渲染
   - 合理使用 useCallback 和 useMemo
   - 大列表使用 FlatList

### 状态管理

使用 Zustand 进行状态管理：

```typescript
import { create } from 'zustand';

interface Store {
  data: any[];
  loading: boolean;
  setData: (data: any[]) => void;
}

export const useStore = create<Store>((set) => ({
  data: [],
  loading: false,
  setData: (data) => set({ data }),
}));
```

### 数据流

```
UI Components → Hooks → Store → Services → Storage
```

1. **UI 组件** 通过 Hooks 获取数据和操作方法
2. **Hooks** 封装业务逻辑，调用 Store 方法
3. **Store** 管理应用状态，调用 Service
4. **Service** 处理数据持久化和 API 调用

## 测试

### 单元测试

```bash
# 运行测试
npm test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage
```

### 测试示例

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TaskItem } from '../TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renders task title correctly', () => {
    const { getByText } = render(<TaskItem task={mockTask} />);
    expect(getByText('Test Task')).toBeTruthy();
  });
});
```

## 性能优化

### 构建优化

1. **Bundle 分析**
   ```bash
   npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js --assets-dest android-assets
   ```

2. **代码分割**
   - 懒加载非关键组件
   - 动态导入大型库

3. **图片优化**
   - 使用适当的图片格式和尺寸
   - 考虑使用 WebP 格式

### 运行时优化

1. **列表性能**
   ```typescript
   <FlatList
     data={tasks}
     getItemLayout={(data, index) => ({
       length: ITEM_HEIGHT,
       offset: ITEM_HEIGHT * index,
       index,
     })}
     removeClippedSubviews={true}
     maxToRenderPerBatch={10}
   />
   ```

2. **状态更新**
   - 避免不必要的状态更新
   - 使用 React.memo 缓存组件

## 常见问题

### Android 问题

1. **构建失败**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

2. **Metro 缓存问题**
   ```bash
   npx react-native start --reset-cache
   ```

### iOS 问题

1. **Pod 安装失败**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Xcode 构建错误**
   - 清理构建文件夹 (Cmd+Shift+K)
   - 重新构建项目

## 部署

### Android APK

```bash
cd android
./gradlew assembleRelease
```

### iOS IPA

1. 在 Xcode 中选择 "Product" → "Archive"
2. 通过 Organizer 分发应用

## 贡献

查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何贡献代码。

## 支持

遇到问题？

- 📖 查看文档
- 🐛 提交 Issue
- 💬 参与讨论