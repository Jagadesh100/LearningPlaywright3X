# Chapter 5 - Conditional Statements

## What are Conditional Statements?
Conditional statements let the program make decisions and execute different blocks of code based on conditions.

## 1. Triangle Type Checker

**File:** `05_chapter_Statements/12_Triangle.js`

> Takes three sides as input and identifies the type of triangle using `if`, `else if`, and `else`.

```js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()));
    });
}

async function main() {
    const side1 = Number(await askQuestion('Enter side 1: '));
    const side2 = Number(await askQuestion('Enter side 2: '));
    const side3 = Number(await askQuestion('Enter side 3: '));

    if (side1 === side2 && side1 === side3) {
        console.log('Equilateral');
    } else if (side1 === side2 || side2 === side3 || side3 === side1) {
        console.log('Isosceles');
    } else {
        console.log('Scalene');
    }

    rl.close();
}

main();
```

### Concepts used
- **`if ... else if ... else`** - decision making chain
- **Logical operators** - `&&` (AND), `||` (OR)
- **`readline` module** - to take input from the terminal
- **`async/await`** with **Promises** - for asynchronous user input

### Triangle rules
| Condition                                    | Triangle type |
|----------------------------------------------|---------------|
| All three sides equal                        | Equilateral   |
| Exactly two sides equal (any pair)           | Isosceles     |
| No sides equal                               | Scalene       |

### Triangle Type Decision Flowchart

```
                 ┌────────────────────────────────────┐
                 │  Input: side1, side2, side3       │
                 └─────────────────┬──────────────────┘
                                   ▼
                 ┌────────────────────────────────────┐
                 │  side1 === side2 &&                │── Yes ──► ┌──────────────┐
                 │  side1 === side3?                  │           │  Equilateral │
                 └─────────────────┬──────────────────┘           └──────────────┘
                                   │ No
                                   ▼
                 ┌────────────────────────────────────┐
                 │  side1 === side2 ||                │── Yes ──► ┌──────────────┐
                 │  side2 === side3 ||                │           │  Isosceles   │
                 │  side3 === side1?                  │           └──────────────┘
                 └─────────────────┬──────────────────┘
                                   │ No
                                   ▼
                 ┌────────────────────────────────────┐
                 │  ✅ Scalene                        │
                 └────────────────────────────────────┘
```

## 2. Leap Year Checker

**File:** `05_chapter_Statements/13_LeapYear.js`

```js
let data = 2024;

if (data % 4 === 0 && data % 100 !== 0) {
    console.log("YES");
}
else {
    console.log("NO");
}
```

### Leap year rule
- A year is a leap year if it is divisible by **4** AND **not** divisible by **100**.
- (Full rule also adds: OR divisible by 400.)

```
2024 -> 2024 % 4 == 0 (true) AND 2024 % 100 != 0 (true) -> YES (Leap Year)
```

### Leap Year Decision Flowchart

```
                 ┌────────────────────────────────────┐
                 │  Input: year (e.g., 2024)          │
                 └─────────────────┬──────────────────┘
                                   ▼
                 ┌────────────────────────────────────┐
                 │  year % 4 === 0 ?                  │── No ──► ┌──────────────┐
                 └─────────────────┬──────────────────┘          │  NOT Leap    │
                                   │ Yes                         │  Year        │
                                   ▼                             └──────────────┘
                 ┌────────────────────────────────────┐
                 │  year % 100 !== 0 ?                │── Yes ──► ┌──────────────┐
                 └─────────────────┬──────────────────┘           │  ✅ Leap     │
                                   │ No                          │  Year        │
                                   ▼                             └──────────────┘
                 ┌────────────────────────────────────┐
                 │  year % 400 === 0 ?                │── Yes ──► ┌──────────────┐
                 └─────────────────┬──────────────────┘           │  ✅ Leap     │
                                   │ No                          │  Year        │
                                   ▼                             └──────────────┘
                 ┌────────────────────────────────────┐
                 │  NOT Leap Year                     │
                 └────────────────────────────────────┘
```

## Quick Summary
- `if`, `else if`, `else` control program flow.
- Combine conditions with `&&` (AND) and `||` (OR).
- Logical conditions are evaluated left to right.
