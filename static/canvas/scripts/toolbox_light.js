$(document).ready(function(){

  LoadToolbox();
  MakeCanvasDropTarget();
  //This is so that i can open and close the toolbox
  $(".xbar .close").click(function(){
    $(".toolbox").css("display", "none");
  }); //End of $(".xbar .close").click(function(){})
});

function LoadToolbox()
{
  $(".toolbox-box").empty();
    $.getJSON( "static/canvas/toolbox/toolbox.json", function(tagData) {
    itemsString = ""
    codeTemplates = {}
    $.each(tagData["toolbox"], function(i, tag){
      itemsString += "<button class='toolbox-item' data-value='"+tag["unique_id"]+"' data-placement='bottom' data-toggle='tooltip' title='" + tag["description"]+"'><span>"+tag["display_name"]+"</span></button>\n";
      codeTemplates[tag["unique_id"]] = tag;
    });
    //console.log(itemsString);

    $(".toolbox-box").append(itemsString);
    $('[data-toggle="tooltip"]').tooltip();

    AddClickEvent(codeTemplates);
  });
}
function MakeCanvasDropTarget()
{
  $(".canvas").droppable({
    accept: ".draggable",
    greedy: true,
    drop: function(event, ui)
    {
      console.log("Dropping an object");
      var dropped = ui.draggable;
      var droppedOn = $(this);
      var dropPosition = $(dropped).offset();
      var canvasPosition = $(".canvas").offset();
      var leftPos = dropPosition.left - canvasPosition.left;
      var topPos = dropPosition.top - canvasPosition.top;
      console.log("Dropped: (" + String(topPos) + ", " + String(leftPos) + ")")
      $(dropped).detach().css({left: leftPos, top: topPos}).appendTo(droppedOn);
    }
  });
}
function AddClickEvent(templateDictionary)
{
  $('button.toolbox-item').click(function(){
    unique_id = $(this).attr("data-value");
    code_template = templateDictionary[unique_id]["code_block"];
    objectThat = $(code_template);

    non_draggable_tags = ["input", "textarea", "button", "select", "option", "img"];
    non_resizable_tags = ["a", "span", "textarea"];
    $(objectThat).addClass("arbitraryObject");

    if(non_draggable_tags.indexOf(templateDictionary[unique_id]["tag"])>=0)
    {
      $(objectThat).wrap("<div class='draggableWrapper'></div>");
      objectThat = $(objectThat).parent();
      $(objectThat).addClass("draggable");
      $(objectThat).append("<img src='static/canvas/images/moveIcon_small.png' alt='(+)' class='mover' />");
      $(".canvas").append(objectThat);
      $(objectThat).draggable({
        "handle":".mover",
        drag: function(){
          position = $(this).offset();
          console.log("("+String(position.top) + ", "+ String(position.left)+")");
        }
      });
    }
    else
    {
      //$(objectThat).addClass("arbitraryObject");
      $(objectThat).addClass("draggable");
      $(".canvas").append(objectThat);
      $(objectThat).draggable({
        drag: function(){
          position = $(this).offset();
          console.log("("+String(position.top) + ", "+ String(position.left)+")");
        }
      });
    }

    if (non_resizable_tags.indexOf(templateDictionary[unique_id]["tag"])<0)
    {
      if ($(objectThat).hasClass("arbitraryObject"))
      {
        $(objectThat).resizable();
      }
      else
      {
        $(objectThat).find(".arbitraryObject").resizable();
      }
    }

    $(objectThat).droppable({
      accept: ".draggable",
      greedy: true,
      drop: function(event, ui) {
        console.log("Dropping an object");
        $(this).removeClass("over");
        var dropped = ui.draggable;
        var droppedOn = $(this);
        var parentPosition = $(droppedOn).offset();
        var childPosition = $(dropped).offset();
        var leftPos = childPosition.left - parentPosition.left;
        var topPos = childPosition.top - parentPosition.top;
        console.log("Dropped On Position: (" + String(parentPosition.top) + ", " + String(parentPosition.left) + ")");
        console.log("Dragged Position: (" + String(childPosition.top) + ", " + String(childPosition.left) + ")");
        $(dropped).detach().css({top:topPos, left:leftPos}).appendTo(droppedOn);
        console.log("New Position: (" +String(topPos) + ", " + String(leftPos)+ ")");
      },
      over: function(event, elem)
      {
        $(this).addClass("over");
      },
      out: function(event, elem)
      {
        $(this).removeClass("over");
      }
    });
    AddContextMenu(unique_id, templateDictionary, objectThat);
  });
}

function AddContextMenu(unique_id, sentTemplate, sentObject)
{
  sentObject.contextmenu(function(e){
    //Start by making the actual box:
    console.log("Fired open context menu");
    $(".contextmenu").remove();
    dropdown = $("<div class = 'dropdown contextmenu'>context menu</div>");
    editables = sentTemplate[unique_id]["attributes"];
    attr_editor = "";
    if(editables.length > 0)
    {
      for(attr in editables)
      {
        console.log(attr);
        attr_editor += "<label class='lblAttr'>" + editables[attr]["display_name"] + "</label>";
        attr_editor += "<input class='txtAttr' type='text' attr="+String(attr)+" data-details='"+editables[attr]["details"]+"'/>";
        attr_editor += "<br />";
      }
      attr_editor += "<button id='contextUpdateObj'>Save</button>";
    }
    contextmenu_content = "<ul class='dropdown'>";
    contextmenu_content += "<li>" + attr_editor + "</li>";
    contextmenu_content += "<li id='removeObj'>x Delete</li>";
    contextmenu_content += "</ul>";

    $(dropdown).empty();
    $(dropdown).append(contextmenu_content);

    $("body").append(dropdown);
    $(dropdown).css("left", e.pageX);
    $(dropdown).css("top", e.pageY);
    
    $("#removeObj").click(function(){
      $(sentObject).remove();
      $(dropdown).remove();
    });
    
    $("#contextUpdateObj").click(function(e){
      e.stopPropagation();
      performAction = sentObject
      if(!($(sentObject).hasClass("arbitraryObject")))
      {
        performAction = $(sentObject).find(".arbitraryObject");
      }
      $.each($(dropdown).find("[attr]"), function(i,item){
        index = $(item).attr("attr");
        changer = $(item).attr("data-details");
        takeAction = performAction
        if(editables[index]["path"] != "self")
        {
          takeAction = $(performAction).find(editables[index]["path"])
        }
        if(changer == "val")
        {
          $(takeAction).text($(item).val());
        }
        else
        {
          $(takeAction).attr(changer, $(item).val());
        }
      });
      $(dropdown).remove();
    });
    $(dropdown).click(function(e) {
      e.stopPropagation();
    });
    
    return false; //So that the default context menu doesn't fire
  });
}
