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
        validateUserLogin();
    });
    validateUserLogin();
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

function validateUserLogin() {

    $('#loginForm').validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: $.i18n._('requiredField')
            },
            password: {
                required: $.i18n._('requiredField')
            }
        }
    });

}
