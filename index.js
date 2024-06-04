const express = require('express')
const http = require('http')


const app = express()
const server = http.createServer(app);

app.use('/student',require('./routes/student'));
app.use('/profesor',require('./routes/profesor'));



server.listen(8000,() => {
    console.log("Connected!");
})