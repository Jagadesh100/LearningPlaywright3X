# Chapter 16 - Class And Objects

## What are Classes and Objects?

> A **class** is a blueprint (template) for creating objects. An **object** is a concrete instance created from that blueprint - it holds the actual data. Classes bundle data (fields) and behavior (methods) together in one place.

**Files:** `16_chapter_Class_And_Objects/104_Class.js`, `105_Constructor.js`, `106_Public_Private.js`, `107_Static.js`, `108_Static_Example2.js`

```js
class student {
  name;
  rollNo;
  grade;
  courseName;

  constructor(name, rollNo, grade, courseName) {
    this.name = name;
    this.rollNo = rollNo;
    this.grade = grade;
    this.courseName = courseName;
  }

  getstudentDetails() {
    console.log(`Student Name: ${this.name}`);
    console.log(`Roll No: ${this.rollNo}`);
    console.log(`Grade: ${this.grade}`);
    console.log(`Course Name: ${this.courseName}`);
  }
}

// Object Creation
const student1 = new student("Dhoni", 1705013, "A", "CSE");
student1.getstudentDetails();
```

**Key facts:**
- A class is a **blueprint**; an object is a **real instance** built from it.
- `new ClassName(...)` creates the object and runs the constructor.
- Fields are declared at the top of the class (e.g. `name;`, `rollNo;`), then assigned via `this.` inside the constructor.
- `this` refers to the **current object** - `this.name` sets the field on the instance being created.
- Methods live on the class and are shared by all instances; they access instance data through `this`.

---

## Constructors

> A **constructor** is a special method that runs automatically when you create an object with `new`. It sets up the object's initial state.

### Default (No-Argument) Constructor

```js
class DefaultStudent {
  name;
  rollNo;
  grade;
  courseName;

  // Default Constructor
  constructor() {
    this.name = "Default name";
    this.rollNo = 1;
    this.grade = "grade";
    this.courseName = "courseName";
  }
}

const student2 = new DefaultStudent();
student2.getstudentDetails(); // prints the default values
```

### Parameterised Constructor

```js
class Student {
  name;
  rollNo;
  grade;
  courseName;

  // Parameterised Constructor
  constructor(name, rollNo, grade, courseName) {
    this.name = name;
    this.rollNo = rollNo;
    this.grade = grade;
    this.courseName = courseName;
  }
}

const student1 = new Student("Dhoni", 1705013, "A", "CSE");
student1.getstudentDetails();
```

**Key facts:**
- A **default constructor** takes no arguments and assigns fixed/default values.
- A **parameterised constructor** accepts arguments and assigns them to the fields.
- JavaScript has **one** constructor per class - it either takes parameters or it doesn't.
- The constructor is called automatically by `new` - you never call it by name.

---

## Public and Private Fields

> By default every class field in JavaScript is **public** - accessible from anywhere. Private fields are marked with a `#` prefix and can only be accessed **inside the class**.

```js
class student {
  #name;  // Denotes Private
  rollNo; // By default public, in javascript no protected
  grade;
  courseName;

  constructor(name, rollNo, grade, courseName) {
    this.name = name;
    this.rollNo = rollNo;
    this.grade = grade;
    this.courseName = courseName;
  }

  getstudentDetails() {
    console.log(`Student Name: ${this.name}`);
  }
}

const student1 = new student("Dhoni", 1705013, "A", "CSE");
console.log(student1.name); // WORKS - public field
```

**Key facts:**
- `#fieldName` makes a field **private** - accessible only inside the class body.
- A field without `#` is **public** - readable/writable from outside via the object.
- JavaScript has **no `protected`** keyword (unlike Java/C#) - it's public or private only.
- Note: the comment in the source marks `#name` as private, but the constructor still assigns `this.name` - in real code, assign `this.#name = name` so the private field is actually used.

---

## Static Members

> **Static** members (fields and methods) belong to the **class itself**, not to instances. You call them with the class name - calling them on an object throws an error.

```js
class Student {
  name;
  rollNo;
  grade;
  courseName;

  constructor(name, rollNo, grade, courseName) {
    this.name = name;
    this.rollNo = rollNo;
    this.grade = grade;
    this.courseName = courseName;
  }

  static getstudentDetails() {
    console.log(`Student Name: ${this.name}`);
  }
}

const student1 = new Student("Dhoni", 1705013, "A", "CSE");
// student1.getstudentDetails();  // ❌ Throws error - static must be called with the class name
Student.getstudentDetails();       // ✅ Called on the CLASS, not the object
```

**Key facts:**
- `static` keyword makes a member a **class-level** member.
- Static members are accessed via the **class name** (`Student.getstudentDetails()`).
- Calling a static method on an **object** throws an error - static members do not exist on instances.
- Static fields are shared across all instances - great for counters and running totals.

---

## Static Example 2 - Test Runner Counter

> A practical static use case: tracking how many tests passed out of total, using static fields incremented in the constructor.

```js
class TestRunner {
  static totalTests = 0;
  static passCount = 0;

  constructor(name, passed) {
    this.name = name;
    TestRunner.totalTests++;           // every new TestRunner counts a test
    if (passed) TestRunner.passCount++; // only increment passCount if it passed
  }

  static summary() {
    return TestRunner.passCount + "/" + TestRunner.totalTests + " passed";
  }
}

new TestRunner("Login", true);
new TestRunner("Signup", false);
new TestRunner("Cart", true);
new TestRunner("Checkout", true);

console.log(TestRunner.summary()); // "3/4 passed"
```

**Key facts:**
- `static totalTests` and `static passCount` are **class-level counters** - they live on the class, not on any single instance.
- Each `new TestRunner(...)` increments `totalTests` inside the constructor; passing tests also bump `passCount`.
- `static summary()` reads the class fields via the class name and returns the tally.
- **Playwright warning (from the source comment):** avoid static state in Playwright tests - shared static variables cause unusual errors when tests run in **parallel** workers.

---

## Quick Summary
- **Class** = blueprint, **object** = instance created with `new`.
- **Constructor** - special method run automatically by `new`; default (no args) or parameterised (with args).
- **Public vs private** - fields are public by default; `#` makes them private; there is **no protected** in JavaScript.
- **Static members** - belong to the class, accessed via the class name, shared across instances; calling them on an object throws.
- **Static test counter** - static fields track totals across all instances (e.g. `3/4 passed`).
- **Playwright** - avoid static state; it causes unexpected errors in parallel runs.
