const chalk = require('chalk');

function log(message, type = 'info') {
  const prefix = {
    info: chalk.blue('[INFO]'),
    success: chalk.green('[SUCCESS]'),
    warn: chalk.yellow('[WARN]'),
    error: chalk.red('[ERROR]'),
  }[type] || chalk.white('[LOG]');

  console.log(`${prefix} ${message}`);
}

module.exports = log;