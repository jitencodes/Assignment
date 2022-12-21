const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    employeeId:{
        type:Number,
        max:100000000
    },
    salary:{
        type:Number,
        min:2,
        default:25000,
        max:100000000
    },
    isManager:{
        type:Boolean,
        min:2,
        max:255,
        default:false
    },
    location:{
        type:String,
        min:2,
        max:255,
    },
    department:{
        type:String,
        min:2,
        max:255,
    }
});

module.exports = mongoose.model('employee', userSchema);