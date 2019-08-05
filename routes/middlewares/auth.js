const jwt = require ("jsonwebtoken")

const authenticating=(req,res,next)=>{
// verify token
// -thanh cong: return next()
// -that bai : res.json(err)
    const token =req.header("Authorization");
    //console.log(token);
    const fingerprint=req.header("fingerprint");
    //console.log("TCL: authenticating->fingerprint",fingerprint)
    const KEY="Chau"+fingerprint
   // console.log(KEY);
    try{
        const decoded=jwt.verify(token,KEY)
       // console.log("TCL: authenticating ->decode", decoded)
        req.user=decoded;
        //console.log(req.user)
        next();
    }
    catch(error){
        res.status(403).json({error:"Ban k the vao duoc . Token hoac fingerprint bi sai"})
    }
}

//userTypeArray: danh sach cac loai nguoi dung co the truy cap
//userType : loai nguoi dung hien tai (lay tu decoded cua token)
//neu userTypeArray có chua usertype ==> next
const authorizing=(userTypeArray)=>{
    return (req,res,next)=>{
        const {userType}=req.user;
        //console.log(userType);
        if(userTypeArray.indexOf(userType)>-1){
            return next()
        }
        else{
            res.status(403).json({errors:"Ban da dang nhap , nhung khong duoc xem dieu nay"})
        }
    }
}
module.exports={
    authenticating,
    authorizing
}