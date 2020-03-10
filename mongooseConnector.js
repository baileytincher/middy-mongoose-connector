const log = (shouldLog, message) => (shouldLog ? console.log(message) : null);

/** A database connection middleware that creates or persists a connection
 * to MongoDB via Mongoose.
 *
 * Database connections in Lambda can persist across multiple function calls,
 * and for performance you likely do not want to close it after each use.
 *
 * @param {Object} opts
 * @param {Object} opts.mongoose An instance of mongoose
 * @param {String} opts.databaseURI The full MongoDB connection string
 * @param {mongoose.connectionOptions} opts.connectionOpts Options object passed to mongoose.connect
 * @param {Boolean} opts.shouldClose Whether or not to close the database connection after execution
 * @param {Boolean} opts.shouldLog Whether or not to log opening/closing status for connections
 *
 * @return {Object} The middleware.
 */
export default ({
  mongoose,
  databaseURI,
  connectionOpts = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  shouldClose = false,
  shouldLog = true
}) => ({
  before: async () => {
    if (mongoose.connection.readyState === 1) {
      log(shouldLog, '=> Using existing database connection');
    } else {
      log(shouldLog, '=> Using new database connection');
      await mongoose.connect(databaseURI, connectionOpts);
    }
  },
  after: async () => {
    if (shouldClose && mongoose.connection.readyState !== 0) {
      log(shouldLog, '=> Closing database connection');
      await mongoose.connection.close();
    }
  }
});
