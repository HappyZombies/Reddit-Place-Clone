const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path')

app.use(express.static(path.join(__dirname, './public')))

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});