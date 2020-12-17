const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const session = require('express-session')
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(indexRouter);

app.listen(port, () => {
    console.log(`app listen to localhost:${port}`);
})