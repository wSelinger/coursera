(function() {
  'use strict';

angular.module("NarrowItDownApp", [])
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService)
.constant('MenuServiceBaseURL', 'https://davids-restaurant.herokuapp.com');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowIt = this;
  var nothingFound = "Nothing found";

  narrowIt.searchTerm = "";
  narrowIt.found = [];
  narrowIt.errorMessage = "";

  /* Internal function to set the result and determine the error message */
  var setMatchResult = function(items, errorMessage) {
    if (errorMessage) {
      narrowIt.found = [];
      narrowIt.errorMessage = errorMessage;
    }
    else {
      narrowIt.found = items;
      narrowIt.errorMessage = (items && items.length) ? "" : nothingFound;
    }
  };

  narrowIt.matchMenuItems = function() {
    if (!narrowIt.searchTerm) {
      setMatchResult();
      return;
    }

    var resultPromise = MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm);
    resultPromise.then(function(value) {
      setMatchResult(value);
    })
    .catch(function(error) {
      console.log(error);
      setMatchResult([], error.toString());
    });
  }

  narrowIt.removeMenuItem = function(index) {
    narrowIt.found.splice(index, 1);
  }
}

function FoundItemsDirective() {
  var ddo = {
    // restriction required to be able to use foundItems both as directive name and parameter attribute
    // (otherwise angular interprets 'found-items' attribute as another directive instantiation)
    restrict: "E",
    templateUrl: 'foundItems.html',
    scope: {
      items: '<foundItems',
      errorMessage: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'dirCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
}

MenuSearchService.$inject = ['$http', 'MenuServiceBaseURL'];
function MenuSearchService($http, MenuServiceBaseURL) {
  var service = this;

  // returns Promise
  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (MenuServiceBaseURL + "/menu_items.json")
    });

    return response.then(function(value) {
      var filteredItems = value.data.menu_items.filter(function(item) {
          return item.description.includes(searchTerm);
        });
      return filteredItems;
    });
  };
}

})();
