var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' } );
});

router.get('/exercise', function(req, res, next) {
  res.render('exercise', { title: 'Exercise' });
});

router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'settings' });
});

router.get('/calibration', function(req, res, next) {
  res.render('calibration', { title: 'calibration' });
});

module.exports = router;