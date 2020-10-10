import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { EventInfo, EventType, PostComment } from 'blog-common/lib';
import { CommentState } from 'blog-common/lib/models/post-comment';
import axios from 'axios';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const port = 4004;

app.get('/', (req, res) => {
    console.log("main hit comments service");
    res.send("Hola! comments");
});

app.post('/events', async (req, res) => {
    const eventInfo: EventInfo = req.body;
    console.log("eventInfo: moderation-service");
    console.log(eventInfo);

    if (eventInfo.type === EventType.CommentCreated) {
        const comment: PostComment = eventInfo.eventData;
        comment.state = comment.text.includes('orange') ? CommentState.Rejected : CommentState.Aprooved;
        eventInfo.type = EventType.CommentModerated;

        await axios.post('http://localhost:4005/events', eventInfo);
    }

    res.send({});
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`moderation server is listening on ${port}`);
});