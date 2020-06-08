// import inquirer,axios,fs,path.
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
async function main(){
    console.log(`starting`);
    const userResponse = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your Project Tittle?",
            name: "projectTittle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
            name: "installationProcess"
        },
        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instruction"
        },
        {
            type: "input",
            message: "Provide instructions examples for use.",
            name: "instructionExample"
        },
        {
            type: "input",
            message: "provide License name ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "provide License url ",
            name: "licenseUrl"
        },
        {
            type: "input",
            message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
            name: "contributorsGitUserName"
        },
        {
            type: "input",
            message: " how to run the application.",
            name: "tests"
        }
        ]);
        console.log(`starting`);
        console.log(userResponse);
        

        // create variable gitUsername
        const gitUsername = userResponse.username;
        // create variable projectTittle
        const projectTittle = userResponse.projectTittle;
        // create variable projectDescription
        const projectDescription = userResponse.projectDescription;
        // create variable installationProcess
        const installationProcess = userResponse.installationProcess;
        //create variable instruction
        const instruction = userResponse.instruction;
        //create variable instructionExample
        const instructionExample = userResponse.instructionExample;
        // create variable licenceName
        const licenseName = userResponse.licenseName;
         // create variable licenceURL
        const licenseUrl = userResponse.licenseUrl;
         // create variable contributorsuserNames
        const contributorUserNames = userResponse.contributorsGitUserName;
        const tests = userResponse.tests;
            // fetching data from git
            // user
        const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
        const gitData = gitResponse.data;
        const gitName = gitData.login;
        const gitEmail = gitData.email;
        const gitlocation = gitData.location;
        const gitUrl = gitData.html_url;
        const gitProfileImage = gitData.avatar_url;
            // contributor
        const contributorUserNamesArray = contributorUserNames.split(",");
        console.log(contributorUserNamesArray);
        // const  = listOfContributorsUserNames.
        // contributorsGitUserName
        var resultContributor;
        for (i=0; i<contributorUserNamesArray.length; i++){
            var contributorsGitUserName = contributorUserNamesArray[i]
            const gitResponse2 = await axios.get(`https://api.github.com/users/${contributorsGitUserName}`);
            var gitContribuProfileImage = gitResponse2.data.avatar_url;
            var gitContribuUrl = gitResponse2.data.html_url;
            var gitContribuEmail = gitResponse2.data.email;
            var resultContributor = resultContributor + (`
            \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);
        }
        var result = (`
# ${projectTittle} 
${projectDescription}
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Author](#Author)
\n* [Tests](#Tests)

## Installation
${installationProcess}
## Instructions
${instruction}
\`\`\`
${instructionExample}
\`\`\`
## License 
This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
## Contributors
${resultContributor}
## Tests
${tests}
## Author 
\n![ProfileImage](${gitProfileImage})
\n**${gitName}**
\nEmail: ${gitEmail}
\nLocation:${gitlocation}
\nGitHub: ${gitUrl}
`)
var writeResult = fs.writeFileSync(path.join(__dirname, '../GoodReadMeGenerator', 'readMe.md'), result )
console.log("file generated....")
    }
main();
