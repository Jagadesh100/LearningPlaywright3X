// // Named Functions doesn't support Hoisting

// getStatusCode(); // undefined

// var getStatusCode = function(){
//     console.log("200");
// }

// for var only declartion will come to top , so it treat it getStatusCode insetad getStatusCode()

getResult(); // let,const Access/Reference error

const getResult = function(){
    console.log("Pass");
}