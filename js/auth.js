// Authentication Functions
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate authentication (in a real app, this would be an API call)
            if (email && password) {
                // Store user data in localStorage (simulated)
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    role: determineUserRole(email) // Simple role determination
                }));
                
                // Redirect based on role
                const user = JSON.parse(localStorage.getItem('currentUser'));
                if (user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else if (user.role === 'instructor') {
                    window.location.href = 'instructor.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Registration Form Handling would go here
    
    // Simple role determination based on email
    function determineUserRole(email) {
        if (email.includes('@neusoft.admin')) return 'admin';
        if (email.includes('@neusoft.instructor')) return 'instructor';
        return 'student';
    }
    
    // Check if user is logged in on protected pages
    function checkAuth() {
        const protectedPages = ['dashboard.html', 'admin.html', 'instructor.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !localStorage.getItem('currentUser')) {
            window.location.href = 'login.html';
        }
    }
    
    checkAuth();
});
// Add this to your auth.js file
function setupLogout() {
    const logoutButtons = document.querySelectorAll('#logout');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear authentication data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    });
}

// Call this function in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    setupLogout();
    
    // ... rest of your code ...
});
function setupLogout() {
    const logoutButtons = document.querySelectorAll('#logout');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                // Clear authentication data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    });
}
