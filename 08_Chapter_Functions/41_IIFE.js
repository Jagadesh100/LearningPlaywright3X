// Immediately Invoked Function Expression
// Calls the moment it is defined
// useful for onetime setup code
(function(){
    console.log(`Hello Tester`);
    
})();

function validateStatusCode(status) {

    if (status >= 200 && status <= 300) console.log("Request is fine!");

}

validateStatusCode(200);

(()=>{
    console.log("IIFE Arrow Function");
});

const name = (function(){
    console.log("IIFE Named Function"); 
})();