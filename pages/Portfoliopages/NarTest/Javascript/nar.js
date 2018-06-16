//Object containing all character names; they are in here because my whims change and I'll probably want to switch up names now and then without trowling through every card
var characterNames = {
    RHM: "Right hand man",
    cultAdviser: "Cult Adviser",
    significantOther: "Significant other",
    financialAdviser: "Financial adviser",
    HROfficer: "HR Officer",
    auctionMaster: "Auction master",
    securityChief: "Security chief",
    librarian: "Librarian",
    techChief: "Chief technology officer",
    pyorCultist: "Pyor cultist"
}

var playerName; //used to actually draw the name in the canvas

//Gender affects minor dialogue wording mainly - it's an immersion thing (0 = female, 1 = male)
var playerGender = Math.floor(Math.random() * 2);
//These are the pool of names that can be drawn from - the surname is always the same because we have a strict and noble lineage, dammit
var potentialPlayerNames = {
    female: ["Jocelyn", "Rosie", "Marie", "Claire", "Winona", "Winphrey", "Mona", "Lisa", "Dovahkiin"],
    male: ["Bob", "Felix", "Gregory", "Herbert", "Ken", "Edgar", "Victor", "Cormac", "Andrew", "Pip"]
}
var playerNameThisLife; //Variable for the name in this life, to be used elsewhere
var genderReferenceStart; //Determines whether we use sir or ma'am - immersion! (start of sentence)
var genderReferenceMid; //Determines whether we use sir or ma'am - immersion! (mid-sentence)
playerGender == 0 ? genderReferenceStat = "Ma'am" : genderReferenceStart = "Sir";
playerGender == 0 ? genderReferenceMid = "ma'am" : genderReferenceMid = "sir";

//This is an object that essentially tracks all of your failures - when you lose, it stores your character name, age, score, and graveyard text, then keeps that information as a way of tracking global score
var playerGraveyard = {};
var graveyardIterator = 1; //to assign a number for each grave as we go

//function for picking a first name
function choosePlayerName() {

    var stringGender; //we need a string to access our names object properties
    playerGender == 0 ? stringGender = "female" : stringGender = "male"; //if gender = 0, we know to access female names, and if it's equal to 1, we access male

    var acc = Math.floor(Math.random() * potentialPlayerNames[stringGender].length); //temp accessor based on length of names array

    playerNameThisLife = potentialPlayerNames[stringGender][acc]; //assign a variable the final name for use elsewhere

}

//These are the amount that the icons change by when you make a choice. They're variables to make balancing and experimenting much easier
var tinyPositive = 5,
    smallPositive = 10,
    mediumPositive = 15,
    bigPositive = 20,
    hugePositive = 25,
    tinyNegative = -5,
    smallNegative = -10,
    mediumNegative = -15,
    bigNegative = -20,
    hugeNegative = -25;

//Similar to my scales project, I am keeping information on each picture in an object and sorting it as needed into a seperate array for the actual game loop
var allPicturesObj = {
    intro1: {
        enabled: false, //This is a sorting boolean to see what to include
        name: "RHM", //the name, mainly used for Phaser to apply the sprite to the Phaser object
        phaserInfo: "", //this is empty and where Phaser does it's magic
        phaserLeftHolder: "", //This is where Phaser controls the left side text
        phaserRightHolder: "", //and this is where it controls the right side text
        leftText: "More sure than ever before...", //the content of the left corner text (for RIGHT swipe)
        rightText: "Don't question me. Send him in.", // and the content of the right corner text (for LEFT swipe)
        swipeLeftFunction: function () { //This function runs when you swipe left
            spawnNewPicture("intro2");
            influenceStatus(0, 0, 0, 0, 0); //face,house,money,target
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () { //and this one runs when you swipe right
            spawnNewPicture("intro1R");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "I found him, as you asked. Are you sure you still want to do this, " + genderReferenceMid + "?",
        phaserScenarioHolder: "",
        characterName: characterNames.RHM,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0, //this is how many weeks we add to your character's age when you swipe left
        timeTakenRight: 0
    },
    intro1R: {
        enabled: false,
        name: "RHM",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "You must trust me. Please, send him in.",
        rightText: "Do not give advice on what you do not know. Send him in.",
        swipeLeftFunction: function () {
            spawnNewPicture("intro2");
            influenceStatus(-50, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro2");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "But why, " + genderReferenceMid + "? Forgive me for asking, but how can we know that any of this is real? That it will help the company?",
        phaserScenarioHolder: "",
        characterName: characterNames.RHM,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro2: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Excuse me?",
        rightText: "What...?",
        swipeLeftFunction: function () {
            spawnNewPicture("intro3");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro3");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "Yes, I can see potential in you...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro3: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "The risk is worth it",
        rightText: "My mind will be fine",
        swipeLeftFunction: function () {
            spawnNewPicture("intro4");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro4");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "I believe that you may talk to the higher ones yet, but it will pay it's toll. Not on your body, but on your mind...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro4: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Noted. How do I contact a... 'higher one'?",
        rightText: "No more riddles. How do I contact a 'higher one'?",
        swipeLeftFunction: function () {
            spawnNewPicture("intro5");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro5");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "If you insist... But be warned, your sanity is the one thing you can't see...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro5: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Very good. And what action might that be?",
        rightText: "And I will. Now give me details, damn it.",
        swipeLeftFunction: function () {
            spawnNewPicture("intro6");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro6");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "They will contact you, if you can get their attention that is. I will help where I can, but only you can take action...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro6: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "So I will earn their gifts.",
        rightText: "I do not fear this road.",
        swipeLeftFunction: function () {
            spawnNewPicture("intro6L");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro6R");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "Each higher one has its own whims and wants. I will decipher texts to learn of them, but know this... Their gifts are not gained as easily as their wrath.",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro6L: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Did I say you could leave?",
        rightText: "I don't care about your warnings...",
        swipeLeftFunction: function () {
            spawnNewPicture("intro7");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro7");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "Fear would be a wise response. I will return soon...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro6R: {
        enabled: false,
        name: "who",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Fine, I await your findings",
        rightText: "Will it always be riddles with you?",
        swipeLeftFunction: function () {
            spawnNewPicture("intro7");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture("intro7");
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "Gifts from one do not mean gifts from another. I will return shortly...",
        phaserScenarioHolder: "",
        characterName: characterNames.cultAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    intro7: {
        enabled: false,
        name: "RHM",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Business as usual, RHM",
        rightText: "Business as usual, RHM",
        swipeLeftFunction: function () {
            spawnNewPicture(cache[k]);
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            spawnNewPicture(cache[k]);
            influenceStatus(0, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "I will keep him out of the worker's eyes, " + genderReferenceMid + "...",
        phaserScenarioHolder: "",
        characterName: characterNames.RHM,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 0,
        timeTakenRight: 0
    },
    Generic1: {
        enabled: true,
        name: "SO",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "I think you're right",
        rightText: "That's ridiculous",
        swipeLeftFunction: function () {
            disable("Generic1");
            spawnNewPicture(cache[k]);
            influenceStatus(smallNegative, 0, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            disable("Generic1");
            spawnNewPicture(cache[k]);
            influenceStatus(smallPositive, tinyNegative, tinyNegative, 0, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "You're spending too much time at work lately. I think you need a vacation!",
        phaserScenarioHolder: "",
        characterName: characterNames.significantOther,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 1,
        timeTakenRight: 3
    },
    Generic2: {
        enabled: true,
        name: "FinAdv",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "That's a brilliant idea",
        rightText: "No, the employees deserve it",
        swipeLeftFunction: function () {
            disable("Generic2");
            spawnNewPicture(cache[k]);
            influenceStatus(smallPositive, tinyPositive, 0, 0, 0);
            updateAgeOnSwipe();
        },
        swipeRightFunction: function () {
            disable("Generic2");
            spawnNewPicture(cache[k]);
            influenceStatus(mediumNegative, tinyNegative, mediumPositive, tinyNegative, 0);
            updateAgeOnSwipe();
        },
        scenarioText: "If we cut from our pension scheme and funnel it into our profits, the shareholders will be VERY pleased this quarter",
        phaserScenarioHolder: "",
        characterName: characterNames.financialAdviser,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 1,
        timeTakenRight: 3
    },
    Generic3: {
        enabled: true,
        name: "HROfficer",
        phaserInfo: "",
        phaserLeftHolder: "",
        phaserRightHolder: "",
        leftText: "Nothing to worry about",
        rightText: "I'll look into it",
        swipeLeftFunction: function () { 
            disable("Generic3"); 
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, tinyNegative, 0, tinyNegative, 0);  
            updateAgeOnSwipe(); 
        },
        swipeRightFunction: function () {  
            disable("Generic3");
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, tinyPositive, 0, tinyPositive, 0, 0);  
            updateAgeOnSwipe();
        },
        scenarioText: "There's talk among the employees of a strange man hanging around, sounds like a nasty customer",
        phaserScenarioHolder: "",
        characterName: characterNames.HROfficer,
        phaserCharacterNameHolder: "",
        timeTakenLeft: 3,
        timeTakenRight: 3
    },
    Generic4: { 
        enabled: true,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Don't be ridiculous",
         rightText: "Very well",
         swipeLeftFunction: function () { 
            disable("Generic4");
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, tinyNegative, smallPositive, mediumNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () { 
            disable("Generic4");
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, smallNegative, mediumNegative, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Darkness will help me focus. I would suggest casting these offices in greater shadow.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 3
    },
    Generic5: { 
        enabled: true,
         name: "HROfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "We can't afford it",
         rightText: "Let them drink coffee",
         swipeLeftFunction: function () { 
            disable("Generic5");
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, 0, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic5");
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Higher quality coffee could raise worker morale?",
         phaserScenarioHolder: "",
         characterName: characterNames.HROfficer,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 1
    },
    Generic6: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Thank you for letting me know",
         rightText: "Increase security immediately",
         swipeLeftFunction: function () {  
            disable("Generic6");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, mediumPositive, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic6");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, mediumNegative, 0, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "There was a break in last night, couple of equipment thefts. Looks like common crime, nothing business related was touched, " + genderReferenceMid + ".",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 10,
         timeTakenRight: 4
    },
    Generic7: { 
        enabled: true,
         name: "HROfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Sounds like a great idea",
         rightText: "No, we don't need it",
         swipeLeftFunction: function () {  
            disable("Generic7");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, smallNegative, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic7");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, mediumPositive, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I would like to start a better recycling initiative, it would make the office feel so much fresher!",
         phaserScenarioHolder: "",
         characterName: characterNames.HROfficer,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 9
    },
    Generic8: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "The workers will be intimidated",
         rightText: "If they'll improve security",
         swipeLeftFunction: function () {  
            disable("Generic8");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, mediumPositive, smallNegative, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic8");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, smallNegative, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Our security team could do with some new equipment. Maybe some toys that're a little more... effective?",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 7,
         timeTakenRight: 4
    },
    Generic9: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "I'll arrange for a new uniform",
         rightText: "Unnecessary, and concerning",
         swipeLeftFunction: function () {  
            disable("Generic9");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, smallNegative, 0, tinyNegative, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic9");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, smallPositive, 0, mediumPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "A new uniform for the security team would help. Something intimidating, scare any criminals right off",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 8
    },
    Generic10: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Keeping up to date with this is key",
         rightText: "If they aren't broken there's no need",
         swipeLeftFunction: function () {  
            disable("Generic10");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyNegative, 0, 0, smallPositive, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic10");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, 0, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Uh... So, there are improvements to employee computers that we could make if... if we have the budget?",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1,
         timeTakenRight: 11
    },
    Generic11: { 
        enabled: true,
         name: "Librarian",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No, we have workers not readers",
         rightText: "You know what? They probably would!",
         swipeLeftFunction: function () {  
            disable("Generic11");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, smallPositive, mediumNegative, tinyPositive, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic11");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, smallPositive, tinyNegative, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I bet your emplyees would just love a little reading space in the office",
         phaserScenarioHolder: "",
         characterName: characterNames.librarian,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 6,
         timeTakenRight: 4
    },
    Generic12: { 
        enabled: true,
         name: "Auctioneer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "The employees will love the decoration",
         rightText: "Not needed, the office is fine",
         swipeLeftFunction: function () {  
            disable("Generic12");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, tinyPositive, mediumNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic12");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, smallPositive, smallNegative, mediumPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I was considering acquiring some beautiful pieces at auction that might brighten up the office. What do you think?",
         phaserScenarioHolder: "",
         characterName: characterNames.auctionMaster,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 6
    },
    Generic13: { 
        enabled: true,
         name: "HROfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Sure, happy workers are hard workers",
         rightText: "It's not in the budget",
         swipeLeftFunction: function () {  
            disable("Generic13");  
            spawnNewPicture(cache[k]);  
            influenceStatus(bigNegative, smallNegative, smallPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic13");  
            spawnNewPicture(cache[k]);  
            influenceStatus(bigPositive, 0, smallNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Some of the employees are developing back problems. Can we bring in some ergonomic specialists?",
         phaserScenarioHolder: "",
         characterName: characterNames.HROfficer,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 5
    },
    Generic14: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "It's fine, the strikes will end eventually",
         rightText: "We pay to get it cleared up",
         swipeLeftFunction: function () {  
            disable("Generic14");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, mediumPositive, mediumNegative, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic14");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, bigNegative, tinyPositive, 0, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: genderReferenceStart + ", the district trash collectors are on strike, rubbish is piling up in the street, and the workers are complaining. What do you suggest?",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 11,
         timeTakenRight: 11
    },
    Generic15: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Pay him off immediately",
         rightText: "Take him to court",
         swipeLeftFunction: function () {  
            disable("Generic15");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, smallNegative, tinyNegative, mediumNegative, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic15");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "An ex-employee is threatening to reveal company secrets unless we pay him a ransom, " + genderReferenceMid + ".",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 15,
         timeTakenRight: 3
    },
    Generic16: { 
        enabled: true,
         name: "HROfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "That sounds great!",
         rightText: "Our current chefs are fine",
         swipeLeftFunction: function () {  
            disable("Generic16");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic16");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, tinyPositive, smallNegative, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "It would be great to hire some top cooks for the company kitchen; we could really treat our employees!",
         phaserScenarioHolder: "",
         characterName: characterNames.HROfficer,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 9
    },
    Generic17: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Let her go, we will improve security",
         rightText: "Inform the police immediately",
         swipeLeftFunction: function () {  
            disable("Generic17");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, smallPositive, 0, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic17");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyPositive, smallPositive, smallNegative, 0, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "We caught a woman trying to enter the building with a false ID badge. It seems to be an attempt at corporate espionage, " + genderReferenceMid + ".",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 8
    },
    Generic18: { 
        enabled: true,
         name: "SO",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Not tonight, sweetie...",
         rightText: "My treat!",
         swipeLeftFunction: function () {  
            disable("Generic18");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, smallNegative, tinyNegative, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic18");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, 0, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Let's go for a high class romantic dinner tonight!",
         phaserScenarioHolder: "",
         characterName: characterNames.significantOther,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 4
    },
    Generic19: { 
        enabled: true,
         name: "SO",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Best idea I've heard in months!",
         rightText: "It wouldn't.",
         swipeLeftFunction: function () {  
            disable("Generic19");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic19");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, tinyNegative, smallNegative, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "You know what this office needs? An office dog! I know it would make you happy too, admit it.",
         phaserScenarioHolder: "",
         characterName: characterNames.significantOther,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 4
    },
    Generic20: { 
        enabled: true,
         name: "SO",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Now is not a great time for this",
         rightText: "Many more to come",
         swipeLeftFunction: function () {  
            disable("Generic20");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, tinyNegative, 0, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic20");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, 0, 0, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Happy anniversary! I thought I'd surprise you at work. I can't believe how many happy years we've had...",
         phaserScenarioHolder: "",
         characterName: characterNames.significantOther,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 7,
         timeTakenRight: 4
    },
    Generic21: { 
        enabled: true,
         name: "SO",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Can I just have them all at home instead?",
         rightText: "I'm lucky to have you",
         swipeLeftFunction: function () {  
            disable("Generic21");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, 0, 0, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic21");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, 0, 0, 0, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Happy birthday! I've brought you your cake and gifts -- well, the gifts that you can have at work at least...",
         phaserScenarioHolder: "",
         characterName: characterNames.significantOther,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 7,
         timeTakenRight: 4
    },
    Generic22: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Do what you can without the funds",
         rightText: "A brilliant idea!",
         swipeLeftFunction: function () {  
            disable("Generic22");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, tinyPositive, mediumNegative, smallNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic22");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyPositive, smallNegative, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "With a little more budget and some policy tweaks I think I could rapidly improve the efficiency of our HR department, " + genderReferenceMid + ".",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 11,
         timeTakenRight: 15
    },
    Generic23: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Defend them, call off the violence",
         rightText: "Distance our company from theirs publicly",
         swipeLeftFunction: function () {  
            disable("Generic23");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, smallNegative, smallNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic23");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, tinyNegative, smallPositive, smallPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "A leading competitor has inspired riots outside of their building, " + genderReferenceMid + ". I'm concerned for our safety too.",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 8,
         timeTakenRight: 4
    },
    Generic24: { 
        enabled: true,
         name: "RHM",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "That won't be necessary.",
         rightText: "I appreciate that.",
         swipeLeftFunction: function () {  
            disable("Generic24");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, smallPositive, smallNegative, smallNegative, mediumPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic24");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, tinyPositive, tinyPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have arranged for private security for you, " + genderReferenceMid + ". Your safety is paramount to the company.",
         phaserScenarioHolder: "",
         characterName: characterNames.RHM,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 10,
         timeTakenRight: 4
    },
    Generic25: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Better safe than sorry",
         rightText: "I'm not sure our vents are that big...",
         swipeLeftFunction: function () {  
            disable("Generic25");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyNegative, 0, 0, smallNegative, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic25");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyPositive, 0, 0, mediumPositive, mediumNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Was watching some films last night. Long story short, I want to install movement detectors in the vents.",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 12
    },
    Generic26: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Sounds effective",
         rightText: "The employees will hate that",
         swipeLeftFunction: function () {  
            disable("Generic26");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, 0, tinyPositive, mediumNegative, mediumPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic26");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, smallPositive, smallNegative, mediumPositive, mediumNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "We should put cameras throughout the whole building, keep an eye out 24/7.",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 12
    },
    Generic27: { 
        enabled: true,
         name: "SecurityOfficer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "It would be more secure...",
         rightText: "Our employees would get angry",
         swipeLeftFunction: function () {  
            disable("Generic27");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, tinyPositive, mediumNegative, mediumPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic27");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, tinyPositive, smallNegative, mediumPositive, mediumNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Let's install some metal detectors in the entry hall. Anyone could snap at anytime.",
         phaserScenarioHolder: "",
         characterName: characterNames.securityChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 9
    },
    Generic28: { 
        enabled: true,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No, security can keep their funding",
         rightText: "Yeah, you're right",
         swipeLeftFunction: function () {  
            disable("Generic28");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyNegative, smallNegative, mediumPositive, tinyNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic28");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyPositive, smallPositive, 0, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Security is getting far too much budget right now, it's simply a field where the low cost items work just as well!",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 8,
         timeTakenRight: 3
    },
    Generic29: { 
        enabled: true,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Make it happen",
         rightText: "I want nothing touching our profits",
         swipeLeftFunction: function () {  
            disable("Generic29");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, smallNegative, smallPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic29");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, smallPositive, smallNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "A pay rise across the company to meet inflation will barely touch our bottom line much but could be great for morale?",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 11
    },
    Generic30: { 
        enabled: true,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "I won't subject anyone to low-ply",
         rightText: "I see no problems with that",
         swipeLeftFunction: function () {  
            disable("Generic30");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, smallNegative, smallPositive, smallNegative, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic30");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, smallPositive, smallNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Switching to a lower ply toilet paper would give a surprisingly large boost to profits this quarter.",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 6,
         timeTakenRight: 2
    },
    Generic31: { 
        enabled: true,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Take a cut of two department's funding",
         rightText: "Take a cut of my salary",
         swipeLeftFunction: function () {  
            disable("Generic31");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, smallPositive, smallNegative, 0, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic31");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, mediumNegative, smallPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Shares are falling and a cut will have to be made somewhere, " + genderReferenceMid + "...",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 6
    },
    Generic32: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No, that's a pointless request",
         rightText: "Morale is important",
         swipeLeftFunction: function () {  
            disable("Generic32");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, smallPositive, smallNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic32");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, tinyPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I'm not sure why yet, but, uh... I think we should bring VR to the office. Could raise morale at least?",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 3
    },
    Generic33: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Perfect, great work",
         rightText: "I want all conversations monitored",
         swipeLeftFunction: function () {  
            disable("Generic33");  
            spawnNewPicture(cache[k]);  
            influenceStatus(tinyNegative, tinyNegative, 0, smallPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic33");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, smallPositive, 0, smallNegative, smallPositive);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "The internal communication system is fully up and, ah, running. Implementation is going smoothly.",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 5
    },
    Generic34: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "It's a risk worth taking",
         rightText: "Limit what he can do",
         swipeLeftFunction: function () {  
            disable("Generic34");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, mediumPositive, 0, mediumNegative, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic34");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, mediumNegative, 0, mediumPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "There's a lot of, well, strange activity on the network. I think the uh... Weird new guy is doing some shady work; there's risk of viruses!",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 5
    },
    Generic35: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Understated is best",
         rightText: "Make it flashy with as many graphics as possible",
         swipeLeftFunction: function () {  
            disable("Generic35");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, 0, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic35");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, mediumPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "It's time for a website re-design. Did you have any, uh, styles in mind?",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 9,
         timeTakenRight: 5
    },
    Generic36: { 
        enabled: true,
         name: "TechChief",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Sure, future proof the layout",
         rightText: "If it works don't touch it",
         swipeLeftFunction: function () {  
            disable("Generic36");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, mediumNegative, smallPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic36");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, mediumPositive, smallNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Our server is like a jungle right now. Could we, uh, shut down the IT system for a day while we organise it?",
         phaserScenarioHolder: "",
         characterName: characterNames.techChief,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 7
    },
    Generic37: { 
        enabled: true,
         name: "Librarian",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Sure, why not?",
         rightText: "No, this is just between us",
         swipeLeftFunction: function () {  
            disable("Generic37");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, 0, 0, mediumNegative, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic37");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, smallNegative, 0, mediumPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Hello again! It would be a treat to set up a nice little occult book club for lunch times. You and your friend to could come along!",
         phaserScenarioHolder: "",
         characterName: characterNames.librarian,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 7
    },
    Generic38: { 
        enabled: true,
         name: "Librarian",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Please, send it to me",
         rightText: "Not my cup of tea, thanks",
         swipeLeftFunction: function () {  
            disable("Generic38");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, mediumNegative, mediumPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic38");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, mediumPositive, mediumNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I found a wonderful little book on acending the mortal realm through ritualistic sacrifice. Would you like to borrow it, dear?",
         phaserScenarioHolder: "",
         characterName: characterNames.librarian,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 7
    },
    Generic39: { 
        enabled: true,
         name: "Auctioneer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Yes. Yes they would.",
         rightText: "I don't think that's smart, or legal",
         swipeLeftFunction: function () {  
            disable("Generic39");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallPositive, smallPositive, 0, mediumNegative, mediumPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic39");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumNegative, smallNegative, 0, mediumPositive, mediumNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I recently won a glorious collection of Aztec swords; macuahuitl that can cleave a man with ease! Would your security team like some?",
         phaserScenarioHolder: "",
         characterName: characterNames.auctionMaster,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 8
    },
    Generic40: { 
        enabled: true,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Where are these dying bodies?",
         rightText: "How do I meet an ascended greater one?",
         swipeLeftFunction: function () {  
            disable("Generic40");  
            spawnNewPicture("Generic40L");  
            influenceStatus(0, 0, 0, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Generic40");  
            spawnNewPicture("Generic40R");  
            influenceStatus(0, 0, 0, smallPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Some Higher Ones long for a physical form, others have bodies in our world that are lost and dying as they ascend to greater realms.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    Generic40L: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "This is what we are discovering. Fear not, they have countless ways of communicating should they develop interest...",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 2
    },
    Generic40R: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Research and artefacts. Though who knows what seeing such a thing would do to a man...",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 2
    },
    CryptoRisk1: { 
        enabled: true,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Buy, buy, buy!",
         rightText: "It's an unreliable market",
         swipeLeftFunction: function () {  
            disable("CryptoRisk1");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("CryptoRisk2");  
            enable("CryptoRisk3");  
            disable("CryptoRisk1");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "We have some good intel that a new crypto currency is going to be huge soon. Should we invest?",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 5
    },
    CryptoRisk2: { 
        enabled: false,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "It's fine...",
         rightText: "...",
         swipeLeftFunction: function () {  
            disable("CryptoRisk2");  
            disable("CryptoRisk3");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, bigNegative, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("CryptoRisk2");  
            disable("CryptoRisk3");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, bigNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have some bad news. The crypto currency that we invested in has crashed harshly...",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 5
    },
    CryptoRisk3: { 
        enabled: false,
         name: "FinAdv",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "I'm rich!",
         rightText: "Our employees get a big bonus this month!",
         swipeLeftFunction: function () {  
            disable("CryptoRisk3");  
            disable("CryptoRisk2");  
            spawnNewPicture(cache[k]);  
            influenceStatus(mediumPositive, 0, mediumPositive, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("CryptoRisk3");  
            disable("CryptoRisk2");  
            spawnNewPicture(cache[k]);  
            influenceStatus(smallNegative, 0, bigPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Great news, the crypto currency that we invested in is booming!",
         phaserScenarioHolder: "",
         characterName: characterNames.financialAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 5,
         timeTakenRight: 5
    },
    PyorIntro1: { 
        enabled: true,
         name: "Auctioneer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No, sounds like a plain relic",
         rightText: "Yes, this is of interest to us",
         swipeLeftFunction: function () {  
            enable("PyorIntro1A");  
            disable("PyorIntro1");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, mediumNegative, smallPositive, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () { 
            enable("PyorIntro2");
            disable("PyorIntro1");
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, smallPositive, smallNegative, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "A relic of a mask is up for auction, " + genderReferenceMid + ". Horrible thing, gives the appearance of boiling skin from the looks of it. Should I buy?",
         phaserScenarioHolder: "",
         characterName: characterNames.auctionMaster,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 8,
         timeTakenRight: 2
    },
    PyorIntro1A: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "And what does this mean for us exactly?",
         rightText: "And you know this how?",
         swipeLeftFunction: function () {  
            disable("PyorIntro1A");  
            spawnNewPicture("PyorIntro1AL");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {
            disable("PyorIntro1A");
            spawnNewPicture("PyorIntro1AR");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "This mask is interesting, and certainly significant. Made not in worship of a Higher One, but in fearful reverence...",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    PyorIntro1AL: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "So this helps us?",
         rightText: "What does this all mean?",
         swipeLeftFunction: function () {  
            disable("PyorIntro1AL");  
            spawnNewPicture("PyorIntro1AR");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("PyorIntro1AL");  
            spawnNewPicture("PyorIntro1AR");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Masks like it appear in my readings. Some of these texts are quite modern... Perhaps this craft lives to today?",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    PyorIntro1AR: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Find out more, I am undeterred.",
         rightText: "Then we will progress with caution.",
         swipeLeftFunction: function () {  
            enable("PyorIntro2");  
            disable("PyorIntro1AR");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("PyorIntro2");  
            disable("PyorIntro1AR");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "This skin isn't boiling, these are pustules. The mask shows flesh dying, rotting... There may be great risk in this path.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    PyorIntro2: { 
        enabled: false,
         name: "Auctioneer",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Pottery will give us nothing",
         rightText: "Of great interest!",
         swipeLeftFunction: function () {  
            enable("PyorIntro2A");  
            disable("PyorIntro2");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, tinyPositive, mediumNegative, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("PyorIntro2");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, tinyNegative, smallPositive, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Pottery this time, " + genderReferenceMid + ". Ancient text beneath an image of a man, crushed by many rocks. Of interest to us?",
         phaserScenarioHolder: "",
         characterName: characterNames.auctionMaster,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 9,
         timeTakenRight: 3
    },
    PyorIntro2A: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Interesting... Does it help us?",
         rightText: "That's disgusting!",
         swipeLeftFunction: function () {  
            disable("PyorIntro2A"); 
            enable("Pyor3");
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, smallPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {    
            disable("PyorIntro2A");  
            spawnNewPicture("Pyor2AR");  
            influenceStatus(0, 0, 0, 0, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have translated the pottery. It depicts sacrifice to appease a higher one. They would pin a creature under rocks and let them rot in the town centre",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1,
         timeTakenRight: 1
    },
    Pyor2AR: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "I won't consider it.",
         rightText: "I see.",
         swipeLeftFunction: function () {  
            enable("Pyor3");  
            disable("Pyor2AR");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("Pyor3");  
            disable("Pyor2AR");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Possibly. Sacrifice may be a way of gaining this one's attention.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1,
         timeTakenRight: 1
    },
    Pyor3: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No. We go no further with this.",
         rightText: "As do I, find one of them",
         swipeLeftFunction: function () {  
            enable("Pyor4");  
            disable("Pyor3");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor3");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, smallPositive);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have heard whispers of a group who seem to believe that they hold back 'the oncoming plague'. I want those whispers to become a conversation",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1,
         timeTakenRight: 1
    },
    Pyor4: { 
        enabled: false,
         name: "Librarian",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Thank you, I'll get around to it...",
         rightText: "I'll read it at once!",
         swipeLeftFunction: function () {  
            disable("Pyor4");  
            spawnNewPicture("Pyor4L");  
            influenceStatus(tinyPositive, 0, 0, 0, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("Pyor5");  
            disable("Pyor4");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "Good afternoon. I've just brought along a history book about the plague - the nice odd man, suggested you'd enjoy it",
         phaserScenarioHolder: "",
         characterName: characterNames.librarian,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 3,
         timeTakenRight: 0
    },
    Pyor4L: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Interesting...",
         rightText: "Well, I won't be reading any more of this",
         swipeLeftFunction: function () {  
            enable("Pyor5");  
            disable("Pyor4L");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, smallNegative, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("Pyor5");  
            disable("Pyor4L");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, smallPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "An interesting book, yes? Read between the lines, think of the plague as more than mindless",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 2,
         timeTakenRight: 2
    },
    Pyor5: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Go on...",
         rightText: "A tribal fairy tale, I'm sure",
         swipeLeftFunction: function () {  
            disable("Pyor5");  
            spawnNewPicture("Pyor6");  
            influenceStatus(0, 0, 0, tinyPositive, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor5");  
            spawnNewPicture("Pyor6");  
            influenceStatus(0, 0, 0, smallPositive, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have a name for you. Pyor, associated with pus, decay, and disease. ",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1,
         timeTakenRight: 1
    },
    Pyor6: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Yes... Yes, I want to know more",
         rightText: "You would bring disease here?!",
         swipeLeftFunction: function () {  
            disable("Pyor6");  
            spawnNewPicture("Pyor6L");  
            influenceStatus(0, 0, 0, smallNegative, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            enable("Pyor7");  
            disable("Pyor6");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, smallPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I have tracked down envoys of Pyor too, those who have heard its voice, felt its presence. Let me bring one here.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    Pyor6L: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "No, there are others to commune with",
         rightText: "Fine... Bring me a worshipper of Pyor",
         swipeLeftFunction: function () {  
            enable("Pyor7");  
            disable("Pyor6L");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, mediumPositive, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor6L");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, mediumNegative, tinyPositive);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "The Higher Ones are nothing; not disease, not judgement, not fear. I invite nothing but a chance for you to commune as you so desire.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 4,
         timeTakenRight: 4
    },
    Pyor7: { 
        enabled: false,
         name: "who",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            disable("Pyor7");  
            spawnNewPicture("Pyor8");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor7");  
            spawnNewPicture("Pyor8");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "I present to you one of the few channelers of Pyor that remain.",
         phaserScenarioHolder: "",
         characterName: characterNames.cultAdviser,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    Pyor8: { 
        enabled: false,
         name: "PyorCultist",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "Go on, explain yourself.",
         rightText: "Whatever happened to hello?",
         swipeLeftFunction: function () {  
            disable("Pyor8");  
            spawnNewPicture("Pyor9");  
            influenceStatus(0, 0, 0, tinyNegative, tinyNegative);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor8");  
            spawnNewPicture("Pyor9");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "You're a fool if you follow this road. Send me away, forget about Pyor, die old and let your ancestors die old too.",
         phaserScenarioHolder: "",
         characterName: characterNames.pyorCultist,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    Pyor9: { 
        enabled: false,
         name: "PyorCultist",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "I understand",
         rightText: "Let me help you stop it then",
         swipeLeftFunction: function () {  
            disable("Pyor9");  
            spawnNewPicture("Pyor10");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor9");  
            spawnNewPicture("Pyor10");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "We do not worship Pyor, we work to stop it. It is disease and plague, and you would do best to forget this.",
         phaserScenarioHolder: "",
         characterName: characterNames.pyorCultist,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    Pyor10: { 
        enabled: false,
         name: "PyorCultist",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "My aims are my own",
         rightText: "We have resources to help you ",
         swipeLeftFunction: function () {  
            disable("Pyor10");  
            spawnNewPicture("Pyor11");  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("Pyor10");  
            spawnNewPicture("Pyor11");  
            influenceStatus(0, 0, 0, smallPositive, smallNegative);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "What? You want it to stop too? And yet you haven't heard its voice? Felt its wrath?",
         phaserScenarioHolder: "",
         characterName: characterNames.pyorCultist,
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0
    },
    HappinessLoss1: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () { 
            onDeath(); 
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "Workers have left in droves and the business has halted. Your reputation is gone and your descendants must pick up the pieces.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "They longed for past success and forgot to look for present joy"
    },
    HappinessLoss2: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath();  
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "Poor working conditions led one employee to snap. They broke into your office and ended you with your own letter opener.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "Taken from us early after putting profit before people"
    },
    HappinessLoss3: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath();
        },
         swipeRightFunction: function () {  
            onDeath();  
        },
         scenarioText: "You've lost your motivation; the business and your interest in things beyond you have faded completely. You live out the rest of your days in a remote, happier place.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "Finally found happiness in isolation, with simple loves and simple interests"
    },
    HouseLoss1: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath(); 
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "The office has become infested with rats who grow bigger and bolder by the day. A demonic looking one found you in your sleep and chewed to your heart.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "A victim of a city overran by unwelcome creatures"
    },
    FinancialLoss1: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath();  
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "The company is bankrupt and your funding for otherworldy pursuits gone. With your reputation in tatters, your descendants must continue your work.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "They had great success and great loss, but found peace in a simpler life"
    },
    CultLoss1: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath();
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "The cultists that you befriended questioned your intentions, and you were slain by an unseen enemy on a dark night.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "They took an interest in all things, and they were taken from us for it"
    },
    SanityLoss1: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath();
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "You were brought into a vibrant expanse of nothingness, save for you and a grand black book atop a pedestal. You signed your name inside it.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "They passed in their sleep, looking for peace"
    },
    SanityLoss2: { 
        enabled: false,
         name: "grave",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "...",
         rightText: "...",
         swipeLeftFunction: function () {  
            onDeath(); 
        },
         swipeRightFunction: function () {  
            onDeath(); 
        },
         scenarioText: "Your employees witness you raised into the air by some invisible force before being brutally devoured.",
         phaserScenarioHolder: "",
         characterName: "",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 0,
         timeTakenRight: 0,
        gravestoneText: "Their life and their passing was grand, and they will be remembered for it"
    },
    DUMMY: { 
        enabled: true,
         name: "mona3",
         phaserInfo: "",
         phaserLeftHolder: "",
         phaserRightHolder: "",
         leftText: "YOU SHOULDN'T BE HERE",
         rightText: "YOU SHOULDN'T BE HERE",
         swipeLeftFunction: function () {  
            disable("DUMMY");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         swipeRightFunction: function () {  
            disable("DUMMY");  
            spawnNewPicture(cache[k]);  
            influenceStatus(0, 0, 0, 0, 0);  
            updateAgeOnSwipe(); 
        },
         scenarioText: "THIS IS SPACER AT THE END OF THE CACHE",
         phaserScenarioHolder: "",
         characterName: "dummy",
         phaserCharacterNameHolder: "",
         timeTakenLeft: 1000,
         timeTakenRight: 4000
    }
};

var distanceMovedX; //tracks how far you've dragged to see which tween to use in the spawn picture function

//This is integral to the game loop and does a huge amount (or will, eventually). For now it creates the new image with an alpha of 0, gives it the necessary properties to not look awful, then fades it in because animations are all slick and stuff  --  It takes in one paramater (theThing) which is what you want it to show. Most of the time this will be a reference to our cache for random selection but you can tell it to show a specific card for narrative chains
function spawnNewPicture(theThing) {
    
    console.log("thing " + theThing);

    k > cache.length - 1 ? theThing = cache[game.rnd.integerInRange(0, cache.length-1)] : "";

    console.log("cache before: " + cache);
    console.log("before gimme: " + k);
    console.log("before gimme: " + cache[k]);
    k = gimmeAK(); //randomise a new number to pick another card
    console.log("after gimme: " + k);
    console.log("after gimme: " + cache[k]);
    console.log("cache after: " + cache);
    console.log("cache after: " + cache.length);


     console.log("thing2 " + theThing);
    //create and give basic properties to the new image
    allPicturesObj[theThing].phaserInfo = game.add.image(game.world.centerX, game.world.centerY + 60, allPicturesObj[theThing].name, 0, layers.mainGameElements);
    allPicturesObj[theThing].phaserInfo.anchor.setTo(0.5);
    allPicturesObj[theThing].phaserInfo.scale.setTo(0.5);
    allPicturesObj[theThing].phaserInfo.alpha = 0;

    //enable dragging on this new image
    allPicturesObj[theThing].phaserInfo.inputEnabled = true;
    allPicturesObj[theThing].phaserInfo.input.enableDrag();

    //we create the fade, give it properties, and make it a child of the picture
    var fade = game.add.image(0, 0, "fade", 0);
    fade.anchor.setTo(0.5);
    fade.alpha = 0;
    allPicturesObj[theThing].phaserInfo.addChild(fade);

    //we make the left text and give it the needed properties (colour, opacity)
    allPicturesObj[theThing].phaserLeftHolder = game.add.text(-300, -360, allPicturesObj[theThing].leftText, {
        font: "26pt Roboto",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: 400
    });
    allPicturesObj[theThing].phaserLeftHolder.alpha = 0;

    //and the same to the right
    allPicturesObj[theThing].phaserRightHolder = game.add.text(310, -360, allPicturesObj[theThing].rightText, {
        font: "26pt Roboto",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: 400,
        align: "right"
    });
    allPicturesObj[theThing].phaserRightHolder.alpha = 0;

    //offset the right text based on the width of it
    allPicturesObj[theThing].phaserRightHolder.x -= allPicturesObj[theThing].phaserRightHolder.width;

    //we make the text a child of the image so that they move together
    allPicturesObj[theThing].phaserInfo.addChild(allPicturesObj[theThing].phaserRightHolder);
    allPicturesObj[theThing].phaserInfo.addChild(allPicturesObj[theThing].phaserLeftHolder);

    //add events on drag for this new image
    allPicturesObj[theThing].phaserInfo.events.onDragUpdate.add(dragCardUpdate, this);
    allPicturesObj[theThing].phaserInfo.events.onDragStop.add(dragCardStop, this);

    //make the new image tween to a visible state for a slightly nicer looking experience
    game.add.tween(allPicturesObj[theThing].phaserInfo).to({
        alpha: 1
    }, 500, Phaser.Easing.Back.In, true);

    //and this is the scenario text that tells you what you're choosing between
    allPicturesObj[theThing].phaserScenarioHolder = game.add.text(game.world.centerX + 0.5, game.height * 0.24, allPicturesObj[theThing].scenarioText, {
        font: "16pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.9,
        align: "center"
    }, layers.iconsAndText);
    allPicturesObj[theThing].phaserScenarioHolder.anchor.setTo(0.5);

    //This one is for the character name that appears beneath the image
    allPicturesObj[theThing].phaserCharacterNameHolder = game.add.text(game.world.centerX - 0.5, game.world.height * 0.84, allPicturesObj[theThing].characterName, {
        font: "11pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    allPicturesObj[theThing].phaserCharacterNameHolder.anchor.setTo(0.5);

    //if this is a death card, write the death information on it
    if (allPicturesObj[theThing].gravestoneText != null) {
        
        allPicturesObj[theThing].phaserInfo.alpha = 0.8;
        
        playerGraveyard["grave" + graveyardIterator] = {};
        
        
        //Add and style the player's name for this death
        var playerGraveName = game.add.text( 0.5, -250, playerNameThisLife + " Misk", {
        font: "51pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerGraveName.anchor.setTo(0.5);
        allPicturesObj[theThing].phaserInfo.addChild(playerGraveName);
        playerGraveyard["grave" + graveyardIterator].name = playerNameThisLife + " Misk";
        
        //and the same for their age
        var playerGraveAge = game.add.text( 0.5, -170, graveAgeCalculation(playerAgeDeathTrack), {
        font: "31pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerGraveAge.anchor.setTo(0.5);
        allPicturesObj[theThing].phaserInfo.addChild(playerGraveAge);
        playerGraveyard["grave" + graveyardIterator].age = graveAgeCalculation(playerAgeDeathTrack);
        
        //and score
        var playerGraveScore = game.add.text( 0.5, -110, "score = " + (playerAgeDeathTrack - startingAge) + " weeks", {
        font: "20pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerGraveScore.anchor.setTo(0.5);
        allPicturesObj[theThing].phaserInfo.addChild(playerGraveScore);
        playerGraveyard["grave" + graveyardIterator].score = (playerAgeDeathTrack - startingAge);
    
    //aaaaand the gravestone text
        var playerGraveText = game.add.text( 0.5, 80, allPicturesObj[theThing].gravestoneText, {
        font: "35pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.99,
            align: "center"
    }, layers.iconsAndText);
    playerGraveText.anchor.setTo(0.5);
        allPicturesObj[theThing].phaserInfo.addChild(playerGraveText);
        playerGraveyard["grave" + graveyardIterator].graveText = allPicturesObj[theThing].gravestoneText;
        
        var temp = JSON.stringify(playerGraveyard);
        console.log("Graveyard: " + temp);
        graveyardIterator++;
        
    }

    //measure how far you've dragged the image and rotate it appropriately
    function dragCardUpdate() {
        distanceMovedX = game.world.centerX - allPicturesObj[theThing].phaserInfo.x;
        allPicturesObj[theThing].phaserInfo.angle = -distanceMovedX / 15;



        //if the card is being dragged to the left, change the opacity of the right text based on how close it is to the edge and hide the left text
        if (allPicturesObj[theThing].phaserInfo.x > game.world.centerX) {
            allPicturesObj[theThing].phaserRightHolder.alpha = 0;

            var percentageForOpacity = Phaser.Math.percent(allPicturesObj[theThing].phaserInfo.x, game.world.width - game.world.width / 4);
            allPicturesObj[theThing].phaserLeftHolder.alpha = percentageForOpacity;
            fade.alpha = percentageForOpacity / 3;
        }

        //same as the above but in reverse!
        if (allPicturesObj[theThing].phaserInfo.x < game.world.centerX) {
            allPicturesObj[theThing].phaserLeftHolder.alpha = 0;

            var percentageForOpacity = Phaser.Math.percent(0 + game.world.width / 4, allPicturesObj[theThing].phaserInfo.x);
            allPicturesObj[theThing].phaserRightHolder.alpha = percentageForOpacity;
            fade.alpha = percentageForOpacity / 3;
        }
    }

    function dragCardStop() {
        //if you only move the card a bit, make it fling back to the middle
        if (distanceMovedX < 170 && distanceMovedX > -170) {
            //tween for the main card
            game.add.tween(allPicturesObj[theThing].phaserInfo).to({
                x: game.world.centerX,
                y: game.world.centerY + 60,
                angle: 0
            }, 1000, Phaser.Easing.Back.Out, true);
            //Tween to make the text invisible again
            allPicturesObj[theThing].phaserLeftHolder.alpha = 0;
            allPicturesObj[theThing].phaserRightHolder.alpha = 0;
            fade.alpha = 0;

        } else {
            var whooshDirection;

            if (distanceMovedX > 0) {
                whooshDirection = -180;
                playerAgeDeathTrack = playerAgeDeathTrack + allPicturesObj[theThing].timeTakenLeft;
            } else {
                whooshDirection = game.world.width + 180;
                playerAgeDeathTrack = playerAgeDeathTrack + allPicturesObj[theThing].timeTakenRight;
            }

            var whoosh = game.add.tween(allPicturesObj[theThing].phaserInfo).to({
                x: whooshDirection
            }, 200, Phaser.Easing.Linear.In, true);
            whoosh.onComplete.add(doSomething);

            function doSomething() {

                this.allPicturesObj[theThing].phaserInfo.destroy(); //kill it when it's off screen to keep things clean
                allPicturesObj[theThing].phaserScenarioHolder.destroy();
                allPicturesObj[theThing].phaserCharacterNameHolder.destroy();

                //we split this based on direction so we know which response to the player's actions to actually take
                if (whooshDirection < 0) {
                    allPicturesObj[theThing].swipeLeftFunction();
                    //alert("Left");

                }
                if (whooshDirection > 0) {
                    allPicturesObj[theThing].swipeRightFunction();
                    //alert("Right");

                }

            }



        }


    }
}

//Unsurprisingly, this function creates the icons. We could put it in create but I would rather keep things as neat as possible
function createIcons() {

    var iconY = game.height * 0.035;

    //these are our status icons. There are two each for a very good reason; the local variable ones are in the background so won't get called by anything else, while the global variable one will be cropped and tweened as needed to give an indication of your progress
    var faceBack = game.add.image(game.world.width * (4 / 20) - 30, iconY, 'face', 0, layers.iconsAndText);
    faceBack.scale.setTo(scaleIconSize);
    faceBack.anchor.setTo(0);
    faceBack.alpha = 0.5;
    cropScaledSize = faceBack.width * 2;

    face = game.add.image(game.world.width * (4 / 20) - 30, iconY, 'face', 0, layers.iconsAndText);
    face.scale.setTo(scaleIconSize);
    face.anchor.setTo(0);
    face.origPosition = face.position.clone();
    faceCrop = new Phaser.Rectangle(0, 0, cropScaledSize, cropScaledSize);
    face.crop(faceCrop, false);



    var houseBack = game.add.image(game.world.width * (8 / 20) - 30, iconY, 'house', 0, layers.iconsAndText);
    houseBack.scale.setTo(scaleIconSize);
    houseBack.anchor.setTo(0);
    houseBack.alpha = 0.5;

    house = game.add.image(game.world.width * (8 / 20) - 30, iconY, 'house', 0, layers.iconsAndText);
    house.scale.setTo(scaleIconSize);
    house.anchor.setTo(0);
    house.origPosition = house.position.clone();
    houseCrop = new Phaser.Rectangle(0, 0, cropScaledSize, cropScaledSize);
    house.crop(houseCrop);


    var moneyBack = game.add.image(game.world.width * (12 / 20) - 30, iconY, 'money', 0, layers.iconsAndText);
    moneyBack.scale.setTo(scaleIconSize);
    moneyBack.anchor.setTo(0);
    moneyBack.alpha = 0.5;

    money = game.add.image(game.world.width * (12 / 20) - 30, iconY, 'money', 0, layers.iconsAndText);
    money.scale.setTo(scaleIconSize);
    money.anchor.setTo(0);
    money.origPosition = money.position.clone();
    moneyCrop = new Phaser.Rectangle(0, 0, cropScaledSize, cropScaledSize);
    money.crop(moneyCrop);


    var targetBack = game.add.image(game.world.width * (16 / 20) - 30, iconY, 'target', 0, layers.iconsAndText);
    targetBack.scale.setTo(scaleIconSize);
    targetBack.anchor.setTo(0);
    targetBack.alpha = 0.5;

    target = game.add.image(game.world.width * (16 / 20) - 30, iconY, 'target', 0, layers.iconsAndText);
    target.scale.setTo(scaleIconSize);
    target.anchor.setTo(0);
    target.origPosition = target.position.clone();
    targetCrop = new Phaser.Rectangle(0, 0, cropScaledSize, cropScaledSize);
    target.crop(targetCrop);

    //this initialises the 50 percent fill on all icons
    influenceStatus(50, 50, 50, 50, 90);


}

var startingAge; //this is seperate to the death tracker so we can see how long you lived afterwards
var playerAgeDeathTrack; //we keep track of the player's actual age in weeks for the death stats
//This function simple updates your age when you choose a card option
var playerAge; //this is stored so we can destroy it and replace it across functions
//And this simply deletes and updates your player's age based on the property in the card you swiped
function updateAgeOnSwipe() {

    playerAge.destroy();

    playerAge = game.add.text(game.world.centerX + 0.5, game.world.height * 0.94, ageCalculation(playerAgeDeathTrack), {
        font: "11pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerAge.anchor.setTo(0.5);

}

//takes in number of weeks, returns string of age in years and weeks
function ageCalculation(weeks) {

    var years = Math.floor(weeks / 52);
    var remainderWeeks = weeks % 52;

    if (remainderWeeks > 0) {
        return "Age: " + years + " and " + remainderWeeks + " weeks"
    }
    if (remainderWeeks = 0) {
        return "Age: " + years
    }

}
//Same as the above but with some edits to make it better suited to the gravestone
function graveAgeCalculation(weeks) {

    var years = Math.floor(weeks / 52);
    var remainderWeeks = weeks % 52;

    if (remainderWeeks > 0) {
        return  years + " and " + remainderWeeks + " weeks"
    }
    if (remainderWeeks = 0) {
        return years
    }

}

//The cache is where we hold all enabled scales so that the randomiser can choose an active one
var cache;

function updateCache() { // Using function we can update it when needed.
    cache = Object.keys(allPicturesObj).filter(k => allPicturesObj[k].enabled);
}
updateCache();

//the enable and disable functions allow us to add or take away from the cache by taking an input. Importantly, the input into these (fn) can be concantenated
function enable(fn) {
    allPicturesObj[fn].enabled = true;
    updateCache();
}

//This function enables an array of items, helping us add decks super easily
function enableArray(fn) {

    for (i = 0; i <= fn.length - 1; i++) {
        enable(fn[i]);
    }

}

function disable(fn) {
    allPicturesObj[fn].enabled = false;
    updateCache();
}

function disableArray(fn) {

    for (i = 0; i <= fn.length - 1; i++) {
        allPicturesObj[fn[i]].enabled = false;
    }
    updateCache();

}

//the SAVECACHE is the cache that is reloaded upona a death - importantly, it's different to our main cache because cards that add other cards to the pool need to return to the start of their chain to make narrative sense
var SAVECACHE = [];

function quickGenericSaveFill() { //we use this literally once because I'm too lazy to add the generic cards manually
    var objKeys = Object.keys(allPicturesObj);

    for (i = 1; i <= 40; i++) {
        SAVECACHE.push("Generic" + i)
    }
}
quickGenericSaveFill();
SAVECACHE.push("CryptoRisk1", "PyorIntro1");
console.log("ytytyt " + SAVECACHE);

function useSaveCache() {
    disableArray(cache);
    enableArray(SAVECACHE);
}

function gimmeAK() {
    var temp = Math.floor(Math.random() * cache.length);
    temp == cache.length - 1 ? temp = temp - 1 : temp = temp;
    temp == -1 ? temp = 0 : temp = temp;
    return temp;

}; //Gives random number value within the cache; it's a function to keep things a bit simpler later for me
var k = gimmeAK();

//Basic random number in range function - just good to have
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//these arrays are for all the death cards. They are in arrays like this to make adding them to the deck just a tiny bit easier/neater
var happinessDeath = ["HappinessLoss1", "HappinessLoss2", "HappinessLoss3"];
var houseDeath = ["HouseLoss1"];
var moneyDeath = ["FinancialLoss1"];
var cultDeath = ["CultLoss1"];
var sanityDeath = ["SanityLoss1", "SanityLoss2"];

//These are the global variables for our status bar
var face,
    money,
    house,
    target;

//and these are the Phaser rectangles we use to give motion to them
var faceCrop,
    moneyCrop,
    houseCrop,
    targetCrop;

//here are the points that track how much each icon should be filled by
var facePoints = 0,
    moneyPoints = 0,
    housePoints = 0,
    targetPoints = 0,
    sanityPoints = 0;

//and these hold the percentage to take away from each one
var facePercent,
    moneyPercent,
    housePercent,
    targetPercent;

//the favour menu stuff
var favourMenu;

//This is used for sorting elements logically
var layers;

//this function changes the status of all of the icons based on the object properties for each one
function influenceStatus(faceArg, houseArg, moneyArg, targetArg, sanityArg) {

    //initialise all icon status stuff
    //These give us the percentage to take away, while points are how full they are
    var tempFace = facePoints;
    facePoints = facePoints + faceArg;
    facePoints > 100 ? facePoints = 100 : ""; //fancy shorthand if statement stopping us going above 100
    facePoints < 0 ? facePoints = 0 : "";

    var tempMoney = moneyPoints;
    moneyPoints = moneyPoints + moneyArg;
    moneyPoints > 100 ? moneyPoints = 100 : "";
    moneyPoints < 0 ? moneyPoints = 0 : "";

    var tempHouse = housePoints;
    housePoints = housePoints + houseArg;
    housePoints > 100 ? housePoints = 100 : "";
    housePoints < 0 ? housePoints = 0 : "";

    var tempTarget = targetPoints;
    targetPoints = targetPoints + targetArg;
    targetPoints > 100 ? targetPoints = 100 : "";
    targetPoints < 0 ? targetPoints = 0 : "";

    //sanity
    sanityPoints = sanityPoints + sanityArg;
    sanityPoints > 100 ? sanityPoints = 100 : "";
    sanityPoints < 0 ? sanityPoints = 0 : "";

    //if the player just died, all points reset to 50
    if (deathHappened) {
        facePoints = 50;
        moneyPoints = 50;
        housePoints = 50;
        targetPoints = 50;
        sanityPoints = 80;
        deathHappened = false;
    }
    console.log(facePoints);
    
    //and these give the actual percentages for them
    facePercent = cropScaledSize / 100 * (100 - facePoints);
    housePercent = cropScaledSize / 100 * (100 - housePoints);
    moneyPercent = cropScaledSize / 100 * (100 - moneyPoints);
    targetPercent = cropScaledSize / 100 * (100 - targetPoints);

    //face icon animations
    var faceTween = game.add.tween(faceCrop).to({
        y: facePercent
    }, 1000, Phaser.Easing.Linear.In, true, 0);
    facePoints < tempFace ? face.tint = 0xFF0000 : "";
    facePoints > tempFace ? face.tint = 0x00FF00 : "";

    faceTween.onComplete.add(faceReality, this);

    function faceReality() {
        face.tint = 0x000000;
    }


    //money icon animations
    var moneyTween = game.add.tween(moneyCrop).to({
        y: moneyPercent
    }, 1000, Phaser.Easing.Linear.In, true, 0);
    moneyPoints < tempMoney ? money.tint = 0xFF0000 : "";
    moneyPoints > tempMoney ? money.tint = 0x00FF00 : "";

    moneyTween.onComplete.add(moneyReality, this);

    function moneyReality() {
        money.tint = 0x000000;
    }


    //house icon animations
    var houseTween = game.add.tween(houseCrop).to({
        y: housePercent
    }, 1000, Phaser.Easing.Linear.In, true, 0);
    housePoints < tempHouse ? house.tint = 0xFF0000 : "";
    housePoints > tempHouse ? house.tint = 0x00FF00 : "";

    houseTween.onComplete.add(houseReality, this);

    function houseReality() {
        house.tint = 0x000000;
    }

    //target icon animations
    var targetTween = game.add.tween(targetCrop).to({
        y: targetPercent
    }, 1000, Phaser.Easing.Linear.In, true, 0);
    targetPoints < tempTarget ? target.tint = 0xFF0000 : "";
    targetPoints > tempTarget ? target.tint = 0x00FF00 : "";

    targetTween.onComplete.add(targetReality, this);

    function targetReality() {
        target.tint = 0x000000;
    }

    //these if statements track whether any of our stats are at 0 and, if they are, empties the cache and fills it with the relevant death cards
    if (facePoints == 0) {
        disableArray(cache);
        enableArray(happinessDeath);
    }
    if (housePoints == 0) {
        disableArray(cache);
        enableArray(houseDeath);
    }
    if (moneyPoints == 0) {
        disableArray(cache);
        enableArray(moneyDeath);
    }
    if (targetPoints == 0) {
        disableArray(cache);
        enableArray(cultDeath);
    }
    if (sanityPoints == 0) {
        disableArray(cache);
        enableArray(sanityDeath);
    }

}

var deathHappened = false;
function onDeath() {
    deathHappened = true;
    useSaveCache();
    influenceStatus(50,50,50,50,50);

    //Gender affects minor dialogue wording mainly - it's an immersion thing (0 = female, 1 = male)
    playerGender = Math.floor(Math.random() * 2);

    playerGender == 0 ? genderReferenceStat = "Ma'am" : genderReferenceStart = "Sir";
    playerGender == 0 ? genderReferenceMid = "ma'am" : genderReferenceMid = "sir";

    //function for picking a first name
    choosePlayerName();
    
        playerName.destroy();
    
    playerName = game.add.text(game.world.centerX + 0.5, game.world.height * 0.91, playerNameThisLife + " Misk", {
        font: "13pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerName.anchor.setTo(0.5);
    
    playerAge.destroy();
    
    startingAge = game.rnd.integerInRange(0, 4000);
    playerAgeDeathTrack = startingAge;

    playerAge = game.add.text(game.world.centerX + 0.5, game.world.height * 0.94, ageCalculation(playerAgeDeathTrack), {
        font: "11pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerAge.anchor.setTo(0.5);

    gimmeAK();
    spawnNewPicture("Generic5"); 
    
}

//Below here are the actual Phaser things, including the create function which starts off the game loop
//----------------------------------------------------------------------------//




//Create the game window
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'gamecont', {
    preload: preload,
    create: create,
    update: update,
    render: render
});




function preload() {

    //load in the card images
    game.load.image('mona', 'Sprites/MonaSmall.jpg');
    game.load.image('gogh', 'Sprites/GoghSmall.jpg');
    game.load.image('who', 'Sprites/WhoSmall.jpg');
    game.load.image('mona2', 'Sprites/Mona2Small.png');
    game.load.image('mona3', 'Sprites/Mona3.png');
    game.load.image('RHM', 'Sprites/RightHandManTemp.jpg');
    game.load.image('SO', 'Sprites/ElisabethVigeeLeBrun.png');
    game.load.image('FinAdv', 'Sprites/OldMan.png');
    game.load.image('HROfficer', 'Sprites/GwenJohn.png');
    game.load.image('SecurityOfficer', 'Sprites/AmbroiseThomas.png');
    game.load.image('TechChief', 'Sprites/JohnPeterRussellvanGogh.png');
    game.load.image('Librarian', 'Sprites/JulieSalisSchwabe-AryScheffer.png');
    game.load.image('Auctioneer', 'Sprites/JohnSingletonCopley.png');
    game.load.image('PyorCultist', 'Sprites/IlyaRepinAShyPeasant.png');
    game.load.image('FuneralBell', 'Sprites/FuneralMask-OdilonRedon.png');
    game.load.image('grave', 'Sprites/grave.png');



    //this is the image fade (it makes the picture text more legible)
    game.load.image('fade', 'Sprites/PictureFade.png');

    //these are the icon images
    game.load.image('face', 'Sprites/Face.png');
    game.load.image('house', 'Sprites/House.png');
    game.load.image('money', 'Sprites/Money.png');
    game.load.image('target', 'Sprites/Target.png');

    //the favour menu
    game.load.image('favourMenu', 'Sprites/ScrollTemp.png');
}


var scaleIconSize = 0.5,
    cropScaledSize;

function create() {
    console.log(allPicturesObj[moneyDeath]);
    choosePlayerName();

    //we need to create the starting age here because of how Phaser works
    startingAge = game.rnd.integerInRange(0, 4000);
    playerAgeDeathTrack = startingAge;

    game.stage.backgroundColor = "#c19855"

    //we need to actually create layers properly here because of how Phaser works
    layers = {
        backgroundStuff: this.add.group(),
        iconsAndText: this.add.group(),
        mainGameElements: this.add.group(),
        favourMenu: this.add.group()
    }

    createIcons();
    spawnNewPicture("intro1");

    playerName = game.add.text(game.world.centerX + 0.5, game.world.height * 0.91, playerNameThisLife + " Misk", {
        font: "13pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerName.anchor.setTo(0.5);

    playerAge = game.add.text(game.world.centerX + 0.5, game.world.height * 0.94, ageCalculation(playerAgeDeathTrack), {
        font: "11pt Noto Serif",
        fill: "#ffffff",
        wordWrap: true,
        wordWrapWidth: game.width * 0.8
    }, layers.iconsAndText);
    playerAge.anchor.setTo(0.5);


    //These are graphics used to add the darker bars to the top and bottom of the screen, baked into a texture using generateTexture to improve performance (not that we need it)
    var iconBackground = game.add.graphics();
    iconBackground.beginFill(0x825e36);
    iconBackground.drawRect(0, 0, game.width, game.height * 0.15);
    iconBackground.endFill();
    iconBackground.generateTexture;
    layers.backgroundStuff.add(iconBackground);

    var bottomBackground = game.add.graphics();
    bottomBackground.beginFill(0x825e36);
    bottomBackground.drawRect(0, game.height - game.height * 0.12, game.width, game.height * 0.12);
    bottomBackground.endFill();
    bottomBackground.generateTexture;
    layers.backgroundStuff.add(bottomBackground);

    //the favourmenu starts as a small icon that responds to hovering - it is made super small at first so we can beef it up into the actual menu on click
    favourMenu = game.add.image(game.world.centerX, game.world.height, 'favourMenu', 0, layers.favourMenu);
    favourMenu.anchor.setTo(0.5);
    favourMenu.scale.setTo(0.08);
    favourMenu.inputEnabled = true;

    favourMenu.events.onInputOver.add(favourMenuHover, this);
    favourMenu.events.onInputOut.add(favourMenuHoverOff, this);
    favourMenu.events.onInputDown.add(favourMenuHoverDown, this);

}
//this is to see if the menu is open or not, so we can close it again easily with just another click if we need to
var favMenuOpen = false;

//these are the functions that run when hovering over the favour menu icon thing and clicking on it
function favourMenuHover() {
    if (!favMenuOpen) {
        var tween = game.add.tween(favourMenu).to({
            y: game.world.height - 5
        }, 300, Phaser.Easing.Back.Out, true);
    }
}

function favourMenuHoverOff() {
    if (!favMenuOpen) {
        var tween = game.add.tween(favourMenu).to({
            y: game.world.height
        }, 300, Phaser.Easing.Back.Out, true);
    }
}

//if the menu isn't open, move it to the centre-ish of the screen and make it larger, if it's already open move it to the bottom of the screen and tween it small
function favourMenuHoverDown() {
    if (!favMenuOpen) {
        var tween = game.add.tween(favourMenu).to({
            y: game.world.centerY + 10
        }, 300, Phaser.Easing.Back.Out, true);
        var tween2 = game.add.tween(favourMenu.scale).to({
            y: 0.75,
            x: 0.6
        }, 300, Phaser.Easing.Back.Out, true);
    }

    if (favMenuOpen) {
        var tween = game.add.tween(favourMenu).to({
            y: game.world.height
        }, 300, Phaser.Easing.Back.Out, true);
        var tween2 = game.add.tween(favourMenu.scale).to({
            y: 0.08,
            x: 0.08
        }, 300, Phaser.Easing.Back.Out, true);
    }

    favMenuOpen = !favMenuOpen;
}

function update() {

    //updateCrop actually makes the tweens possible and the origposition stuff moves the image along with the tween to give the illusion of a bar increasing or decreasing
    face.updateCrop();
    face.y = face.origPosition.y + faceCrop.y / 2;

    money.updateCrop();
    money.y = money.origPosition.y + moneyCrop.y / 2;

    house.updateCrop();
    house.y = face.origPosition.y + houseCrop.y / 2;

    target.updateCrop();
    target.y = face.origPosition.y + targetCrop.y / 2;


}


function render() {
    //game.debug.bodyInfo(moon, 32, 32);
    //game.debug.body(moon);
    //game.debug.text(degrees, 32, 32 )
}
