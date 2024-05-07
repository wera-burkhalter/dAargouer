const app = document.querySelector("#aare-app");
// let bestellurl = "https://aareguru.existenz.ch/v2018/cities";

// async function bestellen(bestellurl) {
//     try {
//         const bestellung = await fetch(bestellurl);
//         return await bestellung.json();
//     } catch (e) {
//         console.error(e);
//         return [];
//     }

// }

// console.log(bestellen(bestellurl));
// console.log(bestellen(bestellurl).promise.Array[0].aare);



let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current";

async function anfragen(currenturl) {
    const promises = cities.map(async city => {  // Füge das Schlüsselwort `async` hinzu, um innerhalb von `map` `await` verwenden zu können
        const url = `${currenturl}${city}`;

        try {
            const anfrage = await fetch(url);  // Verwende `url` anstelle von `currenturl`
            return await anfrage.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    return Promise.all(promises);  // Warte auf alle Promises, die von `map` zurückgegeben wurden
}

// Zum Aufrufen der Funktion
anfragen("https://aareguru.existenz.ch/v2018/current?city=").then(results => { // Was macht das?
    console.log(results);

    // console.log(results[0].aare.location);
    // console.log(results[0].aare.temperature);

    results.forEach(result => {
        // console.log(result.aare.location);
        // console.log(result.aare.temperature);
        // console.log(result.aare.temperature_text);
        let location = result.aare.location;
        let temperature = result.aare.temperature;
        let temperature_text = result.aare.temperature_text;
        let tt = result.weather.current.tt;
        app.innerHTML += `<article class="infoBox">
        <img src="Images/Aarau.jpg" alt="Aarau" class="infoBoxImg">
        <h3 class="infoBoxTitel">${location}</h3>
        <dl class="infoBoxTabelle">
            <dt>wassertemparatur</dt>
            <dd>${temperature}</dd>
            <dt>lufttemparatur</dt>
            <dd>${tt}</dd>
            <dt>badeempfehlung</dt>
            <dd>${temperature_text}</dd>
        </div>
   </article>`;

    });
});