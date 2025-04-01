document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const authLinks = document.querySelectorAll('#authLink, #logoutBtn');
    
    if (currentUser) {
        authLinks.forEach(link => {
            if (link.id === 'authLink') {
                link.textContent = currentUser.name;
                link.href = 'dashboard.html';
            } else if (link.id === 'logoutBtn') {
                link.style.display = 'inline-block';
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const user = lmsStorage.getUser(email);
            if (user && user.password === password) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = user.role === 'admin' ? 'admin.html' : 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }
    
    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            const role = document.getElementById('role').value;
            
            if (lmsStorage.getUser(email)) {
                alert('User already exists with this email');
                return;
            }
            
            const newUser = {
                id: 'user' + Date.now(),
                name,
                email,
                password,
                role
            };
            
            lmsStorage.addUser(newUser);
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});