const chalk = require('chalk');

function getTimestamp() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
}

function log(message, type = 'info') {
    const timestamp = getTimestamp();

    const prefix = {
        info: chalk.blue('[INFO]'),
        success: chalk.greenBright('[SUCCESS]'),
        warn: chalk.yellow('[WARN]'),
        error: chalk.red('[ERROR]'),
        infot: chalk.blue(`[INFO | ${timestamp}]`),
        successt: chalk.greenBright(`[SUCCESS | ${timestamp}]`),
        warnt: chalk.yellow(`[WARN | ${timestamp}]`),
        errort: chalk.red(`[ERROR | ${timestamp}]`),
    }[type] || chalk.white('[LOG]');

    console.log(`${prefix} ${message}`);
}

module.exports = log;
