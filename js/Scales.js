var result, //this is what will be randomised
  k,
  needToAnimateArpeggio = true, //if this is true, the word 'arpeggio' animates up
  scalesGo = false, //makes the initial scales disappear after a generation click
  clefButtons = 2, //this determines which clef to use, and how buttons appear
  clef = 2, //used later to change the drawn clef
  grade = 8, //grade of the player, affects the scales and options they are shown
  menutoggle = 0; //this says if the menu is open or not
  VF = Vex.Flow,  //Vex.Flow - the music writing library - pretty damn amazing
  majortoggle = true, //variable to tell us if we're showing major scales
  minorharmtoggle = true, //variable to tell us if we're showing minor harmonic scales
  minormeltoggle = true, //variable to tell us if we're showing minor melodic scales
  hintstoggle = false, //variable to tell us if we're showing hints
  keysigtoggle = true, //variable to tell us if we're showing key sigs
  notestoggle = true, //variable to tell us if we're showing the notes
  work = ""; //this variable stores the randomly chosen scale in our random chooser function, allowing us to call it elsewhere if needs be

//These are arrays containing strings for the names of scales functions. By categorising them like this here we can keep code short later by using for loops to cycle through them
var TrebleArray = ["trebleCMajor", "trebleGMajor", "trebleDMajor"],
    AltoArray = ["altoCMajor", "altoGMajor", "altoDMajor"],
    BassArray = ["bassCMajor", "bassGMajor", "bassDMajor"],
    PianoArray = ["pianoCMajor", "pianoGMajor", "pianoDMajor"];
    
//This VF stuff is so that the variables are global
// Create an SVG renderer and attach it to the DIV element
var div = document.getElementById("scalestaff");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg:
renderer.resize(900, 400); // set the width, height

// And get a drawing context:
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave at x, y, length
var stave = new VF.Stave(50, 70, 800);
var stave2 = new VF.Stave(50, 270, 800);

/*----------------------------------------------------------------------------*/
//This is going to be our monster object (heh) in which the pool of all scale and arpeggio notes live, to be sorted into a cache of active items based on settings

//still need to add sorting functions and update function, and rando function

//The King of Notes resides over all notes
//This object exists to contain all scales and arpeggios, and both live here permanently. Some are enabled or disabled based on functions further down - the enabled get put into an array and the things in this array are chosen randomly and then presented to the user after
//structure of sub notes = [clef(lowercase)] + [key(capital for note and accidentals, capital for first letter of type)]
var kingOfNotes = {
  //Home of the treble makers
  trebleCMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
  //series of if statements to give 'clef' a string, allowing us to use it in functions
  if (clefButtons == 1) {
    clef = "treble";
  }
  if (clefButtons == 2) {
    clef = "alto";
  }
  if (clefButtons == 3) {
    clef = "bass";
  }
  //add our clef
  stave.addClef(clef);
  stave2.addClef(clef);

    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

    
    var actualNotes;
  if (notestoggle == true) {
    actualNotes = [
    // A half-note C.
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["c/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ]; };
    if(notestoggle == false) {
      actualNotes = "";
    }
  //Draw the stave 1 notes
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
    
    //arpeggio notes
   var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
    // A quarter-note C.
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
      
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["c/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),

    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["c/4"], duration: "q" })
  ];}
    if(notestoggle == false) {
      actualNotes2 = "";
    }

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams.forEach(function(b) {
    b.setContext(context).draw();
                              })  }, enabled: false},
  
  trebleGMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("treble").addKeySignature("G");
    actualKeysig = stave2.addClef("treble").addKeySignature("G");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("treble");
    actualKeysig = actualKeysig = stave2.addClef("treble");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    accidental2 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental4 = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //g Major
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    accidental,
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    accidental2,
    //tip
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    accidental4,
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/3"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: false},
  
  trebleDMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("treble").addKeySignature("D");
    actualKeysig = stave2.addClef("treble").addKeySignature("D");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("treble");
    actualKeysig = actualKeysig = stave2.addClef("treble");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4,
   accidental5,
   accidental6,
   accidental7,
   accidental8;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ keys: ["c/6"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    
    accidental5 = new VF.StaveNote({ keys: ["c/6"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental6 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental7 = new VF.StaveNote({ keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental8 = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    accidental2 = new VF.StaveNote({ keys: ["c/5"], duration: "h" });
     accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental4 = new VF.StaveNote({ keys: ["c/6"], duration: "h" });
     accidental5 = new VF.StaveNote({ keys: ["c/6"], duration: "h" });
    accidental6 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental7 = new VF.StaveNote({ keys: ["c/5"], duration: "h" });
     accidental8 = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //d Major
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    accidental,
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    accidental2,
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    accidental4,
    //tip
    new VF.StaveNote({ keys: ["d/6"], duration: "q" }),
    accidental5,
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    accidental6,
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    accidental7,
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    accidental8,
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["d/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/4"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: false},
  
  //Home of best clef
  altoCMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
  //add our clef
  stave.addClef("alto");
  stave2.addClef("alto");
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
 
    var actualNotes;
  if (notestoggle == true) {
    actualNotes = [
    // A half-note C.
    new VF.StaveNote({ clef: ["alto"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/3"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ]; };
    if(notestoggle == false) {
      actualNotes = "";
    }
  //Draw the stave 1 notes
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
    
    //arpeggio notes
   var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["alto"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
      
    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["c/3"], duration: "q" })
  ];}
    if(notestoggle == false) {
      actualNotes2 = "";
    }

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams.forEach(function(b) {
    b.setContext(context).draw();
                              })  }, enabled: true},
  
  altoGMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("alto").addKeySignature("G");
    actualKeysig = stave2.addClef("alto").addKeySignature("G");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("alto");
    actualKeysig = actualKeysig = stave2.addClef("alto");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ clef: ["alto"], keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ clef: ["alto"], keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" });
    accidental2 = new VF.StaveNote({ clef: ["alto"], keys: ["f/5"], duration: "h" });
     accidental3 = new VF.StaveNote({ clef: ["alto"], keys: ["f/5"], duration: "h" });
     accidental4 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //g Major
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    accidental,
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/5"], duration: "q" }),
    accidental2,
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["g/5"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ clef: ["alto"], keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    accidental4,
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: true},
  
  altoDMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("alto").addKeySignature("D");
    actualKeysig = stave2.addClef("alto").addKeySignature("D");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("alto");
    actualKeysig = actualKeysig = stave2.addClef("alto");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4,
   accidental5,
   accidental6,
   accidental7,
   accidental8;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    
    accidental5 = new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental6 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental7 = new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental8 = new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "h" });
    accidental2 = new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "h" });
     accidental3 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" });
     accidental4 = new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "h" });
     accidental5 = new VF.StaveNote({ clef: ["alto"], keys: ["c/5"], duration: "h" });
    accidental6 = new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "h" });
     accidental7 = new VF.StaveNote({ clef: ["alto"], keys: ["c/4"], duration: "h" });
     accidental8 = new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //d Major
    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),
    accidental,
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    accidental2,
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    accidental4,
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    accidental5,
    new VF.StaveNote({ clef: ["alto"], keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/4"], duration: "q" }),
    accidental6,
    new VF.StaveNote({ clef: ["alto"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    accidental7,
    new VF.StaveNote({ clef: ["alto"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["g/3"], duration: "q" }),
    accidental8,
    new VF.StaveNote({ clef: ["alto"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["alto"], keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/4"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["alto"], keys: ["f/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["alto"], keys: ["d/3"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: true},
  
  //Home of da bass
  bassCMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
  //add our clef
  stave.addClef("bass");
  stave2.addClef("bass");
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
 
    var actualNotes;
  if (notestoggle == true) {
    actualNotes = [
    // A half-note C.
    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ]; };
    if(notestoggle == false) {
      actualNotes = "";
    }
  //Draw the stave 1 notes
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
    
    //arpeggio notes
   var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
      
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" })
  ];}
    if(notestoggle == false) {
      actualNotes2 = "";
    }

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams.forEach(function(b) {
    b.setContext(context).draw();
                              })  }, enabled: false},
  
  bassGMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("bass").addKeySignature("G");
    actualKeysig = stave2.addClef("bass").addKeySignature("G");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("bass");
    actualKeysig = actualKeysig = stave2.addClef("bass");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
    accidental2 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" });
     accidental3 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" });
     accidental4 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //g Major
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    accidental,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/4"], duration: "q" }),
    accidental2,
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    accidental4,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: false},
  
  bassDMajor: {music: function() {
    if (needToAnimateArpeggio == false) {
      $(".arptitle").animate({ top: "0px"});
    }
    needToAnimateArpeggio = true;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 400); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  stave = new VF.Stave(50, 70, 800);
  stave2 = new VF.Stave(50, 270, 800);
    
    
  var actualKeysig;
  if(keysigtoggle == true) {
    actualKeysig = stave.addClef("alto").addKeySignature("D");
    actualKeysig = stave2.addClef("alto").addKeySignature("D");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("alto");
    actualKeysig = actualKeysig = stave2.addClef("alto");
  }
  
  // Add a clef and time signature.
  actualKeysig;
    
    stave.setEndBarType(VF.Barline.type.END);
    stave2.setEndBarType(VF.Barline.type.END);
    
      // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  var accidental,
   accidental2,
   accidental3,
   accidental4,
   accidental5,
   accidental6,
   accidental7,
   accidental8;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    
    accidental5 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental6 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental7 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental8 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
   else {
    accidental = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" });
    accidental2 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" });
     accidental3 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
     accidental4 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" });
     accidental5 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" });
    accidental6 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
     accidental7 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" });
     accidental8 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //d Major
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    accidental,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    accidental2,
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    accidental4,
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    accidental5,
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    accidental6,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    accidental7,
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    accidental8,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
 // actualNotes;

  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });  
    
    //arpeggio notes
  var notes2 = [
    // A quarter-note C.
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams2 = VF.Beam.generateBeams(notes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, notes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
    
  }, enabled: false},
  
  //Home of the hybrid
  pianoCMajor: {music: function() {
    if (needToAnimateArpeggio == true) {
      $(".arptitle").animate({ top: "-130px"});
    }
    needToAnimateArpeggio = false;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 550); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  var stave = new VF.Stave(50, 70, 800);
  var stave2 = new VF.Stave(50, 160, 800);
  
  var stave3 = new VF.Stave(50, 270, 800);
  var stave4 = new VF.Stave(50, 360, 800);
  
   var actualKeysig;
  if (keysigtoggle == true) {
    actualKeysig = stave.addClef("treble").addKeySignature("C");
    actualKeysig = stave2.addClef("bass").addKeySignature("C");
    actualKeysig = stave3.addClef("treble").addKeySignature("C");
    actualKeysig = stave4.addClef("bass").addKeySignature("C");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("treble");
    actualKeysig = actualKeysig = stave2.addClef("bass");
    actualKeysig = actualKeysig = stave3.addClef("treble");
    actualKeysig = actualKeysig = stave4.addClef("bass");
  }

  // Add a clef and time signature.
  actualKeysig;
//adding an end bar
  //stave.setEndBarType(Vex.Flow.Barline.type.END);
  
  var brace = new Vex.Flow.StaveConnector(stave, stave2).setType(3); // 3 = brace
  var lineRight = new Vex.Flow.StaveConnector(stave, stave2).setType(1); // 1 = thin line
var lineLeft = new Vex.Flow.StaveConnector(stave, stave2).setType(6); //bar end
  var brace2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(3); // 3 = brace
  var lineRight2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(1); // 1 = thin line
var lineLeft2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(6); //bar end
  
  
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
  stave3.setContext(context).draw();
  stave4.setContext(context).draw();

  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  brace2.setContext(context).draw();
  lineLeft2.setContext(context).draw();
  lineRight2.setContext(context).draw();

    
   var actualNotes;
  if (notestoggle == true) {
    actualNotes = [
     new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["c/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
    ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
  // actualNotes;

  
  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });

  var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
     new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
      ]
  }
  if (notestoggle == false) {
    actualNotes2 = "";
  }
  // Create the notes
  // actualNotes;

  var beams2 = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  
  
  
   //arpeggio notes 1
  var notes3 = [
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
      
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["c/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),

    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["c/4"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams3 = VF.Beam.generateBeams(notes3);
  Vex.Flow.Formatter.FormatAndDraw(context, stave3, notes3);
  beams3.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  //arpeggio notes 2
  var notes4 = [
    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
      
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["c/2"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams4 = VF.Beam.generateBeams(notes4);
  Vex.Flow.Formatter.FormatAndDraw(context, stave4, notes4);
  beams4.forEach(function(b) {
    b.setContext(context).draw();
  }); }, enabled: false},
  
  pianoGMajor: {music: function() {
    if (needToAnimateArpeggio == true) {
      $(".arptitle").animate({ top: "-130px"});
    }
    needToAnimateArpeggio = false;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 550); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  var stave = new VF.Stave(50, 70, 800);
  var stave2 = new VF.Stave(50, 160, 800);
  
  var stave3 = new VF.Stave(50, 270, 800);
  var stave4 = new VF.Stave(50, 360, 800);
  
   var actualKeysig;
  if (keysigtoggle == true) {
    actualKeysig = stave.addClef("treble").addKeySignature("G");
    actualKeysig = stave2.addClef("bass").addKeySignature("G");
    actualKeysig = stave3.addClef("treble").addKeySignature("G");
    actualKeysig = stave4.addClef("bass").addKeySignature("G");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("treble");
    actualKeysig = actualKeysig = stave2.addClef("bass");
    actualKeysig = actualKeysig = stave3.addClef("treble");
    actualKeysig = actualKeysig = stave4.addClef("bass");
  }

  // Add a clef and time signature.
  actualKeysig;
//adding an end bar
  //stave.setEndBarType(Vex.Flow.Barline.type.END);
  
  var brace = new Vex.Flow.StaveConnector(stave, stave2).setType(3); // 3 = brace
  var lineRight = new Vex.Flow.StaveConnector(stave, stave2).setType(1); // 1 = thin line
var lineLeft = new Vex.Flow.StaveConnector(stave, stave2).setType(6); //bar end
  var brace2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(3); // 3 = brace
  var lineRight2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(1); // 1 = thin line
var lineLeft2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(6); //bar end
  
  
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
  stave3.setContext(context).draw();
  stave4.setContext(context).draw();

  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  brace2.setContext(context).draw();
  lineLeft2.setContext(context).draw();
  lineRight2.setContext(context).draw();

    
    var accidental, accidental2, accidental3, accidental4, accidental5, accidental6, accidental7, accidental8;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    
    //bass accidentals
    accidental5 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental6 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental7 = new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental8 = new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
  if (hintstoggle == false) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    accidental2 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental4 = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    
    //bass accidentals
    accidental5 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
    accidental6 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" });
     accidental7 = new VF.StaveNote({ clef: ["bass"], keys: ["f/4"], duration: "h" });
     accidental8 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes = [
      //g Major
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    accidental,
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    accidental2,
    //tip
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    accidental4,
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
    new VF.GhostNote({duration: "h"}) 
    ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
  // actualNotes;

  
  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });

  var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
     //g Major
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    accidental5,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/4"], duration: "q" }),
    accidental6,
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "q" }),
    accidental7,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    accidental8,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.GhostNote({duration: "h"}) 
      ]
  }
  if (notestoggle == false) {
    actualNotes2 = "";
  }
  // Create the notes
  // actualNotes;

  var beams2 = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  
  
  
   //arpeggio notes 1
  var notes3 = [
    new VF.StaveNote({ keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/3"], duration: "q" }),

    new VF.StaveNote({ keys: ["g/3"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams3 = VF.Beam.generateBeams(notes3);
  Vex.Flow.Formatter.FormatAndDraw(context, stave3, notes3);
  beams3.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  //arpeggio notes 2
  var notes4 = [
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams4 = VF.Beam.generateBeams(notes4);
  Vex.Flow.Formatter.FormatAndDraw(context, stave4, notes4);
  beams4.forEach(function(b) {
    b.setContext(context).draw();
  });  }, enabled: false},
  
  pianoDMajor: {music: function() {
    if (needToAnimateArpeggio == true) {
      $(".arptitle").animate({ top: "-130px"});
    }
    needToAnimateArpeggio = false;
    //empty the canvas so we can write new stuff on it
    $(".scaleobj").empty();
    //get the element ID to draw the SVG to
  div = document.getElementById("scalestaff");
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  // Size our svg:
  renderer.resize(900, 550); // set the width, height
  // And get a drawing context:
  context = renderer.getContext();
  // Create a stave at x, y, length
  var stave = new VF.Stave(50, 70, 800);
  var stave2 = new VF.Stave(50, 160, 800);
  
  var stave3 = new VF.Stave(50, 270, 800);
  var stave4 = new VF.Stave(50, 360, 800);
  
   var actualKeysig;
  if (keysigtoggle == true) {
    actualKeysig = stave.addClef("treble").addKeySignature("D");
    actualKeysig = stave2.addClef("bass").addKeySignature("D");
    actualKeysig = stave3.addClef("treble").addKeySignature("D");
    actualKeysig = stave4.addClef("bass").addKeySignature("D");
  }
  if (keysigtoggle == false) {
    actualKeysig = actualKeysig = stave.addClef("treble");
    actualKeysig = actualKeysig = stave2.addClef("bass");
    actualKeysig = actualKeysig = stave3.addClef("treble");
    actualKeysig = actualKeysig = stave4.addClef("bass");
  }

  // Add a clef and time signature.
  actualKeysig;
//adding an end bar
  //stave.setEndBarType(Vex.Flow.Barline.type.END);
  
  var brace = new Vex.Flow.StaveConnector(stave, stave2).setType(3); // 3 = brace
  var lineRight = new Vex.Flow.StaveConnector(stave, stave2).setType(1); // 1 = thin line
var lineLeft = new Vex.Flow.StaveConnector(stave, stave2).setType(6); //bar end
  var brace2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(3); // 3 = brace
  var lineRight2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(1); // 1 = thin line
var lineLeft2 = new Vex.Flow.StaveConnector(stave3, stave4).setType(6); //bar end
  
  
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
  stave3.setContext(context).draw();
  stave4.setContext(context).draw();

  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  brace2.setContext(context).draw();
  lineLeft2.setContext(context).draw();
  lineRight2.setContext(context).draw();

    
    var accidental, accidental2, accidental3, accidental4, accidental5, accidental6, accidental7, accidental8, accidental9, accidental10, accidental11, accidental12, accidental13, accidental14, accidental15, accidental16;
  if (hintstoggle == true) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental2 = new VF.StaveNote({ keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental4 = new VF.StaveNote({ keys: ["c/6"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental5 = new VF.StaveNote({ keys: ["c/6"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental6 = new VF.StaveNote({ keys: ["f/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental7 = new VF.StaveNote({ keys: ["c/5"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental8 = new VF.StaveNote({ keys: ["f/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    
    //bass accidentals
    accidental9 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental10 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental11 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental12 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental13 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#")
    );
    accidental14 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
   accidental15 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
    accidental16 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" }).addAccidental(
      0,
      new VF.Accidental("#"));
  }
  if (hintstoggle == false) {
    accidental = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    accidental2 = new VF.StaveNote({ keys: ["c/5"], duration: "h" });
     accidental3 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental4 = new VF.StaveNote({ keys: ["c/6"], duration: "h" });
    accidental5 = new VF.StaveNote({ keys: ["c/6"], duration: "h" });
    accidental6 = new VF.StaveNote({ keys: ["f/5"], duration: "h" });
     accidental7 = new VF.StaveNote({ keys: ["c/5"], duration: "h" });
     accidental8 = new VF.StaveNote({ keys: ["f/4"], duration: "h" });
    //bass accidentals
    accidental9 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" });
    accidental10 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" });
     accidental11 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
     accidental12 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" });
    accidental13 = new VF.StaveNote({ clef: ["bass"], keys: ["c/4"], duration: "h" });
    accidental14 = new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "h" });
     accidental15 = new VF.StaveNote({ clef: ["bass"], keys: ["c/3"], duration: "h" });
     accidental16 = new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "h" });
  }

  var actualNotes;
  if (notestoggle == true) {
    actualNotes =  [
    //d Major
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    accidental,
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    accidental2,
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    accidental3,
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    accidental4,
    //tip
    new VF.StaveNote({ keys: ["d/6"], duration: "q" }),
    accidental5,
    new VF.StaveNote({ keys: ["b/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/5"], duration: "q" }),
    accidental6,
    new VF.StaveNote({ keys: ["e/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    accidental7,
    new VF.StaveNote({ keys: ["b/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["g/4"], duration: "q" }),
    accidental8,
    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
  ];
  }
  if (notestoggle == false) {
    actualNotes = "";
  }
  // Create the notes
  // actualNotes;

  
  var beams = VF.Beam.generateBeams(actualNotes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, actualNotes);
  beams.forEach(function(b) {
    b.setContext(context).draw();
  });

  var actualNotes2;
  if (notestoggle == true) {
    actualNotes2 = [
     //d Major
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    accidental9,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    accidental10,
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    accidental11,
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    accidental12,
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    accidental13,
    new VF.StaveNote({ clef: ["bass"], keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/3"], duration: "q" }),
    accidental14,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    accidental15,
    new VF.StaveNote({ clef: ["bass"], keys: ["b/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["g/2"], duration: "q" }),
    accidental16,
    new VF.StaveNote({ clef: ["bass"], keys: ["e/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
      new VF.GhostNote({duration: "16"})
      ]
  }
  if (notestoggle == false) {
    actualNotes2 = "";
  }
  // Create the notes
  // actualNotes;

  var beams2 = VF.Beam.generateBeams(actualNotes2);
  Vex.Flow.Formatter.FormatAndDraw(context, stave2, actualNotes2);
  beams2.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  
  
  
   //arpeggio notes 1
  var notes3 = [
    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    //tip
    new VF.StaveNote({ keys: ["d/6"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/5"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/5"], duration: "q" }),
    new VF.StaveNote({ keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ keys: ["f/4"], duration: "q" }),

    new VF.StaveNote({ keys: ["d/4"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams3 = VF.Beam.generateBeams(notes3);
  Vex.Flow.Formatter.FormatAndDraw(context, stave3, notes3);
  beams3.forEach(function(b) {
    b.setContext(context).draw();
  });
  
  //arpeggio notes 2
  var notes4 = [
    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    //tip
    new VF.StaveNote({ clef: ["bass"], keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/3"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/3"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["a/2"], duration: "q" }),
    new VF.StaveNote({ clef: ["bass"], keys: ["f/2"], duration: "q" }),

    new VF.StaveNote({ clef: ["bass"], keys: ["d/2"], duration: "q" })
  ];

  //draw the arpeggio notes (currently temp storing beams here too)
  var beams4 = VF.Beam.generateBeams(notes4);
  Vex.Flow.Formatter.FormatAndDraw(context, stave4, notes4);
  beams4.forEach(function(b) {
    b.setContext(context).draw();
  });  }, enabled: false},
};

//The cache is where we hold all enabled scales so that the randomiser can choose an active one
var cache;
function updateCache(){ // Using function we can update it when needed.
    cache = Object.keys(kingOfNotes).filter(k=>kingOfNotes[k].enabled);
}
updateCache();

//the enable and disable functions allow us to add or take away from the cache by taking an input. Importantly, the input into these (fn) can be concantenated
function enable(fn) {
    kingOfNotes[fn].enabled = true;
    updateCache();
}
function disable(fn) {
    kingOfNotes[fn].enabled = false;
    updateCache();
}

//This function action finds one of the enabled functions in the cache and runs it, writing it to work at the same time in case we need to reference it again elsewhere before a new rando
function callRandomFn(){
  
  var stopRepeat = k;
  $(".test").html(cache);
    k = Math.floor(Math.random() * cache.length);
    if (stopRepeat == k) {
     callRandomFn();
      return false;
    }
    if (k == 0) {
       $(".resultproto").html("C Major");
         }
    if (k == 1) {
        $(".resultproto").html("G Major");
    }
    work = cache[k];
    kingOfNotes[work].music();
}

/*----------------------------------------------------------------------------------------*/
//GetScale randomises result and writes to test for debugging
function getScale() {
  var stopRepeat; //The previous result is stored then compared to the new one...
  stopRepeat = result; //if they're the same, we run this function again
  result = Math.floor(Math.random() * 2);
  if (stopRepeat == result) {
    getScale();
    return false;
  }
}
//This assigns the number in result to an actual scale
function assignScale() {
  if (result == 0) {
    $(".resultproto").html("C Major");
  }
  if (result == 1) {
    $(".resultproto").html("G Major");
  }
}

  //kingOfNotes["pianoDMajor"].music();
//this changes the appearance of the staff based on a few details
function staffDetail() {
  
  /*//activate the function to draw notes here based on clef and key
    if (result == 0) {
    kingOfNotes["trebleCMajor"].music();
  }
  if (result == 1) {
    kingOfNotes["trebleGMajor"].music();
  }*/

  callRandomFn();

  //series of if statements; if the clef isn't what it should be, run the function again
  /*if (clefButtons == 1 && clef !== "treble") {
    staffDetail();
  }
  if (clefButtons == 2 && clef !== "alto") {
    staffDetail();
  }
  if (clefButtons == 3 && clef !== "bass") {
    staffDetail();
  }*/
}

//this document ready is where we do stuff with the clefs
$(document).ready(function() {
  // Draw some empty staffs
  stave.setContext(context).draw();
  stave2.setContext(context).draw();
  //staffDetail();

  $(".randomiseButt").click(function() {
    getScale();
    //assignScale();
    staffDetail();
  });
});

//this stuff affect the options menu that slides out at the side of the screen
$(".menutoggle").click(function() {
  if (menutoggle == 0) {
    $(".optionscont").animate({ right: "0px" }, 500, "linear");
    $(".optionscont").addClass("menushadow");
    $(".menutoggle").animate({ right: "270px" }, 500, "linear");
    menutoggle = 1;
    return false;
  }
  if (menutoggle == 1) {
    $(".optionscont").animate({ right: "-270px" }, 500, "linear", function() {
      $(".optionscont").removeClass("menushadow");
    });

    $(".menutoggle").animate({ right: "0px" }, 500, "linear");
    menutoggle = 0;
  }
});

//This document ready bit purely contains menu click triggers to make it easy to collapse and hide - Tucking it under the rug, essentially
$(document).ready(function() {
  //When you click on a clef option, make it active, make the others inactive, and set the clef variable to the right number for it to be converted to string later, then change the staff
  $("#clef1").click(function() {
    if (clefButtons == 1) {
      return false;
    } else {
      if (clefButtons == 2) {
        $("#clef2").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 3) {
        $("#clef3").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 4) {
        $("#clef4").removeClass("buttonactive").addClass("buttoninactive");
      }
      $("#clef1").removeClass("buttoninactive").addClass("buttonactive");
      clefButtons = 1;
      $.each(AltoArray, function(index, value){ disable(value); })
      $.each(BassArray, function(index, value){ disable(value); })
      $.each(PianoArray, function(index, value){ disable(value); })
      $.each(TrebleArray, function(index, value){ enable(value); })
      $(".test").html(cache);
    }
  });

  $("#clef2").click(function() {
    if (clefButtons == 2) {
      return false;
    } else {
      if (clefButtons == 1) {
        $("#clef1").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 3) {
        $("#clef3").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 4) {
        $("#clef4").removeClass("buttonactive").addClass("buttoninactive");
      }
      $("#clef2").removeClass("buttoninactive").addClass("buttonactive");
      clefButtons = 2;
      $.each(TrebleArray, function(index, value){ disable(value); })
      $.each(BassArray, function(index, value){ disable(value); })
      $.each(PianoArray, function(index, value){ disable(value); })
      $.each(AltoArray, function(index, value){ enable(value); })
      $(".test").html(cache);
    }
  });

  $("#clef3").click(function() {
    if (clefButtons == 3) {
      return false;
    } else {
      if (clefButtons == 1) {
        $("#clef1").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 2) {
        $("#clef2").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 4) {
        $("#clef4").removeClass("buttonactive").addClass("buttoninactive");
      }
      $("#clef3").removeClass("buttoninactive").addClass("buttonactive");
      clefButtons = 3;
    }
    $.each(TrebleArray, function(index, value){ disable(value); })
    $.each(AltoArray, function(index, value){ disable(value); })
    $.each(PianoArray, function(index, value){ disable(value); })
    $.each(BassArray, function(index, value){ enable(value); })
    $(".test").html(cache);
  });
  
  $("#clef4").click(function() {
    if (clefButtons == 4) {
      return false;
    } else {
      if (clefButtons == 1) {
        $("#clef1").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 2) {
        $("#clef2").removeClass("buttonactive").addClass("buttoninactive");
      }
      if (clefButtons == 3) {
        $("#clef3").removeClass("buttonactive").addClass("buttoninactive");
      }
      $("#clef4").removeClass("buttoninactive").addClass("buttonactive");
      clefButtons = 4;
    }
    $.each(TrebleArray, function(index, value){ disable(value); })
    $.each(AltoArray, function(index, value){ disable(value); })
    $.each(BassArray, function(index, value){ disable(value); })
    $.each(PianoArray, function(index, value){ enable(value); })
    $(".test").html(cache);
  });
  
  
  //same for the above except for the grade options, but we also shift some things around at the same time
  $("#grade1").click(function() {
    if (grade == 1) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade1").removeClass("buttoninactive").addClass("buttonactive");
    
    if (grade >= 5) {
      $(".advminor").hide(800, "swing",);
      
      $(".minortit").animate({width: "75px"}, function(){
          $(".simpleminor").css("display", "inline-block");
        });
     $(".minortit").html("Minor");
    }
    
    minormeltoggle = false;
    grade = 1;
  });

  $("#grade2").click(function() {
    if (grade == 2) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade2").removeClass("buttoninactive").addClass("buttonactive");

    if (grade >= 5) {
      $(".advminor").hide(800, "swing",);
      
      $(".minortit").animate({width: "75px"}, function(){
          $(".simpleminor").css("display", "inline-block");
        });
     $(".minortit").html("Minor");
    }
    
    minormeltoggle = false;
    grade = 2;
  });

  $("#grade3").click(function() {
    if (grade == 3) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade3").removeClass("buttoninactive").addClass("buttonactive");

    if (grade >= 5) {
      $(".advminor").hide(800, "swing",);
      
      $(".minortit").animate({width: "75px"}, function(){
          $(".simpleminor").css("display", "inline-block");
        });
     $(".minortit").html("Minor");
    }
    
    minormeltoggle = false;
    grade = 3;
  });

  $("#grade4").click(function() {
    if (grade == 4) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade4").removeClass("buttoninactive").addClass("buttonactive");

    if (grade >= 5) {
      $(".advminor").hide(800, "swing",);
      
      $(".minortit").animate({width: "75px"}, function(){
          $(".simpleminor").css("display", "inline-block");
        });
     $(".minortit").html("Minor");
    }
    
    minormeltoggle = false;
    grade = 4;
  });

  $("#grade5").click(function() {
    if (grade == 5) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade5").removeClass("buttoninactive").addClass("buttonactive");

    if (grade > 5) {
      $(".advminor").hide(800, "swing",);
      
      $(".minortit").animate({width: "75px"}, function(){
          $(".simpleminor").css("display", "inline-block");
        });
     $(".minortit").html("Minor");
    }
    
    minormeltoggle = false;
    grade = 5;
  });

  $("#grade6").click(function() {
    if (grade == 6) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade6").removeClass("buttoninactive").addClass("buttonactive");

    if (grade < 6) {
      $(".advminor").show(600, "swing");
      
      $(".minortit").animate({width: "110px"}, function(){
          $(".simpleminor").css("display", "none");
        });
     $(".minortit").html("Minors");
    }
    
    minormeltoggle = true;
    grade = 6;
  });

  $("#grade7").click(function() {
    if (grade == 7) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade7").removeClass("buttoninactive").addClass("buttonactive");

    if (grade < 5) {
      $(".advminor").show(600, "swing");
      
      $(".minortit").animate({width: "110px"}, function(){
          $(".simpleminor").css("display", "none");
        });
     $(".minortit").html("Minors");
    }
    
    minormeltoggle = true;
    grade = 7;
  });

  $("#grade8").click(function() {
    if (grade == 8) {
      return false;
    }
    var iterator = [1, 2, 3, 4, 5, 6, 7, 8]; //variable to iterate through each grade button

    $.each(iterator, function(index, value) {
      $("#grade" + value)
        .removeClass("buttonactive")
        .addClass("buttoninactive");
    });

    $("#grade8").removeClass("buttoninactive").addClass("buttonactive");

    if (grade < 5) {
      $(".advminor").show(600, "swing");
      
      $(".minortit").animate({width: "110px"}, function(){
          $(".simpleminor").css("display", "none");
        });
     $(".minortit").html("Minors");
    }
    
    minormeltoggle = true;
    grade = 8;
  });
  
  //toggles for the major on/off
  $(".majorON").click(function() {
    if (majortoggle == true) {
      return false;
    }
    if (majortoggle == false) {
      $(".majorOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".majorON").removeClass("buttoninactive").addClass("buttonactive");
      majortoggle = true;
    }
  })
  
  $(".majorOFF").click(function() {
    if (majortoggle == false) {
      return false;
    }
    if (majortoggle == true) {
      $(".majorON").removeClass("buttonactive").addClass("buttoninactive");
      $(".majorOFF").removeClass("buttoninactive").addClass("buttonactive");
      majortoggle = false;
    }
  })
  
    //toggles for the minor harm on/off
  $(".minorharmON").click(function() {
    if (minorharmtoggle == true) {
      return false;
    }
    if (minorharmtoggle == false) {
      $(".minorharmOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".minorharmON").removeClass("buttoninactive").addClass("buttonactive");
      minorharmtoggle = true;
    }
  })
  
  $(".minorharmOFF").click(function() {
    if (minorharmtoggle == false) {
      return false;
    }
    if (minorharmtoggle == true) {
      $(".minorharmON").removeClass("buttonactive").addClass("buttoninactive");
      $(".minorharmOFF").removeClass("buttoninactive").addClass("buttonactive");
      minorharmtoggle = false;
    }
  })
  
    //toggles for the minor melodic on/off
  $(".minormelON").click(function() {
    if (minormeltoggle == true) {
      return false;
    }
    if (minormeltoggle == false) {
      $(".minormelOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".minormelON").removeClass("buttoninactive").addClass("buttonactive");
      minormeltoggle = true;
    }
  })
  
  $(".minormelOFF").click(function() {
    if (minormeltoggle == false) {
      return false;
    }
    if (minormeltoggle == true) {
      $(".minormelON").removeClass("buttonactive").addClass("buttoninactive");
      $(".minormelOFF").removeClass("buttoninactive").addClass("buttonactive");
      minormeltoggle = false;
    }
  })
  
   //toggles for the hints (accidentals on notes)
  $(".hintsON").click(function() {
    if (hintstoggle == true) {
      return false;
    }
    if (hintstoggle == false) {
      $(".hintsOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".hintsON").removeClass("buttoninactive").addClass("buttonactive");
      hintstoggle = true;
    }
  })
  
  $(".hintsOFF").click(function() {
    if (hintstoggle == false) {
      return false;
    }
    if (hintstoggle == true) {
      $(".hintsON").removeClass("buttonactive").addClass("buttoninactive");
      $(".hintsOFF").removeClass("buttoninactive").addClass("buttonactive");
      hintstoggle = false;
    }
  })
  
     //toggles for the key sig
  $(".keysigON").click(function() {
    if (keysigtoggle == true) {
      return false;
    }
    if (keysigtoggle == false) {
      $(".keysigOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".keysigON").removeClass("buttoninactive").addClass("buttonactive");
      keysigtoggle = true;
    }
  })
  
  $(".keysigOFF").click(function() {
    if (keysigtoggle == false) {
      return false;
    }
    if (keysigtoggle == true) {
      $(".keysigON").removeClass("buttonactive").addClass("buttoninactive");
      $(".keysigOFF").removeClass("buttoninactive").addClass("buttonactive");
      keysigtoggle = false;
    }
  })
  
     //toggles for the notes themselves
  $(".notesON").click(function() {
    if (notestoggle == true) {
      return false;
    }
    if (notestoggle == false) {
      $(".notesOFF").removeClass("buttonactive").addClass("buttoninactive");
      $(".notesON").removeClass("buttoninactive").addClass("buttonactive");
      notestoggle = true;
    }
  })
  
  $(".notesOFF").click(function() {
    if (notestoggle == false) {
      return false;
    }
    if (notestoggle == true) {
      $(".notesON").removeClass("buttonactive").addClass("buttoninactive");
      $(".notesOFF").removeClass("buttoninactive").addClass("buttonactive");
      notestoggle = false;
    }
  })
  
});