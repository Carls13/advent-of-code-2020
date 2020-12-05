fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const entriesArray = data.split("\r\n");

    const MOVING_PARAMS = [
        {
            horizontal: 1,
            vertical: 1
        },
        {
            horizontal: 3,
            vertical: 1
        },
        {
            horizontal: 5,
            vertical: 1
        },
        {
            horizontal: 7,
            vertical: 1
        },
        {
            horizontal: 1,
            vertical: 2
        },
    ];

    let results = [];

    for (let index = 0; index < MOVING_PARAMS.length; index++) {
        const currentParams = MOVING_PARAMS[index];
        const { horizontal, vertical } = currentParams;

        let treesCounter = 0;
        let counter = 0;

        for (let j = 0; j < entriesArray.length; j += vertical) {
            const element = entriesArray[j];
            const items = element.split("");
            if (items[counter] === "#") treesCounter++;
            counter += horizontal;
            if (counter > 30) counter -= 31;
        }
        results.push(treesCounter);
    }

    console.log(results);
    const totalResult = results.reduce((prev, result) => {
        return prev * result;
    }, 1);
    console.log(totalResult);
});