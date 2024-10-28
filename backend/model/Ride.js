const  mongoose= require('mongoose')

const rideModel = mongoose.Schema(

    {
        "email":{
            type:String,
            required:true,
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
        "fare":{
            type:Number,
            required:true
        },
        "vehicle":{
            type:String,
            required:true
        },
        "card":{
            type:String,
            required:true
        },
        "date":{
            type:String,
            required:true
        }
    },
    {versionKey:false}
)

let ride=mongoose.model("Ride", rideModel)

module.exports = ride;