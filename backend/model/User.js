const  mongoose= require('mongoose')

const userModel = mongoose.Schema(

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
        }
    },
    {versionKey:false}
)

let user=mongoose.model("User", userModel)

module.exports = user;