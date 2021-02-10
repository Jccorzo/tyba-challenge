const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/locations');
const middlewares = require('./middlewares/validation');

app.use('*', middlewares.validateLogin)
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userRoutes(app);
locationRoutes(app);

app.listen(3000, () => {
    console.log("App started")
})