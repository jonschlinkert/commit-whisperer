#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// bin/cli.ts
var import_minimist = __toESM(require("minimist"));

// src/whisper.ts
var import_config = require("dotenv/config");
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var import_enquirer = __toESM(require("enquirer"));
var import_openai = __toESM(require("openai"));

// src/git.ts
var import_child_process = require("child_process");
var getGitState = /* @__PURE__ */ __name((cwd = process.cwd()) => {
  try {
    const status = (0, import_child_process.execSync)("git status --porcelain", { cwd }).toString().trim();
    const diff = (0, import_child_process.execSync)("git diff", { cwd }).toString().trim();
    return {
      status,
      diff
    };
  } catch (error) {
    throw new Error("Failed to get git state: " + error.message);
  }
}, "getGitState");

// src/whisper.ts
var systemPrompt = `You are Commit-Whisperer, a genius at writing useful commit messages. Write a commit message that perfectly summarizes all important points based on the information provided by the user. The user may provide a git diff, instructions, or other details to help you craft the perfect message. Don't say "main module" if the referenced function has a name.

If nothing is provided, or it appears to be a first commit, respond with a first commit message with a humorous tone.

If changes are minimal, keep your message very brief, direct, and to the point: "Fixes typo in docs", "Updated README", "Adds unit test for create method in User service", etc.
`;
var defaults = {
  temperature: 0.8,
  max_completion_tokens: 1e3,
  model: "gpt-4o",
  stream: false
};
var getPromptMessage = /* @__PURE__ */ __name(async (optionsMessage) => {
  if (optionsMessage != null) {
    return optionsMessage;
  }
  const enquirer = new import_enquirer.default();
  const { message } = await enquirer.prompt({
    type: "input",
    name: "message",
    message: "Enter instructions for the commit message (optional)"
  });
  return message;
}, "getPromptMessage");
var formatContent = /* @__PURE__ */ __name(({
  gitState,
  diff,
  message,
  pkg
}) => {
  const lines = [];
  if (message) {
    lines.push(`Instructions: ${message}`);
    lines.push("");
  }
  if (pkg) {
    lines.push("**Package details**");
    lines.push(`- Name: ${pkg.name}`);
    lines.push(`- Version: ${pkg.version}`);
    lines.push(`- Description: ${pkg.description}`);
    lines.push("");
  }
  if (gitState) {
    lines.push(`**Git status**:
${gitState.status}`);
    lines.push("");
    if (diff) {
      lines.push(`**Git diff**:
${gitState.diff}`);
      lines.push("");
    }
  }
  return lines.join("\n");
}, "formatContent");
var whisper = /* @__PURE__ */ __name(async ({
  cwd = process.cwd(),
  useGitState = true,
  usePackageJson = true,
  message: optionsMessage,
  instructions,
  diff = false,
  orgId = process.env.OPENAI_ORG_ID,
  apiKey = process.env.OPENAI_API_KEY,
  openaiConfig = {},
  onRead,
  ...options
} = {}) => {
  const message = await getPromptMessage(optionsMessage);
  const gitState = useGitState ? await getGitState(cwd) : null;
  const pkgPath = import_node_path.default.resolve(cwd, "package.json");
  const pkg = usePackageJson && import_node_fs.default.existsSync(pkgPath) ? JSON.parse(import_node_fs.default.readFileSync(pkgPath, "utf8")) : null;
  const openai = new import_openai.default({ apiKey, orgId });
  const format = options.formatContent || formatContent;
  const config = {
    ...defaults,
    ...openaiConfig
  };
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: instructions || systemPrompt },
      { role: "user", content: format({ gitState, message, pkg, diff }) }
    ],
    ...config
  });
  let content = "";
  if (config.stream === true) {
    for await (const event of response) {
      if (event.choices) {
        onRead?.(event.choices[0].delta.content);
        content += event.choices[0].delta.content;
      }
    }
  } else {
    content = response.choices[0].message.content;
  }
  response.content = content;
  return response;
}, "whisper");

// bin/cli.ts
var start = Date.now();
var argv = (0, import_minimist.default)(process.argv.slice(2), {
  boolean: ["stream", "debug", "diff"],
  alias: {
    max_tokens: "M",
    model: "m",
    stream: "s",
    debug: "d",
    temperature: "t",
    // preset: 'p',
    diff: "D"
  },
  default: {
    model: "gpt-4o",
    max_tokens: 1e3,
    temperature: 0.8,
    stream: true,
    debug: false,
    diff: false
  }
});
if (argv.h || argv.help) {
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
  argv._.push("Create a commit message for this release.");
}
whisper({
  messages: [{ role: "user", content: argv._.join(" ") }],
  includeGitDiff: argv.includeGitDiff,
  openaiConfig: {
    model: argv.model,
    max_completion_tokens: argv.max_tokens,
    temperature: argv.temperature,
    stream: argv.stream
  },
  onRead: (content) => content && process.stdout.write(content)
}).then((response) => {
  if (!argv.stream) {
    console.log(response.content);
  } else {
    console.log();
  }
  if (argv.debug) {
    console.log(`
${Date.now() - start}ms`);
  }
}).catch((error) => console.error(error));
//# sourceMappingURL=cli.js.map