const User=require('../models/user');


module.exports.profile=function(req,res){
    return res.render('user_profile',{title:"User Profile Page"});
}

module.exports.userSignup=function(req,res){
    return res.render('user-signup',{title:"SignUp"});
}
module.exports.userSignin=function(req,res){
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
module.exports.createSesion=function(req,res){
    //Todo
}