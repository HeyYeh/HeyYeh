//About me game - math needs solving
var catches = 0;
var attempts = 0;
var winRate = 0;

$(document).ready(function() {
var red = Math.floor(Math.random() * 255);
var green = Math.floor(Math.random() * 255);
var blue = Math.floor(Math.random() * 255);

$("#img").css("background-color", "rgba(" + red + "," + green + "," + blue + ", 0.3")
});



jQuery(function ($) {
    $('#img').mouseover(function () {
        var dWidth = $(document).width(),
            dHeight = $(document).height(),
            nextX = Math.floor(Math.random() * dWidth * Math.random()),
            nextY = Math.floor(Math.random() * dHeight);

        $(this).animate({
            right: nextX + 'px',
            top: nextY + 'px'
        });

        attempts = attempts + 1;
        $(".attempts").html("Attempts: " + String(attempts));

        winRate = Math.round(catches / (attempts) * 100);
        $(".percent").html("Win rate: " + String(winRate) + "%");

    });
});

$("#img").click(function () {
    catches = catches + 1;
    $(".catch").html("Catches: " + String(catches));

    winRate = Math.round(catches / (attempts) * 100);
    $(".percent").html("Win rate: " + String(winRate) + "%");
});
