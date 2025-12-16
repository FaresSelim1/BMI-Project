document.addEventListener('DOMContentLoaded', function() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        const firstName = user.name.split(' ')[0];
        document.getElementById('userName').textContent = firstName;
    }

    const bmiHistory = localStorage.getItem('bmiHistory');
    if (bmiHistory) {
        const history = JSON.parse(bmiHistory);
        if (history.length > 0) {
            const lastEntry = history[history.length - 1];
            document.getElementById('lastBMI').textContent = lastEntry.bmi;
            document.getElementById('bmiStatus').textContent = getBMIStatus(lastEntry.bmi);
            document.getElementById('lastUpdated').textContent = formatDate(lastEntry.date);
        }
    }
});

function getBMIStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
