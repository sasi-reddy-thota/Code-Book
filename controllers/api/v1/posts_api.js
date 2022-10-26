const Post=require('../../../models/post');
const Comment=require('../../../models/comment');


module.exports.index=async function(req,res){

    let posts= await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
         });
    return res.json(200,{
        message:"Jai Balayya",
        posts:posts
    });
}

module.exports.destroy= async function(req,res){
    try {
        let post= await Post.findById(req.params.id);
        console.log(post);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});


            return res.json(200,{
            message:"Balayya Successfully Deleted the Posts and associated comments"
            });
        }
        else{
            return res.json(401,{
                message:'You canot delete this post'
            });
        }
    } catch (error) {
        console.log('Error',error);
        return res.json(500,{
            message:"Balayya Down with the Fewer(Internal Server Error)"
        });
    }
}