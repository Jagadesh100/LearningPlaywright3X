// function inside the object refres to method

let result = {
  status: "Pass",
  getStatus() {
    return this.status;
  },
};

console.log(`Status: ${result.getStatus()}`); //Status: Pass

console.log(
  `Bracket Notation ${result["getStatus"]}`,
); /* Bracket Notation getStatus(){
        return this.status;
    }*/
