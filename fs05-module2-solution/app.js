(function() {
  'use strict';

angular.module("ShoppingListCheckOff", [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var toBuy = this;

  toBuy.items = ShoppingListService.getItemsToBuy();
  toBuy.buy = function(index) {
    ShoppingListService.buy(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var bought = this;

  bought.items = ShoppingListService.getItemsBought();
}

function ShoppingListService() {
  var service = this;

  var itemsToBuy = [
      { name: "Cookies", quantity: 10},
      { name: "Bottles of juice", quantity: 20},
      { name: "Apples", quantity: 30},
      { name: "Oranges", quantity: 40},
      { name: "Magazines", quantity: 50}
  ];
  var itemsBought = [];

  service.getItemsToBuy = function() {
    return itemsToBuy;
  };

  service.getItemsBought = function() {
    return itemsBought;
  };

  service.buy = function(index) {
    itemsBought.push(itemsToBuy[index]);
    itemsToBuy.splice(index, 1);
  }
}

})();
