const app = document.querySelector("#teammembers");

// Define the objects
const Janic = {
    name: "Janic",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
    Image: "images/janic.jpg",
};

const Nicole = {
    name: "Nicole",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",

    Image: "images/nicole.jpg",
};

const Wera = {
    name: "Wera",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",

    Image: "images/wera.jpg",
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
    <div class="memberText">
        <h3> ${name}</h3>
        <p class="memberDescription${reverseClass}"> ${description}</p>
    </div>
    <img src="${image}" alt="Portrait von ${name}" class="memberImage${reverseClass}">

</article>`;

});

;