let n = 5;

for (let row = 1; row <= n; row++) {
    let squarePattern = "";
    for (let star = 1; star <= n; star++) {
        squarePattern+="*";
    }
    console.log(squarePattern);
}