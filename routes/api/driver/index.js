const express= require ('express');
const driverController=require("./driver");
const router=express.Router();
const {authenticating,authorizing}= require ("../../middlewares/auth")

//tạo driver
router.post('/create-Driver', 
    authenticating,
    authorizing(["driver"]),
    driverController.createDriver
    ),

//lấy thông tin chi tiết driver
router.get('/:userid',driverController.getDriverById)

// //update driver
router.put('/update-Driver', 
    authenticating,
    authorizing(["driver"]),
    driverController.updateDriver
    ),

// //delete driver
// router.delete('/delete-Driver/:id', 
//     authenticating,
//     authorizing(["driver"]),
//     driverController.deleteDriver
// ),

module.exports=router