// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');





// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// TODO: Create an array of questions for user input
const questions = [{
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
    choices: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'React.js', 'Bootstrap', 'Materialize', 'Handlebars.js', 'Other'],
    },
    {
    type: 'input',
    name: 'repoLink',
    message: 'Please provide a link to your project repository:',
    },
    {
    type: 'input',
    name: 'deployedLink',
    message: 'Please provide a link to your deployed project:',
    },
    {
    type: 'recursive',
    name: 'contributors',
    message: 'Enter the names and links of the project contributors and their GitHub page:',
    shouldPrompt: function(answers) {
      return answers.contributors && answers.contributors.length < 5;
    },
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the contributor name:'
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the contributor GitHub page link:'
        },
        {
        type: 'confirm',
        name: 'askAgain',
        message: 'Do you want to add another contributor? (just hit enter for YES)',
        default: true
      }
    ]
    },
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
    message: 'Please provide a list of features for your project:',
    prompts: [
        {
        type: 'input',
        name: 'feature',
        message: 'Enter the feature:',
        }
    ]
    },
    {
    type: 'input',
    name: 'documentation',
    message: 'Please provide links to all relevant documentation:',
    },
    {
    type: 'input',
    name: 'preview',
    message: 'Please provide a link to a preview image of your project:',
    },
    {
    type: 'input',
    name: 'previewDescription',
    message: 'Please provide a description of the preview image:',
    },
    {
    type: 'input',
    name: 'license',
    message: 'Please choose the license which this project is covered under:',
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
    
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), (err) =>
    err ? console.error(err) : console.log("Success!")
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((data) => {
        const fileName = `README.md`;
        writeToFile(fileName, data);
    })
}

// Function call to initialize app
init();
