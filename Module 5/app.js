// Helper function to convert image URL to base64
function getBase64ImageFromURL(url, callback) {
    var img = new Image();
    img.crossOrigin = 'Anonymous'; // This tells the browser to allow cross-origin requests
    img.src = url;
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };
    img.onerror = function() {
        console.error('Image failed to load');
        callback(null);
    };
}

document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from reloading the page

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profilePictureURL = document.getElementById('profilePicture').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const achievements = document.getElementById('achievements').value;

    if (profilePictureURL) {
        getBase64ImageFromURL(profilePictureURL, function(base64Image) {
            if (base64Image) {
                generateResume(base64Image, name, email, phone, education, experience, skills, achievements);
            } else {
                alert('Failed to load the image.');
            }
        });
    } else {
        generateResume(null, name, email, phone, education, experience, skills, achievements);
    }
});

function generateResume(profilePicture, name, email, phone, education, experience, skills, achievements) {
    // Generate the resume content
    const resumeContent = `
        <div style="text-align: center;">
            ${profilePicture ? `<img src="${profilePicture}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;"><br>` : ''}
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills.split(',').map(skill => skill.trim()).join(', ')}</p>
        <h3>Achievements</h3>
        <p>${achievements}</p>
    `;

    displayResume(resumeContent);
}

function displayResume(resumeContent) {
    const generatedResume = document.getElementById('generatedResume');
    if (generatedResume) {
        generatedResume.innerHTML = resumeContent;
        
        // Show edit button and download button
        document.getElementById('editResumeButton').style.display = 'block';
        document.getElementById('downloadResumeButton').style.display = 'block';
    }
}

// Download Resume as PDF
document.getElementById('downloadResumeButton').addEventListener('click', function() {
    const element = document.getElementById('generatedResume');
    
    // Options for html2pdf
    const opt = {
        margin:       1,
        filename:     'Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate PDF from the resume
    html2pdf().set(opt).from(element).save();
});
