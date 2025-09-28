# 贡献指南 🤝

感谢您考虑为 TaskMate 做出贡献！我们欢迎所有形式的贡献，无论是代码、文档还是反馈。

## 行为准则

我们致力于营造一个开放友好的环境。参与本项目即表示您同意遵守我们的行为准则：

- 使用友好和包容的语言
- 尊重不同的观点和经历
- 优雅地接受建设性批评
- 关注社区的最佳利益
- 对其他社区成员表示同理心

## 如何贡献

### 🐛 报告 Bug

发现 Bug？请帮助我们改进：

1. 检查是否已有相关 Issue
2. 如果没有，请创建新的 Issue
3. 使用 Bug 报告模板
4. 提供详细的重现步骤
5. 包含系统信息和应用版本

**Bug 报告应包含：**
- 简洁明确的标题
- 详细的问题描述
- 重现步骤
- 预期行为 vs 实际行为
- 截图或视频（如适用）
- 设备和系统信息

### 💡 建议新功能

有好想法？我们很想听听：

1. 检查是否已有类似建议
2. 创建 Feature Request Issue
3. 详细描述功能和使用场景
4. 说明为什么这个功能有用
5. 考虑实现方案

### 📝 改进文档

文档同样重要：

- 修正错别字和语法错误
- 添加缺失的说明
- 改进代码示例
- 翻译文档

### 🔧 代码贡献

#### 开发环境设置

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   git clone https://github.com/your-username/taskmate.git
   cd taskmate
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### 代码规范

我们使用以下工具确保代码质量：

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

**运行检查：**
```bash
npm run lint        # ESLint 检查
npm run typecheck   # TypeScript 检查
```

**代码风格：**
- 使用 TypeScript
- 遵循 ESLint 规则
- 使用有意义的变量名
- 添加适当的注释
- 保持函数简洁

#### 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

**示例：**
```bash
feat(task): add priority filter functionality
fix(ui): resolve task item layout issue
docs(readme): update installation instructions
```

#### Pull Request 流程

1. **确保代码质量**
   ```bash
   npm run lint
   npm run typecheck
   npm test
   ```

2. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

3. **创建 Pull Request**
   - 使用清晰的标题
   - 详细描述更改内容
   - 链接相关 Issue
   - 添加截图（如适用）

4. **代码审查**
   - 耐心等待审查
   - 积极响应反馈
   - 必要时进行修改

## 开发指南

### 项目结构

```
src/
├── components/    # 可复用组件
├── screens/       # 页面组件
├── store/         # 状态管理
├── services/      # 服务层
├── hooks/         # 自定义Hooks
├── types/         # 类型定义
└── utils/         # 工具函数
```

### 组件开发

1. **创建组件**
   ```typescript
   // src/components/YourComponent.tsx
   import React from 'react';
   import { View, Text, StyleSheet } from 'react-native';

   interface YourComponentProps {
     title: string;
   }

   export const YourComponent: React.FC<YourComponentProps> = ({ title }) => {
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

2. **导出组件**
   ```typescript
   // src/components/index.ts
   export { YourComponent } from './YourComponent';
   ```

### 状态管理

使用 Zustand 进行状态管理：

```typescript
// src/store/yourStore.ts
import { create } from 'zustand';

interface YourStore {
  data: any[];
  loading: boolean;
  setData: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useYourStore = create<YourStore>((set) => ({
  data: [],
  loading: false,
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
}));
```

### 测试

编写测试确保代码质量：

```typescript
// __tests__/YourComponent.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { YourComponent } from '../src/components/YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<YourComponent title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });
});
```

## 发布流程

1. 更新版本号
2. 更新 CHANGELOG
3. 创建 Release PR
4. 合并后自动发布

## 获取帮助

遇到问题？以下方式可以获取帮助：

- 📖 查看文档和 README
- 🔍 搜索现有 Issues
- 💬 在 Discussions 中提问
- 📧 联系维护者

## 认可

我们会在以下地方认可贡献者：

- README 中的贡献者列表
- Release Notes 中提及
- 项目官网（如果有）

## 许可证

贡献的代码将使用与项目相同的 [MIT 许可证](LICENSE)。

---

再次感谢您的贡献！🎉