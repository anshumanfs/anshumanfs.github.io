const skills = [
    {
        skill: 'HTML',
        icon: '../images/skills/icons8-html-5.svg'
    },
    {
        skill: 'CSS',
        icon: '../images/skills/icons8-css3.svg'
    },
    {
        skill: 'JavaScript',
        icon: '../images/skills/icons8-javascript.svg'
    },
    {
        skill: 'PHP',
        icon: '../images/skills/icons8-php-logo.svg',
    },
    {
        skill: 'MySQL',
        icon: '../images/skills/icons8-mysql.svg',
    },
    {
        skill: 'Python',
        icon: '../images/skills/icons8-python.svg',
    },
    {
        skill: 'C Programming',
        icon: '../images/skills/icons8-c.svg',
    },
    {
        skill: 'React',
        icon: '../images/skills/icons8-react-js.svg',
    },
    {
        skill: 'Node.js',
        icon: '../images/skills/icons8-node-js.svg',
    },
    {
        skill: 'Ionic',
        icon: '../images/skills/icons8-ionic.svg',
    },
    {
        skill: 'Express',
        icon: '../images/skills/icons8-express-js.svg',
    },
    {
        skill: 'Flask',
        icon: '../images/skills/icons8-flask.svg',
    },
    {
        skill: 'Nest.js',
        icon: '../images/skills/icons8-nestjs.svg',
    },
    {
        skill: 'NextJS',
        icon: '../images/skills/icons8-nextjs.svg',
    },
    {
        skill: 'GraphQL',
        icon: '../images/skills/icons8-graphql.svg',
    },
    {
        skill: 'REST',
        icon: '../images/skills/icons8-api-96.png',
    },
    {
        skill: 'MongoDB',
        icon: '../images/skills/icons8-mongodb.svg',
    },
    {
        skill: 'MySQL',
        icon: '../images/skills/icons8-mysql.svg',
    },
    {
        skill: 'Firebase',
        icon: '../images/skills/icons8-firebase.svg',
    },
    {
        skill: 'Git',
        icon: '../images/skills/icons8-git.svg',
    },
    {
        skill: 'Pandas',
        icon: '../images/skills/icons8-pandas.svg',
    },
    {
        skill: 'Numpy',
        icon: '../images/skills/icons8-numpy.svg',
    },
    {
        skill: 'Tensorflow',
        icon: '../images/skills/icons8-tensorflow.svg',
    },
    {
        skill: 'Docker',
        icon: '../images/skills/icons8-docker.svg',
    },
    {
        skill: 'AWS',
        icon: '../images/skills/icons8-amazon-web-services.svg',
    },
    {
        skill: 'Jira',
        icon: '../images/skills/icons8-jira.svg',
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skills-container');
    const length = skills.length;
    let content = '';
    // write code to generate rows based on length while one row has 6 columns
    for (let i = 0; i < length; i++) {
        if (i % 6 === 0) {
            content += `<div class="row p-2">`;
        }
        content += `
        <div class="col-sm-2">
            <div class="card" data-aos="flip-right">
                <div class="card-body text-center">
                    <img src="${skills[i].icon}" height="50" width="50" alt="js" />
                    <br />
                    <span>${skills[i].skill}</span>
                </div>
            </div>
        </div>
        `;
        if (i % 6 === 5) {
            content += `</div>`;
        }
    }
    skillsContainer.innerHTML = content;
})
