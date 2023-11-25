const { db } = require("../connect");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

module.exports.login=(req,res)=>{
    const q="select * from users where username = ?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err)return res.status(500).json(err);
        if(data.length===0)return res.status(404).json("User not Found");

        const checkPassword=bcrypt.compareSync(req.body.password,data[0].password);

        if(!checkPassword)return res.status(400).json("Wrong password or username");

        const {password,...others}=data[0];

        const token =jwt.sign({id:data[0].id},"secretkey");
        res.cookie("accessToken",token,{httpOnly:true}).status(200).json(others);

    })
    
}

module.exports.register=(req,res)=>{

    //check if user exists
    const q="select * from users where username=?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err)return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists");
        //create new user
            //hash the password
            const salt=bcrypt.genSaltSync(10)
            const hashedPassword=bcrypt.hashSync(req.body.password,salt);

            const q="Insert into users(`username`,`email`,`password`,`name`) value (?)";

            values=[req.body.username,req.body.email,hashedPassword,req.body.name];
            db.query(q,[values],(err,data)=>{
                if(err)return res.status(500).json(err);
                return res.status(200).json("User has been created");
            });
    })
}
module.exports.logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("logged out");

}