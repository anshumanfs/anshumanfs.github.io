document.addEventListener('DOMContentLoaded', () => {

    const FORMATS_WITH_PREFIX = ["series-with-prefix", "series-with-prefix-n-suffix"];
    const FORMATS_WITH_SUFFIX = ["series-with-prefix-n-suffix"];

    function generateSoilBarcode(selector, data) {
        JsBarcode(selector, data, {
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

    function randomCode(length) {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    function buildUniqueCode(format, number, prefix, suffix) {
        switch (format) {
            case "series-with-prefix":
                return `${prefix}${number}`;
            case "series-with-prefix-n-suffix":
                return `${prefix}${number}${suffix}`;
            case "numeric-series":
                return String(number).padStart(6, "0");
            case "alphanumeric-series":
                return number.toString(36).toUpperCase().padStart(6, "0");
            case "random":
                return randomCode(6);
            default:
                return String(number);
        }
    }

    function updateAffixFields() {
        const format = $("#uniqueCodeFormat").val();
        $("#prefixGroup").toggle(FORMATS_WITH_PREFIX.includes(format));
        $("#suffixGroup").toggle(FORMATS_WITH_SUFFIX.includes(format));
    }

    // Blank numeric settings fall back to the value the field ships with
    function numberOrDefault(selector) {
        const raw = $(selector).val().trim();
        return raw === "" ? Number($(selector).prop("defaultValue")) : Number(raw);
    }

    function updateUniqueCodePreview() {
        const format = $("#uniqueCodeFormat").val();
        const startRaw = $("#nameStartingSeries").val().trim();
        if (format !== "random" && startRaw === "") {
            $("#uniqueCodePreview").text("Name Starting Series is blank, so no unique code will be added.");
            return;
        }
        const prefix = $("#uniqueCodePrefix").val().trim();
        const suffix = $("#uniqueCodeSuffix").val().trim();
        const samples = [0, 1, 2].map(i => buildUniqueCode(format, Number(startRaw) + i, prefix, suffix));
        $("#uniqueCodePreview").text(`Preview: ${samples.join(", ")}, ...`);
    }

    function generateLabels() {
        let numberOfLabels = numberOrDefault("#numberOfRows");
        let month = $("#month").val();
        let startingSeriesRaw = $("#nameStartingSeries").val().trim();
        let barcodeSeries = numberOrDefault("#overallBarcodeSeries");
        let format = $("#uniqueCodeFormat").val();
        let prefix = FORMATS_WITH_PREFIX.includes(format) ? $("#uniqueCodePrefix").val().trim() : "";
        let suffix = FORMATS_WITH_SUFFIX.includes(format) ? $("#uniqueCodeSuffix").val().trim() : "";
        let barcodePrefix = $("#barcodePrefix").val().trim();
        // Blank fields are left out of the label entirely
        let locationParts = [
            $("#country").val().trim(),
            $("#state").val().trim(),
            $("#locality").val().trim(),
            $("#latitude").val().trim(),
            $("#longitude").val().trim(),
            month ? month.slice(0, 7) : "",
        ];
        let labelHtml = "";
        for (let i = 0; i < numberOfLabels; i++) {
            let uniqueCode = format === "random" || startingSeriesRaw !== ""
                ? buildUniqueCode(format, Number(startingSeriesRaw) + i, prefix, suffix)
                : "";
            let label = [...locationParts, uniqueCode].filter(Boolean).join("-");
            labelHtml += `
            <div class="row-custom">
                <div class="custom-div inner-div" style="margin-left: -10px;">
                    <svg class="barcode barcode${i}"></svg>
                    <span class="labelSpan">${label}</span>
                </div>
                <div class="custom-div inner-div">
                    <svg class="barcode barcode${i}"></svg>
                    <span class="labelSpan">${label}</span>
                </div>
            </div>`;
        }
        $("#labelContainer").html(labelHtml);
        for (let i = 0; i < numberOfLabels; i++) {
            generateSoilBarcode(`.barcode${i}`, `${barcodePrefix}${barcodeSeries + i}`);
        }
    }



    $("#uniqueCodeFormat").on("change", updateAffixFields);
    $("#uniqueCodeFormat, #uniqueCodePrefix, #uniqueCodeSuffix, #nameStartingSeries").on("input change", updateUniqueCodePreview);
    updateAffixFields();
    updateUniqueCodePreview();

    $("#soilLabelForm").on("submit", function (event) {
        event.preventDefault();
        generateLabels();
    });

    // print labels using media print
    $("#printLabels").on("click", function () {
        window.print();
    });
});
