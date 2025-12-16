document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        fetch('api/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const userData = {
                    email: email,
                    name: data.fullName,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('userToken', 'dummy-token-' + Date.now());
                localStorage.setItem('userData', JSON.stringify(userData));

                alert('Login successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Server error. Try again later.');
        });
    });
});
