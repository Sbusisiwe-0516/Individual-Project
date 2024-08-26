<script>
function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById("location").innerHTML = `Latitude: ${lat}, Longitude: ${lon}`;
            getWeather(lat, lon);
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    document.getElementById("location").innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    document.getElementById("location").innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    document.getElementById("location").innerHTML = "An unknown error occurred.";
                    break;
                default:
                    document.getElementById("location").innerHTML = "An unexpected error occurred.";
                    break;
            }
        }

        function getWeather(lat, lon) {
            const apiKey = '62a5721cd0edbb162ceb558b4d425922'; // Replace with your API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const temp = data.main.temp;
                    const weatherDescription = data.weather[0].description;
                    document.getElementById("weather").innerHTML = `Temperature: ${temp}°C, Weather: ${weatherDescription}`;
                })
                .catch(error => {
                    document.getElementById("weather").innerHTML = "Unable to retrieve weather data.";
                    console.error("Error fetching weather data:", error);
                });
        }
    </script>