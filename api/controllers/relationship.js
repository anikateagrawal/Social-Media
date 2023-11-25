const { db } = require("../connect");
const jwt=require('jsonwebtoken');

module.exports.getRelationships=(req,res)=>{
    const q="select followerUserId from relationships  where followedUserId=? ";

    db.query(q,[req.query.userid],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data.map(relation=>relation.followerUserId));
    })
}

module.exports.addRelationshsip=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="Insert into relationships(`followerUserId`,`followedUserId`) values (?)";
        const values=[
            userInfo.id,
            req.body.userid
        ];
        db.query(q,[values],(err,data)=>{
            if(err)return res.json(err.sqlMessage);
            return res.json("relationship added successfully");
        })
    });
}


module.exports.deleteRelationship=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="delete from relationships where followerUserId=? and followedUserId=?";
        db.query(q,[userInfo.id,req.body.userid],(err,data)=>{
            if(err)return res.json(err);
            return res.json("relationship deleted successfully");
        })
    });
}
