const mongoose= require ('mongoose');
const {CarSchema}= require ('../model/car');

const DriverSchema= new mongoose.Schema({
    //ref
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        },
    address:{ type: String, required:true, unique:true},
    passpostId:{ type: String, required:true, unique:true} ,
    mainJob: { type: String, required:true, unique:true},
    //emb
    carInfo: { 
        type: CarSchema
    },
    passengerRates:{ type: String, required:true, unique:true}


})
const Driver=mongoose.model("Driver", DriverSchema)
module.exports={
    Driver, DriverSchema
}