const router = require('express').Router();
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const {isUser} = require('../middlewares/guards');
const {createRoom, getRoomByName, getRoomById} = require('../services/roomService');
const {errorParser} = require('../utils/errorParser');

router.get('/', isUser(), (req,res)=>{
    res.render('authViews/chat')
});

router.post('/createRoom', isUser(),
body('roomName').isLength({min:4}).withMessage('Your room name needs to be at least 4 characters!').bail(),
body('roomPassword').isLength({min: 3}).withMessage('Room password must be at least 3 characters long!').bail().isAlphanumeric().withMessage('Passowrd cannot contain special characters!'),
async (req,res)=>{
    const {errors} = validationResult(req);

    const roomData = {
        roomName: req.body.roomName,
        password: await bcrypt.hash(req.body.roomPassword, 10),
        creatorId: req.user._id
    }

    try{
        if(errors.length > 0){
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }

        const room = await createRoom(roomData);
        res.redirect('/');
    }catch(err){
        const ctx = {
            errors: errorParser(err),
            roomData
        };

        res.render('authViews/chat', ctx);
    }
});

router.post('/joinRoom', isUser(), async (req,res)=>{
    const roomName = req.body.roomName;
    const roomPassword = req.body.roomPassword;

    try{
        const room = await getRoomByName(roomName);

        if(!room){
            throw new Error('Wrong room name or room password!');
        }


        if(await bcrypt.compare(roomPassword, room.hashedPassword) == false){
            throw new Error('Wrong room name or room password!');
        }

        if(room.participants.includes(req.user._id)){
            throw new Error('You are already part of the room!');
        }

        await room.participants.push(req.user._id);
        await room.save();

        res.redirect('/chat/room/' + room._id);
    }catch(err){
        const ctx = {
            errors: errorParser(err),
        };

        res.render('authViews/chat', ctx);
    }
});

router.get('/room/:id', isUser(), async (req,res)=>{
    const ctx = {};

    try{
        const room = await getRoomById(req.params.id);

        if(room.participants.map(x => x._id).includes(req.user._id) == false){
            throw new Error('You have no access to this room!');
        }

        ctx.participants = room.participants.map(x => ({userId: x._id, username: x.username,}));
        ctx.roomName = room.roomName;
        ctx.messages = room.messages.map(m => ({text: m.text, author: m.author.username, createdAt: m.createdAt}));

        res.render('authViews/chatRoom', ctx);
    } catch(err){
        ctx.errors = errorParser(err);

        res.render('authViews/chat', ctx);
    }

});

module.exports = router;