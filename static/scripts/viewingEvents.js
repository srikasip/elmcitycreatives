$(document).ready(function(){
  positions = [];
  $(".scene").each(function(){
    position = {}
    $(this).attr("data-inview", "false");
    position["scene"] = $(this);
    position["top"] = $(this).offset()["top"];
    position["height"] = $(this).outerHeight();
    position["inView"] = false;
    positions.push(position);
  });

  CheckSceneView(positions);

});

function CheckSceneView(positions)
{
  windowHeight = $(window).outerHeight();
  scrollTop = $(document).scrollTop();
  for(x in positions){
    if ((positions[x]["top"] <= scrollTop) && ((positions[x]["top"]+positions[x]["height"]) >= scrollTop))
    {
      positions[x]["inView"] = true;
      positions[x]["scene"].attr("data-inview", "true");
      positions[x]["scene"].trigger("inView");
    }
    else
    {
      if (positions[x]["inView"])
      {
        positions[x]["inView"] = false;
        positions[x]["scene"].attr("data-inview", "false");
        positions[x]["scene"].trigger("outView");
      }
    }
  }  
  window.requestAnimationFrame(function(){CheckSceneView(positions);});
}