const express=require('express');
const router=express.Router();
const userController=require('../controllers/user-controller');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.userSignup);
router.get('/sign-in',userController.userSignin);
router.post('/create',userController.create);




module.exports=router;