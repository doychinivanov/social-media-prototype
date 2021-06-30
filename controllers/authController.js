const router = require('express').Router();

router.get('/register', (req, res)=>{
    res.render('authViews/register');
});

router.post('/register', (req,res)=>{
    console.log(req.body);
});

router.get('/login', (req, res)=>{
    res.render('authViews/login');
});

router.post('/login', (req,res)=>{
    console.log(req.body);
});

module.exports = router;