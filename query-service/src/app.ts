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

const port = 4003;
app.get('/', (req, res) => {
    console.log("main hit query service");
    res.send("Hola! query service");
});

app.post('/events', (req, res) => {
    const eventInfo = req.body;

    console.log("Event Occured");
    console.log(eventInfo);

    res.send({ status: 'OK' });
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`query service is listening on ${port}`);
});