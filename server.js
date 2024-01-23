import express from "express";
import axios from "axios";

const app = express();
const port = 3000

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const {city, country}  = req.query
  // const country = req.query.country
  const apiKey = "0f0e613de8ee279c8a88e22e553b22f1";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
    console.log(response.data)
  } catch (error) {
    weather = null;
    res.status(404).send(error.message);
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})