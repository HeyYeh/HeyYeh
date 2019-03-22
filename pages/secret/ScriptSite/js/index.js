

function linkFun() {
  
    $('a[data-id]').click(function(link) {
      
  link.preventDefault(); //stop links going anywhere for now
      
      //data open is what you want the link to open, data close is what you want it to close
      var openedby = $(this).attr('data-open'); 
    $('[data-id="' + openedby +'"]').removeClass('disabled').addClass('enabled');

    var closedby = $(this).attr('data-close');
    $('[data-id="' + closedby +'"]').remove();

      //this kills the parents of each link, creating many Batman links
    $(this).contents().unwrap();
      
    })
}

$(document).ready(function() {
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
