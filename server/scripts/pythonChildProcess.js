const { exec } = require("child_process");
const path = require("path");

const execPyScript = (args) => {
  exec(`py ${path.join(__dirname, 'mailScanner.py')} ${args}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

module.exports = execPyScript;