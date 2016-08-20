var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done) {
    	chai.request(app)
    		.get('/items')
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Shovel');
                res.body[1].name.should.equal('Bleach');
                res.body[2].name.should.equal('Garbage bags');
                res.body[3].name.should.equal('Flaming Hot Cheetos');
    			done();
    		});
    });

    it('should add an item on post', function(done) {
    	chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(5);
                storage.items[4].should.be.a('object');
                storage.items[4].should.have.property('id');
                storage.items[4].should.have.property('name');
                storage.items[4].id.should.be.a('number');
                storage.items[4].name.should.be.a('string');
                storage.items[4].name.should.equal('Kale');
                console.log(storage.items);
                done();
            });
    });

    	it('Post to an ID that exists');
    	it('Post without any body daya');
    	it('Post with something other than valid JSON');


    it('should edit an item on put', function(done) {
    	chai.request(app)
    		.put('/items/id')
    		.send({'name': 'Bucket', 'id': 0})
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('object');
    			res.body.should.have.property('name');
    			res.body.should.have.property('id');
    			res.body.id.should.be.a('number');
    			res.body.name.should.be.a('string');
    			res.body.name.should.equal('Bucket');
    			res.body.id.should.equal(0);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(5);
    			storage.items[0].should.be.a('object');
    			storage.items[0].should.have.property('name');
    			storage.items[0].should.have.property('id');
    			storage.items[0].id.should.be.a('number');
    			storage.items[0].name.should.be.a('string');
    			storage.items[0].name.should.equal('Bucket');
    			storage.items[0].id.should.equal(0);
    			done();
    		});
	});


    it('Put without an ID in the endpoint');
    it('Put with a difference ID in the endpoint from body');
    



    it('Put without body data', function(done) {
    	chai.request(app)
    		.put('/items/id')
    		.send({'name': 'PutTest2', 'id': 2})
    		.end(function(err,res) {
    			res.body.should.have.property('name');
    			res.body.name.should.be.a('string').with.length.above(1);
    			res.body.should.have.property('id');
    			res.body.id.should.be.a('number').above(0);
    			res.should.have.status(200);
    			done();
    		})
    });
    	
    it('Put something other than valid JSON', function(done) {
    	chai.request(app)
    		.put('/items/id')
    		.send({'name': 'PutTest3', 'id': 3})
    		.end(function(err, res) {
    			res.body.should.have.property('name');
    			res.body.name.should.be.a('string');
    			res.body.name.should.not.be.a('number');
      			res.should.have.status(200);
    			done();
    		});
    });

    it('should delete an item on delete', function(done) {
    	chai.request(app)
 			.delete('/items/id')
 			.send({'name': 'Bucket', 'id': 0})
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('object');
    			res.body.should.have.property('name');
    			res.body.should.have.property('id');
    			res.body.name.should.be.a('string');
    			res.body.id.should.be.a('number');
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(4);
    			storage.items[0].should.be.a('object');
    			storage.items[0].should.have.property('name');
    			storage.items[0].should.have.property('id');
    			storage.items[0].name.should.be.a('string');
    			storage.items[0].id.should.be.a('number');
    			console.log(storage.items);
    			done();
    		});
    });




    	it('Delete an ID that does not exist');
    	it('Delete without an ID in the endpoint');
});