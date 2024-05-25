const mongoose = require('mongoose')

const tradeSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    utc_time:{
        type: Date,
        required:true,
        unique:true,
    },
    operation:{
        type:String,
        required:true,
    },
    market:{
        base:{type:String, required:true},
        quote:{type:String,required:true}
    },
    amount:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
});
tradeSchema.index({utc_time:1});

const Trade = mongoose.model('Trade',tradeSchema);
module.exports = Trade;