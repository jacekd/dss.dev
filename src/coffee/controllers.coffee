dssApp.controller('dssCtrl', ($scope, dataFactory) ->
  $scope.queryElements = []
  $scope.selectedServices = []
  $scope.selectedServicesEdges = []
  $scope.requirements = dataFactory.getAllRequirements()

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
    queryString = "select from Services where 1=1"
    $(".query").each(() ->
      element = $(@)
      elementType = element.get(0).tagName
      elementName = element.attr("name")
      switch elementType
        when 'SELECT'
          elementValue = element.val()
          if elementValue isnt "none"
            queryElement = " AND " + elementName + " = " + elementValue + ""
            queryString = queryString + queryElement
        when 'INPUT'
          elementValue = element.val()
          if elementValue
            queryElement = " AND " + elementName + " = '" + elementValue + "'"
            queryString = queryString + queryElement
        when 'DIV'
          ## check if it is slider or radio switch
          if element.hasClass('noUiSlider')
            console.log "slider"
          else if element.hasClass('switch')
            elementInputs = element.find("input")
            elementInputs.each(() ->
              elementInput = $(@)
              if elementInput.is(":checked")
                elementValue = elementInput.attr("id")
                queryElement = " AND " + elementName + " = " + elementValue
                queryString = queryString + queryElement
            )
        else
          console.log elementType
    )

    $scope.matchingServices = dataFactory.catchMatching(queryString) if (queryString.search("AND") isnt -1)

    # Debugging
    console.log queryString
    console.log($scope.matchingServices)

    # Service selected method
    $scope.selected = (serviceBoxId) ->
      serviceBox = $("#service-" + serviceBoxId)
      serviceObject = $(@)
      serviceBox.toggleClass("selected")

      # Push element to the selected for later
      $scope.selectedServices.push(serviceObject)

      console.log $scope.selectedServices

  # watch query items change, but it does not watch it's values

#  $scope.$watch('queryElements', (newValue, oldValue) ->
#    console.log newValue
#  , true)

  # watch or changes in selected Serivices 
  # execute only upon change
  $scope.$watch('selectedServices', (value) ->
    queryEdges = "select from Services where 1=1"
    angular.forEach($scope.selectedServices, (selectedService) ->
      # @rid rid for the connections of the services 
    )
    console.log $scope.selectedServices
    $scope.selectedServicesEdges = dataFactory.matchingServices(queryEdges) if ($scope.selectedServices.length)
    # TODO: how to display it? 
  )

# Initialize foundation
$(document).foundation()
)
