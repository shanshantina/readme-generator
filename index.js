// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios').default;

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter your name!');
                return false;
              }
            }
          },
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
            name: 'title',
            message: 'What is your project title?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
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
            type: 'list',
            name: 'license',
            message: 'Provide the license for your project',
            choices: ['MIT License', 'GNU GPLv3', 'Apache Lincense 2.0', 'Eclipse Publice License 2.0', 'Mozilla Public License 2.0']
        },
    ])
}
questions();


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


// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then(answers => {
        console.log(answers);
        axios.get("https://api.github.com/users/" + answers.username)
        .then(response => {
            console.log(response);
            var imageUrl = response.data.avatar.url;
            answers.image = imageUrl;
            console.log(imageUrl);
            writeToFile();
        })

    })
}

// Function call to initialize app
init();