
const apiKey = "a57495ef14064576af9184407260602"
const createAPI = (str) => {
    return `https://api.weatherapi.com/v1/${str}`
}

const weatherAPI = {
    getSports: (city) => createAPI(`sports.json?key=${apiKey}q=${city}`),
    getFuture: (city, dt) => createAPI(`future.json?key=${apiKey}q=${city}&dt=${dt}`),
    getCurrent: (city) => createAPI(`current.json?q=${city}&key=${apiKey}&aqi=no`)
}

const getFutureWeather = async (dt) => {
    const response = await axios(weatherAPI.getFuture("Bishkek", dt))
    return response.data
}


// const appendFutureWeather = (text) => {
//     header.textContent = text
// }
//
// input.addEventListener("change", async (event) => {
//     const res = await getFutureWeather(event.target.value)
//     appendFutureWeather(res)
// })
















const header = document.querySelector("header")
const changeCityInput = document.querySelector(".city_input")
const currentIcon = document.querySelector(".current_icon")
const currentCity = document.querySelector(".city")
const currentTempC = document.querySelector(".temp_c")

const cities = [
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

cities.forEach(el => {
    changeCityInput.innerHTML += `<option value="${el}">${el}</option>`
})

const getCurrentWeather = async (city = "Bishkek") =>{
    const resp = await axios(weatherAPI.getCurrent(city))
    const {data} = resp
    setIcon(data.current.condition.icon)
    setCityTitle(`${data.location.name}-${data.location.country}`)
    setTempC(`Температура в Цельсиях:${data.current.temp_c} Температура в Фаренгейтах:${data.current.temp_f}`)
    return resp.data
}
getCurrentWeather()

changeCityInput.addEventListener("change", (e) => {
    const {value} = e.target;
    if (value.length > 1){
        getCurrentWeather(value)
    }
})
const setIcon = (url) => {
    currentIcon.src = url
}
const setCityTitle = (text) => {
    currentCity.textContent = text
}
const setTempC = (num) => {
    currentTempC.textContent = num
}






const forecast = [
    {
        temp_c: 2,
        day: "1"
    },
    {
        temp_c: 1,
        day: "2"
    },
    {
        temp_c: 2,
        day: "3"
    },
    {
        temp_c: 1,
        day: "4"
    },
    {
        temp_c: 2,
        day: "5"
    },
    {
        temp_c: 1,
        day: "6"
    }
]

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
            data: forecast.map(el => el.temp_c),
            color: brandColor,
        },
    ],
    xaxis: {
        categories: forecast.map(el => el.day),
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
