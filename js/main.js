// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });
    }
    
    // Check if user is logged in
    checkAuthState();
});

// Initialize page elements
function initPage() {
    // Initialize modals
    initModals();
    
    // Initialize logout button if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Load courses if on courses page
    if (document.getElementById('course-list')) {
        loadCourses();
    }
    
    // Load course details if on course detail page
    if (document.getElementById('course-title')) {
        loadCourseDetails();
    }
    
    // Load dashboard data if on dashboard
    if (document.getElementById('enrolled-courses')) {
        loadDashboardData();
    }
}

// Initialize modal functionality
function initModals() {
    // Forgot password modal
    const forgotBtn = document.getElementById('forgot-password');
    const forgotModal = document.getElementById('forgot-modal');
    
    if (forgotBtn && forgotModal) {
        const span = forgotModal.querySelector('.close');
        
        forgotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            forgotModal.style.display = 'block';
        });
        
        span.addEventListener('click', function() {
            forgotModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === forgotModal) {
                forgotModal.style.display = 'none';
            }
        });
        
        // Forgot password form submission
        const forgotForm = document.getElementById('forgot-form');
        if (forgotForm) {
            forgotForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('reset-email').value;
                sendPasswordReset(email);
                forgotModal.style.display = 'none';
            });
        }
    }
    
    // Add user modal (admin)
    const addUserBtn = document.getElementById('add-user-btn');
    const userModal = document.getElementById('user-modal');
    
    if (addUserBtn && userModal) {
        const span = userModal.querySelector('.close');
        
        addUserBtn.addEventListener('click', function() {
            userModal.style.display = 'block';
        });
        
        span.addEventListener('click', function() {
            userModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === userModal) {
                userModal.style.display = 'none';
            }
        });
        
        // User form submission
        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const role = document.getElementById('user-role').value;
                const name = document.getElementById('user-name').value;
                const email = document.getElementById('user-email').value;
                const password = document.getElementById('user-password').value;
                
                createUser(role, name, email, password);
                userModal.style.display = 'none';
            });
        }
    }
    
    // Add course modal (instructor)
    const addCourseBtn = document.getElementById('create-course-btn');
    const courseModal = document.getElementById('course-modal');
    
    if (addCourseBtn && courseModal) {
        const span = courseModal.querySelector('.close');
        
        addCourseBtn.addEventListener('click', function() {
            courseModal.style.display = 'block';
        });
        
        span.addEventListener('click', function() {
            courseModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === courseModal) {
                courseModal.style.display = 'none';
            }
        });
        
        // Course form submission
        const courseForm = document.getElementById('course-form');
        if (courseForm) {
            courseForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const title = document.getElementById('course-title').value;
                const category = document.getElementById('course-category').value;
                const level = document.getElementById('course-level').value;
                const description = document.getElementById('course-description').value;
                const image = document.getElementById('course-image').value || 'images/course-placeholder.jpg';
                
                createCourse(title, category, level, description, image);
                courseModal.style.display = 'none';
            });
        }
    }
}

// Subscribe to newsletter
function subscribeNewsletter(email) {
    // In a real app, this would send to a backend
    console.log('Subscribing email:', email);
    alert('Thank you for subscribing to our newsletter!');
    document.getElementById('newsletter-form').reset();
}

// Load courses for catalog
function loadCourses() {
    // Simulate loading from a database
    const courses = [
        {
            id: 1,
            title: 'Introduction to JavaScript',
            instructor: 'John Doe',
            category: 'programming',
            level: 'beginner',
            image: 'images/js-course.jpg',
            description: 'Learn the fundamentals of JavaScript programming.',
            duration: '4 weeks',
            lectures: 20,
            students: 150
        },
        {
            id: 2,
            title: 'Advanced Python Programming',
            instructor: 'Jane Smith',
            category: 'programming',
            level: 'advanced',
            image: 'images/python-course.jpg',
            description: 'Take your Python skills to the next level.',
            duration: '6 weeks',
            lectures: 30,
            students: 85
        },
        {
            id: 3,
            title: 'Business Fundamentals',
            instructor: 'Mike Johnson',
            category: 'business',
            level: 'beginner',
            image: 'images/business-course.jpg',
            description: 'Essential knowledge for business professionals.',
            duration: '5 weeks',
            lectures: 25,
            students: 200
        },
        {
            id: 4,
            title: 'UI/UX Design Principles',
            instructor: 'Sarah Williams',
            category: 'design',
            level: 'intermediate',
            image: 'images/design-course.jpg',
            description: 'Master the principles of effective design.',
            duration: '4 weeks',
            lectures: 18,
            students: 120
        }
    ];
    
    const courseList = document.getElementById('course-list');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Filter by category
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            displayCourses(courses, category);
        });
    });
    
    // Initial display
    displayCourses(courses, 'all');
}

// Display courses in the catalog
function displayCourses(courses, category) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);
    
    if (filteredCourses.length === 0) {
        courseList.innerHTML = '<p>No courses found in this category.</p>';
        return;
    }
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span class="instructor">${course.instructor}</span>
                    <span class="level">${course.level}</span>
                </div>
                <p>${course.description}</p>
                <div class="course-actions">
                    <a href="course-detail.html?id=${course.id}" class="button_1">View Course</a>
                </div>
            </div>
        `;
        courseList.appendChild(courseCard);
    });
}

// Load course details
function loadCourseDetails() {
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId) {
        window.location.href = 'courses.html';
        return;
    }
    
    // Simulate fetching course details from a database
    const courses = [
        {
            id: 1,
            title: 'Introduction to JavaScript',
            instructor: 'John Doe',
            instructorImage: 'images/instructor1.jpg',
            instructorBio: 'John is a senior software engineer with 10 years of experience in web development.',
            category: 'programming',
            level: 'beginner',
            image: 'images/js-course.jpg',
            description: 'This course will teach you the fundamentals of JavaScript, the programming language of the web. You will learn how to build interactive websites and web applications using modern JavaScript techniques.',
            duration: '4 weeks',
            lectures: 20,
            quizzes: 5,
            students: 150,
            language: 'English',
            certificate: 'Yes',
            modules: [
                {
                    title: 'Getting Started with JavaScript',
                    lessons: [
                        'Introduction to JavaScript',
                        'Setting Up Your Development Environment',
                        'Your First JavaScript Program'
                    ]
                },
                {
                    title: 'JavaScript Basics',
                    lessons: [
                        'Variables and Data Types',
                        'Operators and Expressions',
                        'Conditional Statements',
                        'Loops and Iteration'
                    ]
                },
                {
                    title: 'Functions and Scope',
                    lessons: [
                        'Defining and Calling Functions',
                        'Function Parameters and Return Values',
                        'Understanding Scope',
                        'Closures'
                    ]
                }
            ]
        },
        // Other courses would be here...
    ];
    
    const course = courses.find(c => c.id === parseInt(courseId));
    
    if (!course) {
        window.location.href = 'courses.html';
        return;
    }
    
    // Populate course details
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-category').textContent = course.category;
    document.getElementById('course-level').textContent = course.level;
    document.getElementById('course-image').src = course.image;
    document.getElementById('course-image').alt = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-lectures').textContent = course.lectures;
    document.getElementById('course-quizzes').textContent = course.quizzes;
    document.getElementById('course-students').textContent = course.students;
    document.getElementById('course-language').textContent = course.language;
    document.getElementById('course-certificate').textContent = course.certificate;
    
    // Instructor details
    document.getElementById('instructor-name').textContent = course.instructor;
    document.getElementById('instructor-image').src = course.instructorImage;
    document.getElementById('instructor-image').alt = course.instructor;
    document.getElementById('instructor-bio').textContent = course.instructorBio;
    
    // Course modules
    const modulesContainer = document.getElementById('course-modules');
    course.modules.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';
        moduleElement.innerHTML = `
            <h4>${module.title}</h4>
            <ul class="lessons">
                ${module.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
            </ul>
        `;
        modulesContainer.appendChild(moduleElement);
    });
    
    // Enroll button
    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            enrollInCourse(course.id);
        });
    }
}

// Enroll in a course
function enrollInCourse(courseId) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Please login to enroll in this course.');
        window.location.href = 'login.html?redirect=course-detail.html?id=' + courseId;
        return;
    }
    
    // Simulate enrollment
    let enrollments = JSON.parse(localStorage.getItem('courseEnrollments')) || [];
    
    // Check if already enrolled
    if (enrollments.some(e => e.userId === user.id && e.courseId === courseId)) {
        alert('You are already enrolled in this course.');
        return;
    }
    
    // Add enrollment
    enrollments.push({
        userId: user.id,
        courseId: courseId,
        date: new Date().toISOString(),
        progress: 0,
        completed: false
    });
    
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
    alert('You have successfully enrolled in this course!');
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Load dashboard data
function loadDashboardData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        window.location.href = 'login.html?redirect=dashboard.html';
        return;
    }
    
    // Display user info
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    
    // Load enrolled courses
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments')) || [];
    const userEnrollments = enrollments.filter(e => e.userId === user.id);
    
    const enrolledCoursesContainer = document.getElementById('enrolled-courses');
    
    if (userEnrollments.length === 0) {
        enrolledCoursesContainer.innerHTML = '<p>You are not enrolled in any courses yet.</p>';
    } else {
        // Simulate course data
        const courses = [
            { id: 1, title: 'Introduction to JavaScript', image: 'images/js-course.jpg', instructor: 'John Doe' },
            { id: 2, title: 'Advanced Python Programming', image: 'images/python-course.jpg', instructor: 'Jane Smith' }
        ];
        
        userEnrollments.forEach(enrollment => {
            const course = courses.find(c => c.id === enrollment.courseId);
            if (course) {
                const courseElement = document.createElement('div');
                courseElement.className = 'course-card';
                courseElement.innerHTML = `
                    <img src="${course.image}" alt="${course.title}">
                    <div class="course-info">
                        <h3>${course.title}</h3>
                        <p>Instructor: ${course.instructor}</p>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${enrollment.progress}%"></div>
                        </div>
                        <p>Progress: ${enrollment.progress}%</p>
                        <div class="course-actions">
                            <a href="course-detail.html?id=${course.id}" class="button_1">Continue Learning</a>
                        </div>
                    </div>
                `;
                enrolledCoursesContainer.appendChild(courseElement);
            }
        });
    }
    
    // Update stats
    const completedCourses = userEnrollments.filter(e => e.completed).length;
    document.getElementById('stats-courses').textContent = userEnrollments.length;
    document.getElementById('stats-completed').textContent = completedCourses;
    document.getElementById('stats-certificates').textContent = completedCourses;
    document.getElementById('stats-hours').textContent = userEnrollments.length * 9; // Simulated hours
}

// Create a new course (instructor)
function createCourse(title, category, level, description, image) {
    // In a real app, this would send to a backend
    console.log('Creating course:', { title, category, level, description, image });
    alert('Course created successfully!');
    
    // Simulate adding to local storage
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    const newCourse = {
        id: courses.length + 1,
        title,
        category,
        level,
        description,
        image,
        instructor: 'Current User',
        date: new Date().toISOString()
    };
    
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    // Reload if on instructor page
    if (window.location.pathname.includes('instructor.html')) {
        window.location.reload();
    }
}

// Check authentication state
function checkAuthState() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');
    const dashboardLink = document.querySelector('a[href="dashboard.html"]');
    const logoutLink = document.getElementById('logout-btn');
    
    if (user) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'inline';
        if (logoutLink) logoutLink.style.display = 'inline';
        
        // Show admin/instructor links if applicable
        if (user.role === 'admin') {
            const adminLink = document.querySelector('a[href="admin.html"]');
            if (adminLink) adminLink.style.display = 'inline';
        }
        
        if (user.role === 'instructor') {
            const instructorLink = document.querySelector('a[href="instructor.html"]');
            if (instructorLink) instructorLink.style.display = 'inline';
        }
    } else {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'inline';
        if (registerLink) registerLink.style.display = 'inline';
        if (dashboardLink) dashboardLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        
        // Hide admin/instructor links
        const adminLink = document.querySelector('a[href="admin.html"]');
        if (adminLink) adminLink.style.display = 'none';
        
        const instructorLink = document.querySelector('a[href="instructor.html"]');
        if (instructorLink) instructorLink.style.display = 'none';
    }
}
