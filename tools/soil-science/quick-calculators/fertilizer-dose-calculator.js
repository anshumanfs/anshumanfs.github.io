const cropDefaults = {
  rice: { n: 120, p: 60, k: 40 },
  wheat: { n: 150, p: 60, k: 40 },
  maize: { n: 180, p: 75, k: 60 },
};

const cropSelect = document.getElementById('crop');
const nRateInput = document.getElementById('nRate');
const pRateInput = document.getElementById('pRate');
const kRateInput = document.getElementById('kRate');
const areaInput = document.getElementById('area');
const areaUnitSelect = document.getElementById('areaUnit');
const nSourceSelect = document.getElementById('nSource');
const pSourceSelect = document.getElementById('pSource');
const kSourceSelect = document.getElementById('kSource');
const calculateBtn = document.getElementById('calculateBtn');

const resultBox = document.getElementById('result');
const nutrientNeedText = document.getElementById('nutrientNeed');
const fertilizerQtyText = document.getElementById('fertilizerQty');
const splitDoseText = document.getElementById('splitDose');

function toHectare(area, unit) {
  return unit === 'acre' ? area * 0.404686 : area;
}

function applyPreset() {
  if (cropSelect.value === 'custom') {
    return;
  }

  const preset = cropDefaults[cropSelect.value];
  nRateInput.value = preset.n;
  pRateInput.value = preset.p;
  kRateInput.value = preset.k;
}

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculate() {
  const area = parseFloat(areaInput.value);
  const nRate = parseFloat(nRateInput.value);
  const pRate = parseFloat(pRateInput.value);
  const kRate = parseFloat(kRateInput.value);

  if (!area || area <= 0 || nRate < 0 || pRate < 0 || kRate < 0) {
    alert('Please enter valid area and NPK values.');
    return;
  }

  const areaHa = toHectare(area, areaUnitSelect.value);
  const nNeed = nRate * areaHa;
  const pNeed = pRate * areaHa;
  const kNeed = kRate * areaHa;

  const nFraction = parseFloat(nSourceSelect.value);
  const pFraction = parseFloat(pSourceSelect.value);
  const kFraction = parseFloat(kSourceSelect.value);

  const nSourceName = nSourceSelect.options[nSourceSelect.selectedIndex].text;
  const pSourceName = pSourceSelect.options[pSourceSelect.selectedIndex].text;
  const kSourceName = kSourceSelect.options[kSourceSelect.selectedIndex].text;

  const nFertilizer = nNeed / nFraction;
  const pFertilizer = pNeed / pFraction;
  const kFertilizer = kNeed / kFraction;

  nutrientNeedText.textContent =
    `Nutrient requirement: N ${round2(nNeed)} kg, P2O5 ${round2(pNeed)} kg, K2O ${round2(kNeed)} kg.`;

  fertilizerQtyText.textContent =
    `Fertilizer quantity: ${nSourceName} ${round2(nFertilizer)} kg, ${pSourceName} ${round2(pFertilizer)} kg, ${kSourceName} ${round2(kFertilizer)} kg.`;

  splitDoseText.textContent =
    `Suggested split: Apply full P and K at basal stage; apply N in 2-3 splits (for example 50% basal, 25% vegetative, 25% pre-flowering).`;

  resultBox.classList.remove('hidden');
}

cropSelect.addEventListener('change', applyPreset);
calculateBtn.addEventListener('click', calculate);
