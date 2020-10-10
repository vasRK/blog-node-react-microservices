import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { EventInfo, EventType, BlogPost, PostComment } from 'blog-common';

const app = express();
//PostId, BlogPost
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
    handleEvent(eventInfo);

    res.send({ status: 'OK' });
});

app.listen(port, async (err?: any) => {
    if (err) {
        return console.error(err);
    }

    const response = await axios.get('http://localhost:4005/events') ;
    const allEvents : Array<EventInfo> = response.data || []
    allEvents.forEach(eventInfo => handleEvent(eventInfo));

    return console.log(`query service is listening on ${port}`);
});

const handleEvent = (eventInfo: EventInfo) => {
    console.log(eventInfo.type + ": Event Occured");
    console.log(eventInfo.type + ": query service");
    console.log(eventInfo);

    if (eventInfo.type === EventType.PostCreated) {
        const blogPost: BlogPost = eventInfo.eventData;
      
        if( [...blogPostMap.keys()].indexOf( blogPost.id) != -1){
            blogPostMap.set(blogPost.id, blogPost);
            blogPost.comments = [];
        }
    }

    if (eventInfo.type === EventType.CommentCreated) {
        const comment: PostComment = eventInfo.eventData;
        const blogPost = blogPostMap.get(comment.postId);

        let lastIndex = blogPost.comments.findIndex(cmt => cmt.id == comment.id);
        if(lastIndex === -1){
            blogPost.comments.push(comment);
        }
    }

    if (eventInfo.type === EventType.CommentUpdated) {
        const comment: PostComment = eventInfo.eventData;
        const blogPost = blogPostMap.get(comment.postId);

        let updateIndex = blogPost.comments.findIndex(cmt => cmt.id === comment.id);
        blogPost.comments[updateIndex] = comment;
    }
}