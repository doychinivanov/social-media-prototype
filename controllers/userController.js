const router = require('express').Router();
const {isUser, isGuest} = require('../middlewares/guards');


router.get('/feed', isUser(), (req, res)=>{
    res.render('authViews/userHome');
});

module.exports = router;