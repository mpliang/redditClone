var CONSTANTS = {
  SECRET: (process.env.SECRET || 'secret'),
  MONGO_URL: (process.env.MONGO_URL || 'mongodb://localhost/reddit'),
  MAILGUN_API_KEY: (process.env.MAILGUN_API_KEY),
  MAILGUN_DOMAIN: (process.env.MAILGUN_DOMAIN)
}

module.exports = CONSTANTS;
