const roleAuth=(roles)=>{
   return(req,res,next)=>{
        if(!roles.includes(req.role)){
         return res.status(403).json({error:"Access denied"});
    }
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(403).json({error:"you are not authorized"})
        }
    }
}
 
module.exports=roleAuth