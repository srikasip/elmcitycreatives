leftPadding = 64;
otherLeft = 64;

$(document).ready(function(){
  menuBar = $(".menu");
  leftPad = 64;

  SetBasicLayoutProperties();
  SetSceneEvents();
  //$(document).scroll(function(){UpdatePosition(menuBar, leftPad);});
  $(window).resize(function(){SetBasicLayoutProperties();});
});

function SetSceneEvents()
{
  $menuBar = $(".menu");

  $("#welcomeScene").on("inView", function()
  {
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

  $("#teamScene").on("inView", function()
  {
    topScroll = $(document).scrollTop() - $(this).offset()["top"];
    windowHeight = $(window).outerHeight();

    currScreen = topScroll/parseFloat(windowHeight);
    stampWidth = $(".stampHolder").outerWidth();
    $(".sceneText").css("display", "block");
    $(".stampHolder").css("display", "block");

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

      bottomOffset = 0.08 * $(window).outerWidth();
      
      philosTop = GetLinValue(0.5,bottomOffset, 1,0, currScreen, true);
      opacity = GetLinValue(0.5,0, 1,1, currScreen, false);
      
      $(".sceneText h2:eq("+String(nowItem)+")").css("transform", "translateY("+String(philosTop)+"px)");
      $(".sceneText h2:eq("+String(nowItem)+")").css("opacity", String(opacity));
    }
    else if(currScreen<2.5){
      nowItem = Math.floor(currScreen/0.5)-1;
      flScene = ((currScreen/0.5) - 1)

      bottomOffset = 0.08 * $(window).outerWidth();
      //philosDeg = GetLinValue(0.5,90, 1,0, currScreen, true);
      philosTop = GetLinValue(0,bottomOffset, 1,20, flScene - nowItem, true);
      opacity = GetLinValue(0,0, 0.8,1, flScene - nowItem, false);
      
      philosTop_old = GetLinValue(0,20, 0.5,bottomOffset, flScene - nowItem, true);
      opacity_old = GetLinValue(0,1, 0.6,0, flScene - nowItem, false);
      //console.log(philosTop);
      //console.log(deg);
      $(".sceneText h2:eq("+String(nowItem)+")").css("transform", "translateY("+String(philosTop)+"px)");
      $(".sceneText h2:eq("+String(nowItem)+")").css("opacity", String(opacity));
      $(".sceneText h2:eq("+String(nowItem-1)+")").css("transform", "translateY("+String(philosTop_old)+"px)");
      $(".sceneText h2:eq("+String(nowItem-1)+")").css("opacity", String(opacity_old));

    }
    else if(currScreen<4)
    {
      stampLeft = GetLinValue(2.5,otherLeft, 3.5,-1 * stampWidth, currScreen, true);
      opacity = GetLinValue(2.5,1,3.5,0,currScreen, false);

      $(".stampHolder").css("left", String(stampLeft) + "px");
      $(".sceneText").css("opacity", String(opacity));
    }
  });


  $("#teamScene_two").on("inView", function(){console.log("teamScene 2 In View");});
  $("#processScene").on("inView", function(){console.log("ProcessScene In View");});
  $("#portfolioScene").on("inView", function(){console.log("Portfolio Scene In View");});
  $("#footerScene").on("inView", function(){console.log("Footer Scene In View");});


  $("#welcomeScene").on("outView", function(){
    $menuBar.removeClass("menu_bottom");
    $menuBar.addClass("menu_top");
    $menuBar.css("top", "0");
    $("#header_name").css("margin-left","0px");
    $("#header_name").css("width","auto");
  });

  $("#teamScene").on("outView", function(){
    $('.sceneText').css("display", "none");
    $('.stampHolder').css("display", "none");
  });
  $("#teamScene_two").on("outView", function(){console.log("teamScene 2 Out of View");});
  $("#processScene").on("outView", function(){console.log("Process Out of View");});
  $("#portfolioScene").on("outView", function(){console.log("Portfolio Scene Out of View");});
  $("#footerScene").on("outView", function(){console.log("Footer scene Out of View");});
}

function SetBasicLayoutProperties()
{
  $menuBar = $(".menu");
  //Set fixed things for the welcome screen
  windowHeight = $(window).outerHeight();

  stampTop = Math.round((windowHeight-$(".stampHolder").outerHeight())/2.0);
  stampTop = Math.max(stampTop, $menuBar.outerHeight() + 10);

  $(".stampHolder").css("top", String(stampTop) + "px");
  
  textStart = $(".stampHolder").outerWidth() + 2*otherLeft;
  textWidth = $(window).outerWidth() - textStart - otherLeft;
  $(".sceneText").css("top", String(stampTop) + "px");
  $(".sceneText").css("left", String(textStart) + "px");
  $(".sceneText").css("width", String(textWidth) + "px");
}





function UpdatePosition($menuBar, leftPadding)
{
  topScroll = $(document).scrollTop();
  windowHeight = $(window).outerHeight();
  // documentHeight = $(document).outerHeight();
  // numScreens = (documentHeight - windowHeight)/windowHeight;
  currScreen = topScroll/parseFloat(windowHeight-$menuBar.outerHeight());
  SetBackgroundyStuff($menuBar, currScreen);

  if (currScreen < 1)
  {
    topPos = ((windowHeight-topScroll)-$menuBar.outerHeight());
    topPos = Math.round(topPos);

    centerPos = ($menuBar.outerWidth() - $("#header_name").outerWidth() - leftPadding);
    margin_left = -1 * Math.round(currScreen*(centerPos));

    $menuBar.css({"bottom":'auto', "top":topPos});
    $("#header_name").css("margin-left",String(margin_left) + "px");
  }
  else
  {
    if($menuBar.hasClass("menu_bottom"))
    {
      $menuBar.removeClass("menu_bottom");
      $menuBar.addClass("menu_top");
      $menuBar.css("top", "0");
      $("#header_name").css("margin-left","0px");
      $("#header_name").css("width","auto");
    }
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


function SetBackgroundyStuff($menuBar, currScreen)
{
  if (currScreen < 1)
  {
    //ensure that we go back to the fixedMenu
    if($menuBar.hasClass("menu_top"))
    {
      $menuBar.removeClass("menu_top");
      $menuBar.addClass("menu_bottom");
    }
  }
  else
  {
    if($menuBar.hasClass("menu_bottom"))
    {
      $menuBar.removeClass("menu_bottom");
      $menuBar.addClass("menu_top");
      $menuBar.css("top", "0");
      $("#header_name").css("margin-left","0px");
      $("#header_name").css("width","auto");
    }
  }

  if(currScreen>=3)
  {
    if ($menuBar.hasClass("menu_white"))
    {
      $menuBar.removeClass("menu_white");
      $menuBar.addClass("menu_black");
      $("#header_name").attr("fill", "#252525");
    }
  }
  else
  {
    if ($menuBar.hasClass("menu_black"))
    {
      $menuBar.removeClass("menu_black");
      $menuBar.addClass("menu_white");
      $("#header_name").attr("fill", "#ffffff");
    }
  }
}