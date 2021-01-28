const jwt = require('jsonwebtoken');
const User = require('../models/User');
const user = require('../models/User')

const auth = async (req, res, next)=>{
    try {
        const token = req.header('Authorization', ).replace('Bearer ', "")
    const decode = jwt.verify(token, 'secret')
    const user = await User.findOne({_id:decode._id, 'tokens.token':token})
    if(!user){
        throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (error) {
        res.status(401).send('unauth')
    }    
}

module.exports=auth;