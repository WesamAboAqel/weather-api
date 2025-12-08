import redis from "redis";
import express from "express";


const client = redis.createClient({
    socket: {
        port: 6379,
        host: "redis"
    }
});

const app = express();

const getWeather = async (request,response,next) => {

    try {
        const {country} = request.params;

        console.log(country);
        const firstDate = new Date(1-12-2025);
        console.log(firstDate);

        const startDate = `${firstDate.getFullYear()}-${firstDate.getMonth()}-${firstDate.getDate()}`;
        console.log(startDate);

        const secondDate = new Date(2025-12-2);
        const endDate = `${secondDate.getFullYear()}-${secondDate.getMonth()}-${secondDate.getDate()}`;

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${startDate}/${endDate}?key=${process.env.WEATHER_API}`;

        console.log(url);

        const rawData = await fetch(url);

        // console.log(rawData)
        const data = await rawData.json();
        console.log(data);

        return response.status(200).json(data)
        
    } catch (error) {
        console.log(error)
    }

    
}

app.get("/:country", getWeather);



app.listen(3000,"0.0.0.0", async () => {
    await client.connect();

    console.log("Server is listening on port 3000 !");
})




