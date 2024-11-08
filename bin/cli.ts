#!/usr/bin/env node

import minimist from 'minimist';
import { whisper } from '..';

const start = Date.now();
const argv = minimist(process.argv.slice(2), {
  boolean: ['stream', 'debug', 'diff'],
  alias: {
    max_tokens: 'M',
    model: 'm',
    stream: 's',
    debug: 'd',
    temperature: 't',
    // preset: 'p',
    diff: 'D'
  },
  default: {
    model: 'gpt-4o',
    max_tokens: 1000,
    temperature: 0.8,
    stream: true,
    debug: false,
    diff: false
  }
});

if (argv.h || argv.help) {
  // -p, --preset      Preset to use

  console.log(`
    Usage: commit-whisperer (or cw) [options] [text]

    Options:
      -M, --max-tokens  Max tokens (default: 1000)
      -m, --model       Model to use (default: gpt-4o)
      -t, --temperature Temperature (default: 0.8)
      -s, --stream      Stream output
      -d, --debug       Debug mode
      -D, --diff        Include git diff in context
      -h, --help        Display this help message
  `);
  process.exit(0);
}

if (argv._.length === 0) {
  argv._.push('Create a commit message for this release.');
}

whisper({
  messages: [{ role: 'user', content: argv._.join(' ') }],
  includeGitDiff: argv.includeGitDiff,
  openaiConfig: {
    model: argv.model,
    max_completion_tokens: argv.max_tokens,
    temperature: argv.temperature,
    stream: argv.stream
  },
  onRead: (content: string) => content && process.stdout.write(content)
})
  .then(response => {
    if (!argv.stream) {
      console.log(response.content);
    } else {
      console.log();
    }

    if (argv.debug) {
      console.log(`\n${Date.now() - start}ms`);
    }
  })
  .catch(error => console.error(error));
