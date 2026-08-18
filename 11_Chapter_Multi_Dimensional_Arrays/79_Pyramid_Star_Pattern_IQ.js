let n = 4;
for (let i = 1; i <= n; i++) {
  let pattern = "";
  for (let leftSpace = 1; leftSpace <= n - i; leftSpace++) {
    pattern += " ";
  }
  for (let star = 1; star <= (2*i)-1; star++) {
    pattern += "*";
  }
  console.log(pattern);
}
