const { exec } = require('child_process');

class CordovaBroswerWebpackPlugin {
  constructor(options = { cmd: 'echo "=== CordovaBroswerWebpackPlugin ==="' }) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap('CordovaBroswerWebpackPlugin', () => {
      exec(this.options.cmd, (err, stdout, stderr) => {
        if (err) {
          console.log(this.options.cmd, stderr);
        } else {
          console.log(this.options.cmd, stdout);
        }
      });
    });
  }
}

module.exports = CordovaBroswerWebpackPlugin;
