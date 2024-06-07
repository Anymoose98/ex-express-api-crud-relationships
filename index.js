const express = require("express");
const postRouter = require("./router/postRouter");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("<h1>Prova<h1>")
})

app.use(express.json());

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Server http://localhost:${port}`)
})