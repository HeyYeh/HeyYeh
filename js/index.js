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



//START TOPNAV STUFF

var menuOpen = false;
var currentMenuOpen = 0; //0 is no menu

//When you click on a button, make it appear, give it the clicked styling, say that the menu is open, then say which menu is open
$("#button1").click(function () {
    $("#buttonStuffCont1").removeClass("displayNone");
    $("#button1").addClass("topNavButtonClicked");
    menuOpen = true;
    currentMenuOpen = 1;
})

$("#button2").click(function () {
    $("#buttonStuffCont2").removeClass("displayNone");
    $("#button2").addClass("topNavButtonClicked");
    menuOpen = true;
    currentMenuOpen = 2;
})

$("#button3").click(function () {
    $("#buttonStuffCont3").removeClass("displayNone");
    $("#button3").addClass("topNavButtonClicked");
    menuOpen = true;
    currentMenuOpen = 3;
})

$("#button4").click(function () {
    $("#buttonStuffCont4").removeClass("displayNone");
    $("#button4").addClass("topNavButtonClicked");
    menuOpen = true;
    currentMenuOpen = 4;
})

$("#button5").click(function () {
    $("#buttonStuffCont5").removeClass("displayNone");
    $("#button5").addClass("topNavButtonClicked");
    menuOpen = true;
    currentMenuOpen = 5;
})

//If the menu is open and you hover over another menu, make the open menu disappear and remove the open styling, then make the hovered menu appear and add the styling to it and set the current menu to the hovered menu
function closeOtherMenus(currentMenuHovered) {

    if (menuOpen) {
        if (currentMenuOpen !== currentMenuHovered) {
            $("#buttonStuffCont" + currentMenuOpen).addClass("displayNone");
            //if (pageColour == 0) {
            $("#button" + currentMenuOpen).removeClass("topNavButtonClicked");
            //}
            //dark mode
            //if (pageColour == 1) {
            $("#button" + currentMenuOpen).removeClass("darkModeTopNavButtonClicked");
            //}

            $("#buttonStuffCont" + currentMenuHovered).removeClass("displayNone");
            if (pageColour == 0) {
                $("#button" + currentMenuHovered).addClass("topNavButtonClicked");
            }
            //dark mode
            if (pageColour == 1) {
                $("#button" + currentMenuOpen).addClass("darkModeTopNavButtonClicked");
            }
            currentMenuOpen = currentMenuHovered;
        }
    }

}


//If a menu is already open, then we do a bit of special behaviour
$("#button1").hover(function () {
    closeOtherMenus(1);
});

$("#button2").hover(function () {
    closeOtherMenus(2)
})

$("#button3").hover(function () {
    closeOtherMenus(3);
});

$("#button4").hover(function () {
    closeOtherMenus(4);
});

$("#button5").hover(function () {
    closeOtherMenus(5);
});


$(".container").click(function () {

    if (menuOpen) {
        $("#buttonStuffCont" + currentMenuOpen).addClass("displayNone");
        $("#button" + currentMenuOpen).removeClass("topNavButtonClicked");
        menuOpen = false;
    }

})


//END TOPNAV STUFF





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

        $(".portfolioText").css("color", "white");

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
        $(".portfolioText").css("color", "black");

        if (screenWidth > 709) {
            $("a").css("background-image", "url('../assets/blackunderline2.png'");
        }
        if (screenWidth <= 709) {
            $("a").css("background-image", "url('../assets/blackunderline.png'");
        }
    }


    pageColour = !pageColour;
})

function switchColor() {
    //dark mode
    if (pageColour == 0) {
        $("body").css("background-color", "#16161d"); //the black here is eisengrau
        $("li").css("color", "#fdfdfd");
        $("p").css("color", "#fdfdfd");
        $("hi").css("color", "#fdfdfd");
        $("hip").css("color", "#fdfdfd");
        $("hop").css("color", "#fdfdfd");
        $("hup").css("color", "#fdfdfd");
        $(".aboutWords").css("color", "#fdfdfd");
        $(".portfolioText").css("color", "#fdfdfd");
        $(".storyTitle").css("color", "#fdfdfd");
        $("a").css("color", "#fdfdfd");
        $("a").css("background-image", 'url(../assets/whiteunderline2.png)');
        $("div").css("color", "#fdfdfd");
        $(".buttonStuffCont").css("background-color", "#141414");
        $(".topNavButton").css("background-color", "rgba(22, 22, 29, 0)");
        $("#topBar").css("background-color", "rgba(22, 22, 29, 1)");
        $(".buttonItem").addClass("darkModeButtonItem");


        $('#nightIcon').attr('src', 'assets/Day.png');
        $('#nightIcon').html('Light Mode');
    }
    if (pageColour == 1) {
        $("body").css("background-color", "rgb(251,251,251)");
        $("li").css("color", "black");
        $("p").css("color", "black");
        $("hi").css("color", "black");
        $("hip").css("color", "black");
        $("hop").css("color", "black");
        $("hup").css("color", "black");
        $(".aboutWords").css("color", "black");
        $(".storyTitle").css("color", "black");
        $(".portfolioText").css("color", "black");
        $("a").css("color", "black");
        $("a").css("background-image", 'url(../assets/blackunderline2.png)');
        $("div").css("color", "black");
        $(".buttonStuffCont").css("background-color", "#f0f0f0");
        //Jquery doesn't like hover selectors so I have to switch the class for this
        $(".buttonItem").removeClass("darkModeButtonItem");
        $(".buttonItem").removeClass("darkModeTopNavButtonClicked");
        $(".topNavButton").css("background-color", "");
        $("#topBar").css("background-color", "rgb(251, 251, 251)");


        $('#nightIcon').html('Dark Mode');
        $('#nightIcon').attr('src', 'assets/Night.png');
    }


    pageColour = !pageColour;
}


$("#nightIcon").click(function () {

    switchColor();

})


//end colour shift section


//Start paper texture section
var paperOn = false;

var paperHTML = `<div id="overlay"></div>`;

$("#togglePaper").click(function() {
    
    if (!paperOn) {
        $("body").append(paperHTML);
        $("#togglePaper").html("Remove Paper Texture");
    }
    
    if (paperOn) {
        $("#overlay").remove();
        $("#togglePaper").html("Add Paper Texture");
    }
    
    paperOn = !paperOn;
    
})


//End paper texture section
var coffeeOn = false;

var coffeeHTML = `<img id="coffee" src="assets/CoffeeStain.png"/>`;

$("#toggleCoffee").click(function() {
    
    if (!coffeeOn) {
        $("body").append(coffeeHTML);
        $("#toggleCoffee").html("Remove Coffee Stain");
    }
    
    if (coffeeOn) {
        $("#coffee").remove();
        $("#toggleCoffee").html("Add Coffee Stain");
    }
    
    coffeeOn = !coffeeOn;
    
})

//Start coffee section


//End coffee section


//Refresh button

$("#closeAll").click(function () {

    location.reload();

})

//End refresh button


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

function settingsPopup(popupContent) {
    $("#filterHost").addClass("popFilter");
}

$("#printButt").click(function () {
    window.print();
})

$("#newButt").click(function () {
    window.open('index.html', '')
})

$("#closeButt").click(function () {
    window.open('blank.html', '_self')
})







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

$("#item3").click(function () { //Jaqueline

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

$("#item6").click(function () { //OFITC - America

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/324843376?app_id=122963&amp;wmode=opaque&amp;autoplay=1\" ></iframe>";

    popOut(videoObject);

});

$("#item7").click(function () { //Breathe

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/343941212?app_id=122963&amp;wmode=opaque\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\"></iframe>";

    popOut(videoObject);

});


$("#item8").click(function () { //Grapes

    var videoObject = "<iframe class=\"popVideoPlay\" src=\"https://player.vimeo.com/video/399522332?title=0&byline=0&portrait=0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

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

$("#item13").click(function () { //Secret

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/365971429?title=0&byline=0&portrait=0\"</iframe>";

    popOut(videoObject);

});

$("#item14").click(function () { //Currys?

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://www.youtube.com/embed/S5hhZRJkEtU\"</iframe>";

    popOut(videoObject);

});

$("#item15").click(function () { //Mop

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/382424356?title=0&byline=0&portrait=0\"</iframe>";

    popOut(videoObject);

});


$("#item16").click(function () { //Sad Happy

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://www.youtube.com/embed/5_8MAhaoyVk\"</iframe>";

    popOut(videoObject);

});

$("#item17").click(function () { //Juicy Punishment

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/365969871?title=0&byline=0&portrait=0\"</iframe>";

    popOut(videoObject);

});

$("#item18").click(function () { //Juicy Punishment

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/365970280?title=0&byline=0&portrait=0\"</iframe>";

    popOut(videoObject);

});

$("#item19").click(function () { //Skywind

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://www.youtube.com/embed/s_K7Kpt7X84\"</iframe>";

    popOut(videoObject);

});

$("#item20").click(function () { //YAR

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://player.vimeo.com/video/714719574?h=17fa25261e\"</iframe>";

    popOut(videoObject);

});


$("#item21").click(function () { //MAKEMEFEELALIVE

    var videoObject = "<iframe class=\"popVideoPlay\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\" src=\"https://www.youtube.com/embed/N-tqNiIGmO8\"</iframe>";

    popOut(videoObject);

});



//Add the sections in

var gamesSection = `<div id="gamesChunk1" class="portfolioChunk outline1">
                    <div class="chunkTitleCont outline2">
                        <div class="chunkTitle outline3">Games Writing</div>
                    </div>
                    <div class="chunkItemCont outline3">
                        <div class="chunkItem outline2">
                            <a href="https://store.steampowered.com/app/1708520/F1_Manager_2022/" target="_blank">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="">
                                <img class="chunkImage" src="assets/F1Manager.png"/>
                            </div>
                                </a>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">F1 Manager 2022</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">Drive every decision and experience the thrills of managing an F1 team. I supported the project as a game writer, penning the majority of the in-game text.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item19">
                                <img class="chunkImage" src="assets/SkywindHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Skywind</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">An ambitious project modding Morrowind into Skyrim's engine, and then some. I laid the narrative foundation of a set of new in-game cutscenes.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <a href="https://heyyeh.itch.io/ceefax" target="_blank">
                            <div class="chunkItemStuff chunkItemImage outline4">
                                <img class="chunkImage" src="assets/ceefaxHead.png"/>
                            </div>
                            </a>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">BBC CEEFAX: PLAGUE</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A game jam project written, coded, and art-ed by me. It's set in a world that still (mercifully) includes BBC's teletext, which you use to determine which plague-time food is safe to eat.</p>
                            </div>
                        </div>
                    </div>
                </div>`;

var narrativeSection = `<div id="narrativeChunk1" class="portfolioChunk outline1">
                    <div class="chunkTitleCont outline2">
                        <div class="chunkTitle outline3">Narrative Writing</div>
                    </div>
                    <div class="chunkItemCont outline3">
                        
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="item20">
                                <img class="chunkImage" src="assets/YARHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">You're Absolutely Right!</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">COMING SOON! A short film about a lonely hoarder driven to extreme action by a hotline that always tells her that she's right. I made a <a href="https://www.youreabsolutelyright.co.uk/" target="_blank">cool microsite</a>, and we have a conspiracy-filled <a href="https://www.instagram.com/youreabsolutelyrightshortfilm/" target="_blank">Instagram campaign</a> supporting it.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item11">
                                <img class="chunkImage" src="assets/ApingSplash.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Aping</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A short film in which a man rebels against the system by doing exactly what the system wants. I took part in an interview about the project which you can read <a href="https://directorsnotes.com/2019/09/18/ian-bousher-theo-gee-aping/" target="_blank">here</a>.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item8">
                                <img class="chunkImage" src="assets/GrapesHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Don't Water The Vine</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">An ambitious young architect tries to hold his life together after he starts uncontrollably producing grapes from his mouth.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>`;

var musicSection = `<div id="musicChunk1" class="portfolioChunk outline1">
                    <div class="chunkTitleCont outline2">
                        <div class="chunkTitle outline3">Music Videos</div>
                    </div>
                    <div class="chunkItemCont outline3">
                        
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="item16">
                                <img class="chunkImage" src="assets/SadHappyHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Circa Waves - Sad Happy</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">For a song called Sad Happy on an album called Sad Happy, what could be more Sad Happy than clowns going through rehab for being too depressed to clown?</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item3">
                                <img class="chunkImage" src="assets/JacquelineHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Circa Waves - Jacqueline</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A music video that shifts from happy summer vibes to a killer conga line. It felt like the obvious plot at the time. In retrospect, I have no idea how this happened but I like it.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item1">
                                <img class="chunkImage" src="assets/ActiveHead3.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Macky Gee - Active</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A song with a chanting chorus of "Work it" naturally leads to a video featuring a man embracing his dream and putting on a stripper routine in the office.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="item2">
                                <img class="chunkImage" src="assets/BlindSplash2.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">The Fratellis - I've Been Blind</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A video steeped in Philosophy. Specifically, the narrative was based on "Mary’s Room" which asks whether understanding colour scientifically is the same as actually seeing it.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item5">
                                <img class="chunkImage" src="assets/SeraphimSplash2.jpg"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Birdeatsbaby - Seraphim</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A fairly insane video combining The Last Supper with the Divine Comedy - a man struggling with himself dines with his demons, and his tired guardian angel.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item21">
                                <img class="chunkImage" src="assets/YMASIXHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">You Me At Six - FEELALIVE</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A split screen video in which a man's eye is stolen and he chases down the assailant while we see from both of his eyes at once. There's also an eye shrine. Of course there's an eye shrine.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>`;

var brandSection = `<div id="BrandChunk1" class="portfolioChunk outline1">
                    <div class="chunkTitleCont outline2">
                        <div class="chunkTitle outline3">Brand Videos</div>
                    </div>
                    <div class="chunkItemCont outline3">
                        
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="item12">
                                <img class="chunkImage" src="assets/BASocialSplash.jpg"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">British Airways - Social Media</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A very serious, totally educational set of cautionary tales about social media usage that British Airways commissioned for a big ol' staff event.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item14">
                                <img class="chunkImage" src="assets/HotDog.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Currys - Tech Tuesdays</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A weekly series of tongue-in-cheek tech reviews that put Currys' helpful staff at the forefront, starring real Currys employees!</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item15">
                                <img class="chunkImage" src="assets/mopHead.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Little Acorns - Mop</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">A tale about parents who, for lack of thinking of a better option, foster a mop and raise it from childhood to moppy adulthood. A film made for a fostering agency.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4"  id="item13">
                                <img class="chunkImage" src="assets/JuicyGreen.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Starburst - Juicy Secret</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">One of a three part video campaign for Starburst to place their brand tag of “Unexplainably Juicy” in the school environment for Back To School.</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item17">
                                <img class="chunkImage" src="assets/JuicyProb.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Starburst - Juicy Problem</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">The second entry in the Juicy School series, this one... This one is better seen than described...</p>
                            </div>
                        </div>
                        <div class="chunkItem outline2">
                            <div class="chunkItemStuff chunkItemImage outline4" id="item18">
                                <img class="chunkImage" src="assets/JuicyPunish.png"/>
                            </div>
                            <div class="chunkItemStuff chunkItemTitle outline4">
                                <p id="">Starburst - Juicy Punishment</p>
                            </div>
                            <div class="chunkItemStuff chunkItemText outline4">
                                <p class="itemText">The third and final video in the Starburst trilogy, this one featuring an unorthodox use of juice in school discipline.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>`;



function jump(h){
    var url = location.href;               //Save down the URL without hash.
    location.href = "#"+h;                 //Go to the target element.
    history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}


var gamesVisible = false,
    narrativeVisible = false,
    brandVisible = false,
    musicVisible = false;

//When you click on the thing, make the thing appear (if it isn't there already), do the colour change twice because this is a full Italian dinner's worth of spaghetti, then animate to the added section
$("#showGames").click(function () {

    if (gamesVisible == false) {
        $("#portfolioBigCont").append(gamesSection);
        switchColor();
        switchColor();
        gamesVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#gamesChunk1"
    

});

$("#showGames2").click(function () {

    if (gamesVisible == false) {
        $("#portfolioBigCont").append(gamesSection);
        switchColor();
        switchColor();
        gamesVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#gamesChunk1"
    

});

//Add the music chunk
$("#showMusic").click(function () {

    if (musicVisible == false) {
        $("#portfolioBigCont").append(musicSection);
        switchColor();
        switchColor();
        musicVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#musicChunk1"

});

$("#showMusic2").click(function () {

    if (musicVisible == false) {
        $("#portfolioBigCont").append(musicSection);
        switchColor();
        switchColor();
        musicVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#musicChunk1"

});

//Add the brands chunk
$("#showBranded").click(function () {

    if (brandVisible == false) {
        $("#portfolioBigCont").append(brandSection);
        switchColor();
        switchColor();
        brandVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#BrandChunk1"

});

$("#showBranded2").click(function () {

    if (brandVisible == false) {
        $("#portfolioBigCont").append(brandSection);
        switchColor();
        switchColor();
        brandVisible = true;
    }

    window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#BrandChunk1"

});

//Add the narrative chunk
$("#showNarrative").click(function () {

    if (narrativeVisible == false) {
        $("#portfolioBigCont").append(narrativeSection);
        switchColor();
        switchColor();
        narrativeVisible = true;
    }

   window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#narrativeChunk1"

});

$("#showNarrative2").click(function () {

    if (narrativeVisible == false) {
        $("#portfolioBigCont").append(narrativeSection);
        switchColor();
        switchColor();
        narrativeVisible = true;
    }

   window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#narrativeChunk1"

});

//Show just the portfolio stuff
$("#justPortfolio").click(function () {

//        $("#screenbox > *:not('#portfolioBigCont')").remove();
    $('#screenbox').find('*').not('#portfolioBigCont').remove();


    $("#portfolioBigCont").append(gamesSection);
    gamesVisible = true;


    $("#portfolioBigCont").append(brandSection);
    brandVisible = true;


    $("#portfolioBigCont").append(musicSection);
    musicVisible = true;


    $("#portfolioBigCont").append(narrativeSection);
    switchColor();
    switchColor();
    narrativeVisible = true;



})



//End section for adding chunks to main screen


//email stuff

var subjects = ['What up?', 'I\'m looking for advice about this weird rash', 'Is your surname not spelled with a c??', 'Hey bby g', 'I saw that thing you did with the thing - dope!', 'I appreciate that you went ahead and wrote some subject lines for emails for me, probably in the hopes to surprise me, but I\'m not your puppet', 'Need some Boush in my life', 'Do you have a favourite colour?', 'I found this picture. You have it', 'I want to talk to you about videogames', 'Slippin\' into your inbox like', 'I saw you the other day. We were across the street, heading in opposite directions. I thought to call out to you, to make things how they were, but you seemed busy... I know you said you\'d always have time for me, you\'d always care, and I really want to have some of that time again. How have you been?', 'You actually ginger or you just like the nicknames?', 'ARE YOU MAN ENOUGH TO READ THIS EMAIL?!?', 'Hey kid, wanna buy some words?', 'LOVE ME', 'I sat next to you once in math and you smelled like cherries. How ya been?', 'This is a list of the names I\'ve given to my toes', 'ATTENTION GRABBING HEADLINE', 'Hello, I would like one writing please', 'My name is Chris and we need to talk. (If your name really is Chris, I bet you\'re bloody freaked out right now)', 'Be less ginger'];

$("#emailAddress").click(function () {

    var subject = subjects[Math.floor(Math.random() * subjects.length)]

    window.location.href = "mailto:ian@ianbousher.com?subject=" + subject + "&body=";
})

$("#email").click(function () {

    var subject = subjects[Math.floor(Math.random() * subjects.length)]

    window.location.href = "mailto:ian@ianbousher.com?subject=" + subject + "&body=";
})

$("#websiteButt").click(function () {
    window.open("https://www.bousherandgee.com/");
})
