function calculate() {
    clearFields();
    getInfo();
}

function getInfo() {

    if (!$('#calculatorForm').valid()) {
        return;
    }

    var latitude =  $('#posX').val();
    var longitude = $('#posY').val();

    $.ajax({
        url: "http://localhost:8080/calculator/" + latitude + "/" + longitude,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#resultDistance').text($.i18n._('maxTime') + data.distance + 'm');
            $('#resultPoint').text($.i18n._('nearestPoint') + data.name);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while getting distance info');
        }});
}

function clearFields() {
    $('#resultDistance').text('');
    $('#resultPoint').text('');
}

function setTranslation() {
    $('#posXLabel')._t("latitude");
    $('#posYLabel')._t("longitude");
    $('#exampleModalLabel')._t("calculatorTime");
    $('#calculatorCancelButton')._t("cancel");
    $('#calculatorCheckButton')._t("calculate");
    initValidatorCalculator();
    swapLocale();
}

function initValidatorCalculator() {
    $('#calculatorForm').validate({
        rules: {
            posX: {
                required: true,
                number: true
            },
            posY: {
                required: true,
                number: true
            }
        },
        messages: {
            posX: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            },
            posY: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            }
        }
    });
}

function swapLocale() {
    $('input[name="posX"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField'),
            number: $.i18n._('validNumber')
        }
    });
    $('input[name="posY"]').rules('add', {
        messages: {
            required: $.i18n._('requiredField'),
            number: $.i18n._('validNumber')
        }
    });
}