import express from "express"
import path from "path"
import fs from "fs"
const loginroute = express.Router();

loginroute.get("/",(req,res)=>{
    res.redirect("/home");
})

loginroute.get("/image/:name",(req,res)=>{
    const readfile = fs.createReadStream(`./stylesheet/${req.params.name}`);
    readfile.pipe(res);;
})
loginroute.get("/home",(req,res)=>{
    res.render("home");
})

loginroute.get("/login",(req,res)=>{
    res.render("login");
})
loginroute.get('/userpro',(req,res)=>{
    res.render("userprofile");
})

loginroute.get('/updateimg',(req,res)=>{
    res.render("updtimg");
})

loginroute.post('/upload', (req, res) => {
    const { image } = req.body;
    
    if (!image) {
        return res.status(400).json({ error: 'No image received' });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const filePath = path.join(`./uploads/image_${Date.now()}.jpg`);

    // Save image to file
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ error: 'Failed to save image' });
        }
        console.log('Image saved:', filePath);
        res.json({ message: 'Image saved', path: filePath });
    });
});
loginroute.post("/login",(req,res)=>{
    const uname =req.body.uname;
    const pwd =req.body.pwd;
    res.redirect("/userpro");
})
  
export default loginroute;