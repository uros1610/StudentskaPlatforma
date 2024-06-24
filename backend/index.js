const express = require('express')
const http = require('http')


const app = express()
const server = http.createServer(app);

app.use(express.json());

app.use('/student',require('./routes/student'));
app.use('/profesor',require('./routes/profesor'));
app.use('/obavjestenje',require('./routes/obavjestenje'));
app.use('/auth',require('./routes/auth'));
app.use('/provjera',require('./routes/provjera'))



server.listen(8000,() => {
    console.log("Connected!");
})