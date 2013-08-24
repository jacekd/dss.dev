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

// first Level Requirements controller
dssApp.controller('firstLevelRequirements', function($scope, catchRequirementsFactory) {
  requirementsData = catchRequirementsFactory.getFirstLevelRequirements();
  var requirements = "";
  $.each(requirementsData, function(i, item) {
    requirements = requirements + requirementsData[i].name + "<br>";
  });
  $scope.requirements = requirements;
});

// thirdLevelRequirements controller
dssApp.controller('thirdLevelRequirements', function($scope, catchRequirementsFactory) {
  $scope.requirements = catchRequirementsFactory.getThirdLevelRequirements();
});
