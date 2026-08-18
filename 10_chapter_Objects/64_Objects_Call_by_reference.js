// Object follows call by refercence , highly vulnerable when copying and modifying

let a = { id:1, empName:"Test"};
console.log("a:");
console.log(a);

let b=a;
console.log("b:");
console.log(b);

b.id=2;
console.log("b:");
console.log(b);

console.log("a:");
console.log(a);


