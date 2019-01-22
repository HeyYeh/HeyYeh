/*var app = document.getElementById('myWords');

var typewriter = new Typewriter(app, {
    loop: false,
    delay: 10
});

typewriter.typeString('<p style="font-size: 18px; display:inline">I am saying something words and here is more words and all my words add up to sentences</p>')
    .start();

var aboutConvo = {
    choice1Clicked: {
        myWords: "these are the replacement words!",
        choice1: "New choice 1",
        choice2: "New choice 2",
        choice3: "New choice 3"
    }
}

$("#choice1").click(function () {
    //alert(aboutConvo.choice1Clicked.myWords);
    $("#myWords").empty().html(aboutConvo.choice1Clicked.myWords);
    $("#choice1").empty().html(aboutConvo.choice1Clicked.choice1);
})

//typewriter.typeString('<p style="font-size: 18px; display:inline">' + aboutConvo.choice1Clicked.myWords + '</p>').start();
*/

var narrativeObj = {
    homeText: {
        text: "Fair enough! Anything else I can help with?<br><br><f id=\"whatDo1\">Tell me more about what you actually do.</f><br><br><f id='aboutYou'>I want to learn more about you.</f><br><br><f id='dontKnowWhy1'>I don't know why I'm here.</f><br><br><f id='quickSummary'>No time! Give quick summary!</f>"
    },
    whatDo1: {
        text: "Always happy to talk about my work! Did you want to know about my writing, my directing, or my role as a creative?<br><br><f id=\"whatDoWords1\">I want to hear all about those sweet words.</f><br><br><f id='directingStuff'>Your directing work sounds interesting?</f><br><br><f id='creativeDo'>Wait, what does a creative even do?</f><br><br><f id='homeText'>I don't want to talk about work any more.</f>"
    },
    whatDoWords1: {
        text: "Oh good choice, I'm right there with you. Whether it's pretty-ass prose (as opposed to pretty ass-prose, I guess), some witty copy, or something more lyrical - words and grammar are immensely interesting. What? Am I being weird about it...? Fine. Look, I have been lucky enough to do a little bit of writing with big brands like Google, but I've been writing scripts, stories, and (years ago) awkward teenage poetry for a long time. Any of those catch your interest?<br><br><f id=\"whatDoWordsBrands1\">Big brands, huh?</f><br><br><f id='scriptsAndStories1'>Scripts and stories?</f><br><br><f id='teenagePoetry'>Awkward teenage poetry?</f><br><br><f id='whatDo1'>Actually, I don't want to talk about words.</f>"
    },
    WhatDoWordsBrands1: {
        text: "Oh yes indeed. And I will be able to tell you a lot more about that in time... ANTICIPATION.<br><br><f id='backToWhatDoWords'>Well damn. Guess I have to wait. About that other writing though...?</f><br><br><f id='backToWork'>I'm so disappointed I want to go back to talking about your work.</f>"
    },
    scriptsAndStories1: {
        text: "Yeah, quite a bit of stuff here and there. I won some local writing competitions when I was young and that sort of spurred me on. Scriptwriting and copywriting developed as passions pretty rapidly after that. I also have a specific interest in learning and playing wtih new formats, and styles, and I carried that into my film work too; half of the second short film I wrote and made didn't use the letter 'a' for plot related reasons (find it on the home page). I could talk about that stuff all day, but for now I'll just link you to reading about the constrained writing masters: the <a href='https://en.wikipedia.org/wiki/Oulipo'>Oulipo</a>.<br><br><f id='scriptsAndStories2'>I wouldn't mind hearing you talk about it more?</f><br><br><f id='backToWhatDoWords'>Cool! Back to words, though...</f><br><br><f id='backToWork'>Back to your work in general...</f>"
    },
    scriptsAndStories2: {
        text: "I guess you'll have to get in touch with me personally then ;)<br><br><f id='backToWhatDoWords'>Gah, fine. Back to talking about words...</f><br><br><f id='backToWork'>Fine. Back to your work...</f>"
    },
    teenagePoetry: {
        text: "Dead and buried... Only I get to cringe at it now.<br><br><f id='backToWhatDoWords'>Fine. Back to your words then...</f><br><br><f id='backToWork'>Alright then, keep your secrets. Back to work!</f>"
    },
    directingStuff: {
        text: "There's certainly a lot of work involved in it. Aside from writing/directing I have taken on a lot of other roles too. What do you want to hear about?<br><br><f id='directingStuff2'>Writing/directing, please.</f><br><br><f id='directingStuff3'>What's this about other stuff?</f><br><br><f id='whatDo1'>I've changed my mind...</f>"
    },
    directingStuff2: {
        text: "Back in university a friend and I decided to just take a stab at doing some film work, building from my whole writing love thing. I wrote a script and- Well, it was terrible. I had no idea what I was doing, we had no idea about the pitfalls in making a film in general (there are many), and the finished thing wasn't what we wanted it to be. But we <i>did</i> finish it. We put it out into the world, we learned from it, and we got back on the horse and made music videos for increasibly big people and are still working on narrative stuff now. We co-direct our work with each of our focus' in slightly different, but heavily overlapping, places and, as in anything, it's a never-ending learning experience.<br><br><f id='directingStuff3'>Oh cool, persistence. What about your other roles?</f><br><br><f id='whatDo1'>Interesting. Back to your work in general...</f>"
    },
    directingStuff3: {
        text: "Film work takes <i>a lot</i> of different skills to put a video together. At lower levels, where you have to be creative with budget, you can't really hire specialists so you have to stretch yourself and do whatever you can. In my case, I enjoy a lot of practical craft-y skills which meant doing a lot of art department stuff: designing and building sets, creating props (including a functioning, full-size set of 4 angel wings and, recently, stripper trousers), and various special effects. There's a lot of stress involved and, it goes without saying, the brilliant people that I have worked with and will work with are a huge help in controlling that stress. Seeing talented people work humbles you.<br><br><f id='directingStuff2'>Nice, what about the directing/writing?</f><br><br><f id='whatDo1'>Back to your work now...</f>"
    },
    creativeDo: {
        text: "Good question, I know it sounds vague! As a creative I have three major jobs: firstly, I need to absorb as much of the world as possible to know about interesting tech, culture, and what other creatives are doing. Yes, a part of my job is looking at memes professionally... My second role is using my information sponge of a body to come up with cool, multidisciplinary ways of answering a brief to do it justice. That might mean suggesting videos, websites, social media experiences, or even a real world experiential thing like a pop-up puppy tent. My third role is helping to bring out the creative talents of everyone else, using psychology and creative games to encourage creative thinking from literally everyone. Every single person has a creative spark in them, after all.<br><br><f id='whatDo1'>Back to work in general...</f><br><br><f id='homeText'>Cool, I think I'm done talking about work for a bit.</f>"
    },
    aboutYou: {
        text: "That's nice of you. I guess it comes down to either my origin story or my non-work interests?<br><br><f id='originStory1'>Your origin story, please.</f><br><br><f id='otherInterests1'>Tell me about your other interests.</f><br><br><f id='homeText'>Actually, I want to talk about something else.</f>"
    },
    originStory1: {
        text: "Weeeelll it all started when I was just a boy. Young go-getter I was, with a pep in my step and an onion on my belt - which was the style at the time... In my defence, I did watch a lot of The Simpsons growing up.<br><br>In reality, I was a quiet kid with a vivid imagination who had a very patient school librarian. I dreamed up a lot of toys, stories, characters, and creatures and, because they didn't exist in the world, I tried to make them. Cardboard was my tool of choice at the time, and that gave way to whatever other material I could find; the principle of any craft, whether it's woodwork, fabric, or welding, is just slapping two things together and making them stick. Get that down and you have the basics in whatever you want to do! Anyway, I grew out of being super quiet but the stories and craft stuck with me.<br><br>I got really into science broadly but I became especially interested in biology and psychology, the latter of which I went on to study at university. You can read about that side of stuff somewhere else but, for here, the takeaway is that my curiosity for people and how stuff ticks along has informed a lot of my creative stuff too. I absolutely, undoubtedly, [other adjverb] still love psychology, and it was in studying it that I started the film work that has sort of eased me to where I am now. After skipping some steps, at least.<br><br>So... Yeah, that's me. Hello.<br><br><f id='otherInterests1'>So about those other interests...?</f><br><br><f id='homeText'>Cool. Something else, now...</f>"
    },
    otherInterests1: {
        text: "Great! Considering this whole dialogue tree-style about me page is really pushing to give you a good sense of who I am, I might as well throw everything at you.<br><br>Firstly then, academic stuff! In psychology my interests are behavioural psych in a social context (why we do the things we do and what reinforces that behaviour), human computer interaction (how we influence tech and how it influences us), and a smidgen of neuroscience. In biology I'm really interested in ecology, how animals act in social groups and in their environment. I'm a big fan of media that has clearly put thought into how their monsters or fictional animals actually work in the world, which Monster Hunter - a game where you hunt monsters (mental) - does really well.<br><br>In non-writing creative stuff, my interests are prettyyyyyy darn broad. I'm a big fan of baking (I have a sweet tooth), I do some woodwork, I'm picking up leathercraft, I enjoy coding (I made this site), fabric craft of all sorts, paper craft in both origami and stuff like making light boxes, a light bit of metalwork, and, and I know this sounds weird, I'm currently really interested in gears. The cause and effect is really satisfying - it's why I'm a big fan of typewriters too and I was lucky enough to do a bit of typewriter repair for one of my short films. I guess what I'm getting at is that there is no short answer and I either have too much time or don't sleep enough. Maybe both.<br><br><f id='originStory1'>Onto your origin story now.</f><br><br><f id='homeText'>Cool, back to the start.</f>"
    },
    quickSummary: {
    text: "temp"
},
    dontKnowWhy1: {
        text: "I'll level with ya, the website is still kind of under construction so this bit isn't done yet.<br><br>I'm adding little hidden games throughout it and updating all of my work and articles I've written, and this specific bit is going to be a fun little Choose Your Own Adventure thing. I have this very cool narrative structure mapped out, started writing it... It'll be great if you could just come back some other time? Or contact me and berate me for not getting it out sooner!<br><br><f id='homeText'>I understand and will wait patiently</f><br><br><f id='homeText'>This is an outrage and I will wait impatiently</f>"
    }
};


$("#whatDo1").click(function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").html(narrativeObj.whatDo1.text);
})

$("body").on("click", "#whatDo1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.whatDo1.text);
});

$("body").on("click", "#whatDoWords1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.whatDoWords1.text);
});

$("body").on("click", "#whatDoWordsBrands1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.WhatDoWordsBrands1.text);
});

$("body").on("click", "#backToWhatDoWords", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.whatDoWords1.text);
});

$("body").on("click", "#backToWork", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.whatDo1.text);
});

$("body").on("click", "#scriptsAndStories1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.scriptsAndStories1.text);
});

$("body").on("click", "#scriptsAndStories2", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.scriptsAndStories2.text);
});

$("body").on("click", "#teenagePoetry", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.teenagePoetry.text);
});

$("body").on("click", "#homeText", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.homeText.text);
});

$("body").on("click", "#directingStuff", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.directingStuff.text);
});

$("body").on("click", "#directingStuff2", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.directingStuff2.text);
});

$("body").on("click", "#directingStuff3", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.directingStuff3.text);
});

$("body").on("click", "#creativeDo", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.creativeDo.text);
});

$("body").on("click", "#aboutYou", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.aboutYou.text);
});

$("body").on("click", "#originStory1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.originStory1.text);
});

$("body").on("click", "#otherInterests1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.otherInterests1.text);
});

$("body").on("click", "#quickSummary", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.quickSummary.text);
});

$("body").on("click", "#dontKnowWhy1", function () {
    $("#myWordsAbout").empty();
    $("#myWordsAbout").append(narrativeObj.dontKnowWhy1.text);
});