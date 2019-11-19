const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const bugController = require('../controllers/bug');



router.get('/view-bug',(req,res,next)=>{
    res.render('view-bug', {
       pageTitle: 'View Bugs',
        path: 'view-bug'
    });
});

router.get('/add-bug', bugController.getAddBug);

router.get('/', (req,res,next)=>{
   res.render('index', {
       pageTitle: 'Index',
       path: '/'
   });

});

module.exports = router;

