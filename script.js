const canvas = new fabric.Canvas("fabric-canvas");

canvas.setDimensions({
  width: window.innerWidth,
  height: window.innerHeight,
});

const videoUpload = document.getElementById("video-upload");
const imageUpload = document.getElementById("image-upload");
const video = document.getElementById("video-player");
const image = document.getElementById("preview-image");

// Listen for file selection
imageUpload.addEventListener("change", function (e) {
  canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
  canvas.clear();
  // Get the selected file
  var file = e.target.files[0];

  // Create a new video element and set the source to the selected file
  image.src = URL.createObjectURL(file);

  fabric.Image.fromURL(image.src, function (img) {
    // Set the image as the background of the canvas
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      // Scale the image to fit the canvas size
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height,
    });
    document.querySelector(".btnImg").textContent = "Change Image";
  });
});

// Listen for file selection
videoUpload.addEventListener("change", function (e) {
  canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
  canvas.renderAll(); // render the canvas
  // Get the selected file
  var file = e.target.files[0];

  // Create a new video element and set the source to the selected file
  video.src = URL.createObjectURL(file);

  // Wait for the video to load
  video.addEventListener("loadeddata", function () {
    console.log("Video loaaded and can be played...");
    // Create a new Fabric.js image object from the video element
    var fabricVideo = new fabric.Image(video, {
      left: 0,
      top: 0,
      width: video.videoWidth,
      height: video.videoHeight,
      scaleX: canvas.width / video.videoWidth,
      scaleY: canvas.height / video.videoHeight,
    });

    // Add the image object to the canvas
    canvas.add(fabricVideo);
    fabricVideo.getElement().play();
    document.querySelector(".btn").textContent = "Change Video";
  });

  fabric.util.requestAnimFrame(function render() {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  });
});
