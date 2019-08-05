const mongoose= require('mongoose');

const CarSchema= new mongoose.Schema({
    brand:{ type: String, required:true, unique:true},
    model: { type: String, required:true, unique:true},
    manufacturingYear:{ type: Date, required:true, unique:true},
    licensePlate: { type: String, required:true, unique:true},
    numberOfSeats: { type: String, required:true, unique:true},
    carImage: { type: String, required:true, unique:true},
})
const Car= mongoose.model('Car',CarSchema)
module.exports={Car, CarSchema}