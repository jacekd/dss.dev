dssApp.filter('capitalize', ->
  (input, scope) ->
    input.substring(0,1).toUpperCase()+input.substring(1);
)

dssApp.filter('replaceSpacesWithDash', ->
  (input, scope) ->
    input.replace /\ /g, "_"
)

dssApp.filter('replaceDotWithDash', ->
  (input, scope) ->
    input.replace /\./g, "_"
)

dssApp.filter('unique', ->
  (items, filterOn) ->
    return items if filterOn is false

    if (filterOn or angular.isUndefined(filterOn)) and angular.isArray(items)
      hashcheck = {}
      newItems = []
      extractValueToCompare = (item) ->
        if angular.isObject(item) and angular.isString(filterOn)
          item[filterOn]
        else
          item
      angular.forEach(items, (item) ->
        isDuplicate = false
        for newItem in newItems
          if angular.equals(extractValueToCompare(newItem), extractValueToCompare(item))
            isDuplicate = true
            break
        newItems.push(item) if not isDuplicate

        items = newItems
        return
      )
    items
)
