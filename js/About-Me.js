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
        var offset = $("#img").offset(),
            nextX = Math.floor((Math.random() * offset.left) - 200),
            nextY = Math.floor((Math.random() * offset.top) + 200);
        
        
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
