const fs = require('fs');
const path = require('path');

const directory = './'; // Your project directory

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else if (
            file.endsWith('.html') || 
            file.endsWith('.js') || 
            file.endsWith('.css')
        ) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/EduLMS/g, 'Neusoft LMS');
            content = content.replace(/Edu LMS/g, 'Neusoft LMS');
            fs.writeFileSync(filePath, content);
        }
    });
}

replaceInFiles(directory);
console.log('Branding updated to Neusoft LMS');
