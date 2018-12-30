var validator;
$(document).ready(function() {

    loadJSONs();
    checkUSER();
    $.i18n.load(locale);

    $(document).on('click', '#loginButton', authorization);
    $(document).on('click', '#registrationButton', function () {
        $(location).attr('href','../registration/registration.html');
    });
    $(document).on('change', '#localizationSwitcherLogin', function () {
        $.i18n.unload();
        if ($('#localizationSwitcherLogin').val() == "EN") {
            $('#passwordLabel').text('Password');
            $('#loginButton').text('Sign in');
            $('#registrationButton').text('Registration');
            setL10n(EN);
        } else {
            $('#passwordLabel').text('Пароль');
            $('#loginButton').text('Увійти');
            $('#registrationButton').text('Зареєструватися');
            setL10n(UA);
        }
        $.i18n.load(locale);
        swapLocale();
    });

    initValidator();
    $('#loginForm').validate(validator);
});

function gotoPage(page) {
    $(location).attr('href',page);
}

function authorization() {

    if (!$('#loginForm').valid()) {
        return;
    }

        console.log($('#loginForm').serialize());
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            data: $('#loginForm').serialize(),
            xhrFields: { withCredentials: true },
            success: function (response, status, xhr) {
                console.log(response);
                USER = JSON.parse(response);
                saveUserLS(USER);
                redirect(USER);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert($.i18n._('badCredentials'));
        }});
}

function redirect(user) {
    if (user.roles === "ADMIN") {
        gotoPage('../admin/admin.html');
    } else {
        gotoPage('../user/user.html');
    }
}

function initValidator() {
    validator = {
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: $.i18n._('requiredField'),
                email: $.i18n._('emailError')
            },
            password: {
                required: $.i18n._('requiredField')
            }
        }
    };
}

function swapLocale() {
    $('input[name="email"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField'),
            email: $.i18n._('emailError')
        }
    });
    $('input[name="password"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField')
        }
    });
}
