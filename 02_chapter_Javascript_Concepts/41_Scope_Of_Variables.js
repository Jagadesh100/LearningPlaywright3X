const num = 10;
console.log("Outside:"+num);

function  numbers(){
    //console.log("Inside:"+num);
    const num = 20;
    console.log("Inside:"+num);
    if(true){
        const num = 30;
        console.log("Block:"+num);
    }
    console.log("Outside block:"+num);
}
numbers();
console.log("Outside:"+num);
