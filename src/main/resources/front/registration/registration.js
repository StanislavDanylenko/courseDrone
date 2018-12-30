var registrationCountryListTemplate;
var registrationRegionListTemplate;
var registrationPointListTemplate;

var validator;

$(document).ready(function() {

    loadJSONs();
    $.i18n.load(EN);
    setTranslateRegistration();

    $(document).on('click', '#submitRegistrationButton', registerUser);
    $(document).on('click', '#gotoLogin', gotoPage);

    registrationCountryListTemplate =  Handlebars.compile($('#userCountrySelectEntity').html());
    registrationRegionListTemplate =  Handlebars.compile($('#userRegionSelectEntity').html());
    registrationPointListTemplate =  Handlebars.compile($('#userPointSelectEntity').html());

    $(document).on('change', '#userCountryId', registrationChangeUserRegion);
    $(document).on('change', '#userRegionId', registrationChangUserPopulatedPoint);


    buildFullLocationSelectorForItem(null, "registration",
        '#userCountryId','#userRegionId', '#userPopulatedPointId',
        '#registrationUserSelectCountry', '#registrationUserSelectRegion', '#registrationUserSelect');

    $(document).on('change', '#localizationSwitcherRegistration', function () {
        $.i18n.unload();

        if ($('#localizationSwitcherRegistration').val() == "EN") {
            $.i18n.load(EN);
        } else {
            $.i18n.load(UA);
        }

        setTranslateRegistration();
        swapLocale();
    });

    initValidator();
    $('#registrationForm').validate(validator);

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

    if (!$('#registrationForm').valid()) {
        return;
    }

    $.ajax({
        url: "http://localhost:8080/users",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(user),
        success: function () {
            alert($.i18n._('registrationSuccess'));
            gotoPage();
        },
        error: function(data) {
            alert($.i18n._('registrationError'));
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

//////////

function initValidator() {
    validator = {
        rules: {
            userEmail: {
                required: true,
                email: true
            },
            userFirstName: {
                required: true
            },
            userLastName: {
                required: true
            },
            userPatronymic: {
                required: true
            },
            userPassword: {
                required: true
            }
        },
        messages: {
            userEmail: {
                required: $.i18n._('requiredField'),
                email: $.i18n._('emailError')
            },
            userFirstName: {
                required: $.i18n._('requiredField')
            },
            userLastName: {
                required: $.i18n._('requiredField')
            },
            userPatronymic: {
                required: $.i18n._('requiredField')
            },
            userPassword: {
                required: $.i18n._('requiredField')
            }
        }
    };
}

function swapLocale() {
    $('input[name="userEmail"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField'),
            email: $.i18n._('emailError')
        }
    });
    $('input[name="userFirstName"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField')
        }
    });
    $('input[name="userLastName"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField')
        }
    });
    $('input[name="userPatronymic"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField')
        }
    });
    $('input[name="userPassword"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField')
        }
    });
}