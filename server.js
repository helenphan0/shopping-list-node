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

// mocked this from add method, see above
Storage.prototype.edit = function(name, id) {
	var item = {name: name, id:'' };
	this.items.push(item);
	this.id = id;
	return item;
};

function searchId(value, arr) {
	for (var x = 0; x < arr.length; x++) {
		if (arr[x].id == value) {
			return arr[x];
		}
	}
}

function searchName(value, arr) {
	for (var x = 0; x < arr.length; x++) {
		if (arr[x].name == value) {
			return arr[x];
		}
	}
}
	
var i;

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

app.post('/items', jsonParser, function(request, response){
	if (!request.body) {
		return response.sendStatus(400);
	}
	var item = storage.add(request.body.name);
	response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
	i = request.params.id;
	var k = searchId(i, storage.items);
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

app.put('items/:id', jsonParser, function(request, response) {
	i = request.params.id;


// need to pass ID to request.body, grab edited item text


	if (storage.items[c] == undefined) {

		// pulled this from POST add
		var edit = storage.edit(request.body.name, i);
		return response.json(edit);
	}

});


// check to see if an item exists with id from url
app.get('/items/:id', jsonParser, function(request, response) {
	i = request.params.id;	
	var b = searchId(i, storage.items);
	var c = storage.items.indexOf(b);
	response.json(storage.items[c]);

});



app.listen(3333, '127.0.0.1');