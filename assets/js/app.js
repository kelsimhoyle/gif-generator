var topics = ["deal with it", "kermit", "sips tea", "fail", "everything is fine", "you mad", "grumpy cat", "doge", "spongebob"];

function generateButtons(buttonList) {
    for (var i = 0; i < buttonList.length; i++) {
        var currentButton = buttonList[i];
        var newButton = $("<button>").addClass("gif-button").attr("data-term", currentButton).text(currentButton);
        $("#topic-buttons").append(newButton);
    }
}

generateButtons(topics);
