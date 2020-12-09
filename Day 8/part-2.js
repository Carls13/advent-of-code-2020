fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    const initializeArray = () => {
        return entriesArray.map((entry) => {
            return {
                word: entry.split(" ")[0],
                value: entry.split(" ")[1],
                doneBefore: false
            }
        })
    }

    let instructions = initializeArray();

    let hasFinished = false;
    let accumulator = 0;
    let indexCounter = 0;

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];

        if (instruction.word === "acc") continue;
        instructions[i].word = instructions[i].word === "jmp" ? "nop" : "jmp";
        indexCounter = 0;
        accumulator = 0;
        while (true) {
            if (indexCounter === instructions.length) {
                hasFinished = true;
                break;
            }
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

        if (hasFinished) break;

        instructions = initializeArray();
    }

    console.log(accumulator);
});