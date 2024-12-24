const express=require('express');
const router=express.Router();
const {loginUser, logoutUser}=require('../controllers/loginService');
const {validateToken}=require('../middleware/tokenValidation');


router.route('/login').post(loginUser);
router.route('/logout').get(validateToken,logoutUser);




module.exports=router; 