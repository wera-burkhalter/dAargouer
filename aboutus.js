const app = document.querySelector("#teammembers");

// Define the objects
const Janic = {
    name: "Janic",
    description: "Als ambitonierte Aarebädeler und Warmduscher isch em Janic dr Thermometer es bsundrigs Herzensprojekt gsii. Solang dä ned mindistens Grüen wird, haltet er sich vom Wasser fern. Usserdem hed er üsi Team siite gstaltet. Ganz nach em Motto «Wieso eifach wes au Kompliziert gaht» hed er dass ganze miteme Array im Javascript gstaltet, statts eifach im CSS zmache. ",
    Image: "images/Team/janic.jpg",
};

const Nicole = {
    name: "Nicole",
    description: "Us regumässigi Aareguru-Nutzerin isch ar Nicole schnäu klar gsi was si für neh API wott ihbinge. Da sie aus ehemaligi Orientierigsläuferin gärn Charte het, het si ar Gruppe sCharte-Design vorgschlage. Si het sich oh näre ganz intensiv mitm Design, sprich unger angerem dSchriftarte und dFarbgäbig, gkümmeret. S'CSS isch auso ihres Speziaugebiet gsi.",

    Image: "images/Team/nicole.jpg",
};

const Wera = {
    name: "Wera",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",

    Image: "images/Team/wera.jpg",
};

// Create the array and include the objects
const Team = [Janic, Nicole, Wera];

// Output the array to verify
console.log(Team);

// Create a function to display the team members
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

;