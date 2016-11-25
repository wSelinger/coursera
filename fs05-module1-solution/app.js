(function() {
  'use strict';

angular.module("LunchCheck", [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkIfTooMuch = function() {
    var nrOfDishes = countDishes($scope.dishes);
    $scope.message = chooseMessage(nrOfDishes);
    $scope.isInputValid = validateInput(nrOfDishes);
  };
}

function countDishes(dishesInput) {
  if (!dishesInput)
    return 0;

  var dishes = dishesInput.split(",");
  var nrOfDishes = 0;
  for (var i=0; i < dishes.length; i++) {
    if (dishes[i].trim()) {
      nrOfDishes++;
    }
  }
  return nrOfDishes;
}

function chooseMessage(nrOfDishes) {
  if (nrOfDishes == 0)
    return "Please enter data first";
  else if (nrOfDishes <= 3)
      return "Enjoy!";
  else
      return "Too much!";
}

function validateInput(nrOfDishes) {
  return nrOfDishes > 0;
}

})();
