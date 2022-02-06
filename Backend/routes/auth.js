const { body, validationResult } = require('express-validator');
const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Cerate a User using post: "api/auth/createuser" Dosen't require Authentication - No login Required
router.post('/createuser', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password, it should of al least 5 characters').isLength({ min: 5 }),], async (req, res) => {
        // IF there are errors , return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
        // Check i fthe email exists already
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            return res.status(400).json({ error: "Sorry a user already exists with that email" })
        }
        user = await User.findOne({ password: req.body.password })
        if (user) {
            return res.status(400).json({ error: "Sorry a user already exists with that password" })
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("SOme error occured ")
    }
})

module.exports = router