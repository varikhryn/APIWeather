// 1. Винница                                  id=689558 
// 2. Луцк                                     id=702569
// 3. Днепр (бывш. Днепропетровск)             id=709930
// 4. Донецк                                   id=709717
// 5. Житомир                                  id=686967
// 6. Ужгород                                  id=690548
// 7. Запорожье                                id=687700
// 8. Ивано-Франковск                          id=686762
// 9. Киев                                     id=703448
// 10. Кропивницкий (бывш. Кировоград)          id=705812
// 11. Луганск                                  id=702658
// 12. Львов                                    id=702550
// 13. Николаев                                 id=700568
// 14.Одесса                                   id=698740
// 15. Полтава                                  id=696643
// 16. Ровно                                    id=695594
// 17. Севастополь                              id=694423
// 18. Сумы                                     id=692194
// 19. Тернополь                                id=691650
// 20. Харьков                                  id=706483

// 21. Херсон                                   id=706448
// 22. Хмельницкий                              id=706372
// 23. Черкассы                                 id=710791
// 24. Чернигов                                 id=710735
// 25. Черновцы                                 id=710719

let arrCity = [703448, 689558, 702569, 709930, 709717, 686967, 690548, 687700, 686762, 705812, 702658, 702550, 700568, 698740, 696643, 695594, 694423, 692194, 691650, 706483]


function returnArrCity() {
    out = '';

    for (let i = 0; i < arrCity.length; i++) {
        if (arrCity[i] != arrCity[arrCity.length - 1])
            out += `${arrCity[i]},`;
        else {
            out += `${arrCity[i]}`;
        }
    }

    console.log(out);
    return out;
}

// returnArrCity();

function choiceBigCity() {
    fetch(`http://api.openweathermap.org/data/2.5/group?id=${returnArrCity()}&units=metric&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`) //enpoit query parametr
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            console.log(data.list.length);

            let mainBlock = document.getElementById('items-big-city');

            outListCity(data, mainBlock);
        })
        .catch(function () {
            //catch any errors
        });
}

let myArr = '';

document.getElementById('show-City').onclick = function () {

    myArr = getChoiseInputCheckbox();

    getCityPos();

}


choiceBigCity();

function getChoiseInputCheckbox() {
    let checkbox = document.querySelectorAll('#items-big-city input');
    let out = '';
    let lon = '';
    let lat = '';
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            lon = `lon=${checkbox[i].getAttribute('data-lon')}`;
            lat = `lat=${checkbox[i].getAttribute('data-lat')}`;
            out = `${lat}&${lon}`;
            break;
        }
    }
    return out;
}

function outListCity(data, mainBlock) {
    for (let i = 0; i < data.list.length; i++) {
        let div = createDOMElement('div', 'items-big-city__item');
        let input = createDOMElement('input', '');
        input.setAttribute('id', `big-city-item-${i}`);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'radio');
        input.setAttribute('value', `${data.list[i]['name']}`);
        input.setAttribute('data-lon', `${data.list[i].coord.lon}`);
        input.setAttribute('data-lat', `${data.list[i].coord.lat}`);
        div.append(input);
        let label = createDOMElement('label', '');
        label.setAttribute('for', `big-city-item-${i}`);
        label.innerHTML = `${data.list[i].name}`;
        // label.append(input);
        div.append(label);
        // console.log(input);

        mainBlock.append(div);
    }
}



// http://api.openweathermap.org/data/2.5/find?lat=52&lon=30.5&cnt=50
//api.openweathermap.org/data/2.5/weather?q=uk&appid=50&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua
function getCityPos() {
    // fetch(`http://api.openweathermap.org/data/2.5/find?lat=50.43&lon=30.52&cnt=50&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`)
    fetch(`http://api.openweathermap.org/data/2.5/find?${myArr}&cnt=50&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            let sectionWeather = document.querySelector('.section-weather');
            sectionWeather.style.display = 'flex';

            let blockWithSelect = document.getElementById('item-city');
            blockWithSelect.innerHTML = '';

            createBlockWithSelect(data, blockWithSelect, sectionWeather);

        })
        .catch(function () {
            //catch any errors
        });
}

function createBlockWithSelect(data, blockWithSelect) {

    let pElement = createDOMElement('p', '');
    pElement.innerHTML = `Выберете город:`;

    blockWithSelect.append(pElement);

    let select = createDOMElement('select', '');

    blockWithSelect.append(select);
    select.setAttribute('name', 'city');
    select.setAttribute('id', 'name-city');

    let options = [];
    for (let i = 0; i < data.list.length; i++) {
        options = new Option(`${data.list[i].name}`, `${data.list[i].id}`);
        select.append(options);
    }
}

function getKeyInHeader() {
    let z = getKey();
    let out = '';

    if (z == '') {
        out = arrCity[0];
    } else {
        out = getKey();
        console.log(getKey());
    }

    return out;
}


function getWeatherInHeader() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${getKeyInHeader()}&appid=59dc9724a097e9ce92b81be492fc0724&lang=ua`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            let blockItem = document.getElementById('weather-in-header');
            blockItem.innerHTML = '';

            createBlockWithWeatherInHeader(data, blockItem);
        })
        .catch(function () {
            //catch any errors
        });
}

getWeatherInHeader();

function createBlockWithWeatherInHeader(data, mainBlock) {

    let weatherTemp = createDOMElement('p', 'weather-temp-in-header');
    weatherTemp.innerHTML = `${Math.round(data.main.temp_max - 273)}&deg`;
    mainBlock.append(weatherTemp);

    let weatherImg = createDOMElement('img', '');
    weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`);
    weatherImg.setAttribute('width', '25px');
    mainBlock.append(weatherImg);

    let weatherCity = createDOMElement('p', 'weather-city-in-header');
    weatherCity.innerHTML = `${data.name}`;
    mainBlock.append(weatherCity);

    let weatherCountry = createDOMElement('p', 'weather-country-in-header');
    weatherCountry.innerHTML = `${data.sys.country}`;
    mainBlock.append(weatherCountry);
}

function getKey() {
    let selec = document.getElementById('name-city');
    let out = ''
    if (selec !== null) {
        out = selec.value;
    }
    return out;
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
            getKeyInHeader();
            getWeatherInHeader();
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
    let menu = document.getElementById('items-big-city');
    menu.classList.toggle('items-big-city__content');
}

openMenu.onclick = openCityMenu;


