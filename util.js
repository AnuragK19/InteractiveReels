// create a rect object
var deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var cloneIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:white;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

var deleteImg = document.createElement("img");
deleteImg.src = deleteIcon;

var cloneImg = document.createElement("img");
cloneImg.src = cloneIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "rgba(0,0,0,0.5)";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.set({
  borderScaleFactor: 1,
});

function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -16,
  offsetX: 16,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon(deleteImg),
  cornerSize: 24,
});

fabric.Object.prototype.controls.clone = new fabric.Control({
  x: -0.5,
  y: -0.5,
  offsetY: -16,
  offsetX: -16,
  cursorStyle: "pointer",
  mouseUpHandler: cloneObject,
  render: renderIcon(cloneImg),
  cornerSize: 24,
});

function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

function cloneObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.left += 10;
    cloned.top += 10;
    canvas.add(cloned);
  });
}

//   All events to be handled

function addLink(isHotspot) {
  // Create a new IText object for the link
  const url = prompt("Enter redirect URL for the user");
  const textToDisplay = prompt("Enter text to display for link");
  const linkText = new fabric.IText(textToDisplay, {
    left: 100,
    top: 100,
    fontSize: 20,
    fill: "white",
    underline: !isHotspot,
    selectable: true,
  });
  // Set the click handler for the link
  linkText.on("mousedown", function () {
    window.open(url, "_blank");
  });
  // Add the link to the canvas
  canvas.add(linkText);
  linkText.center();
  canvas.setActiveObject(linkText);
}

function addText() {
  // Create a new IText object for the link
  const textToDisplay = prompt("Enter text to be displayed");
  const plainText = new fabric.IText(textToDisplay, {
    left: 100,
    top: 100,
    fill: "white",
    selectable: true,
    fontSize: 25,
  });
  // Add the link to the canvas
  canvas.add(plainText);
  plainText.center();
  canvas.setActiveObject(plainText);
}

function addButton() {
  // Create a new IText object for the link
  const textToDisplay = prompt("Enter text for button");
  // create a rectangle with a fill color and position it on the canvas
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    width: 100,
    height: 30,
    fill: "orange",
    rx: 10,
    ry: 10,
  });

  // create a text object with the desired text and styling
  var text = new fabric.Text(textToDisplay, {
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
    fontSize: 20,
    fill: "white",
    textAlign: "center",
    originX: "center",
    originY: "center",
  });

  // group the rectangle and text objects together
  var group = new fabric.Group([rect, text], {
    left: 100,
    top: 100,
  });

  // add the group to the canvas
  canvas.add(group);
  group.center();
  canvas.setActiveObject(group);
}

function applyFilters() {
  // define an array of filter effects
  var filters = [
    "blur(" + Math.random() * 5 + "px)",
    "brightness(" + Math.random() * 200 + "%)",
    "contrast(" + Math.random() * 200 + "%)",
    "grayscale(" + Math.random() * 100 + "%)",
    "hue-rotate(" + Math.random() * 360 + "deg)",
    "invert(" + Math.random() * 100 + "%)",
    "saturate(" + Math.random() * 500 + "%)",
    "sepia(" + Math.random() * 100 + "%)",
    "grayscale(" +
      Math.random() * 100 +
      "%) contrast(" +
      Math.random() * 200 +
      "%)",
    "hue-rotate(" +
      Math.random() * 360 +
      "deg) saturate(" +
      Math.random() * 500 +
      "%)",
    "sepia(" +
      Math.random() * 100 +
      "%) contrast(" +
      Math.random() * 200 +
      "%)",
  ];

  // get a random filter from the filters array
  var randomFilter = filters[Math.floor(Math.random() * filters.length)];
  // apply the filter to the canvas
  document.querySelector("#fabric-canvas").style.filter = randomFilter;
}

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

textColor.addEventListener("change", (e) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === "i-text") {
    activeObject.set("fill", e.target.value);
    canvas.renderAll();
  }
});

bgColor.addEventListener("change", (e) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set("backgroundColor", e.target.value);
    canvas.renderAll();
  }
});

function changeTextAlignment() {
  var activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === "i-text") {
    var textAlignment = activeObject.get("textAlign");
    if (textAlignment === "left") {
      activeObject.set("textAlign", "center");
    } else if (textAlignment === "center") {
      activeObject.set("textAlign", "right");
    } else {
      activeObject.set("textAlign", "left");
    }
    canvas.renderAll();
  }
}

let state = 0;

function toggleAlignment() {
  var activeObject = canvas.getActiveObject();
  var icon = document.getElementById("alignBtnImg");
  switch (state) {
    case 0:
      activeObject.set("textAlign", "left");
      icon.src = "icons/left-align.png";
      canvas.renderAll();
      state = 1;
      break;
    case 1:
      activeObject.set("textAlign", "right");
      icon.src = "icons/right-align.png";
      canvas.renderAll();
      state = 2;
      break;
    case 2:
      activeObject.set("textAlign", "center");
      icon.src = "icons/center-align.png";
      canvas.renderAll();
      state = 0;
      break;
    default:
      break;
  }
}

document.getElementById("alignBtn").addEventListener("click", toggleAlignment);

const addImgBtn = document.getElementById("addImage");
const imgLoader = document.getElementById("imgLoader");
// add click event listener to the button
addImgBtn.addEventListener("click", () => {
  // trigger click event on the file input element
  imgLoader.click();
});

// add change event listener to the file input element
imgLoader.addEventListener("change", (event) => {
  // get the selected file from the file input element
  const file = event.target.files[0];

  // check if the file is an image
  if (file.type.match(/^image\//)) {
    // create a new file reader
    const reader = new FileReader();

    // add load event listener to the reader
    reader.addEventListener("load", () => {
      // create a new Fabric.js image object
      fabric.Image.fromURL(reader.result, (img) => {
        // add the image object to the canvas and render it
        canvas.add(img).renderAll();
      });
    });

    // read the selected file as a data URL
    reader.readAsDataURL(file);
  }
});
