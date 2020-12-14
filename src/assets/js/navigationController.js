var navigationController = {
  navigation : jQuery('navigation-container #content-navigation ul li div'),
  init : function () {

    var _this = this;

    jQuery(this.navigation).each(function (index, value) {
      jQuery(this).on('click', function () {
        var videoData = jQuery(this).attr('data-type');
        switch (videoData) {
          case "phone-call-in" :
            videoController.play();
            introController.hide();
            _this.callButtonOut();
            break;
          case "phone-call-out" :
            videoController.pause();
            break;
          case "random-outtakes" :
            if(!jQuery(this).hasClass('locked')){
              var r = jQuery(this).attr('data-id');
              videoController.random(r);
              _this.callButtonOut();
            }
            break;
          default :
        }
      });

      jQuery(this).on('mouseover', function () {
        jQuery(this).addClass('slideInUp').removeClass('slideOutUp');
      });

      jQuery(this).on('mouseout', function () {
        jQuery(this).addClass('slideOutUp').removeClass('slideInUp');
      });
    });
  },

  callButtonIn : function () {
    jQuery('navigation-container .icon.call-in').removeClass('hide');
    jQuery('navigation-container .icon.call-out').addClass('hide');
  },

  callButtonOut : function () {
    jQuery('navigation-container .icon.call-in').addClass('hide');
    jQuery('navigation-container .icon.call-out').removeClass('hide');
  },

  unlockRandomOuttakes : function () {
    jQuery(this.navigation).each(function (index, value) {
      if(jQuery(this).hasClass('locked')){
        jQuery(this).removeClass('locked').addClass('bounceIn').css('cursor','pointer');
      }
    });
  }
};
