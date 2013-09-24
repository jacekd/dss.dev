dssApp.directive('render', ->
  (scope, element, attrs) ->
    attrs.$observe('parameters', (value) ->
      attributes = scope.$eval("{" + attrs.parameters + "}")
      renderValue = attrs.render

      if renderValue is "slider"
        return {} = 
        restrict: 'A'
        link: element.noUiSlider({
            range: attributes.range or [0,100]
            start: attributes.start or 0
            step: attributes.step or 1
            handles: attributes.handles or 1
            slide: -> 
              $(@).prev("span.requirementValue").text($(@).val())
          })
      else if renderValue is "select"
        options = '<option value="none">-- select --</option>'
        angular.forEach(attributes, (value, key) ->
          options = options + '<option value="' + key + '">' + value + '</option>'
          return
        )
        return {} =
          restrict: 'E'
          replace: true
          template: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><select name="' + element.text() + 
          '">' + options + '</select>')
      else if renderValue is "input"
        return {} = 
          restrict: 'E'
          replace: true
          template: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><input name="' + element.text() + 
          '" type=' + attributes.type + ' class="large-12 columns" ng-model="' + element.text() + '" ng-change="change()">')
      else if renderValue is "radio"
        return {} = 
          restrict: 'E'
          replace: true
          template: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><div class="switch small"><input id="z" name="' + element.text() + 
          '" type="radio" checked><label for="z" onclick="">NO</label><input id="z1" name="' + element.text() + 
          '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>')
      else
        console.log 'ouch'

      $(document).foundation()
      return
    )
)

# dssApp.directive('reqInput', () ->
#   return {} = 
#     restrict: 'E'
#     replace: true
#     compile: (element, attrs) ->
#       element.html('<label for="' + attrs.itemname + '">' + attrs.itemname + 
#       ' <span data-tooltip class="has-tip tip-top" title="' + attrs.definition + 
#       '"><i class="fi-lightbulb"></i></span></label><input name="' + attrs.linkname + '" type="text" class="large-12 columns query" 
#       ng-model="query.input" ng-change="change()" placeholder="">')
# )

dssApp.directive('reqInput', () ->
  return {} = 
    restrict: 'E'
    replace: true
    link: (scope, element, attrs) ->
      attributes = scope.$eval("{" + scope.item.attributes + "}")
      placeholder = attributes.placeholder||""
      type = attributes.type||"text"
      element.html('<label for="' + scope.item.name + '">' + scope.item.name + 
      ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
      '"><i class="fi-lightbulb"></i></span></label><input name="' + scope.item.linkName + '" type="' + type + 
      '" class="large-12 columns query" placeholder="' + placeholder + '">')
      element.bind('change', () ->
        scope.change()
      )
)

#dssApp.directive('reqRadio', () ->
#  return {} =
#    restrict: 'E'
#    replace: true
#    compile: (element, attrs) ->
#      element.html('<label for="' + attrs.itemname + '">' + attrs.itemname + 
#      ' <span data-tooltip class="has-tip tip-top" title="' + attrs.definition + 
#      '"><i class="fi-lightbulb"></i></span></label><div class="switch small radius
#      query" ng-click="change()" name="' + attrs.linkname + '"><input id="0" name="' + attrs.itemname + 
#      '" type="radio" checked><label for="z" onclick="">NO</label><input id="1" name="' + attrs.itemname + 
#      '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>') 
#)

dssApp.directive('reqRadio', () ->
  return {} =
    restrict: 'E'
    replace: true
    link: (scope, element, attrs) ->
      attributes = scope.$eval("{" + scope.item.attributes + "}")
      element.html('<label for="' + attrs.itemname + '">' + attrs.itemname + 
      ' <span data-tooltip class="has-tip tip-top" title="' + attrs.definition + 
      '"><i class="fi-lightbulb"></i></span></label><div class="switch small radius
      query" name="' + attrs.linkname + '"><input id="0" name="' + attrs.itemname + 
      '" type="radio" checked><label for="z" onclick="">' + attributes[0] + '</label><input id="1" name="' + attrs.itemname + 
      '" type="radio"><label for="z1" onclick="">' + attributes[1] + '</label><span></span></div>') 
      element.bind('click', () ->
        scope.change()
      )
)

dssApp.directive('reqSelect', () ->
  return {} =
    restrict: 'E'
    replace: true
    link: (scope, element, attrs) ->
      attributes = scope.$eval("{" + scope.item.attributes + "}")
      options = '<option value="none">-- select --</option>'
      angular.forEach(attributes, (value, key) ->
        options = options + '<option value="' + key + '">' + value + '</option>'
        return
      )
      element.html('<label for="' + attrs.itemname + '">' + attrs.itemname + 
      ' <span data-tooltip class="has-tip tip-top" title="' + attrs.definition + 
      '"><i class="fi-lightbulb"></i></span></label><select name="' + attrs.linkname + 
      '" class="query">' + options + '</select>')
      element.bind('change', () ->
        scope.change()
      )
)
