const express=require('express');
const router=express.Router();
const {loginUser, logoutUser,registerUser}=require('../controllers/login_logout');
const {dash,createCourse, getCourses}=require('../controllers/dashboard');
const {upload}=require('../middleware/upload');
const {validateToken}=require('../middleware/tokenValidation');


router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').get(validateToken,logoutUser);
router.route('/dashboard/:id').get(validateToken,dash);
router.route('/createCourse').post(upload,createCourse);
router.route('/getCourseList/:id').get(getCourses);
module.exports=router;  