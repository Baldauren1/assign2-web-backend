let map;

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/weather?city=${city}`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    document.getElementById("result").innerHTML = `
      <h2>${data.city}, ${data.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" />
      <p><strong>Temperature:</strong> ${data.temperature}°C</p>
      <p><strong>Feels like:</strong> ${data.feels_like}°C</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Humidity:</strong> ${data.humidity}%</p>
      <p><strong>Pressure:</strong> ${data.pressure} hPa</p>
      <p><strong>Wind speed:</strong> ${data.wind_speed} m/s</p>0
      <p><strong>Rain (last 3h):</strong> ${data.rain_last_3h} mm</p>
    `;

    if (map) {
      map.remove(); 
    }

    map = L.map("map").setView(
      [data.coordinates.lat, data.coordinates.lon],
      10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([data.coordinates.lat, data.coordinates.lon])
      .addTo(map)
      .bindPopup(`${data.city}`)
      .openPopup();

    getNews("us");
    getCurrency();

  } catch (error) {
    document.getElementById("result").innerHTML =
      `<p style="color:red;">${error.message}</p>`;
  }
}

async function getNews(country) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/news?country=${country}`
    );
    const data = await res.json();

    const newsList = document.getElementById("news");
    newsList.innerHTML = "";

    data.articles.slice(0, 5).forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${article.url}" target="_blank">
          ${article.title}
        </a>
      `;
      newsList.appendChild(li);
    });
  } catch (error) {
    console.error("News error:", error.message);
  }
}

async function getCurrency() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/currency?currency=KZT"
    );
    const data = await res.json();

    document.getElementById("currency").innerHTML = `
      <p>1 USD = ${data.rate} ${data.currency}</p>
    `;
  } catch (error) {
    console.error("Currency error:", error.message);
  }
}

document.getElementById("btn").addEventListener("click", getWeather);
