let bestellurl = "https://aareguru.existenz.ch/v2018/cities";

async function bestellen (bestellurl) {
    try {
    const bestellung = await fetch(bestellurl);
    return await bestellung.json();
    } catch (e) {
    console.error(e);
    return [];
    }

    }

    console.log(bestellen(bestellurl));


    let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
    let currenturl = "https://aareguru.existenz.ch/v2018/current";

    async function anfragen(currenturl) {
        const promises = cities.map(async city => {  // Füge das Schlüsselwort async hinzu, um innerhalb von map await verwenden zu können
            const url = ${currenturl}${city};
    
            try {
                const anfrage = await fetch(url);  // Verwende url anstelle von currenturl
                return await anfrage.json();
            } catch (e) {
                console.error(e);
                return [];
            }
        });
    
        return Promise.all(promises);  // Warte auf alle Promises, die von map zurückgegeben wurden
    }
    
    // Zum Aufrufen der Funktion
    anfragen("https://aareguru.existenz.ch/v2018/current?city=").then(results => { // Was macht das?
        console.log(results);
    });