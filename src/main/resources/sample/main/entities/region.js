function renderRegionList(response) {
    var html = regionsTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#regionListTable');
}

function renderRegionEntity() {
    var html = regionEntityTemplate();
    var select = regionEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#regionSelect').empty().append(select);
}
//
function renderSelectCountry(data) {
    var html = regionEntitySelectTemplate(data)
    $('#regionSelect').empty().append(html);
}

function getRegions() {
    $.ajax({
        url: "http://localhost:8080/regions",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionRegion = -1;
            renderRegionList(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}
//
function getCountryForSelect(countryId) {
    $.ajax({
        url: "http://localhost:8080/countries",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderSelectCountry(data);
            $("#regionCountryId").val(countryId);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getRegion(id) {
    console.log('in the get region method, id = ' + id);
    $.ajax({
        url: "http://localhost:8080/regions/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#regionId').val(data.id);
            $('#regionName').val(data.name);
            getCountryForSelect(data.countryId);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createRegion() {
    renderRegionEntity();
    var button = $('#regionSubmitButton');
    button.bind('click', saveRegion);
    $('#regionOperation').text('Add region');
    getCountryForSelect();
}

function editRegion(e) {
    var id = getID(e, '#regionListTable');
    renderRegionEntity();
    var button = $('#regionSubmitButton');
    button.bind('click', updateRegion);
    $('#regionOperation').text('Update region');
    getRegion(id);
}


function saveRegion() {

    var region = {
        name: $('#regionName').val(),
        countryId: $('#regionCountryId').val()
    };

    $.ajax({
        url: "http://localhost:8080/regions",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(region),
        success: function () {
            getRegions();
        },
        error: function(data) {
        }
    });

}

function updateRegion() {
    var region = {
        id: $('#regionId').val(),
        name: $('#regionName').val(),
        countryId: $('#regionCountryId').val()
    };

    $.ajax({
        url: "http://localhost:8080/regions/" + region.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(region),
        success: function () {
            getRegions();
        },
        error: function(data) {
        }
    });
}

function deleteRegion(e) {

    actionRegion = getID(e, '#regionListTable');

    $.ajax({
        url: "http://localhost:8080/regions/" + actionRegion,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getRegions();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}