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

// test controller
dssApp.controller('firstLevelRequirements', function($scope, catchRequirementsFactory) {
  $scope.requirements = catchRequirementsFactory.getFirstLevelRequirements();
});
