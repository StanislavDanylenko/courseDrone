var userOldOrderTemplate;
var userReportTemplate;
var orderList;

var userOrdinalEntityTemplate;
var userOrdinalEntitySelectTemplate;
var userOrdinalEntitySelectCountryTemplate;
var userOrdinalEntitySelectRegionTemplate;

$(document).ready(function() {

    loadUserLS();

    $(document).on('click', '#logout', logout);

    userOldOrderTemplate = Handlebars.compile($('#oldProposalListTemplate').html());
    userReportTemplate = Handlebars.compile($('#reportListTemplate').html());

    $(document).on('click', '#getUserHistory', getOldOrders);
    $(document).on('click', '#getUserCanceled', getCanceledOrders);
    $(document).on('click', '#getUserAllOrders', getAllOrders);
    $(document).on('click', '#updateUserOrderStatusButton', getAllOrders);

    $(document).on('click', '.info-order', getReport);

    userOrdinalEntityTemplate = Handlebars.compile($('#userOrdinalEntity').html());
    userOrdinalEntitySelectTemplate = Handlebars.compile($('#userOrdinalSelectEntity').html());
    userOrdinalEntitySelectCountryTemplate = Handlebars.compile($('#userOrdinalCountrySelectEntity').html());
    userOrdinalEntitySelectRegionTemplate = Handlebars.compile($('#userOrdinalRegionSelectEntity').html());

    $(document).on('change', '#userOrdinalCountryId', changeUserOrdinalRegion);
    $(document).on('change', '#userOrdinalRegionId', changeUserOrdinalPopulatedPoint);

    $(document).on('click', '#userOrdinalSubmitButton', updateOrdinalUser);
    $(document).on('click', '#getUserProfile', getOrdinalUser);

    $(document).on('click', '#submitUpdatePassword', updateUserPassword);

});

function logout() {

    $.ajax({
        url: "http://localhost:8080/logout",
        xhrFields: { withCredentials: true },
        type: "GET",
        success: function () {
            console.log('success logout');
            gotoPage();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function gotoPage() {
    $(location).attr('href','../login/login.html');
}

function setDataTeble(tableName) {
    var table = $(tableName).DataTable( {} );
}

function getID(e, tableId) {
    var rowIndex = $(e.target).parent().parent().index() + 1;
    var id = $(tableId +' tr').eq(rowIndex).find('td').eq(0).html();
    console.log(rowIndex + "   " + id);
    return id;
}