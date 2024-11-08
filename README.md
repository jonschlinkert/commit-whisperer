# commit-whisperer [![NPM version](https://img.shields.io/npm/v/commit-whisperer.svg?style=flat)](https://www.npmjs.com/package/commit-whisperer) [![NPM monthly downloads](https://img.shields.io/npm/dm/commit-whisperer.svg?style=flat)](https://npmjs.org/package/commit-whisperer) [![NPM total downloads](https://img.shields.io/npm/dt/commit-whisperer.svg?style=flat)](https://npmjs.org/package/commit-whisperer)

> An AI genius for generating meaningful git commit messages from repository state and user instructions.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

https://github.com/user-attachments/assets/cc99ce5b-3e6b-4fc1-afb4-35629f7f9cc7


## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save commit-whisperer
```

## What is Commit Whisperer?

Commit Whisperer is a CLI and API for crafting meaningful commit messages using AI.

By analyzing the current state of your project and any provided instructions, it helps generate commit messages that accurately describe your changes.

## API

**Installation**

To use Commit Whisperer, first ensure you have it installed as a dependency in your project:

```sh
npm install commit-whisperer --save-dev
# or
pnpm i commit-whisperer -D
# or
yarn add commit-whisperer --dev
```

**Usage**

```ts
import { whisper } from 'commit-whisperer';
```

### whisper

The `whisper` function is the primary method provided by Commit Whisperer. It generates a commit message based on the project's state and user input.

#### Parameters

* **cwd** (string, optional): The current working directory. Defaults to `process.cwd()`.
* **useGitState** (boolean, optional): Whether to include the git state in the message generation. Defaults to `true`.
* **usePackageJson** (boolean, optional): Whether to include `package.json` details. Defaults to `true`.
* **message** (string, optional): An initial message or instructions to guide the commit message generation.
* **instructions** (string, optional): Specific instructions for the commit message.
* **diff** (boolean, optional): Whether to include the git diff in the message. Defaults to `false`.
* **orgId** (string, optional): OpenAI organization ID. Defaults to `process.env.OPENAI_ORG_ID`.
* **apiKey** (string, optional): OpenAI API key. Defaults to `process.env.OPENAI_API_KEY`.
* **openaiConfig** (object, optional): Additional configuration passed directly to the OpenAI API. Useful for customizing parameters like `temperature`, `model`, or overriding the default messages array.
* **formatContent** (function, optional): Custom function to format the content sent to OpenAI.

#### Returns

A promise that resolves to an OpenAI response object with an additional `content` property containing the generated commit message.

#### Examples

```js
const response = await whisper({ message: 'First commit' });
console.log(response.content);
```

**git diff**

Pass git diff to the LLM as context:

```js
const response = await whisper({
  message: 'First commit',
  diff: true
});

console.log(response.content);
```

## CLI Usage

**Installation**

```sh
npm install -g commit-whisperer
# or
pnpm add -g commit-whisperer
# or
yarn global add commit-whisperer
```

**Usage**

Commit Whisperer can be used from the command line using either the `commit-whisperer` or `cw` command:

```sh
cw [options] [text]
# or
commit-whisperer [options] [text]
```

### Options

* `-M, --max-tokens`: Maximum number of tokens for the response (default: 1000)
* `-m, --model`: OpenAI model to use (default: gpt-4o)
* `-t, --temperature`: Temperature for response generation (default: 0.8)
* `-s, --stream`: Stream the output as it's generated (default: true)
* `-d, --debug`: Enable debug mode to show timing information (boolean)
* `-D, --diff`: Include git diff in the context (boolean)
* `-h, --help`: Display help message

### Examples

Generate a commit message with default settings:
```sh
cw "Update documentation"
```

Include git diff in the commit message context:
```sh
cw "Describe changes" -D
```

Use a different model with custom temperature:
```sh
cw -m o1-preview -t 0.5 "Refactor authentication"
```

## Configuration

Commit Whisperer relies on OpenAI's API to generate commit messages. Ensure you have set your OpenAI API key and organization ID in your environment variables:

* `OPENAI_API_KEY`: Your OpenAI API key.
* `OPENAI_ORG_ID` (optional): Your OpenAI organization ID.

## Advanced Usage

You can extend the functionality of Commit Whisperer by providing custom formatting functions and OpenAI configurations through the `formatContent` and `openaiConfig` parameters respectively.

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2024, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT License.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on November 07, 2024._
