const express = require('express');

const app = express();

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(postRouter);

app.listen(8080, () => {
    console.log(`Server is running at ${8080}`)
})



