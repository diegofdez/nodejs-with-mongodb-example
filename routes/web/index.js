var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e, docs) {
	res.render('userlist', {
		"userlist": docs
	});
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to add New User to database */
router.post('/adduser', function(req, res) {
	// Set DB variable
	var db = req.db;
	
	// Get form values from body
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	// Set collection
	var collection = db.get('usercollection');
	
	// Submit to the DB
	collection.insert({"username" : userName, "email" : userEmail}, function(err, doc) {
		if (err) {
			// If it failed return error
			res.send("There was a problem adding user to database");
		}
		else {
			// If it worked, set the header to user list and forward to userlist to verify insertion
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});


module.exports = router;
