var topics = ["deal with it", "kermit", "sips tea", "fail", "everything is fine", "you mad", "grumpy cat", "doge", "spongebob"];

// create buttons to put on the page
function generateButtons(buttonList) {
    $("#topic-buttons").empty();
    for (var i = 0; i < buttonList.length; i++) {
        var currentButton = buttonList[i];
        var newButton = $("<button>").addClass("gif-button").attr("data-term", currentButton).text(currentButton);
        $("#topic-buttons").append(newButton);
    }
}

// when the user submits a new topic, then it is pushed to the topics array
$("#submit").on("click", function(event){
    event.preventDefault();
    topics.push($("#new-topic").val());
    generateButtons(topics);
    $("#new-topic").val("");
})

generateButtons(topics);
