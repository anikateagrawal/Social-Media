const express=require("express");
const { getUser, updateUser } = require("../controllers/user");

const router=express.Router();

router.get("/:id",getUser);
router.put("/",updateUser);

module.exports= router;