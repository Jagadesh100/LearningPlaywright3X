function outer(name){
    let message ="Hello";
    function inner(){
        console.log(`${message} ${name}`); // inner function still remembers message
    }
    return inner;
}

let greet = outer("Username");
greet();