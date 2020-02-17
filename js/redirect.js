var choking = 'https://vimeo.com/370454862/46ff204f6f',
    sweets = 'https://vimeo.com/370454923/c04a8252af',
    portrait = 'https://vimeo.com/369949073/70d4b5443f?fbclid=IwAR2buw3kgAED_YXEq8m3-eoMZ-7qZHvnp-XYQG_gjCkXJjXpHf8NqsB0L4o',
    jenga = 'https://vimeo.com/369948808/eb81384c5d?fbclid=IwAR1aS5tg0GFYjjvih9ZBO053fEjnOj2F6vPNBvVIMs8FwrjYLHCIutMgi14';

var videos = [
        choking,
        sweets,
        portrait,
        jenga
]

var randVid;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function doTheThing() {

    randVid = videos[randomIntFromInterval(0, (videos.length - 1))];
}

doTheThing()

window.location = "./NATIONAL%20PIZZA%20DAY%20-%20February%209,%202020%20%20%20National%20Today.html";

    
