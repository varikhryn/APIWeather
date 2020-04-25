let cityKyiv = 703448; //Kyiv
let cityLviv = 702550; //Lviv
let cityOdessa = 698740; //Odessa "lon": 30.732622, "lat": 46.477474

// http://api.openweathermap.org/data/2.5/find?lat=52&lon=30.5&cnt=50
function getCityPos() {
    fetch(`http://api.openweathermap.org/data/2.5/find?lat=50.43&lon=30.52&cnt=50&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            let select = document.getElementById('name-city');

            let options = [];
            for (let i = 0; i < data.list.length; i++) {
                options = new Option(`${data.list[i].name}`, `${data.list[i].id}`);
                select.append(options);
            }
        })
        .catch(function () {
            //catch any errors
        });
}

getCityPos();

function getKey() {
    let selec = document.getElementById('name-city');
    return selec.value;
}

function getWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${getKey()}&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            let mainDiv = document.querySelector('.section-weather__get');
            mainDiv.innerHTML = '';
            setCity(data, mainDiv);
            setTempe(data, mainDiv);
            setTempImg(data, mainDiv);
            setWind(data, mainDiv);
            // grndLevel(data, mainDiv);

        })
        .catch(function () {
            //catch any errors
        });
}

function setCity(dataCity, divRez) {

    let z = createDOMElement('p', 'weather-city');
    z.innerHTML = `${dataCity.name}`;


    let span = createDOMElement('span');
    span.innerHTML = `${dataCity.sys.country}`;

    let itemDiv = createDOMElement('div', 'section-weather__item');
    itemDiv.append(z);
    itemDiv.append(span);

    divRez.append(itemDiv);
}

function createDOMElement(elem, arr) {
    let div = document.createElement(elem);
    if (arr !== undefined && arr.length > 0) {
        div.classList.add(arr);
    }
    return div;
}

function setTempe(dataCity, divRez) {

    let divMinMax = createDOMElement('div', 'temp-min-max');

    let minSpanValue = createDOMElement('span', '');
    minSpanValue.innerHTML = `${Math.round(dataCity.main.temp_min - 273)}&deg`;
    let elePMin = createDOMElement('p', '');
    elePMin.innerHTML = `min: `;
    elePMin.append(minSpanValue);
    divMinMax.append(elePMin);

    let maxSpanValue = createDOMElement('span', '');
    maxSpanValue.innerHTML = `${Math.round(dataCity.main.temp_max - 273)}&deg`;
    let elePMax = createDOMElement('p', '');
    elePMax.innerHTML = `max: `;
    elePMax.append(maxSpanValue);
    divMinMax.append(elePMax);


    let pTemp = createDOMElement('p', 'weather-temperature');
    pTemp.innerHTML = `${Math.round(dataCity.main.temp - 273)}&deg`;

    let itemDiv = createDOMElement('div', 'section-weather__item');
    itemDiv.append(pTemp);
    itemDiv.append(divMinMax);

    divRez.append(itemDiv);
}

function setTempImg(dataCity, divRez) {
    let itemDiv = createDOMElement('div', 'section-weather__item');

    let itemDivWeather = createDOMElement('div', 'weather-disclaimer__img');
    let itemImg = createDOMElement('img', '');
    itemImg.setAttribute('src', `https://openweathermap.org/img/wn/${dataCity.weather[0]['icon']}@2x.png`);
    itemDivWeather.append(itemImg);
    itemDiv.append(itemDivWeather);

    let itemDisclaimer = createDOMElement('p', 'weather-disclaimer');
    itemDisclaimer.innerHTML = `${dataCity.weather[0]['description']}`;
    itemDiv.append(itemDisclaimer);

    divRez.append(itemDiv);
}

function setWind(dataCity, divRez) {
    let itemDiv = createDOMElement('div', 'section-weather__item');

    let itemP = createDOMElement('p', 'weather-wind');
    itemP.innerHTML = `Ветер:  ${dataCity.wind.speed}м/с`;
    itemDiv.append(itemP);

    divRez.append(itemDiv);
}

document.querySelector('.btn-1').onclick = getWeather;




let openMenu = document.getElementById('open-city-menu');

function openCityMenu() {
    console.log('test');
    openMenu.classList.toggle('open-city-menu__active');
}

openMenu.onclick = openCityMenu;
