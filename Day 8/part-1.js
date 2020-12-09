fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    const instructions = entriesArray.map((entry) => {
        return {
            word: entry.split(" ")[0],
            value: entry.split(" ")[1],
            doneBefore: false
        }
    })

    let indexCounter = 0;
    let accumulator = 0;
    while (true) {
        console.log(instructions[indexCounter]);
        const { word, value, doneBefore } = instructions[indexCounter];
        if (doneBefore) break;
        instructions[indexCounter].doneBefore = true;
        if (word === "nop") {
            indexCounter++;
            continue;
        }
        if (word === "acc") {
            indexCounter++;
            accumulator += parseInt(value);
            continue;
        }
        if (word === "jmp") {
            indexCounter += parseInt(value);
            continue;
        }
    }

    console.log(accumulator);

});