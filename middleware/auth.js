const{ getUser }=require("../service/auth")


function checkForAuthentication(req,res,next){
const tokenCookie=req.cookies?.token;

req.user=null;
if(!tokenCookie) 
return next();

const token=tokenCookie;
// .split("Bearer ")[1]
const user=getUser(token);

req.user=user;

return next();

}
//ADMIN,Normal User
function restrictTo(roles)
{
    
return (req,res,next)=>{
    console.log(roles)
    if(!req.user) 
        return res.redirect("/login");

    if(!roles.includes(req.user.role))
     return res.end("You are not authorized to access this resource");
    return next();
}
}

module.exports={checkForAuthentication,restrictTo,}






