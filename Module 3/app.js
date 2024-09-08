document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from reloading the page

    // Get form values (No TypeScript-specific typing needed)
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
    }
});
