const person = {
  name: "Jagadesh",
  age: 20,
  gender: "Male",
  personal_details: {
    email: "test123@example.com",
    contact: 1234567,
  },
};

// Destructuring - Pulls Value from object and store as variable

// Same as Array Destructuring
/*
let a =[1,2,3,45]
const [b,d,f,c] = a;
*/

const { gender } = person;
console.log(gender);

// ReName while Destructuring
const { name: UserName } = person;
console.log(`UserName: ${UserName}`);

// Default value if the key is missing
const { isemployed= true} = person; // it will not add in original object
console.log(`IsEmployed: ${isemployed}`);

console.log(`Object`);
console.log(person);



