var dancePlayer = videojs('my-video');

function checkVideo() {
    seconds = Math.floor(dancePlayer.currentTime() * 100);
    for (i = 0; i<420; i++){
      $("#gato" + i).css("fill","black");
    }
    for (i = 0; i<seconds; i++){
      $("#gato" + i).css("fill","red");
    }
}

function goDance(videoTime){
  dancePlayer.currentTime(videoTime);
}

function playDance(){
  if (dancePlayer.paused()) {
    dancePlayer.play();
  }
  else {
    dancePlayer.pause();
  }
}

//This is for the jointanimation
var line = document.getElementById("line");
var centerX = 20, centerY = 100, radius = 80, angle = 0;
var rotate = function(angle){
    angle += 270;
    angle = angle * (Math.PI/180); //get degrees rather than radians
    var x2, y2;
    y2 = 100 - (Math.sin(angle) * 80);
    x2 = 100 - (Math.cos(angle) * 80);
    line.setAttribute( 'x2', x2 );
    line.setAttribute( 'y2', y2 );
}
