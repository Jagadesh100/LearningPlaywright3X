// Objects in Javascript is a Key value pair

const person = {
    name: "Jagadesh",
    age: 20,
    gender: "Male"
}

// Accessing Objects

// by dot operator(.) and bracket notation []
console.log(`Name: ${person.name}`);

console.log(`Gender: ${person["gender"]}`);

let key = "age";
console.log(`Age: ${person[key]}`);
