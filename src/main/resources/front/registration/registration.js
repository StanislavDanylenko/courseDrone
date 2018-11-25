var registrationCountryListTemplate;
var registrationRegionListTemplate;
var registrationPointListTemplate;

$(document).ready(function() {

    $(document).on('click', '#submitRegistrationButton', registerUser);

    registrationCountryListTemplate =  Handlebars.compile($('#userCountrySelectEntity').html());
    registrationRegionListTemplate =  Handlebars.compile($('#userRegionSelectEntity').html());
    registrationPointListTemplate =  Handlebars.compile($('#userPointSelectEntity').html());

    $(document).on('change', '#userCountryId', registrationChangeUserRegion);
    $(document).on('change', '#userRegionId', registrationChangUserPopulatedPoint);


    buildFullLocationSelectorForItem(null, "registration",
        '#userCountryId','#userRegionId', '#userPopulatedPointId',
        '#registrationUserSelectCountry', '#registrationUserSelectRegion', '#registrationUserSelect');


});

function registerUser() {

    var user = {
        firstName: $('#userFirstName').val(),
        lastName: $('#userLastName').val(),
        patronymic: $('#userPatronymic').val(),
        email: $('#userEmail').val(),
        password: $('#userPassword').val(),
        defaultPopulatedPointId: $('#userPointId').val(),
        localization: $('#userLocalization').val(),
        type: $('#userType').val(),
        isActive: true
    };

    $.ajax({
        url: "http://localhost:8080/users",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            gotoPage();
        },
        error: function(data) {
        }
    });

}

function gotoPage() {
    $(location).attr('href','../login/login.html');
}



// todo cannot do refactor
function registrationChangeUserRegion() {
    var countryId = $('#userCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionItem(regions, "registration", '#registrationUserSelectRegion');
    $('#userRegionId').val(regions[0].id);
    $('#userRegionId').change();
}

function registrationChangUserPopulatedPoint() {
    var regionId = $('#userRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointItem(points, "registration", '#registrationUserSelect');
    $('#userPopulatedPointId').val(points[0].id);
    $('#userPopulatedPointId').change();
}