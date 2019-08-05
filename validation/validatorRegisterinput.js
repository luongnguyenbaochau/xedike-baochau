const validator= require('validator');
const _=require('lodash');
const {User}=require("../model/users")

validatorRegisterInput=async (data)=>{
    let errors={};
    /////kiem tra input co bo trong hay k. 
    //neu bi bỏ trong cho string rỗng (undifine thanh string rỗng)
    //data.email= data.email ? data.email: ""
    data.email=_.get(data,"email","");
    data.password=_.get(data,"password","");
    data.password2=_.get(data,"password2","");
    data.fullName=_.get(data,"fullName","");
    data.userType=_.get(data,"userType","");
    data.phone=_.get(data,"phone","");
    data.dateOfBirth=_.get(data,"dateOfBirth","");

    if(validator.isEmpty(data.email)){
        errors.email="Email is require"
    }
    else if(!validator.isEmail(data.email)){
        errors.email="Email is invalid"
    }
    else{
        const user=await User.findOne({email:data.email})
        if(user) errors.email="Email exists"
    }
    //password co bi bo trong hay khong
    if(validator.isEmpty(data.password)){
        errors.password="Password is require"
    }
    else if(!validator.isLength(data.password,{min:6})){
        errors.password="Password has at least 6 characters"
    }

    //password 2
    if(validator.isEmpty(data.password2)){
        errors.password="Confirm Password is require"
    }//check có trùng password hay k
    else if(!validator.equals(data.password,data.password2)){
        errors.password="Password is not match"
    }
    //validator trả vê true false
    if(validator.isEmpty(data.phone)){//true là rỗng, false có giá trị
        errors.phone="Phone is require"
    }
    else{
        const user=await User.findOne({phone:data.phone})
        if(user) errors.phone="Phone exists"
    }
    //DOB, Fullname, userType
    return {
        isValid:_.isEmpty(errors),
        errors
    }
}
module.exports=validatorRegisterInput