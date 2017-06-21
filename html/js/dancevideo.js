var dancePlayer = videojs('my-video');
//var interval = setInterval(checkVideo, 100);

function checkVideo() {
    seconds = Math.floor(dancePlayer.currentTime() * 100);
    console.log(seconds);
    //$(".dot").css("fill","black");
    for (i = 0; i<rownumber; i++){
      $("#gato" + i).css("fill","black");
    }
    for (i = 0; i<seconds; i++){
      $("#gato" + i).css("fill","red");
    }
}

function goDance(videoTime){
  dancePlayer.currentTime(videoTime);
}

//alert("a");
