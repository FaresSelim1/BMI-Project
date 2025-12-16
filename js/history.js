

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bmiChart');
    const ctx = canvas.getContext('2d');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tableBody = document.getElementById('historyTableBody');

    let bmiData = [
        { date: '2024-01-01', weight: 165, height: "5'10\"", bmi: 23.7 },
        { date: '2024-01-10', weight: 166, height: "5'10\"", bmi: 23.8 },
        { date: '2024-01-20', weight: 164, height: "5'10\"", bmi: 23.5 },
        { date: '2024-01-30', weight: 165, height: "5'10\"", bmi: 23.7 }
    ];

    const savedData = localStorage.getItem('bmiHistory');
    if (savedData) {
        bmiData = JSON.parse(savedData);
    }

    function drawChart(data) {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        if (data.length === 0) return;

        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const xStep = chartWidth / (data.length - 1);
        
        const bmiValues = data.map(d => d.bmi);
        const minBMI = Math.min(...bmiValues) - 1;
        const maxBMI = Math.max(...bmiValues) + 1;
        const bmiRange = maxBMI - minBMI;

        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.forEach((entry, index) => {
            const x = padding + index * xStep;
            const y = height - padding - ((entry.bmi - minBMI) / bmiRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        data.forEach((entry, index) => {
            const x = padding + index * xStep;
            const y = height - padding - ((entry.bmi - minBMI) / bmiRange) * chartHeight;
            
            ctx.fillStyle = '#2563eb';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = '#6b7280';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        data.forEach((entry, index) => {
            const x = padding + index * xStep;
            const dateLabel = new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            ctx.fillText(dateLabel, x, height - padding + 20);
        });
    }

    function populateTable(data) {
        tableBody.innerHTML = '';
        data.slice().reverse().forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.weight} lbs</td>
                <td>${entry.height}</td>
                <td>${entry.bmi}</td>
                <td>
                    <button class="icon-btn edit-btn" aria-label="Edit">✏️</button>
                    <button class="icon-btn delete-btn" data-date="${entry.date}" aria-label="Delete">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const date = this.dataset.date;
                if (confirm('Delete this entry?')) {
                    bmiData = bmiData.filter(entry => entry.date !== date);
                    localStorage.setItem('bmiHistory', JSON.stringify(bmiData));
                    populateTable(bmiData);
                    drawChart(bmiData);
                }
            });
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.dataset.period;
            let filteredData = bmiData;
            
            if (period !== 'all') {
                const daysAgo = parseInt(period);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
                filteredData = bmiData.filter(entry => new Date(entry.date) >= cutoffDate);
            }
            
            drawChart(filteredData);
        });
    });

    document.getElementById('addEntryBtn').addEventListener('click', function() {
        alert('Add entry modal would open here.');
    });

    drawChart(bmiData);
    populateTable(bmiData);
});
