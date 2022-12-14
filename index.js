const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts'); //for using layouts
const db=require('./config/mongoose');

// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware'); 
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle:'expanded',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);  // middle ware for using layouts.
app.use('/uploades',express.static(__dirname+'/uploades'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set('view engine','ejs'); // setting up the engine views
app.set('views','./views');   // views path

app.use(session({
    name:'codeBook',
    secret:'sasikumarreddy',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}
));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes/index'));//for routes
       
app.listen(port,function(err){
    if(err){
        console.log(`Error while setting up the server${err}`);
    }
    console.log(`Sever is running on the port: ${port}`);
});

// app.use(express.urlencoded());
