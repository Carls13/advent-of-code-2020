fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const entriesArray = data.split("\r\n");
    const candidates = entriesArray.filter((element) => parseInt(element) < 1000);

    let firstTerm;
    let secondTerm;
    let thirdTerm;

    for (let candidate of candidates) {
        for (let otherCandidate of candidates) {
            if (candidate === otherCandidate) continue;
            for (let entry of entriesArray) {
                if (entry === candidate || entry === otherCandidate) continue;
                if (parseInt(candidate) + parseInt(entry) + parseInt(otherCandidate) === 2020) {
                    firstTerm = parseInt(candidate);
                    secondTerm = parseInt(entry);
                    thirdTerm = parseInt(otherCandidate);
                    break;
                }
            }
            if (firstTerm) break;
        }
        if (firstTerm) break;
    }


    console.log(`Numbers are: ${firstTerm}, ${secondTerm} and ${thirdTerm}`);
    console.log(`Product is: ${firstTerm * secondTerm * thirdTerm}`);
});