class LMSStorage {
    constructor() {
        // Initialize with sample data if empty
        this.users = JSON.parse(localStorage.getItem('lms_users')) || [
            {id: 'admin1', name: 'Admin', email: 'admin@lms.com', password: 'admin123', role: 'admin'}
        ];
        this.courses = JSON.parse(localStorage.getItem('lms_courses')) || this.initSampleCourses();
        this.enrollments = JSON.parse(localStorage.getItem('lms_enrollments')) || [];
    }

    initSampleCourses() {
        const courses = [
            {
                id: 'html101',
                title: 'HTML Fundamentals',
                description: 'Learn basic HTML structure',
                instructor: 'Dr. Web',
                category: 'technology',
                thumbnail: 'https://via.placeholder.com/300x200?text=HTML',
                lessons: [
                    {id: 'l1', title: 'Introduction', duration: 10, completed: false},
                    {id: 'l2', title: 'Basic Tags', duration: 15, completed: false}
                ]
            }
        ];
        localStorage.setItem('lms_courses', JSON.stringify(courses));
        return courses;
    }

    // User management methods
    addUser(user) {
        this.users.push(user);
        localStorage.setItem('lms_users', JSON.stringify(this.users));
    }

    // Course management methods
    addCourse(course) {
        this.courses.push(course);
        localStorage.setItem('lms_courses', JSON.stringify(this.courses));
    }
}
