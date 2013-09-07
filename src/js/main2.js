// Generated by CoffeeScript 1.6.3
(function() {
  var dssApp, functionalDatabaseUrl, metricsDatabaseUrl;

  dssApp = angular.module('dssApp', []);

  functionalDatabaseUrl = "http://localhost:2480/functional";

  metricsDatabaseUrl = "http://localhost:2480/metric";

  dssApp.factory('catchRequirementsFactory', function() {
    var functionalDatabase, functionalDatabaseInfo, methods;
    functionalDatabase = new ODatabase(functionalDatabaseUrl);
    functionalDatabaseInfo = functionalDatabase.open('admin', 'admin');
    methods = {};
    methods.getAll = function() {
      var query;
      query = functionalDatabase.query('select from Requirements', 1000);
      return query.result;
    };
    functionalDatabase.close();
    return methods;
  });

  dssApp.directive('render', function() {
    return function(scope, element, attrs) {
      return attrs.$observe('parameters', function(value) {
        var attributes, options, renderValue;
        attributes = scope.$eval("{" + attrs.parameters + "}");
        renderValue = attrs.render;
        if (renderValue === "slider") {
          return {
            restrict: 'A',
            link: element.noUiSlider({
              range: attributes.range || [0, 100],
              start: attributes.start || 0,
              step: attributes.step || 1,
              handles: attributes.handles || 1,
              slide: function() {
                return $(this).prev("span.requirementValue").text($(this).val());
              }
            })
          };
        } else if (renderValue === "select") {
          options = '<option value="none">-- select --</option>';
          angular.forEach(attributes, function(value, key) {
            options = options + '<option value="' + key + '">' + value + '</option>';
          });
          return {
            restrict: 'E',
            link: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><select name="' + element.text() + '">' + options + '</select>')
          };
        } else if (renderValue === "input") {
          return {
            restrict: 'E',
            link: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><input name="' + element.text() + '" type=' + attributes.type + ' class="large-12 columns">')
          };
        } else if (renderValue === "radio") {
          return {
            restrict: 'E',
            link: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><div class="switch small"><input id="z" name="' + element.text() + '" type="radio" checked><label for="z" onclick="">NO</label><input id="z1" name="' + element.text() + '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>')
          };
        } else {
          console.log('ouch');
        }
        $(document).foundation();
      });
    };
  });

  dssApp.filter('capitalize', function() {
    return function(input, scope) {
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
  });

  dssApp.filter('replaceSpacesWithDash', function() {
    return function(input, scope) {
      return input.replace(/\ /g, "_");
    };
  });

  dssApp.filter('unique', function() {
    return function(items, filterOn) {
      var extractValueToCompare, hashcheck, newItems;
      if (filterOn === false) {
        return items;
      }
      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        hashcheck = {};
        newItems = [];
        extractValueToCompare = function(item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };
        angular.forEach(items, function(item) {
          var isDuplicate, newItem, _i, _len;
          isDuplicate = false;
          for (_i = 0, _len = newItems.length; _i < _len; _i++) {
            newItem = newItems[_i];
            if (angular.equals(extractValueToCompare(newItem), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }
          items = newItems;
        });
      }
      return items;
    };
  });

  dssApp.controller('requirements', function($scope, catchRequirementsFactory) {
    $scope.queryElements = [];
    $scope.requirements = catchRequirementsFactory.getAll();
    $scope.showSubcategory = function(categoryName) {
      $(document).foundation();
      $('.thirdLevelRequirements').hide();
      return $('#' + categoryName).fadeIn();
    };
    $scope.closeSubcategory = function(className) {
      return $("." + className).fadeOut();
    };
    $scope.addElementToQuery = function(categoryName) {
      var requirementName;
      requirementName = $("select." + categoryName).val();
      return angular.forEach($scope.requirements, function(requirement) {
        if (requirement.category === categoryName && requirement.name === requirementName && $scope.queryElements.indexOf(requirement) === -1) {
          return $scope.queryElements.push(requirement);
        }
      });
    };
    return $scope.$watch('queryElements', function(newValue, oldValue) {
      return console.log(newValue);
    }, true);
  }, $(document).foundation());

}).call(this);
