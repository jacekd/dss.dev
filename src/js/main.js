// Initialize Angular
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
    query = functionalDatabase.query('select from Requirements', 1000);

    return query.result;
  }

  functionalDatabase.close();
  return methods;
});

// Directives 
dssApp.directive('render', function() {
  return function (scope, element, attrs) {
    attrs.$observe('parameters', function(value) {
      var attributes = scope.$eval("{" + attrs.parameters + "}"),
          renderValue = attrs.render;
      if (renderValue === "slider") {
        return {
          restrict: 'A',
          link: 
            element.noUiSlider({
              range: attributes.range===null||attributes.range===undefined ? [0,100] : attributes.range,
              start: attributes.start===null||attributes.start===undefined ? 0 : attributes.start,
              step: attributes.step===null||attributes.start===undefined ? 1 : attributes.step,
              handles: attributes.handles===null||attributes.handles===undefined ? 1 : attributes.handles,
              slide: function() {
                $(this).prev("span.requirementValue").text($(this).val());
              }
            })
        }
      } else if (renderValue === "select") {
        var options = '<option value="none">-- select --</option>';
        angular.forEach(attributes, function(value, key) {
          options = options + '<option value="' + key + '">' + value + '</option>';
        })
        return {
          restrict: 'E',
          link: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.$eval(attrs.title) + '"><i class="fi-lightbulb"></i></span></label><select name="' + element.text() + '">' + options + '</select>')
        }
      } else if (renderValue === "input") {
        return {
          restrict: 'E',
          link: element.html('<label for="' + element.text() + '">' + element.text() + '</label><input name="' + element.text() + '" type=' + attributes.type + ' class="large-12 columns">')
        }
      } else if (renderValue === "checkbox") {
        return {
          restrict: 'E',
          template: '',
          replace: true
        }
      } else if (renderValue === "radio") {
        return {
          restrict: 'E',
          link: element.html('<label for="' + element.text() + '">' + element.text() + '</label><div class="switch small"><input id="z" name="' + element.text() + '" type="radio" checked><label for="z" onclick="">NO</label><input id="z1" name="' + element.text() + '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>')
        }
      } else {
        console.log('ouch');
      }
      $(document).foundation();
    })
  }
});

// Filters
dssApp.filter('capitalize', function() {
  return function(input, scope) {
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

dssApp.filter('replaceSpacesWithDash', function() {
  return function(input, scope) {
    return input.replace(/ /g,"_");
  }
});

dssApp.filter('unique', function () {
  return function (items, filterOn) {
    if (filterOn === false) {
      return items;
    }
    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [],
      extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };
      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;
        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }
      });
      items = newItems;
    }
    return items;
  };
});

// first Level Requirements controller
dssApp.controller('requirements', function($scope, catchRequirementsFactory) {
  // $scope.requirementsFirstLevel = catchRequirementsFactory.getFirstLevelRequirements();
  //
  $scope.queryElements = [];

  $scope.requirements = catchRequirementsFactory.getAll();

  $scope.showSubcategory = function(categoryName) {
    // Initialize foundation
    $(document).foundation();

    $(".thirdLevelRequirements").hide();
    $("#" + categoryName).fadeIn();
  }

  $scope.closeSubcategory = function(className) {
    $("." + className).fadeOut();
  }

  $scope.addElementToQuery = function(categoryName) {
    var requirementName = $("select." + categoryName).val();

    angular.forEach($scope.requirements, function(requirement) {
      if (requirement.category === categoryName && requirement.name === requirementName) {
          if ($scope.queryElements.indexOf(requirement) == -1) $scope.queryElements.push(requirement);
      }
    });
  }

  // Initialize foundation
  $(document).foundation();
});

