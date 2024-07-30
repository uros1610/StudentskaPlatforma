const express = require('express')
const http = require('http')


const app = express()
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'))
app.use('/student',require('./routes/student'));
app.use('/profesor',require('./routes/profesor'));
app.use('/obavjestenje',require('./routes/obavjestenje'));
app.use('/auth',require('./routes/auth'));
app.use('/provjera',require('./routes/provjera'))
app.use('/polozeni',require('./routes/polozeni'))
app.use('/materijal',require('./routes/materijal'));



server.listen(8000,() => {
    console.log("Connected!");
})