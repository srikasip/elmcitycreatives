$(document).ready(function(){
  $("a.heroLink").hover(function(){
    assoc_id = $(this).attr("data-partner");
    $("#"+assoc_id).css("display", "block");
    console.log(assoc_id);
  }, function(){
    $("a.linkPartner").css("display","none");
  });

});