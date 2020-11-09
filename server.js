const express = require('express')
const server = express()
const session = require('express-session')

const sessionConfig = {
    name: 'notsession',
    secret: ' Nobody tosses a dwarf',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'? true: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

server.use(session(sessionConfig))
server.use(express.json())


server.get('/' (res, res) => {
    res.send('The API is Working')
})

// Routing
const authRoutes = require('./auth/authRouter')
server.use('/api/', authRoutes)

const db = require('./data/db')

server.use(function(req, res, next){
    if(req.path.indexOf('/api/users') !== -1){
        if(req.session && req.session.user) return next()
        res.status(401).json({message: 'You Shall Not Pass!'})
    } else {
        res.status(401).json({ message: 'You Shall Not Pass!'})
    }  
})

server.get("/api/users", (req, res)=>{
    db("users").then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        return res.status(500).json({message: "A server error has occurred"});
    })
});

module.exports = server;