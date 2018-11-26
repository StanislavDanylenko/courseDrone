$(document).ready(function() {
    $(document).on('click', '#loginButton', authorization);
    $(document).on('click', '#registrationButton', function () {
        $(location).attr('href','../registration/registration.html');
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
