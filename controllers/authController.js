const router = require('express').Router();
const {isUser, isGuest} = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res)=>{
    res.render('authViews/register');
});

router.post('/register', isGuest(), async (req,res)=>{
    const userData = {
        email: req.body.email.trim(),
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        birthday: req.body.birthday,
        profilePicture: req.body.profilePicture,
        isPrivate: req.body.isPrivate
    };

    try{
        await req.auth.register(userData);
        console.log('success');
        res.redirect('/');
    } catch(err){
        console.log(err.message);
    }
});

router.get('/login', isGuest(), (req, res)=>{
    res.render('authViews/login');
});

router.post('/login', isGuest(), async (req,res)=>{
    try{
        await req.auth.login(req.body.email.trim(), req.body.password.trim());
        res.redirect('/');
    } catch(err){
        console.log(err.message);

        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                email: req.body.email
            }
        };

        res.render('authViews/login', ctx);
    }
});

router.get('/logout', isUser(), (req,res)=>{
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;