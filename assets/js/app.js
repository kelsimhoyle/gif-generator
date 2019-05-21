

var topics = ["deal with it", "kermit", "sips tea", "fail", "everything is fine", "you mad", "grumpy cat", "doge", "spongebob", "bobs burgers"];
var searchTerm = "";
var allGifs = [];


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
        getGifs(searchTerm);
    });
}

function createContent(currentGif) {
    var stillUrl = currentGif.images.fixed_height_still.url;
    var animateUrl = currentGif.images.fixed_height.url;
    var gifDiv = $("<div>").addClass("gif-div");
    var stillGif = $("<img>").attr("src", stillUrl).attr("data-state", "still").attr("data-still", stillUrl).attr("data-animate", animateUrl).addClass("gif");
    var infoDiv = $("<div>").addClass("info hidden");
    var rating = $("<p>").text(`Rating: ${currentGif.rating}`);
    var title = $("<h4>").text(currentGif.title);
    // var downloadFull = $("<p>").html(`To download the full size gif, <a href="${gifs[i].images.original.url}" download="gif">click here</a>.`)
    infoDiv.append(title, rating);
    gifDiv.append(stillGif, infoDiv);
    return gifDiv;
}


function generateGifs() {
    $("#col-1, #col-2, #col-3, #col-4").empty();
    
    if ($(window).width() <= 800 && $(window).width() > 600) {
        console.log("800");
        // generate gifs into two columns
        for (var i = 0; i < allGifs.length; i++) {
            
            gifDiv = createContent(allGifs[i]);

            if ((i + 1) % 2) {
                $("#col-2").append(gifDiv);
            } else {
                $("#col-1").append(gifDiv);
            }
        }
    } if ($(window).width() <= 600 && $(window).width() > 0) {
        console.log("600")
        for (var i = 0; i < allGifs.length; i++) {
           gifDiv = createContent(allGifs[i]);

            $("#col-1").append(gifDiv);
   
        }
    } else if ($(window).width() > 800 ){
        console.log("big")
        // generate into 4 coulumns
        for (var i = 0; i < allGifs.length; i++) {
            
           gifDiv = createContent(allGifs[i]);

            if ((i + 1) % 4 === 0) {
                $("#col-4").append(gifDiv);
            } else if ((i + 1) % 3 === 0) {
                $("#col-3").append(gifDiv);
            } else if ((i + 1) % 2) {
                $("#col-2").append(gifDiv);
            } else {
                $("#col-1").append(gifDiv);
            }
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

        $(".gif-div").hover(function(){
            $(this).children("div").toggleClass("hidden");
        })
}

function getGifs(item) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + " memes&api_key=q23oHV6P0B2Ii2IRB8vmBK5rpAMGy3GL&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var gifs = response.data;
        console.log(gifs);

        for (var i = 0; i < gifs.length; i++) {
            allGifs.unshift(gifs[i]);
        }

        console.log(allGifs);
        generateGifs();
    });

}

// when the user submits a new topic, then it is pushed to the topics array
$("#submit").on("click", function (event) {
    event.preventDefault();
    topics.push($("#new-topic").val());
    generateButtons(topics);
    $("#new-topic").val("");
});

$(window).on("resize", function(event) {
    var windowWidth = $(window).width();
    generateGifs();
})



generateButtons(topics);
