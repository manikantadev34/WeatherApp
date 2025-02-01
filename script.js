const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');

    if (!city) {
        errorMessage.textContent = 'Please enter a city';
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
        return;
    }

    errorMessage.style.display = 'none';

    try {
        // Use Axios to fetch data
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });

        // Handle the response if successful
        const data = response.data;

        weatherInfo.style.display = 'block';
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('date').textContent = new Date().toLocaleString();
        document.getElementById('temperature').textContent = `${data.main.temp}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
    } catch (error) {
        // Handle error if the city is not found or if there is an issue with the request
        errorMessage.textContent = 'Error fetching data';
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
}

function clearInput() {
    document.getElementById('city').value = '';
    document.getElementById('weather-info').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}
