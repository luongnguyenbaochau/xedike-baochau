const express=require ("express");
const {authenticating,authorizing}= require("../../middlewares/auth");
const tripController=require("./trip")
const router=express.Router();

//driver
router.post ("/create-trip",
    authenticating,
    authorizing(["driver"]),
    tripController.createTrip
)

//public lay danh sach chuyen di
router.get ("/getall-trip",
    tripController.getalltrip
)

module.exports=router;