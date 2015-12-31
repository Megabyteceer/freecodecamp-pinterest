'use strict';

(function () {

   angular.module('megabyte.funny-pets')

     .controller('UserController', function($http, $rootScope) {
         
       var user = this;
       
       
       user.loginLink = '/login';
       $http.get('/auth/lastLoggedFrom').then(function(res){
        if(res.data.provider){
            user.loginLink = '/auth/'+res.data.provider;
        }
       });

       
       $http.get('/api').then(function(res){
         user.data = res.data;
         $rootScope.loggedIn = res.data.id;
       });
        
       user.loginClick = function(){
           window.location = $('#loginlink').attr('href');
       }
       
       user.loggedIn = function () {
           if (user.data) {
              return true;
           } 
           return false;
       }
       
       user.showMyPets = function(){
           debugger;
           $rootScope.filterUser = user.data;
           
       }
        
       $('.link-to-login').on('click', function(){
          user.loginClick();
       });
        
     });


})();
