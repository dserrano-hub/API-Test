var request = new XMLHttpRequest();

const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

function clicked() {
    var input_value = document.getElementById('data').value;
    document.getElementById('display').innerHTML = input_value;
    console.log(input_value);
    searchLocation(input_value);
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function searchLocation(location) {
    const COORS = 'https://cors-anywhere.herokuapp.com/';
    const API = `${COORS}https://www.metaweather.com/api/location/search/?query=${location}`;
    request.open('GET', API);

    request.onload = function() {

        var data = JSON.parse(this.response);

        data.forEach(location => {
            const card = document.createElement('div');

            const a = document.createElement('a');
            a.setAttribute("href", "#");
            a.setAttribute("onclick", `some(${location.id})`);
            a.textContent = location.title;

            container.appendChild(card);
            card.appendChild(a);


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
document.getElementById('btn').addEventListener('click', clicked);