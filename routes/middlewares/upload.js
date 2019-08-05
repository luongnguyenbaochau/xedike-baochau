const multer= require("multer");
//upload hinh
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./upload/")
    },
    filename:function(req,file,cb){
        let type="";
        console.log(file);
        if(file.mimetype==="application/octet-stream" || !file.mimetype) type=".jpg"
        console.log(file.originalname)
        console.log(file.mimetype)
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage})
module.exports=upload;