const express= require ('express')
const router=express.Router();
const bcrypt= require ('bcryptjs')
const {User}= require ('../../../model/users')
const validatorRegisterInput= require("../../../validation/validatorRegisterinput")
const jwt= require('jsonwebtoken')
//
// router.get('/',(req,res)=>{
//     res.status(200).json({message: "welcome"})
// })

//router : api/users/regisrer (POST)
//desc: register new user
//access: PUBLIC

//route POST /api/users/register
//desc register new user
//access PUBLIC
const register= async(req,res)=>{
    const {isValid,errors}= await validatorRegisterInput(req.body);
    if(!isValid) return res.status(400).json(errors);
    const {email,password,fullName,userType,phone,dateOfBirth}=req.body;
    const newUser= new User({
        email,password,fullName,userType,phone,dateOfBirth
    })
    //hash password with salt
    bcrypt.genSalt(10,(err,salt)=>{
        console.log(salt);
        if(err) return Promise.reject(err);
        bcrypt.hash(password,salt,(err,hash)=>{
            console.log(password);
            console.log(salt);
            if(err) return Promise.reject(err);
            newUser.password=hash;
            console.log(hash)
            return newUser.save()
                .then(user=>res.status(200).json(user))
                .catch(err=>res.status(400).json(err))

        })
    })
}

//route POST /api/users/login
//desc login
//access PUBLIC
const login=(req,res)=>{
    const {email,password,fingerprint}=req.body;
    User.findOne({email})
        .then(user=>{
            if(!user) return Promise.reject({errors:"User does not exist"})
            bcrypt.compare(password,user.password,(err,isMath)=>{
                if(!isMath) return res.status(400).json({errors:"Wrong password"})
                const payload={
                    id:user._id,
                    email:user.email,
                    fullName:user.fullName,
                    userType:user.userType
                }
                const KEY="Chau"+fingerprint
                jwt.sign(payload,KEY,{expiresIn:"1h"},(err,token)=>{
                    if(err) return res.status(400).json(err)
                    return res.status(200).json({message:"success",token})
                })
            })
        })
        .catch(err=>res.status(400).json(err))
}
//route POST /api/users/test-private
//desc test private
//access Private (chi cho nhung user da login moi sử dụng)
const testPrivate=(req,res,next)=>{
    res.status(200).json({message:"you have login"})
}

//upload hình vào thư mục upload
const uploadAvatar=(req,res,next)=>{
    const {id}=req.user;
    User.findById(id)
    .then(user=>{
        if(!user) return Promise.reject({errors:"User does not exists"})
        console.log(req.user)
        user.avatar=req.file.path
        console.log(req.file)
        return user.save()
    })
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).json(err))
}

//lấy thông tin của user đó
const getUserById=(req,res,next)=>{
    const {id}=req.user;
    User.findById(id)
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).json(err))
}



module.exports={
    register,
    login,
    testPrivate,
    uploadAvatar,
    getUserById
};
