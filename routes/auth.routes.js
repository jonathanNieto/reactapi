const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');


/* sign in */
router.post('/sign-in', authController.sign_in_user_post);

/* sign uo */
router.post('/sign-up', authController.sign_up_user_post);



module.exports = router;
