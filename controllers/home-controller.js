const { populate } = require('../models/comment');
const Post=require('../models/post');
const User=require('../models/user')
module.exports.home=async function(req,res){
    // console.log(req.cookies);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Jai Balayya",
    //         posts:posts
    //     });
    // }); 
    try {
        let posts= await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
         });
        let users= await User.find({});
        
        return res.render('home',{
            title:"Jai Balayya",
            posts:posts,
            all_users:users
        });
        
    } catch (error) {
        console.log('Error',error);
    }

}