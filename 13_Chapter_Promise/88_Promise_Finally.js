let apiCall = new Promise(function (resolve, reject) {
  reject({ status: 500 });
});

apiCall
  .then(function (response) {
    console.log(response);
    console.log(response.status);
    console.log(response.body);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    console.log(`Finally Block`);
  });

// catch - when promise fails/rejects catch will be called
// then - when promise resolved
// finally - 
