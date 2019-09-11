//Variables
const app = document.getElementById('main');
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let container = document.getElementById("container");
// let temperature = document.getElementById("temp");
// let humidity = document.getElementById("humidity-div");
const COORS = 'https://cors-anywhere.herokuapp.com/';

//Events
searchButton.addEventListener("click", searchLocationInput);

function searchLocationInput() {
    var request = new XMLHttpRequest();
    var input_search_val = searchInput.value;
    // console.log('el input si tiene val', input_search_val)

    var search_API = `${COORS}https://www.metaweather.com/api/location/search/?query=${input_search_val}`;

    request.open('GET', search_API);

    request.onload = function () {

        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.forEach(location => {
                console.log(location)
                //create card 
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                //create title
                const h3 = document.createElement('h1');
                card.setAttribute('class', 'city-name');
                h3.textContent = location.title;

                //create btn for show more
                const btn = document.createElement('button');
                btn.setAttribute('class', 'show-more');
                btn.innerHTML = "Details";
                //function for detail information

                btn.onclick = function () {
                    let locationId = location.woeid
                    const detailContainer = document.createElement('div');
                    detailContainer.setAttribute('class', 'detail-container');
                    detailContainer.style.visibility = "visible";

                    let detail_API = `${COORS}https://www.metaweather.com/api/location/${location.woeid}`;
                    var request = new XMLHttpRequest();

                    request.open('GET', detail_API, true);

                    request.onload = function () {
                        if (this.status >= 200 && this.status < 400) {
                            var data = JSON.parse(this.response);
                            console.log('200! with data', data);

                         //hacer uno de estos por cada cosa que hay que mostrar

                            //time
                            const wind = document.createElement('p');
                            wind.setAttribute('class', 'detail-text');
                            wind.textContent = data.consolidated_weather[0].weather_state_name;

                            //humidy
                            const humidity = document.createElement('p');
                            humidity.setAttribute('class', 'detail-text');
                            humidity.textContent = data.consolidated_weather[0].humidity;


                            //agregar los nodos a la tarjeta
                            card.appendChild(wind);
                            card.appendChild(humidity);

                        }
                    };
                    request.send();
                    card.appendChild(detailContainer);

                };

                //insert new nodes to the document
                container.appendChild(card);
                card.appendChild(h3);
                card.appendChild(btn);
            });
        } else {
            console.log('error')
        }
    }
    // Send request
    request.send()
}









