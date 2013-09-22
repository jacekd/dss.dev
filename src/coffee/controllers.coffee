dssApp.controller('requirements', ($scope, catchRequirementsFactory) ->
  $scope.queryElements = []

  $scope.requirements = catchRequirementsFactory.getAll()

  $scope.showSubcategory = (categoryName) ->
    # Init foundation
    $(document).foundation()

    # Hide all panels and display the appropriate one
    $('.thirdLevelRequirements').hide()
    $('#' + categoryName).fadeIn()

  $scope.closeSubcategory = (className) ->
    $("." + className).fadeOut()

  $scope.addElementToQuery = (categoryName) ->
    requirementName = $("select." + categoryName).val()

    angular.forEach($scope.requirements, (requirement) ->
      $scope.queryElements.push(requirement) if requirement.category is categoryName and requirement.name is requirementName and $scope.queryElements.indexOf(requirement) is -1
    )

  $scope.change = () ->
    console.log "changed"

  # watch query items change, but it does not watch it's values

#  $scope.$watch('queryElements', (newValue, oldValue) ->
#    console.log newValue
#  , true)

# Initialize foundation
$(document).foundation()
)
