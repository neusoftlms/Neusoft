const API_URL = 'http://localhost:5000/api'; // Change to your deployed API URL

document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Common functions
    async function fetchWithAuth(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        return response.json();
    }
    
    // Load all courses for catalog
    if (document.getElementById('courseList')) {
        try {
            const courses = await fetchWithAuth(`${API_URL}/courses`);
            const courseList = document.getElementById('courseList');
            
            if (courses.length === 0) {
                courseList.innerHTML = '<p>No courses available at the moment.</p>';
                return;
            }
            
            courseList.innerHTML = courses.map(course => `
                <div class="course-card" data-category="${course.category}">
                    <h3>${course.title}</h3>
                    <p class="category">${course.category}</p>
                    <p class="description">${course.description.substring(0, 100)}...</p>
                    <a href="course-detail.html?id=${course._id}" class="btn btn-secondary">View Details</a>
                </div>
            `).join('');
            
            // Category filter
            document.querySelectorAll('.category-filter button').forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    document.querySelectorAll('.category-filter button').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    document.querySelectorAll('.course-card').forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        } catch (err) {
            console.error(err);
            document.getElementById('courseList').innerHTML = '<p>Error loading courses. Please try again later.</p>';
        }
    }
    
    // Load course details
    if (document.getElementById('courseHeader')) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id');
        
        if (!courseId) {
            window.location.href = 'courses.html';
            return;
        }
        
        try {
            const course = await fetchWithAuth(`${API_URL}/courses/${courseId}`);
            
            // Display course info
            document.getElementById('courseHeader').innerHTML = `
                <h2>${course.title}</h2>
                <p class="category">${course.category}</p>
            `;
            
            document.getElementById('courseDescription').innerHTML = course.description;
            
            // Display content
            const contentList = document.getElementById('contentList');
            if (course.content && course.content.length > 0) {
                contentList.innerHTML = course.content.map((item, index) => `
                    <div class="content-item">
                        <h4>${index + 1}. ${item.title}</h4>
                        <p>Type: ${item.type} • Duration: ${item.duration || 'N/A'} minutes</p>
                    </div>
                `).join('');
            } else {
                contentList.innerHTML = '<p>No content available for this course yet.</p>';
            }
            
            // Check enrollment status
            try {
                const enrollment = await fetchWithAuth(`${API_URL}/courses/${courseId}/enrollment`);
                const enrollBtn = document.getElementById('enrollBtn');
                const statusDiv = document.getElementById('enrollmentStatus');
                
                if (enrollment) {
                    enrollBtn.style.display = 'none';
                    statusDiv.classList.remove('hidden');
                    statusDiv.innerHTML = `
                        <p>You are enrolled in this course (${enrollment.progress}% complete)</p>
                        <a href="dashboard.html" class="btn btn-secondary">Continue Learning</a>
                    `;
                }
            } catch (err) {
                // Not enrolled
                console.log('Not enrolled:', err.message);
            }
            
            // Enroll button
            document.getElementById('enrollBtn').addEventListener('click', async function() {
                try {
                    await fetchWithAuth(`${API_URL}/courses/${courseId}/enroll`, {
                        method: 'POST'
                    });
                    
                    alert('Successfully enrolled in the course!');
                    window.location.reload();
                } catch (err) {
                    alert(err.message);
                }
            });
            
        } catch (err) {
            console.error(err);
            document.getElementById('courseHeader').innerHTML = '<p>Error loading course details.</p>';
        }
    }
    
    // Dashboard functionality
    if (document.querySelector('.dashboard')) {
        try {
            // Load enrolled courses
            const enrollments = await fetchWithAuth(`${API_URL}/users/enrollments`);
            const enrolledCourses = document.querySelector('.enrolled-courses');
            
            if (enrollments.length === 0) {
                enrolledCourses.innerHTML += '<p>You are not enrolled in any courses yet.</p>';
            } else {
                enrollments.forEach(enrollment => {
                    enrolledCourses.innerHTML += `
                        <div class="course-card">
                            <h4>${enrollment.course.title}</h4>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${enrollment.progress}%"></div>
                            </div>
                            <p>${enrollment.progress}% Complete</p>
                            <a href="course-detail.html?id=${enrollment.course._id}" class="btn btn-secondary">Continue Learning</a>
                        </div>
                    `;
                });
            }
            
            // Load stats
            document.querySelector('.stats').innerHTML = `
                <div class="stat-box">
                    <h4>Courses Enrolled</h4>
                    <p>${enrollments.length}</p>
                </div>
                <div class="stat-box">
                    <h4>Courses Completed</h4>
                    <p>${enrollments.filter(e => e.completed).length}</p>
                </div>
                <div class="stat-box">
                    <h4>Certificates</h4>
                    <p>${enrollments.filter(e => e.completed).length}</p>
                    <button class="btn btn-small">View</button>
                </div>
            `;
            
        } catch (err) {
            console.error(err);
            alert('Error loading dashboard data');
        }
    }
});
