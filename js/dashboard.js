document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Redirect if not logged in
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const usernameSpan = document.getElementById('username');
    const enrolledCount = document.getElementById('enrolledCount');
    const completedLessons = document.getElementById('completedLessons');
    const overallProgress = document.getElementById('overallProgress');
    const progressPercent = document.getElementById('progressPercent');
    const enrolledCourses = document.getElementById('enrolledCourses');

    // Set username
    usernameSpan.textContent = currentUser.name;

    // Load dashboard data
    function loadDashboard() {
        const enrollments = lmsStorage.getEnrollments(currentUser.id);
        enrolledCount.textContent = enrollments.length;
        
        // Calculate completed lessons and progress
        let totalCompleted = 0;
        let totalProgress = 0;
        
        enrolledCourses.innerHTML = '';
        
        if (enrollments.length === 0) {
            enrolledCourses.innerHTML = '<p>You are not enrolled in any courses yet. <a href="courses.html">Browse courses</a></p>';
            return;
        }
        
        enrollments.forEach(enrollment => {
            const course = lmsStorage.getCourse(enrollment.courseId);
            const progress = enrollment.progress || 0;
            totalCompleted += enrollment.completedLessons.length;
            totalProgress += progress;
            
            // Create course card
            const courseCard = document.createElement('div');
            courseCard.className = 'dashboard-course-card';
            courseCard.innerHTML = `
                <div class="course-thumbnail" style="background-image: url('${course.thumbnail}')"></div>
                <div class="course-content">
                    <h4>${course.title}</h4>
                    <p>${course.description}</p>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span>${progress}% complete</span>
                    </div>
                    <a href="course-view.html?courseId=${course.id}" class="btn-continue">Continue</a>
                </div>
            `;
            enrolledCourses.appendChild(courseCard);
        });
        
        // Update stats
        completedLessons.textContent = totalCompleted;
        const avgProgress = enrollments.length > 0 ? Math.round(totalProgress / enrollments.length) : 0;
        overallProgress.style.width = avgProgress + '%';
        progressPercent.textContent = avgProgress + '%';
    }

    // Initial load
    loadDashboard();
});