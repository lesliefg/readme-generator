const fs = require('fs');

// If there is no license, return an empty string otherwise we add a license badge to our README
function renderLicenseBadge(license) {
    if (!license) {
        return ``;
      } else {
        return `[![${license} license](https://img.shields.io/badge/License-${license}-blue.svg)](${renderLicenseLink(license)})`
      }
}

//Here we create the license links depending on which is selected
function renderLicenseLink(license) {
    if (license === 'CC--0') {
        return `https://creativecommons.org/licenses/by-nd/4.0` 
    }
    if (license === 'GPL') {
        return `http://perso.crans.org/besson/LICENSE.html`
    }
    if (license === 'MIT') {
        return `https://lbesson.mit-license.org/`
    }
}

// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (!license) {
        return ``;
      } else {
        return `## Licenses
        - This project has a ${license} license. To learn more about this license type click the license button at the top of the README.`
      }
}

//This adds a label to our table of contents if a license is selected
function renderLicenseInTableOfContents(license) {
    if(!license) {
        return ``;
    } else {
        return `* [Licenses](#license)`
    }
}

//This function will generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

  ${renderLicenseBadge(data.license)}

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [Credits](#credits)
  ${renderLicenseInTableOfContents(data.license)}
  
  ## Description
  - ${data.desc}

  ## Installation
  - ${data.installation}

  ## Usage
  - ${data.usage}
  - Github repo: [https://github.com/${data.github}/${data.title}] 

  ## Contributing
  - ${data.contributing}

  ## Tests
  - ${data.testing}

  ## Questions
  - For any questions checkout the repo or reach out via email!  
  - GitHub: [https://github.com/${data.github}]
  - Email: ${data.email}
  
  ## Credits
  - Code written by ${data.name}

  ${renderLicenseSection(data.license)}
`;
}

module.exports = generateMarkdown;