import mongoose from "mongoose";

const fileSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    downloadContent:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:true,
});

const fileModel=mongoose.model('file',fileSchema);
export default fileModel;
