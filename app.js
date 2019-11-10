const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();

const adminRouters = require('./routes/admin');

app.use(bodyParser.urlencoded());
app.use('', adminRouters);





app.listen(port);
