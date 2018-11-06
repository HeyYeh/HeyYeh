/////////////////////////////////////BLOG////////////////////////////////////

/*var typed = new Typed('#nameText', {
    strings: ["IAN BOUSHER (O.S.)"],
    backSpeed: 25,
    typeSpeed: 40,
    smartBackspace: true,
    startDelay: 400,
    autoInsertCss: true,
    showCursor: false
});*/

//video popouts

//this calculates viewport width then some other stuff to know what to times the iframe by for a not-shit-looking video player
function getMultiplier(iframeWidth) {
    'use strict';
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

        value = (w - (w * 0.25)) / iframeWidth;
    return value;
}

//This is the basic function that brings up the faded background and loads the video in. Seperating them like this was to keep the individual video click prompts tidier.
function popOut(video) {
    $("#filterHost").addClass("popFilter");
    $("body").append(video);

    var multValue = (getMultiplier($(".popVideoPlay").width())).toFixed(1);
    if (multValue === 1) {
        multValue = 1.2
    }

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


$(document).ready(function() {

//mobile menu
var hamOpen = false;

$(".menuWordCont").click(function () {

    if (hamOpen === true) {
        $(".mobileStickBar").animate({
            height: "300px"
        });
        
        $("#menuBottom").animate({
            top: "240px"
        });

    }

    if (hamOpen === false) {
        $(".mobileStickBar").animate({
            height: "30px"
        });

        $("#menuBottom").animate({
            top: "-24px"
        });

        
    }

    hamOpen = !hamOpen;

});
    
    })

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("mobileStickBar");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
