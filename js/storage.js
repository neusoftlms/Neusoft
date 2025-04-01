class LMSStorage {
    constructor() {
        // Initialize all data from localStorage or with defaults
        this.users = JSON.parse(localStorage.getItem('lms_users')) || [
            {
                id: 'admin1',
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            }
        ];
        
        this.courses = JSON.parse(localStorage.getItem('lms_courses')) || this.initSampleCourses();
        this.enrollments = JSON.parse(localStorage.getItem('lms_enrollments')) || [];
    }
    
    initSampleCourses() {
        const sampleCourses = [
            {
                id: 'course1',
                title: 'Introduction to HTML',
                description: 'Learn the basics of HTML5',
                instructor: 'Dr. Web',
                category: 'technology',
                thumbnail: 'https://via.placeholder.com/300x200?text=HTML+Course',
                lessons: [
                    { id: 'lesson1', title: 'HTML Basics', duration: 15, completed: false },
                    { id: 'lesson2', title: 'Forms and Inputs', duration: 20, completed: false }
                ]
            },
            {
                id: 'course2',
                title: 'CSS Fundamentals',
                description: 'Master CSS styling techniques',
                instructor: 'Prof. Styles',
                category: 'technology',
                thumbnail: 'https://via.placeholder.com/300x200?text=CSS+Course',
                lessons: [
                    { id: 'lesson1', title: 'Selectors', duration: 10, completed: false },
                    { id: 'lesson2', title: 'Flexbox', duration: 25, completed: false }
                ]
            }
        ];
        localStorage.setItem('lms_courses', JSON.stringify(sampleCourses));
        return sampleCourses;
    }
    
    // User management methods
    addUser(user) {
        this.users.push(user);
        localStorage.setItem('lms_users', JSON.stringify(this.users));
    }
    
    getUser(email) {
        return this.users.find(u => u.email === email);
    }
    
    // Course management methods
    saveCourses() {
        localStorage.setItem('lms_courses', JSON.stringify(this.courses));
    }
    
    getCourse(id) {
        return this.courses.find(c => c.id === id);
    }
    
    addCourse(course) {
        course.id = 'course' + (this.courses.length + 1);
        this.courses.push(course);
        this.saveCourses();
        return course;
    }
    
    // Enrollment methods
    enroll(studentId, courseId) {
        if (!this.enrollments.some(e => e.studentId === studentId && e.courseId === courseId)) {
            this.enrollments.push({
                studentId,
                courseId,
                date: new Date().toISOString(),
                progress: 0,
                completedLessons: []
            });
            localStorage.setItem('lms_enrollments', JSON.stringify(this.enrollments));
        }
    }
    
    getEnrollments(studentId) {
        return this.enrollments.filter(e => e.studentId === studentId);
    }
    
    completeLesson(studentId, courseId, lessonId) {
        const enrollment = this.enrollments.find(e => 
            e.studentId === studentId && e.courseId === courseId
        );
        
        if (enrollment && !enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);
            const course = this.getCourse(courseId);
            enrollment.progress = Math.round(
                (enrollment.completedLessons.length / course.lessons.length) * 100
            );
            localStorage.setItem('lms_enrollments', JSON.stringify(this.enrollments));
        }
    }
}

const lmsStorage = new LMSStorage();