"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var commit_whisperer_exports = {};
__export(commit_whisperer_exports, {
  defaults: () => defaults,
  systemPrompt: () => systemPrompt,
  whisper: () => whisper
});
module.exports = __toCommonJS(commit_whisperer_exports);
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

// index.ts
var systemPrompt = "You are Commit-Whisperer, a genius at writing useful commit messages. Write a commit message that perfectly summarizes all important points based on the information provided by the user. The user may provide a git diff, instructions, or other details to help you craft the perfect message. If nothing is provided, or it appears to be a first commit, respond with a first commit message with a humorous tone.";
var defaults = {
  temperature: 0.8,
  max_tokens: 1e3,
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
  includeGitDiff,
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
    if (includeGitDiff) {
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
  includeGitDiff = false,
  orgId = process.env.OPENAI_ORG_ID,
  apiKey = process.env.OPENAI_API_KEY,
  openaiConfig = {},
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
      { role: "user", content: format({ gitState, message, pkg, includeGitDiff }) }
    ],
    ...config
  });
  return response;
}, "whisper");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaults,
  systemPrompt,
  whisper
});
//# sourceMappingURL=index.js.map