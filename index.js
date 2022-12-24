//Here we are adding packages needed for this app
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

//Here we are creating our questions/prompts array
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Hello! Let\'s start your README. What\'s your name?',
        validate: inputName => {
            if(inputName) {
                return true;
            } else {
                console.log('\nA name is required to continue, enter a nickname if you\'d like!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What\'s the name of your project?',
        validate: inputTitle => {
            if(inputTitle) {
                return true;
            } else {
                console.log('\nAll projects need a unique name, let\'s try again!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What\'s your GitHub username? So other\'s can find it for questions or downloads.',
        validate: inputGithub => {
            if(inputGithub) {
                return true;
            } else {
                console.log('\nSurely you have a Github account! Let\'s try again!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'In case of questions, what\'s the best email to contact you at?',
        validate: inputEmail => {
            if(inputEmail) {
                return true;
            } else {
                console.log('\nWe know emailing can be stressful but what if users have questions? How will they reach you?')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'desc',
        message: 'Next, we\'ll describe your project! What does it do?',
        validate: inputDesc => {
            if(inputDesc) {
                return true;
            } else {
                console.log('\nAll projects need a description, maybe just a sentence or two?')
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Next we need to let users know how to use your project.',
        validate: inputUsage => {
            if(inputUsage) {
                return true;
            } else {
                console.log('\n We know YOU know how to use this but not all users will know, so lets give them the basics.')
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Next we need to add installation instructions for your project. How does it work?',
        validate: inputInstructions => {
            if(inputInstructions) {
                return true;
            } else {
                console.log('\n Even though it may seem easy to install to YOU, some people need at least basic instructions. Let\'s try again.')
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Next, how can people contribute to your project?',
        validate: inputContribution => {
            if(inputContribution) {
                return true;
            } else {
                console.log('\n If no contributions are allowed just enter\'N/A\' otherwise let\'s add some guidelines for contributing.')
            }
        }
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Almost done, what kind of tests are written and how are they used?',
        validate: inputTest => {
            if(inputTest) {
                return true;
            } else {
                console.log('\n Surely there must be at least one test? Let\'s try again!')
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicense',
        message: 'Does your project have a license?',
        default: false,
    },
    {
        type: 'list',
        name: 'license',
        message: 'Awesome, what type of license does your project have?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({confirmLicense}) => {
            if(confirmLicense) {
                return true;
            } else {
                return false;
            }
        }
    },
];

//Here we are creating a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./results/README.md', data, error => {
            if(error) {
                reject(error);
                return;
            }
            resolve({
                ok: true,
                message: console.log('Done! Click on the \'results\' folder to view your completed README! :\)')
            });
        })
    })
}

//Here we are initializing the app
const init = () => {
    return inquirer.prompt(questions);
}

init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(error => {
    console.log(error);
})

