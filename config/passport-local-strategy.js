const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback:true
    },
    function(req,email, password, done) {
      User.findOne({ email: email}, function (err, user) {
        if (err) { 
          req.flash('error',err);
          return done(err); 
        }
        if (!user) {
          req.flash('error','Invalid User Name/Password');
          return done(null, false); 
        }
        if (password!=user.password) {
          req.flash('error','Invalid User Name/Password');
          return done(null, false); 
        }
        return done(null, user);
      });
    }
  ));

//serializing the user to which id is to kept in the Cookies.
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserializing the user id which is kept in the Cookie.
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in deserializing in the id');
            return done(err);
        }
        return done(null,user);

    });
});

passport.chechAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }

  return res.redirect('/user/sign-in');
}

passport.setAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    res.locals.user=req.user;
    
  }
  next();
}
module.exports=passport;