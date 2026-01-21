# Git Workflow

## Branch Naming Convention
- `feat/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-name` - Documentation

## Workflow Steps

1. Create feature branch:
```bash
git checkout -b feat/my-feature
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: add my feature"
```

3. Push to remote:
```bash
git push origin feat/my-feature
```

4. Create Pull Request (PR)

5. Merge to main after approval:
```bash
git checkout main
git merge feat/my-feature
```

## Commit Message Format
```
type(scope): subject
- feat: new feature
- fix: bug fix
- docs: documentation
- refactor: code refactoring
- style: styling changes
- test: test additions
```