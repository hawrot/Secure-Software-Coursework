const Bug = require('../models/bugs');
const bodyParser = require('body-parser');
const User = require('../models/user');


exports.getAddBug = (req, res, next) =>{
    res.render('add-bug', {
      pageTitle : 'Add a bug',
      path : '/add-bug'
  }) ;
};


exports.postAddBug = (req, res, next) =>{
    const title = req.body.title;
    const description = req.body.description;
    const assignedTo = req.body.assignedTo;
    const assignedBy = req.body.assignedBy;
    const status = req.body.status;
    const priority = req.body.priority;



    const bug = new Bug({title, description, assignedTo, assignedBy, status, priority});
    console.log(bug);
    bug.save().then(result =>{
        console.log(result);
        res.redirect('/view-bug');
    })
        .catch(err =>{
            console.log(err);
        });

};

exports.getBugs = (req,res,next) =>{
    Bug.find().then(bugs =>{
        console.log(bugs);
        res.render('view-bug', {
            bugs: bugs,
            pageTitle: 'Bugs',
            path: '/view-bug'
        });
    });
};
