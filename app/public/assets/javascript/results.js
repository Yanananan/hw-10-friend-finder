console.log(selfInfo);
console.log(matchInfo);

var i,choiceNum, choiceText;
var matchNum = parseInt($("#match").attr("value")); // to keep track of which match is being displayed
console.log("Currently displaying match number "+matchNum);
var matchInfoFirst = 0; // to keep track of whether the "prev" button should show or hide
var matchInfoLast = matchInfo.length-1; // to keep track of whether the "next" button should show or hide

// populate the questions back into matchResults so the user can review
for (i=0;i<10;i++){
    $("#q"+i).text((i+1)+". "+questions[i]);
}

// populate username and user's choices on the left side of the screen
$("#user").text(selfInfo.username);
populate(selfInfo,"#s");

// populate match's username and match's choices on the right side of the screen
$("#match").text(matchInfo[matchNum].username);
populate(matchInfo[matchNum],"#m");

// hide buttons as needed
hideButtons();

// most of the code below only matters when the user gets multiple matches with the same compatibility.  if only one match is found, then the prev and next buttons will be hidden and the following code won't matter

$(".scrollButton").on("click",function(){
    var buttonId = $(this).attr("id");
    if (buttonId=="prev"){
        //pressed prev button
        matchNum--;
    } else {
        //pressed next button
        matchNum++;
    }
    $("#match").attr("value",toString(matchNum));
    $("#match").text(matchInfo[matchNum].username);
    populate(matchInfo[matchNum],"#m");
    hideButtons();
});

// functions used by code above

function populate(obj,id){
    // populates answers in text form (i.e. strongly agree) instead of number form (i.e. 5)
    // obj is either selfInfo or matchInfo[x]
    // id is either "#s" for self or "#m" for match
    for (i=0;i<10;i++){
        choiceNum = obj["q"+i];
        choiceText = choices[choiceNum-1];
        if (id=="#s"){
            $(id+i).text("You answered "+choiceText);
        } else if (id=="#m"){
            $(id+i).text(obj.username+" answered "+choiceText);
        }
        
    }
}

function hideButtons(){
    // hide or show the buttons for going thru multiple matches, if there are multiple matches
    if(matchNum == matchInfoFirst){
        $("#prev").css("visibility","hidden");
    } else {
        $("#prev").css("visibility","visible");
    }
    if(matchNum == matchInfoLast){
        $("#next").css("visibility","hidden");
    } else {
        $("#next").css("visibility","visible");
    }
}