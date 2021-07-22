const router = require('express').Router();
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const {isUser, isGuest} = require('../middlewares/guards');
const {createRoom} = require('../services/roomService');
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

    console.log(roomData.password)

    try{
        if(errors.length > 0){
            throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
        }

        const room = await createRoom(roomData);

        console.log(room);
        res.redirect('/');
    }catch(err){
        const ctx = {
            errors: errorParser(err),
            roomData
        };

        res.render('authViews/chat', ctx);
    }
});

module.exports = router;