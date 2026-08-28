# Chapter 15 - Export and Import

## What are Modules?

> JavaScript files are **modules** - each file has its own scope. To use code from one file in another, you `export` it from the source file and `import` it in the target file. Node.js runs these files as **ES modules** because they use `import`/`export` syntax.

**Files:** `15_chapter_Export_And_Import/testUtil.js`, `15_chapter_Export_And_Import/logger.js`, `15_chapter_Export_And_Import/103_import.js`

```js
// testUtil.js  - the EXPORT side
export const BASE_URL = "https://google.com";

export function formatToUppercase(value) {
  return value.toUpperCase();
}

export function formatStringToLowercase(value) {
  return value.toLowerCase();
}
```

```js
// 103_import.js - the IMPORT side
import { formatToUppercase } from "./testUtil.js";
import { BASE_URL as URL } from "./testUtil.js";

import { logMessage } from "./logger.js";          // named import
import defaultLogMessage from "./logger.js";       // default import - NO {}

logMessage(formatToUppercase(URL));
defaultLogMessage(URL);
```

**Key facts:**
- Every `.js` file is its own module with its own scope - nothing leaks out unless exported.
- The `export` keyword marks what a module **makes available** to other files.
- The `import` keyword **brings in** the exported code, with the path relative to the current file (`./` = same folder).
- The `.js` extension is **required** in Node.js ESM imports (unlike bundlers like Vite which allow omitting it).

---

## Named Exports

> A file can export **many** named values - constants, functions, classes. Each is imported with `{}` using its exact name.

```js
// testUtil.js
export const BASE_URL = "https://google.com";        // named: const
export function formatToUppercase(value) { ... }     // named: function
export function formatStringToLowercase(value) { ... }
```

```js
// importing named exports
import { BASE_URL } from "./testUtil.js";
import { formatToUppercase, formatStringToLowercase } from "./testUtil.js";
```

### Named Export Flow

```
  testUtil.js (module)                103_import.js (consumer)
  ┌──────────────────────┐           ┌─────────────────────────┐
  │ export const BASE_URL│ ────────► │ import { BASE_URL }     │
  │                      │           │                         │
  │ export function      │ ────────► │ import { formatToUppercase } │
  │   formatToUppercase  │           │                         │
  │                      │           │ import { formatStringTo │
  │ export function      │ ────────► │   Lowercase }           │
  │   formatStringToLower│           └─────────────────────────┘
  └──────────────────────┘
```

**Key facts:**
- Import names must **match the export names exactly** (case-sensitive).
- Multiple named exports can be imported in **one statement** with commas: `import { a, b, c } from "./file.js"`.
- Named exports keep the module **explicit** - you always know what a module provides by reading its export lines.

---

## Default Export

> Each module can have **one** default export. It's the module's "main" value - commonly a single function. It is imported **without braces** and can be given any name.

```js
// logger.js
export default function defaultLogMessage(msg) {   // default export
  console.log(`Default Log: ${msg}`);
}

export function logMessage(msg) {                  // named export (same file)
  console.log(`Log: ${msg}`);
}
```

```js
// importing BOTH from logger.js in one file
import defaultLogMessage from "./logger.js";   // default - no {}
import { logMessage } from "./logger.js";      // named - with {}

defaultLogMessage("Hello");  // Default Log: Hello
logMessage("Hello");         // Log: Hello
```

### Default vs Named Export Flow

```
  logger.js (module)                   103_import.js (consumer)
  ┌────────────────────────────┐       ┌──────────────────────────────┐
  │ export default function    │       │ import defaultLogMessage     │
  │   defaultLogMessage(...)   │──────►│   from "./logger.js";        │
  │                            │       │   // no {} - any name works  │
  │ export function            │       │                              │
  │   logMessage(...)          │──────►│ import { logMessage }        │
  │                            │       │   from "./logger.js";        │
  └────────────────────────────┘       │   // {} - name MUST match    │
                                       └──────────────────────────────┘
```

**Key facts:**
- A module can have **only ONE** default export - a second one throws a syntax error.
- Default imports use **no curly braces** and the local name is up to you:
  `import anyName from "./logger.js"`.
- A file can mix both: one `export default` plus any number of named `export`s.

---

## Named vs Default - Quick Comparison

| | Named Export | Default Export |
|---|---|---|
| **Syntax (export)** | `export const x = ...` | `export default function ...` |
| **Syntax (import)** | `import { x } from "./f.js"` | `import x from "./f.js"` |
| **Count per module** | Many | One |
| **Name must match?** | Yes (case-sensitive) | No - you pick the local name |
| **Example** | `BASE_URL`, `formatToUppercase` | `defaultLogMessage` |

---

## Import Aliasing

> Rename an import locally with `as` - useful for avoiding name clashes or shortening long names.

```js
import { BASE_URL as URL } from "./testUtil.js";
// now use `URL` instead of `BASE_URL` in this file
```

**Why it matters for QA:** when two modules export a constant with the same name (e.g., two `BASE_URL` for different environments), aliasing lets you import both without a collision:

```js
import { BASE_URL as PROD_URL } from "./prodConfig.js";
import { BASE_URL as STAGE_URL } from "./stageConfig.js";
```

---

## The Classic Import Error (and the fix)

> **`SyntaxError: The requested module './logger.js' does not provide an export named 'defaultLogMessage'`** - this is exactly the error from `103_import.js` line 5.

```js
// ❌ WRONG - braces = named import, but defaultLogMessage is a DEFAULT export
import { defaultLogMessage } from "./logger.js";

// ✅ CORRECT - no braces for a default import
import defaultLogMessage from "./logger.js";
```

### Why this error happens

```
  import { defaultLogMessage } from "./logger.js";
           │                        │
           ▼                        ▼
  "named import"             module's exports are:
  → Node looks for a         • default → defaultLogMessage
    NAMED export called      • named   → logMessage
    "defaultLogMessage"
           │
           ▼
  NOT FOUND → SyntaxError: does not provide an
              export named 'defaultLogMessage'
```

**Key facts:**
- Curly braces `{}` tell Node: *"give me a named export with this exact name."*
- A **default** export is only accessible **without** braces.
- If you see this error, the export exists but you're using the wrong import style - check whether the source used `export default` (no braces) or `export` (braces).

---

## Why Modules Matter for Playwright

- Playwright test files import the library's API: `import { test, expect } from "@playwright/test"` - **named exports**.
- Page Object Model (POM) files use **default exports** for a class, and tests import it with `import LoginPage from "./LoginPage.js"`.
- Config files (`playwright.config.js`) export an object with `export default` so the runner reads it as a module's main value.
- Keeping helpers (URLs, formatters, locators) in exported modules means **one source of truth** - change once, update everywhere.

---

## Quick Summary
- Every `.js` file is a module with private scope; `export` shares code, `import` consumes it.
- **Named exports** - many per file, imported with `{}`, names must match exactly.
- **Default export** - one per file, imported WITHOUT `{}`, local name is your choice.
- **Aliasing** - `import { x as y }` renames an import locally to avoid clashes.
- The `does not provide an export named ...` error means you used braces on a **default** export (or the name doesn't match a named export).
- `.js` extension is required in Node.js ESM relative imports.
