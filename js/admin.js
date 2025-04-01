// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user || user.role !== 'admin') {
        alert('You do not have permission to access this page.');
        window.location.href = 'index.html';
        return;
    }
    
    // Load admin data
    loadAdminData();
});

// Load admin data
function loadAdminData() {
    // Load users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersTable = document.getElementById('users-table');
    
    if (users.length === 0) {
        usersTable.innerHTML = '<p>No users found.</p>';
    } else {
        usersTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Date Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>${new Date(user.date).toLocaleDateString()}</td>
                            <td>
                                <button class="edit-user" data-id="${user.id}">Edit</button>
                                <button class="delete-user" data-id="${user.id}">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    // Load courses
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const coursesTable = document.getElementById('courses-table');
    
    if (courses.length === 0) {
        coursesTable.innerHTML = '<p>No courses found.</p>';
    } else {
        coursesTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th>Instructor</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${courses.map(course => `
                        <tr>
                            <td>${course.id}</td>
                            <td>${course.title}</td>
                            <td>${course.category}</td>
                            <td>${course.level}</td>
                            <td>${course.instructor}</td>
                            <td>${new Date(course.date).toLocaleDateString()}</td>
                            <td>
                                <button class="edit-course" data-id="${course.id}">Edit</button>
                                <button class="delete-course" data-id="${course.id}">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    // Update stats
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('total-courses').textContent = courses.length;
    
    // Calculate enrollments
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments')) || [];
    document.getElementById('total-enrollments').textContent = enrollments.length;
    
    // Count instructors
    const instructors = users.filter(u => u.role === 'instructor').length;
    document.getElementById('total-instructors').textContent = instructors;
    
    // Add event listeners for actions
    document.querySelectorAll('.edit-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.dataset.id);
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.dataset.id);
            deleteUser(userId);
        });
    });
    
    document.querySelectorAll('.edit-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.id);
            editCourse(courseId);
        });
    });
    
    document.querySelectorAll('.delete-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.id);
            deleteCourse(courseId);
        });
    });
}

// Edit user
function editUser(userId) {
    // In a real app, this would open an edit form
    console.log('Editing user with ID:', userId);
    alert('Edit user functionality would open for ID: ' + userId);
}

// Delete user
function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('User deleted successfully.');
    window.location.reload();
}

// Edit course
function editCourse(courseId) {
    // In a real app, this would open an edit form
    console.log('Editing course with ID:', courseId);
    alert('Edit course functionality would open for ID: ' + courseId);
}

// Delete course
function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter(c => c.id !== courseId);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    alert('Course deleted successfully.');
    window.location.reload();
}
