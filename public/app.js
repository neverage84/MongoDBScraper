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
        $(".Note").on("click", function(event){
            event.preventDefault();
            alert("Note");
            var thisId = $(this).attr("data-id");
            console.log($(thisId));
            $.ajax({
                method: "GET",
                url: "/Note/" + thisId
            }).then(function(data) {
               
            })
        });
        $(".NotePop").on("click", function(event){
            event.preventDefault();
        
            var thisid = $(this).attr("data-id");
            var thistitle = $(this).attr("data-title");
            $("#notes").text(thistitle);;
            alert(thistitle);
            $.ajax({
                method: "GET",
                url: "/articles/" + thisid
            })
            .then(function(data){
                
            })
        })

});