const aareApp = document.querySelector('#aare-app');
const results = document.querySelector('#aare-app');


async function fetchDataForCities() {
    const cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
    const baseUrl = "https://aareguru.existenz.ch/v2018/current?city=";

    const promises = cities.map(city => {
        const url = `${baseUrl}${city}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(`Fehler beim Abrufen der Daten für ${city}:`, error);
            });
    });

    const results = await Promise.all(promises);
    results.forEach(result => {
        createItem(result);
    });
}

fetchDataForCities();

function createItem(result) {
    let item = document.createElement('div');
    item.classList.add('stadtdaten');
    item.innerHTML = `<h2>${result.location}</h2> 
    <p>Aare-Temperatur: ${result.temperature} °C</p>`;
    
    aareApp.appendChild(item);
}

// ChatGPT:

init();

async function init() {
    let cocktails = await fetchData(url);
    console.log(cocktails.drinks[0].strDrink);

    cocktails.drinks.forEach(cocktail => {
     createItem(cocktail);
    });
}
// Definiert eine asynchrone Funktion, um Daten für eine Liste von Städten zu holen
async function fetchDataForCities() {
    // Liste der Städte, für die die API abgefragt werden soll
    const cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
    // Die Basis-URL der API, die zur Anforderung verwendet wird
    const baseUrl = "https://aareguru.existenz.ch/v2018/current?city=";

    // Erstellt ein Array von Promises, indem die fetch Funktion für jede Stadt aufgerufen wird
    const promises = cities.map(city => {
        // Erstellt die vollständige URL für die API-Anfrage durch Hinzufügen des Stadtnamens zur Basis-URL
        const url = `${baseUrl}${city}`;
        // Startet den API-Aufruf und gibt ein Promise zurück
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();  // Konvertiert die Antwort in JSON, wenn der Aufruf erfolgreich war
            })
            .then(data => {
                console.log(`Daten für ${city}:`, data);  // Loggt die Daten für jede Stadt
                return data;  // Gibt die Daten weiter, um sie später verwenden zu können
            })
            .catch(error => {
                console.error(`Fehler beim Abrufen der Daten für ${city}:`, error);  // Loggt Fehler, falls der API-Aufruf fehlschlägt
            });
    });

    // Wartet auf die Fertigstellung aller Promises und loggt alle Ergebnisse
    const results = await Promise.all(promises);
    createItem(results);
    console.log("Alle abgerufenen Daten:", results);
}

// Ruft die Funktion auf, um den Abruf der Daten zu starten
fetchDataForCities();


function createItem(results) {
    let item = document.createElement('div');
    item.classList.add('stadtdaten');
    item.innerHTML = `<h2>${results.aare.location}</h2> 
    <p>${results.aare.temperature}</p>`;
    
    aareApp.appendChild(item);
}






