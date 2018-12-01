function renderPopulatedPointList(response) {
    var html = populatedPointsTemplate(response);
    $('#mainContainer').empty().append(html);
    setDataTeble('#populatedPointListTable');
    setTranslatePoint();
}

function renderPopulatedPointEntity() {
    var html = populatedPointEntityTemplate();
    var select = populatedPointEntitySelectTemplate();
    $('#mainContainer').empty().append(html);
    $('#populatedPointSelect').empty().append(select);
}
//
function renderSelectRegion(data) {
    var html = populatedPointEntitySelectTemplate(data)
    $('#populatedPointSelect').empty().append(html);
    setTranslatePointEntity();
}

function getPopulatedPoints() {
    $.ajax({
        url: "http://localhost:8080/points",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            actionPopulatedPoint = -1;
            renderPopulatedPointList(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}
//
function getRegionForSelect(regionId) {
    $.ajax({
        url: "http://localhost:8080/regions",
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            renderSelectRegion(data);
            $("#populatedPointRegionId").val(regionId);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}

function getPopulatedPoint(id) {
    console.log('in the get populatedPoint method, id = ' + id);
    $.ajax({
        url: "http://localhost:8080/points/" + id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            $('#populatedPointId').val(data.id);
            $('#populatedPointName').val(data.name);
            getRegionForSelect(data.regionId);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}


function createPopulatedPoint() {
    renderPopulatedPointEntity();
    var button = $('#populatedPointSubmitButton');
    button.bind('click', savePopulatedPoint);
    $('#populatedPointOperation')._t('addPoint');
    getRegionForSelect();
}

function editPopulatedPoint(e) {
    var id = getID(e, '#populatedPointListTable');
    renderPopulatedPointEntity();
    var button = $('#populatedPointSubmitButton');
    button.bind('click', updatePopulatedPoint);
    $('#populatedPointOperation')._t('editPoint');
    getPopulatedPoint(id);
}


function savePopulatedPoint() {

    var populatedPoint = {
        name: $('#populatedPointName').val(),
        regionId: $('#populatedPointRegionId').val()
    };

    $.ajax({
        url: "http://localhost:8080/points",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(populatedPoint),
        success: function () {
            getPopulatedPoints();
        },
        error: function(data) {
        }
    });

}

function updatePopulatedPoint() {
    var populatedPoint = {
        id: $('#populatedPointId').val(),
        name: $('#populatedPointName').val(),
        regionId: $('#populatedPointRegionId').val()
    };

    $.ajax({
        url: "http://localhost:8080/points/" + populatedPoint.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(populatedPoint),
        success: function () {
            getPopulatedPoints();
        },
        error: function(data) {
        }
    });
}

function deletePopulatedPoint(e) {

    actionPopulatedPoint = getID(e, '#populatedPointListTable');

    $.ajax({
        url: "http://localhost:8080/points/" + actionPopulatedPoint,
        xhrFields: { withCredentials: true },
        type: "DELETE",
        success: function () {
            getPopulatedPoints();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }});
}