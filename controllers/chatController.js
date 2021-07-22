const router = require('express').Router();
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const {isUser, isGuest} = require('../middlewares/guards');
const {createRoom, getRoomByName} = require('../services/roomService');
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

        //Redirect to room page
    }catch(err){
        const ctx = {
            errors: errorParser(err),
        };

        res.render('authViews/chat', ctx);
    }
});

module.exports = router;