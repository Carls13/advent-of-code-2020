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
        const min = parseInt(numbersInfo.split("-")[0]);
        const max = parseInt(numbersInfo.split("-")[1]);

        const letterInfo = info[1].substr(0, 1);
        const password = info[2];

        const appeareances = password.split(letterInfo).length - 1;
        if (appeareances >= min && appeareances <= max) counter++;
    });

    console.log(counter);
});