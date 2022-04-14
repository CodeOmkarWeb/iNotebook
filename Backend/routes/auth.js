const { body, validationResult } = require('express-validator');
const express = require('express')
const router = express.Router()
const User = require('../models/User') // --> a model created from schema | to store data


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWD_SECRET = 'omkarisag**db*y'
const fetchuser = require('../middleware/fetchuser')

// Route-1 Cerate a User using POST: "api/auth/createuser" Dosen't require Authentication - No login Required
router.post('/createuser', [body('name', 'Invalid Email').isString(), body('email', 'Invalid Email').isEmail(), body('password', 'Invalid Password, it should of al least 5 characters').isLength({ min: 5 }),], async (req, res) => {
    // If there are errors , return bad request and the error
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    try {
        // Check if the email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) { return res.status(400).json({ error: "Sorry a user already exists with that email" }) }
        // Check if the password exists already
        user = await User.findOne({ password: req.body.password })
        if (user) { return res.status(400).json({ error: "Sorry a user already exists with that password" }) }


        // Secure Password
        const salt = await bcrypt.genSalt(10);
        console.log("Salt = ", salt, "\n")
        const secPass = await bcrypt.hash(req.body.password, salt)
        console.log("SecPass = ", secPass, "\n")


        // Creates the user and stores it into the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWD_SECRET);
        console.log("Token = ", authtoken, "\n")
        console.log("Data = ", data, "\n")
        console.log("Data.id = ", data.user, "\n")
        success = true
        res.json({success:success, authtoken: authtoken })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})




// Route-2 Login a User using POST: "api/auth/login"
router.post('/login', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Pls Enter correct credentials" });

        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({error: "Pls Enter correct credentials" });

        }
        success = true
        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWD_SECRET);
        res.json({ success, authtoken })
        console.log(authtoken)
    }
    catch (error) {
        success = false
        console.log(error.message)
        res.status(500).send("Internal Server Occured ")
    }
})



// Route-3  Get User Detail: using POST "api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id
        const user = await User.findOne({ userid }).select("-password")
        res.send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Occured ")
    }
})
module.exports = router