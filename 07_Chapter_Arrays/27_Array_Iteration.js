let testResults = ["Pass","Fail","Skip", "Pass", "Fail"];

for (let index = 0; index < testResults.length; index++) {
    const element = testResults[index];
    console.log(element);  
}

// for of
for(let test of testResults){
    console.log(`Test Result:${test}`);
}

// for of with index and values
for(let [i,test] of testResults.entries()){
    console.log(`Test Result at ${i}:${test}`);
}

// for each
testResults.forEach((result,index)=>{
    console.log(`Test Results in ${index}:${result}`);
});

