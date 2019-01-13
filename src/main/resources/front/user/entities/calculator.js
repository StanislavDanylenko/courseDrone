function calculate() {
    clearFields();
    getInfo();
}

function getInfo() {

    var latitude =  $('#posX').val();
    var longitude = $('#posY').val();

    $.ajax({
        url: "http://localhost:8080/calculator/" + latitude + "/" + longitude,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#resultDistance').text('time: ' + data.distance + 'm');
            $('#resultPoint').text('name of location: ' + data.name);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while getting distance info');
        }});
}

function clearFields() {
    $('#resultDistance').text('');
    $('#resultPoint').text('');
}