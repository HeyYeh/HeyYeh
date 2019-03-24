var songName = "",
    artistName = "",
    songInfo;




//accessing Spotify currently playing

// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token 
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '9232189db1044f8db7e22b08e4888388';
const redirectUri = 'http://ianbousher.com/fun-extras/spotify/spotify.html';
const scopes = [
  "user-read-currently-playing"
];




function getSong() {

    // Make a call using the token
    $.ajax({
        url: "https://api.spotify.com/v1/me/player/currently-playing?market=ES",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + _token);
        },
        success: function (data) {
            $(".songInfoText").empty();
            //$(".songInfoText").append(data.item.name + " - " + data.item.artists[0].name);
            $(".songInfoText").append(data.item.name + " - " + data.item.artists[0].name);
            console.log(data);
            songInfo = data;
            songName = songInfo.item.name;
            artistName = songInfo.item.artists[0].name;
        }
    });


}

getSong();


//////////////////////////////////////////////////////////////
var address = "";

function loadLyrics(site) {
    //songName = songName.split('-').join("");
    //all the song name junk
    if (site == 0) {
        songName = songName.replace(/ +/g, "");
    }
    if (site == 1) {
        songName = songName.replace(/ +/g, "-");
    }
    songName = songName.toLowerCase();
    songName = songName.split('.').join("");
    songName = songName.split('(').join("");
    songName = songName.split(')').join("");
    songName = songName.split('!').join("");
    songName = songName.split('?').join("");
    songName = songName.split("'").join("");
    songName = songName.split('"').join("");

    //all the artist name junk
    artistName = artistName.toLowerCase(); //make it lowercase
    if (site == 0) {
        if (artistName[0] === "t" && artistName[1] === "h" && artistName[2] === "e" && artistName[3] === " ") { //remove 'the'
            artistName = artistName.slice(3);
        }
    }
    //artistName = artistName.split('-').join(" "); //remove hyphen
    if (site == 0) {
        artistName = artistName.replace(/ +/g, "");
    } //no hyphens between words
    if (site == 1) {
        artistName = artistName.replace(/ +/g, "-");
    } //hyphens between words
    artistName = artistName.split('.').join(""); //remove periods
    artistName = artistName.split('(').join(""); //remove open parenthesis
    artistName = artistName.split(')').join(""); //remove close parenthesis
    artistName = artistName.split('!').join(""); //remove exclamation mark
    artistName = artistName.split('?').join(""); //remove question mark
    artistName = artistName.split("'").join(""); //remove apostrophe
    artistName = artistName.split('"').join(""); //remove quotation mark


    if (site == 0) {
        address = "https://www.azlyrics.com/lyrics/" + artistName + "/" + songName + ".html";
    }
    if (site == 1) {
        address = "https://www.musixmatch.com/lyrics/" + artistName + "/" + songName;
    }
    console.log(address);
    console.log(songName);
    console.log(artistName);

    $(".frame").prop('src', address);

}

$(document).ready(function () {

    //Getting those lyrics
    $(".testButt").click(function () {

        loadLyrics(0);

    });

    //Getting those lyrics
    $(".musixButt").click(function () {
        console.log("wut " + address);
        loadLyrics(1);


    });

    $(".start").click(function () {
        
        // If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}
        
        
        getSong();

    });

})
