fs = require('fs')
fs.readFile('./entries.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    let entriesArray = data.split("\r\n");

    let noOtherBagsIn = [];
    entriesArray.forEach((line) => {
        const index = line.search("contain no other bags.")
        if (index !== -1) {
            const wordsArray = line.split(" ");
            noOtherBagsIn.push(wordsArray[0] + " " + wordsArray[1]);
        }
    });

    let bagsCounter = 0;

    const getBagsInside = (line) => {
        const info = line.split(" contain ");
        const bagsInInfo = info[1];
        const bagsInSentences = bagsInInfo.split(", ");

        const bagsIn = bagsInSentences.map((sentence) => {
            const words = sentence.split(" ");
            const amount = parseInt(words[0]);
            const bag = words[1] + " " + words[2]
            return { amount, bag };
        })

        return bagsIn;
    }

    const sumBag = (bagInfo) => {
        const { bag } = bagInfo;

        bagsCounter++;

        if (noOtherBagsIn.includes(bag)) return;

        const bagLine = entriesArray.find((item) => {
            return item.includes(`${bag} bags contain`);
        });

        const bagsIn = getBagsInside(bagLine);
        bagsIn.forEach((item) => {
            for (let j = 0; j < item.amount; j++) {
                sumBag(item);
            }
        })
    }

    const goldBagsLine = entriesArray.find((item) => {
        return item.includes('shiny gold bags contain');
    });

    const bags = getBagsInside(goldBagsLine);
    bags.forEach((bag) => {
        const { amount } = bag;
        for (let j = 0; j < amount; j++) {
            sumBag(bag);
        }
    })

    console.log(bagsCounter);
});