# QLHT Backend - Development Guide

## 📋 Mục lục
- [Cấu trúc Project](#cấu-trúc-project)
- [Cài đặt và Setup](#cài-đặt-và-setup)
- [Cấu hình Git](#cấu-hình-git)
- [Quy trình làm việc với Git](#quy-trình-làm-việc-với-git)
- [Quy tắc đặt tên](#quy-tắc-đặt-tên)
- [Commit Message Convention](#commit-message-convention)
- [Branch Strategy](#branch-strategy)
- [Code Review Process](#code-review-process)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🚀 Cài đặt Git

### Windows
```bash
# Tải Git từ https://git-scm.com/download/win
# Hoặc sử dụng Chocolatey
choco install git

# Hoặc sử dụng Winget
winget install Git.Git
```

### macOS
```bash
# Sử dụng Homebrew
brew install git

# Hoặc tải từ https://git-scm.com/download/mac
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

## ⚙️ Cấu hình Git

### Cấu hình cơ bản
```bash
# Cấu hình thông tin cá nhân
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Cấu hình editor mặc định
git config --global core.editor "code --wait"  # VS Code
# hoặc
git config --global core.editor "vim"

# Cấu hình line ending (quan trọng cho Windows)
git config --global core.autocrlf true
git config --global core.safecrlf true
```

### Cấu hình nâng cao
```bash
# Tạo alias hữu ích
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Cấu hình push behavior
git config --global push.default simple
git config --global push.autoSetupRemote true
```

## 🔄 Quy trình làm việc với Git

### 1. Clone repository
```bash
git clone <repository-url>
cd qlht-backend
```

### 2. Tạo branch mới cho feature
```bash
# Cập nhật main branch
git checkout main
git pull origin main

# Tạo branch mới
git checkout -b feature/your-feature-name
# hoặc
git checkout -b bugfix/issue-description
```

### 3. Làm việc với code
```bash
# Kiểm tra trạng thái
git status

# Thêm files vào staging area
git add .
# hoặc thêm file cụ thể
git add src/controllers/userController.js

# Commit changes
git commit -m "feat: add user authentication"
```

### 4. Push branch lên remote
```bash
# Push branch mới lên remote
git push -u origin feature/your-feature-name

# Push updates cho branch đã tồn tại
git push
```

### 5. Tạo Pull Request
- Truy cập GitHub/GitLab repository
- Click "New Pull Request"
- Chọn base branch (thường là `main`)
- Chọn head branch (branch của bạn)
- Điền mô tả chi tiết về changes
- Assign reviewers

### 6. Merge và cleanup
```bash
# Sau khi PR được merge, quay về main
git checkout main
git pull origin main

# Xóa branch đã merge
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## 📝 Quy tắc đặt tên

### Branch Naming Convention
```
feature/description-of-feature
bugfix/description-of-bug
hotfix/critical-issue-description
chore/maintenance-task
docs/documentation-update
refactor/code-improvement
test/add-test-coverage
```

**Ví dụ:**
- `feature/user-authentication`
- `bugfix/login-validation-error`
- `hotfix/security-vulnerability`
- `chore/update-dependencies`

### File Naming Convention
```
# Controllers
userController.js
authController.js

# Models
User.js
Product.js

# Services
userService.js
emailService.js

# Utils
validation.js
helpers.js

# Config
database.js
redis.js
```

## 💬 Commit Message Convention

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples
```bash
feat(auth): add JWT token validation
fix(api): resolve user creation endpoint error
docs(readme): update installation instructions
style(eslint): fix code formatting issues
refactor(controllers): extract common validation logic
test(user): add unit tests for user service
chore(deps): update express to latest version
```

## 🌿 Branch Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Integration branch for features

### Supporting Branches
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes
- `release/*`: Release preparation

### Workflow
```
main ← develop ← feature/user-auth
main ← develop ← feature/payment
main ← hotfix/security-patch
```

## 👥 Code Review Process

### Checklist cho Reviewer
- [ ] Code follows project conventions
- [ ] No console.log statements left
- [ ] Error handling is proper
- [ ] Performance considerations
- [ ] Security implications
- [ ] Documentation updated if needed
- [ ] Tests added/updated

### Checklist cho Author
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] No merge conflicts
- [ ] Clear commit messages
- [ ] PR description is detailed
- [ ] Assign appropriate reviewers

### Review Comments Guidelines
```bash
# Good comments
"Consider using async/await instead of callbacks for better readability"
"Add error handling for this API call"
"This function could be extracted to a utility module"

# Avoid
"Fix this"
"Wrong"
"Bad code"
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Merge Conflicts
```bash
# Xem conflicts
git status

# Resolve conflicts trong editor
# Sau đó add resolved files
git add resolved-file.js

# Complete merge
git commit
```

#### 2. Undo Last Commit
```bash
# Undo commit, keep changes
git reset --soft HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1
```

#### 3. Change Last Commit Message
```bash
git commit --amend -m "New commit message"
```

#### 4. Rebase Interactive
```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Options:
# pick: use commit
# reword: change commit message
# edit: modify commit
# squash: combine with previous commit
# drop: remove commit
```

#### 5. Stash Changes
```bash
# Stash current changes
git stash

# Apply stash
git stash pop

# List stashes
git stash list

# Apply specific stash
git stash apply stash@{0}
```

#### 6. Reset to Remote
```bash
# Reset local branch to match remote
git fetch origin
git reset --hard origin/main
```

### Useful Commands
```bash
# Xem commit history
git log --oneline --graph --all

# Xem changes trong file
git diff

# Xem changes staged
git diff --cached

# Xem remote branches
git branch -r

# Xem all branches
git branch -a

# Checkout remote branch
git checkout -b local-branch origin/remote-branch
```

## 📚 Resources

### Documentation
- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Tools
- **GUI Clients**: GitHub Desktop, GitKraken, SourceTree
- **VS Code Extensions**: GitLens, Git Graph
- **Terminal Tools**: Oh My Zsh (git plugin), Fish shell

### Best Practices
1. **Commit Often**: Small, focused commits
2. **Write Good Messages**: Clear, descriptive commit messages
3. **Review Before Push**: Always review your changes
4. **Keep Branches Updated**: Regularly sync with main
5. **Use .gitignore**: Don't commit unnecessary files
6. **Backup Important Work**: Use stashes for temporary work

## 🆘 Getting Help

### Team Contacts
- **Tech Lead**: [Name] - [email]
- **Senior Developer**: [Name] - [email]
- **DevOps**: [Name] - [email]

### Communication Channels
- **Slack**: #backend-team
- **Email**: backend-team@company.com
- **Meetings**: Daily standup at 9:00 AM

---

**Lưu ý**: Đây là guidelines chung. Một số quy tắc có thể được điều chỉnh theo từng dự án cụ thể. Luôn tham khảo với team lead trước khi thay đổi workflow.
