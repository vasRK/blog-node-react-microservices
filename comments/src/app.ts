import express from 'express';
import bodyParser from 'body-parser';
import randomBytes from 'crypto';
import { PostComment } from './models/comment';
import cors from 'cors';
import { BlogPost } from '../../posts/src/models/blog-post';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const port = 4001;
const blogPostComments = new Map<string, Array<PostComment>>();
app.get('/posts/:id/comments', (req, res) => {
    const bp = new BlogPost();
    res.send(blogPostComments.get(req.params.id) || []);
});

app.get('/', (req, res) => {
    console.log("main hit comments service");
    res.send("Hola! comments");
});

app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes.randomBytes(4).toString('hex');
    const { text } = req.body;
    const comment = new PostComment();
    comment.id = id;
    comment.text = text;
    console.log("comment saved");
    console.log(comment);
    const comments = blogPostComments.get(req.params.id) || new Array<PostComment>();
    comments.push(comment);
    blogPostComments.set(req.params.id, comments)
    res.status(201).send(comments);
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`comment server is listening on ${port}`);
});