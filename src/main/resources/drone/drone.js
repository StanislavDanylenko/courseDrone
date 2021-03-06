var firstTemplate;
var droneTemplate;
var sensorsTemplate;
var orderTemplate;
var checkPointListTemplate;

var drone;
var sensors;

var currentStatus;
var statuses = ['NEW', 'GO_TO_TARGET_PALACE', 'PERFORMING', 'GO_TO_HOME', 'FINALIZED'];

var uuid;
var templateChangeStatus = "Change status to ";


var globalCheckPointsList = [];
var positionInCheckPointList = 0;


$(document).ready(function () {

    firstTemplate = Handlebars.compile($('#firstTemplate').html());
    droneTemplate = Handlebars.compile($('#droneEntityTemplate').html());
    sensorsTemplate = Handlebars.compile($('#sensorsEntityTemplate').html());
    orderTemplate = Handlebars.compile($('#orderTemplate').html());
    checkPointListTemplate = Handlebars.compile($('#checkPointList').html());

    $(document).on('change', '#droneBattery', changeBatteryLevel);
    $(document).on('click', '#cleanDrone', restoreLayout);
    $(document).on('click', '#sendData', updateDrone);
    $(document).on('click', '#changeStatus', changeStatus);
    $(document).on('click', '#crashOrder', crashOrder);
    $(document).on('click', '#automaticMode', automatic);

    $('#autoPanel').hide();

    fillFirstTemplate();

    $(document).on('click', '#getDroneInfoByMac', function () {
        getDrone($('#mac').val());
    })

});

//////////////////////////

function fillFirstTemplate() {
    var html = firstTemplate();
    $('#macContainer').empty().append(html);
    $('#changeStatus').prop('disabled', true);
    $('#sendData').prop('disabled', true);
    $('#statusName').text('');
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
    blockDroneSensors();
}

function fillCheckPoints(data) {

    var html = checkPointListTemplate(data);
    $('#checkPoint').empty().append(html);
}

////////////////////////////////////

function getDrone(mac) {

    $.ajax({
        url: "http://localhost:8080/drones/mac/" + mac,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            sensors = data.sensors;
            displayDroneInfo(data);
            $('#sendData').prop('disabled', false);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while getting drone');
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
            if (data.status != 'PERFORMING') {
                blockDroneSensors();
            } else {
                unblockDroneSensors();
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while getting order');
        }});
}

//////////////////////////////////////

function updateDrone() {
    var droneInfo = {
        batteryLevel: $('#droneBattery').val(),
        currentCoordinates: getCoordinates()
    };

    $.ajax({
        url: "http://localhost:8080/drones/" + drone.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(droneInfo),
        success: function () {
            alert('Succes update');
            if (uuid != undefined) {
                updateOrder();
            } else {
                getDrone(drone.mac);
            }
        },
        error: function(data) {
            alert('Error while updating drone info');
        }
    });
}

function updateOrder() {
    var order = {
        uuid: uuid,
        status: statuses[currentStatus]
    };

    if (currentStatus === 3) {
        getAllSensors();
        order.sensors = sensors;
    }

    $.ajax({
        url: "http://localhost:8080/userProposals/" + uuid,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(order),
        success: function () {
            alert('Succes update status');
            $('#changeStatus').prop('disabled', false);
            if (currentStatus == 2) {
                unblockDroneSensors();
            } else {
                blockDroneSensors();
                if (currentStatus == 4) {
                    fillFirstTemplate();
                    getDrone(drone.mac);
                    $('#mac').val(drone.mac);
                    $('#changeStatus').html(templateChangeStatus);
                }
            }
        },
        error: function(data) {
            alert('Error while updating order status');
        }
    });
}

function crashOrder() {
    $.ajax({
        url: "http://localhost:8080/userProposals/crash/" + uuid,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            fillFirstTemplate();
            getDrone(drone.mac);
            $('#mac').val(drone.mac);
            $('#changeStatus').html(templateChangeStatus);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while sending crash report');
        }});
}

/////////////////////////

function displayDroneInfo(data) {

    $('#mac').attr('readonly', true);
    drone = data;

    if (data.currentUuid == null) {
        $('#orderContainer').empty().append("<h3>No order</h3>");
        $('#sendData').prop('disabled', true);
    } else {
        uuid = data.currentUuid;
        $('#changeStatus').prop('disabled', false);
        $('#sendData').prop('disabled', false);
        $('#sendData').prop('disabled', false);
        getOrder();
    }

    console.log(data);
    data.X = data.currentLocation[0];
    data.Y = data.currentLocation[1];
    fillDrone(data);
    fillSensors(data);

    $('#droneBatteryLevel').text(data.batteryLevel);
}

function blockDroneSensors() {
    $('.sensor').prop('readonly', true);
}

function unblockDroneSensors() {
    $('.sensor').prop('readonly', false);
}


function restoreLayout() {
    fillFirstTemplate();
    $('#orderContainer').empty();
    $('#droneContainer').empty();
    $('#sensorContainer').empty();
    $('#changeStatus').html(templateChangeStatus);
    drone = undefined;
    currentStatus = undefined;
    uuid = undefined;
    sensors = undefined;
}



function processOrderInfo(data) {

    processOrderStatus(data);

    data.startX = data.startLocation[0];
    data.startY = data.startLocation[1];

    data.targetX = data.targetLocation[0];
    data.targetY = data.targetLocation[1];

    var checkPointsList = [];
    for (var item in data.checkPoints) {
        checkPointsList.push(item + ":" + data.checkPoints[item]);
        globalCheckPointsList.push([item, data.checkPoints[item]]);
    }

    data.checkPointsList = checkPointsList;
    $('#statusAuto').empty().append(data.status);

    return data;
}


function processOrderStatus(data) {

    switch (data.status) {
        case 'NEW':
            currentStatus = 0;
            break;
        case 'GO_TO_TARGET_PALACE':
            currentStatus = 1;
            break;
        case 'PERFORMING':
            currentStatus = 2;
            break;
        case 'GO_TO_HOME':
            currentStatus = 3;
            break;
        case 'FINALIZED':
            currentStatus = 4;
            break;
    }

    $('#statusName').text(statuses[currentStatus]);
    $('#changeStatus').html(templateChangeStatus + statuses[currentStatus + 1]);
}


function changeStatus() {
    if (currentStatus !== 3) {
        currentStatus += 1;
        $('#statusName').text(statuses[currentStatus]);
        $('#changeStatus').prop('disabled', true);
        $('#changeStatus').html(templateChangeStatus + statuses[currentStatus + 1]);
        if (currentStatus == 2) {

        }
    } else {
        currentStatus += 1;
        $('#statusName').text('RESOLVED');
        $('#changeStatus').prop('disabled', true);
        $('#changeStatus').html('RESOLVED');
    }
}

///////////////////////////////


function getCoordinates() {
    if (($('#droneX').val() != -1000000) && ($('#droneY').val() != -1000000)) {
        return [$('#droneX').val(), $('#droneY').val()];
    }
    return null;
}

function changeBatteryLevel() {
    $('#droneBatteryLevel').text($('#droneBattery').val());
}

function getAllSensors() {
    var sens = $('.sensor');

    for (var i = 0; i < sens.length; i++) {
        var id = sens[i].id;
        for (var j = 0; j < sensors.length; j++) {
            if (id == sensors[j].id) {
                sensors[j].value = sens[i].value;
            }
        }
    }

}

///////////////////
/////////////////// automatic mode
///////////////////


function goToEnd() {
    setTimeout(function () {
        if (positionInCheckPointList < globalCheckPointsList.length) {

            console.log('go to target - coord: ' + globalCheckPointsList[positionInCheckPointList]);
            writeLog('go to target - coord: ' + globalCheckPointsList[positionInCheckPointList]);

            drone.batteryLevel = drone.batteryLevel - 5;

            var droneInfo = {
                batteryLevel: drone.batteryLevel,
                currentCoordinates: globalCheckPointsList[positionInCheckPointList]
            };

            $.ajax({
                url: "http://localhost:8080/drones/" + drone.id,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                xhrFields: { withCredentials: true },
                data: JSON.stringify(droneInfo),
                success: function () {
                    console.log('Success update coordinates');
                    writeLog('Success update coordinates');
                    changeCoordsA(globalCheckPointsList[positionInCheckPointList]);
                },
                error: function() {
                    console.log('Error while updating drone info');
                    writeLog('Error while updating drone info');
                }
            });

            positionInCheckPointList++;
            goToEnd();

        } else {
            setTimeout(function () {
                --positionInCheckPointList;
                middleOperation();
            }, 5000);
        }
    }, 3000)
}

function goToStart() {
    setTimeout(function () {
        console.log('go to station - coord: ' + globalCheckPointsList[positionInCheckPointList]);
        writeLog('go to station - coord: ' + globalCheckPointsList[positionInCheckPointList]);

        drone.batteryLevel = drone.batteryLevel - 5;

        var droneInfo = {
            batteryLevel: drone.batteryLevel,
            currentCoordinates: globalCheckPointsList[positionInCheckPointList]
        };

        $.ajax({
            url: "http://localhost:8080/drones/" + drone.id,
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify(droneInfo),
            success: function () {
                console.log('Success update coordinates ' + droneInfo.currentCoordinates);
                writeLog('Success update coordinates ' + droneInfo.currentCoordinates);
                changeCoordsA(globalCheckPointsList[positionInCheckPointList]);
            },
            error: function() {
                console.log('Error while updating drone info');
                writeLog('Error while updating drone info');
            }
        });

        positionInCheckPointList--;
        if (positionInCheckPointList >= 0) {
            goToStart();
        } else {
            setTimeout(function () {
                endOperation();
            }, 5000);
        }
    }, 3000)
}

function middleOperation() {
    console.log("performing...");
    writeLog("performing...");


    updateOrderAutomatic(statuses[2]);

    setTimeout(function () {
        setTimeout(function () {
            goToStart();
        }, 3000);
        sensors = fillSensorsAutomatically();
        updateOrderAutomatic(statuses[3], sensors);
    }, 3000);

}

function endOperation() {
    console.log("end");
    writeLog("end");
    updateOrderAutomatic(statuses[4]);
    $('#autoPanel').hide();
    $('#mainPanel').show();
    fillFirstTemplate();
    getDrone(drone.mac);
    $('#mac').val(drone.mac);
    $('#changeStatus').html(templateChangeStatus);
}

function automatic() {
    positionInCheckPointList = 0;
    initAuto();
    goToEnd();
}

function fillSensorsAutomatically() {
    for (var i = 0; i < sensors.length; i++) {
        sensors[i].value = Math.floor(Math.random() * 100);
    }
    return sensors;
}

/*
automatic();*/

////////////

function updateOrderAutomatic(status, sensors) {

    var order = {
        uuid: uuid,
        status: status
    };

    if (sensors !== undefined) {
        order.sensors = sensors;
    }

    $.ajax({
        url: "http://localhost:8080/userProposals/" + uuid,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(order),
        success: function () {
            console.log('Success update status ' + status);
            writeLog('Success update status ' + status);
            changeStatusA(status);
        },
        error: function(data) {
            console.log('Error while updating order status');
            writeLog('Error while updating order status');
        }
    });
}

function writeLog(text) {
    $('#log').append('<p>' + text + '</p>');
}

function changeStatusA(text) {
    $('#statusAuto').empty().append(text);
}

function changeCoordsA(text) {
    $('#coordAuto').empty().append(text[0] + " : " + text[1]);
}

function initAuto() {
    $('#autoPanel').show();
    $('#mainPanel').hide();
    $('#log').empty();
    $('#coordAuto').empty().append(globalCheckPointsList[0][0] + " : " + globalCheckPointsList[0][1]);
}