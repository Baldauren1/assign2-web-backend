async function getWeather() {
  const city = document.getElementById("city").value;

  const res = await fetch(
    `http://localhost:3000/api/weather?city=${city}`
  );
  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <h2>${data.city}</h2>
    <p>${data.temperature}°C</p>
    <p>${data.description}</p>
  `;
}
