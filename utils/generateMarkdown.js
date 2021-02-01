// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(!license) {
    return '';
  }
  return `
  ![License Badge](https://img.shields.io/badge/License-${license}-brightgreen.svg)
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

// check if the email address is inputted by the user
function emailAddress(email) {
  if(!email) {
    return '';
  } 
  return `
  Email: ${email}`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {
  // create table of contents
  let tableOfContent = `## Table of Contents`;

  if (userResponses.license !== '') {tableOfContent += `
  * [License](#license)`
  };

  if (userResponses.installation !== '') {tableOfContent += `
  * [Installation](#installation)` 
  };

  if (userResponses.usage !== '') {tableOfContent += `
  * [Usage](#usage)` 
  };

  if (userResponses.contributing !== '') {tableOfContent += `
  * [Contributing](#contributing)`
  };

  if (userResponses.tests !== '') {tableOfContent += `
  * [Tests](#tests)`
  };

  if (userResponses.credits !== '') {tableOfContent += `
  * [Credits](#credits)`
  };

  tableOfContent += `
  * [Questions](#questions)`;

  //generate the README file base on user input
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

  ## Questions
  ![Developer Profile Picture](${userInfo.avatar_url})

  For any questions, please contact me with the information below:

  GitHub: [@${userInfo.login}](${userInfo.html_url})

  ${emailAddress(userResponses.email)}
`
}

// export markdown file to index.js
module.exports = generateMarkdown;