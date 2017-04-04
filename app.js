const express = require('express')
const app = express()
const http = require('http').Server(app)
var io = require('socket.io')(http)
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const sys = require('util')

app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({
  extended: true
}))


// var img = "image.src"
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('block', (binary) => {
    const imgBin = binary.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,|^data:image\/jpg;base64,|^data:image\/bmp;base64,/, '')
    const bitmap = new Buffer(imgBin, 'base64')
    fs.writeFileSync("./public/img/image.bmp", bitmap)
    console.log("Made image!")
    io.emit('load image',  binary)
  })
})

// var bitmap = new Buffer(img, 'base64');
// fs.writeFileSync("example.bmp", bitmap);
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});