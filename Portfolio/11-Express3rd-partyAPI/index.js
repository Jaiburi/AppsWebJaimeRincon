const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Add these middleware configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require('dotenv').config();
const apiKey = process.env.KEY;

// Serve the HTML form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle the form submission
app.post("/", (req, res) => {
    const query = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        let data = '';

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            try {
                const weatherData = JSON.parse(data);

                if (weatherData.cod === "404") {
                    // City not found
                    res.write('<html><body>');
                    res.write(`<h1>Error: City Not Found</h1>`);
                    res.write(`<p>We couldn't find weather data for "${query}". Please check the city name and try again.</p>`);
                    res.write('<br><a href="/">Back to Home</a>');
                    res.write('</body></html>');
                    res.send();
                } else if (response.statusCode === 200) {
                    // Successful response
                    const temp = weatherData.main.temp;
                    const description = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    res.write('<html><body>');
                    res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius</h1>`);
                    res.write(`<p>The weather is currently ${description}</p>`);
                    res.write(`<img src="${imageURL}">`);
                    res.write('<br><a href="/">Back to Home</a>');
                    res.write('</body></html>');
                    res.send();
                } else {
                    throw new Error('Unexpected response from weather API');
                }
            } catch (error) {
                res.write('<html><body>');
                res.write('<h1>Error</h1>');
                res.write(`<p>An unexpected error occurred: ${error.message}</p>`);
                res.write('<br><a href="/">Back to Home</a>');
                res.write('</body></html>');
                res.send();
            }
        });
    }).on('error', (error) => {
        res.write('<html><body>');
        res.write('<h1>Error</h1>');
        res.write(`<p>A network error occurred: ${error.message}</p>`);
        res.write('<br><a href="/">Back to Home</a>');
        res.write('</body></html>');
        res.send();
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});