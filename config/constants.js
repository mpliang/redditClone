var CONSTANTS = {
  SECRET: (process.env.SECRET || 'secret'),
  MONGO_URL: (process.env.MONGO_URL || 'mongodb://localhost/reddit'),
  MAILGUN_API: (process.env.MAILGUN_API),
  MAILGUN_ADDRESS: (process.env.MAILGUN_ADDRESS)
}

module.exports = CONSTANTS;
