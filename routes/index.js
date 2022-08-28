const express=require('express');
const router=express.Router();

console.log('Router successfully loaded');
const homeController=require('../controllers/home-controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
module.exports=router;