fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    let passports = [];
    const REQUIREMENTS = {
        "byr": (value) => {
            return (value >= 1920 && value <= 2002);
        },
        "iyr": (value) => {
            return (value >= 2010 && value <= 2020);
        },
        "eyr": (value) => {
            return (value >= 2020 && value <= 2030);
        },
        "hgt": (height) => {
            const value = height.substr(0, height.length - 2);
            const unit = height.substr(height.length - 2);
            if (unit === 'cm') {
                return (value >= 150 && value <= 193);
            } else if (unit === "in") {
                return (value >= 59 && value <= 76);
            } else {
                return false;
            }
        },
        "hcl": (value) => {
            const colorRegex = /^#[0-9a-f]{6}$/;
            return colorRegex.test(value);
        },
        "ecl": (value) => {
            const options = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
            return options.includes(value);
        },
        "pid": (value) => {
            const idRegex = /[0-9]{9}/;
            return idRegex.test(value);
        },
    }

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
                let value = group.split(":")[1];
                passportParams.push({ param, value });
            }
        }

        let areValidValues = true;
        for (const info of passportParams) {
            const { param, value } = info;
            if (param === "cid") continue;
            if (!REQUIREMENTS[param](value)) areValidValues = false;
        }

        const areEnoughParams = passportParams.length === 8 || (passportParams.length === 7 && !passportParams.find(element => element.param === "cid"));
        if (areEnoughParams && areValidValues) {
            validPassports++;
        }
    }
    console.log(validPassports);
});