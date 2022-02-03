let log;
let defaults;

/**
 * Set all of the default public env:s that does not already have a value set.
 * If any of the defaults are already set when the set() function is called
 * that process.env will be used. So if you start your service with LOG_LEVEL=debug
 * LOG_LEVEL: "info" will be ignored.
 *
 * @param {*} defaultKeyValues is an object with key value pairs.
 * example:
 * {
 *  LOG_LEVEL: "info",
 *  PORT: 80,
 *  APPINSIGHTS_INSTRUMENTATIONKEY: "",
 * }
 * @param {*} logger Something like console that implements info(str) and  debug(str).
 * If passed, every value that is set or unset in proces.env will be logged.
 */
const set = (defaultKeyValues, logger) => {
  log = logger;
  defaults = defaultKeyValues; // store for use in unset()

  Object.keys(defaults).forEach(function (key) {
    if (!process.env[key]) {
      if (log) {
        info(` - Env '${key}' is not set, defaulting to '${defaults[key]}'.`);
      }
      process.env[key] = defaults[key];
    }
  });
};

/**
 * Remove all process.envs that are found in DEFAULTS.
 */
const unset = () => {
  Object.keys(defaults).forEach(function (key) {
    if (log) {
      debug(
        `Removing '${key}' with value '${process.env[key]}' from process.env.`
      );
    }
    delete process.env[key];
  });
};

/**
 * An array of all env:s that the application need to run, if the env is not found an error is thrown.
 *
 * @param {*} requiredKeys a list with env keys.
 * example: ['DB_URI', 'DB_PWD']
 *
 * @param {*} logger Something like console that implements warn(str), info(str) and debug(str).
 */
const required = (requiredKeys, logger) => {
  log = logger;

  requiredKeys.forEach(function (key) {
    let exists = process.env[key] ? "✅ Found" : "🚨 Missing";
    let message = ` - ${exists} required env '${key}'`;
    info(message);
  });

  requiredKeys.forEach(function (key) {
    if (!process.env[key]) {
      let message = `Required env '${key}' does not exist.`;
      warn(message);
      throw message;
    }
  });
};

const debug = (message) => {
  logMessage(message, "debug");
};

const info = (message) => {
  logMessage(message, "info");
};

const warn = (message) => {
  logMessage(message, "warn");
};

const logMessage = (message, level) => {
  if (log == null) {
    return;
  }

  if (typeof log.debug !== "function") {
    throw "Logger does not implement debug(str)";
  }
  if (typeof log.info !== "function") {
    throw "Logger does not implement info(str)";
  }
  if (typeof log.warn !== "function") {
    throw "Logger does not implement warn(str)";
  }

  if (level === "info") {
    log.info(message);
  } else if (level === "debug") {
    log.debug(message);
  } else {
    log.warn(message);
  }
};

/**
 * Module exports
 */
module.exports = {
  set: set,
  unset: unset,
  required: required,
};
