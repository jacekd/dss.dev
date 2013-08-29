var dssApp = angular.module('dssApp', []);

// Globals
var functionalDatabaseUrl = "http://localhost:2480/functional";

// ---------------------------------------------------------------
// catchRequirements factory
dssApp.factory('catchRequirementsFactory', function (){
  // Initialize database and methods 
  var methods = {},
      functionalDatabase = new ODatabase(functionalDatabaseUrl),
      functionalDatabaseInfo = functionalDatabase.open('admin', 'admin');

  methods.getAll = function () {
    query = functionalDatabase.query('select from Requirements');

    return query.result;
  }

  methods.getFirstLevelRequirements = function () {
    query = functionalDatabase.query('select from Requirements where level = 1');

    return query.result;
  }

  methods.getThirdLevelRequirements = function () {
    query = functionalDatabase.query('select from Requirements where level = 3');

    return query.result;
  }

  functionalDatabase.close();
  return methods;
});

// objectCreate factory
dssApp.factory('createObject', function(object) {
  if (object.type === "slider") {
    return "This is slider";
  }
});

// Directives 
dssApp.directive('slider', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).noUiSlider(scope.$eval("{" + attrs.slider + "}"));
    }
  };
});

// Filters
dssApp.filter('capitalize', function() {
  return function(input, scope) {
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

// first Level Requirements controller
dssApp.controller('firstLevelRequirements', function($scope, catchRequirementsFactory) {
  $scope.requirements = catchRequirementsFactory.getFirstLevelRequirements();
  $scope.updateSpan = function(val) {
      $("span").text(val);
    }
});

// thirdLevelRequirements controller
dssApp.controller('thirdLevelRequirements', function($scope, catchRequirementsFactory) {
  $scope.requirements = catchRequirementsFactory.getThirdLevelRequirements();
});
