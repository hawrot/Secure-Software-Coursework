const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const bugController = require('../controllers/bug');
const isAuth = require('../middleware/is-auth');



router.post('/add-bug',isAuth, bugController.postAddBug);

router.get('/add-bug',isAuth, bugController.getAddBug);
router.post('/delete-bug', isAuth, bugController.postDeleteBug);
router.post('/close-status', isAuth, bugController.closeBugTicket);
router.post('/open-status', isAuth, bugController.openBugTicket);

router.get('/view-comments/:bugID', isAuth, bugController.viewComments);
router.post('/post-comment', isAuth, bugController.postComment);

router.get('/',isAuth, bugController.getBugs);


module.exports = router;

