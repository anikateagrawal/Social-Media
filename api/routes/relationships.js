const express=require("express");
const { getRelationships, addRelationshsip, deleteRelationship } = require("../controllers/relationship");

const router=express.Router();

router.get("/",getRelationships);
router.post("/",addRelationshsip);
router.delete("/",deleteRelationship);

module.exports= router;