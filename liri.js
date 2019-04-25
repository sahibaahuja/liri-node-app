require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios')
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var search = process.argv.slice(3).join(" ")
var command = process.argv[2]
var spot = function (search) {
  spotify.search({ type: 'track', query: search }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Track: " + data.tracks.items[0].name);
    console.log("Preview link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    const lineBreak = '-------------------------------------------------------'
    console.log(lineBreak)
  });
}

var concert = function () {
  axios
    .get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data[0].venue);
      console.log("Name of the venue: " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city);
      console.log("Date of the Event: " + response.data[0].datetime.slice(0, 10));
      const lineBreak = '-------------------------------------------------------'
      console.log(lineBreak)
    })

}

var movie = function () {
  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Title of the Movie: " + response.data.Title);
      console.log("Year the movie came out: " + response.data.Year);
      console.log("IMDB Rating of the movie: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating of the Movie: " + response.data.Ratings[0]);
      console.log("Country where the movie was produced: " + response.data.Country);
      console.log("Language of the Movie: " + response.data.Language);
      console.log("Plot of the Movie: " + response.data.Plot);
      console.log("Actors in the Movie: " + response.data.Actors);
      const lineBreak = '-------------------------------------------------------'
      console.log(lineBreak)
    }
  );


}

var whatItSays = function () {
  fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data);
  var dataArr = data.split(",");
  console.log(dataArr);
  spot(dataArr[1]);

})}


console.log(command)
switch (command) {
  case "concert-this":
    concert()
    break;
  case "spotify-this-song":
    spot()
    break;
  case "movie-this":
    movie()
    break;
  case "do-what-it-says":
    whatItSays()
    break;
  default:
    console.log("not a choice")
}


