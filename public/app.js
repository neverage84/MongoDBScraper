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

});