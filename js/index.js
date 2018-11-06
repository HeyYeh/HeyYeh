//dark mode var
var style = true;


//typerwriter stuff
var typed = new Typed('#theOtherBits', {
    strings: ["(triumphant) <br> I can't believe I tricked you into coming here.<br> ^1000 <i>So</i>... ^1000 I'm Ian.",
            "(triumphant) <br> I can't believe I tricked you into coming here.<br> ^800 I'm a ^300 writer.",
            "(triumphant) <br> I can't believe I tricked you into coming here.<br> ^800 I'm a ^300 film-maker.",
           "(triumphant) <br> I can't believe I tricked you into coming here.<br> ^800 I'm an ^300 ideation executive.",
           "(triumphant) <br> I can't believe I tricked you into coming here.<br> ^800 I'm an ^200 animal lover, crafter, baker...",
           "(triumphant) <br> I can't believe I tricked you into coming here.<br> ^800 I'm ^650 happy to see you.^1000 <br>And I guess I need to entertain you now, huh?^1000 <br>Why don't you have a cheeky scroll down?^1000 <br>Go on, your scroll wheel is so^1000 lonely.^1000 <br>(lewdly) <br>^500 I want to see you <i>touch</i> it..."],
    backSpeed: 25,
    typeSpeed: 30,
    smartBackspace: true
});

//this controls the light mode/dark mode switcher - just for fun really...
$(".styleButton").click(function () {

    if (style == true) {
        $(".styleButton").css("background-color", "grey");
        $("body").css("background-color", "black");
        //$("p").css("background-color", "white");
        $(".heroCont").css("color", "white");
    }
    if (style == false) {
        $(".styleButton").css("background-color", "blue");
        $("body").css("background-color", "#fbfbf8");
        //$("p").css("background-color", "black");
        $(".heroCont").css("color", "black");
    };


    style = !style;
})

//video popouts

//this calculates viewport width then some other stuff to know what to times the iframe by for a not-shit-looking video player
function getMultiplier(iframeWidth) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var value = (w - (w * 0.25)) / iframeWidth;
    return value;
}

//This is the basic function that brings up the faded background and loads the video in. Seperating them like this was to keep the individual video click prompts tidier.
function popOut(video) {
    $("#filterHost").addClass("popFilter");
    $("body").append(video);

    var multValue = (getMultiplier($(".popVideoPlay").width())).toFixed(1);
    if (multValue == 1) {
        multValue = 1.2
    };

    $(".popVideoPlay").css("width", ($(".popVideoPlay").width() * multValue));
    $(".popVideoPlay").css("height", ($(".popVideoPlay").height() * multValue));
}

$("#item1").click(function () { //active

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/VEOJcZk8R5U/&vq=hd1080\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item2").click(function () { //I've been blind

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/omcdhqMEMzw/&vq=hd1080\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item3").click(function () { //Totem

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/72BgoQwoycI\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item4").click(function () { //DYAF

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/An4yDDyYJG8\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item5").click(function () { //Seraphim

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/Ejb3sITMIoM\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item6").click(function () { //OFITC

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/R0VsnCOEHwM\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item7").click(function () { //Breathe

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/_xPMOC-8Jrw\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item8").click(function () { //IAGASU

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/180205217?title=0&byline=0&portrait=0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

    popOut(videoObject);

})

$("#item9").click(function () { //WDTG

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/BYwRLo4hDBo\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

})


$("#filterHost").click(function () {
    $("#filterHost").removeClass("popFilter");
    $(".popVideoPlay").remove();
})


