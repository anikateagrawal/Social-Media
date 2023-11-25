const { db } = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");

module.exports.getComments=(req,res)=>{
    const q="select c.*,profilePic,name from comments as c  join users as u on ( c.userid=u.id ) where postid=? order by createdAt desc";

    db.query(q,[req.query.postid],(err,data)=>{
        if(err)return res.json(err);
        return res.status(200).json(data);
    })

}

module.exports.addComment=(req,res)=>{

    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");

        const q="Insert into comments(`desc`,`createdAt`,`userid`,`postid`) values (?)";

        const values=[
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postid
        ];

        db.query(q,[values],(err,data)=>{
            if(err)return res.json(err);
            return res.json("comment added successfully");
        })
    });

}
