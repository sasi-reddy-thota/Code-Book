const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid User Name or Password"
            });
        }
        return res.json(200,{
            message:"Sign in successfull, here is your token, please keep it safe!",
            data:{
                token:jwt.sign(user.toJSON(),'sasi',{expiresIn:'10000000'})
            }
        })
    } catch (error) {
        console.log('Error',error);
        return res.json(500,{
            message:"Balayya Down with the Fewer(Internal Server Error)"
        });
    }
}