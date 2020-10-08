import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { EventInfo, EventType, BlogPost, PostComment } from 'blog-common';

const app = express();

const blogPostMap = new Map<string, BlogPost>();

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

app.get('/posts', (req, res) => {
    const allPosts = [...blogPostMap.values()];
    res.send(allPosts);
});

app.post('/events', (req, res) => {
    const eventInfo: EventInfo = req.body;

    console.log(eventInfo.type + ": Event Occured");
    console.log(eventInfo.type + ": query service");
    console.log(eventInfo);

    if (eventInfo.type === EventType.PostCreated) {
        const blogPost: BlogPost = eventInfo.eventData;
        blogPost.comments = [];
        blogPostMap.set(blogPost.id, blogPost);
    }

    if (eventInfo.type === EventType.CommentCreated) {
        const comment: PostComment = eventInfo.eventData;
        const blogPost = blogPostMap.get(comment.postId);
        blogPost.comments.push(comment);
    }

    res.send({ status: 'OK' });
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`query service is listening on ${port}`);
});