const router = require('express').Router();
const {COOKIE_ERROR} = require('../config/index');
const {getAllUsersContainingUsername, getUserById} = require('../services/userService');
const {isUser} = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');
const {parseErrorFromCookie} = require('../utils/parseErrFromCookie');

router.get('/feed', isUser(), async (req, res)=>{
    const ctx = {}
    const err = parseErrorFromCookie(req);
    try{
        const dataForCurrentUser = await getUserById(req.user._id);
        ctx.following = dataForCurrentUser.following.map(person => ({username: person.username, _id: person._id}))
        
        if(err != true){
            ctx.errors = err.errors;
            throw new Error('');
        }

    } catch(error){
        ctx.errors.push(errorParser(error));
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