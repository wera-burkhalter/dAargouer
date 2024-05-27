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
            thermometerFill.style.backgroundColor = "blue"
        } else if (temperature < 15) {
            thermometerFill.style.backgroundColor = "lightblue"
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

// Funktion zum Anzeigen von Informationen zu einer Stadt
function infoBox(city) {
    const url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;

    anfragen(url).then(results => {
        console.log(results.aare.location)
        app.innerHTML = ``;
        let location = results.aare.location;
        let temperature = results.aare.temperature;
        let temperature_text = results.aare.temperature_text;
        let tt = results.weather.current.tt;

        // Informationen direkt im Dokument einfügen
        const infoBoxContent = `
            <article class="infoBox">
                <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
                <h2>${location}</h2>
                <dl>
                    <dt>Wasser in °C</dt>
                    <dd>${temperature}</dd>
                    <dt>Luft in °C</dt>
                    <dd>${tt}</dd>
                    <dt>Bade?</dt>
                    <dd>${temperature_text}</dd>
                </dl>
            </article>`;

        // Informationen direkt im Dokument einfügen
        app.innerHTML = infoBoxContent;

        // Aktualisieren der Temperaturanzeige
        updateTemperature(city);
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




