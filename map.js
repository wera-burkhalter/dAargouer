// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill'); // Thermometer-Füllung
const app = document.querySelector("#aare-app"); // Hauptbereich der App
const thermometerZahl = document.querySelector('#thermometerZahl'); // Temperaturanzeige im Thermometer

// Definiere die Städte und die URL für die Anfragen
let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
let currenturl = "https://aareguru.existenz.ch/v2018/current"; // Basis-URL für die Anfragen

// Funktion zur Durchführung der Anfragen
async function anfragen(url) {
    try {
        const anfrage = await fetch(url); // API-Anfrage senden
        return await anfrage.json(); // Warte auf die Antwort und konvertiere sie in JSON
    } catch (e) {
        console.error(e); // Konsolenausgabe des Fehlers, falls die Anfrage fehlschlägt
        return [];
    }
}

// THERMOMETER
// Funktion zur Aktualisierung der Temperatur für eine bestimmte Stadt
function updateTemperature(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`; // URL für die Anfrage

    // Anfrage senden und die Temperatur aktualisieren
    anfragen(url).then(results => {
        console.log(results.aare.temperature); // Konsolenausgabe der Temperatur
        thermometerFill.innerHTML = ''; // Themometer-Füllung leeren
        thermometerZahl.innerHTML = ''; // Temperaturanzeige leeren
        const temperature = results.aare.temperature; // Temperatur aus den Ergebnissen holen
        thermometerZahl.innerHTML += `<div> ${temperature} </div>`; // Temperaturanzeige aktualisieren
        let thermoLiquid = temperature * 2.5; // Berechne die Höhe der Thermometer-Füllung basierend auf der Temperatur
        thermometerFill.style.height = `${thermoLiquid}%`; // Aktualisiere die Höhe der Thermometer-Füllung
        
        // Farbverlauf für die Thermometer-Füllung basierend auf der Temperatur ändern
        if (temperature < 10) {
            thermometerFill.style.backgroundImage = "linear-gradient(to top, #3a55a5, #8dd7f2)";
        }
        else if (temperature < 15) {    
            thermometerFill.style.backgroundImage = "linear-gradient(to top, #3a55a5, #8dd7f2, #4db748)";
        }
        else if (temperature < 20) {
            thermometerFill.style.backgroundImage = "linear-gradient(to top, #3a55a5, #8dd7f2, #4db748, #88c544)";
        }
        else if (temperature < 25) {
            thermometerFill.style.backgroundImage = "linear-gradient(to top, #3a55a5, #8dd7f2, #4db748, #88c544, #dbe138)";
        }
        else {
            thermometerFill.style.backgroundImage = "linear-gradient(to top, #3a55a5, #8dd7f2, #4db748, #88c544, #dbe138, #d37728)";
        }

    }).catch(error => {
        console.error(`Fehler bei der Anfrage für ${city}:`, error);
    });
}

// INFOBOX
//Funktion zur Anzeige der InfoBox für eine bestimmte Stadt
function infoBox(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`; // URL für die Anfrage

    // Anfrage senden und die InfoBox aktualisieren
    anfragen(url).then(results => {
        console.log(results.aare.location); // Standort in der Konsole ausgeben
        app.innerHTML = ''; // vorherige InfoBox leeren
        let location = results.aare.location; //Standort aus den Ergebnissen holen
        let temperature = results.aare.temperature; // Temperatur aus den Ergebnissen holen
        let temperature_text = results.aare.temperature_text; // Temperaturtext aus den Ergebnissen holen
        let tt = results.weather.current.tt; // aktuelle Lufttemperatur aus den Ergebnissen holen

        // InfoBox-Inhalt aktualisieren
        app.innerHTML += `
            <article class="infoBox">
                <button class="close-btn" onclick="closeInfoBox()">✖</button>
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
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Funktion zum Schliessen der InfoBox
function closeInfoBox() {
    app.innerHTML = ''; // Inhalt der InfoBox leeren
}

// Funktion zur Anpassung der Kartenkoordinaten entsprechend dem Skalierungsfaktor
function adjustMapCoords(scaleFactor) {
    const areas = document.querySelectorAll('map[name="chmap"] area'); // Alle Kartenbereiche selektieren
    areas.forEach(area => {
        let coords = area.getAttribute('coords').split(',').map(Number); // Koordinaten des Bereichs holen und in Zahlen umwandeln
        let scaledCoords = coords.map(coord => Math.round(coord * scaleFactor)); // Koordinaten basierend auf dem Skalierungsfaktor anpassen
        area.setAttribute('coords', scaledCoords.join(',')); // Angepasste Koordinaten setzen
    });
}

// Funktion zur Anpassung der Bootkoordinaten basierend auf der Kartenkoordinaten
function adjustBoatPosition() {
    const mapWidth = document.getElementById('schweizerKarte').offsetWidth; // Breite der Karte holen
    const mapHeight = document.getElementById('schweizerKarte').offsetHeight; // Höhe der Karte holen
    const boat = document.getElementById('boat'); // Boot-Element selektieren

    const xOffset = mapWidth * 0.48; // X-Positionierung: 48% der Kartenbreite
    const yOffset = mapHeight * 0.52; // Y-Positionierung: 52% der Kartenhöhe

    boat.style.left = `${xOffset}px`; // Linke Position des Bootes setzen
    boat.style.top = `${yOffset}px`; // Obere Position des Bootes setzen
}

// Initiale Anpassung der Bootposition und bei Größenänderung des Fensters
document.addEventListener('DOMContentLoaded', () => {
    adjustBoatPosition(); // initiale Anpassung
    window.addEventListener('resize', adjustBoatPosition); // Anpassung bei Grössenänderung des Fensters
    const originalWidth = 800; // Originalbreite der Karte
    const container = document.getElementById('containerSchweizerkarte'); // Kartencontainer
    const newWidth = container.offsetWidth; // Neue Breite der Karte
    const scaleFactor = newWidth / originalWidth; // Skalierungsfaktor basierend auf der neuen Breite berechnen

    adjustMapCoords(scaleFactor); // initiale Kartenkoordinaten anpassen

    window.addEventListener('resize', () => {
        const newScaleFactor = container.offsetWidth / originalWidth; // neuer Skalierungsfaktor basierend auf der neuen Breite berechnen
        adjustMapCoords(newScaleFactor); // Anpassung der Kartenkoordinaten bei Grössenänderung
    });
});

// Funktion zum Bewegen des Bootes zu einem bestimmten Punkt
function moveBoatTo(point) {
    const [x, y] = point.coords.split(',').map(Number); // Koordinaten des Punktes holen und in Zahlen umwandeln
    const boatWidth = boat.offsetWidth; // Breite des Bootes holen
    const boatHeight = boat.offsetHeight; // Höhe des Bootes holen
    const offsetX = boatWidth / 2; // horizontaler Versatz für die Zentrierung
    const offsetY = boatHeight / 2; // vertikaler Versatz für die Zentrierung
    boat.style.left = `${x - offsetX}px`; // linke Position des Bootes setzen
    boat.style.top = `${y - offsetY}px`; // obere Position des Bootes setzen
}


// SCHWEIZERKARTE MIT PUNKTEN
const map = document.querySelectorAll('#chmap area'); // Alle Punkte auf der Karte selektieren
map.forEach((point) => {
    point.addEventListener('click', (event) => {
        const city = point.dataset.city; // Stadt aus dem Datensatz des Punktes holen
        updateTemperature(city); // Temperatur für die Stadt aktualisieren
        infoBox(city); // Informationen zur Stadt anzeigen
        moveBoatTo(point); // Boot zum Punkt bewegen
    });
});


// BOOT AUF KARTE
const boat = document.createElement('img'); // Boot-Element erstellen
boat.src = 'Images/AareBootBlau.png'; // Bild des Bootes setzen
boat.id = 'boat'; // ID des Bootes setzen
boat.style.position = 'absolute'; // Positionierung des Bootes auf absolut setzen
document.getElementById('containerSchweizerkarte').appendChild(boat); // Boot zum Container hinzufügen

// Scroll-Animation beim Klick auf den Button
document.getElementById('abBoot').addEventListener('click', function() { 
    this.classList.add('animate'); // Animation hinzufügen
    const targetElement = document.getElementById('schweizerKarte'); // Ziel-Element selektieren
    if (targetElement) {
        scrollToElement(targetElement, 5000); // Scrollen zum Ziel-Element über 5 Sekunden
    }
});

// Funktion zum sanften Scrollen zu einem bestimmten Element
function scrollToElement(element, duration) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 170; // Zielposition berechnen
    const startPosition = window.scrollY; // Startposition holen
    const distance = targetPosition - startPosition; // Distanz zum Ziel berechnen
    const startTime = performance.now(); // Startzeit holen

    // Funktion für einen sanften Übergang
    function easeInOutQuad(time, start, change, duration) {
        time /= duration / 2;
        if (time < 1) return change / 2 * time * time + start;
        time--;
        return -change / 2 * (time * (time - 2) - 1) + start;
    }

    // Funktion für die Scroll-Schleife
    function scrollLoop(currentTime) {
        const elapsedTime = currentTime - startTime; // vergangene Zeit berechnen
        window.scrollTo(0, easeInOutQuad(elapsedTime, startPosition, distance, duration)); // Scroll-Position anpassen
        if (elapsedTime < duration) {
            requestAnimationFrame(scrollLoop); // weiter scrollen, wenn die Zeit noch nicht abgelaufen ist
        } else {
            window.scrollTo(0, targetPosition); // Scroll-Position auf das Ziel setzen
        }
    }

    requestAnimationFrame(scrollLoop); // Start der Scroll-Schleife
}
