
const apiKey = "a57495ef14064576af9184407260602"
const createAPI = (str) => {
    return `https://api.weatherapi.com/v1/${str}`
}

const weatherAPI = {
    getSports: (city) => createAPI(`sports.json?key=${apiKey}q=${city}`),
    getFuture: (city, dt) => createAPI(`future.json?key=${apiKey}q=${city}&dt=${dt}`),
    getCurrent: (city) => createAPI(`current.json?q=${city}&key=${apiKey}&aqi=no`),
    getForecast: (city) => createAPI(`forecast.json?key=${apiKey}&q=${city}&days=${day}&aqi=no&alerts=no`)
}


const header = document.querySelector("header")
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


const getCurrentWeather = async (city = "Naryn") =>{
    const resp = await axios(weatherAPI.getCurrent(city))
    const {data} = resp
    setIcon(data.current.condition.icon)
    setTempC(`${data.current.temp_c} °C`)
    setCityTitle(`${data.location.name}`)
    setCityDay(`${getWeekDay(data.location.localtime)}`)
    setWeatherIcon(data.current.condition.icon)
    setWeatherTitle(`${data.current.condition.text}`)
    setHumidity(`${data.current.humidity}%`)
    setWild(`${data.current.wind_kph}kp/h`)
    return resp.data
}
getCurrentWeather()


changeCityInput.addEventListener("change", (e) => {
    const {value} = e.target;
    if (value.length > 1){
        getCurrentWeather(value)
    }
})























// Get the CSS variable --color-brand and convert it to hex for ApexCharts
const getBrandColor = () => {
    // Get the computed style of the document's root element
    const computedStyle = getComputedStyle(document.documentElement);

    // Get the value of the --color-brand CSS variable
    return computedStyle.getPropertyValue('--color-fg-brand').trim() || "#1447E6";
};

const brandColor = getBrandColor();

const options = {
    chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: brandColor,
            gradientToColors: [brandColor],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0
        },
    },
    series: [
        {
            name: "New users",
            data: [6500, 6418, 6456, 6526, 6356, 6456],
            color: brandColor,
        },
    ],
    xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
}

if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("area-chart"), options);
    chart.render();
}
