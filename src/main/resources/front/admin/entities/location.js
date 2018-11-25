function buildFullLocationSelectorForItem(populatedPointId, entity,
                                          countryId, regionId, populatedPointHtmlId,
                                          countrySelectorId, regionSelectorId, populatedPointSelectorId) {
    $.ajax({
        url: "http://localhost:8080/countries/full",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            allLocation = data;
            var defValue = data[0].id;
            renderSelectCountryItem(data, entity, countrySelectorId);
            allRegions = getRegionsFromCountries(data);
            renderSelectRegionItem(undefined, entity, regionSelectorId);
            renderSelectPopulatedPointItem(undefined, entity, populatedPointSelectorId);
            if (populatedPointId == null) {
                $(countryId).val(defValue);
                $(countryId).change();
            } else {
                setLocationOfItem(allLocation, populatedPointId, countryId, regionId, populatedPointHtmlId);
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

// util
function getRegionsFromCountries(data) {
    var regions = [];

    for (var i = 0; i < data.length; i++) {
        var region = data[i].regions;
        for (var j = 0; j < region.length; j++) {
            regions.push(region[j]);
        }
    }

    return regions;
}

function setLocationOfItem(countries, id, countryId, regionId, populatedPointId) {
    var idOfLocations = [];

    for (var i = 0; i < countries.length; i++) {
        var countryRegions = countries[i].regions;
        for (var j = 0; j < countryRegions.length; j++) {
            var populatedPoints = countryRegions[j].populatedPoints;
            for (var k = 0; k < populatedPoints.length; k++) {
                if (populatedPoints[k].id == id) {
                    fillAllLocationTree(countryId, countries[i].id,
                        regionId, countryRegions[j].id,
                        populatedPointId, populatedPoints[k].id);
                }
            }
        }
    }
    return idOfLocations;
}

function fillAllLocationTree(countryId, countryValue, regionId, regionValue, populatedPointId, pointValue) {
    $(countryId).val(countryValue);
    $(countryId).change();
    $(regionId).val(regionValue);
    $(regionId).change();
    $(populatedPointId).val(pointValue);
    $(populatedPointId).change();
}

// render section
function renderSelectCountryItem(data, entity, countrySelect) {
    var html;
    switch(entity) {
        case "user" :
            html = userEntitySelectCountryTemplate(data);
            break;
        case "drone":
            html = droneEntitySelectCountryTemplate(data);
            break;
        case "localProposal":
            html = localProposalEntitySelectCountryTemplate(data);
            break;
        case "registration":
            html = registrationCountryListTemplate(data);
            break;
    }
    $(countrySelect).empty().append(html);
}

function renderSelectRegionItem(data, entity, regionSelect) {
    var html;
    switch(entity) {
        case "user":
            html = userEntitySelectRegionTemplate(data);
            break;
        case "drone":
            html = droneEntitySelectRegionTemplate(data);
            break;
        case "localProposal":
            html = localProposalEntitySelectRegionTemplate(data);
            break;
        case "registration":
            html = registrationRegionListTemplate(data);
            break;
    }
    $(regionSelect).empty().append(html);
}

function renderSelectPopulatedPointItem(data, entity, populatedPointSelect) {
    var html;
    switch(entity) {
        case "user":
            html = userEntitySelectTemplate(data);
            break;
        case "drone":
            html = droneEntitySelectTemplate(data);
            break;
        case "localProposal":
            html = localProposalEntitySelectTemplate(data);
            break;
        case "registration":
            html = registrationPointListTemplate(data);
            break;
    }
    $(populatedPointSelect).empty().append(html);
}