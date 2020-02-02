$(document).ready(function(){

    $(".Scrape").on("click", function(event){
        event.preventDefault();
        alert("Scrape");
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function(data) {
            
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