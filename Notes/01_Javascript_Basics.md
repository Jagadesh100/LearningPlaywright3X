# Chapter 1 - JavaScript Basics

## Introduction
JavaScript is a lightweight, interpreted (or just-in-time compiled) programming language used to make web pages interactive. In this course it is the foundation for **Playwright Test Automation**.

## Hello World - First Program

**File:** `01_chapter_JavascriptBasics/01_HelloWorld.js`

```js
console.log('Hello world!');
```

- `console.log()` prints the given value to the console.
- Semicolons (`;`) mark the end of a statement (optional but recommended).
- Strings can be written with single quotes `'...'`, double quotes `"..."`, or backticks `` `...` `` (template literals).

### Execution Flow of `console.log('Hello world!')`

```
        ┌─────────────────────────────────────────┐
        │  1. JavaScript engine reads the file    │
        │     line by line (top → bottom)         │
        └───────────────────┬─────────────────────┘
                            ▼
        ┌─────────────────────────────────────────┐
        │  2. Encounter: console.log('Hello world!')│
        │     - evaluates the argument             │
        │     - 'Hello world!' is a string literal │
        └───────────────────┬─────────────────────┘
                            ▼
        ┌─────────────────────────────────────────┐
        │  3. Calls the log() method on console   │
        │     object (part of the runtime)         │
        └───────────────────┬─────────────────────┘
                            ▼
        ┌─────────────────────────────────────────┐
        │  4. Runtime writes the value to the     │
        │     standard output (terminal)          │
        └───────────────────┬─────────────────────┘
                            ▼
        ┌─────────────────────────────────────────┐
        │  5. Output: Hello world!                │
        └─────────────────────────────────────────┘
```

## Why JavaScript for Playwright?
- Playwright test scripts are written in JavaScript (or TypeScript).
- You write JavaScript to locate elements, perform actions, and write assertions.
- Solid JavaScript fundamentals help write reliable, maintainable test scripts.

## Quick Summary
- `console.log()` is the basic output statement.
- JavaScript code is executed line by line.
- Every script begins with the basics: variables, comments, operators, statements, loops, arrays, and functions.
