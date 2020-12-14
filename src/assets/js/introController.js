var introController = {
  init : function () {
    var _this = this;
    jQuery('intro-container #intro').on('click', function () {
      _this.hide();
      videoController.play();
      navigationController.callButtonOut();
    });
  },

  hide : function () {
    jQuery('intro-container').hide();
  }
};
