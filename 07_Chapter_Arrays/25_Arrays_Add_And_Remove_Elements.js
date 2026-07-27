let browsers = ["Chrome", "FireFox","Edge"];
console.log(`Browser:${browsers}`);

// push - adds element to the last
browsers.push("Safari");
console.log(`Browser:${browsers}`);

// pop - removes last element
browsers.pop();
console.log(`Browser:${browsers}`);

// unshift - add element at the beginning of array
browsers.unshift("DuckDuckGo");
console.log(`Browser:${browsers}`);

// shift - removes first element
browsers.shift();
console.log(`Browser:${browsers}`);

// splice - add/remove elements from any position
// splice(startIndex, deleteCount, addValue1?, addValue2?, ...)
// Accepts Negative Index Value
browsers.splice(-1,1,"Webkit","Chromium");
console.log(`Browser:${browsers}`);