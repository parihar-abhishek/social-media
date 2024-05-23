const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const fetchUser = (req, res, next) => {
    
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "Please authenticate " })
    }

    try {
       
        const { userId}   = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = userId
        console.log("fetchuser",userId)
        next();
    } catch (error) {
        res.status(401).send({ error: `authenticate : ${token }`})
    }
}

module.exports = fetchUser