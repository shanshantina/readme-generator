// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(!license) {
    return '';
  }
  return `
  ![License Badge](https://img.shields.io/badge/License-${license}-blue.svg)
  `;  
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if(!license) {
    return '';
  }
  return `
  [License Link]${license}`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(!license) {
    return '';
  } 
  return `
  This project is under license ${license}`;
}

function emailAddress(email) {
  if(!email) {
    return '';
  } 
  return `
  Email: ${email}`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {
  let tableOfContent = `## Table of Contents`;

  if (userResponses.installation !== '') {tableOfContent += `
  * [Installation](#installation)` 
  };

  if (userResponses.usage !== '') {tableOfContent += `
  * [Usage](#usage)` 
  };

  if (userResponses.contributing !== '') {tableOfContent += `
  * [Contributing](#contributing)`
  };

  if (userResponses.license !== '') {tableOfContent += `
  * [License](#license)`
  };

  if (userResponses.tests !== '') {tableOfContent += `
  * [Tests](#tests)`
  };

  return `
  # ${userResponses.title} 

  ${renderLicenseBadge(userResponses.license)}

  ## Description
  ${userResponses.description}

  ${tableOfContent}

  ## License
  ${renderLicenseLink(userResponses.license)}
  ${renderLicenseSection(userResponses.license)}

  ## Installation
  ${userResponses.installation}

  ## Usage
  ${userResponses.usage}

  ## Contributing
  ${userResponses.contributing}

  ## Tests
  ${userResponses.tests}

  ## Credits
  ${userResponses.credits}

  ## Questions?
  ![Developer Profile Picture](${userInfo.avatar_url})

  For any questions, please contact me with the information below:

  GitHub: [@${userInfo.login}](${userInfo.html_url})

  ${emailAddress(userResponses.email)}
`
}

module.exports = generateMarkdown;