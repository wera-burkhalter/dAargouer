// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill');
const app = document.querySelector("#aare-app");
const thermometerZahl = document.querySelector('#thermometerZahl');

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
        thermometerFill.innerHTML = '';
        thermometerZahl.innerHTML = '';
        const temperature = results.aare.temperature;
        thermometerZahl.innerHTML += `<div> ${temperature} </div>`;
        let thermoLiquid = temperature * 2.5;
        thermometerFill.style.height = `${thermoLiquid}%`;
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
function infoBox(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

    anfragen(url).then(results => {
        console.log(results.aare.location);
        app.innerHTML = ''; // Clear previous infoBox
        let location = results.aare.location;
        let temperature = results.aare.temperature;
        let temperature_text = results.aare.temperature_text;
        let tt = results.weather.current.tt;

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

// Funktion zum Schließen der InfoBox
function closeInfoBox() {
    app.innerHTML = ''; // Clear the infoBox content
}

// Funktion zur Anpassung der Kartenkoordinaten entsprechend dem Skalierungsfaktor
function adjustMapCoords(scaleFactor) {
    const areas = document.querySelectorAll('map[name="chmap"] area');
    areas.forEach(area => {
        let coords = area.getAttribute('coords').split(',').map(Number);
        let scaledCoords = coords.map(coord => Math.round(coord * scaleFactor));
        area.setAttribute('coords', scaledCoords.join(','));
    });
}

// Funktion zur Anpassung der Bootkoordinaten basierend auf der Kartenkoordinaten
function adjustBoatPosition() {
    const mapWidth = document.getElementById('schweizerKarte').offsetWidth;
    const mapHeight = document.getElementById('schweizerKarte').offsetHeight;
    const boat = document.getElementById('boat');

    const xOffset = mapWidth * 0.48; // Beispielpositionierung: 50% der Kartenbreite
    const yOffset = mapHeight * 0.52; // Beispielpositionierung: 40% der Kartenhöhe

    boat.style.left = `${xOffset}px`;
    boat.style.top = `${yOffset}px`;
}

// Initiale Anpassung der Bootposition und bei Größenänderung des Fensters
document.addEventListener('DOMContentLoaded', () => {
    adjustBoatPosition();
    window.addEventListener('resize', adjustBoatPosition);
    const originalWidth = 800; // Original width of the map
    const container = document.getElementById('containerSchweizerkarte');
    const newWidth = container.offsetWidth; // New width of the map
    const scaleFactor = newWidth / originalWidth; // Scale factor based on the new width

    adjustMapCoords(scaleFactor); // Initial adjustment

    window.addEventListener('resize', () => {
        const newScaleFactor = container.offsetWidth / originalWidth;
        adjustMapCoords(newScaleFactor);
    });
});

// Funktion zum Bewegen des Bootes zu einem bestimmten Punkt
function moveBoatTo(point) {
    const [x, y] = point.coords.split(',').map(Number);
    const boatWidth = boat.offsetWidth;
    const boatHeight = boat.offsetHeight;
    const offsetX = boatWidth / 2;
    const offsetY = boatHeight / 2;
    boat.style.left = `${x - offsetX}px`;
    boat.style.top = `${y - offsetY}px`;
}

// SCHWEIZERKARTE MIT PUNKTEN
const map = document.querySelectorAll('#chmap area');
map.forEach((point) => {
    point.addEventListener('click', (event) => {
        const city = point.dataset.city;
        updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
        infoBox(city); // Zeige Informationen für die Stadt an
        moveBoatTo(point); // Bewege das Boot zu dem Punkt
    });
});

// BOOT
const boat = document.createElement('img');
boat.src = 'Images/AareBootBlau.png';
boat.id = 'boat';
boat.style.position = 'absolute';
document.getElementById('containerSchweizerkarte').appendChild(boat);

document.getElementById('abBoot').addEventListener('click', function() {
    this.classList.add('animate');
    const targetElement = document.getElementById('schweizerKarte');
    if (targetElement) {
        scrollToElement(targetElement, 5000);
    }
});

function scrollToElement(element, duration) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 170;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function easeInOutQuad(time, start, change, duration) {
        time /= duration / 2;
        if (time < 1) return change / 2 * time * time + start;
        time--;
        return -change / 2 * (time * (time - 2) - 1) + start;
    }

    function scrollLoop(currentTime) {
        const elapsedTime = currentTime - startTime;
        window.scrollTo(0, easeInOutQuad(elapsedTime, startPosition, distance, duration));
        if (elapsedTime < duration) {
            requestAnimationFrame(scrollLoop);
        } else {
            window.scrollTo(0, targetPosition);
        }
    }

    requestAnimationFrame(scrollLoop);
}
