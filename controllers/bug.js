const Bug = require('../models/bugs');
const bodyParser = require('body-parser');

exports.getAddBug = (req, res, next) =>{
  res.render('add-bug', {
      pageTitle : 'Add a bug',
      path : '/add-bug'
  }) ;
};


exports.postAddBug = (req, res, next) =>{
    const bugs = new Bug(
        req.body.name,
        req.body.desc,
        req.body.date,
        req.body.assignedTo,
        req.body.assignedBy
    );
    console.log(bugs);
    bugs.save();
    res.redirect('/view-bug');
};
