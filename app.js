const path = require('path');
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouters = require('./routes/admin');

app.use(bodyParser.urlencoded({extend: "false"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRouters);

app.use(errorController.get404);

app.listen(port);
