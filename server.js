var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = function() {
	this.items = [];
	this.id = 0;
};

Storage.prototype.add = function(name) {
	var item = {name: name, id: this.id};
	this.items.push(item);
	this.id += 1;
	return item;
};

Storage.prototype.edit = function(item) {
	for (var i = 0; i < this.items.length; i++) {
		if ( this.items[i].id == item.id) {
			this.items[i].name = item.name;
		};
	};
	return item;
};

function searchId(value, arr) {
	for (var x = 0; x < arr.length; x++) {
		if (arr[x].id == value) {
			return arr[x];
		};
	};
};

function searchName(value, arr) {
	for (var x = 0; x < arr.length; x++) {
		if (arr[x].name == value) {
			return arr[x];
		};
	};
};
	

var storage = new Storage();
storage.add('Shovel');
storage.add('Bleach');
storage.add('Garbage bags');
storage.add('Flaming Hot Cheetos');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
	response.json(storage.items);
});

app.get('/items/:id', function(request, response) {
	i = request.params.id;
	var a = searchId(i, storage.items);
	var c = storage.items.indexOf(a);
	response.json(storage.items[c]);
});

app.post('/items', jsonParser, function(request, response){
	if (!request.body) {
		return response.sendStatus(400);
	}
	var item = storage.add(request.body.name);
	response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
	var h = request.params.id;

	// k is the object with the id value of i
	var k = searchId(h, storage.items);

	// j is the index of k object
	var j = storage.items.indexOf(k);

	console.log(k);
	console.log(j);
	if (!request.body) {
		return response.status(400).json('Error, abort');
	};

	storage.items.splice(j, 1);
	response.status(200).json(request.body);
	console.log(storage.items);
	console.log('--------');

});

app.put('/items/:id', jsonParser, function(request, response) {
	if (!request.body) {
		return response.status(400).json('Error, abort');
	};
	var edit = storage.edit(request.body);
	response.json(edit);
	
});


app.listen(3333, function(){ 	
	console.log('Server started at http://localhost:3333');
});
