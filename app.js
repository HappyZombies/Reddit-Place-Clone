//npm modules
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routes = require('./src/routes')
const sessionstore = require('sessionstore')
const passportSocketIo = require("passport.socketio")
 const socketIoSessions = require("socket-io.sessions");
//our modules.
require('./src/auth')(passport)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.json())
app.use(cookieParser())
const sessionMiddleware = session({
  secret: 'iloveyou',
  resave: false,
  saveUninitialized: false,
  store: sessionstore.createSessionStore()
})
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport)

io.use((socket, next)=>{
  sessionMiddleware(socket.request, {}, next)
})

io.on('connection', (socket) => {
  console.log('a user connected')
  //console.dir(socket.request.session)
  if(!socket.request.session.passport){
    console.log("you arent logged in/no session yet, kicking you out")
    io.sockets.connected[socket.id].disconnect()
  }
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
  socket.on('load image', (binary) => {
    console.log("User: "+socket.request.session.passport.user.displayName + " place a block.")
    //now, here we should set the timer variable ?
    let data = {};
    data.timeout = 1000
    data.binary = binary
    socket.request.session.passport.user.timeout = 1000
    const imgBin = binary.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,|^data:image\/jpg;base64,|^data:image\/bmp;base64,/, '')
    console.log("Made image!")
    io.emit('load image',  data)

    //in the mean time, save the image !
    const bitmap = new Buffer(imgBin, 'base64')
    fs.writeFileSync("./public/img/image.bmp", bitmap)

  })
})

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});