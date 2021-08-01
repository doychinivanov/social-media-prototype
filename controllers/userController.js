const router = require('express').Router();
const {getAllUsersContainingUsername, getUserById, getFollowersByUserId, getFollowingByUserId} = require('../services/userService');
const {isUser} = require('../middlewares/guards');
const {errorParser} = require('../utils/errorParser');
const {parseErrorFromCookie, generateToken} = require('../utils/parseErrFromCookie');
const {parseDate} = require('../utils/parseDate');
const {getFileFromS3} = require('../services/s3');
const {getRoomByParticipantsId} = require('../services/roomService');

router.get('/feed', isUser(), async (req, res)=>{
    const ctx = {};
    ctx.errors = [];
    const err = parseErrorFromCookie(req);
    try{
        const dataForCurrentUser = await getUserById(req.user._id);

        const userFollowing = dataForCurrentUser.following.map(x => x._id);
        userFollowing.push(req.user._id);

        const posts = await req.storage.getPostsByFollowingId(userFollowing);

        const userRooms = await getRoomByParticipantsId(req.user._id);

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

        ctx.rooms = userRooms.map(x=> ({roomName: x.roomName, roomId: x._id}));
        ctx.title = 'Toggle';

        if(err != true){
            ctx.errors = err.errors;
            throw new Error('');
        }
    } catch(error){
        if(ctx.errors.length == 0){
            ctx.errors.push('Something went wrong. Please try again later!');
        }

        res.clearCookie(process.env.COOKIE_ERROR);
    }

    res.render('authViews/userHome', ctx);
});

router.get('/profile/:id', isUser(), async (req, res)=>{
    const ctx = {};
    ctx.errors = [];
    const err = parseErrorFromCookie(req);

    ctx.isCurrentUserProfile = req.params.id == req.user._id;

    try{
        const currentUserData = await getUserById(req.user._id);
        const posts = await req.storage.getPostsByAuthorId(req.params.id);
        const dataForUserProfile = await getUserById(req.params.id);

        if(dataForUserProfile.private == false || ctx.isCurrentUserProfile || dataForUserProfile.followers.map(x =>x._id).includes(req.user._id)){
            ctx.isOpen = true;
        } else {
            ctx,isOpen = false;
        }

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

        ctx.userData = {
            _id: dataForUserProfile._id,
            private: dataForUserProfile.private,
            birthday: parseDate(dataForUserProfile.birthday.toString()),
            followers: dataForUserProfile.followers.map(x => x._id) || [],
            username: dataForUserProfile.username,
            email: dataForUserProfile.email,
            following: dataForUserProfile.following.map(x => x._id) || [],
            isAlreadyFollowed: currentUserData.following.map(x => x._id).includes(dataForUserProfile._id)
        }

        ctx.title = `${dataForUserProfile.username} | Toggle`;

        if(err != true){
            ctx.errors = err.errors;
            throw new Error('');
        }
    }catch(error){
        if(ctx.errors.length == 0){
            ctx.errors.push('Something went wrong. Please try again later!');
        }

        res.clearCookie(process.env.COOKIE_ERROR);
    }

    res.render('authViews/userProfile', ctx)
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

        res.render('authViews/userSearch', {people, title:'Toggle - Search'});
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


router.get('/followers/:id', async(req,res)=>{
    const id = req.params.id;

    try{
        const followers = await getFollowersByUserId(id);
        res.status(200).json(followers);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(process.env.COOKIE_ERROR, token);
        res.redirect('/user/profile/' + id);
    }
});

router.get('/following/:id', async(req,res)=>{
    const id = req.params.id;

    try{
        const following = await getFollowingByUserId(id);
        res.status(200).json(following);
    } catch(err){
        const errors = errorParser(err);
        const token = generateToken(errors);

        res.cookie(process.env.COOKIE_ERROR, token);
        res.redirect('/user/profile/' + id);
    }
});

router.get('/images/:key', async (req,res)=>{
    const key = req.params.key;

    try{
        const dataForCurrentUser = await getUserById(key);
        const hasProfilePic = dataForCurrentUser.profilePicture;

        if(hasProfilePic){
            const readStream = getFileFromS3(key);
            readStream.pipe(res);
        } else {
            const readStream = getFileFromS3();
            readStream.pipe(res);
        }
    } catch(err){
        console.log(err);
    }
});

module.exports = router;