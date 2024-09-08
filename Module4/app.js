document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from reloading the page

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profilePicture = document.getElementById('profilePicture').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const achievements = document.getElementById('achievements').value;

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

    // Display the generated resume
    const generatedResume = document.getElementById('generatedResume');
    if (generatedResume) {
        generatedResume.innerHTML = resumeContent;
        
        // Show edit button
        document.getElementById('editResumeButton').style.display = 'block';
    }
});

// Edit Resume Button Functionality
document.getElementById('editResumeButton').addEventListener('click', function() {
    const generatedResume = document.getElementById('generatedResume');
    
    // Check if resume is already in editable mode
    if (this.textContent === 'Edit Resume') {
        // Convert sections to editable fields
        const sections = generatedResume.querySelectorAll('h2, h3, p');
        sections.forEach(section => {
            const textContent = section.textContent.trim();
            const tagName = section.tagName.toLowerCase();
            const editableField = document.createElement(tagName === 'p' ? 'textarea' : 'input');
            editableField.value = textContent;
            editableField.setAttribute('placeholder', `Edit your ${section.querySelector('h3') ? section.querySelector('h3').textContent.toLowerCase() : section.textContent.toLowerCase()}`);
            section.replaceWith(editableField);
        });
        this.textContent = 'Save Resume';
    } else {
        // Convert fields back to static text
        const inputs = generatedResume.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const text = input.value;
            const tagName = input.tagName.toLowerCase();
            const newElement = document.createElement(tagName === 'textarea' ? 'p' : 'p');
            newElement.textContent = text;
            input.replaceWith(newElement);
        });
        this.textContent = 'Edit Resume';
    }
});
