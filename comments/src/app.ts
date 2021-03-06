import express from 'express';
import bodyParser from 'body-parser';
import randomBytes from 'crypto';
import cors from 'cors';
import axios from 'axios';
import { BlogPost, EventInfo, EventType, PostComment } from 'blog-common';
import { CommentState } from 'blog-common/lib/models/post-comment';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const port = 4001;
//PostId, List of comments
const blogPostComments = new Map<string, Array<PostComment>>();
app.get('/posts/:id/comments', (req, res) => {
    const bp = new BlogPost();
    res.send(blogPostComments.get(req.params.id) || []);
});

app.get('/', (req, res) => {
    console.log("main hit comments service");
    res.send("Hola! comments");
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes.randomBytes(4).toString('hex');
    const { text } = req.body;
    const comment = new PostComment();
    comment.id = id;
    comment.text = text;
    comment.postId = req.params.id;
    comment.state = CommentState.Pending;

    console.log("comment saved");
    console.log(comment);
    const comments = blogPostComments.get(req.params.id) || new Array<PostComment>();
    comments.push(comment);
    const eventInfo = new EventInfo(EventType.CommentCreated, comment);
    blogPostComments.set(req.params.id, comments);

    await axios.post('http://event-bus-clusterip-srv:4005/events', eventInfo);
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const eventInfo: EventInfo = req.body;
    console.log("eventInfo: comment-service");
    console.log(eventInfo);

    if (eventInfo.type === EventType.CommentModerated) {
        const updatedComment: PostComment = eventInfo.eventData;
        const comments = blogPostComments.get(updatedComment.postId);
        const index = comments.findIndex(cmt => cmt.id === updatedComment.id);
        comments[index] = updatedComment;
        eventInfo.type = EventType.CommentUpdated;
        await axios.post('http://event-bus-clusterip-srv:4005/events', eventInfo);
    }
    res.send({});
});

app.listen(port, (err?: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`comment server is listening on ${port}`);
});