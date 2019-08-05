const {Driver}= require('../../../model/driver')
const {Car}= require('../../../model/car')
// Mô tả: Thêm xe hơi vào danh sách xe hơi của tài xế
// PRIVATE: chỉ có userType=driver + đang đăng nhập mới được access

const createCar =(req,res,next)=>{
    const userid=req.user.id;//payload token
    const {brand,model,manufacturingYear,licensePlate,numberOfSeats,carImage}= req.body;
    Driver.findOne({userid})
        .then(driver=>{
            if(!driver) return res.status(200).json({message:"Driver id does not exists "});
            if(driver.carInfo) return res.status(200).json({message:"Driver id is exists "});
            const newCar= new Car({
                brand,model,manufacturingYear,licensePlate,numberOfSeats,carImage
            })
            driver.carInfo=newCar
            return driver.save();
            
        })
        .then(driver=>{res.status(200).json({driver})})
        .catch(err=>{res.status(400).json({err})})
}
//update thông tin xe
const updateCar =(req,res,next)=>{
    const userid=req.user.id;//payload token
    const {brand,model,manufacturingYear,licensePlate,numberOfSeats,carImage}= req.body;
    Driver.findOne({userid})
        .then(driver=>{
            if(!driver) return res.status(200).json({message:"Driver id does not exists "});
            if(!driver.carInfo) return res.status(200).json({message:"Driver id does not exists "});
            const UpdateCar= new Car({
                brand,model,manufacturingYear,licensePlate,numberOfSeats,carImage
            })
            driver.carInfo=UpdateCar
            return driver.save();
            
        })
        .then(driver=>{res.status(200).json({driver})})
        .catch(err=>{res.status(400).json({err})})
}






module.exports={
    createCar,
    updateCar

}