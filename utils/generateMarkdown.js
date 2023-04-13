// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  switch (license) {
    case 'MIT':
      return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    case 'GNU GPLv3':
      return '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
    case 'Apache 2.0':
      return '![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-green.svg)';
    case 'BSD 3-Clause':
      return '![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)';
    case 'ISC':
      return '![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)'; 
    case 'None':
      return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    switch (license) {
        case 'MIT':
            return '[Licensed under the MIT license.](https://opensource.org/licenses/MIT)';
        case 'GNU GPLv3':
            return '[Licensed under the GNU GPLv3 license.](https://www.gnu.org/licenses/gpl-3.0)';
        case 'Apache 2.0':
            return '[Licensed under the Apache 2.0 license.](https://opensource.org/licenses/Apache-2.0)';
        case 'BSD 3-Clause':
            return '[Licensed under the BSD 3-Clause license.](https://opensource.org/licenses/BSD-3-Clause)';
        case 'ISC':
            return '[Licensed under the ISC license.](https://opensource.org/licenses/ISC)';
        case 'None':
            return '';
    }
}

function renderLanguagesBadge(language) {
  switch (language) {
    case 'HTML':
      return '![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)';
    case 'CSS':
      return '![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)';
    case 'JavaScript':
      return '![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)';
    case 'jQuery':
      return '![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)';
    case 'Node.js':
      return '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)';
    case 'Express.js':
      return '![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)';
    case 'MySQL':
      return '![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)';
    case 'React.js':
      return '![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)';
    case 'Bootstrap':
      return '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)';
    case 'Tailwind CSS':
      return '![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)';
    case 'Other':
      return '![Other](https://img.shields.io/badge/Other-000000?style=for-the-badge&logo=github&logoColor=white)';
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(dataObj) {
  let {title, titleDescription, languages, repoLink, deployedLink, contributors, description, installation, features, documentation, preview, previewDescription, license, tests, email} = dataObj;
  uppercaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
  
  let languageBadges = '';
  for (let i=0; i<languages.length; i++){
    languageBadges += `${renderLanguagesBadge(languages[i])} `;
  }

  let licenseBadge = renderLicenseBadge(license);

  let contributorsString = '';
  for(let i=0; i<contributors.length; i++){
    uppercaseName = contributors[i].contributorName.charAt(0).toUpperCase() + contributors[i].contributorName.slice(1);
    contributorsString += `> ${uppercaseName} @[GitHub](https://${contributors[i].contributorGitHub})\n > \n`;
  }
  
  let featuresString = '';
  for(let i=0; i<features.length; i++){
    featuresString += `- ${features[i].feature} \n`;
  }

  if (documentation === '') {
    documentation = 'No documentation provided.';
  } else (
    documentation = `[${documentation}](${documentation})`
  )

  let imgPreview ='';
  if (preview === '') {
    imgPreview = 'No preview provided.';
  } else {
    imgPreview = `![${previewDescription}](${preview})`
  }

  let licenseLink = '';
  if (license === 'None') {
    licenseLink = 'No license provided.';
  } else {
    licenseLink = renderLicenseLink(license);
  }


  //The template literal data that will be entered into the new README file
  return `## ${uppercaseTitle}
${licenseBadge}

---

*${titleDescription}*

## Languages used
${languageBadges}

## Links
>
> - [GitHub Repository](https://${repoLink})
> 
> - [Deployed Application](https://${deployedLink})

## Contributors
${contributorsString}

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
${featuresString}

## Documentation
${documentation}

## Application Preview
${imgPreview}

## License
${licenseLink}

## Tests
${tests}

## Questions
For questions and enquiries, please contact me at: 
[${email}](${email})
`;
}

module.exports = generateMarkdown;
