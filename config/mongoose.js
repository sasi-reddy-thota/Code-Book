const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeBook_development');
const db=mongoose.connection;

db.on('error', console.error.bind(console,'Error while connecting to the db'));

db.once('open',function(){
    console.log('Connected to the database :: MongoDb');
});

module.exports=db;