let num = 10;
console.log("Outside:"+num); // 10

function  numbers(){
   // console.log("Inside:"+num);
    let num = 20;
    console.log("Inside:"+num); //20
    if(true){
        let num = 30;
        console.log("Block:"+num); //30
    }
    console.log("Outside block:"+num); //20
}
numbers();
console.log("Outside:"+num); //10
