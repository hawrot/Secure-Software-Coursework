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

app.use(adminRouters);

/*app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
});*/

app.use(errorController.get404);

app.listen(port);
