const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts'); //for using layouts
const db=require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);  // middle ware for using layouts.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/',require('./routes/index'));//for routes


app.set('view engine','ejs'); // setting up the engine views
app.set('views','./views');   // views path

app.listen(port,function(err){
    if(err){
        console.log(`Error while setting up the server${err}`);
    }
    console.log(`Sever is running on the port: ${port}`);
});

// app.use(express.urlencoded());
