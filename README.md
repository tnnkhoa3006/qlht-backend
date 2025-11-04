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

## 🚀 Hướng dẫn cho thành viên mới

### 1. Cài đặt các công cụ cần thiết
- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [pgAdmin4](https://www.pgadmin.org/download/)
- [Git](https://git-scm.com/downloads)

### 2. Clone và cài đặt project
```bash
# Clone repository
git clone https://github.com/tnnkhoa3006/qlht-backend.git
cd qlht-backend

# Cài đặt dependencies
npm install

# Copy file môi trường
cp .env.example .env
```

### 3. Khởi động Docker và Database
```bash
# Khởi động container PostgreSQL
docker-compose up -d
```

### 4. Tạo Database trong pgAdmin4
1. Mở pgAdmin4
2. Tạo server mới:
   - Chuột phải vào "Servers" -> "Register" -> "Server"
   - Tab General:
     - Name: QLHT Local (hoặc tên tùy chọn)
   - Tab Connection:
     - Host: localhost
     - Port: 5432
     - Username: postgres
     - Password: teamdb@22cntt1
3. Tạo database:
   - Chuột phải vào "Databases"
   - Create -> Database
   - Database name: qlhtdb
   - Save

### 5. Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:5000

### ⚠️ Xử lý lỗi thường gặp

1. Lỗi "password authentication failed":
   - Kiểm tra lại thông tin trong file .env
   - Đảm bảo đã tạo database trong pgAdmin4

2. Lỗi "database does not exist":
   - Kiểm tra đã tạo database "qlhtdb" trong pgAdmin4 chưa
   - Đảm bảo đã refresh list databases trong pgAdmin4

3. Lỗi Docker:
   - Đảm bảo Docker Desktop đang chạy
   - Thử restart Docker Desktop
   - Chạy lại lệnh docker-compose up -d

4. Port đã được sử dụng:
   - Kiểm tra và tắt các ứng dụng đang dùng port 5432 (PostgreSQL) hoặc 5000 (Node.js)
   - Hoặc đổi port trong file docker-compose.yml và .env

### 🔄 Cập nhật code mới
```bash
# Pull code mới
git pull

# Cài đặt dependencies mới (nếu có)
npm install

# Khởi động lại container
docker-compose restart
```

### 💾 Backup và Restore Database

#### Backup (Sao lưu dữ liệu)
```bash
# Export toàn bộ database ra file SQL
docker exec -t qlht-backend-db-1 pg_dump -U postgres qlhtdb > backup.sql

# Export một bảng cụ thể (ví dụ: bảng users)
docker exec -t qlht-backend-db-1 pg_dump -U postgres -t users qlhtdb > users_backup.sql
```

#### Restore (Khôi phục dữ liệu)
```bash
# Import từ file SQL vào database
docker exec -i qlht-backend-db-1 psql -U postgres -d qlhtdb < backup.sql
```

#### Reset Database
```bash
# Dừng container
docker-compose down

# Xóa thư mục pgdata (cẩn thận: sẽ mất hết dữ liệu)
rm -rf pgdata

# Khởi động lại với database trống
docker-compose up -d
```

#### Chia sẻ dữ liệu trong team
1. Người chia sẻ:
   - Export database: `docker exec -t qlht-backend-db-1 pg_dump -U postgres qlhtdb > share_data.sql`
   - Chia sẻ file `share_data.sql` cho team

2. Người nhận:
   - Copy file `share_data.sql` vào thư mục project
   - Import database: `docker exec -i qlht-backend-db-1 psql -U postgres -d qlhtdb < share_data.sql`

#### Lưu ý về dữ liệu
- Dữ liệu được lưu trong thư mục `pgdata`
- KHÔNG xóa thư mục này nếu muốn giữ dữ liệu
- Nên backup định kỳ để đề phòng mất dữ liệu
- File `.gitignore` đã được cấu hình để không push dữ liệu database lên git

## 🐳 Cài đặt và Chạy với Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/)

### Các bước cài đặt

1. **Clone repository và cài đặt dependencies**
```bash
git clone https://github.com/tnnkhoa3006/qlht-backend.git
cd qlht-backend
npm install
```

2. **Thiết lập môi trường**
```bash
# Copy file môi trường mẫu
cp .env.example .env
```

3. **Chạy database với Docker**
```bash
# Khởi động PostgreSQL container
docker-compose up -d
```

4. **Chạy ứng dụng**
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:5000`

### Cấu hình Database
Database PostgreSQL sẽ được cấu hình với các thông tin sau:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: khoatnnk
- Database: demodb

### Quản lý Container
```bash
# Xem logs của database
docker logs qlht-backend-db-1

# Dừng các containers
docker-compose down

# Khởi động lại containers
docker-compose restart
```

### Troubleshooting Docker

1. **Lỗi kết nối database**
   - Kiểm tra Docker Desktop đã chạy chưa
   - Kiểm tra container database đang chạy: `docker ps`
   - Kiểm tra file `.env` có đúng thông tin không
   - Thử khởi động lại container: `docker-compose restart`

2. **Port đã được sử dụng**
   - Kiểm tra có process nào đang dùng port 5432 không
   - Có thể đổi port trong `docker-compose.yml` nếu cần

## �🚀 Cài đặt Git

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
