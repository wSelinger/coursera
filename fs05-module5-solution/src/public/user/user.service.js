(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

function UserService() {
  var service = this;

  var preferences;

  service.getPreferences = function() {
    //console.log("Returning preferences", preferences);
    return preferences;
  };

  service.setPreferences = function(prefs) {
    //console.log("Setting preferences: ", prefs);
    preferences = prefs;
  };
}

})();
