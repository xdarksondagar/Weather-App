const input = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const temp_real_val = document.getElementById("temp");
const form = document.getElementById("form");
const weather = document.querySelector(".weather");

async function getData() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=34cdcdcc466ada8f24a285b3c7d5f2ee&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  input.value = "";
  if (url.staus !== 200) {
    weather.innerHTML = `<p class="placeholder">${data.message}</p>`;
  }
  createWeather(data);
}

const createWeather = (data) => {
  const tempMood = data.weather[0].main;
  const HTML = `
    <div>
      <p class="city__name">${data.name}, ${data.sys.country}</p>
      <h2 class="temp">${data.main.temp} <sup>o</sup>C</h2>
    </div>
    <p class="temp__status">${getTempCondition(tempMood)}</p>
  `;

  weather.innerHTML = HTML;
};

const getTempCondition = (tempMood) => {
  if (tempMood === "Clear") {
    return "<i class='fas fa-sun' style='color: #fccc5a;'></i>";
  } else if (tempMood === "Clouds") {
    return "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
  } else if (tempMood === "Rain") {
    return "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
  } else {
    return "<i class='fas fa-sun' style='color: #eccc68;'></i>";
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData();
});

// https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=34cdcdcc466ada8f24a285b3c7d5f2ee&units=metric
