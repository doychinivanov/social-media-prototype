const router = require('express').Router();
const {getAllUsersContainingUsername} = require('../services/userService');
const {isUser, isGuest} = require('../middlewares/guards');


router.get('/feed', isUser(), (req, res)=>{
    res.render('authViews/userHome');
});

router.get('/search', async (req,res)=>{
    const data = await getAllUsersContainingUsername(req.query.username);
    const people = data.map(x => x.username);
    const ctx = {
        people
    }
    res.render('authViews/userSearch', ctx);
});

module.exports = router;