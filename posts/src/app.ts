import express from 'express';
import bodyParser from 'body-parser';
import randomBytes from 'crypto';
import cors from 'cors';
import axios from 'axios';
import { BlogPost, EventInfo, EventType } from 'blog-common';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
const port = 4000;
const blogPosts = new Map<string, BlogPost>();
app.get('/posts', (req, res) => {
    const posts = [...blogPosts.values()];
    console.log('returning posts' + posts.length);
    res.send(posts);
});

app.get('/', (req, res) => {
    console.log("main hit");
    res.send("Hola! post service");
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes.randomBytes(4).toString('hex');
    const { title } = req.body;

    const blogPost = new BlogPost();
    blogPost.id = id;
    blogPost.title = title;
    console.log("post saved");
    console.log(blogPost);

    const eventInfo = new EventInfo(EventType.PostCreated, blogPost);
    blogPosts.set(id, blogPost);

    await axios.post('http://event-bus-clusterip-srv:4005/events', eventInfo);

    res.status(201).send(blogPost);
});

app.post('/events', (req, res) => {
    const eventInfo = req.body;

    console.log("eventInfo: post-service");
    console.log(eventInfo);
    res.send({});
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});