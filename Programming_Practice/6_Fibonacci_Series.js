let n = 5;
let f1 = 0,
  f2 = 1;
let series = [];

if (n === 0) {
  series.push(f1);
} else {
  series.push(f1, f2);
  for (let i = 2; i < n; i++) {
    let sum = f1 + f2;
    f1 = f2;
    f2 = sum;
    series.push(sum);
  }
}
console.log(series.join(" "));
