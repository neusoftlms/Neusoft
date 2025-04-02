document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const courseForm = document.getElementById('course-form');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-course-form');
    const closeBtn = document.querySelector('.close');
    
    // Sample data store (in production, use backend API)
    let courses = JSON.parse(localStorage.getItem('neusoft-courses')) || [];
    
    // Initialize
    loadCourses();
    
    // Event Listeners
    courseForm.addEventListener('submit', handleCourseSubmit);
    closeBtn.addEventListener('click', () => editModal.style.display = 'none');
    
    // Load all courses
    function loadCourses() {
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        
        if (courses.length === 0) {
            courseList.innerHTML = '<p>No courses found. Create your first course!</p>';
            return;
        }
        
        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-header">
                    <img src="${course.imageUrl || '../images/course-placeholder.jpg'}" alt="${course.title}">
                    <h3>${course.title}</h3>
                    <span class="category">${course.category}</span>
                </div>
                <div class="course-actions">
                    <button class="button_1 edit-btn" data-id="${index}">Edit</button>
                    <button class="button_2 delete-btn" data-id="${index}">Delete</button>
                    <button class="button_1 view-btn" data-id="${index}">View</button>
                </div>
            `;
            courseList.appendChild(courseCard);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEditCourse);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteCourse);
        });
    }
    
    // Handle new course submission
    async function handleCourseSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('course-title').value;
        const category = document.getElementById('course-category').value;
        const description = document.getElementById('course-description').value;
        const imageFile = document.getElementById('course-image').files[0];
        const contentFile = document.getElementById('course-content').files[0];
        
        // In a real app, you would upload files to a server
        // For demo, we'll simulate with local storage
        const newCourse = {
            id: Date.now().toString(),
            title,
            category,
            description,
            imageUrl: imageFile ? URL.createObjectURL(imageFile) : null,
            contentUrl: contentFile ? URL.createObjectURL(contentFile) : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        courses.push(newCourse);
        localStorage.setItem('neusoft-courses', JSON.stringify(courses));
        
        alert('Course created successfully!');
        courseForm.reset();
        loadCourses();
    }
    
    // Handle course edit
    function handleEditCourse(e) {
        const courseId = e.target.dataset.id;
        const course = courses[courseId];
        
        editForm.innerHTML = `
            <div class="form-group">
                <label for="edit-title">Course Title</label>
                <input type="text" id="edit-title" value="${course.title}" required>
            </div>
            <div class="form-group">
                <label for="edit-category">Category</label>
                <select id="edit-category" required>
                    <option value="programming" ${course.category === 'programming' ? 'selected' : ''}>Programming</option>
                    <option value="business" ${course.category === 'business' ? 'selected' : ''}>Business</option>
                    <option value="design" ${course.category === 'design' ? 'selected' : ''}>Design</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-description">Description</label>
                <textarea id="edit-description" rows="5" required>${course.description}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-image">Update Thumbnail</label>
                <input type="file" id="edit-image" accept="image/*">
            </div>
            <input type="hidden" id="edit-id" value="${courseId}">
            <button type="submit" class="button_1">Update Course</button>
        `;
        
        editModal.style.display = 'block';
        
        // Handle edit form submission
        editForm.onsubmit = function(e) {
            e.preventDefault();
            
            const id = document.getElementById('edit-id').value;
            const title = document.getElementById('edit-title').value;
            const category = document.getElementById('edit-category').value;
            const description = document.getElementById('edit-description').value;
            const imageFile = document.getElementById('edit-image').files[0];
            
            courses[id] = {
                ...courses[id],
                title,
                category,
                description,
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : courses[id].imageUrl,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem('neusoft-courses', JSON.stringify(courses));
            editModal.style.display = 'none';
            loadCourses();
        };
    }
    
    // Handle course deletion
    function handleDeleteCourse(e) {
        if (!confirm('Are you sure you want to delete this course?')) return;
        
        const courseId = e.target.dataset.id;
        courses.splice(courseId, 1);
        localStorage.setItem('neusoft-courses', JSON.stringify(courses));
        loadCourses();
    }
});
