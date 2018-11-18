var countriesTemplate;
var countryEntityTemplate;
var actionCountry;

$(document).ready(function() {
    
    countriesTemplate = Handlebars.compile($('#countryListTemplate').html());
    countryEntityTemplate = Handlebars.compile($('#countryEntity').html());
    $(document).on('click', '#logout', logout);
    
    $(document).on('click', '#getCountries', getCountries);
    $(document).on('click', '#addCountry', createCountry);
    $(document).on('click', '.edit-country', editCountry);
    $(document).on('click', '.delete-county', deleteCountry);
});



function setDataTeble(tableName) {
    var table = $(tableName).DataTable( {} );
}

function getID(e, tableId) {
     var rowIndex = $(e.target).parent().parent().index() + 1;
     var id = $(tableId +' tr').eq(rowIndex).find('td').eq(0).html();
     console.log(rowIndex + "   " + id);
     return id;
}

/////// Countries



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