// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill');
const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');
const closeOverlay = document.querySelector('#close-overlay');

// Definiere die Städte und die URL für die Anfragen
let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current";

// Funktion zur Durchführung der Anfragen
async function anfragen(url) {
    try {
        
        const anfrage = await fetch(url);

        return await anfrage.json();
    } catch (e) {
        console.error(e);
        return []; 
    }
}

// THERMOMETER
// Funktion zur Aktualisierung der Temperatur für eine bestimmte Stadt
function updateTemperature(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

    anfragen(url).then(results => {
        console.log(results.aare.temperature);
         thermometerFill.innerHTML ='';
            const temperature = results.aare.temperature;
            thermometerFill.innerHTML += `<div> ${temperature} </div>`;
            let thermoLiquid = temperature * 2;
            thermometerFill.style.height = `${thermoLiquid}%`;
            thermometerFill.style.backgroundColor = "red"; 

    }).catch(error => {
        console.error(`Fehler bei der Anfrage für ${city}:`, error);
    });
}

// // Selektiere die Button-Elemente für jede Stadt
// const buttons = document.querySelectorAll('.city-button');

// // Füge für jeden Button den Event-Listener hinzu
// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         const selectedCity = button.dataset.city;
//         updateTemperature(selectedCity);
//     });
// });


    
// SCHWEIZERKARTE MIT PUNKTEN
const map = document.querySelectorAll('#chmap > *');
map.forEach((point) => {
    point.addEventListener('click', (event) => {
        const city = point.dataset.city;
        showOverlay(city);
        updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
    });
});

function showOverlay(place) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('overlay-title').innerText = place;
    document.getElementById('overlay-place').innerText = place;

    // Füge das Update der Temperatur hinzu
    updateTemperature(place);  // Ruft die Funktion auf, die die Temperatur aktualisiert
}

closeOverlay.addEventListener('click', hideOverlay);

function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

  // in API Daten anfragen
// anfragen("https://aareguru.existenz.ch/v2018/current?city=").then(results => { 
//     console.log(results);

// // Daten anzeigen in Kachel
//     results.forEach(result => {

//         let location = result.aare.location;
//         let temperature = result.aare.temperature;
//         let temperature_text = result.aare.temperature_text;
//         let tt = result.weather.current.tt;
//         app.innerHTML += `<article class="infoBox">
//         <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
//         <h3 class="infoBoxTitel">${location}</h3>
//         <dl class="infoBoxTabelle">
        
//             <dt>Wasser in °C</dt>
//             <dd>${temperature}</dd>
//             <dt>Luft in °C</dt>
//             <dd>${tt}</dd>
//             <dt>Bade?</dt>
//             <dd>${temperature_text}</dd>
//             </dl>
//         </div>
//         </article>`;

//     });
// });

anfragen("https://aareguru.existenz.ch/v2018/current").then(results => {
    console.log(results);

    results.forEach(result => {
        let location = result.aare.location;
        let temperature = result.aare.temperature;
        let temperature_text = result.aare.temperature_text;
        let tt = result.weather.current.tt;

        app.innerHTML += `<article class="infoBox">
            <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
            <h3 class="infoBoxTitel">${location}</h3>
            <dl class="infoBoxTabelle">
                <dt>Wasser in °C</dt>
                <dd>${temperature}</dd>
                <dt>Luft in °C</dt>
                <dd>${tt}</dd>
                <dt>Bade?</dt>
                <dd>${temperature_text}</dd>
            </dl>
        </article>`;
    });
});