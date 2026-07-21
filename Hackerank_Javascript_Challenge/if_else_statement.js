/*
You are given a variable marks. Your task is to print:

- AA if marks is greater than 90.
- AB if marks is greater than 80 and less than or equal to 90.
- BB if marks is greater than 70 and less than or equal to 80.
- BC if marks is greater than 60 and less than or equal to 70.
- CC if marks is greater than 50 and less than or equal to 60.
- CD if marks is greater than 40 and less than or equal to 50.
- DD if marks is greater than 30 and less than or equal to 40.
- FF if marks is less than or equal to 30.
*/

console.log("Enter the mark:");
const input = require('fs').readFileSync(0,'utf8');
if(input>90){
    console.log("AA");
}
else if(input>80 && input<= 90){
    console.log("AB");
}
else if(input>70 && input <= 80){
    console.log("BB");
}
else if(input>60 && input <= 70){
    console.log("BC");
}
else if(input>50 && input <= 60){
    console.log("CC");
}
else if(input>40 && input <= 50){
    console.log("CD");
}
else if(input>30 && input <= 40){
    console.log("DD");
}
else if(input<=30){
    console.log("FF");
}