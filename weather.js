document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const city = cityInput.value.trim();
        if (city) {
            try {
                const apiKey = '54be552a5b9c4a28aea221901241008'; // Replace with your WeatherAPI key
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
                const data = await response.json();

                // Log the response to inspect the data
                console.log(data);

                if (data && data.current) {
                    cityName.textContent = data.location.name;
                    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
                    weatherDescription.textContent = `Weather: ${data.current.condition.text}`;
                    humidity.textContent = `Humidity: ${data.current.humidity}%`;
                    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
                } else {
                    cityName.textContent = 'City not found';
                    temperature.textContent = '';
                    weatherDescription.textContent = '';
                    humidity.textContent = '';
                    windSpeed.textContent = '';
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                cityName.textContent = 'Error fetching data';
                temperature.textContent = '';
                weatherDescription.textContent = '';
                humidity.textContent = '';
                windSpeed.textContent = '';
            }
        }
    });
});
