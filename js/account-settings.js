

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    const genderButtons = document.querySelectorAll('.gender-btn');
    const genderInput = document.getElementById('gender');
    const logoutBtn = document.querySelector('.btn-logout');

    // Gender selection
    genderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            genderButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            genderInput.value = this.dataset.gender;
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            height: document.getElementById('height').value,
            age: document.getElementById('age').value,
            gender: genderInput.value
        };

        localStorage.setItem('userSettings', JSON.stringify(formData));
        alert('Settings saved successfully!');
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('userToken');
            window.location.href = 'login.html';
        }
    });

    // Load saved settings
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('height').value = settings.height;
        document.getElementById('age').value = settings.age;
        
        genderButtons.forEach(btn => {
            if (btn.dataset.gender === settings.gender) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});
