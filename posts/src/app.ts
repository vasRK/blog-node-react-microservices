import express from 'express';
import bodyParser from 'body-parser';
import randomBytes from 'crypto';
import { BlogPost } from './models/blog-post';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//app.use(bodyParser);

const port = 4000;
const blogPosts = new Map<string, BlogPost>();
app.get('/posts', (req, res) => {
    const posts = [...blogPosts.values()];
    res.send(posts);
});

app.get('/', (req, res) => {
    console.log("main hit");
    res.send("Hola!");
});

app.post('/posts', (req, res) => {
    const id = randomBytes.randomBytes(4).toString('hex');
    const { title } = req.body;
    const blogpost = new BlogPost();
    blogpost.id = id;
    blogpost.title = title;
    console.log("post saved");
    console.log(blogpost);

    blogPosts.set(id, blogpost)
    res.status(201).send(blogpost);
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});