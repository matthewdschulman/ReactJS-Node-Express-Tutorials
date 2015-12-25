var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	console.log("Cookies: ", req.cookies);	
	res.send("Hello World");
});

// Responds with "Hello World!" on the homepage
app.get('/index.htm', function (req, res) {
	res.sendFile( __dirname + "/" + "index.htm" );
});

app.post('/file_upload', upload.single('file'), function (req, res, next) {
	console.log(req.file.originalname);
	console.log(req.file.path);

	var file = __dirname + "/" + req.file.originalname;
	fs.readFile(req.file.path, function(err, data) {
		fs.writeFile(file, data, function(err) {
			if (err) { console.log(err); } else {
				response = {
					message:'File uploaded successfully',
					filename:req.file.originalname
				};
			}		
			console.log(response);
			res.redirect('/index.htm');
			res.end(JSON.stringify(response));
		});	
	});
});

var server = app.listen(3000, 'localhost', function () {
	var host = server.address().address;
	var port = server.address().port;

 	console.log('Example app listening at http://%s:%s', host, port);
});
