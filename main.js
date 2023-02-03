song="";
scoreleftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song="";
song2="";

function preload()
{
    song=loadSound("music.mp3");

}


function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

     poseNet= ml5.poseNet(video,modelLoaded);
      poseNet.on('pose',gotPoses);

}
function gotPoses(results)
{
if (results.length > 0)
{
    console.log(results);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreleftWrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX" + leftWristX);
    console.log("leftWristY" + leftWristY)
    

    rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("leftWristX = " + leftWristX + "rightWristX = " +rightWristX);

}
}

function draw()
{
    image(video,0,0,600,500);
 fill("#FF0000");
 stroke("#FF0000");
 song2=song.isPlaying();
 console.log("Random Song= " + song2)

 
 if(scoreleftWrist > 0.2)
 {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume_id").innerHTML="volume" + volume;
    song.setVolume(volume);
 }

}

function play()
{
    song.play();
    
    song.setVolume(0.7);
    song.rate(1.5);
}


function modelLoaded()
{
    console.log("pose net is INTIALIZED OK?");
}