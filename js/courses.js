// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize course-related functionality
    if (document.getElementById('course-list')) {
        // Already handled in main.js
    }
    
    if (document.getElementById('course-title')) {
        // Already handled in main.js
    }
    
    // Initialize course search if it exists
    const courseSearch = document.querySelector('.course-search');
    if (courseSearch) {
        courseSearch.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value;
            searchCourses(query);
        });
    }
    
    // Initialize filters if they exist
    const filterOptions = document.querySelectorAll('.filter-options input');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('change', applyFilters);
        });
    }
});

// Search courses
function searchCourses(query) {
    // In a real app, this would query a backend
    console.log('Searching for courses:', query);
    alert('Search functionality would show results for: ' + query);
}

// Apply filters
function applyFilters() {
    const selectedLevels = Array.from(document.querySelectorAll('.filter-options input:checked'))
        .map(input => input.value);
    
    console.log('Applying filters for levels:', selectedLevels);
    // In a real app, this would filter the displayed courses
}
