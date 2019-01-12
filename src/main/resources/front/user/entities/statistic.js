function getStatistic() {
    var html = statisticTemplate();
    $('#mainContainer').empty().append(html);
    getStatisticData('proposal');
    $('#statisticProposal')._t("proposal");
    $('#statisticPoint')._t("point");
}

function renderChart(data) {
    $('#canvas').empty().append('<canvas id="popChart" width="600" height="400"></canvas>');

    var popCanvas = $("#popChart");

    var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
            labels: data.proposals,
            datasets: [{
                label: $.i18n._('count'),
                data: data.popularitys,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ]
            }]
        },
        options:{
            scales: {
                yAxes : [{
                    ticks : {
                        min : 0
                    }
                }]
            }
        }
    });
}

function changeStatistic() {
    if ($('#selectStatisticType').val() == 'point') {
        getStatisticData('point');
    } else {
        getStatisticData('proposal');
    }
}

function getStatisticData(type) {
    var url;
    if (type === 'proposal') {
        url = 'proposal';
    } else {
        url = 'point';
    }
    $.ajax({
        url: "http://localhost:8080/userProposals/statistic/" + url + "/" + USER.id,
        type: "GET",
        xhrFields: { withCredentials: true },
        success: function (data) {
            data = processStatistic(data);
            renderChart(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Error while getting statistic');
        }});
}

function processStatistic(data) {
    data.proposals = data.proposals.slice(0, 10);
    data.popularitys = data.popularitys.slice(0, 10);
    return data;
}