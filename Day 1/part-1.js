fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const entriesArray = data.split("\r\n");
    const candidates = entriesArray.filter((element) => parseInt(element) < 1000);

    let firstTerm;
    let secondTerm;

    for (let candidate of candidates) {
        for (let entry of entriesArray) {
            if (parseInt(candidate) + parseInt(entry) === 2020) {
                firstTerm = parseInt(candidate);
                secondTerm = parseInt(entry);
                break;
            }
        }
        if (firstTerm) break;
    }


    console.log(`Numbers are: ${firstTerm} and ${secondTerm}`);
    console.log(`Product is: ${firstTerm * secondTerm}`);
});