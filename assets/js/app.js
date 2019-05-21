

    var topics = ["deal with it", "kermit", "sips tea", "fail", "everything is fine", "you mad", "grumpy cat", "doge", "spongebob", "bobs burgers"];
    var searchTerm = "";

    // create buttons to put on the page
    function generateButtons(buttonList) {
        $("#topic-buttons").empty();
        for (var i = 0; i < buttonList.length; i++) {
            var currentButton = buttonList[i];
            var newButton = $("<button>").addClass("gif-button").attr("data-term", currentButton).text(currentButton);
            $("#topic-buttons").append(newButton);
        }

        // when the user pushes a button, then it will grab 10 STILL images
        $(".gif-button").on("click", function (event) {
            searchTerm = $(this).attr("data-term");
            generateGifs(searchTerm);
        });
    }

    function generateGifs(item) {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + " memes&api_key=q23oHV6P0B2Ii2IRB8vmBK5rpAMGy3GL&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var gifs = response.data;
            console.log(gifs);
            for (var i = 0; i < gifs.length; i++) {
                var stillUrl = gifs[i].images.fixed_height_still.url;
                var animateUrl = gifs[i].images.fixed_height.url;
                var gifDiv = $("<div>").addClass("gif-div");
                var stillGif = $("<img>").attr("src", stillUrl).attr("data-state", "still").attr("data-still", stillUrl).attr("data-animate", animateUrl).addClass("gif");
                var rating = $("<p>").text(`Rating: ${gifs[i].rating}`);
                gifDiv.append(stillGif, rating);

                if( ( i+ 1) % 4 === 0) {
                    $("#col-4").prepend(gifDiv);
                } else if ((i + 1) % 3 === 0) {
                    $("#col-3").prepend(gifDiv);
                } else if ((i + 1) % 2) {
                    $("#col-2").prepend(gifDiv);
                } else {
                    $("#col-1").prepend(gifDiv);
                }
            }
            // when gif is clicked, it goes from still to animated and then animated to still
            $(".gif").on("click", function() {
                var currentGif = $(this);
                var state = currentGif.attr("data-state");
                var gifStill = currentGif.attr("data-still");
                var gifAnimated = currentGif.attr("data-animate");
                if (state === "still") {
                    currentGif.attr("src", gifAnimated).attr("data-state", "animate");
                } else if (state === "animate") {
                    currentGif.attr("src", gifStill).attr("data-state", "still");
                }
            });
        });

    }

    // when the user submits a new topic, then it is pushed to the topics array
    $("#submit").on("click", function (event) {
        event.preventDefault();
        topics.push($("#new-topic").val());
        generateButtons(topics);
        $("#new-topic").val("");
    });



    generateButtons(topics);
