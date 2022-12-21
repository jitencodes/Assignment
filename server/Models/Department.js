const mongoose  = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    departmentId:{
        type:Number,
        required:true,
        min:2,
        max:100000000
    },
    category:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    employees:{
        type:Array,
        default:[],
    },
    location:{
        type:String,
        min:2,
        max:255
    },
});

module.exports = mongoose.model('department', departmentSchema);