const express=require('express');
const router=express.Router();

console.log('Router successfully loaded');
const homeController=require('../controllers/home-controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));

router.use('/api',require('./api'));
module.exports=router;