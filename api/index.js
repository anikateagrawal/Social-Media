const express=require("express");
const userroutes=require("./routes/users");
const postroutes=require("./routes/posts");
const likeroutes=require("./routes/likes");
const commentroutes=require("./routes/comments");
const authroutes=require("./routes/auth");
const relationshipRoutes=require("./routes/relationships");
const port=7000;
const cors =require("cors");
const cookieParser=require("cookie-parser");
const multer=require("multer");

const app=express();


//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Social Media App/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/api/upload",upload.single('file'),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})

app.use("/api/user",userroutes);
app.use("/api/auth",authroutes);
app.use("/api/posts",postroutes);
app.use("/api/like",likeroutes);
app.use("/api/comments",commentroutes);
app.use("/api/relationships",relationshipRoutes);;

app.listen(port,()=>{
    console.log("Connected To Backend! at port "+port);
})