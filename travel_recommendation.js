
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchTrip = document.getElementById('searchTrip');
const result = document.getElementById("searchResults");
const hero_box = document.querySelector(".hero-box");

searchBtn.addEventListener('click', getRecommendation);
clearBtn.addEventListener('click', clearRecommendation);

function clearRecommendation() {
    result.innerHTML = '';
}


function getRecommendation() {
    // get the search text 
    const searchText = searchTrip.value.toLowerCase();

    // search for trip
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            let finedResult = '';
            result.innerHTML = '';

            if ("countries".includes(searchText)) {

                data.countries.forEach(element => {

                    finedResult += element.cities.map(item =>
                        `
                    <div class="result-card">
                        <img src="./img/${item.imageUrl}" width="300px" height="300" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <button type="button">visit</button>
                    </div>
                    `
                    ).join('');

                });


            } else if ("temples".includes(searchText)) {

                finedResult = data.temples.map(item =>
                    `
                <div class="result-card">
                    <img src="./img/${item.imageUrl}" width="300px" height="300" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button type="button">visit</button>
                </div>
                `
                ).join('');
            } else if ("beaches".includes(searchText)) {

                finedResult += data.beaches.map(item =>
                    `
                <div class="result-card">
                    <img src="./img/${item.imageUrl}" width="300px" height="300" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button type="button">visit</button>
                </div>
                `
                ).join('');
            }
            else {
                alert('error');
                result.innerHTML = '';
                return
            }

            result.innerHTML = finedResult;

        })
        .catch(error => {
            console.log('there is error : ', error);
            result.innerHTML = '';
        })


}
