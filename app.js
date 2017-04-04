const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs');
const sys = require('util');

app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({
  extended: true
}))


// var img = "image.src".replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,|^data:image\/jpg;base64,|^data:image\/bmp;base64,/, '')

// var bitmap = new Buffer(img, 'base64');
// fs.writeFileSync("example.bmp", bitmap);
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});