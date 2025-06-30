# 🤝 Contributing to NZaoCard

Thank you for your interest in contributing to NZaoCard! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🎯 How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide your browser and OS information
- Include screenshots if applicable

### Suggesting Enhancements

- Use the GitHub issue tracker with the "enhancement" label
- Describe the feature and why it would be useful
- Include mockups or examples if possible

### Pull Requests

- Fork the repository
- Create a feature branch
- Make your changes
- Add tests if applicable
- Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/linkcard_generator.git
   cd linkcard_generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat: add share button component
fix: resolve mobile layout issues
docs: update README with new features
style: format code with prettier
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use strict mode

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Keep components small and focused

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Use CSS custom properties for theming
- Ensure responsive design

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful variable names
- Add comments for complex logic

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

## 🐛 Reporting Bugs

### Before Submitting

1. Check if the bug has already been reported
2. Try to reproduce the bug consistently
3. Check if it's a browser-specific issue

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10, macOS]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Submitting

1. Check if the feature has already been requested
2. Consider if it aligns with the project's goals
3. Think about implementation complexity

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternative Solutions**
Any alternative solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex algorithms
- Include examples in comments
- Keep documentation up to date

### User Documentation

- Update README.md for new features
- Add usage examples
- Include screenshots when helpful
- Keep installation instructions current

## 🚀 Deployment

### Testing Before Deployment

1. Run all tests: `npm test`
2. Check linting: `npm run lint`
3. Type check: `npm run type-check`
4. Build the project: `npm run build`
5. Test the build locally: `npm start`

### Deployment Checklist

- [ ] All tests pass
- [ ] No linting errors
- [ ] TypeScript compilation successful
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Documentation updated

## 🎉 Recognition

Contributors will be recognized in:

- The project README
- Release notes
- GitHub contributors page
- Project documentation

## 📞 Getting Help

If you need help with contributing:

- Open a GitHub issue
- Join our discussions
- Contact the maintainers
- Check existing documentation

## 🙏 Thank You

Thank you for contributing to NZaoCard! Your contributions help make this project better for everyone.

---

**Happy coding! 🚀**
