let n = 7;

for (let row = 1; row <= n; row++) {
    let pyramidPattern = "";
    for (let leftSpace = 1; leftSpace <= (n - row); leftSpace++) {
        pyramidPattern += " ";
    }
    for (let star = 1; star <= (2 * row) - 1; star++) {
        pyramidPattern += "*";
    }
    console.log(pyramidPattern);
}