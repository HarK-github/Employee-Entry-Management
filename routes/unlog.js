import express from "express"

const loginroute = express.Router();

loginroute.get("/",(req,res)=>{
    res.redirect("/home");
})
loginroute.get("/home",(req,res)=>{
    res.render("home");
})

loginroute.get("/login",(req,res)=>{
    res.render("login");
})
loginroute.post("/login",(req,res)=>{
    const uname =req.body.uname;
    const pwd =req.body.pwd;

})
  
export default loginroute;