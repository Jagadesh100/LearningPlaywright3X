let n = 4;

for(let row = n; row >= 1; row--){
    let invertedLeftTriangle = "";
        for(let space=1;space<=n-row;space++){
        invertedLeftTriangle+=" ";
    }
    for(let star=1;star<=row;star++){
        invertedLeftTriangle+="*";
    }
    console.log(invertedLeftTriangle);
}