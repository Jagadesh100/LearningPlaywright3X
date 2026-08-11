// spread in function calls splits into individual elements, opposite to rest

function sum(a,b,c){
    console.log(a+b+c);
}

let a = [1,2,3];
sum(...a);

let b = [1,2,5,6,7];
sum(...b);// based on number of parameters it will take only those number of arguments from beginning