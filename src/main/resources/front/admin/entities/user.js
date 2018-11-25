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
            buildFullLocationSelectorForItem(data.defaultPopulatedPoint, "user",
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
    buildFullLocationSelectorForItem(null, "user",
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

    renderSelectRegionItem(regions, "user", '#userSelectRegion');
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
    renderSelectPopulatedPointItem(points, "user", '#userSelect');
    $('#userPopulatedPointId').val(points[0].id);
    $('#userPopulatedPointId').change();
}
