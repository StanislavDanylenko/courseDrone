function renderOrderList(response) {
    var html = localProposalsUserTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#orderListTable');
}

function getOrders() {
    $.ajax({
        url: "http://localhost:8080/userProposals",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            var processedData = processOrderData(data);
            renderOrderList(processedData);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function cancelOrder(e) {

    var actionOrder = getID(e, '#orderListTable');

    $.ajax({
        url: "http://localhost:8080/userProposals/cancel/" + actionOrder,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getOrders();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function processOrderData(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].userInfo = data[i].user.email + ' (' + data[i].user.id + ')';
    }
    return data;
}