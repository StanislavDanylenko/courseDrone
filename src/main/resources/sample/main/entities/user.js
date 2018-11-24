function renderUserList(response) {
    var html = usersTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#userListTable');
}

function renderUserEntity() {
    var html = userEntityTemplate();
    var select = userEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#userSelect').empty().append(select);
}


function getUsers() {
    $.ajax({
        url: "http://localhost:8080/admin/users",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionUser = -1;
            renderUserList(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}
//
function buildFullLocationSelectorForItem(populatedPointId,
                                          countryId, regionId, populatedPointHtmlId,
                                          countrySelectorId, regionSelectorId, populatedPointSelectorId) {
    $.ajax({
        url: "http://localhost:8080/countries/full",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            allLocation = data;
            var defValue = data[0].id;
            renderSelectCountryUser(data, countrySelectorId);
            allRegions = getRegionsFromCountries(data);
            renderSelectRegionUser(undefined, regionSelectorId);
            renderSelectPopulatedPointUser(undefined, populatedPointSelectorId);
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


function getUser(id) {
    console.log('in the get user method, id = ' + id);
    $.ajax({
        url: "http://localhost:8080/users/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            hideUserEditFields();
            $('#userId').val(data.id);
            $('#userFirstName').val(data.firstName);
            $('#userLastName').val(data.lastName);
            $('#userPatronymic').val(data.patronymic);
            $('#userLocalization').val(data.localization);
            setIsUserNonBlocked(data.isActive);
            buildFullLocationSelectorForItem(data.defaultPopulatedPoint,
                '#userCountryId', '#userRegionId', '#userPopulatedPointId',
                '#userSelectCountry', '#userSelectRegion', '#userSelect');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createUser() {
    renderUserEntity();
    var button = $('#userSubmitButton');
    button.bind('click', saveUser);
    $('#userOperation').text('Add admin user');
    buildFullLocationSelectorForItem(null,
                        '#userCountryId','#userRegionId', '#userPopulatedPointId',
                        '#userSelectCountry', '#userSelectRegion', '#userSelect');
}

function editUser(e) {
    var id = getID(e, '#userListTable');
    renderUserEntity();
    var button = $('#userSubmitButton');
    button.bind('click', updateUser);
    $('#userOperation').text('Update admin user');
    getUser(id);
}


function saveUser() {

    var user = {
        firstName: $('#userFirstName').val(),
        lastName: $('#userLastName').val(),
        patronymic: $('#userPatronymic').val(),
        email: $('#userEmail').val(),
        password: $('#userPassword').val(),
        isActive: getIsUserNonBlocked(),
        defaultPopulatedPointId: $('#userPopulatedPointId').val(),
        localization: $('#userLocalization').val(),
        type: $('#userType').val()
    };

    $.ajax({
        url: "http://localhost:8080/admin/users",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            getUsers();
        },
        error: function(data) {
        }
    });

}

function updateUser() {
    var user = {
        id: $('#userId').val(),
        firstName: $('#userFirstName').val(),
        lastName: $('#userLastName').val(),
        patronymic: $('#userPatronymic').val(),
        isActive: getIsUserNonBlocked(),
        defaultPopulatedPoint: $('#userPopulatedPointId').val(),
        localization: $('#userLocalization').val(),
    };

    $.ajax({
        url: "http://localhost:8080/admin/users/" + user.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            getUsers();
        },
        error: function(data) {
        }
    });
}

function deleteUser(e) {

    actionUser = getID(e, '#userListTable');

    $.ajax({
        url: "http://localhost:8080/admin/users/" + actionUser,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getUsers();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function getIsUserNonBlocked() {
    if($('#userAvailable').is(":checked")){
        return true;
    }
    return false;
}

function setIsUserNonBlocked(data) {
    if (data != null && data === true) {
        $('#userAvailable').prop("checked", true);
        $('#userUnavailable').prop("checked", false);
    } else {
        $('#userAvailable').prop("checked", false);
        $('#userUnavailable').prop("checked", true);
    }
}

function hideUserEditFields() {
    $('#hideUserEmail').hide();
    $('#hideUserType').hide();
    $('#hideUserPassword').hide();
}


// todo cannot do refactor
function changeUserRegion() {
    var countryId = $('#userCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionUser(regions, '#userSelectRegion');
    $('#userRegionId').val(regions[0].id);
    $('#userRegionId').change();
}

function changeUserPopulatedPoint() {
    var regionId = $('#userRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointUser(points, '#userSelect');
    $('#userPopulatedPointId').val(points[0].id);
    $('#userPopulatedPointId').change();
}



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
function renderSelectCountryUser(data, countrySelect) {
    var html = userEntitySelectCountryTemplate(data);
    $(countrySelect).empty().append(html);
}

function renderSelectRegionUser(data, regionSelect) {
    var html = userEntitySelectRegionTemplate(data);
    $(regionSelect).empty().append(html);
}

function renderSelectPopulatedPointUser(data, populatedPointSelect) {
    var html = userEntitySelectTemplate(data);
    $(populatedPointSelect).empty().append(html);
}
