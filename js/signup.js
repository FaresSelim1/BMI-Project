document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('emailAddress').value.trim();
        const password = document.getElementById('newPassword').value.trim();

        if (!fullName || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        fetch('api/register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Registration failed');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Server error. Try again later.');
        });
    });
});
