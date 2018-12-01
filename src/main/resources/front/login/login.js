$(document).ready(function() {
    $(document).on('click', '#loginButton', authorization);
    $(document).on('click', '#registrationButton', function () {
        $(location).attr('href','../registration/registration.html');
    });
    $(document).on('change', '#localizationSwitcherLogin', function () {
        if ($('#localizationSwitcherLogin').val() == "EN") {
            $('#passwordLabel').text('Password');
            $('#loginButton').text('Sign in');
            $('#registrationButton').text('Registration');
        } else {
            $('#passwordLabel').text('Пароль');
            $('#loginButton').text('Увійти');
            $('#registrationButton').text('Зареєструватися');
        }
    });
});

function gotoPage(page) {
    $(location).attr('href',page);
}

function authorization() {
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
                    console.log(xhr.status);
                    console.log(xhr.responseText);
            }});
}

function redirect(user) {
    if (user.roles === "ADMIN") {
        gotoPage('../admin/admin.html');
    } else {
        gotoPage('../user/user.html');
    }
}
