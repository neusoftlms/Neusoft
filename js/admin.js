document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Verify admin access
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Admin access required');
        window.location.href = 'index.html';
        return;
    }

    const courseForm = document.getElementById('courseForm');
    const addLessonBtn = document.getElementById('addLessonBtn');
    const lessonContainer = document.getElementById('lessonContainer');
    const coursesList = document.getElementById('coursesList');

    // Add lesson field
    addLessonBtn.addEventListener('click', function() {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson-item';
        lessonDiv.innerHTML = `
            <input type="text" placeholder="Lesson title" class="lesson-title">
            <input type="number" placeholder="Duration (minutes)" class="lesson-duration">
            <button type="button" class="remove-lesson">×</button>
        `;
        lessonContainer.appendChild(lessonDiv);
        
        // Add remove functionality
        lessonDiv.querySelector('.remove-lesson').addEventListener('click', function() {
            if (lessonContainer.children.length > 1) {
                lessonDiv.remove();
            }
        });
    });

    // Handle course submission
    courseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather lesson data
        const lessons = [];
        const lessonItems = lessonContainer.querySelectorAll('.lesson-item');
        
        lessonItems.forEach((item, index) => {
            const title = item.querySelector('.lesson-title').value;
            const duration = item.querySelector('.lesson-duration').value;
            
            if (title && duration) {
                lessons.push({
                    id: 'lesson' + (index + 1),
                    title,
                    duration: parseInt(duration),
                    completed: false
                });
            }
        });

        // Create new course
        const newCourse = {
            title: document.getElementById('courseTitle').value,
            description: document.getElementById('courseDesc').value,
            instructor: document.getElementById('courseInstructor').value,
            category: document.getElementById('courseCategory').value,
            thumbnail: document.getElementById('courseThumbnail').value || 'https://via.placeholder.com/300x200?text=Course+Image',
            lessons
        };

        // Add to storage
        lmsStorage.addCourse(newCourse);
        alert('Course added successfully!');
        courseForm.reset();
        
        // Reset to one empty lesson
        lessonContainer.innerHTML = `
            <div class="lesson-item">
                <input type="text" placeholder="Lesson title" class="lesson-title">
                <input type="number" placeholder="Duration (minutes)" class="lesson-duration">
                <button type="button" class="remove-lesson">×</button>
            </div>
        `;
        
        // Refresh course list
        displayCourses();
    });

    // Display all courses for management
    function displayCourses() {
        coursesList.innerHTML = '';
        
        if (lmsStorage.courses.length === 0) {
            coursesList.innerHTML = '<p>No courses available.</p>';
            return;
        }
        
        lmsStorage.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course-management-item';
            courseDiv.innerHTML = `
                <div class="course-management-header">
                    <h4>${course.title}</h4>
                    <span class="course-category">${course.category}</span>
                </div>
                <p class="course-management-desc">${course.description}</p>
                <div class="course-management-footer">
                    <span>${course.lessons.length} lessons</span>
                    <button class="btn-delete" data-course-id="${course.id}">Delete</button>
                </div>
            `;
            coursesList.appendChild(courseDiv);
            
            // Add delete functionality
            courseDiv.querySelector('.btn-delete').addEventListener('click', function() {
                if (confirm(`Delete "${course.title}" permanently?`)) {
                    lmsStorage.courses = lmsStorage.courses.filter(c => c.id !== course.id);
                    lmsStorage.saveCourses();
                    displayCourses();
                }
            });
        });
    }

    // Initial load
    displayCourses();
});