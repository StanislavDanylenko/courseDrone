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
    validatePopulatedPoint();
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
            alert($.i18n._('getPopPointListError'));
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
            alert($.i18n._('getRegionListError'));
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
            alert($.i18n._('getPopPointError'));
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
    hideFieds();
}


function savePopulatedPoint() {

    var populatedPoint = {
        name: $('#populatedPointName').val(),
        regionId: $('#populatedPointRegionId').val(),
        latitude: $('#pointX').val(),
        longitude: $('#pointY').val()
    };

    if (!$('#populatedPointForm').valid()) {
        return;
    }

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
            alert($.i18n._('savePopPointError'));
        }
    });

}

function updatePopulatedPoint() {
    var populatedPoint = {
        id: $('#populatedPointId').val(),
        name: $('#populatedPointName').val(),
        regionId: $('#populatedPointRegionId').val()
    };

    if (!$('#populatedPointForm').valid()) {
        return;
    }

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
            alert($.i18n._('updatePopPointError'));
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
            alert($.i18n._('deletePopPointError'));
        }});
}

/////////

function validatePopulatedPoint() {

    $('#populatedPointForm').validate({
        rules: {
            populatedPointName: {
                required: true
            },
            regionId: {
                required: true
            },
            pointX: {
                required: true,
                number: true
            },
            pointY: {
                required: true,
                number: true
            }
        },
        messages: {
            populatedPointName: {
                required: $.i18n._('requiredField')
            },
            regionId: {
                required: $.i18n._('requiredField')
            },
            pointX: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            },
            pointY: {
                required: $.i18n._('requiredField'),
                number: $.i18n._('validNumber')
            }
        }
    });

}

function hideFieds() {
    $('#hidePointCoordinates').hide();
}