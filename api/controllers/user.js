const jwt=require('jsonwebtoken');
const { db } = require('../connect');

module.exports.getUser=(req,res)=>{ 
    const q="select * from users where id=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err)return res.json(err.sqlMessage);
        if(!data.length)return res.status(404).json("user not found");
        const {password,...others}=data[0];
        return res.status(200).json(others);
    })
}

module.exports.updateUser=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="Update users set `name`=? , `city`=?,`website`=?,`coverPic`=?,`profilePic`=? where id=?";
        const values=[req.body.name,req.body.city,req.body.website,req.body.coverPic,req.body.profilePic,
            userInfo.id];
        db.query(q,values,(err,data)=>{
            if(err)return res.json(err);
            return res.json("user updated successfully");
        })
    });
}

module.exports.suggestions=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");

        const q="select * from users where id not in (select followedUserId from relationships where followerUserId =?) and id!=?"

        db.query(q,[userInfo.id,userInfo.id],(err,data)=>{
            if(err)return res.status(500).json(err);
            const users=[];
            data.forEach(user => {
                const {password,...others}=user;
                users.push(others);
            });
            return res.status(200).json(users);
        })
    });
}

module.exports.friends=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        
        const q="select * from users where id in (select followedUserId from relationships where followerUserId =?)"

        db.query(q,[userInfo.id],(err,data)=>{
            if(err)return res.status(500).json(err);
            console.log(data);
            const users=[];
            data.forEach(user => {
                const {password,...others}=user;
                users.push(others);
            });
            return res.status(200).json(users);
        })
    });
}
