//Variables
const app = document.getElementById('main');
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let container = document.getElementById("container");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

//Events
searchButton.addEventListener("click", searchLocationInput);

function searchLocationInput() {
    var request = new XMLHttpRequest();
    var input_search_val = searchInput.value;
    // console.log('el input si tiene val', input_search_val)
    const COORS = 'https://cors-anywhere.herokuapp.com/';
    var search_API = `${COORS}https://www.metaweather.com/api/location/search/?query=${input_search_val}`;

    request.open('GET', search_API);

    request.onload = function() {

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
                    const btn = document.createElement('a');
                    btn.setAttribute('class', 'show-more');
                    btn.setAttribute('id', location.woeid);
                    btn.setAttribute('href', 'detail.html');
                    btn.innerHTML = "Details";

                    //insert new nodes to the document
                    container.appendChild(card);
                    card.appendChild(h3);
                    card.appendChild(btn);
                })
            } else {
                console.log('error');
            }
        }
        // Send request
    request.send();
}

function searchLocation(location) {

    var request = new XMLHttpRequest();
    const COORS = 'https://cors-anywhere.herokuapp.com/';
    const API = `${COORS}https://www.metaweather.com/api/location/search/?query=${location}`;
    request.open('GET', API);

    request.onload = function() {

        var data = JSON.parse(this.response);

        data.forEach(location => {
            if (request.status >= 200 && request.status < 400) {
                /*data.forEach(location => {

                // Create a div with a card class
                 const card = document.createElement('div');
                  card.setAttribute('class', 'card');

                  // Create an h1 and set the text content to the film's title
                  const title = document.createElement('div');
                  title.textContent = location.title;

                  container.appendChild(card);
                  card.appendChild(title);

                  //document.getElementsByClassName('card-title').innerHTML = location_title;
                  console.log(location);
                });*/
                for (let i = 0; i < data.length; i++) {
                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');

                    // Create an h1 and set the text content to the film's title
                    const title = document.createElement('div');
                    title.textContent = i.title;

                    container.appendChild(card);
                    card.appendChild(title);

                    //document.getElementsByClassName('card-title').innerHTML = location_title;
                    console.log(i);

                }
            } else {
                console.log('error');
            }
            /*const containerr = document.createElement('div');
              containerr.setAttribute('class', 'containerr');
             const card = document.createElement('div');

              const a = document.createElement('a');
              a.setAttribute("href", "#");
              a.setAttribute("onclick", `some(${location.id})`);
            a.textContent = location.title;

              app.appendChild(containerr);
              containerr.appendChild(card);
              card.appendChild(a);*/


        });

        /*if (request.status >= 200 && request.status < 400) {
       data.forEach(location => {
           console.log(location.tilte);
        });
  } else {
        console.log('error');
    }*/
    }

    request.setRequestHeader("Accept", 'application/json');
    request.send();
}