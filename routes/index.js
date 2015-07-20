var express = require('express')
var router = express.Router()
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  if(req.isAuthenticated()) {
    console.log(req.user.token)
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        //console.log(response);
        console.log(response.body)
        res.render('index', { profile: response.body });
      })
  } else {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router
