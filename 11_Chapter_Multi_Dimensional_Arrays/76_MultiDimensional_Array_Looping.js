let scores = [
  [20, 78, 90],
  [64, 74, 83, 76],
  [89, 98, 78],
];

for (let row = 0; row < scores.length; row++) {
  for (let col = 0; col < scores[row].length; col++) {
    console.log(scores[row][col] + " ");
  }
}

for (let row of scores) {
  for (let col of row) {
    //console.log("Index :"+col+" "+scores[row][col] + " ");
    console.log(`Value: ${col}`);
  }
}
