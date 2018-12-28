var userOldOrderTemplate;
var userReportTemplate;
var orderList;

var userOrdinalEntityTemplate;
var userOrdinalEntitySelectTemplate;
var userOrdinalEntitySelectCountryTemplate;
var userOrdinalEntitySelectRegionTemplate;

var userOrdinalProposalTemplate;
var currentProposalTemplate;
var userOrdinalProposalEntitySelectTemplate;
var userOrdinalProposalEntitySelectCountryTemplate;
var userOrdinalProposalEntitySelectRegionTemplate;

$(document).ready(function() {

    loadUserLS();
    loadJSONs();
    checkUSER();
    $.i18n.load(locale);
    setTranslateUser();

    $(document).on('click', '#logout', logout);

    loadOrders();
    loadProposls();
    loadCurrentProposal();

    $(window).on('hashchange', function () {
        checkHash();
    });

    checkHash();

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

function loadOrders() {
    userOldOrderTemplate = Handlebars.compile($('#oldProposalListTemplate').html());
    userReportTemplate = Handlebars.compile($('#reportListTemplate').html());

    //$(document).on('click', '#getUserHistory', getOldOrders);
    // $(document).on('click', '#getUserCanceled', getCanceledOrders);
    // $(document).on('click', '#getUserAllOrders', getAllOrders);
    $(document).on('click', '#updateUserOrderStatusButton', getAllOrders);

    $(document).on('click', '.info-order', getReport);
}

function loadProposls() {
    userOrdinalEntityTemplate = Handlebars.compile($('#userOrdinalEntity').html());
    userOrdinalEntitySelectTemplate = Handlebars.compile($('#userOrdinalSelectEntity').html());
    userOrdinalEntitySelectCountryTemplate = Handlebars.compile($('#userOrdinalCountrySelectEntity').html());
    userOrdinalEntitySelectRegionTemplate = Handlebars.compile($('#userOrdinalRegionSelectEntity').html());

    $(document).on('change', '#userOrdinalCountryId', changeUserOrdinalRegion);
    $(document).on('change', '#userOrdinalRegionId', changeUserOrdinalPopulatedPoint);

    $(document).on('click', '#userOrdinalSubmitButton', updateOrdinalUser);
    // $(document).on('click', '#getUserProfile', getOrdinalUser);

    $(document).on('click', '#submitUpdatePassword', updateUserPassword);
}

function loadCurrentProposal() {
    userOrdinalProposalTemplate = Handlebars.compile($('#userProposalEntity').html());
    currentProposalTemplate = Handlebars.compile($('#currentProposalEntity').html());
    userOrdinalProposalEntitySelectTemplate = Handlebars.compile($('#userOrdinalProposalSelectEntity').html());
    userOrdinalProposalEntitySelectCountryTemplate = Handlebars.compile($('#userOrdinalProposalCountrySelectEntity').html());
    userOrdinalProposalEntitySelectRegionTemplate = Handlebars.compile($('#userOrdinalProposalRegionSelectEntity').html());

    $(document).on('change', '#userOrdinalProposalCountryId', changeUserOrdinalProposalRegion);
    $(document).on('change', '#userOrdinalProposalRegionId', changeUserOrdinalProposalPopulatedPoint);
    $(document).on('change', '#userOrdinalProposalPopulatedPointId', changeUserOrdinalProposalList);

    $(document).on('click', '#addOrder', renderLocSelect);
    $(document).on('click', '.buy-order', saveUserProposalOrder);
}

function setDataTeble(tableName) {

    var lang;
    switch (USER.localization) {
        case "UKRAINIAN":
            lang = {
                "sProcessing":   "Зачекайте...",
                "sLengthMenu":   "Показати _MENU_ записів",
                "sZeroRecords":  "Записи відсутні.",
                "sInfo":         "Записи з _START_ по _END_ із _TOTAL_ записів",
                "sInfoEmpty":    "Записи з 0 по 0 із 0 записів",
                "sInfoFiltered": "(відфільтровано з _MAX_ записів)",
                "sInfoPostFix":  "",
                "sSearch":       "Пошук:",
                "sUrl":          "",
                "oPaginate": {
                    "sFirst": "Перша",
                    "sPrevious": "Попередня",
                    "sNext": "Наступна",
                    "sLast": "Остання"
                },
                "oAria": {
                    "sSortAscending":  ": активувати для сортування стовпців за зростанням",
                    "sSortDescending": ": активувати для сортування стовпців за спаданням"
                }
            };
            break;
        case "ENGLISH":
            lang = {
                "sEmptyTable":     "No data available in table",
                "sInfo":           "Showing _START_ to _END_ of _TOTAL_ entries",
                "sInfoEmpty":      "Showing 0 to 0 of 0 entries",
                "sInfoFiltered":   "(filtered from _MAX_ total entries)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ",",
                "sLengthMenu":     "Show _MENU_ entries",
                "sLoadingRecords": "Loading...",
                "sProcessing":     "Processing...",
                "sSearch":         "Search:",
                "sZeroRecords":    "No matching records found",
                "oPaginate": {
                    "sFirst":    "First",
                    "sLast":     "Last",
                    "sNext":     "Next",
                    "sPrevious": "Previous"
                },
                "oAria": {
                    "sSortAscending":  ": activate to sort column ascending",
                    "sSortDescending": ": activate to sort column descending"
                }
        };
            break;
    }

    $(tableName).DataTable( {
        "language": lang
    } );
}

function getID(e, tableId) {
    var rowIndex = $(e.target).parent().parent().index() + 1;
    var id = $(tableId +' tr').eq(rowIndex).find('td').eq(0).html();
    console.log(rowIndex + "   " + id);
    return id;
}

function checkHash() {
    switch (window.location.hash) {
        case "#all": getAllOrders();
            break;
        case "#history": getOldOrders();
            break;
        case "#canceled": getCanceledOrders();
            break;
        case "#profile": getOrdinalUser();
            break;
        case "#home": renderHome();
            break;
        default: renderHome();
    }
}