//dynamically add each survey question and the radio buttons
var radioRow, i, j, k;
for (i=0;i<questions.length;i++){
    $("#survey").append(
        $("<div>").attr("id","q"+i).addClass("q").html('<p>'+(i+1)+". "+questions[i]+'</p>')
    );
    
    //should end up having html similar to this:
    //<div class="row">
    //    <label class="radio-inline">
    //        <input type="radio" name="q0" value="1">strongly disagree
    //    </label>
    //    <label class="radio-inline">
    //        <input type="radio" name="q0" value="2">somewhat disagree
    //    </label>
    //    ...
    //</div> 

    radioRow = $("<div>").addClass("row");
    //create row of radio buttons
    for (j=0;j<5;j++){
        //j=2 corresponds to "neutral", which will be the default checked radio button
        k = j+1;
        //but because the value of the radio buttons needs to be 1-5, while j is 0-4, k is needed
        if (j==2){
            radioRow.append(
                $("<label>").addClass("radio-inline").html(
                    '<input type="radio" name="q'+i+'" value="'+k+'" checked>'+choices[j]
                )
            );
        } else {
            radioRow.append(
                $("<label>").addClass("radio-inline").html(
                    '<input type="radio" name="q'+i+'" value="'+k+'">'+choices[j]
                )
            );
        }
    }
    $("#q"+i).append(radioRow);
}
