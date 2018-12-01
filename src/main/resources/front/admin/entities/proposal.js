function renderProposalList(response) {
    var html = proposalsTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#proposalListTable');
    setTranslateProposal();
}

function renderProposalEntity() {
    var html = proposalEntityTemplate();
    $('#mainContainer').empty().append(html);
    setTranslateProposalEntity();
}


function getProposals() {
    $.ajax({
        url: "http://localhost:8080/proposals",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionProposal = -1;
            renderProposalList(convertFromListToTableViewProposal(data));
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getProposal(id) {
    console.log('in the get proposal method, id = ' + id);
    $.ajax({
        url: "http://localhost:8080/proposals/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#proposalId').val(data.id),
            $('#proposalName').val(data.name),
            $('#proposalDescription').val(data.description),
            convertToCheckboxes(data.sensors);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createProposal() {
    renderProposalEntity();
    var button = $('#proposalSubmitButton');
    button.bind('click', saveProposal);
    $('#proposalOperation')._t('addProposal');

}

function editProposal(e) {
    var id = getID(e, '#proposalListTable');
    renderProposalEntity();
    var button = $('#proposalSubmitButton');
    button.bind('click', updateProposal);
    $('#proposalOperation')._t('editProposal');
    getProposal(id);
}


function saveProposal() {

    var proposal = {
        name: $('#proposalName').val(),
        description: $('#proposalDescription').val(),
        sensors: convertFromCheckboxes()
    };

    $.ajax({
        url: "http://localhost:8080/proposals",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(proposal),
        success: function () {
            getProposals();
        },
        error: function(data) {
        }
    });

}

function updateProposal() {
    var proposal = {
        id: $('#proposalId').val(),
        name: $('#proposalName').val(),
        description: $('#proposalDescription').val(),
        sensors: convertFromCheckboxes()
    };

    $.ajax({
        url: "http://localhost:8080/proposals/" + proposal.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(proposal),
        success: function () {
            getProposals();
        },
        error: function(data) {
        }
    });
}

function deleteProposal(e) {

    actionProposal = getID(e, '#proposalListTable');

    $.ajax({
        url: "http://localhost:8080/proposals/" + actionProposal,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getProposals();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function convertFromListToTableViewProposal(data) {
    var lengthDataList = data.length;
    for (var i = 0; i < lengthDataList; i++) {
        data[i].sensorsList = data[i].sensors.join(', ');
    }
    return data;
}

function convertFromCheckboxes() {
    var sensorList = [];

    if ($('#HUMIDITY').is(":checked")) {
        sensorList.push("HUMIDITY");
    }

    if ($('#RADIATION').is(":checked")) {
        sensorList.push("RADIATION");
    }

    if ($('#PRESSURE').is(":checked")) {
        sensorList.push("PRESSURE");
    }

    if ($('#AIR_POLLUTION').is(":checked")) {
        sensorList.push("AIR_POLLUTION");
    }

    if ($('#CAMERA').is(":checked")) {
        sensorList.push("CAMERA");
    }

    if ($('#TEMPERATURE').is(":checked")) {
        sensorList.push("TEMPERATURE");
    }

    return sensorList;
}

function convertToCheckboxes(data) {
    var length = data.length;

    for (var i = 0; i < length; i++) {
        checkSensorAndSetValue(data[i]);
    }

}

function checkSensorAndSetValue(sensor) {
    switch (sensor) {
        case "HUMIDITY":
            $('#HUMIDITY').prop('checked', true);
            break;
        case "RADIATION":
            $('#RADIATION').prop('checked', true);
            break;
        case "PRESSURE":
            $('#PRESSURE').prop('checked', true);
            break;
        case "AIR_POLLUTION":
            $('#AIR_POLLUTION').prop('checked', true);
            break;
        case "CAMERA":
            $('#CAMERA').prop('checked', true);
            break;
        case "TEMPERATURE":
            $('#TEMPERATURE').prop('checked', true);
            break;
    }
}
