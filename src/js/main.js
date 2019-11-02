// Variabler
const localEducationURL = 'http://localhost/resume_admin/pub/api/education';
const publicEducationURL = 'http://studenter.miun.se/~yage1800/dt173g/resume-dashboard/api/education.php';
const localEmploymentURL = 'http://localhost/resume_admin/pub/api/employment';
const publicEmploymentURL = 'http://studenter.miun.se/~yage1800/dt173g/resume-dashboard/api/employment.php';
const localProjectURL = 'http://localhost/resume_admin/pub/api/project';
const publicProjectURL = 'http://studenter.miun.se/~yage1800/dt173g/resume-dashboard/api/project.php';
let education = [];
let employments = [];
let projects = [];

// Eventlyssnare
window.addEventListener('load', fetchEducation);
window.addEventListener('load', fetchEmployments);
window.addEventListener('load', fetchProjects);

// Funktioner
function fetchEducation() {
    // Rensa listan först
    document.querySelector('.experience__education .experience__list').innerHTML = '';

    // Göm kortet om det har synts förut
    document.querySelector('.experience__message').style.display = 'none';

    // Hämta kurser via API:et
    fetch(publicEducationURL, {
        method: 'get'
    })
    .then(res => res.json())
    .then(data => {
        if (data instanceof Array) {
            // Klonar arrayen
            education = [...data];

            // Visa tabellen om den är dold sen tidigare
            document.querySelector('.experience__education .experience__list').style.display = 'block';

            education.forEach(edu => {
                document.querySelector('.experience__education .experience__list').innerHTML += `
                <li class="experience__item">
                    <p>${edu.name}</p>
                    <p>${edu.school}</p>
                    <p>${edu.startmonth} ${edu.startyear} - ${edu.ongoing == 1 ? 'pågående' : edu.endmonth + ' ' + edu.endyear}</p>
                </li>
                `;
            });
        } else {
            document.querySelector('.experience__education .experience__list').style.display = 'none';
            document.querySelector('.experience__message').style.display = 'block';
            document.querySelector('.experience__message').textContent = data.message;
        }
    })
    .catch(err => {
        // Visa felmeddelande
        document.querySelector('.experience__education .experience__list').style.display = 'none';
        document.querySelector('.experience__message').style.display = 'block';
        document.querySelector('.experience__message').textContent = 'Något gick fel vid inladdning av utbildning.';
    });
}


// Funktioner
function fetchEmployments() {
    // Rensa tabellen först
    document.querySelector('.experience__work .experience__list').innerHTML = '';

    // Göm kortet om det har synts förut
    document.querySelector('.employment__message').style.display = 'none';

    // Hämta kurser via API:et
    fetch(publicEmploymentURL, {
        method: 'get'
    })
    .then(res => res.json())
    .then(data => {
        if (data instanceof Array) {
            // Klonar arrayen
            employments = [...data];

            // Visa tabellen om den är dold sen tidigare
            document.querySelector('.experience__work .experience__list').style.display = 'block';

            employments.forEach(employment => {
                document.querySelector('.experience__work .experience__list').innerHTML += `
                <li class="experience__item">
                    <p>${employment.title}</p>
                    <p>${employment.place}</p>
                    <p>${employment.startmonth} ${employment.startyear} - ${employment.ongoing == 1 ? 'pågående' : employment.endmonth + ' ' + employment.endyear}</p>
                </li>
                `;
            });
        } else {
            document.querySelector('.experience__work .experience__list').style.display = 'none';
            document.querySelector('.employment__message').style.display = 'block';
            document.querySelector('.employment__message').textContent = data.message;
        }
    })
    .catch(err => {
        // Visa felmeddelande
        document.querySelector('.experience__work .experience__list').style.display = 'none';
        document.querySelector('.employment__message').style.display = 'block';
        document.querySelector('.employment__message').textContent = 'Något gick fel vid inladdning av anställningar.';
    });
}

// Funktioner
function fetchProjects() {
    // Rensa tabellen först
    document.querySelector('.projects__list').innerHTML = '';

    // Göm kortet om det har synts
    document.querySelector('.projects__message').style.display = 'none';
    document.querySelector('.projects__intro').style.display = 'none';

    // Hämta kurser via API:et
    fetch(publicProjectURL, {
        method: 'get'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data instanceof Array) {
            // Klonar arrayen
            projects = [...data];

            // Visa tabellen om den är dold sen tidigare
            document.querySelector('.projects__list').style.display = 'block';
            document.querySelector('.projects__intro').style.display = 'block';

            projects.forEach(project => {
                document.querySelector('.projects__list').innerHTML += `
                <li class="projects__item">
                    <p class="projects__subtitle">${project.title}</p>
                    <a href="${project.link}" class="projects__link" target="_blank">${project.link}</a>
                    <p class="projects__description">${project.description}</p>
                </li>
                `;
            });
        } else {
            document.querySelector('.projects__list').style.display = 'none';
            document.querySelector('.projects__intro').style.display = 'none';
            document.querySelector('.projects__message').style.display = 'block';
            document.querySelector('.projects__message').textContent = data.message;
        }
    })
    .catch(err => {
        // Visa felmeddelande
        document.querySelector('.projects__list').style.display = 'none';
        document.querySelector('.projects__intro').style.display = 'none';
        document.querySelector('.projects__message').style.display = 'block';
        document.querySelector('.projects__message').textContent = 'Något gick fel med inladdningen av projekt.';

    });
}