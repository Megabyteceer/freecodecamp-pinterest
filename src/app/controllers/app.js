


angular.module('megabyte.funny-pets', [])


.directive('appTitle', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/app-title.html'
  };
})

.directive('fallbackSrc', function ($rootScope) {
  var fallbackSrc = {
    
    
    link: function postLink(scope, iElement, iAttrs) {
      
      
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
      
      iElement.bind('load', function() {
        if($rootScope.onImgLoad)
        $rootScope.onImgLoad();
      });
      
      
    }
   }
   return fallbackSrc;
})

.directive('confirmationNeeded', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
        
      var msg = attr.confirmationNeeded || "Are you sure?";
      
      var clickAction = attr.ngClick;
      element.bind('click', function(){
           $('#modal-confirm-text').html(msg);
           $('#confirmation-modal').modal();
           $('#modal-confirm-btn').unbind('click');
           $('#modal-confirm-btn').on('click', function() {
              $('#confirmation-modal').modal('hide'); 
              scope.$eval(clickAction);
          }); 
      });
    }
  };
});

