(function() {
  "use strict";

  angular.module("public")
  .controller('RegisterController', RegisterController);

RegisterController.$inject = ['MenuService', 'UserService'];
function RegisterController(MenuService, UserService) {
  var reg = this;

  reg.favourite_invalid = false;

  reg.submit = function() {
    // TODO prepare data to register

    MenuService.getMenuItem(reg.user.favourite_short_name)
      .then(function(response) {
        //console.log("menuItem: ", response);
        reg.user.favourite = response;
        UserService.setPreferences(reg.user);
        reg.favourite_invalid = false;
        reg.completed = true;
      })
      .catch(function(error) {
        //console.log("Error: ", error);
        reg.favourite_invalid = true;
        reg.completed = false;
      });
  };
}

})();
