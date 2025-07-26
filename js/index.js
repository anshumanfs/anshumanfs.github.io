const skills = {
    frontend: [
        { skill: 'HTML', icon: '../images/skills/icons8-html-5.svg' },
        { skill: 'CSS', icon: '../images/skills/icons8-css3.svg' },
        { skill: 'JavaScript', icon: '../images/skills/icons8-javascript.svg' },
        { skill: 'TypeScript', icon: '../images/skills/icons8-typescript.svg' },
        { skill: 'React', icon: '../images/skills/icons8-react-js.svg' },
        { skill: 'NextJS', icon: '../images/skills/icons8-nextjs.svg' },
        { skill: 'Ionic', icon: '../images/skills/icons8-ionic.svg' }
    ],
    backend: [
        { skill: 'Node.js', icon: '../images/skills/icons8-node-js.svg' },
        { skill: 'Express', icon: '../images/skills/icons8-express-js.svg' },
        { skill: 'Nest.js', icon: '../images/skills/icons8-nestjs.svg' },
        { skill: 'Python', icon: '../images/skills/icons8-python.svg' },
        { skill: 'Flask', icon: '../images/skills/icons8-flask.svg' },
        { skill: 'PHP', icon: '../images/skills/icons8-php-logo.svg' },
        { skill: 'C Programming', icon: '../images/skills/icons8-c.svg' },
        { skill: 'GraphQL', icon: '../images/skills/icons8-graphql.svg' },
        { skill: 'REST API', icon: '../images/skills/icons8-api-96.png' },
        { skill: 'MongoDB', icon: '../images/skills/icons8-mongodb.svg' },
        { skill: 'MySQL', icon: '../images/skills/icons8-mysql.svg' },
        { skill: 'Firebase', icon: '../images/skills/icons8-firebase.svg' }
    ],
    ai: [
        { skill: 'TensorFlow', icon: '../images/skills/icons8-tensorflow.svg' },
        { skill: 'Pandas', icon: '../images/skills/icons8-pandas.svg' },
        { skill: 'NumPy', icon: '../images/skills/icons8-numpy.svg' },
        { skill: 'OpenCV', icon: '../images/skills/icons8-opencv.svg' },
        { skill: 'Python', icon: '../images/skills/icons8-python.svg' }
    ],
    devops: [
        { skill: 'Docker', icon: '../images/skills/icons8-docker.svg' },
        { skill: 'AWS', icon: '../images/skills/icons8-amazon-web-services.svg' },
        { skill: 'Git', icon: '../images/skills/icons8-git.svg' },
        { skill: 'Terraform', icon: '../images/skills/icons8-terraform.svg' },
        { skill: 'Jira', icon: '../images/skills/icons8-jira.svg' }
    ]
};

function createSkillCard(skill) {
    return `
        <div class="group cursor-pointer" data-aos="flip-up" data-aos-duration="600">
            <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center group-hover:scale-105">
                <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300">
                    <img src="${skill.icon}" alt="${skill.skill}" class="w-10 h-10 object-contain">
                </div>
                <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    ${skill.skill}
                </h4>
            </div>
        </div>
    `;
}

function populateSkills() {
    const frontendContainer = document.getElementById('frontend-skills');
    const backendContainer = document.getElementById('backend-skills');
    const aiContainer = document.getElementById('ai-skills');
    const devopsContainer = document.getElementById('devops-skills');

    if (frontendContainer) {
        frontendContainer.innerHTML = skills.frontend.map(skill => createSkillCard(skill)).join('');
    }

    if (backendContainer) {
        backendContainer.innerHTML = skills.backend.map(skill => createSkillCard(skill)).join('');
    }

    if (aiContainer) {
        aiContainer.innerHTML = skills.ai.map(skill => createSkillCard(skill)).join('');
    }

    if (devopsContainer) {
        devopsContainer.innerHTML = skills.devops.map(skill => createSkillCard(skill)).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateSkills();
    
    // Add some interactive effects
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
