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