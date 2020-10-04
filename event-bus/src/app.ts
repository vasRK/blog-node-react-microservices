import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const port = 4005;
app.get('/', (req, res) => {
    console.log("main hit event bus service");
    res.send("Hola! event-bus");
});

app.post('/events', (req, res) => {
    const eventInfo = req.body;

    console.log("Event Occured");
    console.log(eventInfo);

    axios.post('http://localhost:4000/events', eventInfo);
    axios.post('http://localhost:4001/events', eventInfo);
    axios.post('http://localhost:4002/events', eventInfo);

    res.send({ status: 'OK' });
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`event-bus server is listening on ${port}`);
});