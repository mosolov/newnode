const express = require('express')
const User = require('../models/User');
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCred(req.body.email, req.body.password)
        if(!user){
            return res.status(404).send()
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async(req, res)=>{
    res.send(req.user)
})

router.post('/users/logout', auth, async(req, res)=>{
    const newTokens = req.user.tokens.filter(tk => tk.token !== req.token)
    req.user.tokens = newTokens
    await req.user.save()
    res.send(req.user)
})



module.exports=router;