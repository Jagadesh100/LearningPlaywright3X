# Arrays in JavaScript

## 1. What is an Array?
An array is a special variable that can store multiple values in a single variable.

```js
let fruits = ["apple", "banana", "mango"];
```

- Arrays are used to store collections of data.
- Each value inside an array has an index.
- Indexing starts from 0.

Example:
```js
let colors = ["red", "green", "blue"];
console.log(colors[0]); // red
console.log(colors[2]); // blue
```

---

## 2. Ways to Declare an Array

### 1) Array Literal
```js
let numbers = [10, 20, 30];
```

### 2) Using `new Array()`
```js
let numbers = new Array(10, 20, 30);
```

### 3) Empty Array Declaration
```js
let emptyArray = [];
```

### 4) Array with Mixed Values
```js
let mixed = [1, "hello", true, null];
```

---

## 3. Array Declaration Used in Real-Time Projects
In real-world projects, arrays are commonly used to store:

- User lists
- Product data
- API response data
- Form input values
- Dashboard cards
- Todo items

Example:
```js
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" }
];
```

Example with products:
```js
let products = ["Laptop", "Mobile", "Headphones"];
```

---

## 4. Accessing Array Elements
You can access array elements using their index.

```js
let fruits = ["apple", "banana", "mango"];
console.log(fruits[0]); // apple
console.log(fruits[1]); // banana
```

### Accessing the last element
```js
console.log(fruits[fruits.length - 1]);
```

---

## 5. Modifying Array Elements
You can change an element by using its index.

```js
let fruits = ["apple", "banana", "mango"];
fruits[1] = "orange";
console.log(fruits); // ["apple", "orange", "mango"]
```

You can also add elements:
```js
fruits[3] = "grapes";
```

---

## 6. Important Array Properties

### `length`
Returns the number of elements in the array.

```js
let numbers = [10, 20, 30];
console.log(numbers.length); // 3
```

---

## 7. Common Array Methods

### `push()`
Adds an element to the end of the array.
```js
let fruits = ["apple"];
fruits.push("banana");
console.log(fruits); // ["apple", "banana"]
```

### `pop()`
Removes the last element.
```js
let fruits = ["apple", "banana"];
fruits.pop();
console.log(fruits); // ["apple"]
```

### `shift()`
Removes the first element.
```js
let fruits = ["apple", "banana"];
fruits.shift();
console.log(fruits); // ["banana"]
```

### `unshift()`
Adds an element to the beginning.
```js
let fruits = ["banana"];
fruits.unshift("apple");
console.log(fruits); // ["apple", "banana"]
```

### `indexOf()`
Returns the index of an element.
```js
let fruits = ["apple", "banana", "mango"];
console.log(fruits.indexOf("banana")); // 1
```

### `includes()`
Checks whether an element exists.
```js
let fruits = ["apple", "banana"];
console.log(fruits.includes("apple")); // true
```

### `splice()`
Adds or removes elements.
```js
let fruits = ["apple", "banana", "mango"];
fruits.splice(1, 1); // remove 1 element from index 1
console.log(fruits); // ["apple", "mango"]
```

### `slice()`
Copies a part of the array.
```js
let fruits = ["apple", "banana", "mango", "orange"];
let result = fruits.slice(1, 3);
console.log(result); // ["banana", "mango"]
```

### `concat()`
Combines two arrays.
```js
let a = [1, 2];
let b = [3, 4];
let c = a.concat(b);
console.log(c); // [1, 2, 3, 4]
```

### `join()`
Converts array elements into a string.
```js
let fruits = ["apple", "banana"];
console.log(fruits.join(" - ")); // apple - banana
```

### `reverse()`
Reverses the array.
```js
let fruits = ["apple", "banana", "mango"];
console.log(fruits.reverse()); // ["mango", "banana", "apple"]
```

### `sort()`
Sorts the array.
```js
let numbers = [30, 10, 20];
console.log(numbers.sort()); // [10, 20, 30]
```

---

## 8. Iterating Over an Array

### Using `for` loop
```js
let fruits = ["apple", "banana", "mango"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### Using `forEach()`
```js
fruits.forEach(function (fruit) {
  console.log(fruit);
});
```

### Using `map()`
```js
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
```

---

## 9. Array Interview Questions

1. What is an array in JavaScript?
2. What is the difference between `push()` and `pop()`?
3. What is the difference between `slice()` and `splice()`?
4. What is the use of `length` in an array?
5. How do you add and remove elements from an array?

---

## 10. Quick Summary
- Arrays store multiple values in one variable.
- They are indexed from 0.
- You can access and modify values using indexes.
- Built-in methods like `push()`, `pop()`, `splice()`, `slice()`, `map()` are very useful.
- Arrays are widely used in real-time web development.
