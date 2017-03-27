$(document).ready(function(){


  load_toolbox();

  $(".xbar .close").click(function(){
    $(".toolbox").css("display", "none");
  });

});

function load_toolbox()
{
  $(".toolbox-box").empty();

  $.getJSON( "static/canvas/toolbox/tag_data.json", function(tagData) {
    itemsString = ""

    $.each(tagData["tags"], function(i, tag){
      itemsString += "<button class='toolbox-item' data-value='"+tag["tag"]+"' data-toggle='tooltip' title='"+tag["description"]+"'>"+tag["tag"]+"</button>\n";
    });
    console.log(itemsString);

    $(".toolbox-box").append(itemsString);
    $('[data-toggle="tooltip"]').tooltip(); 

    add_toolitem();
  });
}

function add_toolitem()
{
  $(".toolbox-item").click(function(){
    val = $(this).attr("data-value");
    //writeString = "<"+val+" class='arbitraryObject'>"+val.toUpperCase()+"</"+val+">";
    singleLineTextyArray = ["a", "label", "h1", "h2", "h3", "h4", "h5", "h6"]
    if (singleLineTextyArray.indexOf(val)>=0)
    {
      console.log("Inside special case: " + val)
      writeString = "<div class='"+val+" arbitraryObject' object-type='"+val+"'>";
      writeString += val.toUpperCase();
      //writeString += "<input class='toolinput' type='text' value='"+val+"'>";
      writeString += "</div>";
    }
    else
    {
      console.log("Inside default: " + val)
      writeString = "<div class='"+val+" arbitraryObject' object-type='"+val+"'>"+val.toUpperCase()+"</div>";
    }

    writingThing = $(writeString);
    $(".canvas").append(writingThing);
    $(writingThing).draggable({cancel: false});
    $(writingThing).resizable();
    $(writingThing).droppable({
      greedy:true,
      classes: { "ui-droppable": "highlight"},
      drop: function(event, ui){
        $(this).append(ui);
      }
    });
  });
}


/*
    <div class="toolbox-box">
      <button class="toolbox-item" data-value="div">Container</button>
      <button class="toolbox-item" data-value="button">Button</button>
      <button class="toolbox-item" data-value="link">Link</button>
      <button class="toolbox-item" data-value="label">Label</button>
    </div>
*/