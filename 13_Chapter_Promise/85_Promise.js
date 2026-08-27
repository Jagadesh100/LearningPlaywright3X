let myPromise = new Promise(function(resolve,reject){
    let promise = false;
    if(promise){
        resolve(`Promise Resolved`);
    }
    else{
        reject(`Promise Failed`);
    }
});

console.log(myPromise); // if rejected throws unhandled Promise Rejection
