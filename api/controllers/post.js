const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const { db } = require("../connect");

module.exports.getPosts=(req,res)=>{

    const userid=req.query.userid;
    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        
        if(userid==='undefined'){
        const q=`select p.*,name,profilePic from posts as p join users as u on (p.userid = u.id)
         left join relationships as r on (p.userid=r.followeduserid) where r.followeruserid=? or p.userid=?
         order by p.createdAt desc`;
            
            db.query(q,[userInfo.id,userInfo.id],(err,data)=>{
                if(err)return res.json(err);
                return res.json(data);
            })
        }
        else{
            const q=`select p.*,name,profilePic from posts as p join users as u on (p.userid=u.id) where p.userid=? order by p.createdAt desc`;
            db.query(q,[userid],(err,data)=>{
                if(err)return res.json(err);
                return res.json(data);
            })
        }
    });

}


module.exports.addPost=(req,res)=>{

    const token=req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged in!");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");

        const q="Insert into posts(`desc`,`img`,`createdAt`,`userid`) values (?)";

        const values=[
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ];

        db.query(q,[values],(err,data)=>{
            if(err)return res.json(err);
            return res.json("post added successfully");
        })
    });
}

module.exports.deletePost=(req,res)=>{
    const token=req.cookies.accessToken;
    console.log(req.body);
    if(!token)return res.status(401).json("Not Logged in!");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err)return res.status(403).json("token is not valid");
        const q="delete from posts where userid=? and id=?";
        db.query(q,[userInfo.id,req.body.postid],(err,data)=>{
            if(err)return res.status(500).json(err);
            if(data.affectedRows>0)return res.status(200).json("post deleted successfully");
            return res.status(403).json("You can delete only your post");
        })
    });
}
