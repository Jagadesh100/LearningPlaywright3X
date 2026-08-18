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

// Modifying object

// Add a key
person.email="test123@example.com";
console.log(person);

// Modify a key
person.email="uatTest12345@example.com";
console.log(person);

// Delete a key
delete person.email;
console.log(person);
