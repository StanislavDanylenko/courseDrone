function renderDroneList(response) {
    var html = dronesTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#droneListTable');
    setTranslateDrone();
}

function renderDroneEntity() {
    var html = droneEntityTemplate();
    var select = droneEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#droneSelect').empty().append(select);
    setTranslateDroneEntity();
    validateDrone();
}
//
function renderSelectPopulatedPoint(data) {
    var html = droneEntitySelectTemplate(data)
    $('#droneSelect').empty().append(html);
}

function renderSensor() {
    var html = droneSensorTemplate();
    $('#sensorList').append(html);
    setTranslateDroneEntity();
}

function renderSensorList(data) {
    var html = droneSensorListTemplate(data);
    $('#droneSensorListPlace').empty().append(html);
    setTranslateDroneEntity();
}

function deleteForm(e) {
    $(e.target).parent().remove();
}

function getDrones() {
    $.ajax({
        url: "http://localhost:8080/drones",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionDrone = -1;
            var convertedData = convertFromListToTableViewDrone(data);
            renderDroneList(convertedData);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getDroneListError'));
        }});
}
//
function getPopulatedPointForSelect(populatedPointId) {
    $.ajax({
        url: "http://localhost:8080/points",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderSelectPopulatedPoint(data);
            $("#dronePopulatedPointId").val(populatedPointId);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getPopPointListError'));
        }});
}

function getDrone(id) {

    $.ajax({
        url: "http://localhost:8080/drones/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#droneId').val(data.id);
            $('#droneName').val(data.name);
            setAvailabilityOfDrone(data.isAvailable);
            hideUnnesseseryFields();
            // getPopulatedPointForSelect(data.populatedPoint.id);
            buildFullLocationSelectorForItem(data.populatedPoint.id, "drone",
                '#droneCountryId','#droneRegionId', '#dronePopulatedPointId',
                '#droneSelectCountry', '#droneSelectRegion', '#droneSelect');
            getSensorsForDrone(data.id);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getDroneError'));
        }});
}

function getSensorsForDrone(id) {
    $.ajax({
        url: "http://localhost:8080/sensors/drone/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderSensorList(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getSensorListError'));
        }});
}


function createDrone() {
    renderDroneEntity();
    var button = $('#droneSubmitButton');
    button.bind('click', saveDrone);
    $('#droneOperation')._t('addDrone');
    // getPopulatedPointForSelect();
    buildFullLocationSelectorForItem(null, "drone",
        '#droneCountryId','#droneRegionId', '#dronePopulatedPointId',
        '#droneSelectCountry', '#droneSelectRegion', '#droneSelect');
    $('#droneBattery').val(100);
    renderSensor();
}

function editDrone(e) {
    var id = getID(e, '#droneListTable');
    actionDrone = id;
    renderDroneEntity();
    var button = $('#droneSubmitButton');
    button.bind('click', updateDrone);
    $('#droneOperation')._t('editDrone');
    getDrone(id);
}


function saveDrone() {

    var drone = {
        name: $('#droneName').val(),
        mac: $('#droneMac').val(),
        batteryLevel: $('#droneBattery').val(),
        isAvailable: getAvailabilityOfDrone(),
        /*currentCoordinates: getCoordinates(),*/
        sensors: getSensors(),
        populatedPointId: $('#dronePopulatedPointId').val()
    };

    if (!$('#droneForm').valid()) {
        return;
    }

    $.ajax({
        url: "http://localhost:8080/drones",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(drone),
        success: function () {
            getDrones();
        },
        error: function(data) {
            alert($.i18n._('saveDroneError'));
        }
    });

}

function updateDrone() {
    var drone = {
        id: $('#droneId').val(),
        name: $('#droneName').val(),
        isAvailable: getAvailabilityOfDrone(),
        sensors: getAllSensors(),
        populatedPointId: $('#dronePopulatedPointId').val()
    };

    if (!$('#droneForm').valid()) {
        return;
    }

    $.ajax({
        url: "http://localhost:8080/drones/" + drone.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(drone),
        success: function () {
            getDrones();
        },
        error: function(data) {
            alert($.i18n._('updateDroneError'));
        }
    });
}

function deleteDrone(e) {

    actionDrone = getID(e, '#droneListTable');

    $.ajax({
        url: "http://localhost:8080/drones/" + actionDrone,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getDrones();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('deleteDroneError'));
        }});
}

function deleteSensor(e) {

    actionSensor = getID(e, '#droneSensorListTable');

    $.ajax({
        url: "http://localhost:8080/sensors/" + actionSensor,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getSensorsForDrone(actionDrone);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('deleteSensorError'));
        }});
}

function changeBatteryLevel() {
    $('#droneBatteryLevel').text($('#droneBattery').val());
}


function convertFromListToTableViewDrone(data) {

    var lengthDataList = data.length;
    for (var i = 0; i < lengthDataList; i++) {
        var sensorValueString = '';
        var sensorsI = data[i].sensors;
        for (var j = 0; j < data[i].sensors.length; j++) {
            sensorValueString += ', ' + sensorsI[j].name + '[' + sensorsI[j].type + ']';
        }
        data[i].sensorsList = sensorValueString.substr(1);
        data[i].location = data[i].populatedPoint.name;
        if (data[i].currentLocation != null) {
            data[i].currentLocations = data[i].currentLocation[0] + ', ' + data[i].currentLocation[1];
        }
    }

    return data;
}

function getAvailabilityOfDrone() {
    if($('#droneAvailable').is(":checked")){
        return true;
    }
    return false;
}

function setAvailabilityOfDrone(data) {
    if (data != null && data === true) {
        $('#droneAvailable').prop("checked", true);
        $('#droneUnavailable').prop("checked", false);
    } else {
        $('#droneAvailable').prop("checked", false);
        $('#droneUnavailable').prop("checked", true);
    }
}

/*function getCoordinates() {
    if (($('#droneX').val() != -1000000) && ($('#droneY').val() != -1000000)) {
        return [$('#droneX').val(), $('#droneY').val()];
    }
    return null;
}*/

function getAllSensors() {
    var sensors = getSensors();
    sensors = sensors.concat(getSensorsFromTable());
    return sensors;
}

function getSensors() {
    var sensors = $('.dsensor');
    var sensorsVal = [];

    if (sensors.length > 0) {
        for (var i = 0; i < sensors.length; i++) {
            var temp = {};
            temp.name = sensors[i].childNodes[3].childNodes[3].value;
            temp.type = sensors[i].childNodes[7].value;
            sensorsVal[i] = temp;
        }
    }

    return sensorsVal;
}

function getSensorsFromTable() {
    var sensorsListFromTable = [];
    $.each($('#droneSensorListTable tr'), function (ind, item) {
        if ($.isNumeric(item.cells[0].innerHTML)) {
            var sens = {};
            sens.id = item.cells[0].innerHTML;
            sens.name = item.cells[1].innerHTML;
            sens.type = item.cells[2].innerHTML;
            sensorsListFromTable.push(sens);
        }

    });
    return sensorsListFromTable;
}

function hideUnnesseseryFields() {
    $('#hideDroneBattery').hide();
    $('#hideDroneMAC').hide();
    // $('#hideDroneCoordinates').hide();
    $('#droneName').prop('readonly', true);
}

//------------------
function changeDroneRegion() {
    var countryId = $('#droneCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionItem(regions, "drone", '#droneSelectRegion');
    $('#droneRegionId').val(regions[0].id);
    $('#droneRegionId').change();
}

function changeDronePopulatedPoint() {
    var regionId = $('#droneRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointItem(points, "drone", '#droneSelect');
    $('#dronePopulatedPointId').val(points[0].id);
    $('#dronePopulatedPointId').change();
}

//////////

function validateDrone() {

    $('#droneForm').validate({
        rules: {
            droneName: {
                required: true
            },
            droneMac: {
                required: true
            }
        },
        messages: {
            droneName: {
                required: $.i18n._('requiredField')
            },
            droneMac: {
                required: $.i18n._('requiredField')
            }
        }
    });

}