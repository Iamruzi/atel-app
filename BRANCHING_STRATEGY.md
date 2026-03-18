# Git 分支策略

## 🌳 分支结构

```
main (生产环境)
  ├── v1.0.0 (tag)
  ├── v1.0.1 (tag)
  └── ...

develop (开发环境)
  ├── feature/user-auth
  ├── feature/payment
  └── ...

hotfix/critical-bug (紧急修复)
```

## 📋 分支说明

### main（生产分支）
- **用途**: 生产环境，对外发布的稳定版本
- **保护**: 只能通过 PR 合并，不能直接推送
- **触发**: 推送 tag 时自动构建和发布
- **命名**: `main`

### develop（开发分支）
- **用途**: 开发环境，集成最新功能
- **保护**: 建议通过 PR 合并
- **触发**: 推送时自动构建测试版本
- **命名**: `develop`

### feature（功能分支）
- **用途**: 开发新功能
- **来源**: 从 `develop` 创建
- **合并**: 合并回 `develop`
- **命名**: `feature/功能名称`
- **示例**: `feature/user-login`, `feature/payment-integration`

### hotfix（紧急修复分支）
- **用途**: 修复生产环境的紧急 bug
- **来源**: 从 `main` 创建
- **合并**: 同时合并到 `main` 和 `develop`
- **命名**: `hotfix/bug描述`
- **示例**: `hotfix/login-crash`, `hotfix/payment-error`

## 🔄 工作流程

### 1. 开发新功能

```bash
# 1. 切换到 develop 并更新
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/user-profile

# 3. 开发并提交
git add .
git commit -m "feat: add user profile page"

# 4. 推送到远程
git push origin feature/user-profile

# 5. 在 GitHub 创建 PR: feature/user-profile → develop
# 6. Code Review 后合并
```

### 2. 发布新版本

```bash
# 1. 确保 develop 已测试通过
git checkout develop
git pull origin develop

# 2. 合并到 main
git checkout main
git pull origin main
git merge develop

# 3. 创建版本标签
git tag v1.1.0
git push origin main
git push origin v1.1.0

# 4. GitHub Actions 自动构建和发布
```

### 3. 紧急修复

```bash
# 1. 从 main 创建 hotfix 分支
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. 修复并提交
git add .
git commit -m "fix: resolve critical bug"

# 3. 推送
git push origin hotfix/critical-bug

# 4. 创建 PR 合并到 main
# 5. 同时合并到 develop
git checkout develop
git merge hotfix/critical-bug
git push origin develop

# 6. 创建 hotfix 版本
git checkout main
git tag v1.0.1
git push origin v1.0.1
```

## 🏷️ 版本号规则

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

```
v主版本号.次版本号.修订号

v1.0.0 → v1.0.1  (修复 bug)
v1.0.0 → v1.1.0  (新增功能，向下兼容)
v1.0.0 → v2.0.0  (重大变更，不向下兼容)
```

### 版本后缀

- `v1.0.0` - 生产版本（main 分支）
- `v1.0.0-dev` - 开发版本（develop 分支）
- `v1.0.0-beta` - 测试版本（feature 分支）

## 🚀 CI/CD 触发规则

### 推送到 main
- ✅ 构建生产版本
- ✅ 运行完整测试
- ❌ 不自动发布（需要 tag）

### 推送到 develop
- ✅ 构建开发版本（带 -dev 后缀）
- ✅ 运行测试
- ✅ 上传到 Artifacts

### 推送 tag (v*)
- ✅ 构建生产版本
- ✅ 创建 GitHub Release
- ✅ 上传 APK/IPA
- ✅ 生成 Changelog

### Pull Request
- ✅ 运行测试
- ✅ 代码检查
- ❌ 不构建 APK

## 📝 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具相关

# 示例
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login crash on Android"
git commit -m "docs: update API documentation"
```

## 🔐 分支保护建议

### main 分支保护
1. 访问：https://github.com/Iamruzi/atel-app/settings/branches
2. 添加规则：`main`
3. 勾选：
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing the above settings

### develop 分支保护（可选）
- ✅ Require pull request reviews
- ✅ Require status checks to pass

## 📊 分支管理最佳实践

### DO ✅
- ✅ 功能开发在 feature 分支
- ✅ 定期从 develop 更新 feature 分支
- ✅ 小步提交，频繁推送
- ✅ 写清晰的提交信息
- ✅ 合并前进行 Code Review
- ✅ 删除已合并的 feature 分支

### DON\T ❌
