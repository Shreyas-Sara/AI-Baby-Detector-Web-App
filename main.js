img = "";
sound = "";
objects = [];
status = "";

function preload() {
sound = loadSound("alert.mp3");
img = loadImage("baby.jpg");
}

function setup(){
    canvas = createCanvas(480, 480);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status Object Detecting";
}

function modalLoaded(){
    console.log("Modal loaded successfully");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
image(img, 0, 0, 480, 480);
    if(status != ""){
        detector.detect(img, gotResults);
    for(i = 0; i < objects.lenght; i++){
        if(objects[i].label == 'person'){
            document.getElementById("status").innerHTML = "Baby Detected";
            fill("yellow");
            percent = floor(objects[i].confidence * 100);
            text("baby "+ percent + "%");
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            sound.stop();
        }
        else{
            document.getElementById("status").innerHTML = "Baby not Detected";
            sound.play();
        }
    }
    }

}