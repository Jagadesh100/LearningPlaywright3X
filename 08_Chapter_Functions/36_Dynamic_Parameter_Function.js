function sumOfValues(a,b,c){
    return a+b+c;
}

// Rest Parameters
// we should use only in the last
function dynamicSumOfValues(...values){
    return values.reduce((sum,n)=>sum+n,0);
}

function dynamicSumOfValues(a,...values){
    return values.reduce((sum,n)=>sum+n,0);
}


let a= [1,2,3,4,5];
console.log(sumOfValues(...a));
console.log(dynamicSumOfValues(10,2,334,568,346,325456,23456,"rets"));

