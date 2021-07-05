const router = require('express').Router();
const {getAllUsersContainingUsername} = require('../services/userService');
const {isUser, isGuest} = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');



router.get('/feed', isUser(), (req, res)=>{
    res.render('authViews/userHome');
});

router.get('/search', isUser(), async (req,res)=>{
    try{
        const people = await getAllUsersContainingUsername(req.query.username);
        people.forEach(person => {
            person.isCurrentUser = req.user._id == person._id;
            person.isAlreadyFollowed = req.user && req.user.following.find(u => u == person._id);
        }); 
        
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

module.exports = router;