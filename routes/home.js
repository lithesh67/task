const express=require('express');
const router=express.Router();
const {loginUser, logoutUser,registerUser}=require('../controllers/login_logout');
const {validateToken}=require('../middleware/tokenValidation');


router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').get(validateToken,logoutUser);




module.exports=router; 