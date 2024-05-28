// // Selektiere die DOM-Elemente
// const thermometerFill = document.querySelector('#thermometerFill');
// const app = document.querySelector("#aare-app");
// const suchBox = document.querySelector('#suchBox');
// const thermometerZahl = document.querySelector('#thermometerZahl');

// // Definiere die Städte und die URL für die Anfragen
// let cities = ["brienz", "interlaken", "thun", "bern", "hagneck", "biel", "olten", "brugg"];
// let currenturl = "https://aareguru.existenz.ch/v2018/current";

// // Funktion zur Durchführung der Anfragen
// async function anfragen(url) {
//     try {

//         const anfrage = await fetch(url);

//         return await anfrage.json();
//     } catch (e) {
//         console.error(e);
//         return [];
//     }
// }

// // THERMOMETER
// // Funktion zur Aktualisierung der Temperatur für eine bestimmte Stadt
// function updateTemperature(city) {
//     const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

//     anfragen(url).then(results => {
//         console.log(results.aare.temperature);
//         thermometerFill.innerHTML = '';
//         thermometerZahl.innerHTML = '';
//         const temperature = results.aare.temperature;
//         thermometerZahl.innerHTML += `<div> ${temperature} </div>`;
//         let thermoLiquid = temperature * 2.5;
//         thermometerFill.style.height = `${thermoLiquid}%`;
//         // thermometerFill.style.backgroundColor = "red";
//         if (temperature < 10) {
//             thermometerFill.style.backgroundColor = "blue"
//         } else if (temperature < 15) {
//             thermometerFill.style.backgroundColor = "lightblue"
//         }
//         else if (temperature < 25) {
//             thermometerFill.style.backgroundColor = "green"
//         }
//         else if (temperature < 30) {
//             thermometerFill.style.backgroundColor = "orange"
//         }
//         else {
//             thermometerFill.style.backgroundColor = "red"
//         }

//     }).catch(error => {
//         console.error(`Fehler bei der Anfrage für ${city}:`, error);
//     });
// }

// function infoBox(city) {
//     const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

//     anfragen(url).then(results => {
//         console.log(results.aare.location)
//         app.innerHTML = ``;
//         let location = results.aare.location;
//         let temperature = results.aare.temperature;
//         let temperature_text = results.aare.temperature_text;
//         let tt = results.weather.current.tt;

//         app.innerHTML += `
//             <article class="infoBox">
//                 <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
//                 <h3 class="infoBoxTitel">${location}</h3>
//                 <dl class="infoBoxTabelle">
//                     <dt>Wasser in °C</dt>
//                     <dd>${temperature}</dd>
//                     <dt>Luft in °C</dt>
//                     <dd>${tt}</dd>
//                     <dt>Bade?</dt>
//                     <dd>${temperature_text}</dd>
//                 </dl>
//             </article>`;
//     }).catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }

// // SCHWEIZERKARTE MIT PUNKTEN
// const map = document.querySelectorAll('#chmap > *');
// map.forEach((point) => {
//     point.addEventListener('click', (event) => {
//         const city = point.dataset.city;
//         showOverlay(city);
//         updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
//         infoBox(city);
//     });
// });

// function showOverlay(place) {
//     document.getElementById('overlay').style.display = 'flex';
//     document.getElementById('overlay-title').innerText = place;
//     document.getElementById('overlay-place').innerText = place;

//     // Füge das Update der Temperatur hinzu
//     updateTemperature(place);  // Ruft die Funktion auf, die die Temperatur aktualisiert
// }





// // Selektiere das Bootsbild
// const boat = document.createElement('img');
// boat.src = 'Images/AareBootBlau.png'; // Passe den Pfad entsprechend an
// boat.id = 'boat'; // Setze eine ID für das Bootsbild, um es über CSS zu stylen
// boat.style.position = 'absolute'; // Setze die Position auf absolut, um es innerhalb des Containers zu positionieren

// // Füge dem Container das Bootsbild hinzu
// document.getElementById('container').appendChild(boat);

// // Funktion zum Bewegen des Bootes zu einem bestimmten Punkt
// function moveBoatTo(point) {
//     const x = point.coords.split(',')[0];
//     const y = point.coords.split(',')[1];
//     const container = document.getElementById('container');
//     // const containerRect = container.getBoundingClientRect();
//     const boatWidth = boat.offsetWidth;
//     const boatHeight = boat.offsetHeight;
//     const offsetX = boatWidth / 2; // Berücksichtige die Breite des Bootsbildes für die korrekte Platzierung
//     const offsetY = boatHeight / 2; // Berücksichtige die Höhe des Bootsbildes für die korrekte Platzierung
//     boat.style.left = x - offsetX + 'px';
//     boat.style.top = y - offsetY + 'px';
// }

// // Schleife durch alle Map-Punkte und füge Klickereignis hinzu
// map.forEach((point) => {
//     point.addEventListener('click', (event) => {
//         const city = point.dataset.city;
//         showOverlay(city);
//         updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
//         infoBox(city);
//         moveBoatTo(point); // Bewege das Boot zum ausgewählten Punkt
//     });
// });



// Selektiere die DOM-Elemente
const thermometerFill = document.querySelector('#thermometerFill');
const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');
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
        // thermometerFill.style.backgroundColor = "red";
        if (temperature < 10) {
            thermometerFill.style.backgroundColor = "lightblue"
        } else if (temperature < 15) {
            thermometerFill.style.backgroundColor = "blue"
        }
        else if (temperature < 20) {    
            thermometerFill.style.backgroundColor = "lightgreen"
        }
        else if (temperature < 25) {
            thermometerFill.style.backgroundColor = "green"
        }
        else if (temperature < 30) {
            thermometerFill.style.backgroundColor = "orange"
        }
        else {
            thermometerFill.style.backgroundColor = "red"
        }

    }).catch(error => {
        console.error(`Fehler bei der Anfrage für ${city}:`, error);
    });
}

// INFOBOX
function infoBox(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

    anfragen(url).then(results => {
        console.log(results.aare.location)
        app.innerHTML = ``;
        let location = results.aare.location;
        let temperature = results.aare.temperature;
        let temperature_text = results.aare.temperature_text;
        let tt = results.weather.current.tt;

        app.innerHTML += `
            <article class="infoBox">
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

// SCHWEIZERKARTE MIT PUNKTEN
const map = document.querySelectorAll('#chmap > *');
map.forEach((point) => {
    point.addEventListener('click', (event) => {
        const city = point.dataset.city;
        updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
        infoBox(city); // Zeige Informationen für die Stadt an
    });
});




//BOOT
// Selektiere das Bootsbild
const boat = document.createElement('img');
boat.src = 'Images/AareBootBlau.png'; // Passe den Pfad entsprechend an
boat.id = 'boat'; // Setze eine ID für das Bootsbild, um es über CSS zu stylen
boat.style.position = 'absolute'; // Setze die Position auf absolut, um es innerhalb des Containers zu positionieren

// Füge dem Container das Bootsbild hinzu
document.getElementById('container').appendChild(boat);

// Funktion zum Bewegen des Bootes zu einem bestimmten Punkt
function moveBoatTo(point) {
    const x = point.coords.split(',')[0];
    const y = point.coords.split(',')[1];
    const boatWidth = boat.offsetWidth;
    const boatHeight = boat.offsetHeight;
    const offsetX = boatWidth / 2; // Berücksichtige die Breite des Bootsbildes für die korrekte Platzierung
    const offsetY = boatHeight / 2; // Berücksichtige die Höhe des Bootsbildes für die korrekte Platzierung
    boat.style.left = x - offsetX + 'px';
    boat.style.top = y - offsetY + 'px';
}

// Schleife durch alle Map-Punkte und füge Klickereignis hinzu
map.forEach((point) => {
    point.addEventListener('click', (event) => {
        const city = point.dataset.city;
        updateTemperature(city); // Aktualisiere Temperatur beim Klick auf einen Punkt
        infoBox(city); // Zeige Informationen für die Stadt an
        moveBoatTo(point); // Bewege das Boot zum ausgewählten Punkt
    });
});



document.getElementById('abBoot').addEventListener('click', function() {
    this.classList.add('animate');
    const targetElement = document.getElementById('schweizerKarte');
    if (targetElement) {
        scrollToElement(targetElement, 5000); // 2000 ms = 2 Sekunden
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



function adjustMapCoords(scaleFactor) {
    // Find all area elements
    const areas = document.querySelectorAll('map[name="chmap"] area');
    
    // Adjust the coordinates and radius of each area
    areas.forEach(area => {
        const originalCoords = area.getAttribute('coords').split(',').map(Number);
        const scaledCoords = originalCoords.map(coord => Math.round(coord * scaleFactor));
        area.setAttribute('coords', scaledCoords.join(','));
    });
}

// Beispiel eines Aufrufs der Funktion mit 0.7, wenn der Bildschirm 1024px oder weniger ist
if (window.innerWidth <= 1024) {
    adjustMapCoords(0.7);
}

// Optional: Event Listener hinzufügen, um bei Größenänderung des Fensters anzupassen
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
        adjustMapCoords(0.7);
    } else {
        // Stellen Sie hier die Koordinaten wieder auf Originalwerte ein, falls nötig
        adjustMapCoords(1 / 0.7); // Umkehrung der Verkleinerung
    }
});



function adjustMapCoords(scaleFactor) {
    const areas = document.querySelectorAll('map[name="chmap"] area');

    areas.forEach(area => {
        // Extrahiere die ursprünglichen Koordinaten und den Radius aus dem coords-Attribut
        let coords = area.getAttribute('coords').split(',').map(Number);
        // Skaliere Koordinaten und Radius
        let scaledCoords = coords.map(coord => Math.round(coord * scaleFactor));
        // Setze die neuen skalierten Koordinaten zurück ins coords-Attribut
        area.setAttribute('coords', scaledCoords.join(','));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Überprüfe die Fensterbreite und wende den Skalierungsfaktor entsprechend an
    const scaleFactor = window.innerWidth <= 600 ? 1.2 : 1;  // Beispiel-Skalierung auf 40%
    adjustMapCoords(scaleFactor);

    window.addEventListener('resize', () => {
        // Ermitteln Sie den Skalierungsfaktor erneut, wenn das Fenster neu dimensioniert wird
        const newScaleFactor = window.innerWidth <= 600 ? 1.2 : 1;
        adjustMapCoords(newScaleFactor);
    });
});

