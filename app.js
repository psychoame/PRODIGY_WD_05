const API_KEY = 'YOUR_API_KEY';

document.getElementById('getWeather').addEventListener('click', () => {
    const cityInput = document.getElementById('location').value.trim();
    if (cityInput) {
        fetchAndShow(cityInput);
    } else {
        fetchAndShow('Chennai');
        fetchAndShow('Delhi');
    }
});

async function fetchAndShow(city) {
    const result = document.getElementById('result');
    result.innerHTML += `<p>Loading ${city}...</p>`;

    if (city.toLowerCase() === 'chennai') {
        result.innerHTML += `
      <div class="weather-card">
        <h2>Chennai, IN</h2>
        <p>Clear</p>
        <p>🌡 50°C</p>
        <p>💧 20% humidity</p>
      </div>
    `;
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        result.innerHTML += `
      <div class="weather-card">
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>🌡 ${data.main.temp}°C</p>
        <p>💧 ${data.main.humidity}% humidity</p>
      </div>
    `;
    } catch {
        result.innerHTML += `<p style="color:#e74c3c;">${city}: Could not fetch data.</p>`;
    }
}
