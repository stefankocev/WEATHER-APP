let home = document.querySelector(`#home`);
let hourlyWeather = document.querySelector(`#hourly-weather`);
let about = document.querySelector(`#about`);
let navHome = document.querySelector(`#nav-home`);
let homeText = document.querySelector(`.home-text`)
let navHourlyWeather = document.querySelector(`#nav-hourly`);
let navAbout = document.querySelector(`#nav-about`)
let body = document.querySelector(`body`)
let searchBar = document.querySelector(`#search-bar`)
let searchButton = document.querySelector(`#search-button`)
let statistics = document.querySelector("#statisctics");

$(`.pages`).hide();

$(navHourlyWeather).click(function () {
    $(home).hide();
    $(about).hide();
    $(hourlyWeather).show();
});

$(navHome).click(function () {
    $(home).show();
    $(about).hide();
    $(hourlyWeather).hide();
    
})

$(navAbout).click(function () {
    $(home).hide();
    $(about).show();
    $(hourlyWeather).hide();

})
$(searchButton).click(function () {
    getData()
})

function getData() {
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&units=metric&appid=0d5a1034425f71bc4fe6dc183adc738c`,
        success: function (data) {
            createTableForHourlyStatistics(data.list, hourlyWeather)
            warmestAndColdestTime(data)
            maxMinAndAverageTemperature(data)
            maxMinAndAverageHumidity(data)
        },
        error: function (error) {
            console.log(error)
        }
    })

}


let createTableForHourlyStatistics = (data, el) => {
    let table = document.createElement(`table`)
    table.setAttribute(`border`, `1`);
    el.appendChild(table);
    let thead = document.createElement(`thead`)
    thead.innerHTML = `<td><b>Date and time</b></td>
    <td><b>Weather Desc.</b></td>
    <td><b>Temperature ( ℃ )</b></td>
    <td><b>Humidity ( % )</b></td>
    <td><b>Wind Speed ( m/s )</b></td>`
    table.appendChild(thead);
    createRowForHourlyStatistics(table, data)
}

createRowForHourlyStatistics = (table, data) => {
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement(`tr`)
        let date = new Date(data[i].dt * 1000).toLocaleTimeString(`en-us`, {
            day: `2-digit`,
            month: `2-digit`,
            year: `numeric`,
        });
        tr.innerHTML = `<td>${date}</td>
        <td><img src="http://openweathermap.org/img/w/${data[i].weather[0].icon}.png" alt="">${data[i].weather[0].description}</td>
        <td>${data[i].main.temp}</td>
        <td>${data[i].main.humidity}</td>
        <td>${data[i].wind.speed}</td>`
        table.appendChild(tr);
    }
}

maxMinAndAverageTemperature = (data) => {
    let maxTemperature = data.list[0].main.temp_max;
    let minTemperature = data.list[0].main.temp_min;
    let sum = 0;
    for (let i = 0; i < data.list.length; i++) {
        if (maxTemperature < data.list[i].main.temp_max)
            maxTemperature = data.list[i].main.temp_max
        if (minTemperature > data.list[i].main.temp_min)
            minTemperature = data.list[i].main.temp_min
        sum += (data.list[i].main.temp_max + data.list[i].main.temp_min);

    }
    let table = document.createElement(`table`)
    table.setAttribute(`border`, `1`);
    home.appendChild(table);
    let thead = document.createElement(`thead`)
    thead.innerHTML = `<td><b>Min Tem ( ℃ )</b></td>
    <td><b>Average Tem ( ℃ )</b></td>
    <td><b>Max Tem ( ℃ )</b></td>`
    table.appendChild(thead);
    let tr = document.createElement(`tr`)
    tr.innerHTML = `<td>${minTemperature}</td>
    <td>${sum / 80}</td>
    <td>${maxTemperature}</td>`
    table.appendChild(tr);
}
maxMinAndAverageHumidity = (data) => {
    let maxHumidity = data.list[0].main.humidity;
    let minHumidity = data.list[0].main.humidity;
    let sum = 0;
    for (let i = 0; i < data.list.length; i++) {
        if (maxHumidity < data.list[i].main.humidity)
            maxHumidity = data.list[i].main.humidity
        if (minHumidity > data.list[i].main.humidity)
            minHumidity = data.list[i].main.humidity
        sum += data.list[i].main.humidity
    }
    let table = document.createElement(`table`)
    table.setAttribute(`border`, `1`);
    home.appendChild(table);
    let thead = document.createElement(`thead`)
    thead.innerHTML = `<td><b>Min Hum ( % )</b></td>
    <td><b>Average Hum ( % )</b></td>
    <td><b>Max Hum ( % )</b></td>`
    table.appendChild(thead);
    let tr = document.createElement(`tr`)
    tr.innerHTML = `<td>${minHumidity}</td>
    <td>${sum / 40}</td>
    <td>${maxHumidity}</td>`
    table.appendChild(tr);
}
warmestAndColdestTime = (data) => {
    let h1 =  document.createElement(`h1`)
    h1.innerHTML = `Here are the statistics for next 5 days for ${searchBar.value.toUpperCase()}`
     home.appendChild(h1)
    let warmestTime = data.list[0].main.temp_max;
    let coldestTime = data.list[0].main.temp_min;
    for (let i = 0; i < data.list.length; i++) {
        if (warmestTime < data.list[i].main.temp_max)
            warmestTime = new Date(data.list[i].dt * 1000).toLocaleTimeString(`en-us`, {
                day: `2-digit`,
                month: `2-digit`,
                year: `numeric`,
            });
        if(coldestTime > data.list[i].main.temp_min)
            coldestTime = new Date(data.list[i].dt * 1000).toLocaleTimeString(`en-us`, {
                day: `2-digit`,
                month: `2-digit`,
                year: `numeric`,
            });
    }
    let table = document.createElement(`table`)
    table.setAttribute(`border`, `1`);
    home.appendChild(table);
    let thead = document.createElement(`thead`)
    thead.innerHTML = `<td><b>Warmest Time</b></td>
    <td><b>Coldest Time</b></td>`
    table.appendChild(thead);
    let tr = document.createElement(`tr`)
    tr.innerHTML = `<td>${warmestTime}</td>
    <td>${coldestTime}</td>`
    table.appendChild(tr);}