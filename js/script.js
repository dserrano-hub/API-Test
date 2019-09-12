//Variables
const app = document.getElementById('main');
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let container = document.getElementById("container");
const COORS = 'https://cors-anywhere.herokuapp.com/';

//Events
searchButton.addEventListener("click", searchLocationInput);

function searchLocationInput() {
    var request = new XMLHttpRequest();
    var input_search_val = searchInput.value;

    var search_API = `${COORS}https://www.metaweather.com/api/location/search/?query=${input_search_val}`;

    request.open('GET', search_API);

    request.onload = function() {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.forEach(location => {
                console.log(location);
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

                //create btn for favorites
                const favorites_btn = document.createElement('button');
                favorites_btn.setAttribute('class', 'agregar-favoritos');
                favorites_btn.innerHTML = "Add favorites";


                //Add to favorites
                favorites_btn.onclick = function(e) {
                    let locationId = location.woeid;

                    // hacemos que no se ejecute el enlace
                    e.preventDefault();

                    // leemos los datos clave del producto y los guardamos en un objeto
                    var datos = {
                        id: document.getElementById("locationId")
                    };

                    // leemos los favoritos del localStorage
                    var favoritos = localStorage.getItem("favoritos") || "[]";
                    favoritos = JSON.parse(favoritos);

                    // buscamos el producto en la lista de favoritos
                    var posLista = favoritos.findIndex(function(e) { return e.id == datos.id; });
                    if (posLista > -1) {
                        // si está, lo quitamos
                        favoritos.splice(posLista, 1);
                    } else {
                        // si no está, lo añadimos
                        favoritos.push(datos);
                    }

                    // guardamos la lista de favoritos 
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));

                    // leemos los favoritos del localStorage
                    var favoritos = localStorage.getItem("favoritos") || "[]";
                    favoritos = JSON.parse(favoritos);

                };

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

                            //time
                            const wind = document.createElement('p');
                            wind.setAttribute('class', 'detail-text');
                            wind.textContent = data.consolidated_weather[0].weather_state_name;

                            //humidy
                            const humidity = document.createElement('p');
                            humidity.setAttribute('class', 'detail-text');
                            humidity.textContent = data.consolidated_weather[0].humidity;

                            //temperature
                            const temperature = document.createElement('p');
                            temperature.setAttribute('class', 'detail-text');
                            temperature.textContent = data.consolidated_weather[0].the_temp;

                            //precipitation
                            const state = document.createElement('p');
                            state.setAttribute('class', 'detail-text');
                            state.textContent = data.consolidated_weather[0].weather_state_abbr;


                            //Add nodes to cards
                            card.appendChild(wind);
                            card.appendChild(humidity);
                            card.appendChild(temperature);
                            card.appendChild(state);

                        }
                    };
                    request.send();
                    card.appendChild(detailContainer);

                };

                //insert new nodes to the document
                container.appendChild(card);
                card.appendChild(h3);
                card.appendChild(btn);
                card.appendChild(favorites_btn);
            });
        } else {
            console.log('error');
        }
    }


    // Send request
    request.send();
}
const clear = document.getElementById('clear-button');
clear.onclick = function() {
    //searchButton = document.getElementById('search-btn');
    //searchButton.removeChild(document.getElementById('search-btn'));
    var elem = document.querySelector('card');
    elem.parentNode.removeChild(elem);
}