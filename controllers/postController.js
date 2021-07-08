const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const {COOKIE_ERROR} = require('../config/index');
const { isUser } = require('../middlewares/guards');
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

        console.log(req.body.postBody.trim());
    } catch (err) {
        const errors = errorParser(err);
        const token = generateToken(errors);


        res.cookie(COOKIE_ERROR, token);
    }

    res.redirect('/user/feed')
});

module.exports = router;