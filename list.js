const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');

// API Verlinkung
let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current";

async function anfragen(currenturl) {
    const promises = cities.map(async city => {  
        const url = `${currenturl}${city}`;

        try {
            const anfrage = await fetch(url);  
            return await anfrage.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    return Promise.all(promises); 
}




// in API Daten anfragen
anfragen("https://aareguru.existenz.ch/v2018/current?city=").then(results => { 
    console.log(results);

// Daten anzeigen in Kachel
    results.forEach(result => {

        let location = result.aare.location;
        let temperature = result.aare.temperature;
        let temperature_text = result.aare.temperature_text;
        let tt = result.weather.current.tt;
        app.innerHTML += `<article class="infoBox">
        <img src="Images/Locations/${location}.jpg" alt="${location}" class="infoBoxImg">
        <h3 class="infoBoxTitel">${location}</h3>
        <dl class="infoBoxTabelle">
        
            <dt>Wasser</dt>
            <dd>${temperature}°C</dd>
            <dt>Luft</dt>
            <dd>${tt}°C</dd>
            <dt>Bade?</dt>
            <dd>${temperature_text}</dd>
            </dl>
        </div>
        </article>`;

    });
});


// Suchfunktion
async function filterLocations() {
    const input = document.getElementById('search-input');
    const filterText = input.value.toLowerCase();

    const results = await anfragen("https://aareguru.existenz.ch/v2018/current?city=");

    const filteredResults = results.filter(result => {
        return result.aare.location.toLowerCase().includes(filterText);
    });

    displayResults(filteredResults);
}

// Suchanfrage anzeigen
function displayResults(results) {
    const app = document.querySelector("#aare-app");
    app.innerHTML = ''; // vorherige Ergebnisse löschen

    results.forEach(result => {
        let location = result.aare.location;
        let temperature = result.aare.temperature;
        let temperature_text = result.aare.temperature_text;
        let tt = result.weather.current.tt;

        app.innerHTML += `<article class="infoBox">
            <img src="Images/Locations/${location}.jpg" alt="${location}" class="infoBoxImg">
            <h3 class="infoBoxTitel">${location}</h3>
            <dl class="infoBoxTabelle">
                <dt>Wassertemperatur</dt>
                <dd>${temperature}°C</dd>
                <dt>Lufttemperatur</dt>
                <dd>${tt}°C</dd>
                <dt>Badeempfehlung</dt>
                <dd>${temperature_text}</dd>
            </article>`;
    });
}
