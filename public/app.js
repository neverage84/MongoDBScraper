$(document).ready(function(){

    $(".Scrape").on("click", function(event){
        event.preventDefault();
        
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function(data) {
            location.reload();
        })
    });

});


$(document).ready(function(){

    $(".Clear").on("click", function(event){
        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "/Clear"
        }).then(function(data) {
            location.reload();
        })
    });

});

$(document).ready(function(){

    // $(".SavePage").on("click", function(event){
    //     event.preventDefault();
    //     alert("Save");
    //     $.ajax({
    //         method: "GET",
    //         url: "/SavePage"
    //     }).then(function(data) {
           
    //     })
    // });


        // $(".Home").on("click", function(event){
        //     event.preventDefault();
        //     alert("Home");
        //       $.ajax({
        //             method: "GET",
        //             url: "/"
        //     }).then(function(data) {
              
        //     })
        // });
        // $(".Note").on("click", function(event){
        //     event.preventDefault();
        //     alert("Note");
        //     var thisId = $(this).attr("data-id");
        //     console.log($(thisId));
        //     $.ajax({
        //         method: "GET",
        //         url: "/Note/" + thisId
        //     }).then(function(data) {
               
        //     })
        // });
        $(".NotePop").on("click", function(event){
            event.preventDefault();
        
            var thisid = $(this).attr("data-id");
            var thistitle = $(this).attr("data-title");
            $("#notes").text(thistitle);;
            alert(thisid);
            $.ajax({
                method: "GET",
                url: "/articles/" + thisid
            })
            .then(function(data){
                $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

                // A button to submit a new note, with the id of the article saved to it
                $("#savebutton").append("<button class='btn waves-effect waves-light' data-id='" + thisid + "' id='savenote'>Save Note</button>");
                console.log("HEY");
                // if (data.note) {
                //     // Place the title of the note in the title input
                    
                //     // Place the body of the note in the body textarea
                //     $("#bodyinput").val(data.note.body);
                //   }
            })
        })
        $(document).on("click", "#savenote", function() {
            // Grab the id associated with the article from the submit button
            var thisId = $(this).attr("data-id");
        
            // Run a POST request to change the note, using what's entered in the inputs
            $.ajax({
              method: "POST",
              url: "/submit/" + thisId,
              data: {
                // Value taken from note textarea
                body: $("#textarea1").val()
              }
            })
              // With that done
              .then(function(data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
                $("#textarea1").val("");
              });
          
       
          });
});