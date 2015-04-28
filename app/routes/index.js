var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Stars Proxy' });
};

exports.json = function(req, res, next) {
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  next();
};


exports.stars = function(req, res, next) {

  request('http://star-api.herokuapp.com/api/v1/stars', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.send(body);

    }
  })

};
