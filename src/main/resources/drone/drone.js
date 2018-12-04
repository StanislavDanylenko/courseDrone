$(document).ready(function () {

    $(document).on('click', '#getDroneInfoByMac', function () {
        getDrone($('#mac1').val());
    })

});

function getDrone(mac) {

    $.ajax({
        url: "http://localhost:8080/drones/mac/" + mac,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}