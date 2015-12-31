'use strict';




(function() {

    var waitCalls = 0;

    function showWait() {
        waitCalls++;
        if (waitCalls === 1) {
            $('.loader-frame').fadeIn();
        }
    }

    function hideWait() {
        waitCalls--;
        if (waitCalls === 0) {
            $('.loader-frame').fadeOut();
        }
    }


    function setItem(name, val) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(name, val);
        }
    }

    function getItem(name) {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem(name);
        }
        return undefined;
    }

    function showWrongPictureAlert() {
        $('#wrong-picture-url').show();
        $('#wrong-picture-url').removeClass('shake');

        setTimeout(function() {
            $('#wrong-picture-url').addClass('shake');
        }, 20);

        $('#new-pic-url').focus();
    }

    function hideWrongPictureAlert() {
        $('#wrong-picture-url').hide();
    }

    function showEmptyTitleAlert() {
        $('#wrong-title').show();
        $('#wrong-title').removeClass('shake');
        setTimeout(function() {
            $('#wrong-title').addClass('shake');
        }, 20);

        $('#new-title').focus();
    }

    function hideEmptyTitleAlert() {
        $('#wrong-title').hide();

    }


    angular.module('megabyte.funny-pets')

    .controller('PetsController', function($http, $timeout, $rootScope, $window, $controller) {


        var userController = $controller('UserController');
        this.user = userController;

        var controller = this;
        controller.tab = 'all';
        controller.showLoader = 0;

        function addNewPet() {
            $('#new-preview-pic').attr('src', '')
            hideEmptyTitleAlert();
            hideWrongPictureAlert();
            controller.newPictureUrl = '';
            controller.newTitle = '';
            setItem("add_new_pet_after_login", "0");
            $('#new-pet-modal').modal('show');
        }




        controller.submitNew = function() {
            if (!controller.newPictureUrl || ($('#new-preview-pic').attr('src') !== controller.newPictureUrl)) {
                //wrong picture url
                showWrongPictureAlert();
            }
            else {
                hideWrongPictureAlert();
                if (!controller.newTitle) {
                    showEmptyTitleAlert();
                }
                else {
                    hideEmptyTitleAlert();

                    $('#new-pet-modal').modal('hide');

                    showWait();
                    $http.post('/api/pet', {
                        "title": controller.newTitle,
                        "picUrl": controller.newPictureUrl
                    }).then(function(res) {
                        renewAllPets();
                        hideWait();
                    }, hideWait);

                }
            }
        }


        controller.filterByUser = function(user) {

            var needRefresh = ((controller.filterUser && !user) || (!controller.filterUser && user) || (user && (controller.filterUser._id != user._id)));
            controller.filterUser = user;

            if (needRefresh) {
                renewAllPets();
            }

        }

        controller.isAdmin = function(pet) {
            return controller.user.data && (controller.user.data.isAdmin || (pet && (pet.userId.id === controller.user.data.id)));
        }

        controller.addNewClicked = function() {

            if (userController.loggedIn()) {
                addNewPet();
            }
            else {
                setItem("add_new_pet_after_login", "1");
                userController.loginClick();
            }
        }


        controller.deletePet = function(pet) {
            showWait();
            $http.delete('/api/pet/' + pet._id).then(function(res) {
                renewAllPets();
                hideWait();

            }, hideWait);
        }
        
        function likeAgetLoginIfNeed(){
            if(controller.pets && $rootScope.loggedIn)
            {
                 var likeAfterLogin = getItem('like_pet_after_login');
                    if(likeAfterLogin){
                        setItem('like_pet_after_login', '');
                        controller.pets.forEach(function(p){
                            if(p._id == likeAfterLogin){
                                controller.likePet(p);
                            }
                        })
                }
            }
            
        }
        controller.likePet = function(pet) {
            
            
            if ($rootScope.loggedIn) {
                 $http.get('/api/pet/' + pet._id + '/like').then(function(res) {
                    pet.likes = res.data;
                });
            }
            else {
                setItem("like_pet_after_login", pet._id);
                userController.loginClick();
            }
            
            
           
        }




        $rootScope.$watch('[loggedIn]', function(newValue, oldValue) {
            if (newValue[0]) {
                likeAgetLoginIfNeed();
                if (getItem('add_new_pet_after_login') === "1") {
                    addNewPet();
                }
            }
        }, true);


        $rootScope.$watch('[filterUser]', function(newValue, oldValue) {
            if (newValue[0]) {
                $rootScope.filterUser = undefined;
                controller.filterByUser(newValue[0]);
            }
        }, true);




        function renewAllPets() {
            showWait();

            var filter = '';
            if (controller.filterUser) {
                filter = '/?filterUser=' + controller.filterUser._id;
            }

            $http.get('/api/pet' + filter).then(function(res) {
                hideWait();

                if (controller.pets) {
                    $('.grid').masonry('destroy');
                }

                controller.pets = res.data;
                
               likeAgetLoginIfNeed();
                
                $timeout(recalcContainerPos, 40);
            }, hideWait);
        }

        renewAllPets();

        var recalcCalled = false;
        function recalcContainerPos() {

            var grid = $('.grid');

            grid.css('width', '');

            grid.masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: 210
            });

            var w = $('.grid').width() - 40;

            var targetW = Math.floor(w / 210) * 210;

            grid.css('width', '' + targetW + 'px');

            $timeout(function() {
                grid.masonry('resize');
            }, 200);
            recalcCalled = true;
        }

        $rootScope.onImgLoad = function() {
            if (!recalcCalled) {
                return;
            }
            recalcCalled = false;
            $timeout(recalcContainerPos, 200);
        }

        $(window).resize(recalcContainerPos);


    });


})();
