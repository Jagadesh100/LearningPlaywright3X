# Chapter 15 - Export and Import: Interview Questions

## Basic Questions

1. **What is a module in JavaScript?**
   - Each `.js` file is its own module with its own scope. Nothing is visible outside the file unless it is explicitly `export`ed. Other files bring it in with `import`.

2. **What is the difference between `export` and `import`?**
   - `export` marks what a module **gives out** (variables, functions, classes). `import` **takes in** those exports in another file. Export happens once per module; import can happen in any number of files.

3. **What are the two main kinds of exports?**
   - **Named exports** (many per module, imported with `{}`) and a **default export** (one per module, imported without `{}`).

4. **What is a named export?**
   - An export with a specific name:
   ```js
   export const BASE_URL = "https://google.com";
   export function formatToUppercase(value) { return value.toUpperCase(); }
   ```
   - Imported with braces and an exact match: `import { BASE_URL } from "./testUtil.js";`

5. **What is a default export?**
   - The module's single main export, commonly a function or class:
   ```js
   export default function defaultLogMessage(msg) {
     console.log(`Default Log: ${msg}`);
   }
   ```
   - Imported without braces; you pick the local name: `import defaultLogMessage from "./logger.js";`

6. **How many default exports can a module have?**
   - Exactly **one**. A second `export default` in the same file is a syntax error.

7. **Can a file have both a default export and named exports?**
   - Yes. `logger.js` does exactly this: one `export default function defaultLogMessage` plus `export function logMessage`.

## Named vs Default Exports

8. **What are the syntax differences?**
   ```js
   // named
   export const x = 1;              import { x } from "./f.js";
   // default
   export default function f() {}   import f from "./f.js";
   ```

9. **Must the import name match the export name?**
   - For **named** exports: yes, exactly (case-sensitive). For the **default** export: no - you can name it anything locally: `import anything from "./logger.js";`

10. **Can you import multiple named exports in one statement?**
    - Yes: `import { formatToUppercase, formatStringToLowercase } from "./testUtil.js";`

11. **What is import aliasing and when do you use it?**
    - Renaming an import locally with `as`:
    ```js
    import { BASE_URL as URL } from "./testUtil.js";
    ```
    - Use it to avoid name clashes - e.g., importing `BASE_URL` from two configs: `import { BASE_URL as PROD_URL } from "./prod.js"` and `import { BASE_URL as STAGE_URL } from "./stage.js"`.

12. **Why is the `.js` extension required in Node.js imports?**
    - Node.js ESM resolves the path literally - it does not search for extensions like bundlers do. `import "./testUtil.js"` works; `import "./testUtil"` throws a module-not-found error.

## The Classic Import Error

13. **What does `SyntaxError: The requested module './logger.js' does not provide an export named 'defaultLogMessage'` mean?**
    - You wrote a **named import** (`import { defaultLogMessage }`) but the module exports that value as its **default** export. Node looked for a named export with that exact name and did not find it.

14. **How do you fix that error?**
    - Drop the braces:
    ```js
    // ❌ import { defaultLogMessage } from "./logger.js";
    // ✅
    import defaultLogMessage from "./logger.js";
    ```

15. **How do you debug an import error generally?**
    - Read the source file's export lines. `export default` → import without braces. `export function/const` → import with braces, exact name. Also check the file path and `.js` extension.

16. **What error do you get if you import a name that doesn't exist as a named export?**
    - The same `does not provide an export named 'X'` error - either the name is misspelled, it's actually a default export (use no braces), or the file does not export it at all.

## Export/Import Variations

17. **How do you export a constant and use it in tests?**
    ```js
    // config.js
    export const TIMEOUT = 5000;

    // test.js
    import { TIMEOUT } from "./config.js";
    ```

18. **How do you export a class for a Page Object Model?**
    ```js
    // LoginPage.js
    export default class LoginPage {
      constructor(page) { this.page = page; }
      async login(user, pass) { /* ... */ }
    }

    // login.spec.js
    import LoginPage from "./LoginPage.js";
    const loginPage = new LoginPage(page);
    ```
    - A default export of a class is the standard POM pattern in Playwright.

19. **How does Playwright itself use named exports?**
    - `import { test, expect } from "@playwright/test";` - `test` and `expect` are named exports from the package.

20. **How is `playwright.config.js` structured?**
    - It uses a default export so the runner can read the config's main value:
    ```js
    export default {
      testDir: "./tests",
      use: { baseURL: "https://example.com" },
    };
    ```

21. **What does `import` do at runtime - does it run the imported file?**
    - Yes - the imported module is **executed** (evaluated) once when first imported, and its exports become available. Subsequent imports of the same module reuse the cached module instance.

## Scenario Questions

22. **You get a module-not-found error for `import { x } from "./utils"` - what do you check?**
    - 1) Does `utils.js` exist? 2) Is the `.js` extension included? 3) Is the relative path correct (`./` for same folder)? 4) Is the import name spelled exactly like the export?

23. **Two modules both export `BASE_URL`. How do you use both in one file?**
    - Alias at least one:
    ```js
    import { BASE_URL as PROD_URL } from "./prodConfig.js";
    import { BASE_URL as STAGE_URL } from "./stageConfig.js";
    ```

24. **Your teammate changed an export from named to default. What breaks?**
    - Every import that used braces (`import { helper } ...`) now throws the `does not provide an export named 'helper'` error. They must change to `import helper from ...` (no braces). This is why export style is part of a module's public API - changing it is a breaking change.

25. **Why do QA frameworks use modules instead of global variables?**
    - Modules give explicit dependencies (you can see what a file uses from its imports), avoid global namespace pollution, prevent accidental name collisions, and make code testable and reusable.

## Quick Recap for Interviews
- Module = one file, private scope; `export` shares, `import` consumes.
- Named exports: many per file, `{}`, exact name. Default export: one per file, no `{}`, any local name.
- Aliasing: `import { x as y }` - solves name clashes.
- Classic error: braces on a default import → `does not provide an export named 'X'`. Fix: remove the braces.
- Node.js ESM requires the `.js` extension in relative imports.
- Playwright: `test`/`expect` are named exports; POM classes use default exports; config uses `export default`.
