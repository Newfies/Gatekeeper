const chalk = require('chalk');

module.exports = function log(message, type = 'info') {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const tag = {
    info: chalk.white('INFO'),
    success: chalk.green('SUCCESS'),
    warn: chalk.yellow('WARN'),
    error: chalk.red('ERROR'),
  }[type] || chalk.white(type.toUpperCase());

  console.log(`[${tag} @ ${timestamp}] ${message}`);
};
