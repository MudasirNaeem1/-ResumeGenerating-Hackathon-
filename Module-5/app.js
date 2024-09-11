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

   // Generate the resume content
    const resumeContent = `
        <div style="text-align: center;">
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;"><br>` : ''}
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

    // Display the generated resume
    const generatedResume = document.getElementById('generatedResume');
    if (generatedResume) {
        generatedResume.innerHTML = resumeContent;
        
        // Show edit button and download button
        document.getElementById('editResumeButton').style.display = 'block';
        document.getElementById('downloadResumeButton').style.display = 'block';
    }
});

// Edit Resume Button Functionality
document.getElementById('editResumeButton').addEventListener('click', function() {
    const generatedResume = document.getElementById('generatedResume');
    
    if (this.textContent === 'Edit Resume') {
        // Make sections editable
        const sections = generatedResume.querySelectorAll('h2, h3, p');
        sections.forEach(section => {
            section.contentEditable = "true";
        });
        this.textContent = 'Save Resume';
    } else {
        // Save the changes and make sections non-editable
        const sections = generatedResume.querySelectorAll('h2, h3, p');
        sections.forEach(section => {
            section.contentEditable = "false";
        });
        this.textContent = 'Edit Resume';
    }
});

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