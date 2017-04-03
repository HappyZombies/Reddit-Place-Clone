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


http.listen(3000, function(){
  console.log('listening on localhost:3000');
});