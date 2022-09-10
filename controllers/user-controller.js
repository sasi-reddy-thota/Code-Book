const User=require('../models/user');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile Page",
            profile_user:user
        });

    })
}
module.exports.update=function(req,res){
    if(req.user.id=req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }
    else{
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
    return res.redirect('/');
}

module.exports.destroy=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}