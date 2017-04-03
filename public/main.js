// Global variables
var selectedColor //store the selected color globally.
var canvas //the <canvas>
var context //the context of the canvas, aka what's inside it.
var canvasImg


// function that will draw the canvas.
function drawCanvas(){
    
    canvas = $('#board').get(0)
    canvas.height = 750
    canvas.width = 750

    context = canvas.getContext("2d")
    

	context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
        
    context.fillStyle = "#ffffff"; //temp
    context.fillRect(0, 0, canvas.width, canvas.height);

    //get the canvas and save the image.
    

}

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
    //canvasImg = new Image()
    canvasImg = new Image()
    contentPosition = Array()

    var zoom = 40 //how big our pixel block is.

    drawCanvas()

    canvas.addEventListener('mousedown',function(e){
        var x = Math.floor(selectedColor.x);
        var y = Math.floor(selectedColor.y);
        context.fillStyle = selectedColor.css('background-color')
        context.fillRect(x, y, 40, 40)
        selectedColor.hide()
    }, true)


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
        selectedColor.x = e.pageX - selectedColor.width()/2
        selectedColor.y = e.pageY - selectedColor.height()/2
        selectedColor.css("left", selectedColor.x);
        selectedColor.css("top", selectedColor.y);
       }
	})
})