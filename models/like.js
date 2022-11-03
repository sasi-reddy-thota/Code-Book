const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },

    likable:{
        type: mongoose.Schema.ObjectId,
        refPath:'onModel',
    },
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;