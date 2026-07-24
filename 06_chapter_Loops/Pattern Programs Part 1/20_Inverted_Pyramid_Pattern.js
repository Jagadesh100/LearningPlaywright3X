let n=6;

for(let row=n;row>=1;row--){
    let invertedPyramidPattern = "";
    for(let leftSpace = 1; leftSpace <= (n-row); leftSpace++){
        invertedPyramidPattern+=" ";
    }
    for(let star=1; star<= (2*row)-1;star++){
        invertedPyramidPattern+="*";
    }
    console.log(invertedPyramidPattern);
}