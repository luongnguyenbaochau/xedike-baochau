const express = require ('express')
const mongoose= require ('mongoose')
const bodyParser = require('body-parser')
//const  cors = require('cors') nay install va khai bao cau duoi
mongoose.connect('mongodb://localhost:27017/xedike-baochau',{useNewUrlParser:true, useCreateIndex:true })
.then(console.log("Connect database"))
.catch(console.log)

const app = express();
//Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use(cors()) cau nay


//middleware:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static
app.use("/upload", express.static("upload"))

//router
//file index trong api user
app.use('/api/users', require('./routes/api/users'))
//file index trong api driver
app.use('/api/users/drivers', require('./routes/api/driver'))
//file index trong api trip
app.use('/api/trips', require('./routes/api/trip'))
//file index trong api car
app.use('/api/users/drivers',require('./routes/api/car'))

//thư mục public
app.use("/", express.static('public'))

  

const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
