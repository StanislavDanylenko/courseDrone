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
//
function renderSelectPopulatedPointUser(data) {
    var html = userEntitySelectTemplate(data);
    $('#userSelect').empty().append(html);
}

function renderSelectCountryUser(data) {
    var html = userEntitySelectCountryTemplate(data);
    $('#userSelectCountry').empty().append(html);
}

function renderSelectRegionUser(data) {
    var html = userEntitySelectRegionTemplate(data);
    $('#userSelectRegion').empty().append(html);
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
function getPopulatedPointForNewUser(populatedPointId) {
    $.ajax({
        url: "http://localhost:8080/countries/full",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            allLocation = data;
            var defValue = data[0].id;
            renderSelectCountryUser(data);
            userRegions = getRegionsFromCountries(data);
            renderSelectRegionUser();
            renderSelectPopulatedPointUser();
            if (populatedPointId == undefined) {
                $('#userCountryId').val(defValue);
                $('#userCountryId').change();
            } else {
                setLocationOfUser(allLocation, populatedPointId);
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
            getPopulatedPointForNewUser(data.defaultPopulatedPoint);
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
    getPopulatedPointForNewUser();
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



function changeUserRegion() {
    var countryId = $('#userCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionUser(regions);
    $('#userRegionId').val(regions[0].id);
    $('#userRegionId').change();
}

function changeUserPopulatedPoint() {
    var regionId = $('#userRegionId').val();
    var points;

    for(var i = 0; i < userRegions.length; i++) {
        if (userRegions[i].id == regionId) {
            points = userRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointUser(points);
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

function setLocationOfUser(countries, id) {
    var idOfLocations = [];

    for (var i = 0; i < countries.length; i++) {
        var countryRegions = countries[i].regions;
        for (var j = 0; j < countryRegions.length; j++) {
            var populatedPoints = countryRegions[j].populatedPoints;
            for (var k = 0; k < populatedPoints.length; k++) {
                if (populatedPoints[k].id == id) {
                    $('#userCountryId').val(countries[i].id)
                    $('#userCountryId').change();
                    $('#userRegionId').val(countryRegions[j].id);
                    $('#userRegionId').change();
                    $('#userPopulatedPointId').val(populatedPoints[k].id);
                    $('#userPopulatedPointId').change();
                }
            }
        }
    }
    return idOfLocations;
}
