fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n").map((x) => parseInt(x));
    let answer;

    for (let i = 25; i < entriesArray.length; i++) {
        const element = entriesArray[i];
        const currentChunk = entriesArray.slice(i - 25, i);
        console.log(currentChunk, currentChunk.length);

        let hasFoundSum = false;
        for (const operator1 of currentChunk) {
            for (const operator2 of currentChunk) {
                if (operator1 + operator2 === element) {
                    hasFoundSum = true;
                    break;
                }
            }
            if (hasFoundSum) break;
        }

        if (!hasFoundSum) {
            answer = element;
            break;
        }
    }

    console.log(answer);
});