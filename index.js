// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const generateMarkdown = require('./utils/generateMarkdown.js');

const api = {
    async getUser(userResponses) {
       try {
           let response = await axios.get(`https://api.github.com/users/${userResponses.username}`);
           return response.data;
       } catch (error) {
           console.log(error);
       }
   }
}

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
              if (githubInput) {
                return true;
              } else {
                console.log('Please enter your GitHub name!');
                return false;
              }
            }  
        },
        {
            type: 'input',
            name: 'repository',
            message: 'Enter your GitHub repository name',
            validate: repoInput => {
              if (repoInput) {
                return true;
              } else {
                console.log('Please enter the repository name!');
                return false;
              }
            }  
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is your project title?',
            validate: titleInput => {
                if (titleInput) {
                   return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                   return true;
                } else {
                    console.log('Please enter the description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Provide the license for your project',
            choices: ['MITLincense', 'GNUGPLv3', 'ApacheLincense 2.0', 'EclipsePubliceLicense2.0', 'MozillaPublicLicense2.0']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide gudielines for others to contribute to your project'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide example of testing your application'
        },
        {
            type: 'input',
            name: 'credits',
            message: 'List your collaborators'
        },
        {
            type: 'confirm',
            name: 'confirmEmail',
            message: 'Would you like to enter your email address as contact information?',
            default: true
        },
        {
            type: 'input',
            name: 'email',
            message: 'Provide email address',
            when: ({confirmEmail}) => {
              if (confirmEmail) {
                return true;
              } else {
                return false;
              }
            }
          }    
    ])
};


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Your README.md file has ben generated!')
    })
}

const createFile = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {
        const userResponses = await questions();
        console.log("your responses: ", userResponses);

        const userInfo = await api.getUser(userResponses);
        console.log("Github user information: ", userInfo); 

        const markDown = generateMarkdown(userResponses, userInfo);
        console.log(markDown);

        await createFile('README.md', markDown);

    } catch (error) {
        console.log(error);
    }
}

// Function call to initialize app
init();