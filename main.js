song="";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
function preload()
{
    song = loadSound("music.mp3");
}

function setup(){
     canvas = createCanvas(400,350)
        canvas.position(500,300);

video= createCapture(VIDEO);
video.hide()
poseNet = ml5.poseNet(video, modelLoaded)

}
function modelLoaded (){
    console.log("poseNet is initialized")
} 
function draw() {
    image(video,0,0,400,350)

    fill ("#FF0000");
    stroke( "#FF0000")
if(scoreleftWrist > 0.2)
{
    circle(leftwristX,leftwristY,20)
    InNumberleftWristY = Number(leftwristY);
    remove_decimal = floor(InNumberleftWristY);
    leftwristY_divide_1000 = remove_decimals/1000;
    volume = leftwristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "Volume =" + volume ;
    song.setVolume(volume);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

} 
function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist)
        leftwristX = results[0].pose.leftWrist.x
        leftwristY = results[0].pose.leftWrist.y
        console.log("leftwristX =" + leftwristX + " leftwristY = " + leftwristY )

        rightwristX = results[0].pose.rightWrist.x
        rightwristY = results[0].pose.rightWrist.y
        console.log("rightwristX =" + rightwristX + " rightwristY = " + rightwristY )
    }
}