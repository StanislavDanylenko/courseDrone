var actionCountry;
var actionRegion;
var actionPopulatedPoint;
var actionProposal;
var actionDrone;
var actionSensor;
var actionUser;

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
var droneSensorTemplate;
var droneSensorListTemplate;

var usersTemplate;
var userEntityTemplate;
var userEntitySelectTemplate;

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

});

function loadCountry() {
    countriesTemplate = Handlebars.compile($('#countryListTemplate').html());
    countryEntityTemplate = Handlebars.compile($('#countryEntity').html());

    $(document).on('click', '#getCountries', getCountries);
    $(document).on('click', '#addCountry', createCountry);
    $(document).on('click', '.edit-country', editCountry);
    $(document).on('click', '.delete-county', deleteCountry);
}

function loadRegion() {
    regionsTemplate = Handlebars.compile($('#regionListTemplate').html());
    regionEntityTemplate = Handlebars.compile($('#regionEntity').html());
    regionEntitySelectTemplate = Handlebars.compile($('#regionSelectEntity').html());

    $(document).on('click', '#getRegions', getRegions);
    $(document).on('click', '#addRegion', createRegion);
    $(document).on('click', '.edit-region', editRegion);
    $(document).on('click', '.delete-region', deleteRegion);
}

function loadPopulatedPoint() {
    populatedPointsTemplate = Handlebars.compile($('#populatedPointListTemplate').html());
    populatedPointEntityTemplate = Handlebars.compile($('#populatedPointEntity').html());
    populatedPointEntitySelectTemplate = Handlebars.compile($('#populatedPointSelectEntity').html());

    $(document).on('click', '#getPopulatedPoints', getPopulatedPoints);
    $(document).on('click', '#addPopulatedPoint', createPopulatedPoint);
    $(document).on('click', '.edit-point', editPopulatedPoint);
    $(document).on('click', '.delete-point', deletePopulatedPoint);
}

function loadProposal() {
    proposalsTemplate = Handlebars.compile($('#proposalListTemplate').html());
    proposalEntityTemplate = Handlebars.compile($('#proposalEntity').html());

    $(document).on('click', '#getProposals', getProposals);
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

    $(document).on('click', '#getDrones', getDrones);
    $(document).on('click', '#addDrone', createDrone);

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

    $(document).on('click', '#getUsers', getUsers);
    $(document).on('click', '#addUser', createUser);
    $(document).on('click', '.edit-user', editUser);
    $(document).on('click', '.delete-user', deleteUser);
}

/////////////// service methods
function setDataTeble(tableName) {
    var table = $(tableName).DataTable( {} );
}

function getID(e, tableId) {
     var rowIndex = $(e.target).parent().parent().index() + 1;
     var id = $(tableId +' tr').eq(rowIndex).find('td').eq(0).html();
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