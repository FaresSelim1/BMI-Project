

document.addEventListener('DOMContentLoaded', function () {
    const bmiForm = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weightUnit');
    const heightCmInput = document.getElementById('heightCm');

    const bmiResultEl = document.getElementById('bmiResult');
    const bmiLabelEl = document.getElementById('bmiLabel');
    const bmiInfoEl = document.getElementById('bmiInfo');
    const backBtn = document.getElementById('backBtn');

    // Prefill height from account settings if available
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.height) {
            heightCmInput.value = settings.height;
        }
    }

    backBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    bmiForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const weight = parseFloat(weightInput.value);
        const heightCm = parseFloat(heightCmInput.value);
        const unit = weightUnit.value;

        if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
            alert('Please enter valid positive numbers for weight and height.');
            return;
        }

        // Convert all to metric, then use BMI = weight(kg) / height(m)^2 [web:8][web:20][web:22]
        let weightKg = weight;
        if (unit === 'lb') {
            weightKg = weight * 0.453592; // pounds to kg [web:11]
        }
        const heightM = heightCm / 100;

        const bmi = weightKg / (heightM * heightM); // BMI formula metric [web:11][web:17][web:20]
        const bmiRounded = Number(bmi.toFixed(1));

        const status = getBMIStatus(bmiRounded);
        const now = new Date();

        bmiResultEl.textContent = bmiRounded.toString();
        bmiLabelEl.textContent = status;
        bmiLabelEl.className = 'bmi-status ' + getStatusClass(status);
        bmiInfoEl.textContent =
            'Updated on ' + now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        saveToHistory({
            date: now.toISOString().split('T')[0],
            weight: unit === 'kg' ? weight : Math.round(weight),
            height: cmToFeetInches(heightCm),
            bmi: bmiRounded
        });
    });

    function getBMIStatus(bmi) {
        if (bmi < 18.5) return 'Underweight';          // standard cut‑offs [web:24]
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    function getStatusClass(status) {
        if (status === 'Normal') return '';
        if (status === 'Underweight') return 'status-under';
        if (status === 'Overweight') return 'status-over';
        return 'status-obese';
    }

    function cmToFeetInches(cm) {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return `${feet}'${inches}"`;
    }

    function saveToHistory(entry) {
        let history = localStorage.getItem('bmiHistory');
        history = history ? JSON.parse(history) : [];
        history.push(entry);
        localStorage.setItem('bmiHistory', JSON.stringify(history)); // localStorage persistence [web:15][web:23]
    }
});
