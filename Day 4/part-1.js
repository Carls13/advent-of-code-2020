fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    let passports = [];

    let start = 0;
    let end = 0;
    while (true) {
        const whiteSpaceIndex = entriesArray.findIndex((element, i) => (element.length === 0 && i > end));
        if (whiteSpaceIndex === -1) {
            passports.push(entriesArray.slice(end + 1));
            break
        };
        end = whiteSpaceIndex;
        passports.push(entriesArray.slice(start, end));
        start = end + 1;
    }

    let validPassports = 0;

    for (const passport of passports) {
        let passportParams = [];
        for (const line of passport) {
            const info = line.split(" ");
            for (const group of info) {
                let param = group.split(":")[0];
                passportParams.push(param);
            }
        }
        const isValid = passportParams.length === 8 || (passportParams.length === 7 && !passportParams.find(element => element === "cid"));
        if (isValid) {
            validPassports++;
        }
    }
    console.log(validPassports);
});