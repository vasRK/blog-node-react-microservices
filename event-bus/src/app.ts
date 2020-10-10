import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { EventInfo } from 'blog-common/lib';

const app = express();

const allEvents = new Array<EventInfo>();

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

app.post('/events', async (req, res) => {
    const eventInfo = req.body;

    console.log("Event Occured:event-bus");
    console.log(eventInfo);

    allEvents.push(eventInfo);

    //Post service
    await axios.post('http://localhost:4000/events', eventInfo);
    //Comment service
    await axios.post('http://localhost:4001/events', eventInfo);
    //Query service
    await axios.post('http://localhost:4003/events', eventInfo);
    //Moderation service
    await axios.post('http://localhost:4004/events', eventInfo);
    res.send({ status: 'OK' });
});

app.get('/events', async (req, res) => {
    res.send(allEvents);
});

app.listen(port, async (err?: any) => {
    if (err) {
        return console.error(err);
    }

    return console.log(`event-bus server is listening on ${port}`);
});