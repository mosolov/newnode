const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true

    },
    email:{
        type:String,
        unique:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error('mongoose email')
            }
        },
        required:true

    },
    password:{
        type:String,
        minlength:6,
        trim:true,
        required:true


    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'secret');
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCred = async (email, password)=>{
    const user = await User.findOne({email})
    
    if(!user){
        console.log('no user')
        return null
    }

    const valid = await bcrypt.compare(password, user.password )

    if(!valid){
        console.log('no valid')
        return null
    }

    return user;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})
const User = mongoose.model('User', userSchema);

module.exports = User