let score = 0, //player score
  computerSequence = [], //the order that the computer generates
  userSequence = [], //the order that the player picks after
  buttColours = ["red", "green", "blue", "yellow"], //the colours of the words
  sequenceTrack = 0,  //compared to the computerSequence array to check progress through it
  inputReady = false,  //boolean to see if you are allowed to put your answers in yet
  clickable = true;   //boolean to see if you can press the button

//Praise is best when it's varied...
function affirmation(){
  var randomNum = Math.floor(Math.random() * 13);
  
  if (randomNum == 0) {
    $(".startbutt").html("Yes!");
  }
  if (randomNum == 1) {
    $(".startbutt").html("Yeah!");
  }
  if (randomNum == 2) {
    $(".startbutt").html("Woo!");
  }
  if (randomNum == 3) {
    $(".startbutt").html("Right!");
  }
  if (randomNum == 4) {
    $(".startbutt").html("Mhm!");
  }
  if (randomNum == 5) {
    $(".startbutt").html("Okay!");
  }
  if (randomNum == 6) {
    $(".startbutt").html("Ja!");
  }
  if (randomNum == 7) {
    $(".startbutt").html("Si!");
  }
  if (randomNum == 8) {
    $(".startbutt").html("Da!");
  }
  if (randomNum == 9) {
    $(".startbutt").html("Grats!");
  }
  if (randomNum == 10) {
    $(".startbutt").html("Nice!");
  }
  if (randomNum == 11) {
    $(".startbutt").html("Yesss!");
  }
  if (randomNum == 12) {
    $(".startbutt").html("Grand!");
  }
  if (randomNum == 13) {
    $(".startbutt").html("Noice!");
  }
}

function stroop() {
  //this function uses the Fisher-Yates shuffle to randomise word colours
  var noOfCols = buttColours.length, //number of colours to shift around
    max, //reduced each iteration so we aren't trying to rando the same colours twice
    rando; //the random selector

  while (noOfCols) {
    //while we still have colours to rando
    rando = Math.floor(Math.random() * noOfCols--); //pick a remaing colour
    // aaaaand swap it
    max = buttColours[noOfCols];
    buttColours[noOfCols] = buttColours[rando];
    buttColours[rando] = max;
  }
  return buttColours;
}

function stroopChange() {
  //this function actually makes the word colours change
  $.each(buttColours, function(index, value) {
    $("#button" + index).css("color", value);
  });
}

function simonSays() {
  var time = 0;
  //this is the function that shows the generated colours
  $.each(computerSequence, function(index, value) {
    setTimeout(function() {
      //for each thing in the game's sequence...
      $.each(buttColours, function(buttindex, buttvalue) {
        //we check each colour in the random colours...

        if (value == buttvalue) {
          //and if the two are the same...
          $("#button" + buttindex)
            .delay(2000)
            .animate({ opacity: 1 }, 500, function() {
              $("#button" + buttindex).css("background-color", "purple");
              setTimeout(function() {
                $("#button" + buttindex).css("background-color", "burlywood"); //we change the colour of it briefly
              }, 1000);
            });
        }
      });
    }, time);
    time += 2000;//this bit adds delays between each iteration, so it doesn't show all colours at once
  });
  setTimeout(function(){
    inputReady = true; //when the sequence has played out, you can guess it
  $(".startbutt").html("Play!");
    }, time + 2000);
}

function addingColour() {  //use this to append a colour to the computerSequence
  var i,
      arraylength = computerSequence.length - 1;
  i = Math.floor(Math.random() * 4);
  if (i == 0) {
    if (computerSequence[arraylength] == "blue") {
      addingColour();
      return false;
    }
    computerSequence.push("blue");
  }
  if (i == 1) {
    if (computerSequence[arraylength] == "yellow") {
      addingColour();
      return false;
    }
    computerSequence.push("yellow");
  }
  if (i == 2) {
    if (computerSequence[arraylength] == "red") {
      addingColour();
      return false;
    }
    computerSequence.push("red");
  }
  if (i == 3) {
    if (computerSequence[arraylength] == "green") {
      addingColour();
      return false;
    }
    computerSequence.push("green");
  }
}

//Main function
$(document).ready(function() {  //this is the maib function
  $(".startbutt").click(function() {
    if (clickable == true) {
    $(".startbutt").css({"box-shadow": "0px 1px 2px black", "background-color": "#5E4E47"});//changes the button colour and words... 
    $(".startbutt").html("Look!");  //...to indicate that you can't play right now
    clickable = false;
    
    stroop(); //shift colours around
    stroopChange();  //make the words appear in those colours
    addingColour();  //add a colour to the computer list
    
    
    simonSays(); //highlight the computer list in turn

    

    };
  }); 
});


//button0
$(document).ready(function() { //one of the button checks to see if you guessed right - Button 1 (top left) 
  $("#button0").click(function() {
    
    if (inputReady == true) {  //are you even allowed to guess right now?
      
      if(buttColours[0] != computerSequence[sequenceTrack]) {  //did you just guess wrong?
        $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
        $(".startbutt").html("Sorry!");
        clickable = true;
        sequenceTrack = 0;
        computerSequence = [];
        score = 0;
        inputReady = false;
        $(".score").html(score);
        
        return false;
      }
      
      if (buttColours[0] == computerSequence[sequenceTrack]) {  //did you just guess right?
        affirmation();
        
        
        if (sequenceTrack + 1 == computerSequence.length) {  //was that the last correct guess needed for a point?
          score++;
          $(".score").html(score);
          sequenceTrack = 0;
          $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
          $(".startbutt").html("Next!");
          clickable = true;
          inputReady = false;
          return false;
        }  
        sequenceTrack++;
        }
    
    }
    
   else {
     return false;
   }
  });
});
//button1
$(document).ready(function() { //one of the button checks to see if you guessed right - Button 2 (top right)
  $("#button1").click(function() {
    
    if (inputReady == true) {  //are you even allowed to guess right now?
      

      if(buttColours[1] != computerSequence[sequenceTrack]) {
        $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
        $(".startbutt").html("Sorry!");
        clickable = true;
        sequenceTrack = 0;
        computerSequence = [];
        score = 0;
        inputReady = false;
        $(".score").html(score);
        
        return false;
      }

      
      if (buttColours[1] == computerSequence[sequenceTrack]) {
        affirmation();
        
        
        if (sequenceTrack + 1 == computerSequence.length) {
          score++;
          $(".score").html(score);
          sequenceTrack = 0;
          $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
    $(".startbutt").html("Next!");
          clickable = true;
          inputReady = false;
          return false;
        }  
        sequenceTrack++;
      }      
    }
    
   else {
     return false;
   }
  });
});
//button2
$(document).ready(function() { //one of the button checks to see if you guessed right - Button 3 (bottom left)
  $("#button2").click(function() {
    
    if (inputReady == true) {  //are you even allowed to guess right now?
              

      if(buttColours[2] != computerSequence[sequenceTrack]) {
         $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
        $(".startbutt").html("Sorry!");
        clickable = true;
        sequenceTrack = 0;
        computerSequence = [];
        score = 0;
        inputReady = false;
        $(".score").html(score);
        
        return false;
      }

      
      if (buttColours[2] == computerSequence[sequenceTrack]) {
        affirmation();
        
        
        if (sequenceTrack + 1 == computerSequence.length) {
          score++;
          $(".score").html(score);
          sequenceTrack = 0;
          $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
    $(".startbutt").html("Next!");
          clickable = true;
          inputReady = false;
          return false;
        }  
        sequenceTrack++;
        }
  
    }
    
   else {
     return false;
   }
  });
});
//button3
$(document).ready(function() { //one of the button checks to see if you guessed right - Button 4 (bottom right)
  $("#button3").click(function() {
    
    if (inputReady == true) {  //are you even allowed to guess right now?
              
      if(buttColours[3] != computerSequence[sequenceTrack]) {
        $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
        $(".startbutt").html("Sorry!");
        clickable = true;
        sequenceTrack = 0;
        computerSequence = [];
        score = 0;
        inputReady = false;
        $(".score").html(score);
        
        return false;
      }
      
      
      if (buttColours[3] == computerSequence[sequenceTrack]) {
        affirmation();
        

        
        if (sequenceTrack + 1 == computerSequence.length) {
          score++;
          $(".score").html(score);
          sequenceTrack = 0;
          $(".startbutt").css({"box-shadow": "0px 3px 5px black", "background-color": "#A78A7F"});
    $(".startbutt").html("Next!");
          clickable = true;
          inputReady = false;
          return false;
        }  
        sequenceTrack++;
        }
    }
    
   else {
     return false;
   }
  });
});


