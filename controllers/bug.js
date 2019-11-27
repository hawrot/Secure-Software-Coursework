const Bug = require('../models/bugs');
const bodyParser = require('body-parser');
const User = require('../models/user');



exports.getAddBug = async (req, res, next) => {
    res.render('add-bug', {
            pageTitle: 'Add a bug',
            path: '/add-bug',
            user: req.session.user.fullName,
            allUsers: await User.find()
        }
    )
};


exports.postAddBug = (req, res, next) =>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();


    const title = req.body.title;
    const description = req.body.description;
    const assignedTo = req.body.assignedTo;
    const assignedBy = req.session.user.fullName;
    const status = req.body.status;
    const priority = req.body.priority;



    const bug = new Bug({title, description, date, time, assignedTo, assignedBy, status, priority});
    bug.save().then(result =>{
        console.log(result);
        res.redirect('/');
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
            pageTitle: 'Dashboard',
            path: '/view-bug',

        });
    });
};

exports.postDeleteBug = (req, res, next) =>{
    const bugId = req.body.bugID;
    console.log(bugId);
    Bug.findByIdAndRemove(bugId).then(()=>{
        console.log('DESTROYED BUG');
        res.redirect('/');
    }).catch(err => console.log(err));
};

exports.viewComments = (req, res, next) =>{
    const bugId = req.params.bugID;
    Bug.find().then(bugs =>{
        console.log(bugs);
        res.render('view-comments', {
            bugs: bugs,
            pageTitle: 'Comments',
            path: '/view-comments',
            bugId : bugId

        });
    });

};

exports.postComment =  (req,res,next) =>{
    const bugId = req.body.bugID;
    const name = req.session.user.fullName;
    const content = req.body.content;
    const prod = {name, content};

    Bug.findById(bugId).then(bug =>{
        return bug.addComment(prod);
    })
        .then(result =>{
            console.log(result);
        });


};
