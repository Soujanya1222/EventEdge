const roleAuth=(roles)=>{
   return(req,res,next)=>{
    if(roles.includes(req.role)){
        if(req.role==="organiser" && !req.isApproved){
            return res.status(403).json({err:"Organiser account is not approved"})
        }
         return next()
    }if(roles.includes("admin")&& req.role!=="admin"){
        return res.status(403).json({err:"You are not an admin"})
    }
    if(roles.includes("organiser")&& req.role!=="organiser"){
        return res.status(403).json({err:"You are not an organiser"})
    }
    return res.status(403).json({error:"Access denied"});
    
   }
}
module.exports=roleAuth