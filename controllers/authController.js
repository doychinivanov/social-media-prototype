const router = require('express').Router();

router.get('/register', (req, res)=>{
    res.render('authViews/register');
});

router.post('/register', async (req,res)=>{
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

router.get('/login', (req, res)=>{
    res.render('authViews/login');
});

router.post('/login', async (req,res)=>{
    try{
        await req.auth.login(req.body.email.trim(), req.body.password.trim());
        console.log('success');
        res.redirect('/');
    } catch(err){
        console.log(err.message);
    }
});

module.exports = router;