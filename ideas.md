# Ideas

If you're interested in these or any other features, please create an issue!

1. **Commit Templates**

- Add support for conventional commit formats (e.g., feat:, fix:, docs:, etc.)
- Allow users to define their own commit templates/formats
- Example config in package.json:

```json
{
  "commit-whisperer": {
    "template": "{{type}}({{scope}}): {{message}}"
  }
}
```

2. **Smart Detection**

- Auto-detect the type of changes (e.g., if changes are mostly in test files, suggest a "test:" prefix)
- Identify breaking changes and automatically add a footer, like "BREAKING CHANGE:"
- Recognize dependency updates and create standardized messages

3. **Historical Learning**

- Add an optional mode to learn from the project's previous commit messages
- Use this to maintain consistent style and terminology
- Example: `cw commit --learn`

4. **Integration Improvements**

- Add Husky pre-commit hook support out of the box
- Provide direct integration with popular commit tools like Commitizen
- Add support for commit signing

5. **Enhanced Context**

- Add support for JIRA/GitHub issue linking by detecting branch names
- Include staged changes context (not just git diff)
- Option to analyze related files for better context (e.g. tree-sitter)

6. **Output Formats**

- Add support for generating both subject and body
- Option for bullet-point format for complex changes
- Support for co-authors detection and addition
