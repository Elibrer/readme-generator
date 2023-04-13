// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
const generateHTML = require('./utils/generateHTML.js');
const generateLicense = require('./utils/generateLicense.js');

const dayjs = require('dayjs')
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

function renderYear() {
    const currentYear = dayjs().format('YYYY'); 
    console.log(currentYear);
    return currentYear;  
}

// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// TODO: Create an array of questions for user input
const fileTypeQuestion = [
    {
        type: 'list',
        name: 'fileType',
        message: 'What file would you like to create?',
        choices: ['README', 'Blank HTML', 'Other'],
    },
];

const questions = [
    {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    },
    {
    type: 'input',
    name: 'titleDescription',
    message: 'Please add a short title description of your project:',
    },
    {
    type: 'checkbox',
    name: 'languages',
    message: 'Which languages did you use in your project?',
    choices: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node.js', 'Express.js', 'MySQL', 'React.js', 'Bootstrap', 'Tailwind CSS', 'Other'],
    },
    {
    type: 'input',
    name: 'repoLink',
    message: 'Please provide a link to your project repository: https://',
    },
    {
    type: 'input',
    name: 'deployedLink',
    message: 'Please provide a link to your deployed project: https://',
    },
    {
    type: 'recursive',
    name: 'contributors',
    message: 'Add a contributor/s?',
    prompts: [
        {
        type: 'input',
        name: 'contributorName',
        message: 'Enter the contributor name:'
        },
        {
        type: 'input',
        name: 'contributorGitHub',
        message: 'Enter the contributor GitHub page link: https://'
        },
    ]
    },
];

const questions2 = [
    {
    type: 'input',
    name: 'description',
    message: 'Please provide a description for your project:',
    },
    {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions for your project:',
    },
    {
    type: 'recursive',
    name: 'features',
    message: 'Add feature to the features list?',
    prompts: [
        {
        type: 'input',
        name: 'feature',
        message: 'Enter the feature:',
        }
    ]
    },
];

const questions3 = [
    {
        type: 'input',
        name: 'documentation',
        message: 'Please provide links to all relevant documentation:',
    },
    {
        type: 'input',
        name: 'preview',
        message: 'Please provide a link to a preview image of your project (use https:// for external links):',
    },
    {
        type: 'input',
        name: 'previewDescription',
        message: 'Please provide a description of the preview image:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose the license which this project is covered under:',
        choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'ISC', 'Other'],
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide testing instructions for your project:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please provide your email address so you may be contacted for any questions and queries:',
    },
];

function writeToFile(type, fileName, data) {
    fs.writeFile(eval(`'./generated-files/${fileName}'`), eval(`generate${type}`)(data), (data), (err) =>
    err ? console.error(err) : console.log("Success!")
    );
}

function createLicenseFile(data) {
    const year = renderYear();
    let contributorNames = '';
    for (let i = 0; i < data.contributors.length; i++) {
        if (i === data.contributors.length - 1) {
        contributorNames += `${data.contributors[i].contributorName}`;
        }
        else {
        contributorNames += `${data.contributors[i].contributorName}, `;
        }   
    }
    
    if (data.license !== ``) {
        fs.writeFile(`./generated-files/LICENSE.md`, generateLicense(data, contributorNames, year), (data), (err) =>
        err ? console.error(err) : console.log("Success!")
        );
    }
}

// License files
// File location




//The reason for multiple question objects is that 
// for some reason the 'recursive' prompt prematurely ends 
// the function if there is another prompt straight after it 
// and the user selects 'no'. Having the recursive prompts
// in separate objects seems to fix this issue - but I still
// needed to merge the seperate objects into one object.
function init() {
    let fileName = ``;
    let type = ``;
    let dataObj = {}
    inquirer.prompt(fileTypeQuestion)
    .then((typeData) => {
        switch (typeData.fileType) {
            case 'Blank HTML':
                fileName = `index.html`;
                type = 'HTML';
                writeToFile(type, fileName);
                break;
            case 'README':
                type = 'Markdown';
                fileName = `README.md`;
                inquirer.prompt(questions)
                .then((data) => { 
                    inquirer.prompt(questions2)
                    .then((data2) => {
                        inquirer.prompt(questions3)
                        .then((data3) => {
                            dataObj = {
                                ...data,
                                ...data2,
                                ...data3,
                            }
                            createLicenseFile(dataObj)
                            writeToFile(type, fileName, dataObj);
                        })
                    })
                })
                break;
            default:
                break;
        }
    })
}

// Function call to initialize app
init();
