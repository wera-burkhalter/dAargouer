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



KURZBESCHREIBUNG
Wir wollen auf unserer Website die API von Aareguru einbinden. Unsere Idee ist es, dass man mithilfe der Schweizerkarte ganz einfach an den Punkt klicken kann wo man baden gehen will und sofort bescheid weiss, wie warm etc. es dort ist. Die List Seite eignet sich wiederum gut, verschiedene Orte zu vergleichen oder nach einem bestimmten Ort zu suchen. 


LEARNINGS
ChatGPT kann eine grosse Hilfe sein. 
    - auch wenn wir uns zu Beginn den Anspruch gestellt hatten, dass wir möglichst allen Code verstehen und vorallem selbst schreiben wollen, mussten wir einsehen, dass ChatGPT uns unterstützen kann und wir den Code dennoch verstehen können.

Als Team arbeiten hilft weiter. 
    - Wenn jemand aus unserem Team mal nicht mehr weiterwusste, konnten wir uns gegenseitig untersützten und uns so weiterhelfen, weil jemand anderes wieder eine neue Idee oder einen anderen Ansatz gefunden hat. 

Zu Beginn Masseinheiten definieren. 
    - Es war uns von Anfang an bewusst, dass wir nicht unbedingt Pixel verwenden sollten. Deshalb haben wir alle versucht alle anderen möglichen Masseinheiten zu verwenden. Leider wurde uns erst etwas spät im Arbeitsprozess bewusst, dass wir alle unterschiedliche Einheiten verwendet haben. Deshalb mussten wir diese dann nochmals definieren und überall neu anpassen. 


SCHWIERIGKEITEN
- Wir hatten zu Beginn grosse Schwierigkeiten mit dem Einbinden, respektive schon mit dem Verstehen der API und haben da auch einige Stunden "verschwendet". Dies vorallem auch, weil wir es möglichst ohne Hilfe von ChatGPT machen wollten. Am Ende des Tages mussten wir uns aber dann eingestehen, dass es uns so nicht weiterbringt und konnten mit Hilfe von ChatGPT alles korrekt codieren. 
- Unser Plan für das Boot auf der Schweizerkarte war es, dass es auf einem Pfad fährt und jeweils beim geklickten Punkt auf der Karte anhält. Dies war auch mit Unterstützung der Dozierenden nicht möglich, weshalb wir uns für die einfachere Variante entschieden haben und das Boot nun nicht mehr auf einem Pfad fährt, sondern sozusagen zu den Punkten "springt". Dies ist natürlich weniger hübsch, funktioniert aber viel besser und geschmeidiger. 
- Das responsive Design der Map Seite hat sich schwieriger gestaltet als gedacht. Die Schweizerkarte hat sich immer komisch verzogen und auch die Punkte darauf wollten nicht fixiert bleiben. Nach ein paar Inputs von ChatGPT wurde uns dann klar, woran das liegt und wie wir das anpassen können. Jedoch war es auch nicht ganz so einfach die richtigen Prompts dafür zu schreiben. Auch das Anpassen des Pfades des "ab is Boot" Boot, damit das Boot immer hinter der Schweizerkarte verschwindet, war nicht einfach. Und leider funktioniert es nicht auf allen Geräten gleich gut, zum Teil ist es noch etwas sichtbar hinter der Karte. 
- Wir hatten das Problem, dass der Inhalt resp. der Text aus den InfoBoxen fliesst, wenn die Bildschirmgrössen angepasst wurde. Dieses Problem konnten wir dann lösen. Aber leider bestand dann das Problem, dass sich die Grösse der InfoBoxen auf der Map Seite nicht anpassen liess bei sich ändernden Bildschirmgrösse. So gut es uns möglich war, haben wir das angepasst. 


BENUTZTE RESSOURCEN
Wir haben viel auf ChatGPT und die Seite w3schools.com zurückgegriffen. Sowie auch das IMP - Tooling 101 und Übungen aus dem Unterricht. 

