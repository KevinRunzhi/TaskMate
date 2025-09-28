# Git 分支管理策略 🌿

## 📋 分支模型

我们采用 **Git Flow** 简化版本，适合小团队和个人开发。

### 🌟 主要分支

```
main
├── develop
│   ├── feat/add-task
│   ├── feat/task-calendar
│   ├── feat/notifications
│   ├── feat/task-categories
│   └── feat/analytics
├── hotfix/critical-bug
└── release/v1.1.0
```

### 🔧 分支类型详解

#### 1. `main` 分支
- **用途**: 生产环境代码
- **规则**:
  - 只能从 `develop` 或 `hotfix/*` 合并
  - 每次合并必须打tag
  - 代码必须经过完整测试
- **保护**: 禁止直接推送，仅通过PR合并

#### 2. `develop` 分支
- **用途**: 开发主分支
- **规则**:
  - 功能分支的合并目标
  - 持续集成环境
  - 代码相对稳定
- **合并**: 接受来自 `feat/*` 的PR

#### 3. `feat/*` 分支
- **命名**: `feat/功能描述`
- **生命周期**: 从创建到合并删除
- **示例**:
  ```
  feat/add-task-form
  feat/calendar-view
  feat/push-notifications
  feat/task-categories
  ```

#### 4. `fix/*` 分支
- **命名**: `fix/问题描述`
- **用途**: Bug修复
- **示例**:
  ```
  fix/task-deletion-crash
  fix/date-picker-timezone
  ```

#### 5. `hotfix/*` 分支
- **命名**: `hotfix/紧急修复`
- **用途**: 生产环境紧急修复
- **特点**: 可直接合并到 `main`

## 🚀 工作流程

### 新功能开发

1. **创建功能分支**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/add-task-form
   ```

2. **开发功能**
   ```bash
   # 开发代码...
   git add .
   git commit -m "feat(task): add task creation form with validation"
   ```

3. **推送分支**
   ```bash
   git push origin feat/add-task-form
   ```

4. **创建Pull Request**
   - 目标分支: `develop`
   - 模板: 使用PR模板
   - 审查: 至少1人审查

5. **合并后清理**
   ```bash
   git branch -d feat/add-task-form
   git push origin --delete feat/add-task-form
   ```

### Bug修复流程

1. **创建修复分支**
   ```bash
   git checkout develop
   git checkout -b fix/task-priority-display
   ```

2. **修复并测试**
   ```bash
   git commit -m "fix(ui): correct priority indicator color display"
   ```

3. **合并流程**
   - 非紧急: PR到 `develop`
   - 紧急: 使用 `hotfix/*` 流程

### 发布流程

1. **创建发布分支**
   ```bash
   git checkout develop
   git checkout -b release/v1.1.0
   ```

2. **准备发布**
   - 更新版本号
   - 更新CHANGELOG.md
   - 最终测试

3. **合并到主分支**
   ```bash
   git checkout main
   git merge release/v1.1.0
   git tag v1.1.0
   git push origin main --tags
   ```

4. **回合并到develop**
   ```bash
   git checkout develop
   git merge release/v1.1.0
   ```

## 📝 提交规范

### Conventional Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型 (type)
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式(不影响运行)
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建工具、依赖更新

### 范围 (scope)
- `task`: 任务相关
- `ui`: 界面相关
- `store`: 状态管理
- `service`: 服务层
- `config`: 配置相关

### 示例
```bash
feat(task): add task creation with due date picker
fix(ui): resolve priority indicator alignment issue
docs(readme): update installation instructions
style(task): improve task item spacing
refactor(store): optimize task filtering logic
test(task): add unit tests for task validation
chore(deps): update react-native to 0.73.1
```

## 🔒 分支保护规则

### main 分支
- ✅ 要求PR审查
- ✅ 要求状态检查通过
- ✅ 要求分支为最新
- ❌ 禁止强制推送
- ❌ 禁止删除分支

### develop 分支
- ✅ 要求PR审查
- ✅ 要求状态检查通过
- ❌ 禁止强制推送

## 🤖 CI/CD 集成

### GitHub Actions 流程

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type check
        run: npm run typecheck

      - name: Run tests
        run: npm test
```

## 📋 分支管理最佳实践

### ✅ 推荐做法
- 功能分支从最新的 `develop` 创建
- 经常从 `develop` 拉取更新
- 保持分支专注单一功能
- 及时删除已合并分支
- 使用有意义的分支名称

### ❌ 避免做法
- 在 `main` 分支直接开发
- 长时间不合并功能分支
- 在分支间随意合并
- 使用模糊的分支名称
- 忘记删除已合并分支

## 📊 分支生命周期

```
feat/add-task
├── 创建 (从develop)
├── 开发 (1-2周)
├── 测试
├── 代码审查
├── 合并 (到develop)
└── 删除
```

## 🎯 下一步行动

1. 初始化仓库结构
2. 设置分支保护规则
3. 配置CI/CD流程
4. 开始第一个功能分支 `feat/add-task`

---

**记住**: 好的分支策略是团队协作成功的基础！🚀