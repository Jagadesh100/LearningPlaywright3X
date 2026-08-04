// Normal Function - function name and body gets hoisted

// printStatusCode(); // prints the output 

// function printStatusCode(){
//     console.log("200");
// }

// printfailureStatusCode();

// var failureStatusCode = function(){
//     console.log("500");
// } // TypeError

failureStatusCodeClient();

let failureStatusCodeClient = function(){
    console.log("500");
}// let, const Reference Error

