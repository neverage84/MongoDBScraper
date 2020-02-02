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