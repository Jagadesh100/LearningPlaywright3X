let myArray = [1, 2, 1, 3, 5, 6, 1, 2];

let filteredArray = myArray.filter((index,value)=>myArray.indexOf(index)===value);
console.log(filteredArray);

