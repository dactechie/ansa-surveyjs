const { exec } = require("child_process");

// "curl -H 'Content-Type: application/json' -X POST "
function executeCommand(command) {
  exec(`curl ${command}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      console.log("Could not complete CURL command");
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

module.exports = {
  executeCommand
};
