const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs').promises;
const {body, validationResult} = require('express-validator');
const {isUser, isGuest} = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');
const {uploadToS3} = require('../services/s3');

router.get('/register', isGuest(), (req, res)=>{
    res.render('authViews/register');
});

router.post('/register', isGuest(), upload.single('profilePicture'),
body('username').isLength({min:4}).withMessage('Username must be at least 4 characters!').bail().isAlphanumeric().withMessage('Username must contain only digits and letters from the English alphabet!'),
body('email').isEmail().withMessage('Please enter a valid email!'),
body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long!').bail().isAlphanumeric().withMessage('Passowrd cannot contain special characters!'),
body('rePass').custom((value, {req})=>{if(value != req.body.password){throw new Error('Passwords don\'t match!')} return true}),
 async (req,res)=>{
    const {errors} = validationResult(req);

    // const file = req.file;

    const userData = {
        email: req.body.email.trim(),
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        birthday: req.body.birthday || null,
        isPrivate: req.body.isPrivate,
        profilePicture: req.file ? true : false
    };

    try{
        if(errors.length > 0){
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }
        
        const id = await req.auth.register(userData);
        if(userData.profilePicture){
            await fs.rename(`./uploads/${req.file.filename}`, `./uploads/${id}`);
    
            await uploadToS3(`./uploads/${id}`, id);
        }

        res.redirect('/user/feed');
    } catch(err){
        console.log(err);
        const ctx = {
            errors: errorParser(err),
            userData
        };

        res.render('authViews/register', ctx);
    }
});

router.get('/login', isGuest(), (req, res)=>{
    res.render('authViews/login');
});

router.post('/login', isGuest(),
body('email').notEmpty().withMessage('All fields are required!').bail(),
body('password').notEmpty().withMessage('All fields are required!'),
 async (req,res)=>{

    const {errors} = validationResult(req);

    try{
        if(errors.length > 0){
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }

        await req.auth.login(req.body.email.trim(), req.body.password.trim());
        res.redirect('/user/feed');
    } catch(err){
        const ctx = {
            errors: errorParser(err),
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