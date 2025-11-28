const jwt=require('jsonwebtoken')
const authenticateUser=(req,res,next)=>{
    let token=req.headers['authorization']
    if(!token){
         return res.status(401).json({error:"token not provided"})
    }
    token=token.trim()
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        //console.log("tokendata",tokenData)
        req.userId=tokenData.userId
        req.role=tokenData.role
        return next()
    }catch(err){
        console.log(err.message)
        return res.status(500).json({err:"something went wrong"})
    }
}
module.exports=authenticateUser;