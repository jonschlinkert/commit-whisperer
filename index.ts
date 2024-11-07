import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import Enquirer from 'enquirer';
import OpenAI from 'openai';
import { getGitState } from './src/git';

export const systemPrompt = 'You are Commit-Whisperer, a genius at writing useful commit messages. Write a commit message that perfectly summarizes all important points based on the information provided by the user. The user may provide a git diff, instructions, or other details to help you craft the perfect message. If nothing is provided, or it appears to be a first commit, respond with a first commit message with a humorous tone.';

export const defaults = {
  temperature: 0.8,
  max_tokens: 1000,
  model: 'gpt-4o',
  stream: false
};

const getPromptMessage = async optionsMessage => {
  if (optionsMessage != null) {
    return optionsMessage;
  }

  const enquirer = new Enquirer();
  const { message } = await enquirer.prompt({
    type: 'input',
    name: 'message',
    message: 'Enter instructions for the commit message (optional)'
  });

  return message;
};

const formatContent = ({
  gitState,
  includeGitDiff,
  message,
  pkg
}: {
  gitState: any;
  includeGitDiff: any;
  message: string;
  pkg: any;
}) => {
  const lines = [];

  if (message) {
    lines.push(`Instructions: ${message}`);
    lines.push('');
  }

  if (pkg) {
    lines.push('**Package details**');
    lines.push(`- Name: ${pkg.name}`);
    lines.push(`- Version: ${pkg.version}`);
    lines.push(`- Description: ${pkg.description}`);
    lines.push('');
  }

  if (gitState) {
    lines.push(`**Git status**:\n${gitState.status}`);
    lines.push('');

    if (includeGitDiff) {
      lines.push(`**Git diff**:\n${gitState.diff}`);
      lines.push('');
    }
  }

  return lines.join('\n');
};

export const whisper = async ({
  cwd = process.cwd(),
  useGitState = true,
  usePackageJson = true,
  message: optionsMessage,
  instructions,
  includeGitDiff = false,
  orgId = process.env.OPENAI_ORG_ID,
  apiKey = process.env.OPENAI_API_KEY,
  openaiConfig = {},
  ...options
}: {
  useGitState?: boolean;
  orgId?: string;
  apiKey?: string;
  model?: string;
} = {}) => {
  const message = await getPromptMessage(optionsMessage);
  const gitState = useGitState ? await getGitState(cwd) : null;
  const pkgPath = path.resolve(cwd, 'package.json');
  const pkg = usePackageJson && fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    : null;

  const openai = new OpenAI({ apiKey, orgId });
  const format = options.formatContent || formatContent;

  const config = {
    ...defaults,
    ...openaiConfig
  };

  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: instructions || systemPrompt },
      { role: 'user', content: format({ gitState, message, pkg, includeGitDiff }) }
    ],
    ...config
  });

  if (config.stream === true) {
    for await (const event of response) {
      console.log(event);
    }
  }

  return response;
};
