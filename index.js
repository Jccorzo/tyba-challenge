const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/locations');
const middlewares = require('./middlewares/validation');

app.use('*', middlewares.validateLogin)
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.url,{
    useNewUrlParser:true
}).then(()=> {
    console.log("conexion exitosa con la base de datos");
}).catch( err => {
    console.log('no se pudo conectar a la base de datos',  err);
    process.exit();
});

userRoutes(app);
locationRoutes(app);

app.listen(3000, () => {
    console.log("App started")
})