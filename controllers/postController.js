const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const {COOKIE_ERROR} = require('../config/index');
const { isUser, isOwner } = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');
const {generateToken} = require('../utils/parseErrFromCookie');


router.post('/create', isUser(),
body('postBody').trim().not().isEmpty().withMessage('You can\'t create an empty post.'),
async (req, res) => {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }

        await req.storage.createPost(req.user._id, req.body.postBody.trim());
    } catch (err) {
        const errors = errorParser(err);
        const token = generateToken(errors);


        res.cookie(COOKIE_ERROR, token);
    }

    res.redirect('/user/feed')
});

router.get('/like/:id', isUser(), async (req, res) => {
    try{
        await req.storage.likePost(req.params.id, req.user._id);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(COOKIE_ERROR, token);
    }

    res.redirect('/user/feed');
});

router.get('/unlike/:id', isUser(), async(req,res)=>{
    try{
        await req.storage.unlikePost(req.params.id, req.user._id);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(COOKIE_ERROR, token);
    }

    res.redirect('/user/feed');
});

router.get('/delete/:id', isOwner(), async (req,res) =>{
    try{
        await req.storage.deletePost(req.params.id);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(COOKIE_ERROR, token);
    }

    res.redirect('/user/feed');
});

module.exports = router;