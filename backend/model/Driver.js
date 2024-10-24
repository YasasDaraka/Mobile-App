const  mongoose= require('mongoose')

const driverModel = mongoose.Schema(

    {
        "email":{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        "password":{
            type:String,
            required:true,
        },
        "name":{
            type:String
        },
        "vehical":{
            type:String,
            required:true,
        }
    },
    {versionKey:false}
)

let driver=mongoose.model("Driver", driverModel)

module.exports = driver;