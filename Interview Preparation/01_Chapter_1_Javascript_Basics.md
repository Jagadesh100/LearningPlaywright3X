# Chapter 1 - JavaScript Basics: Interview Questions

## Basic Questions

1. **What is JavaScript?**
   - JavaScript is a lightweight, interpreted (or just-in-time compiled) programming language used to add interactivity to web pages. It runs in the browser and on the server (Node.js).

2. **What is `console.log()` used for?**
   - It prints values or messages to the browser/terminal console for debugging and verification.

3. **How do you print "Hello World" in JavaScript?**
   ```js
   console.log('Hello world!');
   ```

4. **What are the differences between `console.log()`, `console.error()`, and `console.warn()`?**
   - `log` - normal output, `warn` - warning messages (yellow), `error` - error messages (red).

5. **What is the difference between JavaScript and Java?**
   - They are completely different languages. JavaScript is a scripting language used mainly for web development; Java is a compiled, general-purpose language running on the JVM.

6. **What is an interpreter vs a compiler?**
   - An interpreter executes code line by line at runtime; a compiler translates the whole program into machine code before execution.

7. **What does "JavaScript is a dynamic language" mean?**
   - Variables do not have fixed types - the type is determined at runtime based on the value assigned.

8. **What is Playwright and why do we need JavaScript for it?**
   - Playwright is an open-source test automation library for browsers. Tests are written in JavaScript/TypeScript, so JavaScript fundamentals are required.

## Code Output Questions

9. **What is the output of the following code?**
   ```js
   console.log('Hello' + ' ' + 'World');
   ```
   **Answer:** `Hello World`

10. **What is the output of `console.log(typeof 42);`?**
    **Answer:** `number`

## Scenario Questions

11. **You get an error `console is not defined` in Node.js. Why?**
    - The console object exists in the browser and in Node.js when run via a node file; the error occurs when running in an environment without a console.

12. **Why are semicolons optional in JavaScript?**
    - JavaScript has Automatic Semicolon Insertion (ASI), but it is a best practice to use semicolons to avoid unexpected behavior.
