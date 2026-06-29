const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true
    },
    status:{
        type: String,
        enum:{
            values: ['active', 'frozen', 'closed'],
            message: 'Status can be either ACTIVE, FROZEN or CLOSED',
            
        },
        default: 'active'
        
    },
    currency: {
        type: String,
        required: [ true, "Currency is required for creating an account" ],
        default: "INR"
    }


},
 {
    timestamps: true
}
);
accountSchema.index(
    { user:1,status:1 }
)
const Accountmodel = mongoose.model('Account', accountSchema);
module.exports = Accountmodel;