const router = require('express').Router();
const {COOKIE_ERROR} = require('../config/index');
const {getAllUsersContainingUsername, getUserById} = require('../services/userService');
const {isUser} = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');
const {parseErrorFromCookie} = require('../utils/parseErrFromCookie');

router.get('/feed', isUser(), async (req, res)=>{
    const ctx = {};
    ctx.errors = [];
    const err = parseErrorFromCookie(req);
    try{
        const dataForCurrentUser = await getUserById(req.user._id);

        const userFollowing = dataForCurrentUser.following.map(x => x._id);
        userFollowing.push(req.user._id);

        const posts = await req.storage.getPostsByFollowingId(userFollowing);

        ctx.posts = posts.map(post => ({
            currentUserIsAuthor: req.user._id == post.author._id,
            postIsLikedByCurrentUser: post.likes.includes(req.user._id),
            author: {username:post.author.username, _id: post.author._id},
            _id: post._id,
            content: post.content,
            likes: post.likes,
            likesAreOne: post.likes.length == 1,
            createdAt: post.createdAt.toLocaleString()
        }));

        ctx.following = dataForCurrentUser.following.map(person => ({username: person.username, _id: person._id}))

        if(err != true){
            ctx.errors = err.errors;
            throw new Error('');
        }
    } catch(error){
        if(ctx.errors.length == 0){
            ctx.errors.push('Something went wrong. Please try again later!');
        }

        res.clearCookie(COOKIE_ERROR);
    }

    res.render('authViews/userHome', ctx);
});

router.get('/search', isUser(), async (req,res)=>{
    try{
        const currentUserData = await getUserById(req.user._id);
        const data = await getAllUsersContainingUsername(req.query.username);
        const people = data.map(person => ({
            _id: person._id,
            username: person.username,
            isCurrentUser: req.user._id == person._id,
            isAlreadyFollowed: currentUserData.following.map(x => x._id).includes(person._id)
        }));

        res.render('authViews/userSearch', {people});
    } catch(err){
        const ctx = {
            errors: errorParser(err),
        };

        res.render('authViews/userSearch', ctx);
    }

});

router.get('/follow/:id', isUser(), async (req,res)=>{
    const backUrl = req.header('Referer') || '/';
    try{
        await req.actions.followPerson(req.params.id);
        res.redirect(backUrl);
    } catch(err){
        const ctx = {
            errors: errorParser(err)
        };
        
        res.render('authViews/userHome', ctx);
    }

});

router.get('/unfollow/:id', isUser(), async (req,res)=>{
    const backUrl = req.header('Referer') || '/';
    try{
        await req.actions.unfollowPerson(req.params.id);
        res.redirect(backUrl);
    } catch(err){
        const ctx = {
            errors: errorParser(err)
        };
        
        res.render('authViews/userHome', ctx);
    }
});

module.exports = router;