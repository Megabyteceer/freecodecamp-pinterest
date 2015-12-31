'use strict';

var Pet = require('../models/pet.js');

function PetsHandler() {

	this.getPets = function (req, res) {};

	this.postPet = function (req, res) {}
	/*
 var PetId = req.body.id.replace('/','').replace('?','');
 		var options = {
 		  hostname: 'www.googleapis.com',
 		  port: 443,
 		  path: '/Pets/v1/volumes/'+PetId+'?fields=volumeInfo/title,volumeInfo/imageLinks/thumbnail,volumeInfo/authors&key='+apiKey,
 		  method: 'GET'
 		};
 		var reqs = https.request(options, function(r) {
 		
 		  var data = '';
 			
 		  r.on('data', function(d) {
 		    data+= d;
 		  });
 		  
 		  r.on('end', function() {
 		    
 		    data = JSON.parse(data);
 		   
 		   var Pet = new Pet();
 		   
 		   Pet.title  = data.volumeInfo.title;
 		   Pet.userId  = req.user.id;
 		   if(data.volumeInfo.authors){
 			 Pet.author = data.volumeInfo.authors.join(',');
 		   } 
 		   if (data.volumeInfo.imageLinks) {
 			 Pet.imgUrl = data.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://');
 		   }
 		   
 		   Pet.save();
 			   res.end();
 
 		    
 		  });
 		  
 		});
 		
 		reqs.end();
 		
 		reqs.on('error', function(e) {
 		  throw e;
 		});	*/

	/*
 
 this.borrowPet = function(req, res){
 	Pet.findOne({'_id':req.params.id}).
 	  exec(function(err, Pet){
 	  	if(err)	{
 	 		res.end(err)
 	  	} else {
 	  		if(Pet.borrowUserId){
 	  			res.end('Pet already borrowed.');
 	  		}
 	  		
 			Pet.borrowUserId = req.user.id;
 			Pet.borrowUserName = req.user.displayName;
 			Pet.borrowApproved = false;
 			Pet.save();
 			res.end();
 		}
 	  });
 }
 
 this.returnPet = function(req, res){
 	Pet.findOne({'_id':req.params.id}).
 	  exec(function(err, Pet){
 	  	if(err)	{
 	 		res.end(err)
 	  	} else {
 	  		if(Pet.borrowUserId != req.user.id){
 	  			res.end('You not borrowed this Pet.');
 	  		} else {
 	  		
 				Pet.borrowUserId = null;
 				Pet.borrowUserName = null;
 				Pet.borrowApproved = false;
 				Pet.save();
 				res.end();
 	  		}
 		}
 	  });
 }
 
 this.refusePet = function(req, res){
 	Pet.findOne({'_id':req.params.id}).
 	  exec(function(err, Pet){
 	  	if(err)	{
 	 		res.end(err)
 	  	} else {
 	  		if(Pet.userId != req.user.id){
 	  			res.end('Access denied.');
 	  		} else {
 	  		
 				Pet.borrowUserId = null;
 				Pet.borrowUserName = null;
 				Pet.borrowApproved = false;
 				Pet.save();
 				res.end();
 	  		}
 		}
 	  });
 }
 
 
 this.approvePet = function(req, res){
 	Pet.findOne({'_id':req.params.id}).
 	  exec(function(err, Pet){
 	  	if(err)	{
 	 		res.end(err)
 	  	} else {
 	  		if(Pet.userId != req.user.id){
 	  			res.end('Access denied.');
 	  		} else {
 				Pet.borrowApproved = true;
 				Pet.save();
 				res.end();
 	  		}
 		}
 	  });
 }
 
 
 
 
 
 this.deletePet = function(req, res) {
 	
 	
 	Pet.findOne({'_id':req.params.id, 'userId':req.user.id}).
 			  exec(function(err, Pet){
 			  	if(err)	{
 			  		res.end(err)
 			  	} else {
 		  			Pet.remove();
 		  			res.end();
 			  	}
 			  });
 	
 	
 }
 
 */

	;
}

module.exports = PetsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBldHNIYW5kbGVyLnNlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0FBR3RDLFNBQVMsV0FBVyxHQUFJOztBQUt2QixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUlsQyxDQUFDOztBQUlGLEtBQUksQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnRGhDLEVBQUE7Q0F1R0Y7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMiLCJmaWxlIjoicGV0c0hhbmRsZXIuc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGV0ID0gcmVxdWlyZSgnLi4vbW9kZWxzL3BldC5qcycpO1xuXG5cbmZ1bmN0aW9uIFBldHNIYW5kbGVyICgpIHtcblx0XG5cdFxuXHRcblx0XG5cdHRoaXMuZ2V0UGV0cyA9IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXHRcblxuXHRcdFxuXHR9O1xuXHRcblx0XG5cdFxuXHR0aGlzLnBvc3RQZXQgPSBmdW5jdGlvbihyZXEsIHJlcykge1xuXHRcdC8qXG5cdFx0dmFyIFBldElkID0gcmVxLmJvZHkuaWQucmVwbGFjZSgnLycsJycpLnJlcGxhY2UoJz8nLCcnKTtcblxuXHRcdFx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0XHRcdCAgaG9zdG5hbWU6ICd3d3cuZ29vZ2xlYXBpcy5jb20nLFxuXHRcdFx0XHQgIHBvcnQ6IDQ0Myxcblx0XHRcdFx0ICBwYXRoOiAnL1BldHMvdjEvdm9sdW1lcy8nK1BldElkKyc/ZmllbGRzPXZvbHVtZUluZm8vdGl0bGUsdm9sdW1lSW5mby9pbWFnZUxpbmtzL3RodW1ibmFpbCx2b2x1bWVJbmZvL2F1dGhvcnMma2V5PScrYXBpS2V5LFxuXHRcdFx0XHQgIG1ldGhvZDogJ0dFVCdcblx0XHRcdFx0fTtcblx0XHRcdFx0dmFyIHJlcXMgPSBodHRwcy5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHIpIHtcblx0XHRcdFx0XG5cdFx0XHRcdCAgdmFyIGRhdGEgPSAnJztcblx0XHRcdFx0XHRcblx0XHRcdFx0ICByLm9uKCdkYXRhJywgZnVuY3Rpb24oZCkge1xuXHRcdFx0XHQgICAgZGF0YSs9IGQ7XG5cdFx0XHRcdCAgfSk7XG5cdFx0XHRcdCAgXG5cdFx0XHRcdCAgci5vbignZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCAgICBcblx0XHRcdFx0ICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXHRcdFx0XHQgICBcblx0XHRcdFx0ICAgdmFyIFBldCA9IG5ldyBQZXQoKTtcblx0XHRcdFx0ICAgXG5cdFx0XHRcdCAgIFBldC50aXRsZSAgPSBkYXRhLnZvbHVtZUluZm8udGl0bGU7XG5cdFx0XHRcdCAgIFBldC51c2VySWQgID0gcmVxLnVzZXIuaWQ7XG5cdFx0XHRcdCAgIGlmKGRhdGEudm9sdW1lSW5mby5hdXRob3JzKXtcblx0XHRcdFx0XHQgUGV0LmF1dGhvciA9IGRhdGEudm9sdW1lSW5mby5hdXRob3JzLmpvaW4oJywnKTtcblx0XHRcdFx0ICAgfSBcblx0XHRcdFx0ICAgaWYgKGRhdGEudm9sdW1lSW5mby5pbWFnZUxpbmtzKSB7XG5cdFx0XHRcdFx0IFBldC5pbWdVcmwgPSBkYXRhLnZvbHVtZUluZm8uaW1hZ2VMaW5rcy50aHVtYm5haWwucmVwbGFjZSgnaHR0cDovLycsICdodHRwczovLycpO1xuXHRcdFx0XHQgICB9XG5cdFx0XHRcdCAgIFxuXHRcdFx0XHQgICBQZXQuc2F2ZSgpO1xuXG5cdFx0XHRcdCAgIHJlcy5lbmQoKTtcblx0XHRcblx0XHRcdFx0ICAgIFxuXHRcdFx0XHQgIH0pO1xuXHRcdFx0XHQgIFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdHJlcXMuZW5kKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXFzLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ICB0aHJvdyBlO1xuXHRcdFx0XHR9KTtcdCovXG5cdFx0XHRcdFxuXHRcdH1cblx0XG5cdC8qXG5cdFxuXHR0aGlzLmJvcnJvd1BldCA9IGZ1bmN0aW9uKHJlcSwgcmVzKXtcblx0XHRQZXQuZmluZE9uZSh7J19pZCc6cmVxLnBhcmFtcy5pZH0pLlxuXHRcdCAgZXhlYyhmdW5jdGlvbihlcnIsIFBldCl7XG5cdFx0ICBcdGlmKGVycilcdHtcblx0XHQgXHRcdHJlcy5lbmQoZXJyKVxuXHRcdCAgXHR9IGVsc2Uge1xuXHRcdCAgXHRcdGlmKFBldC5ib3Jyb3dVc2VySWQpe1xuXHRcdCAgXHRcdFx0cmVzLmVuZCgnUGV0IGFscmVhZHkgYm9ycm93ZWQuJyk7XG5cdFx0ICBcdFx0fVxuXHRcdCAgXHRcdFxuXHRcdFx0XHRQZXQuYm9ycm93VXNlcklkID0gcmVxLnVzZXIuaWQ7XG5cdFx0XHRcdFBldC5ib3Jyb3dVc2VyTmFtZSA9IHJlcS51c2VyLmRpc3BsYXlOYW1lO1xuXHRcdFx0XHRQZXQuYm9ycm93QXBwcm92ZWQgPSBmYWxzZTtcblx0XHRcdFx0UGV0LnNhdmUoKTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0fVxuXHRcdCAgfSk7XG5cdH1cblx0XG5cdHRoaXMucmV0dXJuUGV0ID0gZnVuY3Rpb24ocmVxLCByZXMpe1xuXHRcdFBldC5maW5kT25lKHsnX2lkJzpyZXEucGFyYW1zLmlkfSkuXG5cdFx0ICBleGVjKGZ1bmN0aW9uKGVyciwgUGV0KXtcblx0XHQgIFx0aWYoZXJyKVx0e1xuXHRcdCBcdFx0cmVzLmVuZChlcnIpXG5cdFx0ICBcdH0gZWxzZSB7XG5cdFx0ICBcdFx0aWYoUGV0LmJvcnJvd1VzZXJJZCAhPSByZXEudXNlci5pZCl7XG5cdFx0ICBcdFx0XHRyZXMuZW5kKCdZb3Ugbm90IGJvcnJvd2VkIHRoaXMgUGV0LicpO1xuXHRcdCAgXHRcdH0gZWxzZSB7XG5cdFx0ICBcdFx0XG5cdFx0XHRcdFx0UGV0LmJvcnJvd1VzZXJJZCA9IG51bGw7XG5cdFx0XHRcdFx0UGV0LmJvcnJvd1VzZXJOYW1lID0gbnVsbDtcblx0XHRcdFx0XHRQZXQuYm9ycm93QXBwcm92ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRQZXQuc2F2ZSgpO1xuXHRcdFx0XHRcdHJlcy5lbmQoKTtcblx0XHQgIFx0XHR9XG5cdFx0XHR9XG5cdFx0ICB9KTtcblx0fVxuXHRcblx0dGhpcy5yZWZ1c2VQZXQgPSBmdW5jdGlvbihyZXEsIHJlcyl7XG5cdFx0UGV0LmZpbmRPbmUoeydfaWQnOnJlcS5wYXJhbXMuaWR9KS5cblx0XHQgIGV4ZWMoZnVuY3Rpb24oZXJyLCBQZXQpe1xuXHRcdCAgXHRpZihlcnIpXHR7XG5cdFx0IFx0XHRyZXMuZW5kKGVycilcblx0XHQgIFx0fSBlbHNlIHtcblx0XHQgIFx0XHRpZihQZXQudXNlcklkICE9IHJlcS51c2VyLmlkKXtcblx0XHQgIFx0XHRcdHJlcy5lbmQoJ0FjY2VzcyBkZW5pZWQuJyk7XG5cdFx0ICBcdFx0fSBlbHNlIHtcblx0XHQgIFx0XHRcblx0XHRcdFx0XHRQZXQuYm9ycm93VXNlcklkID0gbnVsbDtcblx0XHRcdFx0XHRQZXQuYm9ycm93VXNlck5hbWUgPSBudWxsO1xuXHRcdFx0XHRcdFBldC5ib3Jyb3dBcHByb3ZlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFBldC5zYXZlKCk7XG5cdFx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdCAgXHRcdH1cblx0XHRcdH1cblx0XHQgIH0pO1xuXHR9XG5cdFxuXHRcblx0dGhpcy5hcHByb3ZlUGV0ID0gZnVuY3Rpb24ocmVxLCByZXMpe1xuXHRcdFBldC5maW5kT25lKHsnX2lkJzpyZXEucGFyYW1zLmlkfSkuXG5cdFx0ICBleGVjKGZ1bmN0aW9uKGVyciwgUGV0KXtcblx0XHQgIFx0aWYoZXJyKVx0e1xuXHRcdCBcdFx0cmVzLmVuZChlcnIpXG5cdFx0ICBcdH0gZWxzZSB7XG5cdFx0ICBcdFx0aWYoUGV0LnVzZXJJZCAhPSByZXEudXNlci5pZCl7XG5cdFx0ICBcdFx0XHRyZXMuZW5kKCdBY2Nlc3MgZGVuaWVkLicpO1xuXHRcdCAgXHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0UGV0LmJvcnJvd0FwcHJvdmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRQZXQuc2F2ZSgpO1xuXHRcdFx0XHRcdHJlcy5lbmQoKTtcblx0XHQgIFx0XHR9XG5cdFx0XHR9XG5cdFx0ICB9KTtcblx0fVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHRoaXMuZGVsZXRlUGV0ID0gZnVuY3Rpb24ocmVxLCByZXMpIHtcblx0XHRcblx0XHRcblx0XHRQZXQuZmluZE9uZSh7J19pZCc6cmVxLnBhcmFtcy5pZCwgJ3VzZXJJZCc6cmVxLnVzZXIuaWR9KS5cblx0XHRcdFx0ICBleGVjKGZ1bmN0aW9uKGVyciwgUGV0KXtcblx0XHRcdFx0ICBcdGlmKGVycilcdHtcblx0XHRcdFx0ICBcdFx0cmVzLmVuZChlcnIpXG5cdFx0XHRcdCAgXHR9IGVsc2Uge1xuXHRcdFx0ICBcdFx0XHRQZXQucmVtb3ZlKCk7XG5cdFx0XHQgIFx0XHRcdHJlcy5lbmQoKTtcblx0XHRcdFx0ICBcdH1cblx0XHRcdFx0ICB9KTtcblx0XHRcblx0XHRcblx0fVxuXHRcblx0Ki9cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBldHNIYW5kbGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
