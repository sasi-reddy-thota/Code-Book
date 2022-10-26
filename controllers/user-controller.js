const User=require('../models/user');
const fs=require('fs');
const path=require('path');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile Page",
            profile_user:user
        });

    })
}
module.exports.update=async function(req,res){
    // if(req.user.id=req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }
    // else{
    //     return res.status('401').send('Unauthorized');
    // }
    if(req.user.id=req.params.id){
        try {
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****Multer Error: ',err)}
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                    console.log(user.avatar);
                }
                user.save();
                return res.redirect('back');

            });
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status('401').send('Unauthorized');
    }
}

module.exports.userSignup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user-signup',{title:"SignUp"});
}
module.exports.userSignin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user-signin',{title:"SignIn"});
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.password},function(err,user){
        if(err){console.log('error in finding the user in SignUP'); return;}
        
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error while creating the user in Signup');return;}

                return res.redirect('/user/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession=function(req,res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroy=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have Logged Out');
        res.redirect('/');
    });
}