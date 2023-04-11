// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const {title, titleDescription, languages, repoLink, deployedLink, contributors, description, installation, features, documentation, preview, previewDescription, license, tests, email} = data;
  uppercaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
  languagesSpaced = languages.join(', ');

  return `
  ## ${uppercaseTitle}
  *${titleDescription}*

  ## Languages used
  ${languagesSpaced}

  ## Links
  - [GitHub Repository](${repoLink})
  - [Deployed Application](${deployedLink})

  ## Contributors
  - ${contributors}

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Features](#features)
  - [Documentation](#documentation)
  - [Application Preview](#full-preview)
  - [License](#license)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Description
  ${description}

  ## Installation
  ${installation}

  ## Features
  - ${features}

  ## Documentation
  ${documentation}

  ## Application Preview
  ![${previewDescription}](${preview})

  ## License
  ${license}

  ## Tests
  ${tests}

  ## Questions
  For questions and enquiries, please contact me at: 
  [${email}](${email})
`;
}

module.exports = generateMarkdown;
