let n = 6;

for (let row = 1; row <= n; row++) {
    let leftTriangle = "";
    for (let space = 1; space <= (n - row); space++) {
        leftTriangle += " ";
    }
    for (let star = 1; star <= row; star++) {
        leftTriangle += "*";
    }
    console.log(leftTriangle);
}