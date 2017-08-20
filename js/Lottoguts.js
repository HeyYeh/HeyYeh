//initialise variables
var userNumb = [1, 2, 3, 4, 5, 6];
var winners = [0, 0, 0, 0, 0, 0];
var autGo = false;
var winLevel = 0;
var freebie = 0;
var cash = 10;
var gains = 0;
var years = 0;
var week = 0;
var bad = 0;

//Function used in repetition
function repeatWow() {
  //Reset winLevel on each click
  winLevel = 0;
  // reset bad before checking inputs again
  bad = 0;

  //get user input into an array
  $(".Pick").each(function(input, value) {
    userNumb[input] = $(this).val();
  });

  //Make sure user inputs are okay
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 6; j++) {
      if (i !== j) {
        if (userNumb[i] === userNumb[j]) {
          bad = bad + 1;
          $("#puck" + i).css({
            "outline": "none",
            "border-color": "red",
            "box-shadow": "0 0 10px red"
          });
        }
        if (userNumb[i] > 59 || userNumb[i] < 1) {
          bad = bad + 1;
          $("#puck" + i).css({
            "outline": "none",
            "border-color": "red",
            "box-shadow": "0 0 10px red"
          });
        }
      }
    }
    if (i === 5 && bad > 1) {
      return;
    }
    if (bad === 0) {
      $("#puck" + i).removeAttr("style");
    }
  }

  //Take money away UNLESS player won a freebie (2 match)
  if (freebie === 0) {
    cash = cash - 2;
    $(".money").html("£" + cash);
  } else {
    freebie = 0;
  }

  //Progress 1 week
  if (week != 52) {
    week = week + 1;
    if (years === 0) {
      $(".week").html("Week: " + week);
    } else {
      $(".week").html("Year: " + years + " " + "Week: " + week);
    }
  }

  if (week == 52) {
    years = years + 1;
    week = 0;
    $(".week").html("Year: " + years + " " + "Week: " + week);
  }

  //generate the random numbers
  for (i = 0; i < 6; i++) {
    winners[i] = Math.floor(Math.random() * 58 + 1);

    winners = winners.filter(function(item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
  }

  while (winners.length < 6) {
    winners.push(Math.floor(Math.random() * 58 + 1));

    winners = winners.filter(function(item, index, inputArray) {
      return inputArray.indexOf(item) === index;
    });
  }

  //sorting winners
  winners.sort(function(a, b) {
    return a - b;
  });

  //write winners to boxes
  for (j = 0; j < 6; j++) {
    document.getElementById("CompLotto" + String([j])).innerHTML = winners[j];
  }

  //trying to test user input array (not working)
  //$("#test").html(userNumb);

  //comparing the arrays WIP
  $(winners).each(function(i, value) {
    $(userNumb).each(function(k, value) {
      if (String(winners[i]) === String(userNumb[k])) {
        winLevel = winLevel + 1;
      }
    });
  });
  $("#test").html(winLevel);
  //outputs number based on how many matching numbers

  if (winLevel === 2) {
    freebie = 1;
  }
  if (winLevel === 3) {
    //cash = cash + 25;
    //$(".money").html("£" + cash);
    gains = gains + 25;
    $(".Winnings").html("£" + gains);
  }
  if (winLevel === 4) {
    //cash = cash + 75;
    //$(".money").html("£" + cash);
    gains = gains + 75;
    $(".Winnings").html("£" + gains);
  }
  if (winLevel === 5) {
    //cash = cash + 1500;
    //$(".money").html("£" + cash);
    gains = gains + 1500;
    $(".Winnings").html("£" + gains);
  }
  if (winLevel === 6) {
    //cash = cash + 15000000;
    //$(".money").html("£" + cash);
    gains = gains + 15000000;
    $(".Winnings").html("£" + gains);
  }
}

//-------------------------------------------//

//when Lotto is clicked, do the thing
$(document).ready(function() {
  $(".Gen").click(function() {
    repeatWow();
  });
});

//------------------------------------------------//

//Auto functions
$(document).ready(function() {
  $(".Aut").click(function() {
    //if auto mode is off
    if (autGo === false) {
      autGo = true;
      KillMe = setInterval(repeatWow, 300);
      $(".Aut").css("background-color", "olivedrab");
      return;
    }

    //if auto mode is on
    if (autGo === true) {
      autGo = false;
      $(".Aut").css("background-color", "burlywood");
      clearInterval(KillMe);
      return;
    }
  });
});

//Reset dynamic css (e.g. error highlighting)
$(document).ready(function() {
  $("#puck0").click(function() {
    $("#puck0").removeAttr("style");
  });
});

$(document).ready(function() {
  $("#puck1").click(function() {
    $("#puck1").removeAttr("style");
  });
});

$(document).ready(function() {
  $("#puck2").click(function() {
    $("#puck2").removeAttr("style");
  });
});

$(document).ready(function() {
  $("#puck3").click(function() {
    $("#puck3").removeAttr("style");
  });
});

$(document).ready(function() {
  $("#puck4").click(function() {
    $("#puck4").removeAttr("style");
  });
});

$(document).ready(function() {
  $("#puck5").click(function() {
    $("#puck5").removeAttr("style");
  });
});