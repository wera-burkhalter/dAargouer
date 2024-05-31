# dAargouer

init();

async function init() {
    let aareData = await fetchData(url);
    console.log(aareData);
};


async function fetchData(url) {
    try {
        let response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Fetch Error :-S', error);
    }
}

let url = 'https://aareguru.existenz.ch/v2018/cities';



Kurze Beschreibung des Projkts mit folgenden Themen:
- Kurzbeschreibung des Projekts (500 Zeichen)
Wir wollen auf unserer Website die API von Aareguru einbinden. Unsere Idee ist es, dass man mithilfe der Schweizerkarte ganz einfach an den Punkt klicken kann wo man baden gehen will und sofort bescheid weiss, wie warm etc. es dort ist. Die List Seite eignet sich wiederum gut, verschiedene Orte zu vergleichen oder nach einem bestimmten Ort zu suchen. 

- Learnings
- Schwierigkeiten
Wir hatten zu beginn grosse Schwierigkeiten mit dem Einbinden, respektive schon mit dem Verstehen der API und haben da auch einige Stunden "verschwendet".

- benutzte Ressourcen
Wir haben viel auf ChatGPT und die Seite w3schools.com zurückgegriffen. 

