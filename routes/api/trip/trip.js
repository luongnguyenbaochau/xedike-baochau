const {User}= require ("../../../model/users");
const {Trip}= require ("../../../model/Trip");

const createTrip=(req,res,next)=>{
    //const {localtionFrom, localtionTo, startTime, availableSeats, fee}=req.body;
    const driverId=req.user.id;
    User
        .findById(driverId)
        .then(driver =>{
            if(!driver) return Promise.reject({errors:"Driver does not exists"})
            return Trip.findOne()
            //console.log(123213,driverId)
            .and([{driverId}, {isFinished:false}])
        })
        .then(trip => {
           console.log(trip)
            if (trip) return  Promise.reject({errors:"Trip is active"}) //res.status(400).json({message:"Trip is active"})
           
            const tripInfo={...req.body, driverId}
            const newTrip =new Trip(tripInfo)
            return newTrip.save()
        })
        .then(trip=>res.status(200).json(trip))
        .catch(err=>res.status(400).json(err));
}

//lấy danh sách chuyến đi gồm có model trips và model driver
const getalltrip=(req,res,next)=>{
    Trip.find({isFinished:false})
    .select('locationFrom locationTo startTime fee')
    .populate('driverId','fullName phone ')
    .then(trip=>res.status(200).json(trip))
    .catch(err=>res.status(400).json(err))
}






module.exports={
    createTrip,
    getalltrip
}