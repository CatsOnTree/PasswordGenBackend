import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    mobile:{
        type : Number,
        required : true,
        unique : true
    },
    aadharno:{
        type : Number,
        required : true
    },
    college:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("User",userSchema)