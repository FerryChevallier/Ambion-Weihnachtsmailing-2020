var main = {
  init : {
    setup : function () {
      videoController.init();
      navigationController.init();
      resizeController.init();
      introController.init();
      jQuery(window).resize(resizeController.resize).trigger("resize");
    }
  },
};

jQuery(window).on("load", function () {
  main.init.setup();
});

window.addEventListener('blur', function(e){
    videoController.pause();
});
