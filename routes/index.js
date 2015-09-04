var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' } );
});

router.get('/exercise', function(req, res, next) {
  res.render('exercise', { title: 'Exercise' }, {layout: false});
});

module.exports = router;
