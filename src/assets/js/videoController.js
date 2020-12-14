var videoController = {
  randomVideoPosition: 0,
  videoPosition: 0,
  timelineData: data.timeline,
  videoInterval: null,
  player: null,
  modus: 'pause',
  outtakes: false,
  mainVideo: 0,

  init : function (){
    this.player = videojs('video-player', {
      fluid: true
    });

    this.player.poster('assets/images/poster.jpg');
    this.player.src([{
      src: this.timelineData[0].src,
      type: 'video/mp4'
    }]);
    this.player.pause();
  },

  play : function () {
    this.randomVideoPosition = this.mainVideo;
    this.player.currentTime(this.timelineData[0].positions[this.randomVideoPosition].start);
    this.player.play();
    this.startVideoInterval();

    if(this.mainVideo == 0){
      this.mainVideo = 1;
    } else {
      this.mainVideo = 0;
    }
  },

  pause : function () {

    if(this.randomVideoPosition != 0 && this.randomVideoPosition != 1){
      this.randomVideoPosition = 0;
    }
    if(this.getCurrentVideoPosition() > this.timelineData[0].positions[this.randomVideoPosition].introEnd) {
      this.player.currentTime(this.timelineData[0].positions[0].callEnd);
    } else {
      this.player.pause();
      this.player.currentTime(0);
      this.clearVideoInterval();
      navigationController.callButtonIn();
    }
    this.randomVideoPosition = 0;
/*
      if(this.getCurrentVideoPosition() < this.timelineData[0].positions[this.randomVideoPosition].stop){
        if(this.getCurrentVideoPosition() > this.timelineData[0].positions[this.randomVideoPosition].introEnd) {
          this.player.currentTime(this.timelineData[0].positions[this.randomVideoPosition].callEnd);
        } else {
          this.player.pause();
          this.player.currentTime(0);
          this.clearVideoInterval();
          navigationController.callButtonIn();
        }
      }
  */
  },

  random : function (id) {
    var r = 0;

    if(id !== undefined){
      var i = parseInt(id);
      r = i;
    } else {
      r = Math.ceil(Math.random() * ((this.timelineData[0].positions.length - 1)-1))+1;
      if(r == this.randomVideoPosition){
        this.random();
        return;
      }
    }
    this.clearVideoInterval();
    this.randomVideoPosition = r;
    this.setNewVideoPosition(r);
    this.player.play();
    this.startVideoInterval();

  },


  setNewVideoPosition : function (r) {
    t = this.timelineData[0].positions[r].start;
    this.player.currentTime(t);
  },

  getCurrentVideoPosition : function () {
    return this.player.currentTime();
  },

  checkVideoPositionAtEnd : function () {
    if(this.randomVideoPosition != 0 && this.randomVideoPosition != 1){
      if(this.getCurrentVideoPosition() >= this.timelineData[0].positions[this.randomVideoPosition].stop) {
        //this.random();
        this.randomVideoPosition = 0;
        this.player.currentTime(this.timelineData[0].positions[0].callEnd);

      }
    } else {
      if(this.getCurrentVideoPosition() >= this.timelineData[0].positions[this.randomVideoPosition].outtakesIn && !this.outtakes){
        this.outtakes = true;
        navigationController.unlockRandomOuttakes();
      }

      if(this.getCurrentVideoPosition() >= this.timelineData[0].positions[this.randomVideoPosition].stop) {
        this.player.pause();
        this.player.currentTime(0);
        this.clearVideoInterval();
        navigationController.callButtonIn();
      }
    }
  },

  startVideoInterval : function () {
    var _this = this;
    this.videoInterval = setInterval(function () {
      _this.checkVideoPositionAtEnd();
    }, 100);
  },

  clearVideoInterval : function () {
    clearInterval(this.videoInterval);
  }
};
