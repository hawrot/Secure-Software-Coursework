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

exports.postAddBug = (req, res, next) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();

    const title = req.body.title;
    const description = req.body.description;
    const assignedTo = req.body.assignedTo;
    const assignedBy = req.session.user.fullName;
    const status = req.body.status;
    const priority = req.body.priority;

    const bug = new Bug({title, description, date, time, assignedTo, assignedBy, status, priority});
    bug.save().then(result => {
        console.log(result);
        res.redirect('/');
    })
        .catch(err => {
            console.log(err);
        });
};

exports.getBugs = (req, res, next) => {
    Bug.find().then(bugs => {
        res.render('view-bug', {
            bugs: bugs,
            pageTitle: 'Dashboard',
            path: '/view-bug',

        });
    });
};

exports.postDeleteBug = (req, res, next) => {
    const bugId = req.body.bugID;
    console.log(bugId);
    Bug.findByIdAndRemove(bugId).then(() => {
        console.log('DESTROYED BUG');
        res.redirect('/');
    }).catch(err => console.log(err));
};

exports.viewComments = (req, res, next) => {
    const bugId = req.params.bugID;
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    Bug.find().then(bugs => {
        res.render('view-comments', {
            bugs: bugs,
            pageTitle: 'Comments',
            path: '/view-comments',
            bugId: bugId,
            errorMessage: message
        });
    });
};

exports.postComment = (req, res, next) => {
    const bugId = req.body.bugID;
    const name = req.session.user.fullName;
    const content = req.body.content;
    Bug.findById(bugId).then(bug => {
        if (bug.status === 'Closed'){
            console.log('bug is closed!');
            req.flash('error', 'Ticket is closed, cannot add comments!');
            res.redirect('view-comments/' + bugId);
        }else {
            return bug.addComment(name, content, bugId);
        }

    })
        .then(result => {
            res.redirect('view-comments/' + bugId);

        });
};
