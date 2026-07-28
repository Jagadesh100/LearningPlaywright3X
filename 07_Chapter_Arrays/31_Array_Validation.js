let name = "test";
console.log(Array.isArray(name));

let arrayValues = [1,2,3,4,5,6];
console.log(Array.from(name));
console.log(Array.isArray(arrayValues));

let evenNumbers = [2,4,6,88,10,12,14];
let isEven = evenNumbers.every(x => x%2===0);
console.log(`All values in ${evenNumbers} is even? ${isEven}`);

console.log(`Some Values in ${arrayValues} is even? ${arrayValues.some(x => x%2 ===0)}`);

