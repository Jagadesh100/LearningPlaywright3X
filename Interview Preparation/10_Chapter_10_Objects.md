# Chapter 10 - Objects: Interview Questions

## Basic Questions

1. **What is an object in JavaScript?**
   - A collection of **key-value pairs** used to group related data and behavior. Keys are strings (or symbols), values can be any data type.

2. **What are the ways to access object properties?**
   - Dot notation: `person.name`
   - Bracket notation: `person["name"]`
   - Dynamic key: `person[key]` where `key` is a variable

3. **What is the difference between dot and bracket notation?**
   - Dot notation requires a valid identifier and is static.
   - Bracket notation accepts any string expression, allows dynamic keys, and keys with spaces/special characters.

4. **Can you modify a `const` object?**
   - Yes. `const` prevents **reassignment** of the variable, but the object's **properties can still be changed** (add/update/delete).

5. **What does "call by reference" mean for objects?**
   - Assigning an object to another variable copies the **reference** (memory address), not the data. Both variables point to the same object - mutating one affects the other.

6. **What is a method?**
   - A function stored as an object property. Inside it, `this` refers to the object itself.

7. **How do you achieve method chaining in JavaScript?**
   - By returning `this` from each method, so the object is returned for the next call:
     ```js
     calculator.add(5).subtract(3).multiply(10);
     ```

8. **What is object destructuring?**
   - Pulling values out of an object into standalone variables, matching by **key name** (unlike arrays which match by position):
     ```js
     const { gender } = person;
     ```

9. **How do you rename a variable while destructuring?**
   - `const { name: UserName } = person;` - reads `person.name` but stores it as `UserName`.

10. **How do you set a default value in destructuring?**
    - `const { isemployed = true } = person;` - uses `true` if the key is missing (does not add to the original object).

11. **Why are `a === b` false but `c === d` true?**
    ```js
    let a = { status: "pass" };
    let b = { status: "pass" };   // two separate objects
    a === b; // false (different references)

    let c = { status: "fail" };
    let d = c;                    // d is an alias of c
    c === d; // true (same reference)
    ```
    - `===` compares **references** (memory address), not contents.

12. **How do you copy and merge objects?**
    - With the **spread operator** `{ ...obj1, ...obj2 }`. Later spreads overwrite earlier ones on duplicate keys.

13. **What is a getter and setter?**
    - `get`/`set` blocks that run custom code when a property is read/written, while keeping normal property syntax.

14. **What happens if you reference the same property name inside a getter?**
    - **Infinite recursion** → `RangeError: Maximum call stack size exceeded`. Always use a separate backing field (`_fullName`).

15. **What are `Object.keys()`, `Object.values()`, `Object.entries()`?**
    - `keys()` → array of keys, `values()` → array of values, `entries()` → array of `[key, value]` pairs.

16. **What is the difference between `let` and `const` with objects?**
    - `const` objects cannot be **reassigned** (new object); `let` can. Both allow property mutation.

17. **Why does an object print as `[object Object]` in a template literal?**
    - Because `${obj}` coerces the object to a string via `toString()` → `"[object Object]"`. Fix: pass the object as a separate `console.log` argument or use `JSON.stringify(obj)`.

## Code Output Questions

18. **Output?**
    ```js
    let person = { name: "Jagadesh", age: 20 };
    console.log(person.name);
    console.log(person["age"]);
    ```
    **Answer:** `Jagadesh` then `20`

19. **Output?**
    ```js
    let a = { id: 1 };
    let b = a;
    b.id = 2;
    console.log(a.id);
    ```
    **Answer:** `2` (both reference the same object)

20. **Output?**
    ```js
    const person = { name: "Jagadesh", age: 20, gender: "Male" };
    const { gender } = person;
    const { name: UserName } = person;
    console.log(gender);
    console.log(UserName);
    ```
    **Answer:** `Male` then `Jagadesh`

21. **Output?**
    ```js
    let a = { status: "pass" };
    let b = { status: "pass" };
    console.log(a === b);
    let c = { status: "fail" };
    let d = c;
    console.log(c === d);
    ```
    **Answer:** `false` then `true`

22. **Output?**
    ```js
    const calculator = {
        value: 0,
        add(n) { this.value += n; return this; },
        multiply(n) { this.value *= n; return this; },
    };
    let result = calculator.add(5).multiply(2);
    console.log(result.value);
    ```
    **Answer:** `10`

23. **Output?**
    ```js
    let object1 = { a: 1, b: 2 };
    let object2 = { b: 3, c: 4 };
    let merged = { ...object1, ...object2 };
    console.log(merged);
    ```
    **Answer:** `{ a: 1, b: 3, c: 4 }` (later spread wins on `b`)

24. **Output?**
    ```js
    let object1 = { a: 1 };
    let object3 = { ...object1 };
    object1.a = 256;
    console.log(object3.a);
    ```
    **Answer:** `1` (spread made an independent copy)

25. **Output?**
    ```js
    const user = {
        _fullName: "Default",
        get fullName() { return this._fullName; },
        set fullName(name) { this._fullName = name; },
    };
    user.fullName = "Jagadesh";
    console.log(user.fullName);
    ```
    **Answer:** `Jagadesh`

26. **Output?**
    ```js
    let obj = { a: 2, b: 4 };
    console.log(Object.keys(obj));
    console.log(Object.values(obj));
    console.log(Object.entries(obj));
    ```
    **Answer:** `["a","b"]`, `[2,4]`, `[["a",2],["b",4]]`

27. **Output?**
    ```js
    const config = { browser: "Chrome" };
    config.browser = "Edge";
    console.log(config.browser);
    // config = { browser: "firefox" }; // what happens if uncommented?
    ```
    **Answer:** `Edge`; uncommenting throws `TypeError: Assignment to constant variable`.

## Scenario Questions

28. **How would you create a Playwright test configuration object with defaults and overrides?**
    ```js
    const defaults = { browser: "Chrome", timeout: 3000 };
    const overrides = { browser: "Edge" };
    const config = { ...defaults, ...overrides }; // { browser: "Edge", timeout: 3000 }
    ```

29. **How do you compare two objects by content instead of reference?**
    - `JSON.stringify(obj1) === JSON.stringify(obj2)` - with caveats (key order matters), or compare property by property.

30. **Why is "call by reference" dangerous in test automation?**
    - If you alias a config object and mutate it, the original changes too - causing unexpected test behavior. Use spread to copy.

31. **How do you safely log an object in console?**
    - `console.log("Config:", config)` - pass it as a separate argument, or `JSON.stringify(config, null, 2)` for pretty output.

32. **When would you use getters/setters in a real project?**
    - To validate or transform values on assignment, compute derived values on read, or hide internal state.

## Quick Summary
- Objects = key-value pairs; `const` blocks reassignment, not mutation.
- Assignment is by **reference** - use spread `{...obj}` to copy.
- `===` compares references; destructure by key name.
- `return this` enables chaining.
- Getters/setters need a backing field (`_name`) to avoid recursion.
- Never embed objects in template literals (`[object Object]` trap).
