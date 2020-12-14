var resizeController = {
  aspectRatio : 0,

  init : function () {
    this.resize();
    this.aspectRatio = jQuery('#header-video #video').width() / jQuery('#header-video #video').height();
  },
  resize : function () {

    var defaultWidth = 1920;//1920;1420
    var defaultHeight = 1080;//1080;843;
    var windowData = jQuery(window);
    var wallpaper = jQuery('#header-video #video');
    //var aspectRatio = wallpaper.width() / wallpaper.height();
    var windowHeight = jQuery(window).height() + 100;
    var windowWidth = jQuery(window).width() + 100;
    var widthLarger = false;

    if ((windowData.width() / windowData.height()) < resizeController.aspectRatio) {
      widthLarger = true;
      windowWidth = ((jQuery(window).height() / 9) * 16) + 100;
      h = (jQuery(window).width() / defaultWidth) * defaultHeight;
      wallpaper.removeClass().addClass('wallpaperHeight');
    } else {
      widthLarger = false;
      wallpaper.removeClass().addClass('wallpaperWidth');
      w = (jQuery(window).height() / defaultHeight) * defaultWidth;
    }

    jQuery('#header-video #video').css({ "height": windowHeight + "px", "width": windowWidth + "px" });
    jQuery('#overlay').css({ "height": windowHeight + "px", "width": windowWidth + "px" });

    var imgWidth = wallpaper.width();
    var imgHeight = wallpaper.height();
    var diff = 0;
    var diff_h = 0;

    if (widthLarger) {
      if (imgWidth > windowData.width()) {
        diff = (imgWidth - windowData.width()) / 2;
        diff_h = (imgHeight - windowData.height()) / 2;
      }
      wallpaper.css("margin", "-" + diff_h + "px 0 0 -" + diff + "px");
    } else {
      diff = (imgWidth - windowData.width()) / 2;
      diff_h = (((windowData.width() / 16) * 9) - windowData.height()) / 2;

      wallpaper.css("margin", "-" + diff_h + "px 0 0 -" + diff + "px");
    }
/*
    var pos = jQuery('content-container').height()/2;

    if(windowData.width() > 850){
      jQuery('content-container').css('top', 'calc(50% - '+pos+'px)');
    } else {
      jQuery('content-container').css('top', '40px');
    }
    */
  }

};
