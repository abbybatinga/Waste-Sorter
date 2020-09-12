const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

const startButton = document.getElementById('takePic');

const width = 640;
const height = 480;


const upload = document.getElementById('file');

// Start video stream
navigator.mediaDevices.getUserMedia({video:true})
.then(function(stream) {
    webcam.srcObject = stream;
})
.catch(function(err) {
    console.log("An error occurred: " + err);
});


// Take pic when button pressed
startButton.addEventListener('click', takePicture);



// Save current frame and convert to PNG
function takePicture() {
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(webcam, 0, 0, width, height);
    webcam.style.display = "none";
    var data = canvas.toDataURL('image/png');
    console.log(data);
}


// Clear photo to take another picture
function clearPhoto() {
    var context = canvas.getContext('2d');
    context.fillStyle('AAA');
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
}



// Display uploaded image
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = width;
            canvas.height = height;
            webcam.style.display = "none";
            ctx.drawImage(img,0,0, canvas.width, canvas.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
