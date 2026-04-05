const areaInput = document.getElementById('area');
const areaUnitSelect = document.getElementById('areaUnit');
const rowSpacingInput = document.getElementById('rowSpacing');
const plantSpacingInput = document.getElementById('plantSpacing');
const germinationInput = document.getElementById('germination');
const purityInput = document.getElementById('purity');
const seedWeightInput = document.getElementById('seedWeight');
const calculateBtn = document.getElementById('calculateBtn');

const resultBox = document.getElementById('result');
const populationText = document.getElementById('population');
const seedReqText = document.getElementById('seedReq');
const adviceText = document.getElementById('advice');

function toSquareMeter(area, unit) {
  return unit === 'acre' ? area * 4046.86 : area * 10000;
}

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function calculateSeedRate() {
  const area = parseFloat(areaInput.value);
  const rowSpacingCm = parseFloat(rowSpacingInput.value);
  const plantSpacingCm = parseFloat(plantSpacingInput.value);
  const germination = parseFloat(germinationInput.value);
  const purity = parseFloat(purityInput.value);
  const seedWeight = parseFloat(seedWeightInput.value);

  if (
    !area || area <= 0 || !rowSpacingCm || !plantSpacingCm ||
    germination <= 0 || purity <= 0 || !seedWeight || seedWeight <= 0
  ) {
    alert('Please enter valid values in all fields.');
    return;
  }

  const areaSqM = toSquareMeter(area, areaUnitSelect.value);
  const spacingSqM = (rowSpacingCm / 100) * (plantSpacingCm / 100);

  const targetPlants = areaSqM / spacingSqM;
  const survivalFraction = (germination / 100) * (purity / 100);
  const seedsRequired = targetPlants / survivalFraction;

  const totalSeedKg = (seedsRequired * (seedWeight / 1000)) / 1000;

  populationText.textContent =
    `Target plant population: ${Math.round(targetPlants).toLocaleString()} plants.`;

  seedReqText.textContent =
    `Estimated seed requirement: ${round2(totalSeedKg)} kg.`;

  adviceText.textContent =
    'Practical tip: Keep a 5-10% safety margin for field losses and calibration differences during sowing.';

  resultBox.classList.remove('hidden');
}

calculateBtn.addEventListener('click', calculateSeedRate);
