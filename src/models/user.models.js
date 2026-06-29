const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        unique:[true,'email already exists'],
        required:[true,'email is required'],
        type:String,
        trim:true,
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name:{
        type:String,
        required:[true,'name is required'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'password must be at least 6 characters long'],
        select:false
        // select:false means that when we query the user, the password field will not be returned by default. This is a security measure to prevent the password from being exposed in API responses. If we need to access the password for authentication purposes, we can explicitly include it in our query using .select('+password').
        //asan language me likha hai, isme select:false ka matlab hai ki jab hum user ko query karenge, to password field by default return nahi hoga. Ye ek security measure hai taaki password API responses me expose na ho. Agar hume authentication purposes ke liye password access karna ho, to hum apne query me explicitly include kar sakte hain using .select('+password').
    }
},{
    timestamps:true
})
//this function will run before saving the user to the database. It checks if the password field has been modified, and if so, it hashes the password using bcrypt before saving it to the database. This ensures that the password is stored securely and not in plain text.
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return 
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    return 
})

//this function is used to compare the provided password with the hashed password stored in the database. It uses bcrypt's compare function to check if the passwords match and returns a boolean value indicating whether the authentication was successful or not.

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
const User = mongoose.model('User',userSchema);
module.exports = User;

