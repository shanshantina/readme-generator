// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const generateMarkdown = require('./utils/generateMarkdown.js');

// link to github user api
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
        // ask for github user name
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
        // ask for github repository name
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
        // ask for project title
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
        // ask for description of the project
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
        // the installation information
        {
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project?'
        },
        // instructions and examples of the project
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for users'
        },
        // choose the license of the project
        {
            type: 'list',
            name: 'license',
            message: 'Provide the license for your project',
            choices: ['MITLincense', 'GNUGPLv3', 'ApacheLincense 2.0', 'EclipsePubliceLicense2.0', 'MozillaPublicLicense2.0']
        },
        // the guidelines of how to contribute to the project
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide guidelines for others to contribute to your project (Optional)'
        },
        // testing example
        {
            type: 'input',
            name: 'tests',
            message: 'Provide example of testing your application (Optional)'
        },
        // list of collaborators
        {
            type: 'input',
            name: 'credits',
            message: 'List your collaborators (Optional)'
        },
        // to confirm if user want to input the email address as contact info or not
        {
            type: 'confirm',
            name: 'confirmEmail',
            message: 'Would you like to enter your email address as contact information?',
            default: true
        },
        // if user want to input the email address, show the part below for the input
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

// promisify() refer to https://nodejs.org/dist/latest-v12.x/docs/api/util.html#util_util_promisify_original
const createFile = util.promisify(writeToFile);

// TODO: Create a function to initialize app
// use async/await for init() function refer to https://www.npmjs.com/package/axios
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