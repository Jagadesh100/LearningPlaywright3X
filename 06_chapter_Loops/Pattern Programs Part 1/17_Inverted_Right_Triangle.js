let n=5;

for(row = n; row>=1; row--){
    let invertedRightTriangle = "";
    for(let star =1; star<= row; star++){
        invertedRightTriangle+="*";
    }
    for(let space = 1; space<= (n-row);space++){
        invertedRightTriangle+=" ";
    }
    console.log(invertedRightTriangle);
}