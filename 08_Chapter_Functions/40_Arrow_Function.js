const printStatus = (status) => console.log(`Status is ${status}`);
printStatus("400");

// Single line arrow function
const getEnv = () => `Pre-Prod`;
console.log(getEnv());

// Multi line arrow function requires curly braces { }

const oddOrEven = (number) => {
    if(number%2 === 0 && number!==0){
        console.log(`${number} is Even`);
    }
    else if(number%2 !==0 && number!==0){
         console.log(`${number} is Odd`);  
    }
    else{
        console.log(`${number} is Zero`);  
    }
}
oddOrEven(5);
oddOrEven(1034);
oddOrEven(0);