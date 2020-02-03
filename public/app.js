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

    $(".SavePage").on("click", function(event){
        event.preventDefault();
        alert("Save");
        $.ajax({
            method: "GET",
            url: "/SavePage"
        }).then(function(data) {
           
        })
    });


        $(".Home").on("click", function(event){
            event.preventDefault();
            alert("Home");
            $.ajax({
                method: "GET",
                url: "/"
            }).then(function(data) {
               
            })
        });
        $(".Saved").on("click", function(event){
            event.preventDefault();
            alert("Saved");
            var thisId = $(this).attr("data-id");
            console.log($(thisId));
            $.ajax({
                method: "GET",
                url: "/saveArticle/" + thisId
            }).then(function(data) {
               
            })
        });
});