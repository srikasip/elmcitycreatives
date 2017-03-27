$(document).ready(function(){
  ////TODO: Get the actual name of the project and load in the textbox.
  $("#txtProjectTitle").keypress(function(e){
    if(e.which == 13)
    {
      $(this).blur();
    }
  });
  $("#txtProjectTitle").blur(function(){
    currentName = $(this).val().trim();
    if(currentName == "")
    {
      $(this).val($(this).attr("default-text"));
    }
    //TODO: Call AJAX to actually save the name of the project.
  });
});