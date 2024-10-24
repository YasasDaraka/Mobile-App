const  mongoose= require('mongoose')

const rideModel = mongoose.Schema(

    {
        "email":{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        "origin":{
            type:String,
            required:true,
        },
        "destination":{
            type:String,
            required:true,
        },
    },
    {versionKey:false}
)

let ride=mongoose.model("Ride", rideModel)

module.exports = ride;