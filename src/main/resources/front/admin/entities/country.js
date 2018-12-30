function renderCountryList(response) {
    var html = countriesTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#countryListTable');
    setTranslateCountry();
}

function renderCountryEntity() {
    var html = countryEntityTemplate();
    $('#mainContainer').empty().append(html);
    setTranslateCountryEntity();
    validateCountry();
}


function getCountries() {
     $.ajax({
        url: "http://localhost:8080/countries",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionCountry = -1;
           renderCountryList(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getCountryListError'));
    }});
}

function getCountry(id) {
    console.log('in the get country method, id = ' + id);
    $.ajax({
        url: "http://localhost:8080/countries/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#countryId').val(data.id)
            $('#countryName').val(data.name)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getCountryError'));
    }});
}


function createCountry() {
     renderCountryEntity();
     var button = $('#countrySubmitButton');
     button.bind('click', saveCountry);
     $('#countryOperation')._t('addCountry');

}

function editCountry(e) {
    var id = getID(e, '#countryListTable');
    renderCountryEntity();
    var button = $('#countrySubmitButton');
    button.bind('click', updateCountry);
    $('#countryOperation')._t('editCountry');
    getCountry(id);
}


function saveCountry() {
    
    var country = {
        name: $('#countryName').val()
    };

    if (!$('#countryForm').valid()) {
        return;
    }
    
    $.ajax({
        url: "http://localhost:8080/countries",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(country),
        success: function () {
            getCountries();
        },
        error: function(data) {
            alert($.i18n._('saveCountryError'));
        }
    });

}

function updateCountry() {
    var country = {
        id: $('#countryId').val(),
        name: $('#countryName').val()
    };

    if (!$('#countryForm').valid()) {
        return;
    }

    $.ajax({
        url: "http://localhost:8080/countries/" + country.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(country),
        success: function () {
            getCountries();
        },
        error: function(data) {
            alert($.i18n._('updateCountryError'));
        }
    });
}

function deleteCountry(e) {
            
    actionCountry = getID(e, '#countryListTable');

    $.ajax({
        url: "http://localhost:8080/countries/" + actionCountry,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getCountries();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('deleteCountryError'));
    }});
}

//////////

function validateCountry() {

    $('#countryForm').validate({
        rules: {
            countryName: {
                required: true
            }
        },
        messages: {
            countryName: {
                required: $.i18n._('requiredField')
            }
        }
    });

}