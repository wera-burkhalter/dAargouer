const app = document.querySelector("#aare-app");
const suchBox = document.querySelector('#suchBox');


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
        <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
        <h3 class="infoBoxTitel">${location}</h3>
        <dl class="infoBoxTabelle">
        
            <dt>Wasser</dt>
            <dd>${temperature}</dd>
            <dt>Luft</dt>
            <dd>${tt}</dd>
            <dt>Baden?</dt>
            <dd>${temperature_text}</dd>
            </dl>
        </div>
        </article>`;

    });
});

async function filterLocations() {
    const input = document.getElementById('search-input');
    const filterText = input.value.toLowerCase();

    const results = await anfragen("https://aareguru.existenz.ch/v2018/current?city=");

    const filteredResults = results.filter(result => {
        return result.aare.location.toLowerCase().includes(filterText);
    });

    displayResults(filteredResults);
}

function displayResults(results) {
    const app = document.querySelector("#aare-app");
    app.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        let location = result.aare.location;
        let temperature = result.aare.temperature;
        let temperature_text = result.aare.temperature_text;
        let tt = result.weather.current.tt;

        app.innerHTML += `<article class="infoBox">
            <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
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





// async function search(stadtFilter) {
//     let searchValue = suchBox.value;
//     let url = `https://aareguru.existenz.ch/v2018/current?city=${searchValue}`;
//     app.innerHTML = '';
//     let aareStadt = await fetchData(url);
//     console.log(aareStadt);
//     console.log(aareStadt.aare.location);
//     }
    
// suchBox.addEventListener('input', search);

// function createItem(stadtFilter){
// let item = document.createElement('div');
// item.innerHTML += `<article class="infoBox">
// <img src="Images/${location}.jpg" alt="${location}" class="infoBoxImg">
// <h3 class="infoBoxTitel">${location}</h3>
// <dl class="infoBoxTabelle">

//     <dt>wassertemparatur</dt>
//     <dd>${temperature}</dd>
//     <dt>lufttemparatur</dt>
//     <dd>${tt}</dd>
//     <dt>badeempfehlung</dt>
//     <dd>${temperature_text}</dd>
// </div>
// </article>`;
// app.appendChild(item);
// }

// // function createItem(cocktail) {
// //     let item = document.createElement('div');
// //     item.classList.add('drink');
// //     item.innerHTML = `<h2>${cocktail.strDrink}</h2> 
// //     <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
// //     <p>${cocktail.strInstructions}</p>`;
    
// //     cocktailApp.appendChild(item);
// // }

// async function fetchData(url) {
//     try {
//         let response = await fetch(url);
//         let data = await response.json();
//         return data;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

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