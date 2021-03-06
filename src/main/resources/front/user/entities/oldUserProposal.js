function renderOldOrderList(response) {
    var html = userOldOrderTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#oldProposalListTable');
    setTranslateProposalList();
}

function renderReport(response) {
    var html = userReportTemplate(response);
    $('#mainContainer').empty().append(html);
    setTranslateReport();
}

function getUserKindOrders(status) {
    $.ajax({
        url: "http://localhost:8080/userProposals/user/" + USER.id +"/status/" + status,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            var processedData = processOrderData(data);
            orderList = processedData;

            renderOldOrderList(processedData);
            switch (status) {
                case "FINALIZED":
                    hideUserUpdateButton();
                    $('#kindOfOrder')._t('finalizedOrders');
                    break;
                case "CANCELED":
                    hideUserUpdateButton();
                    $('#kindOfOrder')._t('canceledOrders');
                    break;
                default:
                    $('#kindOfOrder')._t('activeOrders');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert($.i18n._('getOrderListError'));
        }});
}

function getOldOrders() {
    getUserKindOrders('FINALIZED');
}

function getCanceledOrders() {
    getUserKindOrders('CANCELED');
}

function getAllOrders() {
    getUserKindOrders('STATUS');

}

function processOrderData(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].arrayId = i;
        data[i].populatedPointInfo = data[i].localProposal.populatedPoint.name;
        data[i].proposalInfo = data[i].localProposal.proposal.name;
    }
    return data;
}

function hideUserUpdateButton() {
    $('#updateUserOrderStatusButton').hide();
}

function getReport(e) {
    var id = getID(e, '#oldProposalListTable');
    var processedReport = processReportData(orderList[id].report);
    renderReport(processedReport);
}

function processReportData(data) {
    if(data.humidity == -9999) {
        data.humidity = '-'
    }
    if(data.radiation == -9999) {
        data.radiation = '-'
    }
    if(data.pressure == -9999) {
        data.pressure = '-'
    }
    if(data.airPollution == -9999) {
        data.airPollution = '-'
    }
    if(data.temperature == -9999) {
        data.temperature = '-'
    }
    return data;
}