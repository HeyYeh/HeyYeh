var numberOfPosts = $(".numPosts").val(),
  subreddit = $(".subReddit").val(),
  sortingCat = $(".sortingCat").val(),
  timeframe = $(".timeframe").val();

$("#titlesButt").click(function() {
  //this is the titles button click
  numberOfPosts = $(".numPosts").val();
  subreddit = $(".subReddit").val();
  sortingCat = $(".sortingCat").val();
  timeframe = $(".timeframe").val();

  $(".content").html("Hello there<br><br>"); //default if failure

  //put URL together based on url
  var redditURL =
    "https://www.reddit.com/r/" +
    subreddit +
    "/" +
    sortingCat +
    "/.json?limit=1000&t=" +
    timeframe;

  //get the data
  $.ajax({
    url: redditURL,
    beforeSend: function(xhr) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
  }).done(function(data) {
    let reddit = JSON.parse(data),
      endDiv = "",
      url = "",
      lengthOfData = numberOfPosts;

    for (var i = 0; i < lengthOfData; i++) {
      //build url
      url = reddit.data.children[i].data.url;

        var myFrame = $(".frame").contents().find('body');
        var textareaValue = $("textarea").val();
        myFrame.append(reddit.data.children[i].data.title + "<br><br>");
    }
  });
}); //end fetch click

$("#contentButt").click(function() {
  numberOfPosts = $(".numPosts").val();
  subreddit = $(".subReddit").val();
  sortingCat = $(".sortingCat").val();
  timeframe = $(".timeframe").val();

  //put URL together based on url
  var redditURL =
    "https://www.reddit.com/r/" +
    subreddit +
    "/" +
    sortingCat +
    "/.json?limit=1000&t=" +
    timeframe;

  //get the data
  $.ajax({
    url: redditURL,
    beforeSend: function(xhr) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
  }).done(function(data) {
    let reddit = JSON.parse(data),
      endDiv = "",
      url = "",
      lengthOfData = numberOfPosts;

    for (var i = 0; i < lengthOfData; i++) {
      //build url
      url = reddit.data.children[i].data.url;

        var myFrame = $(".frame").contents().find('body');
        var textareaValue = $("textarea").val();
        myFrame.append(
        reddit.data.children[i].data.selftext + "<br><br>***<br><br"
      );
    }
  });
}); //end cont click


//This function selects and copies your entire output to the clipboard
//$("#copyContentButt").click(function() {
//  window.getSelection().selectAllChildren( document.getElementById( "frame" ) );
  //  document.execCommand("Copy");
  //})

$("#copyContentButt").click(function() {
    var frameCont = document.getElementById( "frame" ).contentDocument;
    frameCont.execCommand('selectAll'); // execute select command
    frameCont.execCommand("Copy");
  })

