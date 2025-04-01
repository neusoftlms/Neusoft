document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    
    if (!currentUser || !courseId) {
        window.location.href = 'index.html';
        return;
    }

    const course = lmsStorage.getCourse(courseId);
    const enrollment = lmsStorage.enrollments.find(e => 
        e.studentId === currentUser.id && e.courseId === courseId
    );

    if (!course) {
        alert('Course not found');
        window.location.href = 'courses.html';
        return;
    }

    // Set course header info
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseDescription').textContent = course.description;
    
    // Set progress
    const progress = enrollment ? enrollment.progress : 0;
    document.getElementById('courseProgress').style.width = progress + '%';
    document.getElementById('progressText').textContent = progress + '% complete';

    // Load lessons
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = '';
    
    course.lessons.forEach((lesson, index) => {
        const isCompleted = enrollment && enrollment.completedLessons.includes(lesson.id);
        
        const lessonItem = document.createElement('div');
        lessonItem.className = `lesson-item ${isCompleted ? 'completed' : ''}`;
        lessonItem.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-content">
                <h4>${lesson.title}</h4>
                <p class="lesson-duration">${lesson.duration} min</p>
            </div>
            <div class="lesson-status">
                ${isCompleted ? '✓ Completed' : '<button class="btn-complete" data-lesson-id="${lesson.id}">Mark Complete</button>'}
            </div>
        `;
        lessonsList.appendChild(lessonItem);
        
        // Add complete button functionality
        if (!isCompleted) {
            lessonItem.querySelector('.btn-complete').addEventListener('click', function() {
                lmsStorage.completeLesson(currentUser.id, courseId, lesson.id);
                alert(`Lesson "${lesson.title}" marked as completed!`);
                window.location.reload();
            });
        }
    });
});