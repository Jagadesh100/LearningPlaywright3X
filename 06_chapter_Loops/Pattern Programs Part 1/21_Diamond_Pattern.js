let n = 9;
let upperPyramid = Math.round(n / 2);
let lowerPyramid = n - upperPyramid;

// console.log(upperPyramid);
// console.log(lowerPyramid);


for (let row = 1; row <= upperPyramid; row++) {
    let upperPyramidPattern = "";

    for (let leftSpace = 1; leftSpace <= upperPyramid - row; leftSpace++) {
        upperPyramidPattern += " ";
    }

    for (let star = 1; star <= (2 * row) - 1; star++) {
        upperPyramidPattern += "*";
    }

    console.log(upperPyramidPattern);
}

for (let row = lowerPyramid; row >= 1; row--) {
    let lowerPyramidPattern = " ";
    for (let leftSpace = 1; leftSpace <= lowerPyramid - row; leftSpace++) {
        lowerPyramidPattern += " ";
    }
    for (let star = 1; star <= (2 * row) - 1; star++) {
        lowerPyramidPattern += "*";
    }
    console.log(lowerPyramidPattern);
}

