import {Schema,model} from "mongoose"


const history = new Schema({
    status:{
        type:String,
        require:true
    },
    comments:{
        type:String,
    },
    timestamps:true,
})

