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

    function intersect(a, b) {
        var setB = new Set(b);
        return [...new Set(a)].filter(x => setB.has(x));
    }

    let questionsCounter = 0;
    for (const group of groups) {
        let groupsLetters = [];
        for (const line of group) {
            const letters = line.split("");
            groupsLetters.push(letters);
        }
        let common = [];
        if (groupsLetters.length === 1) {
            common = [...new Set(groupsLetters[0])];
            console.log({ groupsLetters, common })
        } else {
            for (let i = 0; i < groupsLetters.length; i++) {
                if (i === 0) continue;
                const current = groupsLetters[i];
                const prev = common.length > 0 ? common : groupsLetters[i - 1];
                common = intersect(current, prev);
            }
        }
        questionsCounter += common.length;
    }
    console.log(questionsCounter);
});