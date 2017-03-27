$(document).ready(function() {
  // var $contextMenu = $("#contextMenu");
  
  // $("body").on("contextmenu", "div", function(e) {
  //   $contextMenu.css({
  //     display: "block",
  //     left: e.pageX,
  //     top: e.pageY
  //   });
  //   return false;
  // });
  
  // $contextMenu.on("click", "a", function() {
  //    $contextMenu.hide();
  // });
  $("body").click(function(){
    console.log("body is clicked");
    $(".contextmenu").remove();
  });
  
});