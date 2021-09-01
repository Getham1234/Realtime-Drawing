noseX = 0;
noseY = 0;
LeftWristX = 0;
RightWristX = 0;
difference = 0;
function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(50, 120);

    canvas = createCanvas(550, 550);
    canvas.position(800, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    background("#bad7db");
    fill("#0b5e56");
    stroke("#aed4d0");
    square(noseX, noseY, difference);
    document.getElementById("square_dimensions").innerHTML = "The x and y coordinates are " + floor(noseX) + ", " + floor(noseY) + " and the width and heght is " + difference + "."
}

function modelLoaded(){
    console.log("Model Loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X is " + noseX + " and Nose yy is " + noseY);
        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        difference = floor(LeftWristX - RightWristX);
    }
}