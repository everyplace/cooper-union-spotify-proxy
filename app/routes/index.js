var request = require('request'),
    SpotifyWebApi = require('spotify-web-api-node');


exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Spotify Proxy' });
};

exports.json = function(req, res, next) {
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  next();
};


exports.searchSongs = function(req, res, next) {

  console.log("app is working");

  console.log(req.params);


  // credentials are optional
  var spotifyApi = new SpotifyWebApi({
    clientId : '75efd9f6e39b44d6b13cf9cb0608e945',
    clientSecret : '72b619421dee43d280ed20b64c107ad0',
    redirectUri : 'http://localhost:5000'
  });


  spotifyApi.searchTracks(req.params.song)
    .then(function(data) {

      res.send(data.body);
      // console.log('Search by "Love"', data.body);
    }, function(err) {
      console.error(err);
    });

};


exports.daily = function(req, res, next) {
  request('http://charts.spotify.com/api/tracks/most_streamed/'+req.params.region+'/daily/' + req.params.date, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    res.send(body);

    }
  })
};
