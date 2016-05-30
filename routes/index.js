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

router.get('/range_up1_get', function(req, res){//get,put,post,delete
  console.log(__dirname)
  res.sendFile(__dirname + '/sounds/range_up1.mp3');
});

router.get('/range_down1_get', function(req, res){//get,put,post,delete
  console.log(__dirname)
  res.sendFile(__dirname + '/sounds/range_down1.mp3');
});

router.get('/range_up2_get', function(req, res){//get,put,post,delete
  console.log(__dirname)
  res.sendFile(__dirname + '/sounds/range_up2.mp3');
});

router.get('/range_down2_get', function(req, res){//get,put,post,delete
  console.log(__dirname)
  res.sendFile(__dirname + '/sounds/range_up2.mp3');
});
module.exports = router;