leftPadding = 32;
otherLeft = 32;

$(document).ready(function(){
  menuBar = $(".menu");

  SetBasicLayoutProperties();
  SetSceneEvents();
  $(window).resize(function(){SetBasicLayoutProperties();});
});

function SetSceneEvents()
{
  $menuBar = $(".menu");
  

  //---------------------
  //Welcome Scene
  //---------------------
  $("#welcomeScene").on("inView", function() {
    if($menuBar.hasClass("menu_top"))
    {
      $menuBar.removeClass("menu_top");
      $menuBar.addClass("menu_bottom");
    }
    topScroll = $(document).scrollTop();
    windowHeight = $(window).outerHeight();

    currScreen = topScroll/parseFloat(windowHeight-$menuBar.outerHeight());
    topPos = ((windowHeight-topScroll)-$menuBar.outerHeight());
    topPos = Math.round(topPos);
    topPos = Math.max(0,topPos);

    centerPos = ($menuBar.outerWidth() - $("#header_name").outerWidth() - leftPadding);
    margin_left = -1 * Math.round(currScreen*(centerPos));
    margin_left = Math.max(margin_left, (-1*centerPos));

    $menuBar.css({"bottom":'auto', "top":topPos});
    $("#header_name").css("margin-left",String(margin_left) + "px");
  });

  $("#welcomeScene").on("outView", function(){
    $menuBar.removeClass("menu_bottom");
    $menuBar.css("top", "");
    $menuBar.css("bottom", "");
    $("#header_name").css("margin-left","");
    $menuBar.addClass("menu_top");
  });

  //---------------------
  //Philosophy Scene
  //---------------------

  $("#philosophyScene").on("inView", function() {
    topScroll = $(document).scrollTop() - $(this).offset()["top"];
    windowHeight = $(window).outerHeight();

    currScreen = topScroll/parseFloat(windowHeight);
    stampWidth = $(".stampHolder").outerWidth();
    $(".sceneText").css("display", "block");
    if(stampWidth>0)
    {
      $(".stampHolder").css("display", "block");
    }

    if(currScreen < 0.5)
    {

      stampLeft = GetLinValue(0,-1 * stampWidth, 0.5,otherLeft, currScreen, true);
      stampLeft = Math.min(stampLeft, otherLeft);

      $(".stampHolder").css("left", String(stampLeft) + "px");

      opacity = GetLinValue(0,0,0.5,1,currScreen, false);
      opacity = Math.min(opacity,1);

      $(".sceneText").css("opacity", String(opacity));
    }
    else if(currScreen<1){
      nowItem = 0;

      if($(".stampHolder").outerWidth() <= 0)
      {
        bottomStart = Math.floor(0.16 * $(window).outerWidth());
        bottomEnd = bottomStart/2;
      }
      else
      {
        bottomStart = Math.floor(0.08 * $(window).outerWidth());
        bottomEnd = 0;
      }
      
      
      philosTop = GetLinValue(0.5,bottomStart, 1,bottomEnd, currScreen, true);
      opacity = GetLinValue(0.6,0, 1,1, currScreen, false);
      
      $(".sceneText h3:eq("+String(nowItem)+")").css("transform", "translateY("+String(philosTop)+"px)");
      $(".sceneText h3:eq("+String(nowItem)+")").css("opacity", String(opacity));
    }
    else if(currScreen<3.0) {
      nowItem = Math.floor(currScreen/0.5)-1;
      flScene = ((currScreen/0.5) - 1);

      if($(".stampHolder").outerWidth() <= 0)
      {
        bottomStart = Math.floor(0.16 * $(window).outerWidth());
        bottomEnd = bottomStart/2;
      }
      else
      {
        bottomStart = Math.floor(0.08 * $(window).outerWidth());
        bottomEnd = 0;
      }

      philosTop = GetLinValue(0,bottomStart, 1,bottomEnd, flScene - nowItem, true);
      opacity = GetLinValue(0,0, 0.8,1, flScene - nowItem, false);

      philosTop_old = GetLinValue(0,bottomEnd, 0.5,bottomStart, flScene - nowItem, true);
      opacity_old = GetLinValue(0,1, 0.6,0, flScene - nowItem, false);

      $(".sceneText h3:eq("+String(nowItem)+")").css("transform", "translateY("+String(philosTop)+"px)");
      $(".sceneText h3:eq("+String(nowItem)+")").css("opacity", String(opacity));
      $(".sceneText h3:eq("+String(nowItem-1)+")").css("transform", "translateY("+String(philosTop_old)+"px)");
      $(".sceneText h3:eq("+String(nowItem-1)+")").css("opacity", String(opacity_old));
    }
    else if(currScreen<4.5)
    {
      stampLeft = GetLinValue(3.0,otherLeft, 4.5,-1 * stampWidth, currScreen, true);
      opacity = GetLinValue(3.0,1,4.2,0,currScreen, false);

      $(".stampHolder").css("left", String(stampLeft) + "px");
      $(".stampHolder").css("opacity", String(opacity));
      $(".sceneText").css("opacity", String(opacity));
    }
  });

  $("#philosophyScene").on("outView", function(){
    $('.sceneText').css("display", "none");
    $('.stampHolder').css("display", "none");
  });

  //---------------------
  //Team Scene
  //---------------------
  $("#teamScene").on("inView", function(){
    topScroll = $(document).scrollTop() - $(this).offset()["top"];
    windowHeight = $(window).outerHeight();
    windowWidth = $(window).outerWidth();

    currScreen = topScroll/parseFloat(windowHeight);
    teamerHeight = $(".teamer-group").outerHeight();
    teamerWidth = $(".teamer-group").outerWidth();
    gap = 50;
    topPos = (windowHeight-teamerHeight)/2;
    //topPos = $("#ourTeamTitle").offset["top"] + $("#ourTeamTitle").outerHeight() + $(".teamer-group").css("margin-top");
    centerPos = (windowWidth - (2*teamerWidth))/2 - gap;
    left = GetLinValue(0,centerPos,1, -1*teamerWidth,currScreen,true);
    //left = centerPos;
    $(".teamer-group").css("position", "fixed");
    $(".teamer-group").css("top", String(topPos)+"px");
    $(".teamer-group:eq(0)").css("left", String(left)+"px");
    $(".teamer-group:eq(1)").css("right", String(left)+"px");

  });

  $("#teamScene").on("outView", function(){

    $(".teamer-group").css("position", "");
    $(".teamer-group").css("top", "");
    $(".teamer-group:eq(0)").css("left", "");
    $(".teamer-group:eq(1)").css("right", "");
  });


  //---------------------
  //Process Scene
  //---------------------
  $("#processScene").on("inView", function(){
    // alert("on Process Scene");
    if($menuBar.hasClass("menu_white"))
    {
      $menuBar.removeClass("menu_white");
      $menuBar.addClass("menu_black");
      $("#header_name").css("fill", "#252525");
    }
  });
  $("#processScene").on("outView", function(){
    if ($menuBar.hasClass("menu_black"))
    {
      $menuBar.removeClass("menu_black");
      $menuBar.addClass("menu_white");
      $("#header_name").css("fill", "#ffffff");
    }
  });


  //---------------------
  //Portfolio Scene
  //---------------------
  $("#portfolioScene").on("inView", function(){
    // alert("on Process Scene");
    if($menuBar.hasClass("menu_white"))
    {
      $menuBar.removeClass("menu_white");
      $menuBar.addClass("menu_black");
      $("#header_name").css("fill", "#252525");
    }
  });
  $("#portfolioScene").on("outView", function(){
    if ($menuBar.hasClass("menu_black"))
    {
      $menuBar.removeClass("menu_black");
      $menuBar.addClass("menu_white");
      $("#header_name").css("fill", "#ffffff");
    }
  });

}

function SetBasicLayoutProperties()
{
  $menuBar = $(".menu");
  //Set fixed things for the welcome screen
  windowHeight = $(window).outerHeight();
  stampWidth = $(".stampHolder").outerWidth();
  if(stampWidth > 0)
  {
    stampTop = Math.round((windowHeight-$(".stampHolder").outerHeight())/2.0);
    stampTop = Math.max(stampTop, $menuBar.outerHeight() + 10);

    $(".stampHolder").css("top", String(stampTop) + "px");
    
    textStart = $(".stampHolder").outerWidth() + 2*otherLeft;
    textWidth = $(window).outerWidth() - textStart - otherLeft;
    $(".sceneText").css("top", String(stampTop) + "px");
    $(".sceneText").css("left", String(textStart) + "px");
    $(".sceneText").css("width", String(textWidth) + "px");
  }
  else
  {
    sceneText_height = $(".sceneText h1").outerHeight() + $(".sceneText h2").outerHeight() + $(".sceneText h3").outerHeight();
    topSceneText = Math.floor((windowHeight - sceneText_height)/3.0);
    $(".sceneText").css("top", String(topSceneText) + "px");
    $(".sceneText").css("left", "10%");
    $(".sceneText").css("width", "80%");
  }
}

function GetLinValue(x_min, y_min, x_max, y_max, currX, shouldRound)
{
  m = parseFloat(y_max - y_min)/(x_max - x_min); 
  b = y_min - m*(x_min);
  if(shouldRound)
  {
    return Math.round((m * currX) + b);
  }
  return ((m * currX) + b);
}
