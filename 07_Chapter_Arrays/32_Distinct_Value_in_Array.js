let arr = [1,2,1,2,1,2,3,4,2,1,4,3];
let distincArray = arr.filter((value,index)=> arr.indexOf(value)===index);
console.log(`original Array: ${arr}`);
console.log(`Distinct Array: ${distincArray}`);