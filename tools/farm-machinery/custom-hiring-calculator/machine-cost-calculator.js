// Configuration object for the calculator
const calculatorConfig = {
  salvageValuePercent: 10,       // 10% of initial cost
  taxesInsurancePercent: 3,      // 3% of average cost per year
  repairMaintenancePercent: 10,  // 10% of initial cost
  lubricatingOilPercent: 30,     // 30% of fuel cost
  hoursPerDay: 8                 // 8 hours per day for labor calculation
};

// i18n configuration
const resources = {
  en: {
    translation: {
      title: "Farm Machinery Custom Hiring Cost Calculator",
      userInfo: {
        title: "User Information",
        fullName: "Full Name",
        enterName: "Enter your name",
        mobileNumber: "Mobile Number",
        enterMobile: "Enter your mobile number"
      },
      navigation: {
        next: "Next",
        back: "Back",
        calculate: "Calculate Results",
        exportPdf: "Export to PDF"
      },
      fixedCost: {
        title: "Fixed Cost Calculation",
        purchasePrice: "Purchase Price of the Machine (Rs)",
        machineLife: "Life of the Machine (Years)",
        hoursPerYear: "Hours of Operation per Year",
        interestRate: "Rate of Interest (%)"
      },
      variableCost: {
        title: "Variable Cost Calculation",
        fuelConsumption: "Fuel Consumption (L/h)",
        fuelCost: "Cost of Fuel (Rs/L)",
        numWorkers: "Number of Workers",
        wagesWorkers: "Wages per Day for Workers (Rs)",
        numDrivers: "Number of Drivers",
        wagesDrivers: "Wages per Day for Drivers (Rs)",
        profitPercent: "Profit Percentage for Custom Hiring (%)"
      },
      results: {
        title: "Cost Calculation Results",
        fixedCosts: "Fixed Cost Components",
        variableCosts: "Variable Cost Components",
        finalResults: "Final Results",
        component: "Component",
        value: "Value (Rs/h)",
        totalFixedCost: "Total Fixed Cost",
        totalVariableCost: "Total Variable Cost",
        totalOperationCost: "Total Cost of Operation",
        customHiringCost: "Custom Hiring Cost (with 10% profit)"
      },
      fixedComponents: {
        salvageValue: "Salvage Value",
        depreciationCost: "Depreciation Cost",
        averagePurchasePrice: "Average Purchase Price",
        interestOnInvestment: "Interest on Investment",
        taxesInsurance: "Taxes, Insurance and Housing"
      },
      variableComponents: {
        repairMaintenance: "Repair and Maintenance Cost",
        fuelCost: "Fuel Cost",
        lubricatingOil: "Lubricating Oil Cost",
        operatorCost: "Operator Cost"
      },
      pdf: {
        title: "Farm Machinery Cost Calculation Report",
        generated: "Generated on",
        name: "Name",
        mobile: "Mobile",
        inputParameters: "Input Parameters",
        purchasePrice: "Purchase Price",
        machineLife: "Machine Life",
        hoursPerYear: "Hours per Year",
        interestRate: "Interest Rate",
        fuelConsumption: "Fuel Consumption",
        fuelCost: "Fuel Cost",
        workers: "Workers",
        drivers: "Drivers",
        profitPercent: "Profit Percentage",
        fixedCosts: "Fixed Costs (Rs/h)",
        variableCosts: "Variable Costs (Rs/h)",
        finalResults: "Final Results",
        description: "Description",
        years: "years",
        perDay: "per day"
      },
      footer: {
        appName: "Farm Machinery Custom Hiring Cost Calculator",
        year: "2025",
        developers: {
          scientist: {
            name: "Dr. Dwarika Mohan Das",
            role: "Scientist",
            org: "KVK Jagatsinghpur"
          },
          dean: {
            name: "Prof. Prasanjit Mishra",
            role: "Dean Extension Education",
            org: "OUAT Bhubaneswar"
          },
          engineer: {
            name: "Er. Anshuman Nayak",
            role: "Research Scholar IIT Kharagpur"
          }
        },
        credits: {
          development: "Developed by",
          design: "Scripted & Designed by"
        }
      }
    }
  },
  hi: {
    translation: {
      title: "कृषि मशीनरी कस्टम हायरिंग लागत कैलकुलेटर",
      userInfo: {
        title: "उपयोगकर्ता जानकारी",
        fullName: "पूरा नाम",
        enterName: "अपना नाम दर्ज करें",
        mobileNumber: "मोबाइल नंबर",
        enterMobile: "अपना मोबाइल नंबर दर्ज करें"
      },
      navigation: {
        next: "अगला",
        back: "पीछे",
        calculate: "परिणाम की गणना करें",
        exportPdf: "पीडीएफ में निर्यात करें"
      },
      fixedCost: {
        title: "स्थिर लागत गणना",
        purchasePrice: "मशीन का खरीद मूल्य (रु)",
        machineLife: "मशीन का जीवन (वर्ष)",
        hoursPerYear: "प्रति वर्ष संचालन के घंटे",
        interestRate: "ब्याज दर (%)"
      },
      variableCost: {
        title: "परिवर्तनीय लागत गणना",
        fuelConsumption: "ईंधन खपत (L/h)",
        fuelCost: "ईंधन की लागत (रु/L)",
        numWorkers: "कार्यकर्ताओं की संख्या",
        wagesWorkers: "कार्यकर्ताओं के लिए प्रति दिन मजदूरी (रु)",
        numDrivers: "ड्राइवरों की संख्या",
        wagesDrivers: "ड्राइवरों के लिए प्रति दिन मजदूरी (रु)",
        profitPercent: "कस्टम हायरिंग के लिए लाभ प्रतिशत (%)"
      },
      results: {
        title: "लागत गणना परिणाम",
        fixedCosts: "स्थिर लागत घटक",
        variableCosts: "परिवर्तनीय लागत घटक",
        finalResults: "अंतिम परिणाम",
        component: "घटक",
        value: "मूल्य (रु/h)",
        totalFixedCost: "कुल स्थिर लागत",
        totalVariableCost: "कुल परिवर्तनीय लागत",
        totalOperationCost: "संचालन की कुल लागत",
        customHiringCost: "कस्टम हायरिंग लागत (10% लाभ के साथ)"
      },
      fixedComponents: {
        salvageValue: "अवशेष मूल्य",
        depreciationCost: "मूल्यह्रास लागत",
        averagePurchasePrice: "औसत खरीद मूल्य",
        interestOnInvestment: "निवेश पर ब्याज",
        taxesInsurance: "कर, बीमा और आवास"
      },
      variableComponents: {
        repairMaintenance: "मरम्मत और रखरखाव लागत",
        fuelCost: "ईंधन लागत",
        lubricatingOil: "स्नेहन तेल की लागत",
        operatorCost: "ऑपरेटर लागत"
      },
      pdf: {
        title: "कृषि मशीनरी लागत गणना रिपोर्ट",
        generated: "पर उत्पन्न",
        name: "नाम",
        mobile: "मोबाइल",
        inputParameters: "इनपुट पैरामीटर",
        purchasePrice: "खरीद मूल्य",
        machineLife: "मशीन जीवन",
        hoursPerYear: "प्रति वर्ष घंटे",
        interestRate: "ब्याज दर",
        fuelConsumption: "ईंधन खपत",
        fuelCost: "ईंधन लागत",
        workers: "कार्यकर्ता",
        drivers: "ड्राइवर",
        profitPercent: "लाभ प्रतिशत",
        fixedCosts: "स्थिर लागत (रु/h)",
        variableCosts: "परिवर्तनीय लागत (रु/h)",
        finalResults: "अंतिम परिणाम",
        description: "विवरण",
        years: "वर्ष",
        perDay: "प्रति दिन"
      },
      footer: {
        appName: "कृषि मशीनरी कस्टम हायरिंग लागत कैलकुलेटर",
        year: "२०२५",
        developers: {
          scientist: {
            name: "डॉ. द्वारिका मोहन दास",
            role: "वैज्ञानिक",
            org: "केवीके जगतसिंहपुर"
          },
          dean: {
            name: "प्रो. प्रसनजीत मिश्रा",
            role: "डीन विस्तार शिक्षा",
            org: "ओयूएटी भुवनेश्वर"
          },
          engineer: {
            name: "इंजी. अंशुमन नायक",
            role: "रिसर्च स्कॉलर आईआईटी खड़गपुर"
          }
        },
        credits: {
          development: "द्वारा विकसित",
          design: "द्वारा स्क्रिप्ट और डिज़ाइन"
        }
      }
    }
  },
  or: {
    translation: {
      title: "କୃଷି ଯନ୍ତ୍ରପାତି ଭଡ଼ା ମୂଲ୍ୟ କ୍ୟାଲକୁଲେଟର",
      userInfo: {
        title: "ବ୍ୟବହାରକାରୀ ସୂଚନା",
        fullName: "ପୁରା ନାମ",
        enterName: "ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ",
        mobileNumber: "ମୋବାଇଲ ନମ୍ବର",
        enterMobile: "ଆପଣଙ୍କ ମୋବାଇଲ ନମ୍ବର ଲେଖନ୍ତୁ"
      },
      navigation: {
        next: "ପରବର୍ତ୍ତୀ",
        back: "ପଛକୁ",
        calculate: "ଫଳାଫଳ ଗଣନା କରନ୍ତୁ",
        exportPdf: "PDF କୁ ରପ୍ତାନି କରନ୍ତୁ"
      },
      fixedCost: {
        title: "ସ୍ଥିର ମୂଲ୍ୟ ଗଣନା",
        purchasePrice: "ଯନ୍ତ୍ରର କ୍ରୟ ମୂଲ୍ୟ (ଟଙ୍କା)",
        machineLife: "ଯନ୍ତ୍ରର ଜୀବନକାଳ (ବର୍ଷ)",
        hoursPerYear: "ବର୍ଷକୁ ପରିଚାଳନା ଘଣ୍ଟା",
        interestRate: "ସୁଧ ହାର (%)"
      },
      variableCost: {
        title: "ପରିବର୍ତ୍ତନଶୀଳ ମୂଲ୍ୟ ଗଣନା",
        fuelConsumption: "ଜ୍ୱାଳାନୀ ଖପତ (L/h)",
        fuelCost: "ଜ୍ୱାଳାନୀ ମୂଲ୍ୟ (ଟଙ୍କା/L)",
        numWorkers: "କର୍ମଚାରୀଙ୍କ ସଂଖ୍ୟା",
        wagesWorkers: "କର୍ମଚାରୀଙ୍କ ପାଇଁ ଦୈନିକ ମଜୁରି (ଟଙ୍କା)",
        numDrivers: "ଡ୍ରାଇଭରଙ୍କ ସଂଖ୍ୟା",
        wagesDrivers: "ଡ୍ରାଇଭରଙ୍କ ପାଇଁ ଦୈନିକ ମଜୁରି (ଟଙ୍କା)",
        profitPercent: "କଷ୍ଟମ ଭଡ଼ା ପାଇଁ ଲାଭ ପ୍ରତିଶତ (%)"
      },
      results: {
        title: "ମୂଲ୍ୟ ଗଣନା ଫଳାଫଳ",
        fixedCosts: "ସ୍ଥିର ମୂଲ୍ୟ ଉପାଦାନ",
        variableCosts: "ପରିବର୍ତ୍ତନଶୀଳ ମୂଲ୍ୟ ଉପାଦାନ",
        finalResults: "ଚୂଡ଼ାନ୍ତ ଫଳାଫଳ",
        component: "ଉପାଦାନ",
        value: "ମୂଲ୍ୟ (ଟଙ୍କା/h)",
        totalFixedCost: "ମୋଟ ସ୍ଥିର ମୂଲ୍ୟ",
        totalVariableCost: "ମୋଟ ପରିବର୍ତ୍ତନଶୀଳ ମୂଲ୍ୟ",
        totalOperationCost: "ପରିଚାଳନାର ମୋଟ ମୂଲ୍ୟ",
        customHiringCost: "କଷ୍ଟମ ଭଡ଼ା ମୂଲ୍ୟ (10% ଲାଭ ସହିତ)"
      },
      fixedComponents: {
        salvageValue: "ଅବଶିଷ୍ଟ ମୂଲ୍ୟ",
        depreciationCost: "ମୂଲ୍ୟହ୍ରାସ ମୂଲ୍ୟ",
        averagePurchasePrice: "ହାରାହାରି କ୍ରୟ ମୂଲ୍ୟ",
        interestOnInvestment: "ନିବେଶ ଉପରେ ସୁଧ",
        taxesInsurance: "କର, ବୀମା ଏବଂ ଆବାସ"
      },
      variableComponents: {
        repairMaintenance: "ମରାମତି ଏବଂ ରକ୍ଷଣାବେକ୍ଷଣ ମୂଲ୍ୟ",
        fuelCost: "ଜ୍ୱାଳାନୀ ମୂଲ୍ୟ",
        lubricatingOil: "ଲୁବ୍ରିକେଟିଂ ତେଲ ମୂଲ୍ୟ",
        operatorCost: "ଅପରେଟର ମୂଲ୍ୟ"
      },
      pdf: {
        title: "କୃଷି ଯନ୍ତ୍ରପାତି ମୂଲ୍ୟ ଗଣନା ରିପୋର୍ଟ",
        generated: "ରେ ସୃଷ୍ଟି ହୋଇଛି",
        name: "ନାମ",
        mobile: "ମୋବାଇଲ",
        inputParameters: "ଇନପୁଟ ପାରାମିଟର",
        purchasePrice: "କ୍ରୟ ମୂଲ୍ୟ",
        machineLife: "ଯନ୍ତ୍ର ଜୀବନ",
        hoursPerYear: "ବର୍ଷକୁ ଘଣ୍ଟା",
        interestRate: "ସୁଧ ହାର",
        fuelConsumption: "ଜ୍ୱାଳାନୀ ଖପତ",
        fuelCost: "ଜ୍ୱାଳାନୀ ମୂଲ୍ୟ",
        workers: "କର୍ମଚାରୀ",
        drivers: "ଡ୍ରାଇଭର",
        profitPercent: "ଲାଭ ପ୍ରତିଶତ",
        fixedCosts: "ସ୍ଥିର ମୂଲ୍ୟ (ଟଙ୍କା/h)",
        variableCosts: "ପରିବର୍ତ୍ତନଶୀଳ ମୂଲ୍ୟ (ଟଙ୍କା/h)",
        finalResults: "ଚୂଡ଼ାନ୍ତ ଫଳାଫଳ",
        description: "ବିବରଣୀ",
        years: "ବର୍ଷ",
        perDay: "ପ୍ରତିଦିନ"
      },
      footer: {
        appName: "କୃଷି ଯନ୍ତ୍ରପାତି ଭଡ଼ା ମୂଲ୍ୟ କ୍ୟାଲକୁଲେଟର",
        year: "୨୦୨୫",
        developers: {
          scientist: {
            name: "ଡା. ଦ୍ୱାରିକା ମୋହନ ଦାସ",
            role: "ବୈଜ୍ଞାନିକ",
            org: "କେଭିକେ ଜଗତସିଂହପୁର"
          },
          dean: {
            name: "ପ୍ରଫେସର ପ୍ରସନଜିତ ମିଶ୍ର",
            role: "ଡିନ୍ ଏକ୍ସଟେନସନ ଏଡୁକେସନ",
            org: "ଓୟୁଏଟି ଭୁବନେଶ୍ୱର"
          },
          engineer: {
            name: "ଇଂ. ଅଂଶୁମାନ ନାୟକ",
            role: "ରିସର୍ଚ୍ଚ ସ୍କଲାର ଆଇଆଇଟି ଖରଗପୁର"
          }
        },
        credits: {
          development: "ଦ୍ୱାରା ବିକଶିତ",
          design: "ଦ୍ୱାରା ସ୍କ୍ରିପ୍ଟ ଏବଂ ଡିଜାଇନ"
        }
      }
    }
  }
};

// Initialize i18next
i18next
  .init({
    lng: 'en',
    debug: false,
    resources: resources
  })
  .then(function (t) {
    updateContent();
  });

// Function to update content based on selected language
function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });

  // Handle placeholder attributes
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.setAttribute('placeholder', i18next.t(key));
  });

  // Update language selection buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    if (btn.id === 'lang-' + i18next.language) {
      btn.classList.add('bg-green-700', 'text-white');
      btn.classList.remove('bg-white', 'text-gray-900');
    } else {
      btn.classList.remove('bg-green-700', 'text-white');
      btn.classList.add('bg-white', 'text-gray-900');
    }
  });
}

// Language selection handlers
document.getElementById('lang-en').addEventListener('click', function () {
  i18next.changeLanguage('en').then(updateContent);
});

document.getElementById('lang-hi').addEventListener('click', function () {
  i18next.changeLanguage('hi').then(updateContent);
});

document.getElementById('lang-or').addEventListener('click', function () {
  i18next.changeLanguage('or').then(updateContent);
});

// Navigation controls
document.getElementById('next-to-fixed').addEventListener('click', () => {
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('step1-label').classList.remove('text-green-700');
  document.getElementById('step1-label').classList.add('text-gray-400');
  document.getElementById('step2-label').classList.remove('text-gray-400');
  document.getElementById('step2-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '50%';
});

document.getElementById('back-to-user').addEventListener('click', () => {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('step2-label').classList.remove('text-green-700');
  document.getElementById('step2-label').classList.add('text-gray-400');
  document.getElementById('step1-label').classList.remove('text-gray-400');
  document.getElementById('step1-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '25%';
});

document.getElementById('next-to-variable').addEventListener('click', () => {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
  document.getElementById('step2-label').classList.remove('text-green-700');
  document.getElementById('step2-label').classList.add('text-gray-400');
  document.getElementById('step3-label').classList.remove('text-gray-400');
  document.getElementById('step3-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '75%';
});

document.getElementById('back-to-fixed').addEventListener('click', () => {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('step3-label').classList.remove('text-green-700');
  document.getElementById('step3-label').classList.add('text-gray-400');
  document.getElementById('step2-label').classList.remove('text-gray-400');
  document.getElementById('step2-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '50%';
});

document.getElementById('back-to-variable').addEventListener('click', () => {
  document.getElementById('step4').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
  document.getElementById('step4-label').classList.remove('text-green-700');
  document.getElementById('step4-label').classList.add('text-gray-400');
  document.getElementById('step3-label').classList.remove('text-gray-400');
  document.getElementById('step3-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '75%';
});

// Calculate results
document.getElementById('calculate-results').addEventListener('click', () => {
  // Get fixed cost inputs
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
  const machineLife = parseFloat(document.getElementById('machineLife').value);
  const hoursPerYear = parseFloat(document.getElementById('hoursPerYear').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value);

  // Get variable cost inputs
  const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
  const fuelCost = parseFloat(document.getElementById('fuelCost').value);
  const numWorkers = parseFloat(document.getElementById('numWorkers').value);
  const wagesWorkers = parseFloat(document.getElementById('wagesWorkers').value);
  const numDrivers = parseFloat(document.getElementById('numDrivers').value);
  const wagesDrivers = parseFloat(document.getElementById('wagesDrivers').value);
  const profitPercent = parseFloat(document.getElementById('profitPercent').value);

  // Calculate fixed costs
  const salvageValue = purchasePrice * (calculatorConfig.salvageValuePercent / 100);
  const depreciationCost = (purchasePrice - salvageValue) / (machineLife * hoursPerYear);
  const averagePurchasePrice = (purchasePrice + salvageValue) / 2;
  const interestOnInvestment = (averagePurchasePrice * interestRate) / (100 * hoursPerYear);
  const taxesInsurance = (averagePurchasePrice * calculatorConfig.taxesInsurancePercent) / (100 * hoursPerYear);
  const totalFixedCost = depreciationCost + interestOnInvestment + taxesInsurance;

  // Calculate variable costs
  const repairMaintenanceCost = (purchasePrice * calculatorConfig.repairMaintenancePercent) / (100 * machineLife * hoursPerYear);
  const fuelCostPerHour = fuelConsumption * fuelCost;
  const lubricatingOilCost = fuelCostPerHour * (calculatorConfig.lubricatingOilPercent / 100);
  const operatorCost = ((numWorkers * wagesWorkers) + (numDrivers * wagesDrivers)) / calculatorConfig.hoursPerDay;
  const totalVariableCost = repairMaintenanceCost + fuelCostPerHour + lubricatingOilCost + operatorCost;

  // Calculate final costs
  const totalOperationCost = totalFixedCost + totalVariableCost;
  const customHiringCost = totalOperationCost * (1 + profitPercent / 100);

  // Update fixed cost table
  const fixedCostTable = document.getElementById('fixedCostTable');
  fixedCostTable.innerHTML = `
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('fixedComponents.salvageValue')}</td>
          <td class="py-2 px-4 border-b text-right">${salvageValue.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('fixedComponents.depreciationCost')}</td>
          <td class="py-2 px-4 border-b text-right">${depreciationCost.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('fixedComponents.averagePurchasePrice')}</td>
          <td class="py-2 px-4 border-b text-right">${averagePurchasePrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('fixedComponents.interestOnInvestment')}</td>
          <td class="py-2 px-4 border-b text-right">${interestOnInvestment.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('fixedComponents.taxesInsurance')}</td>
          <td class="py-2 px-4 border-b text-right">${taxesInsurance.toFixed(2)}</td>
        </tr>
      `;
  document.getElementById('totalFixedCost').textContent = totalFixedCost.toFixed(2);

  // Update variable cost table
  const variableCostTable = document.getElementById('variableCostTable');
  variableCostTable.innerHTML = `
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('variableComponents.repairMaintenance')}</td>
          <td class="py-2 px-4 border-b text-right">${repairMaintenanceCost.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('variableComponents.fuelCost')}</td>
          <td class="py-2 px-4 border-b text-right">${fuelCostPerHour.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('variableComponents.lubricatingOil')}</td>
          <td class="py-2 px-4 border-b text-right">${lubricatingOilCost.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="py-2 px-4 border-b">${i18next.t('variableComponents.operatorCost')}</td>
          <td class="py-2 px-4 border-b text-right">${operatorCost.toFixed(2)}</td>
        </tr>
      `;
  document.getElementById('totalVariableCost').textContent = totalVariableCost.toFixed(2);

  // Update final results
  document.getElementById('totalOperationCost').textContent = `${totalOperationCost.toFixed(2)} Rs/h`;
  document.getElementById('customHiringCost').textContent = `${customHiringCost.toFixed(2)} Rs/h`;

  // Update the profit percentage display
  document.getElementById('profitPercentDisplay').textContent = profitPercent;

  // Show results step
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('step4').classList.remove('hidden');
  document.getElementById('step3-label').classList.remove('text-green-700');
  document.getElementById('step3-label').classList.add('text-gray-400');
  document.getElementById('step4-label').classList.remove('text-gray-400');
  document.getElementById('step4-label').classList.add('text-green-700');
  document.getElementById('progress-bar').style.width = '100%';
});

// Export to PDF/Print button click handler
document.getElementById('download-pdf').addEventListener('click', () => {
  // Use the print method for all languages
  printReport();
});

// Print functionality for all languages
function printReport() {
  // Create a print-friendly version of the report
  const printContents = document.createElement('div');
  printContents.className = 'print-content';

  // Add report header
  const header = document.createElement('div');
  header.className = 'print-header';

  // Title
  const titleElement = document.createElement('h1');
  titleElement.textContent = i18next.t('title');
  titleElement.style.textAlign = 'center';
  titleElement.style.fontSize = '24px';
  titleElement.style.color = '#276749';
  titleElement.style.marginBottom = '10px';
  header.appendChild(titleElement);

  // Date
  const dateElement = document.createElement('p');
  dateElement.textContent = `${i18next.t('pdf.generated')}: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  dateElement.style.textAlign = 'center';
  dateElement.style.color = '#666';
  dateElement.style.fontSize = '14px';
  dateElement.style.marginBottom = '20px';
  header.appendChild(dateElement);

  // User info
  const userElement = document.createElement('div');
  userElement.style.marginBottom = '20px';
  const nameElement = document.createElement('p');
  nameElement.textContent = `${i18next.t('pdf.name')}: ${document.getElementById('userName').value || 'Not provided'}`;
  const mobileElement = document.createElement('p');
  mobileElement.textContent = `${i18next.t('pdf.mobile')}: ${document.getElementById('userMobile').value || 'Not provided'}`;
  userElement.appendChild(nameElement);
  userElement.appendChild(mobileElement);
  header.appendChild(userElement);

  printContents.appendChild(header);

  // Input parameters section
  const inputSection = document.createElement('div');

  const inputTitle = document.createElement('h2');
  inputTitle.textContent = i18next.t('pdf.inputParameters');
  inputTitle.style.borderBottom = '1px solid #ccc';
  inputTitle.style.paddingBottom = '5px';
  inputTitle.style.marginBottom = '10px';
  inputTitle.style.color = '#276749';
  inputSection.appendChild(inputTitle);

  const inputGrid = document.createElement('div');
  inputGrid.style.display = 'grid';
  inputGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  inputGrid.style.gap = '10px';
  inputGrid.style.marginBottom = '20px';

  const params = [
    { label: i18next.t('pdf.purchasePrice'), value: `Rs ${document.getElementById('purchasePrice').value}` },
    { label: i18next.t('pdf.machineLife'), value: `${document.getElementById('machineLife').value} ${i18next.t('pdf.years')}` },
    { label: i18next.t('pdf.hoursPerYear'), value: document.getElementById('hoursPerYear').value },
    { label: i18next.t('pdf.interestRate'), value: `${document.getElementById('interestRate').value}%` },
    { label: i18next.t('pdf.fuelConsumption'), value: `${document.getElementById('fuelConsumption').value} L/h` },
    { label: i18next.t('pdf.fuelCost'), value: `Rs ${document.getElementById('fuelCost').value}/L` },
    { label: i18next.t('pdf.workers'), value: `${document.getElementById('numWorkers').value} (Rs ${document.getElementById('wagesWorkers').value} ${i18next.t('pdf.perDay')})` },
    { label: i18next.t('pdf.drivers'), value: `${document.getElementById('numDrivers').value} (Rs ${document.getElementById('wagesDrivers').value} ${i18next.t('pdf.perDay')})` },
    { label: i18next.t('pdf.profitPercent'), value: `${document.getElementById('profitPercent').value}%` }
  ];

  params.forEach(param => {
    const paramElement = document.createElement('div');
    paramElement.textContent = `${param.label}: ${param.value}`;
    inputGrid.appendChild(paramElement);
  });

  inputSection.appendChild(inputGrid);
  printContents.appendChild(inputSection);

  // Fixed costs section
  const fixedSection = document.createElement('div');
  fixedSection.style.marginTop = '20px';

  const fixedTitle = document.createElement('h2');
  fixedTitle.textContent = i18next.t('pdf.fixedCosts');
  fixedTitle.style.borderBottom = '1px solid #ccc';
  fixedTitle.style.paddingBottom = '5px';
  fixedTitle.style.marginBottom = '10px';
  fixedTitle.style.color = '#276749';
  fixedSection.appendChild(fixedTitle);

  // Create fixed cost table
  const fixedTable = document.createElement('table');
  fixedTable.style.width = '100%';
  fixedTable.style.borderCollapse = 'collapse';
  fixedTable.style.marginBottom = '20px';

  // Add fixed cost header
  const fixedTableHead = document.createElement('thead');
  const fixedHeaderRow = document.createElement('tr');

  const componentHeader = document.createElement('th');
  componentHeader.textContent = i18next.t('results.component');
  componentHeader.style.padding = '8px';
  componentHeader.style.backgroundColor = '#f0f0f0';
  componentHeader.style.border = '1px solid #ddd';
  componentHeader.style.textAlign = 'left';

  const valueHeader = document.createElement('th');
  valueHeader.textContent = i18next.t('results.value');
  valueHeader.style.padding = '8px';
  valueHeader.style.backgroundColor = '#f0f0f0';
  valueHeader.style.border = '1px solid #ddd';
  valueHeader.style.textAlign = 'right';

  fixedHeaderRow.appendChild(componentHeader);
  fixedHeaderRow.appendChild(valueHeader);
  fixedTableHead.appendChild(fixedHeaderRow);
  fixedTable.appendChild(fixedTableHead);

  // Get fixed cost data
  const fixedTableBody = document.createElement('tbody');
  document.querySelectorAll('#fixedCostTable tr').forEach(row => {
    if (row.cells && row.cells.length >= 2) {
      const fixedRow = document.createElement('tr');

      const componentCell = document.createElement('td');
      componentCell.textContent = row.cells[0].textContent;
      componentCell.style.padding = '8px';
      componentCell.style.border = '1px solid #ddd';

      const valueCell = document.createElement('td');
      valueCell.textContent = row.cells[1].textContent;
      valueCell.style.padding = '8px';
      valueCell.style.border = '1px solid #ddd';
      valueCell.style.textAlign = 'right';

      fixedRow.appendChild(componentCell);
      fixedRow.appendChild(valueCell);
      fixedTableBody.appendChild(fixedRow);
    }
  });

  fixedTable.appendChild(fixedTableBody);

  // Add fixed cost footer
  const fixedFooter = document.createElement('tfoot');
  const fixedTotalRow = document.createElement('tr');
  fixedTotalRow.style.backgroundColor = '#f9f9f9';

  const fixedTotalLabel = document.createElement('td');
  fixedTotalLabel.textContent = i18next.t('results.totalFixedCost');
  fixedTotalLabel.style.padding = '8px';
  fixedTotalLabel.style.border = '1px solid #ddd';
  fixedTotalLabel.style.fontWeight = 'bold';

  const fixedTotalValue = document.createElement('td');
  fixedTotalValue.textContent = document.getElementById('totalFixedCost').textContent;
  fixedTotalValue.style.padding = '8px';
  fixedTotalValue.style.border = '1px solid #ddd';
  fixedTotalValue.style.textAlign = 'right';
  fixedTotalValue.style.fontWeight = 'bold';

  fixedTotalRow.appendChild(fixedTotalLabel);
  fixedTotalRow.appendChild(fixedTotalValue);
  fixedFooter.appendChild(fixedTotalRow);
  fixedTable.appendChild(fixedFooter);

  fixedSection.appendChild(fixedTable);
  printContents.appendChild(fixedSection);

  // Variable costs section
  const variableSection = document.createElement('div');
  variableSection.style.marginTop = '20px';

  const variableTitle = document.createElement('h2');
  variableTitle.textContent = i18next.t('pdf.variableCosts');
  variableTitle.style.borderBottom = '1px solid #ccc';
  variableTitle.style.paddingBottom = '5px';
  variableTitle.style.marginBottom = '10px';
  variableTitle.style.color = '#276749';
  variableSection.appendChild(variableTitle);

  // Create variable cost table
  const variableTable = document.createElement('table');
  variableTable.style.width = '100%';
  variableTable.style.borderCollapse = 'collapse';
  variableTable.style.marginBottom = '20px';

  // Add variable cost header
  const variableTableHead = document.createElement('thead');
  const variableHeaderRow = document.createElement('tr');

  const varComponentHeader = document.createElement('th');
  varComponentHeader.textContent = i18next.t('results.component');
  varComponentHeader.style.padding = '8px';
  varComponentHeader.style.backgroundColor = '#f0f0f0';
  varComponentHeader.style.border = '1px solid #ddd';
  varComponentHeader.style.textAlign = 'left';

  const varValueHeader = document.createElement('th');
  varValueHeader.textContent = i18next.t('results.value');
  varValueHeader.style.padding = '8px';
  varValueHeader.style.backgroundColor = '#f0f0f0';
  varValueHeader.style.border = '1px solid #ddd';
  varValueHeader.style.textAlign = 'right';

  variableHeaderRow.appendChild(varComponentHeader);
  variableHeaderRow.appendChild(varValueHeader);
  variableTableHead.appendChild(variableHeaderRow);
  variableTable.appendChild(variableTableHead);

  // Get variable cost data
  const variableTableBody = document.createElement('tbody');
  document.querySelectorAll('#variableCostTable tr').forEach(row => {
    if (row.cells && row.cells.length >= 2) {
      const variableRow = document.createElement('tr');

      const componentCell = document.createElement('td');
      componentCell.textContent = row.cells[0].textContent;
      componentCell.style.padding = '8px';
      componentCell.style.border = '1px solid #ddd';

      const valueCell = document.createElement('td');
      valueCell.textContent = row.cells[1].textContent;
      valueCell.style.padding = '8px';
      valueCell.style.border = '1px solid #ddd';
      valueCell.style.textAlign = 'right';

      variableRow.appendChild(componentCell);
      variableRow.appendChild(valueCell);
      variableTableBody.appendChild(variableRow);
    }
  });

  variableTable.appendChild(variableTableBody);

  // Add variable cost footer
  const variableFooter = document.createElement('tfoot');
  const variableTotalRow = document.createElement('tr');
  variableTotalRow.style.backgroundColor = '#f9f9f9';

  const variableTotalLabel = document.createElement('td');
  variableTotalLabel.textContent = i18next.t('results.totalVariableCost');
  variableTotalLabel.style.padding = '8px';
  variableTotalLabel.style.border = '1px solid #ddd';
  variableTotalLabel.style.fontWeight = 'bold';

  const variableTotalValue = document.createElement('td');
  variableTotalValue.textContent = document.getElementById('totalVariableCost').textContent;
  variableTotalValue.style.padding = '8px';
  variableTotalValue.style.border = '1px solid #ddd';
  variableTotalValue.style.textAlign = 'right';
  variableTotalValue.style.fontWeight = 'bold';

  variableTotalRow.appendChild(variableTotalLabel);
  variableTotalRow.appendChild(variableTotalValue);
  variableFooter.appendChild(variableTotalRow);
  variableTable.appendChild(variableFooter);

  variableSection.appendChild(variableTable);
  printContents.appendChild(variableSection);

  // Final results section
  const finalSection = document.createElement('div');
  finalSection.style.marginTop = '20px';

  const finalTitle = document.createElement('h2');
  finalTitle.textContent = i18next.t('pdf.finalResults');
  finalTitle.style.borderBottom = '1px solid #ccc';
  finalTitle.style.paddingBottom = '5px';
  finalTitle.style.marginBottom = '10px';
  finalTitle.style.color = '#276749';
  finalSection.appendChild(finalTitle);

  const finalTable = document.createElement('table');
  finalTable.style.width = '100%';
  finalTable.style.borderCollapse = 'collapse';
  finalTable.style.marginBottom = '20px';

  // Headers
  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const descHeader = document.createElement('th');
  descHeader.textContent = i18next.t('pdf.description');
  descHeader.style.padding = '8px';
  descHeader.style.backgroundColor = '#e2e8f0';
  descHeader.style.textAlign = 'left';
  descHeader.style.border = '1px solid #cbd5e0';

  // Fix: Use a different variable name for the final results value header
  const finalValueHeader = document.createElement('th');
  finalValueHeader.textContent = i18next.t('results.value');
  finalValueHeader.style.padding = '8px';
  finalValueHeader.style.backgroundColor = '#e2e8f0';
  finalValueHeader.style.textAlign = 'right';
  finalValueHeader.style.border = '1px solid #cbd5e0';

  headerRow.appendChild(descHeader);
  headerRow.appendChild(finalValueHeader);
  tableHead.appendChild(headerRow);
  finalTable.appendChild(tableHead);

  // Total operation cost and custom hiring cost
  const tableBody = document.createElement('tbody');

  const opRow = document.createElement('tr');
  const opLabelCell = document.createElement('td');
  opLabelCell.textContent = i18next.t('results.totalOperationCost');
  opLabelCell.style.padding = '8px';
  opLabelCell.style.border = '1px solid #cbd5e0';

  const opValueCell = document.createElement('td');
  opValueCell.textContent = document.getElementById('totalOperationCost').textContent;
  opValueCell.style.padding = '8px';
  opValueCell.style.border = '1px solid #cbd5e0';
  opValueCell.style.textAlign = 'right';
  opValueCell.style.fontWeight = 'bold';

  opRow.appendChild(opLabelCell);
  opRow.appendChild(opValueCell);
  tableBody.appendChild(opRow);

  const hiringRow = document.createElement('tr');
  const hiringLabelCell = document.createElement('td');
  hiringLabelCell.textContent = i18next.t('results.customHiringCost');
  hiringLabelCell.style.padding = '8px';
  hiringLabelCell.style.border = '1px solid #cbd5e0';

  const hiringValueCell = document.createElement('td');
  hiringValueCell.textContent = document.getElementById('customHiringCost').textContent;
  hiringValueCell.style.padding = '8px';
  hiringValueCell.style.border = '1px solid #cbd5e0';
  hiringValueCell.style.textAlign = 'right';
  hiringValueCell.style.fontWeight = 'bold';

  hiringRow.appendChild(hiringLabelCell);
  hiringRow.appendChild(hiringValueCell);
  tableBody.appendChild(hiringRow);

  finalTable.appendChild(tableBody);
  finalSection.appendChild(finalTable);

  printContents.appendChild(finalSection);

  // Add footer
  const footer = document.createElement('div');
  footer.style.marginTop = '30px';
  footer.style.textAlign = 'center';
  footer.style.color = '#666';
  footer.style.borderTop = '1px solid #ddd';
  footer.style.paddingTop = '10px';

  const copyright = document.createElement('p');
  copyright.textContent = `${i18next.t('footer.copyright')} © 2025`;
  footer.appendChild(copyright);

  const authorInfo = document.createElement('p');
  authorInfo.textContent = i18next.t('footer.developed');
  footer.appendChild(authorInfo);

  printContents.appendChild(footer);

  // Create a wrapper that temporarily holds everything for printing
  const printWrapper = document.createElement('div');
  printWrapper.id = 'print-wrapper';
  printWrapper.appendChild(printContents);

  // Add print-specific CSS
  const printStyles = document.createElement('style');
  printStyles.textContent = `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-wrapper, #print-wrapper * {
            visibility: visible;
          }
          #print-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: avoid;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f0f0f0;
          }
          h2 {
            page-break-before: auto;
            page-break-after: avoid;
          }
          h1 {
            page-break-before: avoid;
            page-break-after: avoid;
          }
        }
      `;

  // Add everything to the document
  document.body.appendChild(printStyles);
  document.body.appendChild(printWrapper);

  // Trigger the print dialog
  window.print();

  // Clean up after printing
  setTimeout(() => {
    document.body.removeChild(printWrapper);
    document.body.removeChild(printStyles);
  }, 1000);
}
