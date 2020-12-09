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

    let shinyGoldCounter = 0;
    let hasFoundShinyGold = false;

    const getBagsInside = (line) => {
        const info = line.split(" contain ");
        const bagsInInfo = info[1];
        const bagsInSentences = bagsInInfo.split(", ");

        const bagsIn = bagsInSentences.map((sentence) => {
            const words = sentence.split(" ");
            return words[1] + " " + words[2];
        })

        return bagsIn;
    }

    const searchShinyGoldBags = (bag) => {
        if (noOtherBagsIn.includes(bag)) return;
        if (bag === "shiny gold") {
            hasFoundShinyGold = true;
            return;
        }

        const currentLine = entriesArray.find((item) => {
            return item.includes(`${bag} bags contain`);
        });

        const bagsIn = getBagsInside(currentLine);
        for (const bag of bagsIn) {
            searchShinyGoldBags(bag);
        }
    }

    for (const line of entriesArray) {
        if (line.search("contain no other bags.") !== -1) continue;

        const info = line.split(" contain ");
        const currentBagInfo = info[0];
        const currentBagWords = currentBagInfo.split(" ");
        const currentBag = currentBagWords[0] + " " + currentBagWords[1];

        if (currentBag === "shiny gold") continue;

        const bagsIn = getBagsInside(line);
        hasFoundShinyGold = false;
        for (const bag of bagsIn) {
            console.log(hasFoundShinyGold);
            searchShinyGoldBags(bag);
        }
        if (hasFoundShinyGold) shinyGoldCounter++;
    }
    console.log(shinyGoldCounter);
});