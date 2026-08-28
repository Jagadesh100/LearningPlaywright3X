# Chapter 9 - Strings: Interview Questions

## Basic Questions

1. **What is a string in JavaScript?**
   - Any text or anything present inside quotes - single quotes (`'`), double quotes (`"`), or backticks (template literals).

2. **What is the difference between `String(x)` and `x.toString()`?**
   - `String()` is a global function that converts anything to a string and **never throws** - even `null`/`undefined` become `"null"`/`"undefined"`.
   - `.toString()` is a method on the value itself and **throws** on `null`/`undefined`. It also supports a radix: `(200).toString(2)` → `"11001000"`.

3. **How do you get the length of a string?**
   - `.length` property. Note: it counts **whitespace and newlines** too.

4. **What are the ways to access characters of a string?**
   - Index access `str[0]`
   - `.at(index)` - supports negative index (from end)
   - `.charAt(index)` - returns character at index
   - `.charCodeAt(index)` - returns the Unicode/ASCII code of the character

5. **What is the difference between `slice()` and `substring()`?**
   - `slice(start, end)` supports **negative** indices (counts from the end).
   - `substring(start, end)` does **not** support negatives - negative values are treated as `0`.

6. **Which string methods return booleans?**
   - `includes()`, `startsWith()`, `endsWith()` - all are **case-sensitive**.

7. **What does `indexOf()` vs `lastIndexOf()` do?**
   - `indexOf()` returns the position of the **first** occurrence; `lastIndexOf()` returns the position of the **last** occurrence.

8. **What is the difference between `search()` and `indexOf()`?**
   - `search()` accepts a **regular expression** and returns the index of the first match; `indexOf()` accepts only a plain string.

9. **How do you convert a string to an array and back?**
   - `str.split(separator)` → array.
   - `array.join(separator)` → string.

10. **What does `trim()`, `trimStart()`, `trimEnd()` do?**
    - Remove whitespace from both ends, start only, or end only.

11. **What is the difference between `replace()` and `replaceAll()`?**
    - `replace()` replaces only the **first** occurrence; `replaceAll()` replaces **all** occurrences.

12. **What is a template literal?**
    - A backtick-delimited string that supports **interpolation** with `${expression}` and multi-line text.

## Code Output Questions

13. **Output?**
    ```js
    let str = "TVK CM";
    console.log(str.length);
    ```
    **Answer:** `6` (space is counted)

14. **Output?**
    ```js
    console.log(String(null));
    console.log(String(undefined));
    ```
    **Answer:** `null` then `undefined` (as strings) - no error.

15. **Output?**
    ```js
    let url = "https://staging.vwo.com/api/login?retry=true";
    console.log(url.includes("staging"));
    console.log(url.includes("Staging"));
    ```
    **Answer:** `true` then `false` (case-sensitive)

16. **Output?**
    ```js
    console.log("Hello World".slice(-5));
    ```
    **Answer:** `World` (negative index counts from end)

17. **Output?**
    ```js
    console.log("Hello World".substring(-5));
    ```
    **Answer:** `Hello World` (negative treated as 0, returns full string)

18. **Output?**
    ```js
    let browser = "Chrome,Firefox,Edge";
    let arr = browser.split(",");
    console.log(typeof arr);
    console.log(arr.join("|"));
    ```
    **Answer:** `object` then `Chrome|Firefox|Edge`

19. **Output?**
    ```js
    console.log("etRy=true".toUpperCase());
    console.log("etRy=true".toLowerCase());
    ```
    **Answer:** `ETRY=TRUE` then `etry=true`

20. **Output?**
    ```js
    let myNumber = 200;
    console.log(typeof myNumber.toString());
    console.log(typeof String(myNumber));
    ```
    **Answer:** `string` then `string`

21. **Output?**
    ```js
    console.log("a,b,c".charCodeAt(0));
    ```
    **Answer:** `97` (Unicode code of `a`)

22. **Output?**
    ```js
    let s = "  hello  ";
    console.log(s.trim().length);
    ```
    **Answer:** `5` (whitespace removed)

## Scenario Questions

23. **How do you check if a URL starts with `https` and ends with `.com` in a test?**
    ```js
    url.startsWith("https") && url.endsWith(".com");
    ```

24. **How would you extract the domain from a URL?**
    ```js
    let url = "https://staging.vwo.com/api/login";
    let domain = url.split("/")[2]; // "staging.vwo.com"
    ```

25. **Why do we use `String()` over `.toString()` when handling API responses?**
    - Because response values could be `null`/`undefined`; `String()` handles them gracefully while `.toString()` throws.

26. **How do you normalize text extracted from a page before comparing?**
    - Use `.trim()` to remove surrounding whitespace, and `.toLowerCase()` for case-insensitive comparison.

27. **Why are strings important in Playwright?**
    - Selectors, URLs, and text assertions are all strings - `page.locator("#login")`, `expect(page).toHaveURL()`, and `textContent()` comparisons.

## Quick Summary
- Strings = text in quotes; template literals support interpolation.
- `String()` is safe for any value; `.toString()` throws on `null`/`undefined`.
- `slice` supports negatives; `substring` does not.
- `includes`/`startsWith`/`endsWith` are case-sensitive boolean checks.
- `split` → array; `join` → string; `replace` first vs `replaceAll` all.
