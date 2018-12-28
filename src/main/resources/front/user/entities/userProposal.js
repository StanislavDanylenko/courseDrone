function renderOrdinalProposalUserEntity() {
    var html = userOrdinalProposalTemplate();
    var select = userOrdinalProposalEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#userOrdinalProposalSelect').empty().append(select);
    setTranslateProposalUser();
}

function renderProposalsList(data) {
    var html = currentProposalTemplate(data);
    $('#currentProposal').empty().append(html);
    setTranslateProposalUser();
    for (var i = 0; i < data.length; i++) {
        validateProposal('proposal' + data[i].proposalId);
    }
}

function renderLocSelect() {
        renderOrdinalProposalUserEntity();
        buildFullLocationSelectorForItem(USER.defaultPopulatedPoint, "userOrdinalProposal",
                '#userOrdinalProposalCountryId', '#userOrdinalProposalRegionId', '#userOrdinalProposalPopulatedPointId',
                '#userOrdinalProposalSelectCountry', '#userOrdinalProposalSelectRegion', '#userOrdinalProposalSelect');
}

function getUserLocalProposals(id) {
    $.ajax({
        url: "http://localhost:8080/localProposals/point/" + id + "/active/true",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            if (data.length > 0) {
                var convertedData = processUserLocalProposals(data);
                renderProposalsList(convertedData);
            } else {
                $('#currentProposal').empty()._t("noAvailableProposal");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getProposalError'))
        }});
}

function processUserLocalProposals(data) {

    for (var i = 0; i < data.length; i++) {
        data[i].pointId = data[i].populatedPoint.id;
        data[i].proposalId = data[i].proposal.id;
        data[i].title = data[i].proposal.name;
        data[i].description = data[i].proposal.description;
    }
    return data;
}


function saveUserProposalOrder(e) {

    var info = getInfoFromProposalPanel(e);

    var order = {
        userId: USER.id,
        populatedPointId: info.populatedPointId,
        proposalId: info.proposalId,
        targetCoordinates: [info.x, info.y]
    };

    if (!$('#proposal' + order.proposalId).valid()) {
        alert("here");
        return;
    }


    $.ajax({
        url: "http://localhost:8080/userProposals",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(order),
        success: function () {
            getAllOrders();
        },
        error: function(data) {
            alert($.i18n._('saveOrderError'))
        }
    });

}

function getInfoFromProposalPanel(e) {
    var info = {};

    var coordDiv = $(e.target).parent();
    info.x = coordDiv[0].childNodes[5].childNodes[1].childNodes[1].childNodes[3].value;
    info.y = coordDiv[0].childNodes[5].childNodes[1].childNodes[3].childNodes[3].value;

    var parentDiv = $(e.target).parent().parent();
    info.populatedPointId = parentDiv[0].childNodes[1].childNodes[1].value;
    info.proposalId = parentDiv[0].childNodes[1].childNodes[3].value;

    return info;
}


// todo cannot do refactor
function changeUserOrdinalProposalRegion() {
    var countryId = $('#userOrdinalProposalCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionItem(regions, "userOrdinalProposal", '#userOrdinalProposalSelectRegion');
    $('#userOrdinalProposalRegionId').val(regions[0].id);
    $('#userOrdinalProposalRegionId').change();
}

function changeUserOrdinalProposalPopulatedPoint() {
    var regionId = $('#userOrdinalProposalRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointItem(points, "userOrdinalProposal", '#userOrdinalProposalSelect');
    $('#userOrdinalProposalPopulatedPointId').val(points[0].id);
    $('#userOrdinalProposalPopulatedPointId').change();
}

function changeUserOrdinalProposalList() {
    var pointId = $('#userOrdinalProposalPopulatedPointId').val();
    getUserLocalProposals(pointId);
}

////// validation

function validateProposal(id) {

    $('#' + id).validate({
        rules: {
            latitude: {
                required: true,
                number: true
            },
            longitude: {
                required: true,
                number: true
            }
        },
        messages: {
            latitude: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            },
            longitude: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            }
        }
    });

}
