// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill');
const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');

// Definiere die Städte und die URL für die Anfragen
let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current";

// Funktion zur Durchführung der Anfragen
async function anfragen(currenturl) {
    // Erstelle ein Array von Promises für jede Stadt
    const promises = cities.map(async city => {
        const url = `${currenturl}${city}`;

        try {
            // Führe eine HTTP-Anfrage durch und warte auf die Antwort
            const anfrage = await fetch(url);
            // Parste die Antwort als JSON
            return await anfrage.json();
        } catch (e) {
            console.error(e);
            return []; // Falls ein Fehler auftritt, gib ein leeres Array zurück
        }
    });

    // Warte auf alle Promises, die von `map` zurückgegeben wurden
    return Promise.all(promises);
}

// Führe die Anfragen durch und verarbeite die Ergebnisse
anfragen("https://aareguru.existenz.ch/v2018/current?city=").then(results => {
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

// Selektiere die Button-Elemente für jede Stadt
const bernButton = document.querySelector('#bernBt');
const brienzButton = document.querySelector('#brienzBt');
const interlakenButton = document.querySelector('#interlakenBt');
const thunButton = document.querySelector('#thunBt');
const hagneckButton = document.querySelector('#hagneckBt');
const bielButton = document.querySelector('#bielBt');
const oltenButton = document.querySelector('#oltenBt');
const bruggButton = document.querySelector('#bruggBt');

// Füge den Event-Listener für den Bern-Button hinzu
bernButton.addEventListener('click', () => {
    updateTemperature('bern');
});

// Füge den Event-Listener für den Brienz-Button hinzu
brienzButton.addEventListener('click', () => {
    updateTemperature('brienz');
});

// Füge den Event-Listener für den Interlaken-Button hinzu
interlakenButton.addEventListener('click', () => {
    updateTemperature('interlaken');
});

// Füge den Event-Listener für den Thun-Button hinzu
thunButton.addEventListener('click', () => {
    updateTemperature('thun');
});

// Füge den Event-Listener für den Hagneck-Button hinzu
hagneckButton.addEventListener('click', () => {
    updateTemperature('hagneck');
});

// Füge den Event-Listener für den Biel-Button hinzu
bielButton.addEventListener('click', () => {
    updateTemperature('biel');
});

// Füge den Event-Listener für den Olten-Button hinzu
oltenButton.addEventListener('click', () => {
    updateTemperature('olten');
});

// Füge den Event-Listener für den Brugg-Button hinzu
bruggButton.addEventListener('click', () => {
    updateTemperature('brugg');
});

// Funktion zur Aktualisierung der Temperatur für eine bestimmte Stadt
function updateTemperature(city) {
    anfragen(`https://aareguru.existenz.ch/v2018/current?city=${city}`)
    .then(results => {
        if(results.length > 0) {
            const temperature = results[0].aare.temperature;
            thermometerFill.style.height = `${temperature}vh`;
        } else {
            console.error(`Keine Daten für ${city} gefunden`);
        }
    })
    .catch(error => {
        console.error(`Fehler bei der Anfrage für ${city}:`, error);
    });
}
