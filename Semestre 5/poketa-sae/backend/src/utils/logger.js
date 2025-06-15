const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
  level: 'info', // Niveau par défaut
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs dans la console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs d'erreurs
    new winston.transports.File({ filename: 'logs/combined.log' }) // Logs généraux
  ],
});

module.exports = logger;
