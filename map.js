// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill');
const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');

// Definiere die Städte und die URL für die Anfragen
let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current";

// Funktion zur Durchführung der Anfragen
async function anfragen(url) {
    try {
        // Führe eine HTTP-Anfrage durch und warte auf die Antwort
        const anfrage = await fetch(url);
        // Parste die Antwort als JSON
        return await anfrage.json();
    } catch (e) {
        console.error(e);
        return []; // Falls ein Fehler auftritt, gib ein leeres Array zurück
    }
}

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

// Selektiere die Button-Elemente für jede Stadt
const buttons = document.querySelectorAll('.city-button');

// Füge für jeden Button den Event-Listener hinzu
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCity = button.dataset.city;
        updateTemperature(selectedCity);
    });
});

// Führe die Anfragen durch und verarbeite die Ergebnisse
anfragen(`https://aareguru.existenz.ch/v2018/current?city=${dataset.city}`) // Füge die URL für die Anfrage hinzu}`)
    .then(results => {
        console.log(results); // Gib die Ergebnisse in der Konsole aus

        // Verarbeite jedes Ergebnis
        results.forEach(result => {
            let ortschaft = result.aare.location;
            let temperature = result.aare.temperature;

            // Ändere das Aussehen des Thermometers basierend auf der Temperatur
            thermometerFill.style.height = `${temperature}vh`;
            thermometerFill.style.backgroundColor = "red";

            // Füge hier die Logik ein, um die Daten anzuzeigen oder zu verwenden
            console.log(ortschaft);
            console.log(temperature);
        });
    }).catch(error => {
        console.error("Fehler bei der Anfrage:", error);
    });


    