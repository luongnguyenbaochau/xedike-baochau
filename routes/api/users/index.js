const express=require('express');
const userController=require("./users");
const {authenticating,authorizing}= require("../../middlewares/auth");
const upload=require("../../middlewares/upload")


const router=express.Router();
router.post("/register",userController.register);
router.post("/login",userController.login)
router.get("/test-private",
    authenticating,
    authorizing(["passenger"]),
    userController.testPrivate
)
router.post("/upload-avatar",
    authenticating,
    upload.single('avatar'),
    userController.uploadAvatar
)
router.get("/:id", 
    authenticating,
    userController.getUserById
)
module.exports=router;