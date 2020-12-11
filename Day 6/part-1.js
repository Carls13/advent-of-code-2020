fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    let groups = [];

    let start = 0;
    let end = 0;
    while (true) {
        const whiteSpaceIndex = entriesArray.findIndex((element, i) => (element.length === 0 && i > end));
        if (whiteSpaceIndex === -1) {
            groups.push(entriesArray.slice(end + 1));
            break
        };
        end = whiteSpaceIndex;
        groups.push(entriesArray.slice(start, end));
        start = end + 1;
    }

    let questionsCounter = 0;
    for (const group of groups) {
        let groupsLetters = [];
        for (const line of group) {
            const letters = line.split("");
            letters.forEach(element => {
                groupsLetters.push(element);
            });
        }
        groupsLetters = [...new Set(groupsLetters)];
        questionsCounter += groupsLetters.length
    }
    console.log(questionsCounter);
});