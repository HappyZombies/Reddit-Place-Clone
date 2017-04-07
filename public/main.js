// Global variables
var selectedColor // store the selected color globally.
var canvas // the <canvas>
var context // the context of the canvas, aka what's inside it.
var pixelSize = 20 // how big our pixel block is.
var screenX = $(window).width()
var screenY = $(window).height()
var isDown = false
var startCoords = []
var last = [0, 0]
var socket

var windowX = 0
var windowY = 0

function initializeCanvas () {
  canvas = $('#board').get(0) // get that canvas...
  context = canvas.getContext('2d')
  canvas.width = 0
  canvas.height = 0
  context.imageSmoothingEnabled = false
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false
  context.msImageSmoothingEnabled = false
}

function setSmoothing(){
  // For some reason smoothing is set to true making the image blurry sometimes.
  context.imageSmoothingEnabled = false
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false
  context.msImageSmoothingEnabled = false
}

// Not used
function convertImageToCanvas (img) {
  var tempCanvas = document.createElement('canvas')
  tempCanvas.width = img.width
  tempCanvas.height = img.height
  tempCanvas.getContext('2d').drawImage(img, 0, 0)
  return canvas
}

function convertCanvasToImage (can) {
  var tempImg = new Image()
  tempImg.src = can.toDataURL('image/png')
  return tempImg
}

// Not used
function zoomIn () {
  console.log('I was clicked')
  imgContent.src = './img/image.bmp'
  imgContent.onload = function () {
    canvas.width = imgContent.width
    canvas.height = imgContent.height
    context.drawImage(imgContent, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width * 1.5, canvas.height * 1.5)
  }
}

// Not used
function zoomOut () {
  console.log('I was clicked')
  imgContent.src = './img/image.bmp'
  imgContent.onload = function () {
    canvas.width = imgContent.width
    canvas.height = imgContent.height
    context.drawImage(imgContent, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width * 2, canvas.height * 2)
  }
}

// Start jQuery
$(function () {
    // Declare our variables.
  console.dir(userData)
  selectedColor = $('#selection')
  initializeCanvas()
  socket = io()
    // When we begin, grab what is currently the image.bmp
  imgContent = new Image()
  imgContent.src = './img/image.bmp'
  imgContent.onload = function () {
    canvas.width = imgContent.width
    canvas.height = imgContent.height
    setSmoothing()
    // By doing this, our  canvas will be whatever size is our image.bmp, right now it's 500x500
    context.drawImage(imgContent, 0, 0, canvas.width, canvas.height)
  }
  socket.on('load image', function (data) {
    userData.timeout = data.timeout;
    imgContent.onload = function () {
      canvas.width = imgContent.width
      canvas.height = imgContent.height
      setSmoothing()
      context.drawImage(imgContent, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    }
    imgContent.src = data.binary
  })

  canvas.onmousedown = function (e) {
    if (selectedColor.css('display') != 'none') {
      var x = Math.floor(selectedColor.x)
      var y = Math.floor(selectedColor.y)
      isDown = true
      startCoords = [x - last[0], y - last[0]]
      setSmoothing()
      context.fillStyle = selectedColor.css('background-color')
      context.fillRect(x, y, pixelSize, pixelSize)
      selectedColor.hide()
      // user put in a block, run socket
      socket.emit('load image', convertCanvasToImage(canvas).src)
    }
  }

  canvas.onmouseup = function (e) {
    isDown = false
    last = [
      e.offsetX - startCoords[0],
      e.offsetY - startCoords[1]
    ]
  }

  canvas.onmousemove = function (e) {
    if (!isDown) return
        // else pan the canvas...somehow.
    console.log('user is holding mouse and moving on canvas...pan...')
  }

    // When a user clicks on a div inside the palettes, store the data of that div to our other div (selectedColor)
  $('#palettes div').click(function (e) {
    selectedColor.css('background-color', $(this).css('background-color'))
    selectedColor.attr('class', $(this).attr('class'))
    selectedColor.show() // by default we set display:none.
  })

    // this will always track the mouse movement.
    // But we only want to follow/write to the variable if we are display: block for the selected color.
  $(document).mousemove(function (e) {
    if (selectedColor.css('display') !== 'none') {
	       selectedColor.x = (Math.floor(e.pageX / pixelSize) * pixelSize)
	       selectedColor.y = (Math.floor(e.pageY / pixelSize) * pixelSize)
	       selectedColor.css('left', selectedColor.x + 1)
	       selectedColor.css('top', selectedColor.y + 1)
	       selectedColor.css('width', pixelSize)
	       selectedColor.css('height', pixelSize)
    }
  })
  $(window).resize(function (e) {
        // do something here to account for window resize.
  })
})
