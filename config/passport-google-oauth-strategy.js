const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');



passport.use(new googleStrategy({
    clientID:'639889882310-f01iegufnplrqeqggjt932uo63gab8c9.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/user/auth/google/callback'
},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in Google Strategy:',err);return;}
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('Error in creating user in Google Strategy:',err);return;}
                return done(null,user);
            });
        }
        
    });
}

));

module.exports=passport;