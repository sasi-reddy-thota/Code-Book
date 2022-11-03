const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.toggleLike= async function(err,res){
    try {
        //likes/toggle/?id=abcde&type=Post
        let likable;
        let deleted=false;

        if(req.query.type=='Post'){
            likable=await Post.findById(req.query.id).populate('like');
        }else{
            likable=await (await Comment.findById(req.query.id)).populate('like');
        }

        let existingLike= await Like.findOne({
            likable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });

        if(existingLike){
            likable.like.pull(existingLike._id);
            likable.save();

            existingLike.remove();
            deleted=true;
        }else{
            let newLike=await Like.create({
                user:req.user._id,
                likable:req.query.id,
                onModel:req.query.type
            });

            likable.like.push(newLike.id);
            likable.save();
        }

        return res.json(200,{
            message:"Request Successfull",
            data:{
                deleted:deleted
            }
        });
    } catch (err) {
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}