var constants = {
  SECRET: (process.env.SECRET || 'secret'),
  MONGO_URL: (process.env.MONGO_URL || 'mongodb://localhost/reddit')
}

module.exports = constants;
