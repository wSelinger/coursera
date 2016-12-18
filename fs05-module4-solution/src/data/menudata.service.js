(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('MenuServiceBaseURL', 'https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http', 'MenuServiceBaseURL'];
function MenuDataService($http, MenuServiceBaseURL) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
      method: "GET",
      url: (MenuServiceBaseURL + "/categories.json")
    }).then(function(result) {
      return result.data;
    });
  }

  // returns an object with 2 attributes: categoy + menu_items
  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: "GET",
      url: (MenuServiceBaseURL + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then(function(result) {
      //console.log('getItemsForCategory', result);
      return result.data;
    });
  }

}

})();
