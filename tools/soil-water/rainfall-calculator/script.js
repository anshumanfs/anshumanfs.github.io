document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const processButton = document.getElementById('processButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsSection = document.getElementById('resultsSection');
    const metadataInputDiv = document.getElementById('metadataInput');

    // Station Info
    const station1NameInput = document.getElementById('station1Name');
    const station1LatLonInput = document.getElementById('station1LatLon');
    const station2NameInput = document.getElementById('station2Name');
    const station2LatLonInput = document.getElementById('station2LatLon');

    // Tables
    const annualTable = document.getElementById('annualTable');
    const monthlyTable = document.getElementById('monthlyTable');
    const rainyDaysTable = document.getElementById('rainyDaysTable');
    const droughtTable = document.getElementById('droughtTable');
    // Add Dry Spell Analysis elements
    const drySpellTable = document.getElementById('drySpellTable');
    const drySpellMinLengthInput = document.getElementById('drySpellMinLength');
    const drySpellMaxLengthInput = document.getElementById('drySpellMaxLength');
    const drySpellStartDateInput = document.getElementById('drySpellStartDate');
    const drySpellEndDateInput = document.getElementById('drySpellEndDate');
    const calculateDrySpellButton = document.getElementById('calculateDrySpellButton');
    const drySpellLoadingIndicator = document.getElementById('drySpellLoadingIndicator');

    // Export Buttons
    const exportCsvButton = document.getElementById('exportCsvButton');
    const exportXlsxButton = document.getElementById('exportXlsxButton');
    const exportPdfButton = document.getElementById('exportPdfButton');

    // Tab navigation
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    let stationInfo = {
        s1Name: "Station1", s1Coords: "N/A",
        s2Name: "Station2", s2Coords: "N/A"
    };
    let processedData = null;
    let allParsedDailyData = [];
    let drySpellResultsData = [];

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            processButton.disabled = false;
            resultsSection.classList.add('hidden');
            calculateDrySpellButton && (calculateDrySpellButton.disabled = true);
            drySpellTable && (drySpellTable.innerHTML = '');
            drySpellResultsData = [];
        } else {
            processButton.disabled = true;
        }
    });

    processButton.addEventListener('click', handleFile);
    if (calculateDrySpellButton) calculateDrySpellButton.addEventListener('click', handleDrySpellCalculation);

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.dataset.tab;

            tabLinks.forEach(item => {
                item.classList.remove('border-sky-500', 'text-sky-600');
                item.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            });
            link.classList.add('border-sky-500', 'text-sky-600');
            link.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');


            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Content`) {
                    content.classList.add('active');
                }
            });
        });
    });

    function showLoading(isLoading) {
        if (isLoading) {
            loadingIndicator.classList.remove('hidden');
            processButton.disabled = true;
        } else {
            loadingIndicator.classList.add('hidden');
            processButton.disabled = fileInput.files.length === 0;
        }
    }

    async function handleFile() {
        const file = fileInput.files[0];
        if (!file) return;

        showLoading(true);
        resultsSection.classList.add('hidden');
        allParsedDailyData = [];
        drySpellResultsData = [];
        drySpellTable && (drySpellTable.innerHTML = '');
        calculateDrySpellButton && (calculateDrySpellButton.disabled = true);

        // Update stationInfo from input fields if they are visible and filled
        if (!metadataInputDiv.classList.contains('hidden')) {
            stationInfo.s1Name = station1NameInput.value || "Station1";
            stationInfo.s1Coords = station1LatLonInput.value || "N/A";
            stationInfo.s2Name = station2NameInput.value || "Station2";
            stationInfo.s2Coords = station2LatLonInput.value || "N/A";
        }


        try {
            let data = [];
            if (file.name.endsWith('.csv')) {
                data = await parseCsv(file);
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                data = await parseExcel(file);
            } else {
                alert('Unsupported file type. Please upload CSV, XLSX, or XLS.');
                showLoading(false);
                return;
            }

            if (data.length === 0) {
                 alert('No valid data found or failed to parse headers. Check console for details.');
                 showLoading(false);
                 return;
            }

            processedData = processRainfallData(data);
            displayResults(processedData);
            resultsSection.classList.remove('hidden');
            allParsedDailyData = data;
            setDefaultDrySpellDates();
            calculateDrySpellButton && (calculateDrySpellButton.disabled = false);
        } catch (error) {
            console.error("Error processing file:", error);
            alert(`Error processing file: ${error.message}`);
        } finally {
            showLoading(false);
        }
    }

    function parseCsv(file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: false, // We'll determine headers manually
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(extractDataAndHeaders(results.data));
                },
                error: (error) => reject(error)
            });
        });
    }

    function parseExcel(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const workbook = XLSX.read(event.target.result, { type: 'binary', cellDates:true });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF:'yyyy-mm-dd' });
                    resolve(extractDataAndHeaders(jsonData));
                } catch (e) {
                    reject(e);
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsBinaryString(file);
        });
    }

    function extractDataAndHeaders(rows) {
        // Attempt to find header row for station names and coordinates
        // This is a heuristic based on your sample file.
        let dataStartIndex = -1;
        let potentialHeaderRow = null;

        for (let i = 0; i < Math.min(rows.length, 5); i++) { // Check first 5 rows
            const row = rows[i].map(String); // Ensure all are strings
            if (row[0] && row[0].toLowerCase().includes('date')) {
                 if (rows[i+1] && rows[i+1].length > 2 && typeof rows[i+1][1] === 'string' && rows[i+1][1].includes(',')) {
                    potentialHeaderRow = rows[i+1]; // This might be the lat,lon row
                    stationInfo.s1Name = String(rows[i][1]).split(',')[0].trim() || "Station1"; // Extract name before comma
                    stationInfo.s2Name = String(rows[i][2]).split(',')[0].trim() || "Station2";
                    if (potentialHeaderRow[1]) stationInfo.s1Coords = String(potentialHeaderRow[1]);
                    if (potentialHeaderRow[2]) stationInfo.s2Coords = String(potentialHeaderRow[2]);
                    dataStartIndex = i + 2; // Data starts after 'Date' and 'lat,lon' rows
                    break;
                } else if (rows[i].length > 2 && typeof rows[i][1] === 'string' && rows[i][1].includes(',')) {
                    // This case for files where 'Date, "Lat,Lon1", "Lat,Lon2" ' is on the same row.
                    potentialHeaderRow = rows[i];
                    stationInfo.s1Name = "Station1"; // Placeholder, rely on user input if this is the case
                    stationInfo.s2Name = "Station2";
                    if (potentialHeaderRow[1]) stationInfo.s1Coords = String(potentialHeaderRow[1]);
                    if (potentialHeaderRow[2]) stationInfo.s2Coords = String(potentialHeaderRow[2]);
                    dataStartIndex = i + 1;
                    break;
                 } else if (rows[i].length > 2) { // Date, StationName1, StationName2
                    stationInfo.s1Name = String(rows[i][1]) || "Station1";
                    stationInfo.s2Name = String(rows[i][2]) || "Station2";
                    // Check if next row has coords
                    if (rows[i+1] && rows[i+1].length > 2 && typeof rows[i+1][1] === 'string' && rows[i+1][1].includes(',')) {
                        stationInfo.s1Coords = String(rows[i+1][1]);
                        stationInfo.s2Coords = String(rows[i+1][2]);
                        dataStartIndex = i + 2;
                    } else {
                        stationInfo.s1Coords = "N/A";
                        stationInfo.s2Coords = "N/A";
                        dataStartIndex = i + 1;
                    }
                    break;
                 }
            }
        }


        if (dataStartIndex === -1) {
            // Could not find 'Date' header, assume data starts row 3 (index 2) like the sample
            // and prompt user for metadata
            console.warn("Could not reliably determine header row. Assuming data starts at row 3 and prompting for metadata.");
            if (rows.length > 2 && rows[1] && rows[1].length > 2 && String(rows[1][1]).includes(',')) { // Check for coordinates on row 2
                 stationInfo.s1Coords = String(rows[1][1]);
                 stationInfo.s2Coords = String(rows[1][2]);
            } else {
                 stationInfo.s1Coords = "N/A";
                 stationInfo.s2Coords = "N/A";
            }
            stationInfo.s1Name = "Station1";
            stationInfo.s2Name = "Station2";

            // Pre-fill with any existing info
            station1NameInput.value = stationInfo.s1Name;
            station1LatLonInput.value = stationInfo.s1Coords;
            station2NameInput.value = stationInfo.s2Name;
            station2LatLonInput.value = stationInfo.s2Coords;

            metadataInputDiv.classList.remove('hidden');
            dataStartIndex = 2; // Default for the sample if headers are messy
            // return []; // Indicate to prompt user or stop
        } else {
             metadataInputDiv.classList.add('hidden'); // Headers found, hide metadata input
        }


        // Update displayed station names if found
        document.querySelectorAll('.station1-name').forEach(el => el.textContent = stationInfo.s1Name);
        document.querySelectorAll('.station2-name').forEach(el => el.textContent = stationInfo.s2Name);


        const dailyData = [];
        for (let i = dataStartIndex; i < rows.length; i++) {
            const row = rows[i];
            if (row && row.length >= 3) {
                // Try to parse date robustly
                let dateStr = String(row[0]);
                let dateObj;
                // Check if it's an Excel date serial number (a number)
                if (!isNaN(dateStr) && Number(dateStr) > 25569) { // Excel serial date check
                     dateObj = new Date(Math.round((Number(dateStr) - 25569) * 86400 * 1000));
                } else {
                     dateObj = new Date(dateStr);
                }

                if (dateObj instanceof Date && !isNaN(dateObj)) {
                     const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
                     const s1Rain = parseFloat(row[1]);
                     const s2Rain = parseFloat(row[2]);

                     if (!isNaN(s1Rain) && !isNaN(s2Rain)) {
                        dailyData.push({
                            date: formattedDate,
                            [stationInfo.s1Name]: s1Rain,
                            [stationInfo.s2Name]: s2Rain,
                        });
                     }
                } else {
                    // console.warn(`Skipping row with invalid date: ${row[0]}`);
                }
            }
        }
        return dailyData;
    }

    function processRainfallData(dailyReadings) {
        if (!dailyReadings || dailyReadings.length === 0) return null;

        const s1Key = stationInfo.s1Name;
        const s2Key = stationInfo.s2Name;

        const dataByYear = {};
        const dataByYearMonth = {};

        dailyReadings.forEach(day => {
            const date = new Date(day.date);
            const year = date.getFullYear();
            const month = date.getMonth(); // 0-11

            if (!dataByYear[year]) {
                dataByYear[year] = { [s1Key]: 0, [s2Key]: 0, s1RainyDays: 0, s2RainyDays: 0, s1ExtremeDays: 0, s2ExtremeDays: 0, numReadings:0 };
            }
            if (!dataByYearMonth[`${year}-${month}`]) {
                dataByYearMonth[`${year}-${month}`] = { [s1Key]: 0, [s2Key]: 0, year, month, numReadings:0 };
            }

            dataByYear[year][s1Key] += day[s1Key];
            dataByYear[year][s2Key] += day[s2Key];
            dataByYear[year].numReadings++;


            dataByYearMonth[`${year}-${month}`][s1Key] += day[s1Key];
            dataByYearMonth[`${year}-${month}`][s2Key] += day[s2Key];
            dataByYearMonth[`${year}-${month}`].numReadings++;


            if (day[s1Key] >= 2.5) dataByYear[year].s1RainyDays++;
            if (day[s2Key] >= 2.5) dataByYear[year].s2RainyDays++;
            if (day[s1Key] >= 60) dataByYear[year].s1ExtremeDays++;
            if (day[s2Key] >= 60) dataByYear[year].s2ExtremeDays++;
        });

        const annualRainfall = Object.entries(dataByYear).map(([year, totals]) => ({
            year: parseInt(year),
            [s1Key]: totals[s1Key],
            [s2Key]: totals[s2Key],
            spatialAverage: (totals[s1Key] + totals[s2Key]) / 2,
            s1RainyDays: totals.s1RainyDays,
            s2RainyDays: totals.s2RainyDays,
            avgRainyDays: (totals.s1RainyDays + totals.s2RainyDays) / 2,
            s1ExtremeDays: totals.s1ExtremeDays,
            s2ExtremeDays: totals.s2ExtremeDays,
            avgExtremeDays: (totals.s1ExtremeDays + totals.s2ExtremeDays) / 2,
        })).sort((a,b) => a.year - b.year);

        // Calculate Normal Annual Rainfall (average of all years)
        let totalS1Annual = 0, totalS2Annual = 0, totalSpatialAnnual = 0;
        annualRainfall.forEach(yr => {
            totalS1Annual += yr[s1Key];
            totalS2Annual += yr[s2Key];
            totalSpatialAnnual += yr.spatialAverage;
        });
        const numYears = annualRainfall.length;
        const normalAnnualS1 = numYears > 0 ? totalS1Annual / numYears : 0;
        const normalAnnualS2 = numYears > 0 ? totalS2Annual / numYears : 0;
        const normalAnnualSpatial = numYears > 0 ? totalSpatialAnnual / numYears : 0;

        // Add deviation to annualRainfall
        annualRainfall.forEach(yr => {
            yr.normalS1 = normalAnnualS1;
            yr.normalS2 = normalAnnualS2;
            yr.normalSpatial = normalAnnualSpatial;
            yr.deviationS1 = normalAnnualS1 ? ((yr[s1Key] - normalAnnualS1) / normalAnnualS1) * 100 : 0;
            yr.deviationS2 = normalAnnualS2 ? ((yr[s2Key] - normalAnnualS2) / normalAnnualS2) * 100 : 0;
            yr.deviationSpatial = normalAnnualSpatial ? ((yr.spatialAverage - normalAnnualSpatial) / normalAnnualSpatial) * 100 : 0;
        });


        const monthlyRainfall = Object.entries(dataByYearMonth).map(([key, totals]) => ({
            year: totals.year,
            month: totals.month, // keep as 0-11 for sorting/calculations
            monthName: new Date(totals.year, totals.month).toLocaleString('default', { month: 'long' }),
            [s1Key]: totals[s1Key],
            [s2Key]: totals[s2Key],
            spatialAverage: (totals[s1Key] + totals[s2Key]) / 2
        })).sort((a,b) => (a.year === b.year) ? a.month - b.month : a.year - b.year);


        // Calculate Normal Monthly Rainfall
        const monthlyNormals = {}; // key: month (0-11), value: {s1: total, s2: total, spatial: total, count: 0}
        monthlyRainfall.forEach(m => {
            if (!monthlyNormals[m.month]) {
                monthlyNormals[m.month] = { [s1Key]: 0, [s2Key]: 0, spatialAverage: 0, count: 0 };
            }
            monthlyNormals[m.month][s1Key] += m[s1Key];
            monthlyNormals[m.month][s2Key] += m[s2Key];
            monthlyNormals[m.month].spatialAverage += m.spatialAverage;
            monthlyNormals[m.month].count++;
        });

        Object.keys(monthlyNormals).forEach(monthIdx => {
            const norm = monthlyNormals[monthIdx];
            norm[s1Key] = norm.count > 0 ? norm[s1Key] / norm.count : 0;
            norm[s2Key] = norm.count > 0 ? norm[s2Key] / norm.count : 0;
            norm.spatialAverage = norm.count > 0 ? norm.spatialAverage / norm.count : 0;
        });
         // Add normal monthly rainfall to each month's data
        monthlyRainfall.forEach(m => {
            m.normalS1 = monthlyNormals[m.month] ? monthlyNormals[m.month][s1Key] : 0;
            m.normalS2 = monthlyNormals[m.month] ? monthlyNormals[m.month][s2Key] : 0;
            m.normalSpatial = monthlyNormals[m.month] ? monthlyNormals[m.month].spatialAverage : 0;
        });


        // Drought Classification
        const droughtData = annualRainfall.map(yr => {
            const classify = (dev) => {
                if (dev === null || isNaN(dev)) return "N/A";
                if (dev > -20) return "No Drought";
                if (dev >= -40) return "Mild Drought";
                return "Moderate Drought";
            };
            return {
                year: yr.year,
                deviationS1: yr.deviationS1,
                classificationS1: classify(yr.deviationS1),
                deviationS2: yr.deviationS2,
                classificationS2: classify(yr.deviationS2),
                deviationSpatial: yr.deviationSpatial,
                classificationSpatial: classify(yr.deviationSpatial)
            };
        });

        return { annualRainfall, monthlyRainfall, droughtData, stationInfo };
    }

    function displayResults(results) {
        if (!results) return;
        const { annualRainfall, monthlyRainfall, droughtData, stationInfo: currentStationInfo } = results;
        const s1 = currentStationInfo.s1Name;
        const s2 = currentStationInfo.s2Name;

        // Annual Table
        let annualHtml = `<thead><tr>
            <th>Year</th>
            <th>${s1} (mm)</th><th>${s2} (mm)</th><th>Spatial Avg (mm)</th>
            <th>Normal ${s1} (mm)</th><th>Normal ${s2} (mm)</th><th>Normal Spatial Avg (mm)</th>
            <th>Dev. ${s1} (%)</th><th>Dev. ${s2} (%)</th><th>Dev. Spatial Avg (%)</th>
        </tr></thead><tbody>`;
        annualRainfall.forEach(row => {
            annualHtml += `<tr>
                <td>${row.year}</td>
                <td>${row[s1].toFixed(2)}</td><td>${row[s2].toFixed(2)}</td><td>${row.spatialAverage.toFixed(2)}</td>
                <td>${row.normalS1.toFixed(2)}</td><td>${row.normalS2.toFixed(2)}</td><td>${row.normalSpatial.toFixed(2)}</td>
                <td>${row.deviationS1.toFixed(2)}</td><td>${row.deviationS2.toFixed(2)}</td><td>${row.deviationSpatial.toFixed(2)}</td>
            </tr>`;
        });
        annualTable.innerHTML = annualHtml + '</tbody>';

        // Monthly Table
        let monthlyHtml = `<thead><tr>
            <th>Year</th><th>Month</th>
            <th>${s1} (mm)</th><th>${s2} (mm)</th><th>Spatial Avg (mm)</th>
            <th>Normal ${s1} (mm)</th><th>Normal ${s2} (mm)</th><th>Normal Spatial Avg (mm)</th>
        </tr></thead><tbody>`;
         monthlyRainfall.forEach(row => {
            monthlyHtml += `<tr>
                <td>${row.year}</td><td>${row.monthName}</td>
                <td>${row[s1].toFixed(2)}</td><td>${row[s2].toFixed(2)}</td><td>${row.spatialAverage.toFixed(2)}</td>
                <td>${row.normalS1.toFixed(2)}</td><td>${row.normalS2.toFixed(2)}</td><td>${row.normalSpatial.toFixed(2)}</td>
            </tr>`;
        });
        monthlyTable.innerHTML = monthlyHtml + '</tbody>';

        // Rainy Days Table (from annualRainfall as it's aggregated there)
        let rainyDaysHtml = `<thead><tr>
            <th>Year</th>
            <th>Rainy Days ${s1} (>=2.5mm)</th><th>Rainy Days ${s2} (>=2.5mm)</th><th>Avg Rainy Days</th>
            <th>Extreme Rainy Days ${s1} (>=60mm)</th><th>Extreme Rainy Days ${s2} (>=60mm)</th><th>Avg Extreme Rainy Days</th>
        </tr></thead><tbody>`;
        annualRainfall.forEach(row => {
            rainyDaysHtml += `<tr>
                <td>${row.year}</td>
                <td>${row.s1RainyDays}</td><td>${row.s2RainyDays}</td><td>${row.avgRainyDays.toFixed(1)}</td>
                <td>${row.s1ExtremeDays}</td><td>${row.s2ExtremeDays}</td><td>${row.avgExtremeDays.toFixed(1)}</td>
            </tr>`;
        });
        rainyDaysTable.innerHTML = rainyDaysHtml + '</tbody>';

        // Drought Table
        let droughtHtml = `<thead><tr>
            <th>Year</th>
            <th>Dev. ${s1} (%)</th><th>Classification ${s1}</th>
            <th>Dev. ${s2} (%)</th><th>Classification ${s2}</th>
            <th>Dev. Spatial Avg (%)</th><th>Classification Spatial Avg</th>
        </tr></thead><tbody>`;
        droughtData.forEach(row => {
            droughtHtml += `<tr>
                <td>${row.year}</td>
                <td>${row.deviationS1.toFixed(2)}</td><td>${row.classificationS1}</td>
                <td>${row.deviationS2.toFixed(2)}</td><td>${row.classificationS2}</td>
                <td>${row.deviationSpatial.toFixed(2)}</td><td>${row.classificationSpatial}</td>
            </tr>`;
        });
        droughtTable.innerHTML = droughtHtml + '</tbody>';

        // Dry Spell Table
        if (drySpellResultsData && drySpellResultsData.length > 0) {
            let drySpellHtml = `<thead><tr>
                <th>Year</th>
                <th>Dry Spells ${s1} (Count)</th>
                <th>Dry Spells ${s2} (Count)</th>
                <th>Avg Dry Spells (Count)</th>
            </tr></thead><tbody>`;
            drySpellResultsData.forEach(row => {
                drySpellHtml += `<tr>
                    <td>${row.year}</td>
                    <td>${row.s1Count}</td>
                    <td>${row.s2Count}</td>
                    <td>${row.avgCount.toFixed(1)}</td>
                </tr>`;
            });
            drySpellTable.innerHTML = drySpellHtml + '</tbody>';
        } else {
            drySpellTable.innerHTML = '<tbody><tr><td colspan="4" class="text-center">No dry spells found for the selected criteria or no data in range.</td></tr></tbody>';
        }

        // Set default tab
        tabLinks[0].click();
    }

    // --- Dry Spell Analysis ---
    function setDefaultDrySpellDates() {
        if (!processedData || !processedData.annualRainfall || processedData.annualRainfall.length === 0) {
            const currentYear = new Date().getFullYear();
            drySpellStartDateInput && (drySpellStartDateInput.value = `${currentYear}-06-01`);
            drySpellEndDateInput && (drySpellEndDateInput.value = `${currentYear}-09-30`);
            return;
        }
        const years = processedData.annualRainfall.map(item => item.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        drySpellStartDateInput && (drySpellStartDateInput.value = `${minYear}-06-01`);
        drySpellEndDateInput && (drySpellEndDateInput.value = `${maxYear}-09-30`);
    }

    function showDrySpellLoading(isLoading) {
        if (!drySpellLoadingIndicator || !calculateDrySpellButton) return;
        if (isLoading) {
            drySpellLoadingIndicator.classList.remove('hidden');
            calculateDrySpellButton.disabled = true;
        } else {
            drySpellLoadingIndicator.classList.add('hidden');
            calculateDrySpellButton.disabled = allParsedDailyData.length === 0;
        }
    }

    async function handleDrySpellCalculation() {
        if (allParsedDailyData.length === 0) {
            alert("Please process a data file first.");
            return;
        }
        const minLength = parseInt(drySpellMinLengthInput.value);
        const maxLength = parseInt(drySpellMaxLengthInput.value);
        const startDateStr = drySpellStartDateInput.value;
        const endDateStr = drySpellEndDateInput.value;
        if (isNaN(minLength) || minLength <= 0) {
            alert("Please enter a valid minimum dry spell length.");
            return;
        }
        if (isNaN(maxLength) || maxLength <= minLength) {
            alert("Please enter a valid maximum dry spell length (must be greater than min length).");
            return;
        }
        if (!startDateStr || !endDateStr) {
            alert("Please select valid start and end dates.");
            return;
        }
        const dStartDate = new Date(startDateStr);
        const dEndDate = new Date(endDateStr);
        if (dStartDate >= dEndDate) {
            alert("Start date must be before end date.");
            return;
        }
        showDrySpellLoading(true);
        drySpellTable && (drySpellTable.innerHTML = '');
        drySpellResultsData = [];
        setTimeout(() => {
            try {
                const results = performDrySpellAnalysis(
                    allParsedDailyData,
                    minLength,
                    maxLength,
                    startDateStr,
                    endDateStr,
                    processedData.stationInfo
                );
                drySpellResultsData = results;
                displayDrySpellResults(results, processedData.stationInfo);
            } catch (error) {
                console.error("Error calculating dry spells:", error);
                alert(`Error calculating dry spells: ${error.message}`);
            } finally {
                showDrySpellLoading(false);
            }
        }, 50);
    }

    function performDrySpellAnalysis(dailyData, minLength, maxLengthExclusive, startDateStr, endDateStr, currentStationInfo) {
        const s1Key = currentStationInfo.s1Name;
        const s2Key = currentStationInfo.s2Name;
        const startDate = new Date(startDateStr + 'T00:00:00');
        const endDate = new Date(endDateStr + 'T00:00:00');
        const filteredData = dailyData.filter(day => {
            const dayDate = new Date(day.date + 'T00:00:00');
            return dayDate >= startDate && dayDate <= endDate;
        });
        if (filteredData.length === 0) return [];
        const dataByYear = {};
        filteredData.forEach(day => {
            const year = new Date(day.date + 'T00:00:00').getFullYear();
            if (!dataByYear[year]) dataByYear[year] = [];
            dataByYear[year].push(day);
        });
        const results = [];
        const years = Object.keys(dataByYear).map(Number).sort((a,b) => a - b);
        for (const year of years) {
            const yearData = dataByYear[year].sort((a,b) => new Date(a.date) - new Date(b.date));
            const s1RainSeries = yearData.map(d => d[s1Key]);
            const s2RainSeries = yearData.map(d => d[s2Key]);
            const s1DrySpells = countSpellsForStation(s1RainSeries, minLength, maxLengthExclusive);
            const s2DrySpells = countSpellsForStation(s2RainSeries, minLength, maxLengthExclusive);
            results.push({
                year: year,
                s1Count: s1DrySpells,
                s2Count: s2DrySpells,
                avgCount: (s1DrySpells + s2DrySpells) / 2
            });
        }
        return results;
    }

    function countSpellsForStation(dailyRainArray, minLength, maxLengthExclusive) {
        let spellCount = 0;
        let currentDryStreak = 0;
        const dryDayThreshold = 0;
        for (const rain of dailyRainArray) {
            if (rain <= dryDayThreshold) {
                currentDryStreak++;
            } else {
                if (currentDryStreak >= minLength && currentDryStreak < maxLengthExclusive) {
                    spellCount++;
                }
                currentDryStreak = 0;
            }
        }
        if (currentDryStreak >= minLength && currentDryStreak < maxLengthExclusive) {
            spellCount++;
        }
        return spellCount;
    }

    function displayDrySpellResults(results, currentStationInfo) {
        if (!drySpellTable) return;
        const s1 = currentStationInfo.s1Name;
        const s2 = currentStationInfo.s2Name;
        let html = `<thead><tr>
            <th>Year</th>
            <th>Dry Spells ${s1} (Count)</th>
            <th>Dry Spells ${s2} (Count)</th>
            <th>Avg Dry Spells (Count)</th>
        </tr></thead><tbody>`;
        if (results.length === 0) {
            html += `<tr><td colspan="4" class="text-center">No dry spells found for the selected criteria or no data in range.</td></tr>`;
        } else {
            results.forEach(row => {
                html += `<tr>
                    <td>${row.year}</td>
                    <td>${row.s1Count}</td>
                    <td>${row.s2Count}</td>
                    <td>${row.avgCount.toFixed(1)}</td>
                </tr>`;
            });
        }
        drySpellTable.innerHTML = html + '</tbody>';
    }

    // --- Export Functions ---
    function getTableData(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return [];
        const data = [];
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
        data.push(headers);
        table.querySelectorAll('tbody tr').forEach(row => {
            const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
            data.push(rowData);
        });
        return data;
    }

    exportCsvButton.addEventListener('click', () => {
        if (!processedData) { alert("No data to export."); return; }
        const activeTabId = document.querySelector('.tab-content.active').id.replace('Content', '');
        let dataToExport;
        let filename = "rainfall_analysis.csv";

        switch (activeTabId) {
            case 'annual':
                dataToExport = getTableData('annualTable');
                filename = "annual_summary.csv";
                break;
            case 'monthly':
                dataToExport = getTableData('monthlyTable');
                filename = "monthly_summary.csv";
                break;
            case 'rainyDays':
                dataToExport = getTableData('rainyDaysTable');
                filename = "rainy_days_summary.csv";
                break;
            case 'drought':
                dataToExport = getTableData('droughtTable');
                filename = "drought_analysis.csv";
                break;
            case 'drySpell':
                dataToExport = getTableData('drySpellTable');
                filename = "dry_spell_analysis.csv";
                break;
            default:
                alert("Unknown tab for export."); return;
        }

        const csvContent = Papa.unparse(dataToExport);
        downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
    });

    exportXlsxButton.addEventListener('click', () => {
        if (!processedData) { alert("No data to export."); return; }
        
        const wb = XLSX.utils.book_new();
        const s1Name = processedData.stationInfo.s1Name;
        const s2Name = processedData.stationInfo.s2Name;

        // Sheet 1: Annual Summary
        const annualHeaders = [
            "Year", `${s1Name} (mm)`, `${s2Name} (mm)`, "Spatial Avg (mm)",
            `Normal ${s1Name} (mm)`, `Normal ${s2Name} (mm)`, "Normal Spatial Avg (mm)",
            `Dev. ${s1Name} (%)`, `Dev. ${s2Name} (%)`, "Dev. Spatial Avg (%)"
        ];
        const annualSheetData = [annualHeaders].concat(
            processedData.annualRainfall.map(r => [
                r.year, r[s1Name], r[s2Name], r.spatialAverage,
                r.normalS1, r.normalS2, r.normalSpatial,
                r.deviationS1, r.deviationS2, r.deviationSpatial
            ].map(val => typeof val === 'number' ? parseFloat(val.toFixed(2)) : val))
        );
        const wsAnnual = XLSX.utils.aoa_to_sheet(annualSheetData);
        XLSX.utils.book_append_sheet(wb, wsAnnual, "Annual Summary");

        // Sheet 2: Monthly Summary
        const monthlyHeaders = [
            "Year", "Month", `${s1Name} (mm)`, `${s2Name} (mm)`, "Spatial Avg (mm)",
            `Normal ${s1Name} (mm)`, `Normal ${s2Name} (mm)`, "Normal Spatial Avg (mm)"
        ];
        const monthlySheetData = [monthlyHeaders].concat(
            processedData.monthlyRainfall.map(r => [
                r.year, r.monthName, r[s1Name], r[s2Name], r.spatialAverage,
                r.normalS1, r.normalS2, r.normalSpatial
            ].map(val => typeof val === 'number' ? parseFloat(val.toFixed(2)) : val))
        );
        const wsMonthly = XLSX.utils.aoa_to_sheet(monthlySheetData);
        XLSX.utils.book_append_sheet(wb, wsMonthly, "Monthly Summary");

        // Sheet 3: Rainy Days
        const rainyDaysHeaders = [
            "Year", `Rainy Days ${s1Name}`, `Rainy Days ${s2Name}`, "Avg Rainy Days",
            `Extreme Days ${s1Name}`, `Extreme Days ${s2Name}`, "Avg Extreme Days"
        ];
        const rainyDaysSheetData = [rainyDaysHeaders].concat(
            processedData.annualRainfall.map(r => [ // Data comes from annual aggregation
                r.year, r.s1RainyDays, r.s2RainyDays, r.avgRainyDays,
                r.s1ExtremeDays, r.s2ExtremeDays, r.avgExtremeDays
            ].map(val => typeof val === 'number' ? parseFloat(val.toFixed(1)) : val))
        );
        const wsRainyDays = XLSX.utils.aoa_to_sheet(rainyDaysSheetData);
        XLSX.utils.book_append_sheet(wb, wsRainyDays, "Rainy Days");

        // Sheet 4: Drought Analysis
        const droughtHeaders = [
            "Year", `Dev. ${s1Name} (%)`, `Classification ${s1Name}`,
            `Dev. ${s2Name} (%)`, `Classification ${s2Name}`,
            "Dev. Spatial (%)", "Classification Spatial"
        ];
        const droughtSheetData = [droughtHeaders].concat(
            processedData.droughtData.map(r => [
                r.year, r.deviationS1, r.classificationS1,
                r.deviationS2, r.classificationS2,
                r.deviationSpatial, r.classificationSpatial
            ].map(val => typeof val === 'number' ? parseFloat(val.toFixed(2)) : val))
        );
        const wsDrought = XLSX.utils.aoa_to_sheet(droughtSheetData);
        XLSX.utils.book_append_sheet(wb, wsDrought, "Drought Analysis");

        // Sheet 5: Dry Spell Analysis (if data exists)
        if (drySpellResultsData && drySpellResultsData.length > 0) {
            const drySpellHeaders = [
                "Year", `Dry Spells ${s1Name}`, `Dry Spells ${s2Name}`, "Avg Dry Spells"
            ];
            const drySpellSheetData = [drySpellHeaders].concat(
                drySpellResultsData.map(r => [
                    r.year, r.s1Count, r.s2Count, r.avgCount
                ].map(val => typeof val === 'number' ? parseFloat(val.toFixed(1)) : val))
            );
            const wsDrySpell = XLSX.utils.aoa_to_sheet(drySpellSheetData);
            XLSX.utils.book_append_sheet(wb, wsDrySpell, "Dry Spell Analysis");
        }
        XLSX.writeFile(wb, "rainfall_analysis_report.xlsx");
    });

    exportPdfButton.addEventListener('click', () => {
        if (!processedData) { alert("No data to export."); return; }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const s1Name = processedData.stationInfo.s1Name;
        const s2Name = processedData.stationInfo.s2Name;

        doc.setFontSize(18);
        doc.text("Rainfall Analysis Report", 14, 20);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Station 1: ${s1Name} (${processedData.stationInfo.s1Coords})`, 14, 30);
        doc.text(`Station 2: ${s2Name} (${processedData.stationInfo.s2Coords})`, 14, 36);
        
        let startY = 45;

        const addTableToPdf = (title, tableId, customHeaders) => {
            doc.setFontSize(14);
            doc.text(title, 14, startY);
            startY += 7;
            const tableElement = document.getElementById(tableId);
            const head = customHeaders ? [customHeaders] : [Array.from(tableElement.querySelectorAll('thead th')).map(th => th.textContent)];
            const body = Array.from(tableElement.querySelectorAll('tbody tr')).map(tr => 
                Array.from(tr.querySelectorAll('td')).map(td => td.textContent)
            );
            
            doc.autoTable({
                head: head,
                body: body,
                startY: startY,
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] }, // Tailwind's sky-600 approx
                styles: { fontSize: 8, cellPadding: 1.5 },
                columnStyles: { 0: { cellWidth: 'auto' } } // Adjust as needed
            });
            startY = doc.autoTable.previous.finalY + 10;
            if (startY > 260) { // check for page break
                doc.addPage();
                startY = 20;
            }
        };
        
        const annualHeaders = [
            "Year", `${s1Name.substring(0,7)}.`, `${s2Name.substring(0,7)}.`, "Spat.Avg",
            `N.${s1Name.substring(0,3)}`, `N.${s2Name.substring(0,3)}`, "N.Spat.Avg",
            `D.${s1Name.substring(0,3)}%`, `D.${s2Name.substring(0,3)}%`, "D.Spat.Avg%"
        ];
        addTableToPdf("Annual Summary", 'annualTable', annualHeaders);
        
        const monthlyHeaders = [
            "Yr", "Mth", `${s1Name.substring(0,7)}.`, `${s2Name.substring(0,7)}.`, "Spat.Avg",
            `N.${s1Name.substring(0,3)}`, `N.${s2Name.substring(0,3)}`, "N.Spat.Avg"
        ];
        addTableToPdf("Monthly Summary", 'monthlyTable', monthlyHeaders);
        
        const rainyDaysHeaders = [
            "Year", `Rainy ${s1Name.substring(0,3)}`, `Rainy ${s2Name.substring(0,3)}`, "Avg Rainy",
            `Extr. ${s1Name.substring(0,3)}`, `Extr. ${s2Name.substring(0,3)}`, "Avg Extr."
        ];
        addTableToPdf("Rainy Days Summary", 'rainyDaysTable', rainyDaysHeaders);

        const droughtHeaders = [
            "Year", `Dev ${s1Name.substring(0,3)}%`, `Class ${s1Name.substring(0,3)}`,
            `Dev ${s2Name.substring(0,3)}%`, `Class ${s2Name.substring(0,3)}`,
            "Dev Spat.%", "Class Spat."
        ];
        addTableToPdf("Drought Analysis", 'droughtTable', droughtHeaders);

        // Add Dry Spell table to PDF if data exists
        if (drySpellResultsData && drySpellResultsData.length > 0) {
            if (startY > 240) {
                doc.addPage();
                startY = 20;
            }
            const drySpellPdfHeaders = [
                "Year", `Spells ${s1Name.substring(0,5)}`, `Spells ${s2Name.substring(0,5)}`, "Avg Spells"
            ];
            addTableToPdf("Dry Spell Analysis", 'drySpellTable', drySpellPdfHeaders);
        }
        doc.save('rainfall_analysis_report.pdf');
    });

    function downloadFile(content, fileName, contentType) {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }
});