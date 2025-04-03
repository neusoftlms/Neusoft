document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load instructor courses
    async function loadInstructorCourses() {
        try {
            const response = await fetch(`${API_URL}/courses/instructor`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to load courses');
            
            const courses = await response.json();
            const courseList = document.getElementById('instructorCourses');
            
            if (courses.length === 0) {
                courseList.innerHTML = '<p>You have not created any courses yet.</p>';
                return;
            }
            
            courseList.innerHTML = courses.map(course => `
                <div class="course-card">
                    <h4>${course.title}</h4>
                    <p>${course.category} • ${course.content?.length || 0} modules</p>
                    <a href="course-detail.html?id=${course._id}" class="btn btn-secondary">View Course</a>
                </div>
            `).join('');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    
    // Create new course
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const title = document.getElementById('courseTitle').value;
            const category = document.getElementById('courseCategory').value;
            const description = document.getElementById('courseDescription').value;
            
            try {
                const response = await fetch(`${API_URL}/courses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, category, description })
                });
                
                if (!response.ok) throw new Error('Failed to create course');
                
                const newCourse = await response.json();
                alert('Course created successfully!');
                courseForm.reset();
                
                // Switch to My Courses tab and refresh
                document.querySelector('.tab-btn[data-tab="my-courses"]').click();
                loadInstructorCourses();
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        });
    }
    
    // Initial load
    loadInstructorCourses();
});
