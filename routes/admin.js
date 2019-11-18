const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');



router.use('/view-bug', (req,res,next)=>{
    res.sendFile(path.join(rootDir, 'views', 'view-bug.html'));
});

router.use('/', (req,res,next)=>{
   res.sendFile(path.join(rootDir, 'views', 'index.html'));

});



module.exports = router;

