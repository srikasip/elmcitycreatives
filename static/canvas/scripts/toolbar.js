$(document).ready(function(){
  $('a#linkToolbox').click(function(e){
    e.preventDefault();
    if ($(".toolbox").css("display") == "none")
    {
      $(".toolbox").css("display", "inline");
      $(".toolbox").draggable();
    }

    return false;
  });
});

