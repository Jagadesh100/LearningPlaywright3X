# Chapter 7 - Arrays: Interview Questions

## Basic Questions

1. **What is an array in JavaScript?**
   - An array is a special variable that stores multiple values in a single variable, each accessible by an index starting from `0`.

2. **How do you declare an array?**
   ```js
   let arr = [1, 2, 3];              // array literal
   let arr2 = new Array(3);          // constructor (length 3)
   let arr3 = Array.of(1, 2, 3);     // of
   let arr4 = Array.from("abc");     // ['a','b','c']
   ```

3. **What is the difference between `new Array(3)` and `Array.of(3)`?**
   - `new Array(3)` creates an empty array of length 3; `Array.of(3)` creates `[3]`.

4. **What does `Array.from("Pass")` return?**
   - `['P', 'a', 's', 's']` - splits a string into an array of characters.

5. **How do you access the last element of an array?**
   ```js
   arr[arr.length - 1];
   arr.at(-1);   // modern way, supports negative index
   ```

6. **What is the `length` property?**
   - It returns the number of elements in the array and updates dynamically.

## Methods Questions

7. **What is the difference between `push()` and `unshift()`?**
   - `push()` adds to the end; `unshift()` adds to the beginning.

8. **What is the difference between `pop()` and `shift()`?**
   - `pop()` removes the last element; `shift()` removes the first element.

9. **What is the difference between `slice()` and `splice()`?**

   |           | slice                    | splice                    |
   |-----------|--------------------------|---------------------------|
   | Purpose   | copy a portion           | add/remove elements       |
   | Original  | unchanged                | modified                  |
   | End index | exclusive                | count to delete           |
   | Negative  | supported                | supported                 |

10. **What does `indexOf()` return if the element is not found?**
    - `-1`.

11. **What is the difference between `indexOf()` and `findIndex()`?**
    - `indexOf()` searches by value; `findIndex()` searches by a callback condition.

12. **What do `find()` and `findLast()` return?**
    - `find()` returns the first matching value; `findLast()` returns the last matching value. Both return `undefined` if no match.

13. **What is the difference between `map()`, `filter()`, and `reduce()`?**
    - `map()` transforms every element into a new array of the same length.
    - `filter()` keeps only elements matching a condition (new array, may be shorter).
    - `reduce()` reduces the array to a single value using an accumulator.

14. **Do `map()` and `filter()` modify the original array?**
    - No - they return new arrays. (`sort()`, `splice()`, `push()`, etc. modify in place.)

15. **Why does `[1, 34, 2, 20, 10].sort()` give `[1, 10, 2, 20, 34]`?**
    - Because `sort()` converts values to strings and sorts lexicographically. Use a compare function: `sort((a, b) => a - b)` for ascending.

16. **What does `every()` vs `some()` do?**
    - `every()` returns `true` only if ALL elements pass the condition; `some()` returns `true` if AT LEAST ONE passes.

17. **What is the difference between `forEach()` and `map()`?**
    - `forEach()` just iterates (returns `undefined`); `map()` returns a new transformed array.

18. **How do you combine two arrays?**
    ```js
    arr1.concat(arr2);
    [...arr1, ...arr2];   // spread operator
    ```

19. **What does `join()` do?**
    - Converts array elements into a string, e.g., `["a","b"].join(" - ")` -> `"a - b"`.

20. **How do you check if a value is an array?**
    - `Array.isArray(value)` - `instanceof Array` can fail across frames.

## Coding Questions

21. **Remove duplicates from an array.**
    ```js
    let arr = [1, 2, 1, 2, 3, 4, 2, 1, 4, 3];
    let distinct = arr.filter((value, index) => arr.indexOf(value) === index);
    // or: [...new Set(arr)]
    ```

22. **Find the maximum value in an array.**
    ```js
    let max = arr.reduce((acc, val) => (acc > val ? acc : val));
    // or: Math.max(...arr)
    ```

23. **Find the minimum value in an array.**
    ```js
    let min = arr.reduce((acc, val) => (acc < val ? acc : val), arr[0]);
    // or: Math.min(...arr)
    ```

24. **How do you iterate over an array with its index?**
    ```js
    for (let [i, value] of arr.entries()) { ... }
    arr.forEach((value, index) => { ... });
    ```

25. **How do you sort numbers ascending and descending?**
    ```js
    arr.sort((a, b) => a - b);  // ascending
    arr.sort((a, b) => b - a);  // descending
    ```
