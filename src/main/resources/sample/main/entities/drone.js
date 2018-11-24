function renderDroneList(response) {
    var html = dronesTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#droneListTable');
}

function renderDroneEntity() {
    var html = droneEntityTemplate();
    var select = droneEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#droneSelect').empty().append(select);
}
//
function renderSelectPopulatedPoint(data) {
    var html = droneEntitySelectTemplate(data)
    $('#droneSelect').empty().append(html);
}

function renderSensor() {
    var html = droneSensorTemplate();
    $('#sensorList').append(html);
}

function renderSensorList(data) {
    var html = droneSensorListTemplate(data);
    $('#droneSensorListPlace').empty().append(html);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
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
            getPopulatedPointForSelect(data.populatedPoint.id);
            getSensorsForDrone(data.id);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createDrone() {
    renderDroneEntity();
    var button = $('#droneSubmitButton');
    button.bind('click', saveDrone);
    $('#droneOperation').text('Add drone');
    getPopulatedPointForSelect();
    $('#droneBattery').val(100);
    renderSensor();
}

function editDrone(e) {
    var id = getID(e, '#droneListTable');
    actionDrone = id;
    renderDroneEntity();
    var button = $('#droneSubmitButton');
    button.bind('click', updateDrone);
    $('#droneOperation').text('Update drone');
    getDrone(id);
}


function saveDrone() {

    var drone = {
        name: $('#droneName').val(),
        batteryLevel: $('#droneBattery').val(),
        isAvailable: getAvailabilityOfDrone(),
        currentCoordinates: getCoordinates(),
        sensors: getSensors(),
        populatedPointId: $('#dronePopulatedPointId').val()
    };

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
            console.log(xhr.status);
            console.log(xhr.responseText);
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
            console.log(xhr.status);
            console.log(xhr.responseText);
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

function getCoordinates() {
    if (($('#droneX').val() != -1000000) && ($('#droneY').val() != -1000000)) {
        return [$('#droneX').val(), $('#droneY').val()];
    }
    return null;
}

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
    $('#hideDroneCoordinates').hide();
}