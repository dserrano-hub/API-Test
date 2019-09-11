/* Variables */

const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

/* Events */

document.getElementById('search-button').addEventListener('click', clicked);

function clicked() {
    var input_value = document.getElementById('input-search').value;
    //document.getElementById('display').innerHTML = input_value;
    console.log(input_value);
    searchLocation(input_value);
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
