$(document).ready(function(){
  menuBar = $(".menu");
  leftPad = 64;

  $(document).scroll(function(){UpdatePosition(menuBar, leftPad);});
  $(window).resize(function(){UpdatePosition(menuBar, leftPad);});
});

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