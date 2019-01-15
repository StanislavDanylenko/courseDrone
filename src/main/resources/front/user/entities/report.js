function saveReportPDF() {

    var sett;
    var doc = new jsPDF('p', 'pt');

    var res = doc.autoTableHtmlToJson(document.getElementById("reportTable"));

    var header = function(data) {
        sett = data;

        doc.setFontSize(8);
        doc.text("generated: " + new Date().toLocaleString(), 10, 10);

        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text("Report of the order", data.settings.margin.left, 50);
    };

    var options = {
        beforePageContent: header,
        margin: {
            top: 80
        },
        startY: 85
    };

    doc.autoTable(res.columns, res.data, options);

    doc.text("Comment:", sett.settings.margin.left, 160);
    doc.fromHTML($("#comment").get(0),  sett.settings.margin.left, 160);

    doc.save("table.pdf");

}