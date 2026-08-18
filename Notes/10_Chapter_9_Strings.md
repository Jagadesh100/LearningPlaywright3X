# Chapter 9 - Strings

## What is a String?
> Any text or anything present inside quotes - represented with single quotes, double quotes, or backticks (template literals).

```js
let str1 = 'Single Quote';
let str2 = "Double Quote";
let str3 = `Template Literal`;

console.log(typeof str1); // string
console.log(typeof str2); // string
console.log(typeof str3); // string
```

**File:** `09_chapter_Strings/52_Strings.js`

---

## String Conversion (`String()` vs `.toString()`)

**File:** `09_chapter_Strings/53_String_Conversion.js`, `09_chapter_Strings/60_String_Conversion.js`

| | `x.toString()` | `String(x)` |
|---|---|---|
| Kind | method on the value | global function |
| Call on | the value itself | wraps the value |
| `null` / `undefined` | throws `TypeError` | `"null"` / `"undefined"` |
| Radix (binary/hex) | `x.toString(2)` | not supported |
| Throws | can throw | never |
| Objects | uses their `toString()` override | same (via ToPrimitive) |

```js
let myNumber = 200;
console.log(myNumber.toString()); // "200"
console.log(String(myNumber));    // "200"

String(null);        // "null"
String(undefined);   // "undefined"
null.toString();     // TypeError!

String([1, 2]);      // "1,2"  (array converted)
```

Other ways to convert: `myNumber + ""` or `` `${myNumber}` ``.

**Mental model:** `toString()` = "ask the value to describe itself"; `String()` = "force-convert anything to a string, no questions asked."

---

## String Properties

**File:** `09_chapter_Strings/54_String_Properties.js`

- `.length` gives the number of characters - **including whitespace and newlines**.

```js
let str1 = "TVK CM";
console.log(str1.length); // 6 (space counts)

let str2 = `Hello|
Are You ready for interview?
`;
console.log(str2.length); // newlines count too
```

---

## String Access

**File:** `09_chapter_Strings/55_String_Access.js`

| Method | Description | Example |
|---|---|---|
| `str[index]` | Index access (like arrays) | `str1[0]` → first char |
| `.at(index)` | Supports **negative** index (from end) | `str2.at(-2)` → 2nd char from end |
| `.charAt(index)` | Returns char at index | `str1.charAt(2)` |
| `.charCodeAt(index)` | Returns **Unicode/ASCII code** of char | `str2.charCodeAt("A")` |

```js
let str1 = "TVK CM";
console.log(str1[0]);        // T
console.log(str1.charAt(2)); // K
console.log(str1.at(-1));    // M (negative index = from end)
```

---

## Checking Strings (includes, startsWith, endsWith, indexOf)

**File:** `09_chapter_Strings/56_Strings_Checking.js`

All methods are **case-sensitive** and return booleans.

```js
let url = "https://staging.vwo.com/api/login?retry=true";

url.includes("staging");  // true
url.includes("Staging");  // false (case-sensitive)
url.includes("Prod");     // false

url.startsWith("http");   // true
url.endsWith("true");     // true
url.startsWith(":", 5);   // true (starts from index 5)

url.indexOf("g");         // position of first "g"
url.lastIndexOf("g");     // position of last "g"
```

**When to use what:**
- `includes` → simple yes/no check
- `startsWith` / `endsWith` → validate URLs or file names
- `indexOf` → when you need the exact position

---

## String Search (with Regular Expressions)

**File:** `09_chapter_Strings/57_String_Search.js`

- `.search()` uses a **regular expression** and returns the index of the first match.

```js
let myString = "Hello There! Welcome";
let searchString = myString.search(/\d+/); // finds first digit
console.log(searchString);
```

---

## String Extractions (slice vs substring)

**File:** `09_chapter_Strings/58_String_Extractions.js`

| Method | Negative index | Notes |
|---|---|---|
| `slice(start, end)` | ✅ supported | end is exclusive; negative counts from end |
| `substring(start, end)` | ❌ not supported | negative treated as 0 (prints full value) |

```js
let url = "https://staging.vwo.com/api/login?retry=true";

url.slice(0, 16);   // https://staging.
url.slice(-9);      // "etry=true"  (from 9th-from-end to end)
url.slice(-9, -2);  // "etry=tr"

url.substring(0, 16); // same as slice for positive
url.substring(-9);    // negative ignored → full string
```

---

## String Transformation

**File:** `09_chapter_Strings/59_Sting_Transformation.js`

### Uppercase / Lowercase
```js
"etRy=true".toUpperCase(); // "ETRY=TRUE"
"etRy=true".toLowerCase(); // "etry=true"
```

### Trim (remove whitespace)
```js
let wishes = "  happy Birthday !   ";
wishes.trim();       // "happy Birthday !"
wishes.trimStart();  // "happy Birthday !   "
wishes.trimEnd();    // "  happy Birthday !"
```

### Replace
```js
let results = " PASS, FAIL, F, P,PASS,FFAIL";
results.replace("FAIL", "FAILURE");    // only FIRST instance
results.replaceAll("FAIL", "FAILURE"); // ALL instances
```

### Concat
```js
results + wishes;             // + operator
results.concat(wishes);       // concat function
```

### Split (string → array) & Join (array → string)
```js
let browser = "Chrome,Firefox,Edge,InterNetExplorer";
browser.split(",");              // ["Chrome","Firefox","Edge","InterNetExplorer"] (type: object/array)

browser = ["Chrome","Firefox","Edge"];
browser.join("|");               // "Chrome|Firefox|Edge" (string)
```

---

## Why Strings Matter for Playwright
- Validating URLs: `expect(page).toHaveURL()` uses string checks under the hood.
- Assertions on text content: `textContent()`, `innerText()` return strings to compare.
- Locator selectors are strings: `page.locator("#login")`.
- Trimming and normalizing text extracted from the DOM is a common test step.

---

## Quick Summary
- Strings are text inside quotes; template literals (backticks) allow interpolation.
- `String()` is safe for everything; `.toString()` throws on `null`/`undefined`.
- `.length` counts whitespace; index access, `.at()`, `.charAt()` read characters.
- `includes`, `startsWith`, `endsWith` are case-sensitive boolean checks.
- `slice` supports negatives, `substring` does not.
- `trim`, `replace`/`replaceAll`, `split`/`join` transform strings.
