#!/usr/bin/env node

import minimist from 'minimist';
import { whisper } from '..';

const start = Date.now();
const argv = minimist(process.argv.slice(2), {
  boolean: ['stream', 'debug'],
  alias: {
    model: 'm',
    stream: 's',
    debug: 'd',
    temperature: 't',
    preset: 'p'
  },
  default: {
    model: 'gpt-4o',
    temperature: 0.8,
    stream: true,
    debug: false
  }
});

if (argv.h || argv.help) {
  console.log(`
    Usage: ai [options] [text]

    Options:
      -m, --model       Model to use (default: gpt-4)
      -t, --temperature Temperature (default: 0.9)
      -p, --preset      Preset to use
      -s, --stream      Stream output
      -d, --debug       Debug mode
      -h, --help        Display this help message
  `);
  process.exit(0);
}

if (argv._.length === 0) {
  argv._.push('Create a commit message for this release.');
}

whisper({
  messages: [{ role: 'user', content: argv._.join(' ') }],
  ...argv,
  onRead: (message: string) => process.stdout.write(message),
  onFinish: () => console.log()
})
  .then(response => {
    console.log(response.choices[0].message.content);

    if (argv.debug) {
      console.log(`\n${Date.now() - start}ms`);
    }
  })
  .catch(error => console.error(error));
