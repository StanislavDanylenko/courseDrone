function renderLocalProposalList(response) {
    var html = localProposalsTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#localProposalListTable');
    setTranslateLocalProposal();
}

function renderLocalProposalEntity() {
    var html = localProposalEntityTemplate();
    var select = localProposalEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#localProposalSelect').empty().append(select);
}

function renderSelectProposalLocalProposal(data) {
    var html = localProposalEntitySelectProposalTemplate(data);
    $('#localProposalProposalSelect').empty().append(html);
    setTranslateLocalProposalEntity();
}

function getLocalProposals() {
    $.ajax({
        url: "http://localhost:8080/localProposals",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionLocalProposal = -1;
            var convertedData = processDataForTaleLocalPropose(data);
            renderLocalProposalList(convertedData);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getLocalProposal(e) {

    var actionLocalProposalProposalId = getID(e, '#localProposalListTable');
    var actionLocalProposalPointId = getIDSecondColumn(e, '#localProposalListTable');

    var getLocalProposalObject = {
        proposalId: actionLocalProposalProposalId.substr(actionLocalProposalProposalId.lastIndexOf('(') + 1, 1),
        populatedPointId: actionLocalProposalPointId.substr(actionLocalProposalPointId.lastIndexOf('(') + 1, 1)
    };

    $.ajax({
        url: "http://localhost:8080/localProposals/pk",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(getLocalProposalObject),
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderLocalProposalEntity();
            var button = $('#localProposalSubmitButton');
            button.bind('click', updateLocalProposal);
            $('#localProposalOperation')._t('editLocalProposal');
            hideLocalProposalEditFields();
            $('#localProposalId').val(data.id);
            $('#localProposalPriceId').val(data.price);
            $('#editedLocalProposalProposalId').val(data.proposal.id);
            $('#editedLocalProposalPopulatedPointId').val(data.populatedPoint.id);
            setIsLocalProposalNonBlocked(data.isActive);
            setTranslateLocalProposalEntity();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getProposalsLocalProposal() {
    $.ajax({
        url: "http://localhost:8080/proposals/",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderSelectProposalLocalProposal(data)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createLocalProposal() {
    renderLocalProposalEntity();
    var button = $('#localProposalSubmitButton');
    button.bind('click', saveLocalProposal);
    $('#localProposalOperation')._t('addLocalProposal');
    buildFullLocationSelectorForItem(null, "localProposal",
        '#localProposalCountryId','#localProposalRegionId', '#localProposalPopulatedPointId',
        '#localProposalSelectCountry', '#localProposalSelectRegion', '#localProposalSelect');
    getProposalsLocalProposal();
}

function editLocalProposal(e) {
    getLocalProposal(e);
}


function saveLocalProposal() {

    var localProposal = {
        proposalId: $('#localProposalProposalId').val(),
        populatedPointId: $('#localProposalPopulatedPointId').val(),
        price: getPriceOfLocalProposal(),
        isActive: getIsLocalProposalNonBlocked()
    };

    $.ajax({
        url: "http://localhost:8080/localProposals",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(localProposal),
        success: function () {
            getLocalProposals();
        },
        error: function(data) {
        }
    });

}

function updateLocalProposal() {
    var localProposal = {
        proposalId: $('#editedLocalProposalProposalId').val(),
        populatedPointId: $('#editedLocalProposalPopulatedPointId').val(),
        price: getPriceOfLocalProposal(),
        isActive: getIsLocalProposalNonBlocked()
    };

    $.ajax({
        url: "http://localhost:8080/localProposals/",
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(localProposal),
        success: function () {
            getLocalProposals();
        },
        error: function(data) {
        }
    });
}

function deleteLocalProposal(e) {

    var actionLocalProposalProposalId = getID(e, '#localProposalListTable');
    var actionLocalProposalPointId = getIDSecondColumn(e, '#localProposalListTable');

    deleteLocalProposal = {
        proposalId: actionLocalProposalProposalId.substr(actionLocalProposalProposalId.lastIndexOf('(') + 1, 1),
        populatedPointId: actionLocalProposalPointId.substr(actionLocalProposalPointId.lastIndexOf('(') + 1, 1)
    };

    $.ajax({
        url: "http://localhost:8080/localProposals/",
        xhrFields: { withCredentials: true },
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(deleteLocalProposal),
        success: function () {
            getLocalProposals();
        },
        error: function() {
            getLocalProposals();
        }});
}


function processDataForTaleLocalPropose(data) {

    for (var i = 0; i < data.length; i++) {
        data[i].populatedPointInfo = data[i].populatedPoint.name + '(' + data[i].populatedPoint.id + ')';
        data[i].proposalInfo = data[i].proposal.name + '(' + data[i].proposal.id + ')';
    }
    return data;
}



function getIsLocalProposalNonBlocked() {
    if($('#localProposalAvailable').is(":checked")){
        return true;
    }
    return false;
}

function setIsLocalProposalNonBlocked(data) {
    if (data != null && data === true) {
        $('#localProposalAvailable').prop("checked", true);
        $('#localProposalUnavailable').prop("checked", false);
    } else {
        $('#localProposalAvailable').prop("checked", false);
        $('#localProposalUnavailable').prop("checked", true);
    }
}

function getPriceOfLocalProposal() {
    var price = $('#localProposalPriceId').val();
    return price.replace(/,/, '.');
}

function hideLocalProposalEditFields() {
    $('#localProposalProposalSelect').hide();
    $('#localProposalSelectCountry').hide();
    $('#localProposalSelectRegion').hide();
    $('#localProposalSelect').hide();
}


// todo cannot do refactor
function changeLocalProposalRegion() {
    var countryId = $('#localProposalCountryId').val();
    var regions;

    for(var i = 0; i < allLocation.length; i++) {
        if (allLocation[i].id == countryId) {
            regions = allLocation[i].regions;
        }
    }

    renderSelectRegionItem(regions, "localProposal", '#localProposalSelectRegion');
    $('#localProposalRegionId').val(regions[0].id);
    $('#localProposalRegionId').change();
}

function changeLocalProposalPopulatedPoint() {
    var regionId = $('#localProposalRegionId').val();
    var points;

    for(var i = 0; i < allRegions.length; i++) {
        if (allRegions[i].id == regionId) {
            points = allRegions[i].populatedPoints;
        }
    }
    renderSelectPopulatedPointItem(points, "localProposal", '#localProposalSelect');
    $('#localProposalPopulatedPointId').val(points[0].id);
    $('#localProposalPopulatedPointId').change();
}
