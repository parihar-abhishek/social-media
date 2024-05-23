const express = require('express')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchUser = require('../Middleware/fetchUser')
require('dotenv').config()

const router = express.Router()

router.post('/signup', async (req, res) => {

    const { name, photo, username,email, password  } = req.body

    try {
       
        if (!name || !photo || !username || !email || !password  ) {
            return res.status(400).json({ error: "All fields are required" })
        }

        
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email" })
        }

      
        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ error: "User already exists" })
        }

        const uniqueName = await User.findOne({ username });

        if (uniqueName) {
            res.status(400).json({ error: "Username already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = await User({
            name,
            photo,
            username,
            email,
            password: hashedPassword,
            
        });
        await newUser.save();
        console.log(newUser);
        res.status(201).json({ success: "Signup Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body

    try {
        
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

         
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email" })
        }

       
        const user = await User.findOne({ email });

        console.log(user)

        
        if (!user) {
            res.status(400).json({ error: "User Not Found" })
        }

        
        const doMatch = await bcrypt.compare(password,user.password)
        console.log(doMatch)

         
        if (doMatch) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            res.status(201).json({ token })
        }
        else {
            res.status(404).json({ error: 'Email And Password Not Found' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router