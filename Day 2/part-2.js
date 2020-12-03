fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const entriesArray = data.split("\r\n");
    let counter = 0;
    entriesArray.forEach((element) => {
        const info = element.split(" ");

        const numbersInfo = info[0];
        const position1 = parseInt(numbersInfo.split("-")[0]);
        const position2 = parseInt(numbersInfo.split("-")[1]);

        const letterInfo = info[1].substr(0, 1);
        const password = info[2];

        const passwordChars = password.split("");

        if (passwordChars[position1 - 1] === letterInfo ^ passwordChars[position2 - 1] === letterInfo) counter++;
    });

    console.log(counter);
});