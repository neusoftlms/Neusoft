// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form if it exists
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Initialize registration form if it exists
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Check if there's a redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect && localStorage.getItem('currentUser')) {
        window.location.href = redirect;
    }
});

// Handle user login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }
    
    // Simulate authentication against "database"
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Invalid email or password.');
        return;
    }
    
    // Login successful
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }));
    
    // If "remember me" is checked, store for longer (simulated)
    if (rememberMe) {
        console.log('Remembering user for longer session');
    }
    
    alert('Login successful!');
    
    // Redirect to dashboard or requested page
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    window.location.href = redirect || 'dashboard.html';
}

// Handle user registration
function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const role = document.getElementById('register-role').value;
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    if (!document.getElementById('agree-terms').checked) {
        alert('You must agree to the terms and conditions.');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        alert('An account with this email already exists.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In a real app, passwords should be hashed!
        role,
        date: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login the new user
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    }));
    
    alert('Registration successful! You are now logged in.');
    window.location.href = 'dashboard.html';
}

// Handle user logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Send password reset email
function sendPasswordReset(email) {
    // In a real app, this would send an actual email
    console.log('Sending password reset to:', email);
    alert('If an account exists with this email, a password reset link has been sent.');
}

// Create a new user (admin)
function createUser(role, name, email, password) {
    // In a real app, this would send to a backend
    console.log('Creating user:', { role, name, email, password });
    alert('User created successfully!');
    
    // Simulate adding to local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In a real app, passwords should be hashed!
        role,
        date: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Reload if on admin page
    if (window.location.pathname.includes('admin.html')) {
        window.location.reload();
    }
}
