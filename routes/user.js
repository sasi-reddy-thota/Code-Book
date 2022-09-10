const express=require('express');
const router=express.Router();
const userController=require('../controllers/user-controller');
const passport=require('passport');

router.get('/profile/:id',passport.chechAuthentication,userController.profile);
router.post('/update/:id',passport.chechAuthentication,userController.update);
router.get('/sign-up',userController.userSignup);
router.get('/sign-in',userController.userSignin);
router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/user/sign-in'
    }
    ),userController.createSession
);

router.get('/sign-out',userController.destroy);


module.exports=router;