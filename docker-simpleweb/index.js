const express = require("express");

const port = 5007;
const app = express();
app.get('/', (req, res) => {
    res.send("Hola! simple-web2");
});


app.listen(port, (err) =>  {
    if (err) {
        return console.error(err);
    }
    return console.log(`event-bus server is listening on ${port}`);
});