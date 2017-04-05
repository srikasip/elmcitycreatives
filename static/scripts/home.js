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
  console.log(currScreen);
  if (currScreen < 1)
  {
    //ensure that we go back to the fixedMenu
    if($menuBar.hasClass("menu_top"))
    {
      $menuBar.removeClass("menu_top");
      $menuBar.addClass("menu_bottom");
    }
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
      $("#header_name").css("width","auto")
    }
  }
}