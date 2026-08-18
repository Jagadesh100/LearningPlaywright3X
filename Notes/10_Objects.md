# Chapter 10 - Objects

## What is an Object?
> An object is a **key-value pair** collection, used to group related data and behavior.

```js
const person = {
    name: "Jagadesh",
    age: 20,
    gender: "Male",
};
```

**File:** `10_chapter_Objects/61_Objects.js`

---

## Accessing Object Properties

**File:** `10_chapter_Objects/62_Object_Accessing.js`

Three ways to access:

```js
const person = { name: "Jagadesh", age: 20, gender: "Male" };

person.name;        // dot notation → "Jagadesh"
person["gender"];   // bracket notation → "Male"

let key = "age";
person[key];        // dynamic key via variable → 20
```

- **Dot notation** (`obj.key`) - static, must be a valid identifier.
- **Bracket notation** (`obj["key"]`) - allows dynamic keys, spaces, special chars.

---

## Modifying Objects (Add / Update / Delete)

**File:** `10_chapter_Objects/63_Objects_Modifying.js`

```js
const person = { name: "Jagadesh", age: 20, gender: "Male" };

// Add a key
person.email = "test123@example.com";

// Modify a key
person.email = "uatTest12345@example.com";

// Delete a key
delete person.email;
```

Note: even a `const` object can be modified - `const` blocks **reassignment**, not mutation of properties.

---

## Call by Reference (The Gotcha)

**File:** `10_chapter_Objects/64_Objects_Call_by_reference.js`

> Objects follow **call by reference** - assigning an object copies the *reference*, not the data.

```js
let a = { id: 1, empName: "Test" };
let b = a;      // b points to the SAME object as a

b.id = 2;       // mutating b...
console.log(a); // ...also changes a → { id: 2, empName: "Test" }
```

**Mental model:** `a` and `b` are two labels on the same box. Changing the box via either label affects both. This is why copying objects naively is dangerous ("highly vulnerable when copying and modifying").

### Call by Reference Flowchart

```
                ┌────────────────────────────────────────────┐
                │  let a = { id: 1, empName: "Test" }        │
                │  (object created in memory at address X)   │
                └───────────────────┬────────────────────────┘
                                    ▼
                ┌────────────────────────────────────────────┐
                │  let b = a;                                │
                │  b copies the REFERENCE, not the object    │
                │  a ──┐                                     │
                │      ├──► { id: 1, empName: "Test" }       │
                │  b ──┘     (address X)                     │
                └───────────────────┬────────────────────────┘
                                    ▼
                ┌────────────────────────────────────────────┐
                │  b.id = 2;  ← mutates the SHARED object    │
                │  a.id is ALSO 2 (both point to address X)  │
                └────────────────────────────────────────────┘
```

---

## Object Methods

**File:** `10_chapter_Objects/65_Object_Methods.js`, `10_chapter_Objects/68_Object_Methods_Example2.js`

A **function inside an object** is called a **method**. `this` refers to the object itself.

```js
let result = {
    status: "Pass",
    getStatus() {
        return this.status;   // this → result
    },
};

console.log(result.getStatus());      // "Pass"
console.log(result["getStatus"]);     // prints the function definition
```

### Method Chaining (returning `this`)

```js
const calculator = {
    value: 0,
    add(n) {
        this.value += n;
        return this;   // returns the object → allows chaining
    },
    subtract(n) {
        this.value -= n;
        return this;
    },
    multiply(n) {
        this.value *= n;
        return this;
    },
};

let result = calculator.add(5).subtract(3).multiply(10);
console.log(result.value); // 20
```

**Key idea:** `return this` makes methods chainable - each call returns the object for the next call.

### Method Chaining Flowchart

```
  calculator.add(5).subtract(3).multiply(10)

  ┌─────────────────────────────┐
  │ 1. add(5)                   │
  │    this.value = 0 + 5 = 5   │
  │    returns this (calculator)│
  └──────────────┬──────────────┘
                 ▼
  ┌─────────────────────────────┐
  │ 2. subtract(3)              │
  │    this.value = 5 - 3 = 2   │
  │    returns this (calculator)│
  └──────────────┬──────────────┘
                 ▼
  ┌─────────────────────────────┐
  │ 3. multiply(10)             │
  │    this.value = 2 * 10 = 20 │
  │    returns this             │
  └──────────────┬──────────────┘
                 ▼
  ┌─────────────────────────────┐
  │ result.value → 20           │
  └─────────────────────────────┘

  Without `return this`, the chain breaks after step 1
  (undefined.add would throw).
```

---

## Object Destructuring

**File:** `10_chapter_Objects/66_Object_Destructuring.js`

> Pulls values out of an object and stores them as standalone variables. Matches by **key name** (unlike arrays, which match by position).

```js
const person = {
    name: "Jagadesh",
    age: 20,
    gender: "Male",
    personal_details: { email: "test123@example.com", contact: 1234567 },
};

// Basic - variable name must match the key
const { gender } = person;
console.log(gender); // "Male"

// Rename while destructuring: { originalKey: newName }
const { name: UserName } = person;
console.log(UserName); // "Jagadesh"

// Default value if key is missing (does NOT add to original object)
const { isemployed = true } = person;
console.log(isemployed); // true

// Nested destructuring
const { personal_details: { email } } = person;
console.log(email); // "test123@example.com"
```

---

## Object Equality (Reference vs Value)

**File:** `10_chapter_Objects/67_Object_Equality_Check.js`

> `===` on objects checks **reference identity** (same memory address), NOT value equality.

```js
let a = { status: "pass" };
let b = { status: "pass" };
a === b; // false - two different objects in memory

let c = { status: "fail" };
let d = c;
c === d; // true - d is an alias (same reference)
```

```
a ───► { status: "pass" }   (address X)
b ───► { status: "pass" }   (address Y)

c ───┐
     ├──► { status: "fail" }  (address Z)
d ───┘
```

To compare *contents*: manually compare properties, or `JSON.stringify(a) === JSON.stringify(b)` (with caveats like key order).

---

## Object Spread (Copy & Merge)

**File:** `10_chapter_Objects/69_Objects_Copy_And_Merge.js`

> The **spread operator** (`...`) copies the properties of one object into another - creating a shallow copy.

```js
let object1 = { a: 1, b: 2, c: 3 };
let object2 = { d: 4, e: 5, f: 6 };

// Copy
let object3 = { ...object1 };  // independent copy
object1.a = 256;
console.log(object3.a);        // 1 - spread copy is NOT affected

// Merge - later spreads overwrite earlier ones on duplicate keys
let object4 = { ...object1, ...object2, ...object3 };
// a comes from object1 (256) then object3 (1) overwrites → a: 1
console.log(object4); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
```

**Gotcha:** when two spreads share a key, the **later** one wins. To keep `a: 256`, spread `object3` before `object1`:
```js
let object4 = { ...object3, ...object2, ...object1 }; // a: 256
```

### Spread Merge Flowchart

```
  let object4 = { ...object1, ...object2, ...object3 }

  ┌──────────────────────────────────────────────────┐
  │ STEP 1: spread object1                           │
  │ { a: 256, b: 2, c: 3 }                           │
  └────────────────────────┬─────────────────────────┘
                           ▼
  ┌──────────────────────────────────────────────────┐
  │ STEP 2: spread object2 (no key conflicts)        │
  │ { a: 256, b: 2, c: 3, d: 4, e: 5, f: 6 }        │
  └────────────────────────┬─────────────────────────┘
                           ▼
  ┌──────────────────────────────────────────────────┐
  │ STEP 3: spread object3 (a, b, c CONFLICT)        │
  │ object3.a = 1 OVERWRITES 256                     │
  │ { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }          │
  └──────────────────────────────────────────────────┘

  RULE: on duplicate keys, the LAST spread wins.
```

---

## Getters and Setters

**File:** `10_chapter_Objects/70_Object_Getters_ans_Setters.js`

> `get`/`set` let you run code when a property is *read* or *written* - while keeping normal property syntax.

```js
const user = {
    _fullName: "Default",          // backing field (actual storage)
    get fullName() {
        return this._fullName;     // runs when reading user.fullName
    },
    set fullName(name) {
        this._fullName = name;     // runs when writing user.fullName
    },
};

console.log(user.fullName); // "Default"
user.fullName = "Jagadesh";
console.log(user.fullName); // "Jagadesh"
```

**⚠️ Infinite recursion trap:** never reference the same property name inside its own getter/setter.
```js
get fullName() { return this.fullName; } // RangeError: Maximum call stack size exceeded
```
The getter calls itself forever. Always use a separate backing field (conventionally `_fullName`).

---

## Looping Over Objects

**File:** `10_chapter_Objects/71_Object_Looping.js`

```js
let object1 = { a: 2, b: 4, c: 5, d: 6 };

Object.keys(object1);    // ["a","b","c","d"]
Object.values(object1);  // [2,4,5,6]
Object.entries(object1); // [["a",2],["b",4],["c",5],["d",6]]

for (const key in object1) {
    console.log(`Key: ${key}, Value: ${object1[key]}`);
}
```

---

## `let` vs `const` with Objects

**File:** `10_chapter_Objects/72_Onjects_let_and_const.js`

| | `const` object | `let` object |
|---|---|---|
| Reassign (new object) | ❌ throws error | ✅ allowed |
| Redeclare | ❌ throws error | ❌ throws error |
| Change properties | ✅ allowed | ✅ allowed |

```js
const config = { browser: "Chrome", timeout: 3000 };
config.browser = "Edge";   // ✅ properties can change
// config = { browser: "firefox" }; // ❌ TypeError: Assignment to constant variable

let obj = { browser: "Chrome" };
obj = { browser: "firefox" };  // ✅ reassignment allowed
```

**Mental model:** `const` locks the *binding* (which object a variable points to), not the object's *contents*.

---

## Real-Time QA Example (Config Objects)

**File:** `10_chapter_Objects/73_Objects_QA_RealTime_Example.js`

Objects are used everywhere in test automation - environment config, expected API responses, and test config.

```js
const ENV = {
    BASE_URL: "https://staging.myapp.com",
    TIMEOUT: 5000,
    RETRIES: 2,
    BROWSER: "Chrome",
};

const EXPECTED_RESPONSE = {
    status: 200,
    body: { user: { role: "admin", active: true } },
};

const config = {
    baseUrl: "http://localhost:3000",
    apiBaseUrl: "http://localhost:3000/api",
    testUser: { username: "testuser@example.com", password: "SecurePass123" },
    logLevel: "INFO",
    retryCount: parseInt(process.env.RETRY_COUNT || "3", 10),
};
```

### ⚠️ The `[object Object]` Trap

```js
console.log(`Environment: ${ENV}`);   // "Environment: [object Object]" ❌
console.log("Environment:", ENV);     // ✅ prints expandable object
console.log(JSON.stringify(ENV, null, 2)); // ✅ pretty-printed JSON
```

When an object is embedded in a template literal, JS coerces it to a string via `toString()` → `"[object Object]"`. Pass objects as separate `console.log` arguments, or serialize with `JSON.stringify`.

---

## Why Objects Matter for Playwright
- Test configuration (base URL, browser, timeouts) lives in objects.
- API response assertions compare against expected response objects.
- Page objects are objects grouping locators and actions.
- Spread operator is used to build clean config overrides per environment.

---

## Quick Summary
- Objects = key-value pairs; accessed via dot or bracket notation.
- `const` prevents reassignment, not property mutation.
- Objects are passed by **reference** - assignment aliases, it doesn't copy.
- Methods are functions inside objects; `this` refers to the owner object; `return this` enables chaining.
- Destructuring pulls properties by key name; rename with `{ key: newName }`.
- `===` compares references, not contents.
- Spread `{...obj}` copies/merges; later keys win on conflicts.
- Getters/setters need a separate backing field to avoid infinite recursion.
- `Object.keys/values/entries` and `for...in` iterate objects.
- Don't embed objects in template literals - they become `[object Object]`.
