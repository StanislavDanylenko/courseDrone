var firstTemplate;
var droneTemplate;
var sensorsTemplate;
var orderTemplate;
var checkPointListTemplate;

var drone;

var currentStatus;
var statuses = ['NEW', 'GO_TO_TARGET_PALACE', 'PERFORMING', 'GO_TO_HOME', 'FINALIZED'];

var uuid;

$(document).ready(function () {

    firstTemplate = Handlebars.compile($('#firstTemplate').html());
    droneTemplate = Handlebars.compile($('#droneEntityTemplate').html());
    sensorsTemplate = Handlebars.compile($('#sensorsEntityTemplate').html());
    orderTemplate = Handlebars.compile($('#orderTemplate').html());
    checkPointListTemplate = Handlebars.compile($('#checkPointList').html());

    $(document).on('change', '#droneBattery', changeBatteryLevel);

    fillFirstTemplate();

    $(document).on('click', '#getDroneInfoByMac', function () {
        getDrone($('#mac').val());
    })

});

function getDrone(mac) {

    $.ajax({
        url: "http://localhost:8080/drones/mac/" + mac,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#mac').attr('readonly', true);
            drone = data;
            uuid = data.currentUuid;
            console.log(data);
            data.X = data.currentLocation[0];
            data.Y = data.currentLocation[1];
            fillDrone(data);
            fillSensors(data);
            getOrder();
            $('#droneBatteryLevel').text(data.batteryLevel);

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getOrder() {

    $.ajax({
        url: "http://localhost:8080/drones/task/" + uuid,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            fillOrder(processOrderInfo(data));
            fillCheckPoints(data);

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function fillFirstTemplate() {
    var html = firstTemplate();
    $('#macContainer').empty().append(html);
}

function fillOrder(data) {
    var html = orderTemplate(data);
    $('#orderContainer').empty().append(html);
}

function fillDrone(data) {
    var html = droneTemplate(data);
    $('#droneContainer').empty().append(html);
}

function fillSensors(data) {
    var sensors = data.sensors;

    for (var i = 0; i < sensors.length; i++) {
        sensors[i].sensorInfo = sensors[i].name + '(' + sensors[i].type + ')';
    }

    var html = sensorsTemplate(sensors);
    $('#sensorContainer').empty().append(html);
}

function fillCheckPoints(data) {

    var html = checkPointListTemplate(data);
    $('#checkPoint').empty().append(html);
}

function processOrderInfo(data) {

    data.startX = data.startLocation[0];
    data.startY = data.startLocation[1];

    data.targetX = data.targetLocation[0];
    data.targetY = data.targetLocation[1];

    var checkPointsList = [];
    for (var item in data.checkPoints) {
        checkPointsList.push(item + ":" + data.checkPoints[item]);
    }

    data.checkPointsList = checkPointsList;

    return data;
}


function getCoordinates() {
    if (($('#droneX').val() != -1000000) && ($('#droneY').val() != -1000000)) {
        return [$('#droneX').val(), $('#droneY').val()];
    }
    return null;
}

function changeBatteryLevel() {
    $('#droneBatteryLevel').text($('#droneBattery').val());
}
