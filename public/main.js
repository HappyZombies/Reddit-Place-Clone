// Global variables
var selectedColor //store the selected color globally.
var canvas //the <canvas>
var context //the context of the canvas, aka what's inside it.
var zoom = 40 //how big our pixel block is.


function convertImageToCanvas(img) {
	var tempCanvas = document.createElement("canvas");
	tempCanvas.width = img.width;
	tempCanvas.height = img.height;
	tempCanvas.getContext("2d").drawImage(img, 0, 0);

	return canvas;
}

function convertCanvasToImage(can) {
	var tempImg = new Image();
	tempImg.src = can.toDataURL("image/png");
	return tempImg;
}


//Start jQuery
$(function(){
    
    //Declare our variables.
    selectedColor = $("#selection")

    
    canvas = $('#board').get(0) //the main canvas...
    canvas.height = $(window).width()
    canvas.width = $(window).width()

    context = canvas.getContext("2d")
    

	context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
        
    imgContent = new Image()
    contentPosition = Array()
    //imgContent.src = "http://static1.squarespace.com/static/508adb26e4b06993f6ab5cfb/t/529cb89ae4b0003dbaa4e218/1386002587006/Blank+White+Square-Formatted.jpg"
    //^^temporary white image. The idea would be that the canvas would be saved to an image everytime someone puts down a pixel, then it would load again with websocket.
    // imgContent.onload = function(){
    //     canvas.width = imgContent.width
    //     canvas.height = imgContent.height
    //     context.fillStyle = "#ffffff" //temp
    // }
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(imgContent, 0, 0)
    canvas.addEventListener('mousedown',function(e){
        var x = Math.floor(selectedColor.x);
        var y = Math.floor(selectedColor.y);
        context.fillStyle = selectedColor.css('background-color')
        context.fillRect(x, y, zoom, zoom)
        selectedColor.hide()
    }, true)

    //dragging 
    


    //Call our functions that start the canvas

    //When a user clicks on a div inside the palettes, store the data of that div to our other div (selectedColor)
    $('#palettes div').click(function(e){
        selectedColor.css('background-color', $(this).css("background-color"))
        selectedColor.attr('class', $(this).attr('class'))
        selectedColor.show() //by default we set display:none.
    })

    //this will always track the mouse movement.
    //But we only want to follow/write to the variable if we are display: block for the selected color.
   $(document).mousemove(function(e){
       if(selectedColor.css('display') != 'none'){
	       selectedColor.x = (Math.floor(e.pageX / zoom) * zoom)
	       selectedColor.y = (Math.floor(e.pageY / zoom) * zoom)
	       selectedColor.css("left", selectedColor.x+1);
	       selectedColor.css("top", selectedColor.y+1);
       }
	})
})