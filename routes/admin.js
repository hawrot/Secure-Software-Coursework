const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');



router.use('/', (req,res,next)=>{
   res.sendfile(path.join(rootDir, 'views', 'index.html' ));
});


module.exports = router;

