const express = require('express')
const http = require('http')


const app = express()
const server = http.createServer(app);



const t = 5;

server.listen(8000,() => {
    console.log("Connected!");
})