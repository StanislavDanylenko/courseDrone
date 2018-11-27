function renderCountryList(response) {
    var html = countriesTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#countryListTable');
}

function renderCountryEntity() {
    var html = countryEntityTemplate();
    $('#mainContainer').empty().append(html);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
    }});
}


function createCountry() {
     renderCountryEntity();
     var button = $('#countrySubmitButton');
     button.bind('click', saveCountry);
     $('#countryOperation').text('Add country');

}

function editCountry(e) {
    var id = getID(e, '#countryListTable');
    renderCountryEntity();
    var button = $('#countrySubmitButton');
    button.bind('click', updateCountry);
    $('#countryOperation').text('Update country');
    getCountry(id);
}


function saveCountry() {
    
    var country = {
        name: $('#countryName').val()
    };
    
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
        }
    });

}

function updateCountry() {
    var country = {
        id: $('#countryId').val(),
        name: $('#countryName').val()
    };
    
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
            console.log(xhr.status);
            console.log(xhr.responseText);
    }});
}