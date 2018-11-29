function renderOrdinalUserEntity() {
    var html = userOrdinalEntityTemplate();
    var select = userOrdinalEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#userOrdinalSelect').empty().append(select);
    setTranslateProfile();
}

function getOrdinalUser() {

    $.ajax({
        url: "http://localhost:8080/users/" + USER.id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {

            renderOrdinalUserEntity();

            $('#userOrdinalFirstName').val(data.firstName);
            $('#userOrdinalLastName').val(data.lastName);
            $('#userOrdinalPatronymic').val(data.patronymic);
            $('#userOrdinalPassword').val(data.password);
            $('#userOrdinalLocalization').val(data.localization);

            buildFullLocationSelectorForItem(data.defaultPopulatedPoint, "userOrdinal",
                '#userOrdinalCountryId', '#userOrdinalRegionId', '#userOrdinalPopulatedPointId',
                '#userOrdinalSelectCountry', '#userOrdinalSelectRegion', '#userOrdinalSelect');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function updateOrdinalUser() {

    var user = {
        firstName: $('#userOrdinalFirstName').val(),
        lastName: $('#userOrdinalLastName').val(),
        patronymic: $('#userOrdinalPatronymic').val(),
        defaultPopulatedPoint: $('#userOrdinalPopulatedPointId').val(),
        localization: $('#userOrdinalLocalization').val()
    };

    updateUserLS(user);

    $.ajax({
        url: "http://localhost:8080/users/" + USER.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            changeLocaleUser(user);
            getAllOrders();
        },
        error: function(data) {
        }
    });

}

// todo cannot do refactor
function changeUserOrdinalRegion() {
    var countryId = $('#userOrdinalCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionItem(regions, "userOrdinal", '#userOrdinalSelectRegion');
    $('#userOrdinalRegionId').val(regions[0].id);
    $('#userOrdinalRegionId').change();
}

function changeUserOrdinalPopulatedPoint() {
    var regionId = $('#userOrdinalRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointItem(points, "userOrdinal", '#userOrdinalSelect');
    $('#userOrdinalPopulatedPointId').val(points[0].id);
    $('#userOrdinalPopulatedPointId').change();
}

function updateUserPassword() {

    var newPassword = $('#userNewPassword').val();
    var newPasswordRepeat = $('#userNewPasswordRepeat').val();

    if (newPassword != newPasswordRepeat) {
        console.log('different passwords');
        return;
    }

    var user = {
        id: USER.id,
        oldPassword: $('#userOldPassword').val(),
        newPassword: newPassword
    };

    $.ajax({
        url: "http://localhost:8080/users/password",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            $('#userOldPassword').val('');
            $('#userNewPassword').val('');
            $('#userNewPasswordRepeat').val('');
            $("#closeModal").click();
        },
        error: function(data) {
        }
    });
}