fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const entriesArray = data.split("\r\n");
    console.log(entriesArray[0].length);
    let counter = 0;
    let treesCounter = 0;

    for (let element of entriesArray) {
        const items = element.split("");
        if (items[counter] === "#") treesCounter++;
        counter += 3;
        if (counter > 30) counter -= 31;
    }
    console.log(treesCounter);
});