const roleAuth=(roles)=>{
   return(req,res,next)=>{
    if(roles.includes(req.role)){
        next()
    }else{
        res.status(403).json("You are not an admin/organiser")
    }
   }
}
module.exports=roleAuth