const express=require("express");
const { getUser, updateUser, suggestions, friends } = require("../controllers/user");

const router=express.Router();

router.get("/suggestions",suggestions);
router.get("/friends",friends);
router.get("/:id",getUser);
router.put("/",updateUser);

module.exports= router;