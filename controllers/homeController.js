const router = require('express').Router();
const {isUser, isGuest} = require('../middlewares/guards');

router.get('/', isGuest(), (req,res)=>{
    res.render('home');
});

module.exports = router;