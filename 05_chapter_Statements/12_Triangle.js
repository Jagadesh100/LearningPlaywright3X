const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()));
    });
}

async function main() {
    const side1 = Number(await askQuestion('Enter side 1: '));
    const side2 = Number(await askQuestion('Enter side 2: '));
    const side3 = Number(await askQuestion('Enter side 3: '));

    if (side1 === side2 && side1 === side3) {
        console.log('Equilateral');
    } else if (side1 === side2 || side2 === side3 || side3 === side1) {
        console.log('Isosceles');
    } else {
        console.log('Scalene');
    }

    rl.close();
}

main();