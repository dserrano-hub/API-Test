//Variables
const app = document.getElementById('main');
const COORS = 'https://cors-anywhere.herokuapp.com/';
const clear_btn = document.getElementById("clear-button");
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let container = document.getElementById("container-cards");

//Events
searchButton.addEventListener("click", searchLocationInput);
clear_btn.addEventListener("click", clear);

//Function to search a location
function searchLocationInput() {
    var request = new XMLHttpRequest();
    var input_search_val = searchInput.value;

    var search_API = `${COORS}https://www.metaweather.com/api/location/search/?query=${input_search_val}`;

    request.open('GET', search_API);

    request.onload = function() {

            var data = JSON.parse(this.response);

            //Condition to validate API information
            if (request.status >= 200 && request.status < 400) {
                data.forEach(location => {
                    console.log(location);
                    //create card 
                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');

                    //create title
                    const h3 = document.createElement('h1');
                    card.setAttribute('class', 'city-card');
                    h3.textContent = location.title;

                    //create btn for show more
                    const btn = document.createElement('button');
                    btn.setAttribute('class', 'show-more');
                    btn.innerHTML = "Details";

                    //function for detail information
                    btn.onclick = function() {
                        let locationId = location.woeid;
                        const detailContainer = document.createElement('div');
                        detailContainer.setAttribute('class', 'detail-container');
                        detailContainer.style.visibility = "visible";

                        let detail_API = `${COORS}https://www.metaweather.com/api/location/${location.woeid}`;
                        var request = new XMLHttpRequest();

                        request.open('GET', detail_API, true);

                        request.onload = function() {
                            if (this.status >= 200 && this.status < 400) {
                                var data = JSON.parse(this.response);
                                console.log('200! with data', data);

                                //Time
                                const wind = document.createElement('p');
                                wind.setAttribute('class', 'detail-text');
                                let txt = "Wind: ";
                                wind.textContent = txt + data.consolidated_weather[0].weather_state_name;

                                //Humidity
                                const humidity = document.createElement('p');
                                humidity.setAttribute('class', 'detail-text');
                                let txt1 = "Humidity: ";
                                humidity.textContent = txt1 + data.consolidated_weather[0].humidity;

                                //Temperature
                                const temperature = document.createElement('p');
                                temperature.setAttribute('class', 'detail-text');
                                let txt2 = "Temperature: ";
                                let degrees = " °C";
                                temperature.textContent = txt2 + data.consolidated_weather[0].the_temp + degrees;

                                //Predictability
                                const predictability = document.createElement('p');
                                predictability.setAttribute('class', 'detail-text');
                                let txt3 = "Precipitation: ";
                                let percent = "%";
                                predictability.textContent = txt3 + data.consolidated_weather[0].predictability + percent;

                                //Add nodes to cards
                                card.appendChild(wind);
                                card.appendChild(humidity);
                                card.appendChild(temperature);
                                card.appendChild(predictability);
                            }
                        };
                        request.send();
                        card.appendChild(detailContainer);

                    };

                    //Insert new nodes to the document
                    container.appendChild(card);
                    card.appendChild(h3);
                    card.appendChild(btn);
                });
            } else {
                console.log('error');
            }
        }
        // Send request
    request.send();
}
//Function to clear screen
function clear() {
    let containerCards = document.getElementById('main');
    let cards = document.getElementById('city-card');
    containerCards.innerHTML = '';
    console.log("clearrrr");
    console.log('este es', container);
}