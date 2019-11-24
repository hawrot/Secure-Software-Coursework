const Bug = require('../models/bugs');
const bodyParser = require('body-parser');

exports.getAddBug = (req, res, next) =>{
  res.render('add-bug', {
      pageTitle : 'Add a bug',
      path : '/add-bug'
  }) ;
};


exports.postAddBug = (req, res, next) =>{
    const name =  req.body.name;
    const desc =  req.body.desc;
    const date =  req.body.date;
    const assignedTo = req.body.assignedTo;
    const assignedBy = req.body.assignedBy;
    const status = req.body.status;
    const priority = req.body.priority;

    let bug = new Bug(name, desc, date, assignedTo, assignedBy, status, priority);
    console.log(bug);
    bug.save();
    res.redirect('/view-bug');
};

exports.getBugs = (req,res,next) =>{
  Bug.fetchAll().then(bugs =>{
     res.render('view-bug', {
         bugs: bugs,
         pageTitle: 'Bugs',
         path: '/view-bug'
     });
  });
};
