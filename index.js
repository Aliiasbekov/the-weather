
const apiKey = "a57495ef14064576af9184407260602"
const createAPI = (str) => {
    return `https://api.weatherapi.com/v1/${str}`
}

const weatherAPI = {
    getSports: (city) => createAPI(`sports.json?key=${apiKey}q=${city}`),
    getFuture: (city, dt) => createAPI(`future.json?key=${apiKey}q=${city}&dt=${dt}`),
    getCurrent: (city) => createAPI(`current.json?q=${city}&key=${apiKey}&aqi=yes`),
    getForecast: (city, days) => createAPI(`forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=yes&alerts=no`)
}


const changeCityInput = document.querySelector(".city_input")
const currentIcon = document.querySelector(".current_icon_img")
const currentTempC = document.querySelector(".temp_c")
const currentCity = document.querySelector(".city_title")
const currentCityDay = document.querySelector(".city_day")
const theWeatherText = document.querySelector(".city_info_weather_title")
const theWeatherIcon = document.querySelector(".city_info_weather")
const theWeatherOfMax = document.querySelector(".city_info_max_temp")
const theWeatherOfMin = document.querySelector(".city_info_min_temp")
const currentCityHumidity = document.querySelector(".city_footer_humidity_text_title")
const currentCityWild = document.querySelector(".city_footer_wild_text_title")
const weatherOfDay = document.querySelector(".list_of_week_contents")

const airQualityNum = document.querySelector(".air_quality_num")
const airQualityText = document.querySelector(".air_quality_text")
const uvIndexNum = document.querySelector(".uv_index_num")
const uvIndexText = document.querySelector(".uv_index_text")
const pressureNum = document.querySelector(".pressure_num")
const pressureText = document.querySelector(".pressure_text")


// LIST
// const currentMonday = document.querySelector(".list_content_title")
// const currentMondayIcon = document.querySelector(".list_content_title")
// const currentMondayTemp = document.querySelector(".list_content_temp")

const cities = [
    "Bishkek",
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Berlin",
    "Madrid",
    "Rome",
    "Moscow",
    "Beijing",
    "Seoul",
    "Sydney",
    "Melbourne",
    "Toronto",
    "Vancouver",
    "Los Angeles",
    "San Francisco",
    "Chicago",
    "Dubai",
    "Singapore",
    "Hong Kong",
    "Bangkok",
    "Istanbul",
    "Vienna",
    "Prague",
    "Warsaw",
    "Budapest",
    "Amsterdam",
    "Brussels",
    "Zurich",
    "Stockholm"
];

const getWeekDay = (dateString) => {
    const date = new Date(dateString);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return days[date.getDay()];
};

function getAirStatus(index) {
    switch(index) {
        case 1: return "Good";
        case 2: return "Moderate";
        case 3: return "Unhealthy for sensitive groups";
        case 4: return "Unhealthy";
        case 5: return "Very Unhealthy";
        case 6: return "Hazardous";
        default: return "No data";
    }
}

function getUVStatus(index){
    if(index <= 2) return "Low"
    if(index <= 5) return "Moderate"
    if(index <= 7) return "High"
    if(index <= 10) return "Very High"
    return "Extreme"
}


cities.forEach(el => {
    changeCityInput.innerHTML += `<option value="${el}">${el}</option>`
})

const setIcon = (url) => {
    currentIcon.src = url
}
const setTempC = (num) => {
    currentTempC.textContent = num
}
const setCityTitle = (text) => {
    currentCity.textContent = text
}
const setCityDay = (text) => {
    currentCityDay.textContent = text
}
const setWeatherTitle = (text) => {
    theWeatherText.textContent = text
}
const setWeatherIcon = (url) => {
    theWeatherIcon.src = url
}
const setWeatherOfMax = (text) => {
    theWeatherOfMax.textContent = text
}
const setWeatherOfMin = (text) => {
    theWeatherOfMin.textContent = text
}
const setHumidity = (text) => {
    currentCityHumidity.textContent = text
}
const setWild = (text) => {
    currentCityWild.textContent = text
}

// LIST
const setDayOfWeek = (selector, text) =>{
    const el = document.querySelector(selector)
    if(el){
        return el.textContent = text
    }
}
const setIconOfWeek = (selector, url) =>{
    const el = document.querySelector(selector)
    if(el){
        return el.src = url
    }
}

const setAirQualityNum = (text) => {
    airQualityNum.textContent = text
}

const setAirQualityText = (text) => {
    airQualityText.textContent = text
}

const setUVIndexNum = (text) => {
    uvIndexNum.textContent = text
}

const setUVIndexText = (text) => {
    uvIndexText.textContent = text
}

const setPressureNum = (text) => {
    pressureNum.textContent = text
}

const setPressureText = (text) => {
    pressureText.textContent = text
}



const getCurrentWeather = async (city = "Naryn") =>{
    const {data} = await axios(weatherAPI.getCurrent(city))
    setIcon(data.current.condition.icon)
    setTempC(`${data.current.temp_c} °C`)
    setCityTitle(`${data.location.name}`)
    setCityDay(`${getWeekDay(data.location.localtime)}`)
    setWeatherIcon(data.current.condition.icon)
    setWeatherTitle(`${data.current.condition.text}`)
    setHumidity(`${data.current.humidity}%`)
    setWild(`${data.current.wind_kph}kp/h`)

    setDayOfWeek(".list_content_title1", getWeekDay(data.location.localtime))
    setIconOfWeek(".list_content_icon1", data.current.condition.icon)
    setDayOfWeek(".list_content_temp1", data.current.temp_c + "°")

    setAirQualityNum(data.current.air_quality["us-epa-index"])
    setAirQualityText(getAirStatus(data.current.air_quality["us-epa-index"]))
    setUVIndexNum(data.current.uv)
    setUVIndexText(getUVStatus(data.current.uv))
    setPressureNum(data.current.pressure_mb)
    setPressureText("Normal pressure")

    return data
}
getCurrentWeather()


let humidityChart = null;
const renderHumidityChart = (labels, dataValues) => {
    const ctx = document.getElementById("humidityChart");

    if (humidityChart) {
        humidityChart.destroy();
    }

    humidityChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                borderColor: "#bfbfbf",
                borderWidth: 3,
                tension: 0.9,
                pointRadius: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // важно для уменьшенной высоты
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#888" }
                },
                y: {
                    min: 20,
                    max: 100,
                    ticks: {
                        color: "#888",
                        stepSize: 20,
                        callback: value => value + "%"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)",
                        borderDash: [5,5]
                    }
                }
            }
        }
    });
};



const weatherOfWeek = async(city = "Naryn") => {
    try{
        const resp = await axios(weatherAPI.getForecast(city, 7))
        weatherOfDay.innerHTML = ""
        resp.data.forecast.forecastday.forEach((el => {
            weatherOfDay.innerHTML += `
           <div class="list_of_week_content">
                        <p class="list_content_title2">${getWeekDay(el.date)}</p>
                        <img src=${el.day.condition.icon} class="list_content_icon2" alt="">
                        <p class="list_content_temp2">${el.day.maxtemp_c}°</p>
                    </div> 
        `
        }))
        setWeatherOfMin(`Min Temperature: ${resp.data.forecast.forecastday[0].day.mintemp_c} °C`)
        setWeatherOfMax(`Max Temperature: ${resp.data.forecast.forecastday[0].day.maxtemp_c} °C`)
        setDayOfWeek(".sunrise_time", resp.data.forecast.forecastday[0].astro.sunrise)
        setDayOfWeek(".sunset_time", resp.data.forecast.forecastday[0].astro.sunset)


        const hours = resp.data.forecast.forecastday[0].hour;
        const labels = hours
            .filter((_, index) => index % 3 === 0)
            .map(h => h.time.split(" ")[1]);

        const humidityData = hours
            .filter((_, index) => index % 3 === 0)
            .map(h => h.humidity);

        renderHumidityChart(labels, humidityData);

        return resp.data
    }catch(e){
        console.log(e.message)
    }
}
weatherOfWeek()

changeCityInput.addEventListener("change", (e) => {
    const {value} = e.target;
    if (value.length > 1){
        getCurrentWeather(value)
        weatherOfWeek(value)
    }
})

