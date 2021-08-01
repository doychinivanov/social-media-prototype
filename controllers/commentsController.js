const router = require('express').Router();
const {errorParser} = require('../utils/errorParser');
// const {COOKIE_ERROR} = require('../config/index');
const {generateToken} = require('../utils/parseErrFromCookie');
const {isUser, isOwner, isCommentOwner} = require('../middlewares/guards');

router.get('/:id', async (req, res) => {
    try{
        const comments = await req.storage.getCommentsByPostId(req.params.id);
        res.json(comments);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(process.env.COOKIE_ERROR, token);
        res.redirect('/user/feed');
    }
});

router.post('/create/:id', isUser(), async (req,res)=>{
    const postId = req.params.id;
    const body = {
        author: req.user._id,
        content: req.body.content.trim()
    }

    try{
        
        if(body.content == ''){
            throw new Error('You can\'t create an empty comment.');
        }

        const comment = await req.storage.createComment(postId, body);
        res.status(201).json(comment);
    } catch(err){
        res.status(404).send(err.message);
    }
    
});

router.delete('/delete/:id', isCommentOwner(), async(req, res)=>{
    const commentId = req.params.id;

    try{
        await req.storage.deleteComment(commentId);
        res.status(204).end();
    }catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(process.env.COOKIE_ERROR, token);
        res.redirect('/user/feed');
    };
})

module.exports = router;