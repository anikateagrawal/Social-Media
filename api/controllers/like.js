const { db } = require("../connect");
const jwt=require('jsonwebtoken');

module.exports.getLikes=(req,res)=>{
    const q="select userid from likes  where postid=? ";

    db.query(q,[req.query.postid],(err,data)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userid));
    })
}

module.exports.addLike=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="Insert into likes(`userid`,`postid`) values (?)";
        const values=[
            userInfo.id,
            req.body.postid
        ];
        db.query(q,[values],(err,data)=>{
            if(err)return res.json(err.sqlMessage);
            return res.json("like added successfully");
        })
    });
}


module.exports.deleteLike=(req,res)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="delete from likes where userid=? and postid=?";
        db.query(q,[userInfo.id,req.body.postid],(err,data)=>{
            if(err)return res.json(err);
            return res.json("like deleted successfully");
        })
    });
}
