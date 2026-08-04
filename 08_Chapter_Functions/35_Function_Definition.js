// tradition declartion

function getBrowserName(browserName){
    console.log(`BrowserName: ${browserName}`);
}
getBrowserName("Chrome");

// Function Expression

const getBrowserNameExp = function(browserName){
    console.log(`BrowserName Exp : ${browserName}`);   
}
getBrowserNameExp("FireFox");

// Arrow Function

const getArrowBrowser = (browserName)=>{
    console.log(`Arrow Broswer name: ${browserName}`);
}
getArrowBrowser("Edge");