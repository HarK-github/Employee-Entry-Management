import express from "express"


const loginneduser = express.Router();

loginneduser.get("/logout",(req,res)=>{
    req.session.destroy(err => { 
        if (err) {
            console.log(err);
        } else {
            res.send('Session is destroyed');
        }
    });
})

export default loginneduser