let n = 4;
for (let i = 1; i <= n; i++) {
  let pattern = "";
  for (let star = 1; star <= i; star++) {
    pattern += "*";
  }

  for (let space = 1; space <= n - i; space++) {
    pattern += " ";
  }
  console.log(pattern);
}
