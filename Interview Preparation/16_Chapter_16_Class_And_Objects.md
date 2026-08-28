# Chapter 16 - Class And Objects: Interview Questions

## Basic Questions

1. **What is a class in JavaScript?**
   - A **blueprint** or template for creating objects. It bundles data (fields) and behavior (methods) together. It does nothing by itself until you create an object from it.

2. **What is an object?**
   - A **concrete instance** of a class, created with the `new` keyword. It holds the actual data (e.g. `student1` with `name: "Dhoni"`, `rollNo: 1705013`).

3. **How do you create an object from a class?**
   - ```js
     const student1 = new Student("Dhoni", 1705013, "A", "CSE");
     ```
   - `new` allocates the object, runs the constructor, and returns the instance.

4. **What is `this` inside a class?**
   - `this` refers to the **current instance**. `this.name = name` in the constructor sets the `name` field on the object being created.

5. **What are class fields?**
   - Variables declared at the top of the class body (`name;`, `rollNo;`, `grade;`, `courseName;`). They hold the object's data and are assigned through the constructor.

6. **What is a method in a class?**
   - A function defined inside the class (e.g. `getstudentDetails()`). It operates on the instance's data through `this` and is shared by all instances.

## Constructors

7. **What is a constructor?**
   - A special method that runs **automatically** when you create an object with `new`. It initializes the object's state.

8. **What is a default constructor?**
   - A constructor with **no parameters** that assigns fixed/default values:
   - ```js
     constructor() {
       this.name = "Default name";
       this.rollNo = 1;
     }
     ```

9. **What is a parameterised constructor?**
   - A constructor that **accepts arguments** and assigns them to fields:
   - ```js
     constructor(name, rollNo, grade, courseName) {
       this.name = name;
       this.rollNo = rollNo;
       this.grade = grade;
       this.courseName = courseName;
     }
     ```

10. **Can a class have both a default and a parameterised constructor?**
    - Not in JavaScript - a class can have **only one** `constructor`. If you need defaults, use default parameter values or a separate factory/static method. (This differs from Java/C++, which allow constructor overloading.)

11. **Do you call the constructor yourself?**
    - No - `new ClassName(...)` calls it for you. You never invoke the constructor by name.

## Public and Private Fields

12. **What is the default visibility of a class field?**
    - **Public** - accessible from anywhere, including outside the class: `student1.name` works.

13. **How do you make a field private?**
    - Prefix it with `#`:
    - ```js
      class student {
        #name;  // private
        rollNo; // public
      }
      ```

14. **Where can a private field be accessed?**
    - Only **inside the class body**. Accessing `student1.#name` from outside throws a `SyntaxError`.

15. **Does JavaScript have a `protected` keyword?**
    - No - JavaScript only has public and private. There is no `protected` (unlike Java/C#). Fields are either accessible everywhere or only inside the class.

16. **If you declare `#name` but assign `this.name` in the constructor, what happens?**
    - The `#name` private field stays `undefined` and a separate public `name` field is created instead. The comment in the source marks `#name` as private, but to actually use it you must assign `this.#name = name`.

## Static Members

17. **What does the `static` keyword do?**
    - It makes a member **belong to the class itself**, not to instances. Static members are shared across all objects of the class.

18. **How do you call a static method?**
    - With the **class name**: `Student.getstudentDetails()`. NOT with an object:
    - ```js
      // student1.getstudentDetails(); // ❌ TypeError: not a function
      Student.getstudentDetails();      // ✅
      ```

19. **Why does calling a static method on an object throw an error?**
    - Static members live on the class, not on instances. The object has no such method, so JavaScript throws a `TypeError`.

20. **What are static fields used for?**
    - Class-level data shared by all instances - counters, totals, configuration. Example: `TestRunner.totalTests` and `TestRunner.passCount` accumulate across every `new TestRunner(...)`.

21. **How does the `TestRunner` counter example work?**
    - ```js
      class TestRunner {
        static totalTests = 0;
        static passCount = 0;
        constructor(name, passed) {
          this.name = name;
          TestRunner.totalTests++;
          if (passed) TestRunner.passCount++;
        }
        static summary() {
          return TestRunner.passCount + "/" + TestRunner.totalTests + " passed";
        }
      }
      ```
    - Each `new TestRunner("Login", true)` increments `totalTests`; passing tests also bump `passCount`. `TestRunner.summary()` returns `"3/4 passed"`.

22. **What is the difference between static and instance members?**
    - **Instance members** (fields/methods without `static`) belong to each object; you access them via the object and they can hold per-instance data. **Static members** belong to the class; you access them via the class name and they are shared by all instances.

## Scenario Questions

23. **You run a suite of 4 tests and get `3/4 passed` - how does the class track that?**
    - Through static fields incremented in the constructor. Every test instantiation bumps `totalTests`; only passing ones bump `passCount`. `summary()` reads both and formats the string.

24. **Why should you avoid static state in Playwright tests?**
    - Playwright runs tests in **parallel workers**. Shared static variables are mutated across workers and cause **unusual, hard-to-debug errors**. Prefer instance state or fixtures instead.

25. **You need an object with default values when no arguments are passed. How?**
    - Use a default (no-argument) constructor that assigns default values, or give the parameterised constructor defaults:
    - ```js
      constructor(name = "Default name", rollNo = 1) { ... }
      ```

26. **How do you hide a password field so it can't be read from outside?**
    - Make it private with `#`:
    - ```js
      class User {
        #password;
        constructor(password) { this.#password = password; }
      }
      // user.#password → SyntaxError from outside
      ```

27. **What happens if you forget `new` when creating an object?**
    - In modern JavaScript, calling a class without `new` throws a `TypeError: Class constructor cannot be invoked without 'new'`. Classes always require `new`.

## Quick Recap for Interviews
- **Class** = blueprint; **object** = instance created with `new`.
- **Constructor** - runs automatically on `new`; default (no args) or parameterised (with args); only one per class.
- **Visibility** - fields are public by default; `#` makes them private; no `protected` in JavaScript.
- **Static members** - belong to the class, accessed via class name, shared by all instances; calling them on an object throws.
- **Static counters** - e.g. `TestRunner.summary()` returning `3/4 passed` via class-level `totalTests`/`passCount`.
- **Playwright** - avoid static state; it causes unexpected errors in parallel runs.
