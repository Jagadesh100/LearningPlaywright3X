let object1 = { a:2,b:4,c:5,d:6};
console.log(`Keys: ${Object.keys(object1)}`); // Prints Keys

console.log("Values: "+Object.values(object1)); // Prints Values

console.log(`Entries: ${Object.entries(object1)}`); // Prints key and values as a comma sperated Entries: a,2,b,4,c,5,d,6

for(const key in object1){
    console.log(`Key: ${key}, Value: ${object1[key]}`);
}


