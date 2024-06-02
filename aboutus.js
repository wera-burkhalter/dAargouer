const app = document.querySelector("#teammembers");

// Definiere die Objekte
const Janic = {
    name: "Janic",
    description: "Als ambitonierte Aarebädeler und Warmduscher isch em Janic dr Thermometer es bsundrigs Herzensprojekt gsii. Solang dä ned mindistens Grüen wird, haltet er sich vom Wasser fern. Usserdem hed er üsi Team siite gstaltet. Ganz nach em Motto «Wieso eifach wes au Kompliziert gaht» hed er dass ganze miteme Array im Javascript gstaltet, statts eifach im CSS zmache. ",
    Image: "images/Team/janic.jpg",
};

const Nicole = {
    name: "Nicole",
    description: "Aus regumässigi Aareguru-Nutzerin isch ar Nicole schnäu klar gsi was si für neh API wott ihbinge. Da sie aus ehemaligi Orientierigsläuferin gärn Charte het, het si ar Gruppe sCharte-Design vorgschlage. Si het sich oh näre ganz intensiv mitm Design, sprich unger angerem dSchriftarte und dFarbgäbig, gkümmeret. S'CSS isch auso ihres Speziaugebiet gsi.",

    Image: "images/Team/nicole.jpg",
};

const Wera = {
    name: "Wera",
    description: "Us Respekt vorem starche Zug vor Aare und auem wo dert unge so umeschwümmt, haute sich d'Wera lieber im Böötli uf. Drum Isches ihre es grosses Alige gsi, das die beide Böötli ufer map-site funktioniere und sie het aues derfür gä, ou weni mängisch fasch bi düredräit isch. Ou s’Design sött natürlich so responsive wie müglech si, mit dene Böötli und au dem fancy züg isch das ufer map site gar nid so eifach gsi.",

    Image: "images/Team/wera.jpg",
};

// Erstelle eine Array und füge die Objekte hinzu
const Team = [Janic, Nicole, Wera];

// Ausgabe des Arrays zur Überprüfung
console.log(Team);

// Funktion zur Anzeige der Teammitglieder erstellen
Team.forEach((teamMember, index) => {

    let name = teamMember.name;
    let description = teamMember.description;
    let image = teamMember.Image;
     let reverseClass = index % 2 === 1 ? 'Reverse' : '';

    app.innerHTML += `     <article class="member${reverseClass}">
    <div class="memberText${reverseClass}">
        <h2> ${name}</h2>
        <p class="memberDescription${reverseClass}"> ${description}</p>
    </div>
    <img src="${image}" alt="Portrait von ${name}" class="memberImage${reverseClass}">

</article>`;

});

