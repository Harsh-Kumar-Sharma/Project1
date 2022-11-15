const jwt = require("jsonwebtoken");
const blogModel= require("../Models/blogModel")
const mid1= async (req,res,next)=>{
    try{
    let token = req.headers["x-api-key"];
    //If no token is present in the request header return error. This means the user is not logged in.
    if (!token)
    return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "Alone-But-Happy");

    req.abc=decodedToken;

    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });

    next();
    }
    catch(error){
        res.status(500).send({"something is wrong":error.message})
    }  
}
const mid2=async (req,res,next)=>{
  let blogId = req.params.blogId;
  let data= await blogModel.findById(blogId)
  if(req.abc.authorId==data.authorId)
  next();
  else
  return res.send("not authorized")
}
module.exports.mid1=mid1
module.exports.mid2=mid2