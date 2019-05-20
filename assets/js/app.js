$(document).ready(function () {
    var topics = ["deal with it", "kermit", "sips tea", "fail", "everything is fine", "you mad", "grumpy cat", "doge", "spongebob"];
    var searchTerm = "";
    

    // create buttons to put on the page
    function generateButtons(buttonList) {
        $("#topic-buttons").empty();
        for (var i = 0; i < buttonList.length; i++) {
            var currentButton = buttonList[i];
            var newButton = $("<button>").addClass("gif-button click").attr("data-term", currentButton).text(currentButton);
            $("#topic-buttons").append(newButton);
        }

        // when the user pushes a button, then it will grab 10 STILL images
        $(".gif-button").on("click", function(event) {
            searchTerm = $(this).attr("data-term");
            generateGifs(searchTerm);
        });
    }
    
    function generateGifs(item) {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=q23oHV6P0B2Ii2IRB8vmBK5rpAMGy3GL&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var gifs = response.data;
            for (var i = 0; i < response.data; i++) {
                
            }
        });
    }

    // when the user submits a new topic, then it is pushed to the topics array
    $("#submit").on("click", function (event) {
        event.preventDefault();
        topics.push($("#new-topic").val());
        generateButtons(topics);
        $("#new-topic").val("");
    });

    // when the user clicks the still image, it will then animate

    generateButtons(topics);
});