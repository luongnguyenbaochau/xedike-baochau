const express=require ('express')
const {authenticating}= require('../../middlewares/auth');
const {Driver}= require('../../../model/driver');
const {User}= require('../../../model/users')


const createDriver=(req,res,next)=>{
    const userid=req.user.id;//payload token
    const {address,passpostId,mainJob,passengerRates}= req.body;
    Driver.findOne({userid})
        .then(driver=>{
            if(driver) return Promise.reject({errors:"driver is exsits"});
            const newDriver= new Driver({
                userid,
                address,passpostId,mainJob,passengerRates
            });
            return newDriver.save();

        })
        .then(driver=>{res.status(200).json({driver})})
        .catch(error=>{res.status(400).json({error})})
    

}
//lấy thong tin tất cả của driver thong qua id 
const getDriverById=(req,res,next)=>{
    const {userid}=req.params;
    User.findById(userid)
    .then(user=>{
        if(!user) return Promise.reject({errors:"userid does not exsits"});
        Driver.findOne({userid})
            .then(driver=>{
                let info={}
                if(driver)
                info={
                    email: user.email,
                    fullName: user.fullName,
                    userType: user.userType,
                    phone: user.phone,
                    dateOfBirth: user.dateOfBirth,
                    address: driver.address,
                    mainJob: driver.mainJob,
                    carInfo: driver.carInfo,
                    passengerRates: driver.passengerRates

                }
                else{
                    info={
                        email: user.email,
                        fullName: user.fullName,
                        userType: user.userType,
                        phone: user.phone,
                        dateOfBirth: user.dateOfBirth,
                    }
    
                }
                res.status(200).json(info);
            })
    })
    .catch(err=>res.status(400).json(err))
}

//update profile thong tin của driver 
const updateDriver=(req,res,next)=>{
    const {address,passpostId,mainJob,passengerRates}=req.body
    const userid= req.user.id;
    Driver.findOne({userid})
    .then(driver=>{
        if(!driver) return Promise.reject({errors:"driver does not exsits"});
        driver.address=address,
        driver.passpostId=passpostId,
        driver.mainJob=mainJob,
        driver.passengerRates=passengerRates
       return  driver.save();
    })
    .then(driver=>{res.status(200).json({driver})})
    .catch(error=>{res.status(400).json({error})})
}

// //delete thằng driver là xóa lun thằng user là driver 
// const deleteDriver=(req,res,next)=>{
//     const userid=req.user.id
//     User.findByIdAndDelete(id)
//     .then(user=>{
//         if(!user) return Promise.reject({errors:"User does not exsits"})
//             return res.status(200).json();
//     })
//     .catch(err=>res.status(400).json(err))
// }






module.exports={
    createDriver,
    getDriverById,
    updateDriver,
    //deleteDriver
    
}