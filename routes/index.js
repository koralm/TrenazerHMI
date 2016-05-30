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

router.get('/save', function(req, res, next) {
  res.render('save', { title: 'save' });
});

router.get('/dupa', function(req, res){//get,put,post,delete
  console.log(__dirname)
  res.sendFile(__dirname + '/range_up1.mp3');
});

module.exports = router;