// Here score and status is default parameters
// if argyment is not passed in function call it will take deafult value

function printScore(playerName, score=75, status="Not Out"){
    console.log(`Player name: ${playerName}`);
    console.log(`Score: ${score}`);
    console.log(`Status: ${status}`);
}

printScore("Jagadesh");
printScore("Ragavan",72,"Out");
printScore();// player name undefined