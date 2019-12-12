//main function for opening and closing stuff
function linkFun() {

    $('a[data-id]').click(function (link) {

        link.preventDefault(); //stop links going anywhere for now

        //data open is what you want the link to open, data close is what you want it to close
        var openedby = $(this).attr('data-open');
        $('[data-id="' + openedby + '"]').removeClass('disabled').addClass('enabled');

        var closedby = $(this).attr('data-close');
        $('[data-id="' + closedby + '"]').remove();

        //this kills the parents of each link, creating many Batman links
        $(this).contents().unwrap();

    })
}
//end main function section


//section for changing time of day in script to current time. It's a pointless detail, so sue me. Don't sue me.
$(document).ready(function () {
    var now = new Date(),
        hours = now.getHours();

    var timeDenom = "fgf";

    if (hours >= 0 && hours < 1) {
        timeDenom = "WITCHING HOUR";
    }
    if (hours >= 1 && hours < 6) {
        timeDenom = "NIGHT";
    }
    if (hours >= 6 && hours < 7) {
        timeDenom = "DAWN";
    }
    if (hours >= 7 && hours < 12) {
        timeDenom = "MORNING";
    }
    if (hours >= 12 && hours < 13) {
        timeDenom = "NOON";
    }
    if (hours >= 13 && hours < 17) {
        timeDenom = "AFTERNOON";
    }
    if (hours >= 17 && hours < 19) {
        timeDenom = "EVENING";
    }
    if (hours >= 19 && hours < 20) {
        timeDenom = "DUSK";
    }
    if (hours >= 20 && hours < 24) {
        timeDenom = "NIGHT";
    }


    $("#TOD").text(timeDenom);
    linkFun();
});
//end time of day section

//This section for changing to dark mode and back
var pageColour = 0; //0 = white background
var screenWidth = 0;

$("#colourShift").click(function () {

    screenWidth = $(window).width();

    if (pageColour == 0) {
        $("body").css("background-color", "#16161d"); //the black here is eisengrau
        $("li").css("color", "#fdfdfd");
        $("a").css("color", "#fdfdfd");
        $("div").css("color", "#fdfdfd");
        $("#emailCorner").css("color", "#fdfdfd");
        $("#colourShift").html("Black");

        if (screenWidth > 709) {
            $("a").css("background-image", "url('../assets/whiteunderline2.png'");
        }
        if (screenWidth <= 709) {
            $("a").css("background-image", "url('../assets/whiteunderline.png'");
        }
    }
    if (pageColour == 1) {
        $("body").css("background-color", "rgb(251,251,251)");
        $("li").css("color", "black");
        $("a").css("color", "black");
        $("div").css("color", "black");
        $("#emailCorner").css("color", "black");
        $("#colourShift").html("White");

        if (screenWidth > 709) {
            $("a").css("background-image", "url('../assets/blackunderline2.png'");
        }
        if (screenWidth <= 709) {
            $("a").css("background-image", "url('../assets/blackunderline.png'");
        }
    }


    pageColour = !pageColour;
})

$("#nightIcon").click(function () {

    if (pageColour == 0) {
        $("body").css("background-color", "#16161d"); //the black here is eisengrau
        $("li").css("color", "#fdfdfd");
        $("hi").css("color", "#fdfdfd");
        $("hip").css("color", "#fdfdfd");
        $("hop").css("color", "#fdfdfd");
        $("hup").css("color", "#fdfdfd");
        $(".aboutWords").css("color", "#fdfdfd");
        $(".portfolioText").css("color", "#fdfdfd");
        $(".storyTitle").css("color", "#fdfdfd");
        $("a").css("color", "#fdfdfd");
        $("div").css("color", "#fdfdfd");
        $('#nightIcon').attr('src', 'assets/Day.png');
    }
    if (pageColour == 1) {
        $("body").css("background-color", "rgb(251,251,251)");
        $("li").css("color", "black");
        $("hi").css("color", "black");
        $("hip").css("color", "black");
        $("hop").css("color", "black");
        $("hup").css("color", "black");
        $(".aboutWords").css("color", "black");
        $(".storyTitle").css("color", "black");
        $(".portfolioText").css("color", "black");
        $("a").css("color", "black");
        $("div").css("color", "black");
        $('#nightIcon').attr('src', 'assets/Night.png');
    }


    pageColour = !pageColour;
})


//end colour shift section


//video pop outs section

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

//click filter to close it
$("#filterHost").click(function () {
    $("#filterHost").removeClass("popFilter");
    $(".popVideoPlay").remove();
})

$("#item1").click(function () { //active

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/VEOJcZk8R5U/&vq=hd1080\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item2").click(function () { //I've been blind

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/omcdhqMEMzw/&vq=hd1080\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item3").click(function () { //Totem

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube.com/embed/hXwozor5qz8\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; \" allowfullscreen></iframe>";

    popOut(videoObject);
    
});

$("#item4").click(function () { //DYAF

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/An4yDDyYJG8\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item5").click(function () { //Seraphim

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/Ejb3sITMIoM\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item6").click(function () { //OFITC

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/324843376?app_id=122963&amp;wmode=opaque&amp;autoplay=1\" ></iframe>";

    popOut(videoObject);

});

$("#item7").click(function () { //Breathe

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/343941212?app_id=122963&amp;wmode=opaque\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\"></iframe>";

    popOut(videoObject);

});

$("#item8").click(function () { //IAGASU

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/180205217?title=0&byline=0&portrait=0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item9").click(function () { //H&H

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://www.youtube-nocookie.com/embed/BYwRLo4hDBo\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject); 

});

$("#item10").click(function () { //Duology

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/326315903?title=0&byline=0&portrait=0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item11").click(function () { //APING

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/356048623?autoplay=1&title=0&byline=0&portrait=0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>";

    popOut(videoObject);

});

$("#item12").click(function () { //BA

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/355293965?\"</iframe>";

    popOut(videoObject);

});

$("#item13").click(function () { //Starburst

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/365971429?title=0&byline=0&portrait=0\"</iframe>";

    popOut(videoObject);

});

$("#item14").click(function () { //BA

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://www.youtube.com/embed/S5hhZRJkEtU\"</iframe>";

    popOut(videoObject);

});


//email stuff

var subjects = ['What up?', 'I\'m looking for advice about this weird rash', 'Is your surname not spelled with a c??', 'Hey bby g', 'I saw that thing you did with the thing - dope!', 'I appreciate that you went ahead and wrote some subject lines for emails for me, probably in the hopes to surprise me, but I\'m not your puppet', 'Need some Boush in my life', 'Do you have a favourite colour?', 'I found this picture. You have it', 'I want to talk to you about videogames', 'Slippin\' into your inbox like', 'I saw you the other day. We were across the street, heading in opposite directions. I thought to call out to you, to make things how they were, but you seemed busy... I know you said you\'d always have time for me, you\'d always care, and I really want to have some of that time again. How have you been?', 'You actually ginger or you just like the nicknames?', 'ARE YOU MAN ENOUGH TO READ THIS EMAIL?!?', 'Hey kid, wanna buy some words?'];

$("#emailAddress").click(function () {

    var subject = subjects[Math.floor(Math.random() * subjects.length)]

    window.location.href = "mailto:ian@ianbousher.com?subject=" + subject + "&body=";
})

$("#email").click(function () {

    var subject = subjects[Math.floor(Math.random() * subjects.length)]

    window.location.href = "mailto:ian@ianbousher.com?subject=" + subject + "&body=";
})

