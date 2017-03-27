$(document).ready(function(){
  $(".sideClicker").click(function(){
    var isClickerOut = $(".sideBar").css("left");
    
    if (isClickerOut == "0px")
    {
      $(this).attr("src", "static/canvas/images/next-btn.png");
      $(".sideBar").css("left", "-206px");
    }
    else
    {
      $(this).attr("src", "static/canvas/images/back-btn.png");
      $(".sideBar").css("left", "0px");
    }
  
  });
  $(".margotClicker").click(function(){
    var isClickerOut = $(".margotInterface").css("right");
    
    if (isClickerOut == "0px")
    {
      $(this).attr("src", "static/canvas/images/back-btn.png");
      $(".margotInterface").css("right", "-30%");
    }
    else
    {
      $(this).attr("src", "static/canvas/images/next-btn.png");
      $(".margotInterface").css("right", "0px");
    }
  });
});