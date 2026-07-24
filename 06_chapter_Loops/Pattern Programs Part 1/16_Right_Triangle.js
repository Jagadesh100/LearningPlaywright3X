let n = 10;

for (let row = 1; row <= n; row++) {
    let rightTrianglePattern = "";
    for (let star = 1; star <= row; star++) {
        rightTrianglePattern += "*";
    }
    for (let space = 1; space <= (n - row); space++) {
        rightTrianglePattern += " ";
    }
    console.log(rightTrianglePattern);
}