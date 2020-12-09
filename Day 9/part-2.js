fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n").map((x) => parseInt(x));

    const GOAL = 248131121;

    let candidates;
    let sum;
    for (let i = 0; i < entriesArray.length; i++) {
        const left = entriesArray.slice(i);

        sum = 0;
        candidates = [];
        for (const number of left) {
            sum += number;
            candidates.push(number);

            if (sum >= GOAL) break;
        }
        if (sum === GOAL) {
            break;
        }
    }

    console.log(candidates);

    const max = Math.max(...candidates);
    const min = Math.min(...candidates);
    console.log(`Max and min are: ${max} and ${min}`);
    console.log(`Sum is: ${max + min}`);
    console.log(`Sum of all is: ${candidates.reduce((a, b) => a + b)}`);
});