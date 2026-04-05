const areaInput = document.getElementById('area');
const areaUnitSelect = document.getElementById('areaUnit');
const sprayVolumeInput = document.getElementById('sprayVolume');
const doseInput = document.getElementById('dose');
const doseUnitSelect = document.getElementById('doseUnit');
const tankCapacityInput = document.getElementById('tankCapacity');
const calculateBtn = document.getElementById('calculateBtn');

const resultBox = document.getElementById('result');
const solutionNeedText = document.getElementById('solutionNeed');
const productNeedText = document.getElementById('productNeed');
const tankPlanText = document.getElementById('tankPlan');
const perTankDoseText = document.getElementById('perTankDose');

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function toAcre(area, unit) {
  return unit === 'ha' ? area * 2.47105 : area;
}

function calculateSprayMix() {
  const area = parseFloat(areaInput.value);
  const sprayVolume = parseFloat(sprayVolumeInput.value);
  const dose = parseFloat(doseInput.value);
  const tankCapacity = parseFloat(tankCapacityInput.value);

  if (!area || area <= 0 || !sprayVolume || sprayVolume <= 0 || !dose || dose <= 0 || !tankCapacity || tankCapacity <= 0) {
    alert('Please enter valid values in all fields.');
    return;
  }

  const areaAcre = toAcre(area, areaUnitSelect.value);
  const totalSolutionL = areaAcre * sprayVolume;
  const totalProduct = totalSolutionL * dose;
  const totalTanks = totalSolutionL / tankCapacity;
  const perTankProduct = tankCapacity * dose;

  solutionNeedText.textContent = `Total spray solution required: ${round2(totalSolutionL)} L.`;

  const productUnit = doseUnitSelect.value === 'mlPerL' ? 'ml' : 'g';
  productNeedText.textContent = `Total product required: ${round2(totalProduct)} ${productUnit}.`;

  tankPlanText.textContent = `Approximate number of tank refills: ${round2(totalTanks)} tanks.`;
  perTankDoseText.textContent = `Product per ${tankCapacity} L tank: ${round2(perTankProduct)} ${productUnit}.`;

  resultBox.classList.remove('hidden');
}

calculateBtn.addEventListener('click', calculateSprayMix);
