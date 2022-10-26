const Comment=require('../models/comment');
const Post=require('../models/post');
const commentMailer=require('../mailers/comment_mailer.js');


module.exports.create= async function(req,res){
    try {
        let post= await Post.findById(req.body.post);
        if(post){
            let comment= await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','name email');
            commentMailer.newComment(comment);
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error', error);
        return;
    }
 }

module.exports.destroy=async function(req,res){
    try {
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId=comment.post;

            comment.remove();
            let post=Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error',error);
    }
}