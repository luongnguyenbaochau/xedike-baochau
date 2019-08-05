const express= require('express');
const CarController= require('./car');
const router= express.Router();
const {authenticating,authorizing}= require ("../../middlewares/auth")


// Mô tả: Thêm xe hơi vào danh sách xe hơi của tài xế
// b. PRIVATE: chỉ có userType=driver + đang đăng nhập mới được access
router.post('/add-car', 
    authenticating,
    authorizing(["driver"]),
    CarController.createCar
),

router.post('/update-car', 
    authenticating,
    authorizing(["driver"]),
    CarController.updateCar
),




module.exports=router;