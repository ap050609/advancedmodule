img = "";
status = "";
percent = 0;
objects = [];

function preload() {
img = loadImage('dog_cat.jpg')
}

function setup() {
canvas = createCanvas(640, 420);
canvas.center();
objectDetector = ml5.objectDetector('Coco Single-Shot MultiBox Detection Status', modelLoaded);
document.getElementById("status").innerHTML = "Detecting Objects...";
}

function modelLoaded() {
    console.log("Coco Single-Shot MultiBox Detection Model Status = Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img,0,0,640,420);

    if(status != "")
    {
        for (i = 0; i < objects.length; i++) { 
        document.getElementById("status").innerHTML = "Detected Objects!"; 
        fill("#FF0000"); percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
        noFill(); 
        stroke("#FF0000"); 
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }
    }
}