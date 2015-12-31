'use strict';

var Pet = require('../models/pet.js');
var Like = require('../models/like.js');


function PetsHandler() {




	this.getPets = function(req, res) {

		/*
	//clear all pets
	Pet.remove({}, function(err) { 
   console.log('collection removed') 
});*/

		var ret = [];

		var filter = {};

		if (req.query.filterUser) {
			filter['userId'] = req.query.filterUser;

		}


		Pet.find(filter)
			.populate('userId')
			.exec(function(err, pets) {

				if (err) throw err;

				res.json(ret.concat(pets));

			});

	};



	this.postPet = function(req, res) {

		var pet = new Pet();
		pet.imgUrl = req.body.picUrl;
		pet.title = req.body.title;
		pet.userId = req.user._id;
		pet.likes = 0;
		pet.save(function(err) {
			if (err) throw err;
			// saved!
		});
		res.end();

	}

	this.deletePet = function(req, res) {

		Pet.findOne({
				'_id': req.params.id
			})
			.populate('userId')
			.exec(function(err, pet) {
				if (err) {
					res.end(err)
				}
				else {

					if (req.user.isAdmin || (pet.userId.id === req.user.id)) {
						pet.remove();
					}
					res.end();
				}
			});
	}

	this.likePet = function(req, res) {




		Pet.findOne({
				'_id': req.params.id
			})
			.exec(function(err, pet) {
				if (err) {
					res.end(err)
				}
				else {


					Like.findOne({
						userId: req.user.id,
						petId: pet._id
					}).exec(function(err, like) {

						if (err) {
							res.end(err)
						}
						else {
							if (req.user.id) {
								if (like) {
									like.remove();
									pet.likes--;
									if (pet.likes < 0) pet.likes = 0;
								}
								else {
									pet.likes++;
									like = new Like();
									like.userId = req.user.id;
									like.petId = pet._id;
									like.save();

								}
								pet.save();
							}

							res.end('' + pet.likes)
						}
					})
				}
			});

	}






}

module.exports = PetsHandler;
