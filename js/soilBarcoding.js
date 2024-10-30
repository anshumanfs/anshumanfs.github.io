document.addEventListener('DOMContentLoaded', () => {

    function generateSoilBarcode(id, data) {
        JsBarcode(id, data, {
            format: "CODE128",
            width: 2,
            height: 40,
            displayValue: true,
            text: "",
            font: 'Arial',
            textMargin: 0,
            margin: 0,
        });
    }

    function generateLabels() {
        let numberOfLabels = $("#numberOfRows").val();
        let country = $("#country").val();
        let state = $("#state").val();
        let locality = $("#locality").val();
        let lat = $("#latitude").val();
        let lon = $("#longitude").val();
        let date = new Date($("#month").val()).toISOString().slice(0, 7);
        let startingSeries = Number($("#nameStartingSeries").val());
        let barcodeSeries = Number($("#overallBarcodeSeries").val());
        let labelHtml = "";
        for (let i = 0; i < numberOfLabels; i++) {
            labelHtml += `
            <div class="row-custom">
                <div class="custom-div inner-div" style="margin-left: -10px;">
                    <svg id="barcode${i}" class="barcode"></svg>
                    <span class="labelSpan">${country}-${state}-${locality}-${lat}-${lon}-${date}-${startingSeries + i}</span>
                </div>
                <div class="custom-div inner-div">
                    <svg id="barcode${i}" class="barcode"></svg>
                    <span class="labelSpan">${country}-${state}-${locality}-${lat}-${lon}-${date}-${startingSeries + i}</span>
                </div>
            </div>`;
        }
        $("#labelContainer").html(labelHtml);
        for (let i = 0; i < numberOfLabels; i++) {
            generateSoilBarcode(`#barcode${i}`, `SSL${barcodeSeries + i}`);
        }
    }

    $("#soilLabelForm").on("submit", function (event) {
        event.preventDefault();
        generateLabels();
    });

    // print labels using media print
    $("#printLabels").on("click", function () {
        window.print();
    });
});