import { execSync } from 'child_process';

export const getGitState = (cwd = process.cwd()) => {
  try {
    const status = execSync('git status --porcelain', { cwd }).toString().trim();
    const diff = execSync('git diff', { cwd }).toString().trim();

    return {
      status,
      diff
    };
  } catch (error) {
    throw new Error('Failed to get git state: ' + error.message);
  }
};
