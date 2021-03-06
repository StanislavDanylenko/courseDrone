var actionCountry;
var actionRegion;
var actionPopulatedPoint;
var actionProposal;
var actionDrone;
var actionSensor;
var actionUser;
var actionLocalProposal;


var countriesTemplate;
var countryEntityTemplate;

var regionsTemplate;
var regionEntityTemplate;
var regionEntitySelectTemplate;

var populatedPointsTemplate;
var populatedPointEntityTemplate;
var populatedPointEntitySelectTemplate;

var proposalsTemplate;
var proposalEntityTemplate;

var dronesTemplate;
var droneEntityTemplate;
var droneEntitySelectTemplate;
var droneEntitySelectCountryTemplate;
var droneEntitySelectRegionTemplate;
var droneSensorTemplate;
var droneSensorListTemplate;

var usersTemplate;
var userEntityTemplate;
var userEntitySelectTemplate;
var userEntitySelectCountryTemplate;
var userEntitySelectRegionTemplate;

var localProposalsTemplate;
var localProposalEntityTemplate;
var localProposalEntitySelectTemplate;
var localProposalEntitySelectCountryTemplate;
var localProposalEntitySelectRegionTemplate;
var localProposalEntitySelectProposalTemplate;

var localProposalsUserTemplate;

var allLocation;
var allRegions;

var userOrdinalEntityTemplate;
var userOrdinalEntitySelectTemplate;
var userOrdinalEntitySelectCountryTemplate;
var userOrdinalEntitySelectRegionTemplate;


$(document).ready(function() {

    $(document).on('click', '#logout', logout);

    // country
    loadCountry();
    // region
    loadRegion();
    // populated point
    loadPopulatedPoint();
    // proposal
    loadProposal();
    // drone with sensors
    loadDrone();
    // user
    loadUser();
    // local proposal
    loadLocalProposal();
    // order
    loadLocalProposalUser();
    // profile
    loadProfileUser();

    loadUserLS();
    // console.log(USER.localization);
    loadJSONs();
    checkUSER();
    $.i18n.load(locale);
    setTranslateAdmin();

    $(window).on('hashchange', function () {
        checkHashAdmin();
    });

    checkHashAdmin();

    $.validator.addMethod("samePassword", function(value, element) {
        var firstValue = $('#userNewPassword').val();
        return value == firstValue;

    }, $.i18n._('samePassword'));
    validatePassword();
});

function loadCountry() {
    countriesTemplate = Handlebars.compile($('#countryListTemplate').html());
    countryEntityTemplate = Handlebars.compile($('#countryEntity').html());

    // $(document).on('click', '#getCountries', getCountries);
    $(document).on('click', '#addCountry', createCountry);
    $(document).on('click', '.edit-country', editCountry);
    $(document).on('click', '.delete-county', deleteCountry);
}

function loadRegion() {
    regionsTemplate = Handlebars.compile($('#regionListTemplate').html());
    regionEntityTemplate = Handlebars.compile($('#regionEntity').html());
    regionEntitySelectTemplate = Handlebars.compile($('#regionSelectEntity').html());

    // $(document).on('click', '#getRegions', getRegions);
    $(document).on('click', '#addRegion', createRegion);
    $(document).on('click', '.edit-region', editRegion);
    $(document).on('click', '.delete-region', deleteRegion);
}

function loadPopulatedPoint() {
    populatedPointsTemplate = Handlebars.compile($('#populatedPointListTemplate').html());
    populatedPointEntityTemplate = Handlebars.compile($('#populatedPointEntity').html());
    populatedPointEntitySelectTemplate = Handlebars.compile($('#populatedPointSelectEntity').html());

    // $(document).on('click', '#getPopulatedPoints', getPopulatedPoints);
    $(document).on('click', '#addPopulatedPoint', createPopulatedPoint);
    $(document).on('click', '.edit-point', editPopulatedPoint);
    $(document).on('click', '.delete-point', deletePopulatedPoint);
}

function loadProposal() {
    proposalsTemplate = Handlebars.compile($('#proposalListTemplate').html());
    proposalEntityTemplate = Handlebars.compile($('#proposalEntity').html());

    // $(document).on('click', '#getProposals', getProposals);
    $(document).on('click', '#addProposal', createProposal);
    $(document).on('click', '.edit-proposal', editProposal);
    $(document).on('click', '.delete-proposal', deleteProposal);
}

function loadDrone() {
    dronesTemplate = Handlebars.compile($('#droneListTemplate').html());
    droneEntityTemplate = Handlebars.compile($('#droneEntity').html());
    droneEntitySelectTemplate = Handlebars.compile($('#droneSelectEntity').html());
    droneSensorTemplate = Handlebars.compile($('#droneSensor').html());
    droneSensorListTemplate = Handlebars.compile($('#droneSensorList').html());
    droneEntitySelectCountryTemplate = Handlebars.compile($('#droneCountrySelectEntity').html());
    droneEntitySelectRegionTemplate = Handlebars.compile($('#droneRegionSelectEntity').html());

    // $(document).on('click', '#getDrones', getDrones);
    $(document).on('click', '#addDrone', createDrone);

    $(document).on('change', '#droneCountryId', changeDroneRegion);
    $(document).on('change', '#droneRegionId', changeDronePopulatedPoint);

    $(document).on('click', '.edit-drone', editDrone);
    $(document).on('click', '.delete-drone', deleteDrone);

    $(document).on('click', '.delete-sensor', deleteSensor);

    $(document).on('change', '#droneBattery', changeBatteryLevel);
    $(document).on('click', '#addDroneSensor', renderSensor);
    $(document).on('click', '.delete-parent-form', deleteForm);
}

function loadUser(){
    usersTemplate = Handlebars.compile($('#userListTemplate').html());
    userEntityTemplate = Handlebars.compile($('#userEntity').html());
    userEntitySelectTemplate = Handlebars.compile($('#userSelectEntity').html());
    userEntitySelectCountryTemplate = Handlebars.compile($('#userCountrySelectEntity').html());
    userEntitySelectRegionTemplate = Handlebars.compile($('#userRegionSelectEntity').html());

    // $(document).on('click', '#getUsers', getUsers);
    $(document).on('click', '#addUser', createUser);

    $(document).on('change', '#userCountryId', changeUserRegion);
    $(document).on('change', '#userRegionId', changeUserPopulatedPoint);

    $(document).on('click', '.edit-user', editUser);
    $(document).on('click', '.delete-user', deleteUser);
}

function loadLocalProposal(){
    localProposalsTemplate = Handlebars.compile($('#localProposalListTemplate').html());
    localProposalEntityTemplate = Handlebars.compile($('#localProposalEntity').html());
    localProposalEntitySelectTemplate = Handlebars.compile($('#localProposalSelectEntity').html());
    localProposalEntitySelectCountryTemplate = Handlebars.compile($('#localProposalCountrySelectEntity').html());
    localProposalEntitySelectRegionTemplate = Handlebars.compile($('#localProposalRegionSelectEntity').html());
    localProposalEntitySelectProposalTemplate = Handlebars.compile($('#localProposalProposalSelectEntity').html());

    // $(document).on('click', '#getLocalProposals', getLocalProposals);
    $(document).on('click', '#addLocalProposal', createLocalProposal);

    $(document).on('change', '#localProposalCountryId', changeLocalProposalRegion);
    $(document).on('change', '#localProposalRegionId', changeLocalProposalPopulatedPoint);

    $(document).on('click', '.edit-localProposal', editLocalProposal);
    $(document).on('click', '.delete-localProposal', deleteLocalProposal);
}

function loadLocalProposalUser(){
    localProposalsUserTemplate = Handlebars.compile($('#orderListTemplate').html());


    $(document).on('click', '#getOrders', getOrders);
    $(document).on('click', '.cancel-order', cancelOrder);
}

function loadProfileUser(){
    userOrdinalEntityTemplate = Handlebars.compile($('#userOrdinalEntity').html());
    userOrdinalEntitySelectTemplate = Handlebars.compile($('#userOrdinalSelectEntity').html());
    userOrdinalEntitySelectCountryTemplate = Handlebars.compile($('#userOrdinalCountrySelectEntity').html());
    userOrdinalEntitySelectRegionTemplate = Handlebars.compile($('#userOrdinalRegionSelectEntity').html());

    $(document).on('change', '#userOrdinalCountryId', changeUserOrdinalRegion);
    $(document).on('change', '#userOrdinalRegionId', changeUserOrdinalPopulatedPoint);

    $(document).on('click', '#userOrdinalSubmitButton', updateOrdinalUser);
    $(document).on('click', '#getUserProfile', getOrdinalUser);

    $(document).on('click', '#submitUpdatePassword', updateUserPassword);
}

/////////////// service methods
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

    $(tableName).DataTable({
            "language": lang
        }
    );
}

function getID(e, tableId) {
     var rowIndex = $(e.target).parent().parent().index() + 1;
     var id = $(tableId +' tr').eq(rowIndex).find('td').eq(0).html();
     console.log(rowIndex + "   " + id);
     return id;
}

function getIDSecondColumn(e, tableId) {
    var rowIndex = $(e.target).parent().parent().index() + 1;
    var id = $(tableId +' tr').eq(rowIndex).find('td').eq(1).html();
    console.log(rowIndex + "   " + id);
    return id;
}

/////////////// Logout

function gotoPage() {
    $(location).attr('href','../login/login.html');
}

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

function checkHashAdmin() {
    switch (window.location.hash) {
        case "#profile":
            getOrdinalUser();
            break;
        case "#home":
            renderHomeAdmin();
            break;
        case "#country":
            getCountries();
            break;
        case "#region":
            getRegions();
            break;
        case "#populatedPoint":
            getPopulatedPoints();
            break;
        case "#proposal":
            getProposals();
            break;
        case "#drone":
            getDrones();
            break;
        case "#user":
            getUsers();
            break;
        case "#localProposal":
            getLocalProposals();
            break;
        case "#order":
            getOrders();
            break;
        default:
            renderHomeAdmin();
    }
}